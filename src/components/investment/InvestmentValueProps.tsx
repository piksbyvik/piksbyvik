"use client"
import React, { useRef } from "react";
import Image from "next/image";
import { fontSizes } from "@/styles/typography";
import { easeInOut, motion, useInView } from "motion/react";
import { InvestmentValuePropsData } from "@/sanity/queries";

interface InvestmentValuePropsProps {
  data?: InvestmentValuePropsData;
}

export default function InvestmentValueProps({ data }: InvestmentValuePropsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-30%" });

  // Fallback data
  const fallbackData = {
    heading: {
      preText: "More Than Just",
      highlightedText: "Pretty Photos"
    },
    valueCards: [
      {
        title: "INTENTIONAL, EMOTIONAL STORYTELLING",
        description: "Rather than just snapping pretty pictures, I focus on telling your story – the genuine, unscripted moments that reflect who you truly are. From the subtle hand squeeze before you walk down the aisle to the laughter that echoes during speeches, every frame is curated to capture the feeling of your day, not just how it looked.",
        backgroundColor: "blue"
      },
      {
        title: "GUIDANCE WITHOUT POSING PRESSURE",
        description: "You don't need to be a model to look amazing in photos. I gently guide you with prompts and movements that feel natural – so your portraits look candid, not stiff. The goal? To create a comfortable space where your personalities shine through effortlessly, whether we're in a forest, by the beach, or in your backyard.",
        backgroundColor: "#8B7D6B"
      },
      {
        title: "TRUE-TO-YOU EDITING & A TIMELESS LOOK",
        description: "No trendy filters or overexposed presets. My editing style is crafted to reflect the mood and tone of your day – warm, elegant, and real. Your photos will stand the test of time, so when you look back years from now, they'll feel just as magical as the day they were taken.",
        backgroundColor: "brown-one"
      }
    ]
  };

  const content = data || fallbackData;

  // Animation variants
  const headingVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  
  
  return (
    <section ref={sectionRef} className="relative max-w-[2200px] mx-auto w-full bg-beige-one pb-24">
      <div
    className="absolute inset-0 w-full h-full z-5 opacity-12 pointer-events-none"
    style={{
      backgroundImage: "url('/grain.webp')",
      
      backgroundRepeat: "repeat",
    }}
  />
      
      {/* Dots background (left) */}
      <div
        className="absolute -top-25 -left-10 w-40 h-40 md:w-[390px] md:h-[340px] z-0"
        style={{
          backgroundImage: "url('/dots-dark.svg')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top left",
        }}
        
      />
      
      {/* Camera icon (top right) */}
      <motion.div 
        className="absolute top-16 -right-4 scale-[0.6] md:scale-[1] lg:top-8 md:right-8 z-10"
        animate={{
          y: [0, -10, 0],
          rotate: [0, -2, 0],
          transition: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3
          }
        }}
      >
        <Image src="/camera.svg" alt="camera icon" width={105} height={83} />
      </motion.div>

      <div className="relative z-20 px-[5vw] lg:px-[3.5vw]">
        {/* Heading */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12 md:mb-24">
          <motion.h2
            className="font-la-belle-aurore text-black text-center text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-normal"
            style={{ letterSpacing: "0.02em" }}
            variants={headingVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            {content.heading.preText}
          </motion.h2>
          <motion.div 
            className="relative flex items-center"
            variants={headingVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.2
            }}
          >
            <span className="font-la-belle-aurore text-black text-[2rem] md:text-[2rem] lg:text-[3rem] font-normal px-6">
              {content.heading.highlightedText}
            </span>
            {/* Oval/circle icon SVG */}
            <Image
              src="/circle-icon.svg"
              alt="Oval icon"
              width={350}
              height={140}
              className="absolute left-0 top-1/2 -translate-y-1/2 -z-10 pointer-events-none"
            />
          </motion.div>
        </div>

        {/* Value Props Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6 lg:gap-10">
          {content.valueCards.map((card, index) => (
            <motion.div 
              key={index}
              className={`border border-black p-6 md:p-8 shadow-none`}
              style={{ 
                backgroundColor: card.backgroundColor === 'blue' ? 'var(--color-blue)' :
                               card.backgroundColor === 'brown-one' ? 'var(--color-brown-one)' :
                               card.backgroundColor
              }}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-15%" }}
              transition={{
                duration: 0.7,
                ease: [0.68, -0.55, 0.265, 1.55], // back.out(1.2)
                delay: index * 0.2
              }}
            >
              <h3
                className={`font-domaine-display font-normal mb-4 text-center ${
                  card.backgroundColor === 'blue' ? 'text-black' : 'text-beige-one'
                }`}
                style={{ fontSize: fontSizes.approachSidebarText }}
              >
                {card.title}
              </h3>
              <p 
                className={`font-inconsolata leading-relaxed tracking-tight text-center ${
                  card.backgroundColor === 'blue' ? 'text-black' : 'text-beige-one'
                }`} 
                style={{ fontSize: fontSizes.bodyMedium }}
              >
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
