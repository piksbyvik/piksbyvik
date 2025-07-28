"use client";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useImageRevealAnimations = (containerRef: React.RefObject<HTMLDivElement | null>) => {
  useGSAP(() => {
    // Basic image reveal animation
    const imageRevealItems = containerRef.current?.querySelectorAll("[data-image-reveal]");
    
    if (imageRevealItems?.length) {
      imageRevealItems.forEach((item, index) => {
        const imageElement = item as HTMLElement;

        // Initial state
        gsap.set(imageElement, {
          opacity: 0,
          clipPath: "inset(25%)",
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true,
          }
        });

        // Add will-change for smoother animation
        (imageElement as HTMLElement).style.willChange = 'clip-path, opacity';

        // Reveal the image with clip-path
        tl.to(imageElement, {
          opacity: 1,
          clipPath: "inset(0%)",
          duration: 1.2,
          ease: "power2.out",
          delay: index * 0.1,
          onComplete: () => {
            // Remove will-change after animation completes
            (imageElement as HTMLElement).style.willChange = 'auto';
          }
        });
      });
    }

  }, { scope: containerRef });
};
