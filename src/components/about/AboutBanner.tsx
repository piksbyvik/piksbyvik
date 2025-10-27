"use client";
import { fontSizes } from "@/styles/typography";
import { motion, useInView } from "motion/react";
import Link from "next/link";
import React, { useRef } from "react";

interface AboutBannerProps {
  data?: {
    text: string;
    backgroundImage?: {
      asset: {
        _id: string;
        url: string;
      };
    };
  };
}

const AboutBanner: React.FC<AboutBannerProps> = ({ data }) => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(bannerRef, { once: false, margin: "-30%" });

  // Fallback data without image
  const fallbackData = {
    text: "If it feels right...let&apos;s capture your love story together!",
    backgroundImage: { asset: { url: "" } },
  };

  const content = data || fallbackData;

  return (
    <div
      ref={bannerRef}
      className="relative w-screen min-h-[240px] md:min-h-[400px] lg:h-[460px] py-12 lg:py-0 flex items-center justify-center overflow-hidden"
    >
      {/* Background container with conditional rendering */}
      <div className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
        {content.backgroundImage?.asset?.url ? (
          <div
            className="w-full h-full grayscale-100"
            style={{
              backgroundImage: `url('${content.backgroundImage.asset.url}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
            }}
          />
        ) : (
          <div className="w-full h-full bg-brown-one">
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
     
      <div className="absolute inset-0 w-full h-full z-5 bg-black/40"/>

      {/* Text content with proper z-index to ensure visibility */}
      <div className="relative z-10 w-full lg:max-w-[1360px] text-center px-4">
        <motion.h1
          className="font-domaine-display text-beige-one capitalize text-center drop-shadow-md mb-8"
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

        <Link
          href="/investment"
          className="font-travel-november text-beige-two"
          style={{ fontSize: fontSizes.approachQuote }}
        >
          Start Your Story
        </Link>
      </div>
    </div>
  );
};

export default AboutBanner;
