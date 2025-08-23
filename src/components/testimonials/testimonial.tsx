"use client";
import { urlFor } from "@/sanity/lib/image";
import type { TestimonialSectionData } from "@/sanity/queries";
import { fontSizes } from "@/styles/typography";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Image from "next/image";
import React, { useRef, useState } from "react";
import DotsPrimary from "../icons/dots-primary";

// Fallback testimonials
const fallbackTestimonials = [
  {
    id: 1,
    text: "From the very first meeting, Victoria made us feel completely at ease. On our wedding day, they blended in so effortlessly - capturing the big moments, the quiet glances, and everything in between. Looking through our photos felt like reliving the day all over again. Every image holds so much emotion and beauty. We couldn't have asked for a more perfect way to remember one of the most important days of our lives.",
    author: "Alexis & Nion",
    image: "/testimonial-1.jpg",
  },
  {
    id: 2,
    text: "From the very first meeting, Victoria made us feel completely at ease. On our wedding day, they blended in so effortlessly - capturing the big moments, the quiet glances, and everything in between. Looking through our photos felt like reliving the day all over again. Every image holds so much emotion and beauty. We couldn't have asked for a more perfect way to remember one of the most important days of our lives.",
    author: "Sarah & Michael",
    image: "/what-i-capture-weddings-couples.png", // Fixed image path
  },
];

interface TestimonialProps {
  data?: TestimonialSectionData;
  bgColor?: string;
  textColor?: string;
  accentColor?: string;
  borderColor?: string;
  headerColor?: string;
  underlineColor?: string;
  buttonColor?: string;
  imgBg?: string;
  imgBorder?: string;
}

