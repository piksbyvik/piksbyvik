"use client";
import { useRef, useState, useCallback } from "react";
import { HeroBackground } from "./HeroBackground";
import { HeadingText } from "../../ui/HeadingText";
import { TypewriterText } from "../../ui/TypewriterText";
import { InquireButton } from "../../ui/InquireButton";
import { cn } from "@/lib/utils";
import type { ProcessedHeroSectionData } from "@/lib/types";

interface HeroClientProps {
  data?: ProcessedHeroSectionData;
}

export default function HeroClient({ data }: HeroClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<{ animate: () => void }>(null);
  const [showButton, setShowButton] = useState(false);
  const hasTriggeredButton = useRef(false);

  const handleTypewriterComplete = useCallback(() => {
    if (hasTriggeredButton.current) return;
    hasTriggeredButton.current = true;

    setTimeout(() => {
      setShowButton(true);
      setTimeout(() => {
        buttonRef.current?.animate();
      }, 100);
    }, 500);
  }, []);

  return (
    <div ref={containerRef} className="w-full relative">
      <HeroBackground 
        backgroundImageUrls={data?.backgroundImageUrls}
        backgroundImageAlts={data?.backgroundImageAlts}
      />

      {/* Main content */}
      <div className="relative max-w-[2200px] mx-auto min-h-screen px-[5vw] md:px-[3.5vw] pb-8 md:pb-5 pt-20 md:pt-0 z-20 flex items-end">
        <div
          className={cn(
            "flex w-full",
            "flex-col gap-6 lg:flex-row lg:justify-between md:gap-0",
            "items-start lg:items-center"
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
