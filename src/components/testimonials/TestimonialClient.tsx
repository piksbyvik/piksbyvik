"use client";
import type { ProcessedTestimonialSectionData } from "@/lib/types";
import { fontSizes } from "@/styles/typography";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import React, { useCallback, useMemo, useRef, useState } from "react";

// Fallback testimonials
const fallbackTestimonials = [
  {
    id: 1,
    text: "From the very first meeting, Victoria made us feel completely at ease. On our wedding day, they blended in so effortlessly - capturing the big moments, the quiet glances, and everything in between. Looking through our photos felt like reliving the day all over again. Every image holds so much emotion and beauty. We couldn't have asked for a more perfect way to remember one of the most important days of our lives.",
    author: "Alexis & Nion",
    imageUrl: "/testimonial-1.jpg",
  },
  {
    id: 2,
    text: "From the very first meeting, Victoria made us feel completely at ease. On our wedding day, they blended in so effortlessly - capturing the big moments, the quiet glances, and everything in between. Looking through our photos felt like reliving the day all over again. Every image holds so much emotion and beauty. We couldn't have asked for a more perfect way to remember one of the most important days of our lives.",
    author: "Sarah & Michael",
    imageUrl: "/what-i-capture-weddings-couples.png",
  },
];

interface TestimonialClientProps {
  data?: ProcessedTestimonialSectionData;
  bgColor?: string;
  textColor?: string;
  accentColor?: string;
  borderColor?: string;
  headerColor?: string;
  buttonColor?: string;
  imgBg?: string;
  imgBorder?: string;
}

