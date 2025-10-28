"use client";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import type { ProcessedAboutSectionData } from "@/lib/types";
import { fontSizes } from "@/styles/typography";
import { cubicBezier, easeInOut, motion, useInView } from "motion/react";
import Image from "next/image";
import React, { useRef } from "react";
import Polaroid from "../../ui/Polaroid";
import Link from "next/link";

interface AboutClientProps {
  data?: ProcessedAboutSectionData;
}

const AboutClient: React.FC<AboutClientProps> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-40%" });

  const containerVariants = {
    hidden: { clipPath: "inset(15%)", opacity: 0.7 },
    visible: {
      clipPath: "inset(0%)",
      opacity: 1,
    },
  };

  const containerTransition = {
    duration: 1.5,
    ease: cubicBezier(0.25, 0.46, 0.45, 0.94),
    staggerChildren: 0.1,
    delayChildren: 0.3,
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 80, filter: "blur(3px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(2px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  };

  const imageVariants = {
    hidden: {
      opacity: 0,
      clipPath: "inset(50%)",
      rotate: -8,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      clipPath: "inset(0%)",
      rotate: 3,
      scale: 1,
    },
  };

  const imageTransition = {
    duration: 1.2,
    ease: cubicBezier(0.25, 0.46, 0.45, 0.94),
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
    },
  };

  const iconTransition = {
    duration: 0.6,
    ease: cubicBezier(0.68, -0.55, 0.265, 1.55),
  };

  const floatingAnimation = {
    y: [-6, 6, -6],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: easeInOut,
    },
  };

  return (
    <SectionWrapper
      ref={containerRef}
      withGrain
      grainOpacity={0}
      className="bg-beige-one w-full max-w-[2200px] mx-auto flex items-center justify-center border-b-2 border-brown-two"
    >
      <div className="w-full rounded-2xl md:rounded-3xl shadow-lg border border-black">
        <motion.div
          className="w-full bg-blue rounded-2xl md:rounded-3xl px-4 py-8 md:p-8 lg:p-16 relative overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={containerTransition}
        >
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center w-full relative z-20 gap-8 lg:gap-16">
            {/* Text Content */}
            <div className="text-brown-one order-2 lg:order-1 flex-1 lg:max-w-[55%] relative">
              <div className="flex lg:items-center sm:gap-6 md:gap-14 lg:gap-14 mb-6 md:mb-8">
                <motion.h1
                  className="overflow-hidden font-travel-november font-normal m-0 text-brown-one text-center sm:text-left"
                  style={{
                    fontSize: fontSizes.approachTitle,
                    lineHeight: "1.1",
                  }}
                  variants={{
                    hidden: {},
                    visible: {},
                  }}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  transition={{
                    staggerChildren: 0.03,
                    delayChildren: 0.5,
                  }}
                >
                  {(data?.heading || "Hi I'm Victoria")
                    .split("")
                    .map((char, index) => (
                      <motion.span
                        key={index}
                        variants={letterVariants}
                        transition={{
                          duration: 1.2,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                        className="inline-block"
                      >
                        {char === " " ? "\u00A0" : char}
                      </motion.span>
                    ))}
                </motion.h1>

                {/* Camera SVG */}
                <motion.div
                  className="absolute -right-4 -top-6 lg:-top-2 scale-[0.5] md:hidden lg:scale-[1] lg:flex lg:items-center"
                  initial={{ opacity: 0, rotate: -15, scale: 0.5 }}
                  animate={
                    isInView
                      ? {
                          opacity: 1,
                          rotate: 0,
                          scale: 1,
                        }
                      : {}
                  }
                  transition={{
                    duration: 0.8,
                    ease: [0.23, 1, 0.32, 1],
                    delay: 1.6,
                  }}
                >
                  <Image
                    src="/camera.svg"
                    alt="camera"
                    width={100}
                    height={80}
                    className="w-full h-full object-contain"
                  />
                </motion.div>
              </div>

              <div className="mb-4 md:mb-6 leading-relaxed text-left">
                {data?.description?.map((paragraph, index) => {
                  const splitParagraphs = paragraph
                    .split("\n\n")
                    .filter((p) => p.trim());

                  if (splitParagraphs.length > 1) {
                    return splitParagraphs.map((splitPara, splitIndex) => (
                      <motion.p
                        key={`${index}-${splitIndex}`}
                        className="font-inconsolata font-medium text-black mb-8"
                        style={{ fontSize: fontSizes.bodyMedium }}
                        variants={textVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        transition={{
                          duration: 0.8,
                          ease: [0.25, 0.46, 0.45, 0.94],
                          delay: 1.2 + index * splitIndex * 0.15,
                        }}
                      >
                        {splitPara.trim()}
                      </motion.p>
                    ));
                  }

                  return (
                    <motion.p
                      key={index}
                      className="font-inconsolata font-medium text-black m-0 mb-8 last:mb-0"
                      style={{ fontSize: fontSizes.bodyMedium }}
                      variants={textVariants}
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                      transition={{
                        duration: 0.8,
                        ease: [0.25, 0.46, 0.45, 0.94],
                        delay: 1.2 + index * 0.15,
                      }}
                    >
                      {paragraph}
                    </motion.p>
                  );
                }) || (
                  <>
                    <motion.p
                      className="font-inconsolata font-medium text-black m-0 mb-6"
                      style={{ fontSize: fontSizes.bodyMedium }}
                      variants={textVariants}
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                      transition={{
                        duration: 0.8,
                        ease: [0.25, 0.46, 0.45, 0.94],
                        delay: 1.2,
                      }}
                    >
                      Think of me not only as your photographer, but as your
                      hype girl, your calm in the chaos, and your biggest fan
                      behind the lens. Whether you&apos;re just starting your
                      forever or building your family, I&apos;m here to capture
                      it all — the wild love, the soft moments, the messy
                      laughter, and the kind of magic that only happens when
                      you&apos;re authentically yourselves.
                    </motion.p>
                    <motion.p
                      className="font-inconsolata font-medium text-black m-0"
                      style={{ fontSize: fontSizes.bodyMedium }}
                      variants={textVariants}
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                      transition={{
                        duration: 0.8,
                        ease: [0.25, 0.46, 0.45, 0.94],
                        delay: 1.35,
                      }}
                    >
                      From dancing barefoot on Long Island to chasing sunsets
                      across the globe, I&apos;ll be right there — grounding you,
                      guiding you, and soaking in every ounce of light and love
                      along the way.
                    </motion.p>
                  </>
                )}
              </div>

              {/* Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{
                  duration: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: 1.8,
                }}
                className="lg:pt-8 md:pt-4 pt-0"
              >
                <Link
                  href="/about"
                  className="bg-black text-beige-two border-none px-6 md:px-8 py-3 font-inconsolata font-medium cursor-pointer transition-all duration-300 hover:bg-brown-two hover:-translate-y-1 min-w-[140px] rounded-[50%]"
                  style={{
                    fontSize: fontSizes.buttonText,
                  }}
                >
                  {data?.ctaButtonText || "MY STORY"}
                </Link>
              </motion.div>
            </div>

            {/* Visual Content */}
            <div className="relative flex justify-center items-center order-1 lg:order-2 z-20 flex-shrink-0">
              <motion.div
                variants={imageVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={imageTransition}
              >
                <Polaroid
                  imageSrc={data?.profileImageUrl || "/victoria.jpg"}
                  caption={
                    data?.polaroidCaption ||
                    "Long Island, NY photographer for the wildly in love and endlessly inspired ♡"
                  }
                  alt="Victoria with her camera in a field"
                  rotation={0}
                  className="w-[280px] sm:w-[320px] md:w-[380px] lg:w-[400px]"
                  imgclassName="h-[260px] sm:h-[320px] md:h-[380px] lg:h-[400px]"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{
                  duration: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: 0.8,
                }}
              >
                <Image
                  src="/about-tape.svg"
                  alt="tape-icon"
                  width={194}
                  height={169}
                  className="absolute -top-16 lg:-top-14 left-1/2 -translate-x-1/2 scale-[0.7] md:scale-[0.8] lg:scale-[1] z-50"
                />
              </motion.div>
            </div>
          </div>

          {/* Decorative Icons */}
          <motion.div
            className="absolute top-2 right-0 md:top-8 md:right-16 z-20 scale-80 md:scale-100"
            variants={iconVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ ...iconTransition, delay: 2.0 }}
          >
            <motion.div animate={floatingAnimation}>
              <Image
                src="/heart-dark.svg"
                alt="Decorative heart"
                width={40}
                height={40}
                className="opacity-85"
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute top-6 right-2 md:top-6 md:right-6 scale-60 md:scale-70 z-10"
            variants={iconVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ ...iconTransition, delay: 2.1 }}
          >
            <motion.div
              animate={floatingAnimation}
              transition={{ ...floatingAnimation.transition, delay: 0.2 }}
            >
              <Image
                src="/heart-black.svg"
                alt="Decorative heart"
                width={40}
                height={40}
                className="rotate-12"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default AboutClient;
