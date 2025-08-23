"use client";
import { useRef, useState, useCallback } from "react";
import { HeroBackground } from "./HeroBackground";
import { HeadingText } from "../../ui/HeadingText";
import { TypewriterText } from "../../ui/TypewriterText";
import { InquireButton } from "../../ui/InquireButton";

import { cn } from "@/lib/utils";
import type { HeroSectionData } from "@/sanity/queries";
import { useParallaxAnimations } from "@/hooks/useParallaxAnimations";

interface HeroProps {
  data?: HeroSectionData;
}

export default function Hero({ data }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<{ animate: () => void }>(null);
  const [showButton, setShowButton] = useState(false);
  const hasTriggeredButton = useRef(false);

  useParallaxAnimations(containerRef);

  const handleTypewriterComplete = useCallback(() => {
    if (hasTriggeredButton.current) return; // Prevent duplicate calls
    hasTriggeredButton.current = true;

    setTimeout(() => {
      setShowButton(true);
      setTimeout(() => {
        buttonRef.current?.animate();
      }, 100);
    }, 500);
  }, []);

  return (
    <div ref={containerRef} className="w-screen relative">
      <HeroBackground backgroundImages={data?.backgroundImages} />

      {/* Main content */}
      <div className="relative min-h-screen px-[5vw] md:px-[3.5vw] pb-8 md:pb-5 pt-20 md:pt-0 z-20 flex items-end">
        <div
          className={cn(
            "flex w-full",
            "flex-col gap-6 md:flex-row md:justify-between md:gap-0",
            "items-start md:items-center"
          )}
        >
          <HeadingText />

          <div
            className="flex flex-col items-start gap-6 md:gap-0 order-2 md:order-none md:justify-between"
            style={{
              minHeight: "calc(72px + 64px + 0.5rem)",
            }}
          >
            <TypewriterText
              text={data?.typewriterText || "WEDDING | LIFESTYLE PHOTOGRAPHER"}
              locationText={data?.locationText || "BASED IN NYC"}
              onComplete={handleTypewriterComplete}
            />

            {showButton && <InquireButton ref={buttonRef} />}
          </div>
        </div>
      </div>
    </div>
  );
}
