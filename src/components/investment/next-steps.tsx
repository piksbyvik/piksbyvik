import React, { useRef } from "react";
import { InquireButton } from "../ui/InquireButton";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { fontSizes } from "@/styles/typography";

const steps = [
  {
    title: "Inquiry",
    description:
      "Tell me all about you, the little details, the big dreams, and everything in between. Every inquiry feels like the beginning of something beautiful, and can't wait to hear from you.",
  },
  {
    title: "Meeting",
    description:
      "Let's schedule a virtual meeting to walk through the details. We'll go over the investment options that best suit your needs for the big day.",
  },
  {
    title: "Booking",
    description:
      "Once you're ready, I'll send over the contract and a custom planning portal. From timelines to must-capture moments, everything will be in one cozy digital home.",
  },
];

export default function NextSteps() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      // Parallax effect for background - check if element exists
      if (sectionRef.current) {
        gsap.fromTo(
          sectionRef.current,
          {
            backgroundPosition: "50% 0%",
          },
          {
            backgroundPosition: "50% 20%",
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      // Heading animation - fix TweenTarget error
      const heading = sectionRef.current?.querySelector("h2");
      if (heading) {
        gsap.fromTo(
          heading,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              once: true,
            },
          }
        );
      }

      // Step items animation with stagger - fix TweenTarget error
      const stepItems = sectionRef.current?.querySelectorAll(".step-item");
      if (stepItems && stepItems.length > 0) {
        gsap.fromTo(
          stepItems,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: stepItems[0], // Use first item as trigger
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // Button animation - fix TweenTarget error
      const button = sectionRef.current?.querySelector(".inquire-button");
      if (button) {
        gsap.fromTo(
          button,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.5,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: button,
              start: "top 90%",
              once: true,
            },
          }
        );
      }

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[480px] flex flex-col items-center justify-center"
      style={{
        backgroundImage: "url('/investment-next-steps-bg.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "#fff",
        padding: "64px 0",
      }}
    >
      <h2
        className="text-center font-domaine-display"
        style={{
          fontSize: "clamp(32px, 5vw, 56px)",
          fontWeight: 400,
          letterSpacing: "2px",
          marginBottom: "32px",
          textShadow: "0 2px 16px rgba(0,0,0,0.25)",
        }}
      >
        NEXT STEPS
      </h2>
      <div
        className="w-full px-[5vw] lg:px-[3.5vw] flex flex-col md:flex-row md:justify-between justify-center items-start gap-10 md:gap-0"
        style={{ marginBottom: "40px" }}
      >
        {steps.map((step, idx) => (
          <div
            key={step.title}
            className="step-item flex-1 px-4 md:px-8 text-center md:text-left"
            style={{
              minWidth: 0,
            }}
          >
            <h3
              className="font-travel-november"
              style={{
                fontSize: "clamp(28px, 3vw, 40px)",
                fontWeight: 400,
                marginBottom: "16px",
                letterSpacing: "1px",
              }}
            >
              {step.title}
            </h3>
            <p
              className="font-inconsolata"
              style={{
                fontSize: "clamp(14px, 1.2vw, 18px)",
                lineHeight: 1.7,
                color: "#fff",
                textShadow: "0 1px 8px rgba(0,0,0,0.18)",
                marginBottom: "0",
              }}
            >
              {step.description}
            </p>
          </div>
        ))}
      </div>

      <div className="inquire-button">
        <button
          
          className="font-inconsolata px-6 md:px-8 py-2 border hover:bg-beige-two ease-in
        border-white text-black transition-colors relative cursor-pointer
        text-sm md:text-base lg:text-xl bg-beige-one inquire-border-radius"
          
        >
          INQUIRE
        </button>
      </div>
    </section>
  );
}
