"use client";
import { useState } from "react";
import { HeadingText } from "../../ui/HeadingText";
import { TypewriterText } from "../../ui/TypewriterText";
import { InquireButton } from "../../ui/InquireButton";

export function HeroContent() {
  const [showButton, setShowButton] = useState(false);

  const handleTypewriterComplete = () => {
    setTimeout(() => {
      setShowButton(true);
    }, 500);
  };

  return (
    <div className="relative min-h-screen px-[5vw] md:px-[3.5vw] pb-8 md:pb-5 pt-20 md:pt-0 z-20 flex items-end">
      <div className="flex flex-col md:flex-row justify-between items-start w-full gap-6 md:gap-0">
        <HeadingText />
        <div
          className="flex flex-col items-start gap-4 md:gap-0 md:mt-6 order-2 md:order-none md:justify-between"
          data-parallax="subtitle"
          style={{
            minHeight: "calc(72px + 64px + 0.5rem)",
          }}
        >
          <TypewriterText
            text="WEDDING | LIFESTYLE PHOTOGRAPHER"
            locationText="BASED IN NYC"
            onComplete={handleTypewriterComplete}
          />
          {showButton && <InquireButton />}
        </div>
      </div>
    </div>
  );
}
