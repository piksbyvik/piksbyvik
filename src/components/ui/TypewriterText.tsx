"use client";
import { useState, useEffect, useRef } from "react";
import { fontSizes } from "@/styles/typography";

interface TypewriterTextProps {
  text?: string;
  locationText?: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
}

export function TypewriterText({ 
  text = "WEDDING | LIFESTYLE PHOTOGRAPHER", 
  locationText = "BASED IN NYC",
  speed = 50, 
  delay = 1000, // Reduced from 2000ms to 1000ms
  onComplete 
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const hasStarted = useRef(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Prevent multiple runs
    if (hasStarted.current) return;
    hasStarted.current = true;

    timeoutRef.current = setTimeout(() => {
      let index = 0;
      intervalRef.current = setInterval(() => {
        if (index <= text.length) {
          setDisplayText(text.slice(0, index));
          index++;
        } else {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          setIsComplete(true);
          onComplete?.();
        }
      }, speed);
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [text, speed, delay, onComplete]); // Remove dependencies to prevent re-runs

 

  return (
    <div className="space-y-2">
      <p 
        className="font-inconsolata font-normal text-white min-h-[24px] md:min-h-[28px] whitespace-nowrap"
        style={{ fontSize: fontSizes.heroTypewriter }}
      >
        {displayText}
        {!isComplete && <span className="ml-1 animate-pulse">|</span>}
      </p>
      
      <p
        className="font-inconsolata font-normal text-white transition-all duration-600"
        style={{
          opacity: isComplete ? 1 : 0,
          transform: isComplete ? "translateY(0)" : "translateY(10px)",
          fontSize: fontSizes.heroLocation
        }}
      >
        {locationText}
      </p>
    </div>
  );
}
