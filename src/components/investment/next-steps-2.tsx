"use client"
import React, { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
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
  const decorativeRefs = useRef<HTMLDivElement[]>([]);

  // Track decorative elements refs
  const addToDecorativeRefs = (el: HTMLDivElement | null) => {
    if (el && !decorativeRefs.current.includes(el)) {
      decorativeRefs.current.push(el);
    }
  };

  // Fallback data
  const fallbackData = {
    title: "YOUR JOURNEY WITH ME",
    subtitle: "from hello to forever",
    steps: [
      {
        number: 1,
        title: "Inquiry",
        description: "Tell me all about you, the little details, the big dreams, and everything in between. Every inquiry feels like the beginning of something beautiful."
      },
      {
        number: 2,
        title: "Meeting",
        description: "Let's schedule a virtual meeting to walk through the details. We'll go over the investment options that best suit your needs for the big day."
      },
      {
        number: 3,
        title: "Booking",
        description: "Once you're ready, I'll send over the contract and a custom planning portal. From timelines to must-capture moments, everything will be in one cozy digital home."
      },
      {
        number: 4,
        title: "Session Day",
        description: "The magic happens! We'll capture every beautiful moment, laugh together, and create memories that will last a lifetime."
      }
    ]
  };

  const content = data || fallbackData;

  // Organize steps for layout
  const leftSteps = content.steps.filter(step => step.number % 2 === 0);
  const rightSteps = content.steps.filter(step => step.number % 2 === 1);

  // Replace useEffect with useGSAP
  useGSAP(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Title animation
    const titleAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 80%",
        once: true,
      }
    });

    // Get elements safely
    const h2Element = titleRef.current?.querySelector("h2");
    const spanElement = titleRef.current?.querySelector("span");
    
    // Only animate if elements exist
    if (h2Element) {
      titleAnimation.from(h2Element, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      });
    }
    
    if (spanElement) {
      titleAnimation.from(spanElement, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.5");
    }

    // Center line animation
    if (lineRef.current) {
      gsap.from(lineRef.current, {
        height: 0,
        duration: 1.2,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: lineRef.current,
          start: "top 70%",
          once: true,
        }
      });
    }

    // Decorative elements animations
    if (decorativeRefs.current.length > 0) {
      decorativeRefs.current.forEach((el, index) => {
        gsap.from(el, {
          opacity: 0,
          scale: 0.7,
          duration: 0.8,
          delay: 0.2 * index,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            once: true,
          }
        });

        // Add subtle float animation
        gsap.to(el, {
          y: "10px",
          rotation: index % 2 === 0 ? "3deg" : "-3deg",
          duration: 4 + index,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: index * 0.5
        });
      });
    }

    // Desktop layout - left column steps animation
    if (leftColRef.current) {
      const leftStepItems = leftColRef.current.querySelectorAll('[data-step-item]');
      if (leftStepItems && leftStepItems.length > 0) {
        gsap.from(leftStepItems, {
          x: -40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: leftColRef.current,
            start: "top 70%",
            once: true,
          }
        });
      }
    }

    // Desktop layout - right column steps animation
    if (rightColRef.current) {
      const rightStepItems = rightColRef.current.querySelectorAll('[data-step-item]');
      if (rightStepItems && rightStepItems.length > 0) {
        gsap.from(rightStepItems, {
          x: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: rightColRef.current,
            start: "top 70%",
            once: true,
          }
        });
      }
    }

    // Mobile layout steps animation
    if (mobileColRef.current) {
      const mobileStepItems = mobileColRef.current.querySelectorAll('[data-step-item]');
      if (mobileStepItems && mobileStepItems.length > 0) {
        gsap.from(mobileStepItems, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: mobileColRef.current,
            start: "top 80%",
            once: true,
          }
        });
      }
    }

    // Line animations for each step
    const stepLines = document.querySelectorAll('[data-step-line]');
    if (stepLines && stepLines.length > 0) {
      stepLines.forEach((line) => {
        gsap.from(line, {
          width: 0,
          duration: 1,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: line,
            start: "top 85%",
            once: true
          }
        });
      });
    }

    // Number animations
    const stepNumbers = document.querySelectorAll('[data-step-number]');
    if (stepNumbers && stepNumbers.length > 0) {
      stepNumbers.forEach((number) => {
        gsap.from(number, {
          opacity: 0,
          scale: 0.8,
          duration: 0.6,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: number,
            start: "top 85%",
            once: true
          }
        });
      });
    }

    return () => {
      // Clean up animations when component unmounts
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      gsap.killTweensOf("*");
    };
  }, { scope: sectionRef, dependencies: [] });

  // Replace the decorative elements section with this improved version
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
      {/* Decorative elements positioned relative to main container - made more visible */}
      <div className="absolute top-[200px] right-[20%] hidden md:block z-10" ref={(el) => addToDecorativeRefs(el)}>
        <Image
          src="/heart.svg"
          alt=""
          width={31}
          height={34}
          className="select-none"
          style={{
            opacity: 0.7,
          }}
        />
      </div>
      <div className="absolute top-[25%] left-[40%] hidden lg:block z-10" ref={(el) => addToDecorativeRefs(el)}>
        <Image
          src="/heart.svg"
          alt=""
          width={31}
          height={34}
          className="select-none"
          style={{
            opacity: 1,
          }}
        />
      </div>
      <div className="absolute top-[65%] left-[55%] hidden md:block z-10" ref={(el) => addToDecorativeRefs(el)}>
        <Image
          src="/heart.svg"
          alt=""
          width={31}
          height={34}
          className="select-none"
          style={{
            opacity: 0.6,
            transform: "rotate(4deg)",
          }}
        />
      </div>
      <div className="absolute top-[450px] left-[-5%] hidden lg:block" ref={(el) => addToDecorativeRefs(el)}>
        <Image
          src="/dots-2-dark.svg"
          alt=""
          width={312}
          height={292}
          className="select-none"
          style={{
            opacity: 1,
          }}
        />
      </div>
      <div className="absolute top-[50px] right-[-5%] hidden lg:block" ref={(el) => addToDecorativeRefs(el)}>
        <Image
          src="/dots-2-dark.svg"
          alt=""
          width={312}
          height={292}
          className="select-none"
          style={{
            opacity: 0.8,
          }}
        />
      </div>
      
      <div
        className="absolute inset-0 z-[5] opacity-12 pointer-events-none"
        style={{
          backgroundImage: "url('/grain.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />
      
      <div className="max-w-7xl w-full mx-auto px-[5vw] lg:px-[3.5vw]">
        <div ref={titleRef} className="flex flex-col items-center mb-8 md:mb-12">
          <h2
            className="text-center font-serif"
            style={{
              fontSize: "clamp(28px, 4vw, 56px)",
              fontWeight: 400,
              letterSpacing: "1px",
            }}
          >
            {content.title}
          </h2>
          <span
            className="block font-script mt-2"
            style={{
              fontSize: "clamp(20px, 2.5vw, 40px)",
              color: "var(--color-dark-beige)",
              fontFamily: "'La Belle Aurore', cursive",
              letterSpacing: "1px",
            }}
          >
            {content.subtitle}
          </span>
        </div>
        
        {/* Mobile Layout - Single Column */}
        <div ref={mobileColRef} className="block md:hidden">
          <div className="flex flex-col space-y-8">
            {content.steps.map((step) => (
              <MobileStepItem 
                key={step.number}
                number={step.number} 
                title={step.title}
                text={step.description} 
              />
            ))}
          </div>
        </div>

        {/* Desktop Layout - Two Columns */}
        <div className="relative hidden md:flex w-full" style={{ minHeight: "600px" }}>
          {/* Left column with staggered positioning */}
          <div ref={leftColRef} className="flex flex-col flex-1 pr-4 lg:pr-8 relative">
            {leftSteps.map((step, index) => (
              <div key={step.number} style={{ marginTop: index === 0 ? "80px" : "120px" }}>
                <StepItem 
                  number={step.number} 
                  title={step.title}
                  text={step.description} 
                  align="left" 
                />
              </div>
            ))}
          </div>
          {/* Center vertical line */}
          <div
            ref={lineRef}
            className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2"
            style={{
              width: "2px",
              background: "var(--color-brown-one)",
              height: "100%",
              opacity: 0.5,
              zIndex: 2,
            }}
          />
          {/* Right column with staggered positioning */}
          <div ref={rightColRef} className="flex flex-col flex-1 pl-4 lg:pl-8 relative">
            {rightSteps.map((step, index) => (
              <div key={step.number} style={{ marginTop: index === 0 ? "0px" : "60px" }}>
                <StepItem 
                  number={step.number} 
                  title={step.title}
                  text={step.description} 
                  align="right" 
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Separate mobile step item component for cleaner animation handling
function MobileStepItem({ number, title, text }: { number: number, title: string, text: string }) {
  return (
    <div
      data-step-item
      className="relative flex items-center mb-8"
      style={{
        minHeight: "100px",
        maxWidth: "100%",
      }}
    >
      {/* Step number, more prominent */}
      <span
        data-step-number
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
      >
        {number}
      </span>

      {/* Text and underline */}
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
        <svg
          data-step-line
          width="50"
          height="2"
          viewBox="0 0 50 2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            marginLeft: "16px",
            flexShrink: 0,
          }}
        >
          <line x1="0" y1="1" x2="50" y2="1" stroke="#403528" strokeWidth="2" />
        </svg>
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
      data-step-item
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
      {/* Step number, more prominent */}
      <span
        data-step-number
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
      >
        {number}
      </span>

      {/* Additional decorative dot near the line - hidden on mobile */}
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

      {/* Text and underline */}
      <div
        className={`relative flex items-center text-left ${
          align === "right" ? "flex-row" : "flex-row"
        }`}
        style={{ width: "100%", zIndex: 1 }}
      >
        {align === "right" && (
          <svg
            data-step-line
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
          >
            <line x1="0" y1="1" x2="70" y2="1" stroke="#403528" strokeWidth="2" />
          </svg>
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
          <svg
            data-step-line
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
          >
            <line x1="0" y1="1" x2="70" y2="1" stroke="#403528" strokeWidth="2" />
          </svg>
        )}
      </div>
    </div>
  );
}
