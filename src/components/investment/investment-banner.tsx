"use client"

import React, { useRef } from "react";
import { fontSizes } from "@/styles/typography";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { InvestmentBannerData } from "@/sanity/queries";

interface InvestmentBannerProps {
  data?: InvestmentBannerData;
}

const InvestmentBanner: React.FC<InvestmentBannerProps> = ({ data }) => {
  const bannerRef = useRef<HTMLDivElement>(null);

  // Fallback data without image
  const fallbackData = {
    text: 'Less "say cheese," more "holy crap this is us!"',
    backgroundImage: { asset: { url: "" } }
  };

  const content = data || fallbackData;

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
      {/* Background container with conditional rendering */}
      <div className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
        {content.backgroundImage?.asset?.url ? (
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url('${content.backgroundImage.asset.url}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
            }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-brown-one to-beige-one animate-pulse">
            <div className="w-full h-full bg-gray-200 bg-opacity-30 backdrop-blur-sm"></div>
          </div>
        )}
        
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
          {content.text}
        </h1>
      </div>
    </div>
  );
};

export default InvestmentBanner;