const TestimonialClient: React.FC<TestimonialClientProps> = ({
  data,
  bgColor = "#403528",
  textColor = "#F3EADB",
  accentColor = "#F5EEE2",
  borderColor = "#F3EADB",
  headerColor = "#F3EADB",
  buttonColor = "#F3EADB",
  imgBg = "#F3EADB",
  imgBorder = "#1e1e1e",
}) => {
  const testimonials = useMemo(
    () => data?.testimonials || fallbackTestimonials,
    [data?.testimonials]
  );

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Group words in pairs to reduce DOM nodes while maintaining similar effect
  const wordPairs = useMemo(() => {
    const words = testimonials[currentTestimonial].text.split(" ");
    const pairs: string[] = [];
    for (let i = 0; i < words.length; i += 2) {
      if (i + 1 < words.length) {
        pairs.push(`${words[i]} ${words[i + 1]}`);
      } else {
        pairs.push(words[i]);
      }
    }
    return pairs;
  }, [testimonials, currentTestimonial]);

  // Debounced navigation handlers
  const handlePrevious = useCallback(() => {
    if (isAnimating || currentTestimonial === 0) return;

    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }

    setIsAnimating(true);
    setCurrentTestimonial((prev) => prev - 1);
    animationTimeoutRef.current = setTimeout(() => setIsAnimating(false), 400);
  }, [isAnimating, currentTestimonial]);

  const handleNext = useCallback(() => {
    if (isAnimating || currentTestimonial === testimonials.length - 1) return;

    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }

    setIsAnimating(true);
    setCurrentTestimonial((prev) => prev + 1);
    animationTimeoutRef.current = setTimeout(() => setIsAnimating(false), 400);
  }, [isAnimating, currentTestimonial, testimonials.length]);

  // Optimized animation variants with GPU acceleration
  const wordPairVariants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        y: 10,
        scale: 0.95,
        filter: "blur(6px)",
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      },
    }),
    []
  );

  const authorVariants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        y: 20,
        x: 15,
        filter: "blur(12px)",
      },
      visible: {
        opacity: 1,
        y: 0,
        x: 0,
        filter: "blur(0px)",
      },
    }),
    []
  );

  const imageVariants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        scale: 0.95,
        rotate: 1.5,
        filter: "blur(6px)",
      },
      visible: {
        opacity: 1,
        scale: 1,
        rotate: 0,
        filter: "blur(0px)",
      },
    }),
    []
  );

  // Preload adjacent images for smoother transitions
  const preloadImages = useMemo(() => {
    const imagesToPreload = [];
    if (currentTestimonial > 0) {
      imagesToPreload.push(testimonials[currentTestimonial - 1].imageUrl);
    }
    if (currentTestimonial < testimonials.length - 1) {
      imagesToPreload.push(testimonials[currentTestimonial + 1].imageUrl);
    }
    return imagesToPreload;
  }, [currentTestimonial, testimonials]);

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section
      className="relative max-w-[2200px] mx-auto w-full overflow-hidden pt-6 lg:pt-10"
      style={{
        background: bgColor,
        color: textColor,
        contain: "layout style paint",
      }}
    >
      {/* Grain overlay with optimized rendering */}
      <div
        className="absolute inset-0 opacity-35 z-5 pointer-events-none"
        style={{
          backgroundImage: "url('/grain.webp')",
          backgroundRepeat: "repeat",
          
          contain: "strict",
        }}
      />

      {/* Reduced wrapper - combined container with direct grid layout */}
      <div
        className="w-full lg:h-full py-8 lg:py-0"
        style={{
          display: "grid",
          gridTemplateRows: "auto 1fr",
          alignItems: "lg:center",
        }}
      >
        {/* Decorative dots */}
        
          <div
            className="absolute top-2 -right-4 md:top-5 md:-right-5 w-40 h-28 md:w-85 md:h-60 scale-[0.8] md:scale-100 z-10"
            style={{ contain: "layout style paint" }}
          >
            <Image src="/dots-light.svg" alt="Decorative dots" width={390} height={340} />
          </div>
        

        {/* Header - Static content */}
        <header className="relative w-full md:w-[50%] px-[5vw] lg:px-[3.5vw] z-20">
          <h2
            className="font-instrument-serif font-light mb-2 relative blue-underline text-left"
            style={{
              fontSize: fontSizes.testimonialTitle,
              color: headerColor,
            }}
          >
            {data?.title?.split(" ")[0] || "LOVE"}{" "}
            <span
              className="inline-block blue-underline"
              style={{ color: headerColor }}
            >
              {data?.title?.split(" ").slice(1).join(" ") || "NOTES"}
            </span>
          </h2>
          <p
            className="font-la-belle-aurore text-center md:text-right italic z-20"
            style={{
              fontSize: fontSizes.approachCategoryTitle,
              color: accentColor,
            }}
          >
            {data?.subtitle || "from my couples ♡"}
          </p>
        </header>

        {/* Main content - Reduced wrapper structure */}
        <main
          className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between border-t border-b px-[5vw] lg:pl-[3.5vw] py-8 lg:py-0 relative"
          style={{
            borderColor: borderColor,
            background: bgColor,
          }}
        >
          {/* Left decorative dots */}
          <div
              className="hidden lg:block absolute -top-25 -left-20 w-80 h-56 z-0 opacity-80 scale-90"
              style={{ contain: "layout style paint" }}
            >
             <Image src="/dots-light.svg" alt="Decorative dots" width={210} height={136} />
            </div>

          {/* Image container with preloading */}
          <div className="order-1 lg:order-2 w-full lg:w-1/2 flex justify-center lg:justify-end z-20 mb-8 lg:mb-0 px-0">
            <figure
              className="relative aspect-[4/3] w-full max-w-[400px] lg:max-w-none overflow-hidden p-3"
              style={{
                backgroundColor: imgBg,
                contain: "layout style paint size",
              }}
            >
              {/* Main image with optimized transitions */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  className="w-full h-full relative"
                  style={{
                    borderColor: imgBorder,
                    borderWidth: 1,
                    borderStyle: "solid",
                    transform: "translate3d(0,0,0)", // Force GPU layer
                  }}
                  variants={imageVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  transition={{
                    duration: 0.4,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  <Image
                    src={testimonials[currentTestimonial].imageUrl}
                    alt="Wedding photography testimonial"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 400px, 600px"
                    priority={currentTestimonial === 0}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Hidden preload images */}
              {preloadImages.map((imageSrc, index) => (
                <Image
                  key={`preload-${imageSrc}`}
                  src={imageSrc}
                  alt=""
                  width={1}
                  height={1}
                  style={{
                    position: "absolute",
                    opacity: 0,
                    pointerEvents: "none",
                    zIndex: -1,
                  }}
                />
              ))}
            </figure>
          </div>

          {/* Text content - Reduced wrapper structure */}
          <article
            className="order-2 lg:order-1 w-full lg:w-[40%] z-20"
            style={{ color: textColor }}
          >
            {/* Testimonial text with word pairs */}
            <blockquote className="mt-4 xl:mt-0 mb-6 lg:mb-8">
              <p
                className="font-inconsolata leading-relaxed mb-6 lg:mb-8 text-center lg:text-left"
                style={{
                  fontSize: fontSizes.approachBodyText,
                  color: textColor,
                }}
              >
                {wordPairs.map((wordPair, index) => (
                  <motion.span
                    key={`${currentTestimonial}-pair-${index}`}
                    className="inline-block"
                    style={{ transform: "translate3d(0,0,0)" }} // GPU acceleration
                    variants={wordPairVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={{
                      duration: 0.2,
                      ease: [0.25, 0.46, 0.45, 0.94],
                      delay: 0.07 + index * 0.04, // Slightly slower to compensate for pairs
                    }}
                  >
                    {wordPair}
                    {index < wordPairs.length - 1 ? "\u00A0" : ""}
                  </motion.span>
                ))}
              </p>

              {/* Author signature */}
              <AnimatePresence mode="wait">
                <motion.cite
                  key={`author-${currentTestimonial}`}
                  className="font-la-belle-aurore italic text-center lg:text-right"
                  style={{
                    fontSize: fontSizes.bodyMedium,
                    color: accentColor,
                    transform: "translate3d(0,0,0)", // GPU acceleration
                    display: "block",
                  }}
                  variants={authorVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  transition={{
                    duration: 0.4,
                    ease: [0.25, 0.46, 0.45, 0.94],
                    delay: 0.4,
                  }}
                >
                  {testimonials[currentTestimonial].author}
                </motion.cite>
              </AnimatePresence>
            </blockquote>

            {/* Navigation buttons */}
            <nav className="flex gap-4 justify-between items-center">
              <button
                className="flex-1 font-inconsolata transition-colors duration-300 uppercase tracking-wider border-b pb-1 text-center"
                style={{
                  fontSize: fontSizes.buttonText,
                  color: buttonColor,
                  borderColor: buttonColor,
                  opacity: currentTestimonial === 0 ? 0.5 : 1,
                  cursor: currentTestimonial === 0 ? "not-allowed" : "pointer",
                }}
                onClick={handlePrevious}
                disabled={currentTestimonial === 0 || isAnimating}
                type="button"
                aria-label="Previous testimonial"
              >
                PREVIOUS NOTE
              </button>

              <button
                className="flex-1 font-inconsolata transition-colors duration-300 uppercase tracking-wider border-b pb-1 text-center"
                style={{
                  fontSize: fontSizes.buttonText,
                  color: buttonColor,
                  borderColor: buttonColor,
                  opacity: currentTestimonial === testimonials.length - 1 ? 0.5 : 1,
                  cursor: currentTestimonial === testimonials.length - 1 ? "not-allowed" : "pointer",
                }}
                onClick={handleNext}
                disabled={currentTestimonial === testimonials.length - 1 || isAnimating}
                type="button"
                aria-label="Next testimonial"
              >
                NEXT NOTE
              </button>
            </nav>
          </article>
        </main>
      </div>
    </section>
  );
};

export default TestimonialClient;