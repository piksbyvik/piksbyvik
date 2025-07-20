import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useParallaxAnimations = (containerRef: React.RefObject<HTMLDivElement | null>) => {
  const { contextSafe } = useGSAP(() => {
    // Portfolio section animations
    gsap.fromTo(
      "[data-fade='portfolio']",
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: "[data-fade='portfolio']",
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      "[data-fade='portfolio-text']",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: "[data-fade='portfolio-text']",
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      "[data-fade='scroll-text']",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.3,
        scrollTrigger: {
          trigger: "[data-fade='scroll-text']",
          start: "top 80%",
        },
      }
    );

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

    // Hover effect for scroll text
    const scrollText = containerRef.current?.querySelector("[data-fade='scroll-text']") as HTMLElement;
    if (scrollText) {
      const handleMouseEnter = contextSafe(() => {
        gsap.to(scrollText, { y: -5, duration: 0.3 });
      });

      const handleMouseLeave = contextSafe(() => {
        gsap.to(scrollText, { y: 0, duration: 0.3 });
      });

      scrollText.addEventListener("mouseenter", handleMouseEnter);
      scrollText.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        scrollText.removeEventListener("mouseenter", handleMouseEnter);
        scrollText.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, { scope: containerRef });

  return { contextSafe };
};

export const useFloatingElements = () => {
  useGSAP(() => {
    gsap.to("[data-float='dot1']", {
      y: -10,
      opacity: 0.6,
      duration: 3,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true,
    });

    gsap.to("[data-float='dot2']", {
      y: -15,
      opacity: 0.7,
      duration: 4,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true,
      delay: 1,
    });
  });
};


