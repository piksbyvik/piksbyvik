"use client";
import React, { useRef, useImperativeHandle, forwardRef, useMemo } from "react";
import { cubicBezier, motion } from "motion/react";
import Link from "next/link";

interface InquireButtonProps {
  onClick?: () => void;
}

export const InquireButton = forwardRef<{ animate: () => void }, InquireButtonProps>(({ onClick }, ref) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const animateButton = () => {
    // Animation is handled by Motion's initial/animate props
  };

  useImperativeHandle(ref, () => ({
    animate: animateButton
  }));

  // Memoize animation variants
  const buttonVariants = useMemo(() => ({
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 }
  }), []);

  const transition = useMemo(() => ({
    duration: 0.4, // Reduced from 0.6
    ease: cubicBezier(0.68, -0.55, 0.265, 1.55)
  }), []);

  return (
   <Link href="/contact">
    <motion.button
      ref={buttonRef}
      data-parallax="button"
      className="
        font-inconsolata px-6 md:px-8 py-2 border hover:bg-beige-two ease-in
        border-white text-black transition-colors relative cursor-pointer
        text-sm md:text-base bg-beige-one will-change-transform
      "
      style={{ borderRadius: "55px/20px" }}
      variants={buttonVariants}
      initial="initial"
      animate="animate"
      transition={transition}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
    >
      <span className="relative z-10">INQUIRE</span>
    </motion.button>
   </Link>
  );
});

InquireButton.displayName = "InquireButton";
