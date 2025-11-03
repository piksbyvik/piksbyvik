"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  easeIn,
  spring,
  cubicBezier,
  easeOut,
  easeInOut,
} from "motion/react";

interface ThankYouModalProps {
  customerName: string;
  onClose: () => void;
}

const ThankYouModal: React.FC<ThankYouModalProps> = ({
  customerName,
  onClose,
}) => {
  // Format today's date as DD / MM / YYYY
  const today = new Date();
  const formattedDate = `${today.getDate().toString().padStart(2, "0")} / ${(today.getMonth() + 1).toString().padStart(2, "0")} / ${today.getFullYear()}`;

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Animation variants
  const backdropVariants = {
    hidden: {
      opacity: 0,
      backdropFilter: "blur(0px)",
    },
    visible: {
      opacity: 1,
      backdropFilter: "blur(8px)",
      transition: {
        duration: 0.3,
        ease: easeOut,
      },
    },
    exit: {
      opacity: 0,
      backdropFilter: "blur(0px)",
      transition: {
        duration: 0.2,
        ease: easeIn,
      },
    },
  };

  const modalVariants = {
    hidden: {
      scale: 0.8,
      opacity: 0,
      y: 20,
      rotateX: -10,
    },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: spring,
        damping: 25,
        stiffness: 300,
        duration: 0.6,
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
    exit: {
      scale: 0.9,
      opacity: 0,
      y: 10,
      transition: {
        duration: 0.2,
        ease: easeIn,
      },
    },
  };

  const imageVariants = {
    hidden: {
      opacity: 0,
      x: -30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: cubicBezier(0.25, 0.46, 0.45, 0.94),
      },
    },
  };

  const contentVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeOut,
        delayChildren: 0.3,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 15,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        ease: cubicBezier(0.25, 0.46, 0.45, 0.94),
      },
    },
  };

  const decorativeBorderVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 0.3,
      transition: {
        duration: 1.5,
        ease: easeInOut,
        delay: 0.5,
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
        style={{
          background: "rgba(0, 0, 0, 0.8)",
        }}
      >
        <div
          className="absolute inset-0 opacity-25 z-5 pointer-events-none"
          style={{
            backgroundImage: "url('/grain.webp')",
            backgroundRepeat: "repeat",

            contain: "strict",
          }}
        />
        <motion.div
          className="relative w-full max-w-5xl bg-gradient-to-br from-[#403528] to-[#2a261e] shadow-2xl overflow-hidden my-4 sm:my-8"
          style={{
            borderRadius: "16px",
            boxShadow:
              "0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.1)",
            maxHeight: "calc(100vh - 32px)",
            minHeight: "400px",
          }}
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          

          {/* Close button */}
          <motion.button
            onClick={onClose}
            className="absolute hover:cursor-pointer top-3 right-3 sm:top-6 sm:right-6 z-20 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white backdrop-blur-sm group"
            aria-label="Close"
            whileHover={{
              scale: 1.05,
              rotate: 90,
              backgroundColor: "rgba(255, 255, 255, 0.2)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 17,
            }}
          >
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="sm:w-[18px] sm:h-[18px]"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </motion.svg>
          </motion.button>

          <motion.div
            className="flex flex-col lg:flex-row overflow-hidden rounded-[16px] h-full max-h-[calc(100vh-32px)]"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Left side - Image */}
            <motion.div
              className="w-full lg:w-3/5 relative order-2 lg:order-1"
              variants={imageVariants}
            >              <div className="relative h-64 lg:h-full lg:min-h-[500px] overflow-hidden">
                <motion.div className="w-full h-full absolute inset-y-0">
                  <Image
                    src="/thankyou-modal.avif"
                    alt="Wedding photo"
                    fill
                    className="object-cover z-20"
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Right side - Content */}
            <motion.div
              className="w-full lg:w-3/5 text-beige-one p-4 sm:p-6 lg:p-12 flex flex-col justify-center order-1 lg:order-2 overflow-y-auto"
              variants={contentVariants}
            >
              {/* Header */}
              <motion.div variants={itemVariants}>
                <h2 className="font-la-belle-aurore text-2xl sm:text-3xl lg:text-4xl mb-6 lg:mb-8 lg:mt-10 leading-relaxed">
                  <motion.span
                    className="block"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                  >
                    Light&apos;s Camera
                  </motion.span>
                  <motion.span
                    className="block text-white/90"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  >
                    Let&apos;s Do This
                  </motion.span>
                </h2>
              </motion.div>

              {/* Customer info */}
              <motion.div
                className="space-y-4 sm:space-y-6 mb-6 lg:mb-8"
                variants={itemVariants}
              >
                <motion.div
                  className="flex justify-between items-center pb-2 sm:pb-3 border-b border-white/30"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
                >
                  <span className="font-inconsolata text-white/80 tracking-wider text-sm sm:text-base">
                    TO :
                  </span>
                  <motion.span
                    className="font-la-belle-aurore text-lg sm:text-xl lg:text-2xl text-white"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                  >
                    {customerName} ❤
                  </motion.span>
                </motion.div>
                <motion.div
                  className="flex justify-between items-center pb-2 sm:pb-3 border-b border-white/30"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1.1, duration: 0.8, ease: "easeOut" }}
                >
                  <span className="font-inconsolata text-white/80 tracking-wider text-sm sm:text-base">
                    DATE :
                  </span>
                  <motion.span
                    className="font-inconsolata text-white/90 text-sm sm:text-base"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.3, duration: 0.5 }}
                  >
                    {formattedDate}
                  </motion.span>
                </motion.div>
              </motion.div>

              {/* Message */}
              <motion.div variants={itemVariants}>
                <motion.p
                  className="font-inconsolata text-xs sm:text-sm lg:text-base leading-relaxed mb-6 lg:mb-8 text-white/90"
                  style={{ lineHeight: 1.7 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4, duration: 0.8 }}
                >
                  Every person has a story. I would love for your photos to be
                  the pages - tangible memories to cherish and pass down,
                  evoking wonder with every glance. I promise to bring my best
                  work, investing fully in your dream and tapping into my
                  deepest creativity. You can expect intentionality, connection,
                  friendship, a foundation of faith, and authenticity from me. I
                  am excited to learn more about your vision for our time
                  working together!
                </motion.p>
              </motion.div>

              {/* Signature */}
              <motion.div
                className="flex items-center mb-4 lg:mb-0"
                variants={itemVariants}
              >
                <motion.span
                  className="text-red-400 mr-3 text-base sm:text-lg"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  ❤
                </motion.span>
                <motion.span
                  className="font-la-belle-aurore text-xl sm:text-2xl lg:text-3xl text-white"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.6, duration: 0.6 }}
                >
                  Victoria
                </motion.span>
              </motion.div>

              {/* Call to action */}
              <motion.div
                className="mt-4 sm:mt-6 lg:mt-8 pt-4 sm:pt-6 border-t border-white/20"
                variants={itemVariants}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 0.6 }}
              >
                <p className="font-inconsolata text-xs text-white/70 italic">
                  I&apos;ll be in touch soon! Check your email for next steps.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ThankYouModal;
