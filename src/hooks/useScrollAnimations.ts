"use client";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimations = (containerRef: React.RefObject<HTMLDivElement | null>) => {
  useGSAP(() => {
    if (!containerRef.current) return;

    // Main title animation - elegant letter-by-letter reveal
    const titleElement = containerRef.current.querySelector("[data-fade='heading'] h2");
    if (titleElement) {
      // Split title into individual letters for animation
      const text = titleElement.textContent || '';
      titleElement.innerHTML = text.split('').map((char, index) => {
        if (char === ' ') {
          return ' '; // Preserve spaces
        }
        // Special handling for the underlined word "LENS"
        const wordStart = text.indexOf('LENS');
        const wordEnd = wordStart + 4;
        if (index >= wordStart && index < wordEnd) {
          if (index === wordStart) {
            return `<span class="inline-block relative word-underline"><span class="letter-reveal" data-letter="${index}">${char}</span>`;
          } else if (index === wordEnd - 1) {
            return `<span class="letter-reveal" data-letter="${index}">${char}</span></span>`;
          } else {
            return `<span class="letter-reveal" data-letter="${index}">${char}</span>`;
          }
        }
        return `<span class="letter-reveal" data-letter="${index}">${char}</span>`;
      }).join('');

      const letterElements = titleElement.querySelectorAll('.letter-reveal');
      
      // Initial state - hidden with blur
      gsap.set(letterElements, {
        opacity: 0,
        y: 20,
        filter: "blur(2px)",
      });

      // Elegant letter-by-letter reveal
      gsap.to(letterElements, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: titleElement,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        },
        onComplete: () => {
          // Remove will-change after animation completes
          letterElements.forEach(el => {
            (el as HTMLElement).style.willChange = 'auto';
          });
        }
      });
    }

    // Category titles animation - letter by letter for category headings
    const categoryTitles = containerRef.current.querySelectorAll("[data-fade='categories'] h3");
    categoryTitles.forEach((title, titleIndex) => {
      // Split each category title into letters
      const text = title.textContent || '';
      title.innerHTML = text.split('').map((char, index) => {
        if (char === ' ') {
          return ' '; // Preserve spaces
        }
        return `<span class="category-letter-reveal" data-letter="${index}">${char}</span>`;
      }).join('');

      const letterElements = title.querySelectorAll('.category-letter-reveal');
      
      // Initial state
      gsap.set(letterElements, {
        opacity: 0,
        y: 15,
        filter: "blur(1px)",
      });

      // Letter-by-letter reveal for category titles
      gsap.to(letterElements, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.05,
        scrollTrigger: {
          trigger: title,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        },
        delay: titleIndex * 0.3,
        onComplete: () => {
          // Remove will-change after animation completes
          letterElements.forEach(el => {
            (el as HTMLElement).style.willChange = 'auto';
          });
        }
      });
    });

  }, { scope: containerRef });
};
