"use client";
import { useRef, useState, useCallback } from "react";
import { HeroBackground } from "./HeroBackground";
import { FloatingElements } from "./FloatingElements";
import { HeadingText } from "../../ui/HeadingText";
import { TypewriterText } from "../../ui/TypewriterText";
import { InquireButton } from "../../ui/InquireButton";
import { useParallaxAnimations, useFloatingElements } from "@/hooks/useOptimizedGSAP";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<{ animate: () => void }>(null);
  const [showButton, setShowButton] = useState(false);
  const hasTriggeredButton = useRef(false);
  
  useParallaxAnimations(containerRef);
  useFloatingElements();

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
      <HeroBackground />
      <FloatingElements />
      
      {/* Main content */}
      <div className="relative min-h-screen px-[5vw] md:px-[3.5vw] pb-8 md:pb-5 pt-20 md:pt-0 z-20 flex items-end">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-6 md:gap-0">
          <HeadingText />
          
          <div
            data-parallax="subtitle"
            className="flex flex-col items-start gap-4 md:gap-0 md:mt-6 order-2 md:order-none md:justify-between"
            style={{ 
              minHeight: 'calc(72px + 64px + 0.5rem)'
            }}
          >
            <TypewriterText 
              text="WEDDING | LIFESTYLE PHOTOGRAPHER"
              locationText="BASED IN NYC"
              onComplete={handleTypewriterComplete}
            />
            
            {showButton && <InquireButton ref={buttonRef} />}
          </div>
        </div>
      </div>

    </div>
  );
}
