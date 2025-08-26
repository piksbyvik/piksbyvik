"use client";
import { fontSizes } from "@/styles/typography";
import { cn } from "@/lib/utils";
import { cubicBezier, motion } from "motion/react";
import { useMemo } from "react";

const headingWords = [
  { word: "CAPTURING", line: 1 },
  { word: "CAPTIVATING", line: 1, special: "captivating" },
  { word: "&", line: 1, special: "and" },
  { word: "Real", line: 2, special: "real" },
  { word: "CONNECTIONS", line: 2, special: "connections" },
];

export function HeadingText() {
  // Memoize animation variants to prevent recreation
  const animationVariants = useMemo(() => ({
    initial: {
      clipPath: "inset(0 100% 0 0)",
      opacity: 0,
      filter: "blur(4px)"
    },
    animate: {
      clipPath: "inset(0 -5% 0 0)",
      opacity: 1,
      filter: "blur(0px)"
    }
  }), []);

  // Optimized transition settings
  const transition = useMemo(() => ({
    duration: 1, // Reduced from 1.2
    ease: cubicBezier(0.25, 0.46, 0.45, 0.94),
  }), []);

  return (
    <h1
      style={{ wordSpacing: "0.2em", color: "#F3EADB" }}
      className="text-[24px] md:text-[48px] order-1 md:order-none"
    >
      <div>
        {/* First line */}
        <div className="flex flex-wrap items-baseline leading-tight lg:leading-none lg:mb-4">
          {headingWords
            .filter((item) => item.line === 1)
            .map((item, index) => (
              <motion.span
                key={index}
                variants={animationVariants}
                initial="initial"
                animate="animate"
                transition={{
                  ...transition,
                  delay: index * 0.2, // Reduced from 0.3
                }}
                className={cn(
                  "mr-2 md:mr-[18px] will-change-transform",
                  item.word === "&" ? "italic font-instrument-serif" : "font-domaine-display"
                )}
                style={{
                  color: item.word === "&" ? "#B2C3D3" : "#F3EADB",
                  fontSize: fontSizes.heroTitle,
                }}
              >
                {item.word}
              </motion.span>
            ))}
        </div>

        {/* Second line */}
        <div className="flex flex-wrap items-baseline">
          {headingWords
            .filter((item) => item.line === 2)
            .map((item, index) => (
              <motion.span
                key={index + 3}
                variants={animationVariants}
                initial="initial"
                animate="animate"
                transition={{
                  ...transition,
                  delay: (index + 3) * 0.2, // Reduced from 0.3
                }}
                className={cn(
                  "mr-4 md:mr-[18px] will-change-transform",
                  item.word === "Real" && "font-travel-november leading-tight",
                  item.word === "CONNECTIONS" && "tracking-wide font-domaine-display font-medium leading-tight"
                )}
                style={{
                  color: item.word === "Real" ? "#B2C3D3" : "#B2C3D3",
                  fontSize:
                    item.word === "Real"
                      ? fontSizes.heroReal
                      : fontSizes.heroTitle,
                }}
              >
                {item.word}
              </motion.span>
            ))}
        </div>
      </div>
    </h1>
  );
}
