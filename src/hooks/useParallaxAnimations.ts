"use client"
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useParallaxAnimations = (containerRef: React.RefObject<HTMLDivElement | null>) => {
  const { contextSafe } = useGSAP(() => {
  
    // Heading words animation - Premium smooth reveal with blur
    gsap.fromTo(
      "[data-word]",
      {
        clipPath: "inset(0 100% 0 0)",
        opacity: 0,
        filter: "blur(4px)",
      },
      {
        clipPath: "inset(0 -5% 0 0)",
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.2, // Slower, more luxurious timing
        ease: "power2.out", // Smoother, more premium easing
        stagger: 0.3, // More deliberate stagger timing
      }
    );

    
  }, { scope: containerRef });

  return { contextSafe };
};

