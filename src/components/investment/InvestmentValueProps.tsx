import React, { useRef } from "react";
import Image from "next/image";
import { fontSizes } from "@/styles/typography";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export default function InvestmentValueProps() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate heading elements - fix TweenTarget error
    const headingElements = sectionRef.current?.querySelectorAll('.heading-animation');
    if (headingElements && headingElements.length > 0) {
      gsap.fromTo(headingElements, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true
          }
        }
      );
    }

    // Animate cards with staggered appearance - fix TweenTarget error
    const cards = sectionRef.current?.querySelectorAll('.value-card');
    if (cards && cards.length > 0) {
      gsap.fromTo(cards, 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.7, 
          stagger: 0.2, 
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: cards[0], // Use first card as trigger
            start: "top 85%",
            once: true
          }
        }
      );
    }

    // Add subtle hover effect to decorative elements
    const decorativeElements = sectionRef.current?.querySelectorAll('.decorative');
    if (decorativeElements && decorativeElements.length > 0) {
      decorativeElements.forEach((element, index) => {
        gsap.to(element, {
          y: "10px",
          rotation: index % 2 === 0 ? "2deg" : "-2deg",
          duration: 3 + index,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: index * 0.3
        });
      });
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative w-screen bg-beige-one py-10 overflow-x-hidden">
      <div
        className="absolute inset-0 z-10 opacity-12 pointer-events-none"
        style={{
          backgroundImage: "url('/grain.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />
      
      {/* Dots background (left) */}
      <div
        className="decorative absolute top-10 left-0 w-40 h-40 md:w-[312px] md:h-[292px] z-0"
        style={{
          backgroundImage: "url('/dots-2-dark.svg')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top left",
        }}
      />
      
      {/* Camera icon (top right) */}
      <div className="decorative absolute top-8 right-8 z-10">
        <Image src="/camera.svg" alt="camera icon" width={105} height={83} />
      </div>

      <div className="relative z-20 px-[5vw] lg:px-[3.5vw]">
        {/* Heading */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12 md:mb-16">
          <h2
            className="heading-animation font-la-belle-aurore text-black text-center text-[2.2rem] md:text-[2.8rem] lg:text-[3.2rem] font-normal"
            style={{ letterSpacing: "0.02em" }}
          >
            More Than Just
          </h2>
          <div className="heading-animation relative flex items-center">
            <span className="font-la-belle-aurore text-black text-[2.2rem] md:text-[2.8rem] lg:text-[3.2rem] font-normal px-6">
              Pretty Photos
            </span>
            {/* Oval/circle icon SVG */}
            <Image
              src="/circle-icon.svg"
              alt="Oval icon"
              width={314}
              height={140}
              className="absolute left-0 top-1/2 -translate-y-1/2 -z-10 pointer-events-none"
            />
          </div>
        </div>

        {/* Value Props Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6 lg:gap-10">
          {/* Card 1 */}
          <div className="value-card bg-blue border border-black p-6 md:p-8 rounded-none shadow-none">
            <h3
              className="font-domaine-display font-normal text-black mb-4"
              style={{ fontSize: fontSizes.approachQuote }}
            >
              INTENTIONAL, EMOTIONAL STORYTELLING
            </h3>
            <p className="font-inconsolata text-black leading-relaxed" style={{ fontSize: fontSizes.bodyMedium }}>
              Rather than just snapping pretty pictures, I focus on telling your story – the genuine, unscripted moments that reflect who you truly are. From the subtle hand squeeze before you walk down the aisle to the laughter that echoes during speeches, every frame is curated to capture the feeling of your day, not just how it looked.
            </p>
          </div>
          
          {/* Card 2 */}
          <div className="value-card bg-[#8B7D6B] border border-black p-6 md:p-8 rounded-none shadow-none">
            <h3
              className="font-domaine-display font-normal text-beige-one mb-4"
              style={{ fontSize: fontSizes.approachQuote }}
            >
              GUIDANCE WITHOUT POSING PRESSURE
            </h3>
            <p className="font-inconsolata text-beige-one leading-relaxed" style={{ fontSize: fontSizes.bodyMedium }}>
              You don&apos;t need to be a model to look amazing in photos. I gently guide you with prompts and movements that feel natural – so your portraits look candid, not stiff. The goal? To create a comfortable space where your personalities shine through effortlessly, whether we&apos;re in a forest, by the beach, or in your backyard.
            </p>
          </div>
          
          {/* Card 3 */}
          <div className="value-card bg-brown-one border border-black p-6 md:p-8 rounded-none shadow-none">
            <h3
              className="font-domaine-display font-normal text-beige-one mb-4"
              style={{ fontSize: fontSizes.approachQuote }}
            >
              TRUE-TO-YOU EDITING &amp; A TIMELESS LOOK
            </h3>
            <p className="font-inconsolata text-beige-one leading-relaxed" style={{ fontSize: fontSizes.bodyMedium }}>
              No trendy filters or overexposed presets. My editing style is crafted to reflect the mood and tone of your day – warm, elegant, and real. Your photos will stand the test of time, so when you look back years from now, they&apos;ll feel just as magical as the day they were taken.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
