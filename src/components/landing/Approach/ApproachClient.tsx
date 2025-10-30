// Optimized ApproachClient.tsx
"use client";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import type { ProcessedApproachSectionData } from "@/lib/types"; // ✅ use processed type
import { fontSizes } from "@/styles/typography";
import { cubicBezier, motion, useInView } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo, useRef, useState } from "react";

interface ApproachClientProps {
  data?: ProcessedApproachSectionData;
}

export function ApproachClient({ data }: ApproachClientProps) {
  const MotionLink = motion(Link);

  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<"capture" | "approach">(
    "capture"
  );
  const isInView = useInView(sectionRef, { once: true });

  // Memoized animation configs
  const animationConfig = useMemo(
    () => ({
      letterVariants: {
        hidden: { opacity: 0, filter: "blur(2px)" },
        visible: {
          opacity: 1,
          filter: "blur(0px)",
          transition: {
            duration: 1,
            ease: cubicBezier(0.25, 0.46, 0.45, 0.94),
          },
        },
      },
      containerVariants: {
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } },
      },
      imageRevealVariants: {
        hidden: { opacity: 0, clipPath: "inset(50%)" },
        visible: { opacity: 1, clipPath: "inset(0%)" },
      },
      imageTransition: {
        duration: 1.4,
        ease: cubicBezier(0.25, 0.46, 0.45, 0.94),
      },
    }),
    []
  );

  // Tab change handler
  const handleSectionChange = useCallback((section: "capture" | "approach") => {
    setActiveSection(section);
  }, []);

  // Split titles into words, then letters for animation
  const captureWords = useMemo(
    () => (data?.whatICaptureTab?.title || "WHERE MY LENS LEADS").split(" "),
    [data?.whatICaptureTab?.title]
  );

  // TabButton (shared)
  const TabButton = ({
    isActive,
    onClick,
    title,
    className = "",
    labelColor,
    titleColor,
  }: {
    isActive: boolean;
    onClick: () => void;
    title: string;
    className?: string;
    labelColor: string;
    titleColor: string;
  }) => (
    <button
      className={`flex-1 py-4 px-4 text-center transition-all duration-300 ${className}`}
      onClick={onClick}
      aria-pressed={isActive}
    >
      <div className="space-y-1">
        <span
          className={`font-instrument-serif uppercase font-medium block text-xl ${titleColor}`}
        >
          {title}
        </span>
      </div>
    </button>
  );
  return (
    <div ref={sectionRef}>
      {/* Mobile Tab Switcher */}
      <div className="lg:hidden w-full bg-brown-one/90 backdrop-blur-sm relative z-20">
        <div className="flex">
          <TabButton
            isActive={activeSection === "capture"}
            onClick={() => handleSectionChange("capture")}
            title="WHAT I CAPTURE"
            className="bg-brown-one"
            labelColor="text-beige-two"
            titleColor="text-beige-one"
          />
          <TabButton
            isActive={activeSection === "approach"}
            onClick={() => handleSectionChange("approach")}
            title="MY APPROACH"
            className="bg-beige-two border-l border-black/20"
            labelColor="text-brown-one"
            titleColor="text-brown-one"
          />
        </div>
      </div>

      {/* Wrapper */}
      <div className="flex min-h-fit relative z-20">
        {/* Desktop Sidebar */}
        <div className="hidden lg:flex">
          {[
            {
              section: "capture" as const,

              title: "WHAT I CAPTURE",
              bgClass: "bg-brown-one",
              labelColor: "text-beige-two",
              titleColor: "text-beige-one",
            },
            {
              section: "approach" as const,

              title: "MY APPROACH",
              bgClass: "bg-beige-two border border-black",
              labelColor: "text-brown-one",
              titleColor: "text-brown-one",
            },
          ].map(({ section, title, bgClass, labelColor, titleColor }) => (
            <div
              key={section}
              className={`w-24 flex items-center justify-center cursor-pointer transition-all duration-300 ${bgClass}`}
              onClick={() => handleSectionChange(section)}
            >
              <div className="absolute top-12"></div>
              <div className="transform -rotate-90 origin-center">
                <span
                  className={`font-instrument-serif uppercase whitespace-nowrap transition-colors ${titleColor}`}
                  style={{ fontSize: fontSizes.approachSidebarText }}
                >
                  {title}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="w-full pt-4 lg:pt-8 relative">
          {/* --- WHAT I CAPTURE --- */}
          {activeSection === "capture" && (
            <>
              <div className="flex flex-col justify-between">
                <div className="relative pb-6 lg:pb-10 px-[5vw] lg:px-[3.5vw] overflow-hidden">
                  {/* Desktop Quote */}
                  <div className="hidden lg:block absolute top-12 right-15 transform -rotate-10 origin-top-right">
                    <p
                      className="font-la-belle-aurore text-black"
                      style={{ fontSize: fontSizes.approachQuote }}
                    >
                      {data?.whatICaptureTab?.quote ||
                        '"Because these days are worth remembering. ♡"'}
                    </p>
                    <div className="absolute top-14 right-5">
                      <Image
                        src="/dots-2.svg"
                        alt="Decorative dots"
                        width={210}
                        height={136}
                      />
                    </div>
                  </div>

                  {/* Mobile Quote */}
                  <div className="lg:hidden text-center pt-4 mb-4 -rotate-3">
                    <p
                      className="font-la-belle-aurore text-black"
                      style={{ fontSize: fontSizes.bodyMedium }}
                    >
                      {data?.whatICaptureTab?.quote ||
                        '"Because these days are worth remembering. ♡"'}
                    </p>
                  </div>

                  {/* Title Animation - Fixed Word Breaking */}
                  <div className="flex flex-col items-start gap-4 lg:gap-8">
                    <motion.h2
                      className="font-domaine-display font-semibold text-brown-one relative inline-block text-center lg:text-left w-full lg:w-auto word-underline"
                      style={{ fontSize: fontSizes.approachTitle }}
                      variants={animationConfig.containerVariants}
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                    >
                      {captureWords.map((word, wordIndex) => (
                        <span
                          key={wordIndex}
                          className="inline-block whitespace-nowrap"
                        >
                          {word.split("").map((char, charIndex) => (
                            <motion.span
                              key={`${wordIndex}-${charIndex}`}
                              variants={animationConfig.letterVariants}
                              className="inline-block"
                            >
                              {char}
                            </motion.span>
                          ))}
                          {wordIndex < captureWords.length - 1 && (
                            <motion.span
                              variants={animationConfig.letterVariants}
                              className="inline-block"
                            >
                              &nbsp;
                            </motion.span>
                          )}
                        </span>
                      ))}
                    </motion.h2>

                    <MotionLink
                      href="/investment"
                      className="mx-auto lg:mx-0 w-auto inline-flex items-center justify-center gap-3 px-6 lg:px-10 py-3 lg:py-4 border-2 border-brown-one rounded-full text-brown-one hover:bg-brown-one hover:text-beige-one transition-all duration-300 font-inconsolata font-medium uppercase tracking-wide mt-4 lg:mt-8"
                      style={{ fontSize: fontSizes.approachButtonText }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.8, delay: 1.5 }}
                    >
                      {data?.whatICaptureTab?.ctaButtonText ||
                        "EXPLORE MY PACKAGES"}
                      <svg
                        className="w-4 h-4 rotate-310"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                      >
                        <path d="M8 0L6.59 1.41L12.17 7H0v2h12.17L6.59 14.59L8 16l8-8z" />
                      </svg>
                    </MotionLink>
                  </div>
                </div>{" "}
                {/* Categories */}
                <div className="flex flex-wrap lg:flex-nowrap justify-center gap-6 lg:gap-0 lg:justify-between bg-[#4C453B] w-full pb-6 lg:pb-10 pt-8 lg:pt-14 px-[5vw] lg:px-[3.5vw] relative z-30">
                  <div
                    className="absolute inset-0 z-30 opacity-30 pointer-events-none"
                    style={{
                      backgroundImage: "url('/grain.webp')",
                      backgroundRepeat: "repeat",
                    }}
                  />                  {data?.whatICaptureTab?.categories?.map((category, index) => {
                    // Determine which portfolio tab to link to based on category title
                    const categoryTitle = category.title?.toLowerCase() || '';
                    const isWeddingCategory = categoryTitle.includes('wedding');
                    const portfolioTab = isWeddingCategory ? 'weddings' : 'lifestyle';
                    
                    return (
                    <Link
                      key={category.title || index}
                      href={`/portfolio?tab=${portfolioTab}`}
                      className="relative z-40 lg:text-left w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-[350px] xl:max-w-[380px] group cursor-pointer block"
                    >
                      <motion.h3
                        className="font-instrument-serif font-medium text-beige-two pb-4 lg:pb-6 uppercase text-center group-hover:text-beige-one transition-colors duration-300"
                        style={{ fontSize: fontSizes.approachCategoryTitle }}
                        initial={{
                          opacity: 0,
                          y: 20,
                          filter: "blur(2px)",
                        }}
                        whileInView={{
                          opacity: 1,
                          y: 0,
                          filter: "blur(0px)",
                        }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{
                          duration: 0.8,
                          ease: [0.25, 0.46, 0.45, 0.94],
                          delay: index * 0.15,
                        }}
                      >
                        {category.title}
                      </motion.h3>{" "}
                      <div className="aspect-[4/5] relative bg-beige-two border border-black z-40 p-3 group-hover:border-beige-one transition-colors duration-300">
                        <div className="w-full h-full relative overflow-hidden z-40">
                          <motion.div
                            className="w-full h-full relative z-40"
                            variants={animationConfig.imageRevealVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "40%" }}
                            transition={{
                              ...animationConfig.imageTransition,
                              delay: 0.8 + index * 0.2,
                            }}
                          >
                            {category.imageUrl ? (
                              <ImageWithFallback
                                src={category.imageUrl}
                                alt={category.title}
                                fill
                                className="object-cover"
                                fallback={
                                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />
                                }
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />
                            )}                          </motion.div>
                        </div>
                      </div>
                    </Link>
                  );
                  })}
                </div>
              </div>
            </>
          )}

          {/* --- MY APPROACH --- */}
          {activeSection === "approach" && (
            <div className="w-full">
              <div className="relative w-full flex flex-col px-[5vw] lg:px-[3.5vw] pt-4 lg:pt-7 pb-8 lg:pb-12">
                {/* Decorative hearts */}
                <div className="hidden lg:block scale-85 2xl:scale-100 absolute top-2 2xl:top-4 right-18 2xl:right-20">
                  <Image
                    src="/heart-dark.svg"
                    alt="Decorative heart"
                    width={40}
                    height={40}
                  />
                </div>
                <div className="hidden lg:block scale-90 2xl:scale-100 absolute top-0 right-10 opacity-70 rotate-13">
                  <Image
                    src="/heart-dark.svg"
                    alt="Decorative heart"
                    width={30}
                    height={30}
                  />
                </div>{" "}
                {/* Content */}
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-start w-full pt-6">
                  {/* Image */}
                  <div className="w-full lg:w-[40%] xl:w-[35%] order-2 lg:order-1">
                    <div className="aspect-[3/4] mx-auto bg-brown-one p-3 shadow-xl overflow-hidden h-[400px] md:h-[450px] lg:h-[400px] xl:h-[450px]">
                      <div className="w-full h-full relative border border-white/80">
                        <ImageWithFallback
                          src={data?.myApproachTab?.image}
                          alt="My approach to photography"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Text */}
                  <div className="flex flex-col items-start gap-4 lg:gap-8 w-full lg:w-[60%] xl:w-[65%] order-1 lg:order-2">
                    <h2
                      className="font-domaine-display leading-none font-medium text-brown-one text-center lg:text-left w-full"
                      style={{ fontSize: fontSizes.approachWayIWork }}
                    >
                      {data?.myApproachTab?.title}
                    </h2>

                    <div className="space-y-4 lg:space-y-6 text-brown-one">
                      {data?.myApproachTab?.description?.map(
                        (paragraph, index) => {
                          const splitParagraphs = paragraph
                            .split("\n\n")
                            .filter((p) => p.trim());
                          return splitParagraphs.length > 1 ? (
                            splitParagraphs.map((splitPara, splitIndex) => (
                              <p
                                key={`${index}-${splitIndex}`}
                                className="font-inconsolata font-medium leading-relaxed text-center lg:text-left"
                                style={{ fontSize: fontSizes.approachBodyText }}
                              >
                                {splitPara.trim()}
                              </p>
                            ))
                          ) : (
                            <p
                              key={index}
                              className="font-inconsolata font-medium leading-relaxed text-center lg:text-left"
                              style={{ fontSize: fontSizes.approachBodyText }}
                            >
                              {paragraph}
                            </p>
                          );
                        }
                      ) || (
                        <>
                          <p
                            className="font-inconsolata font-medium leading-relaxed text-center lg:text-left"
                            style={{ fontSize: fontSizes.approachBodyText }}
                          >
                            I don&apos;t just take photos - I tune into the
                            energy of the moment, capturing the feelings that
                            can&apos;t be posed or repeated.
                          </p>
                          <p
                            className="font-inconsolata font-medium leading-relaxed text-center lg:text-left"
                            style={{ fontSize: fontSizes.approachBodyText }}
                          >
                            Whether it&apos;s a quiet elopement by the sea or a
                            chaotic, love-filled wedding dance floor - I chase
                            the moments that feel like you.
                          </p>
                        </>
                      )}
                    </div>

                    <Link
                      href="/investment"
                      className="w-full hover:cursor-pointer lg:w-auto inline-flex items-center justify-center lg:justify-start font-instrument-serif text-brown-one hover:bg-brown-one hover:text-beige-one transition-all duration-300 font-medium uppercase tracking-wide underline underline-offset-8"
                      style={{ fontSize: fontSizes.approachButtonText }}
                    >
                      {data?.myApproachTab?.ctaButtonText ||
                        "EXPLORE MY PACKAGES"}
                    </Link>
                  </div>
                </div>
              </div>

              {/* Bottom Quote */}
              <div className="relative w-full h-[200px] lg:h-[300px] mt-4 lg:mt-8 overflow-hidden">
                <ImageWithFallback
                  src={data?.myApproachTab?.bottomQuoteBackground}
                  alt="Approach background"
                  fill
                  className="object-cover object-[50%_40%]"
                  fallback={
                    <div className="w-full h-full bg-gradient-to-br from-brown-one to-beige-one" />
                  }
                />
                <div className="absolute inset-0 bg-brown-one/50" />
                <div className="relative w-full z-10 h-full flex flex-row-reverse items-end pb-6 md:pb-0 md:items-center justify-center lg:justify-start pl-4 lg:pl-20 pr-4 lg:pr-6 text-center lg:text-left">
                  <p
                    className="text-white realtive text-left font-la-belle-aurore max-w-[700px] leading-relaxed transform -rotate-3 lg:-rotate-4 mt-0 lg:mt-10"
                    style={{ fontSize: fontSizes.approachQuote }}
                  >
                    {data?.myApproachTab?.bottomQuote ||
                      '"Every photo is a piece of your story, told with light and love."'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
