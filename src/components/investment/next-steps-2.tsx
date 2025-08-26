"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { easeInOut, motion, useInView } from "motion/react";
import { InvestmentNextStepsData } from "@/sanity/queries";

interface NextSteps2Props {
  data?: InvestmentNextStepsData;
}

export default function NextSteps2({ data }: NextSteps2Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const mobileColRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(sectionRef, { once: true, margin: "-40%" });
  const titleInView = useInView(titleRef, { once: true, margin: "-20%" });
  const lineInView = useInView(lineRef, { once: true, margin: "-30%" });

  // Fallback data
  const fallbackData = {
    title: "YOUR JOURNEY WITH ME",
    subtitle: "from hello to forever",
    steps: [
      {
        number: 1,
        title: "Inquiry",
        description:
          "Tell me all about you, the little details, the big dreams, and everything in between. Every inquiry feels like the beginning of something beautiful.",
      },
      {
        number: 2,
        title: "Meeting",
        description:
          "Let's schedule a virtual meeting to walk through the details. We'll go over the investment options that best suit your needs for the big day.",
      },
      {
        number: 3,
        title: "Booking",
        description:
          "Once you're ready, I'll send over the contract and a custom planning portal. From timelines to must-capture moments, everything will be in one cozy digital home.",
      },
      {
        number: 4,
        title: "Session Day",
        description:
          "The magic happens! We'll capture every beautiful moment, laugh together, and create memories that will last a lifetime.",
      },
    ],
  };

  const content = data || fallbackData;

  // Organize steps for layout
  const leftSteps = content.steps.filter((step) => step.number % 2 === 0);
  const rightSteps = content.steps.filter((step) => step.number % 2 === 1);

  // Animation variants
  const decorativeVariants = {
    hidden: { opacity: 0, scale: 0.7 },
    visible: { opacity: 1, scale: 1 },
  };

  const floatingAnimation = {
    y: [0, 10, 0],
    rotate: [0, 3, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: easeInOut,
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  };

  const stepVariantsRight = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  };

  const stepVariantsMobile = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full flex flex-col items-center py-8 md:py-12 lg:py-16"
      style={{
        background: "var(--color-beige-one)",
        color: "var(--color-brown-one)",
        fontFamily: "'Instrument Serif', serif",
      }}
    >
      {/* Decorative elements with Motion animations */}
      <motion.div
        className="absolute top-[200px] right-[20%] hidden md:block z-10"
        variants={decorativeVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <motion.div animate={floatingAnimation}>
          <Image
            src="/heart-dark.svg"
            alt=""
            width={31}
            height={34}
            className="select-none"
            style={{ opacity: 0.7 }}
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute top-[25%] left-[40%] hidden lg:block z-10"
        variants={decorativeVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: 0.2,
        }}
      >
        <motion.div
          animate={{
            ...floatingAnimation,
            transition: { ...floatingAnimation.transition, delay: 0.5 },
          }}
        >
          <Image
            src="/heart-black.svg"
            alt=""
            width={31}
            height={34}
            className="select-none"
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute top-1/2 left-[55%] hidden md:block z-10"
        variants={decorativeVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: 0.4,
        }}
      >
        <motion.div
          animate={{
            ...floatingAnimation,
            transition: { ...floatingAnimation.transition, delay: 1 },
          }}
        >
          <Image
            src="/heart-dark.svg"
            alt=""
            width={31}
            height={34}
            className="select-none"
            style={{ opacity: 0.6, transform: "rotate(4deg)" }}
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-[30%] left-[40%] hidden lg:block z-10 opacity-80"
        variants={decorativeVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: 0.2,
        }}
      >
        <motion.div
          animate={{
            ...floatingAnimation,
            transition: { ...floatingAnimation.transition, delay: 0.5 },
          }}
        >
          <Image
            src="/heart-black.svg"
            alt=""
            width={31}
            height={34}
            className="select-none"
          />
        </motion.div>
      </motion.div>

      <div className="absolute top-[450px] left-[-5%] hidden lg:block">
        <Image
          src="/dots-dark.svg"
          alt=""
          width={312}
          height={292}
          className="select-none"
        />
      </div>

      <div
        className="absolute top-0 right-[-5%] hidden lg:block"
        
      >
        <Image
            src="/dots-dark.svg"
            alt=""
            width={370}
            height={320}
            className="select-none"
            style={{ opacity: 0.8 }}
          />
      </div>

      <div
        className="absolute inset-0 z-5 opacity-12 pointer-events-none"
        style={{
          backgroundImage: "url('/grain.webp')",

          backgroundRepeat: "repeat",
        }}
      />

      <div className="max-w-7xl w-full mx-auto px-[5vw] lg:px-[3.5vw]">
        <div
          ref={titleRef}
          className="flex flex-col items-center mb-8 md:mb-12"
        >
          <motion.h2
            className="text-center font-serif"
            style={{
              fontSize: "clamp(28px, 4vw, 56px)",
              fontWeight: 400,
              letterSpacing: "1px",
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {content.title}
          </motion.h2>
          <motion.span
            className="block font-script mt-2"
            style={{
              fontSize: "clamp(20px, 2.5vw, 40px)",
              color: "var(--color-dark-beige)",
              fontFamily: "'La Belle Aurore', cursive",
              letterSpacing: "1px",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.2,
            }}
          >
            {content.subtitle}
          </motion.span>
        </div>

        {/* Mobile Layout */}
        <div ref={mobileColRef} className="block md:hidden">
          <div className="flex flex-col space-y-8">
            {content.steps.map((step, index) => (
              <motion.div
                key={step.number}
                variants={stepVariantsMobile}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-20%" }}
                transition={{
                  duration: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: index * 0.2,
                }}
              >
                <MobileStepItem
                  number={step.number}
                  title={step.title}
                  text={step.description}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Desktop Layout */}
        <div
          className="relative hidden md:flex w-full"
          style={{ minHeight: "600px" }}
        >
          {/* Left column */}
          <div
            ref={leftColRef}
            className="flex flex-col flex-1 pr-4 lg:pr-8 relative"
          >
            {leftSteps.map((step, index) => (
              <motion.div
                key={step.number}
                style={{ marginTop: index === 0 ? "80px" : "120px" }}
                variants={stepVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30%" }}
                transition={{
                  duration: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: index * 0.3,
                }}
              >
                <StepItem
                  number={step.number}
                  title={step.title}
                  text={step.description}
                  align="left"
                />
              </motion.div>
            ))}
          </div>

          {/* Center line */}
          <motion.div
            ref={lineRef}
            className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2"
            style={{
              width: "2px",
              background: "var(--color-brown-one)",
              height: "100%",
              opacity: 0.5,
              zIndex: 2,
            }}
            initial={{ height: 0 }}
            animate={lineInView ? { height: "100%" } : {}}
            transition={{
              duration: 1.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          />

          {/* Right column */}
          <div
            ref={rightColRef}
            className="flex flex-col flex-1 pl-4 lg:pl-8 relative"
          >
            {rightSteps.map((step, index) => (
              <motion.div
                key={step.number}
                style={{ marginTop: index === 0 ? "0px" : "60px" }}
                variants={stepVariantsRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30%" }}
                transition={{
                  duration: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: index * 0.3,
                }}
              >
                <StepItem
                  number={step.number}
                  title={step.title}
                  text={step.description}
                  align="right"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Component functions remain the same
function MobileStepItem({
  number,
  title,
  text,
}: {
  number: number;
  title: string;
  text: string;
}) {
  return (
    <div
      className="relative flex items-center mb-8"
      style={{
        minHeight: "100px",
        maxWidth: "100%",
      }}
    >
      <motion.span
        className="absolute select-none"
        style={{
          fontSize: "clamp(60px, 12vw, 80px)",
          color: "var(--color-dark-beige)",
          opacity: 0.18,
          fontWeight: 500,
          left: "-5px",
          top: "5px",
          zIndex: 0,
          fontFamily: "'Instrument Serif', serif",
          pointerEvents: "none",
          textShadow: "0 2px 8px rgba(64, 53, 40, 0.1)",
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.18, scale: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.6,
          ease: [0.68, -0.55, 0.265, 1.55], // back.out
          delay: 0.2,
        }}
      >
        {number}
      </motion.span>

      <div
        className="relative flex items-center text-left flex-row"
        style={{ width: "100%", zIndex: 1 }}
      >
        <div
          style={{
            marginLeft: "50px",
            marginRight: "0",
            maxWidth: "calc(100% - 60px)",
          }}
        >
          <h3
            className="font-travel-november"
            style={{
              fontSize: "clamp(20px, 4vw, 24px)",
              color: "var(--color-brown-one)",
              fontWeight: 400,
              marginBottom: "6px",
              letterSpacing: "1px",
            }}
          >
            {title}
          </h3>
          <span
            className="font-inconsolata"
            style={{
              fontSize: "clamp(14px, 3vw, 16px)",
              color: "var(--color-brown-one)",
              letterSpacing: "0.3px",
              lineHeight: 1.6,
              fontWeight: 400,
            }}
          >
            {text}
          </span>
        </div>
        <motion.svg
          width="50"
          height="2"
          viewBox="0 0 50 2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            marginLeft: "16px",
            flexShrink: 0,
          }}
          initial={{ width: 0 }}
          whileInView={{ width: 50 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.4,
          }}
        >
          <line x1="0" y1="1" x2="50" y2="1" stroke="#403528" strokeWidth="2" />
        </motion.svg>
      </div>
    </div>
  );
}

function StepItem({
  number,
  title,
  text,
  align = "left",
}: {
  number: number;
  title: string;
  text: string;
  align: "left" | "right";
}) {
  return (
    <div
      className={`relative flex items-center mb-20 ${
        align === "right" ? "justify-end" : ""
      }`}
      style={{
        minHeight: "140px",
        maxWidth: "520px",
        marginLeft: align === "left" ? "0" : "auto",
        marginRight: align === "right" ? "0" : "auto",
      }}
    >
      <motion.span
        className="absolute select-none"
        style={{
          fontSize: "clamp(90px,9vw,140px)",
          color: "var(--color-dark-beige)",
          opacity: 0.18,
          fontWeight: 500,
          left: align === "left" ? "-15px" : "auto",
          right: align === "right" ? "-15px" : "auto",
          top: "5px",
          zIndex: 0,
          fontFamily: "'Instrument Serif', serif",
          pointerEvents: "none",
          textShadow: "0 2px 8px rgba(64, 53, 40, 0.1)",
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.18, scale: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.6,
          ease: [0.68, -0.55, 0.265, 1.55],
          delay: 0.2,
        }}
      >
        {number}
      </motion.span>

      <div
        className="absolute hidden lg:block"
        style={{
          width: "4px",
          height: "4px",
          backgroundColor: "var(--color-dark-beige)",
          borderRadius: "50%",
          opacity: 0.6,
          top: "50%",
          left: align === "left" ? "450px" : "auto",
          right: align === "right" ? "450px" : "auto",
          transform: "translateY(-50%)",
          zIndex: 3,
        }}
      />

      <div
        className={`relative flex items-center text-left ${
          align === "right" ? "flex-row" : "flex-row"
        }`}
        style={{ width: "100%", zIndex: 1 }}
      >
        {align === "right" && (
          <motion.svg
            width="70"
            height="2"
            viewBox="0 0 70 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="hidden lg:block"
            style={{
              marginRight: "24px",
              flexShrink: 0,
            }}
            initial={{ width: 0 }}
            whileInView={{ width: 70 }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.3,
            }}
          >
            <line
              x1="0"
              y1="1"
              x2="70"
              y2="1"
              stroke="#403528"
              strokeWidth="2"
            />
          </motion.svg>
        )}

        <div
          style={{
            marginLeft: align === "left" ? "65px" : "0",
            marginRight: "0",
            maxWidth: "340px",
          }}
        >
          <h3
            className="font-travel-november"
            style={{
              fontSize: "clamp(24px, 2.5vw, 32px)",
              color: "var(--color-brown-one)",
              fontWeight: 400,
              marginBottom: "8px",
              letterSpacing: "1px",
            }}
          >
            {title}
          </h3>
          <span
            className="font-inconsolata tracking-tight"
            style={{
              fontSize: "clamp(16px, 1.6vw, 20px)",
              color: "var(--color-brown-one)",
              letterSpacing: "0.3px",
              lineHeight: 1.6,
              fontWeight: 400,
            }}
          >
            {text}
          </span>
        </div>

        {align === "left" && (
          <motion.svg
            width="70"
            height="2"
            viewBox="0 0 70 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="hidden lg:block"
            style={{
              marginLeft: "24px",
              flexShrink: 0,
            }}
            initial={{ width: 0 }}
            whileInView={{ width: 70 }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.3,
            }}
          >
            <line
              x1="0"
              y1="1"
              x2="70"
              y2="1"
              stroke="#403528"
              strokeWidth="2"
            />
          </motion.svg>
        )}
      </div>
    </div>
  );
}