const Testimonial: React.FC<TestimonialProps> = ({
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
  // Use Sanity testimonials if available, otherwise fallback
  const testimonials =
    data?.testimonials?.map((testimonial, index) => ({
      id: index + 1,
      text: testimonial.text,
      author: testimonial.author,
      image: urlFor(testimonial.image.asset).url(),
    })) || fallbackTestimonials;

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);

  // Split text into words for animation
  const words = testimonials[currentTestimonial].text.split(" ");

  // GSAP animations using useGSAP hook with proper scoping
  const { contextSafe } = useGSAP({ scope: containerRef });

  const animateIn = contextSafe(() => {
    if (!isAnimatingRef.current) {
      // Animate words in with stagger
      gsap.fromTo(
        "[data-word]",
        {
          opacity: 0,
          y: 15,
          scale: 0.9,
          filter: "blur(8px)",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.3,
          ease: "power2.out",
          stagger: 0.02,
          delay: 0.1,
        }
      );

      // Animate author
      gsap.fromTo(
        "[data-author]",
        {
          opacity: 0,
          y: 20,
          x: 15,
          filter: "blur(12px)",
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          filter: "blur(0px)",
          duration: 0.4,
          ease: "power2.out",
          delay: 0.4,
        }
      );

      // Animate image
      gsap.fromTo(
        "[data-image]",
        {
          opacity: 0,
          scale: 0.9,
          rotation: 2,
          filter: "blur(8px)",
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          filter: "blur(0px)",
          duration: 0.5,
          ease: "power2.out",
          delay: 0.1,
        }
      );
    }
  });

  const animateOut = contextSafe(() => {
    return new Promise<void>((resolve) => {
      // Animate out
      gsap.to(["[data-word]", "[data-author]"], {
        opacity: 0,
        y: -15,
        scale: 0.95,
        filter: "blur(8px)",
        duration: 0.3,
        ease: "power2.in",
      });

      gsap.to("[data-image]", {
        opacity: 0,
        scale: 0.9,
        rotation: -2,
        filter: "blur(8px)",
        duration: 0.3,
        ease: "power2.in",
        onComplete: resolve,
      });
    });
  });

  // Animate in when testimonial changes
  useGSAP(
    () => {
      animateIn();
    },
    { scope: containerRef, dependencies: [currentTestimonial] }
  );

  const handlePrevious = contextSafe(async () => {
    if (isAnimatingRef.current || currentTestimonial === 0) return;

    isAnimatingRef.current = true;
    await animateOut();
    setCurrentTestimonial((prev) => prev - 1);
    isAnimatingRef.current = false;
  });

  const handleNext = contextSafe(async () => {
    if (
      isAnimatingRef.current ||
      currentTestimonial === testimonials.length - 1
    )
      return;

    isAnimatingRef.current = true;
    await animateOut();
    setCurrentTestimonial((prev) => prev + 1);
    isAnimatingRef.current = false;
  });

  return (
    <section
      ref={containerRef}
      className="relative w-screen overflow-hidden pt-6 lg:pt-10 testimonial-section"
      style={{ background: bgColor, color: textColor }}
    >
      {/* Grain overlay */}
      <div
        className="absolute inset-0 z-10 opacity-18 pointer-events-none"
        style={{
          backgroundImage: "url('/grain.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="w-full lg:min-h-screen lg:flex lg:items-center py-8 lg:py-0 testimonial-content">
        <div className="w-full flex flex-col items-start relative">
          {/* Decorative dots - responsive positioning */}
          
          <div className="absolute top-2 -right-4 md:-top-10 md:-right-10 w-40 h-28 md:w-80 md:h-56 scale-[0.8] md:scale-100 z-10">
           <DotsPrimary/>
          </div>

          {/* Header */}
          <div className="w-full md:w-[50%] px-[5vw] lg:px-[3.5vw] mb-4 md:-mb-6 z-20">
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
          </div>

          {/* Main content - responsive layout */}
          <div
            className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between border-t border-b px-[5vw] lg:pl-[3.5vw] py-8 lg:py-0"
            style={{
              borderColor: borderColor,
              background: bgColor,
            }}
          >
            {/* Left decorative dots - only on desktop */}
            
            <div className="hidden lg:block absolute top-[10%] -left-30 w-80 h-56 z-0 opacity-60 scale-90">
              <DotsPrimary/>

            </div>

            {/* Image - mobile first, desktop second */}
            <div className="order-1 lg:order-2 w-full lg:w-1/2 flex justify-center lg:justify-end z-20 mb-8 lg:mb-0 px-0">
              <div
                className="relative aspect-[4/3] w-full max-w-[400px] lg:max-w-none overflow-hidden p-3"
                style={{ backgroundColor: imgBg }}
              >
                <div
                  data-image
                  className="w-full h-full relative"
                  style={{
                    opacity: 0,
                    borderColor: imgBorder,
                    borderWidth: 1,
                    borderStyle: "solid",
                  }}
                >
                  <Image
                    key={currentTestimonial}
                    src={testimonials[currentTestimonial].image}
                    alt="Wedding photography testimonial"
                    fill
                    className="object-cover"
                  />
                </div>

                
              </div>
            </div>

            {/* Text content - mobile second, desktop first */}
            <div
              className="order-2 lg:order-1 w-full lg:w-[40%] z-20 px-4 lg:px-0"
              style={{ color: textColor }}
            >
              {/* Testimonial text */}
              <div className="mb-6 lg:mb-8">
                <p
                  className="font-inconsolata leading-relaxed mb-6 lg:mb-8 text-center lg:text-left"
                  style={{
                    fontSize: fontSizes.approachBodyText,
                    color: textColor,
                  }}
                >
                  {words.map((word, index) => (
                    <span
                      key={`${currentTestimonial}-${index}`}
                      data-word
                      className="inline-block"
                      style={{ opacity: 0 }}
                    >
                      {word}
                      {index < words.length - 1 ? "\u00A0" : ""}
                    </span>
                  ))}
                </p>

                {/* Author signature */}
                <p
                  data-author
                  className="font-la-belle-aurore italic text-center lg:text-right"
                  style={{
                    fontSize: fontSizes.bodyMedium,
                    color: accentColor,
                    opacity: 0,
                  }}
                >
                  {testimonials[currentTestimonial].author}
                </p>
              </div>

              {/* Navigation buttons - side by side on all screen sizes */}
              <div className="flex gap-4 justify-between items-center">
                <button
                  className={`flex-1 font-inconsolata transition-colors duration-300 uppercase tracking-wider border-b pb-1 text-center`}
                  style={{
                    fontSize: fontSizes.buttonText,
                    color: buttonColor,
                    borderColor: buttonColor,
                    opacity: currentTestimonial === 0 ? 0.5 : 1,
                    cursor:
                      currentTestimonial === 0 ? "not-allowed" : "pointer",
                  }}
                  onClick={handlePrevious}
                  disabled={currentTestimonial === 0}
                >
                  PREVIOUS NOTE
                </button>

                <button
                  className={`flex-1 font-inconsolata transition-colors duration-300 uppercase tracking-wider border-b pb-1 text-center`}
                  style={{
                    fontSize: fontSizes.buttonText,
                    color: buttonColor,
                    borderColor: buttonColor,
                    opacity:
                      currentTestimonial === testimonials.length - 1 ? 0.5 : 1,
                    cursor:
                      currentTestimonial === testimonials.length - 1
                        ? "not-allowed"
                        : "pointer",
                  }}
                  onClick={handleNext}
                  disabled={currentTestimonial === testimonials.length - 1}
                >
                  NEXT NOTE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
