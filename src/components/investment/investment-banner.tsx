import React, { useRef } from "react";
import { fontSizes } from "@/styles/typography";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const InvestmentBanner = () => {
  const bannerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Text reveal animation - properly target the text
    const h1Element = bannerRef.current?.querySelector("h1");
    if (h1Element) {
      gsap.fromTo(
        h1Element,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: bannerRef.current,
            start: "top 70%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, { scope: bannerRef });

  return (
    <div
      ref={bannerRef}
      className="relative w-screen h-[240px] md:h-[400px] lg:h-[528px] flex items-center justify-center overflow-hidden"
    >
      {/* Fixed background container with parallax effect */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: "url('/investment-banner.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed", // This creates the true parallax effect
          zIndex: 0,
        }}
      >
        {/* Grain overlay */}
        <div
          className="absolute inset-0 opacity-12 pointer-events-none"
          style={{
            backgroundImage: "url('/grain.png')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>

      {/* Text content with proper z-index to ensure visibility */}
      <div className="relative z-10 w-full text-center px-4">
        <h1
          className="font-domaine-display font-medium text-beige-one capitalize text-center drop-shadow-lg"
          style={{ fontSize: fontSizes.heroConnections }}
        >
          Less "say cheese," more "holy crap this is us!"
        </h1>
      </div>
    </div>
  );
};

export default InvestmentBanner;
