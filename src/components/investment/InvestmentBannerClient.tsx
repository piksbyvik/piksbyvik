"use client";

import React, { useRef } from "react";
import { fontSizes } from "@/styles/typography";
import { motion, useInView } from "motion/react";

interface ProcessedInvestmentBannerData {
  text: string;
  backgroundImageUrl: string | null;
}

interface InvestmentBannerClientProps {
  data?: ProcessedInvestmentBannerData;
}

const InvestmentBannerClient: React.FC<InvestmentBannerClientProps> = ({ data }) => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(bannerRef, { once: true, margin: "-30%" });

  // Fallback data
  const fallbackData = {
    text: 'Less "say cheese," more "holy crap this is us!"',
    backgroundImageUrl: null,
  };

  const content = data || fallbackData;

  return (
    <div
      ref={bannerRef}
      className="relative w-screen h-[240px] md:h-[400px] lg:h-[528px] flex items-center justify-center overflow-hidden"
    >
      {/* Background container with conditional rendering */}
      <div className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
        {content.backgroundImageUrl ? (
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url('${content.backgroundImageUrl}')`,
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
          className="absolute inset-0 z-5 opacity-20 pointer-events-none"
          style={{
            backgroundImage: "url('/grain.webp')",
            backgroundRepeat: "repeat",
          }}
        />
      </div>

      {/* Text content with Motion animation */}
      <div className="relative z-10 w-full text-center px-4">
        <motion.h1
          className="font-domaine-display font-medium text-beige-one capitalize text-center drop-shadow-lg"
          style={{ fontSize: fontSizes.heroConnections }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
          }
          transition={{
            duration: 1.2,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {content.text}
        </motion.h1>
      </div>
    </div>
  );
};

export default InvestmentBannerClient;
