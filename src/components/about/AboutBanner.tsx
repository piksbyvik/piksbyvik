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
    text: "If you were nodding along, I think we’d be a great fit. Let’s make something beautiful together.",
    backgroundImage: { asset: { url: "" } },
  };

  const content = data || fallbackData;

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
          <div className="w-full h-full bg-brown-one">
            <div className="w-full h-full bg-gray-200 bg-opacity-30 backdrop-blur-sm"></div>
          </div>
        )}

        {/* Grain overlay */}
        <div
          className="absolute inset-0 z-5 opacity-25 pointer-events-none"
          style={{
            backgroundImage: "url('/grain.webp')",

            backgroundRepeat: "repeat",
          }}
        />
      </div>

      {/* Text content with proper z-index to ensure visibility */}
      <div className="relative z-10 w-2/3 text-center px-4">
        <motion.h1
          className="font-instrument-serif font-medium text-beige-one capitalize text-center drop-shadow-md mb-5"
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
          href="/contact"
          className="font-travel-november text-beige-two "
          style={{ fontSize: fontSizes.approachQuote }}
        >
          Start Your Story
        </Link>
      </div>
    </div>
  );
};

export default AboutBanner;
