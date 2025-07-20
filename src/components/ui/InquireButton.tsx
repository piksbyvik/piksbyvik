"use client";
import React, { useRef, useImperativeHandle, forwardRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface InquireButtonProps {}

export const InquireButton = forwardRef<{ animate: () => void }, InquireButtonProps>((props, ref) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { contextSafe } = useGSAP();

  const handleButtonPress = contextSafe((scale: number) => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, { scale, duration: 0.1 });
    }
  });

  const animateButton = contextSafe(() => {
    if (buttonRef.current) {
      gsap.fromTo(
        buttonRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }
      );
    }
  });

  useImperativeHandle(ref, () => ({
    animate: animateButton
  }));

  return (
    <button
      ref={buttonRef}
      data-parallax="button"
      className="
        font-inconsolata px-6 md:px-8 py-2 border hover:bg-beige-two ease-in
        border-white text-black transition-colors relative cursor-pointer
        text-sm md:text-base bg-beige-one
      "
      style={{ borderRadius: "55px/20px", opacity: 0, transform: "scale(0)" }}
      onMouseDown={() => handleButtonPress(0.95)}
      onMouseUp={() => handleButtonPress(1)}
      onMouseLeave={() => handleButtonPress(1)}
    >
      <span className="relative z-10">INQUIRE</span>
    </button>
  );
});

InquireButton.displayName = "InquireButton";
