"use client";
import { useState, useEffect, useRef } from "react";
import { fontSizes } from "@/styles/typography";

interface TypewriterTextProps {
  text?: string;
  locationText?: string;
  words?: string[];
  speed?: number;
  deleteSpeed?: number;
  delayBetweenWords?: number;
  delay?: number;
  onComplete?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export function TypewriterText({ 
  text = "WEDDING | LIFESTYLE PHOTOGRAPHER", 
  locationText = "BASED IN NYC",
  words,
  speed = 50, 
  deleteSpeed = 30,
  delayBetweenWords = 2000,
  delay = 1000,
  onComplete,
  className = "",
  style = {}
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const hasStarted = useRef(false);

  // If words array is provided, use cycling typewriter effect
  const isMultiWord = words && words.length > 0;

  useEffect(() => {
    // Clear any existing animation
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
    
    // Reset state
    setDisplayText("");
    setIsComplete(false);
    hasStarted.current = false;

    if (isMultiWord && words.length > 0) {
      console.log("Starting typewriter with words:", words);
      
      // Multi-word cycling typewriter
      let currentWordIndex = 0;
      let currentCharIndex = 0;
      let isDeleting = false;

      const animate = () => {
        const currentWord = words[currentWordIndex];
        
        if (!isDeleting) {
          // Typing phase
          currentCharIndex++;
          setDisplayText(currentWord.slice(0, currentCharIndex));
          
          if (currentCharIndex === currentWord.length) {
            // Word complete, wait then start deleting
            animationRef.current = setTimeout(() => {
              isDeleting = true;
              animate();
            }, delayBetweenWords);
            return;
          }
          
          animationRef.current = setTimeout(animate, speed);
        } else {
          // Deleting phase
          currentCharIndex--;
          setDisplayText(currentWord.slice(0, currentCharIndex));
          
          if (currentCharIndex === 0) {
            // Word deleted, move to next word
            isDeleting = false;
            currentWordIndex = (currentWordIndex + 1) % words.length;
            animationRef.current = setTimeout(animate, speed);
            return;
          }
          
          animationRef.current = setTimeout(animate, deleteSpeed);
        }
      };

      // Start animation after initial delay
      animationRef.current = setTimeout(() => {
        hasStarted.current = true;
        animate();
      }, delay);
      
    } else if (text) {
      // Single text typewriter (original behavior)
      let currentIndex = 0;
      
      const typeText = () => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex++;
          animationRef.current = setTimeout(typeText, speed);
        } else {
          setIsComplete(true);
          onComplete?.();
        }
      };

      animationRef.current = setTimeout(() => {
        hasStarted.current = true;
        typeText();
      }, delay);
    }

    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [words, text, speed, deleteSpeed, delayBetweenWords, delay, isMultiWord, onComplete]);

  if (isMultiWord) {
    return (
      <span className={className} style={style}>
        {displayText}
        <span className="ml-1 animate-pulse text-brown-one">|</span>
      </span>
    );
  }

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
