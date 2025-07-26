"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { fontSizes } from "@/styles/typography";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const packageTabs = [
  { key: "weddings", label: "Weddings" },
  { key: "engagements", label: "Engagements" },
  { key: "couples", label: "Couples" },
  { key: "lifestyle", label: "Lifestyle" },
];

const packages = {
  weddings: {
    title: "TRADITIONAL PACKAGE",
    price: "$5600",
    image: "/traditional-package-img.webp",
    features: [
      "Upto 250 guests",
      "10 hours of photo coverage by Me!",
      "Second Photographer Included",
      "1000+ fully enhanced & edited high-resolution JPEG images made available to client via digital download",
      "Personal printing & sharing rights",
      "Travel included up to 70 miles round trip (Over 70 miles round-trip results in an additional travel fee)",
      "Preview of 100+ fully enhanced & edited high-resolution images made available to client 7-10 days following the wedding date",
    ],
  },
  engagements: {
    title: "Engagement Package",
    price: "$1800",
    image: "/placeholder-img.jpg",
    features: [
      "Up to 2 hours of coverage",
      "Location of your choice",
      "150+ edited high-res images",
      "Personal printing & sharing rights",
      "Online gallery for downloads",
    ],
  },
  couples: {
    title: "Couples Package",
    price: "$1500",
    image: "/placeholder-img.jpg",
    features: [
      "Up to 2 hours of coverage",
      "Any location",
      "100+ edited images",
      "Personal printing & sharing rights",
      "Online gallery for downloads",
    ],
  },
  lifestyle: {
    title: "Lifestyle Package",
    price: "$1200",
    image: "/placeholder-img.jpg",
    features: [
      "Up to 1.5 hours of coverage",
      "Family, maternity, newborn, etc.",
      "80+ edited images",
      "Personal printing & sharing rights",
      "Online gallery for downloads",
    ],
  },
};

const InvestmentPackages: React.FC = () => {
  const [activeTab, setActiveTab] = useState<keyof typeof packages>("weddings");
  const containerRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);

  const { contextSafe } = useGSAP({ scope: containerRef });

  const animateIn = contextSafe(() => {
    gsap.fromTo(
      "[data-package-content]",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
  });

  const animateOut = contextSafe(() => {
    return new Promise<void>((resolve) => {
      gsap.to("[data-package-content]", {
        opacity: 0,
        y: -30,
        duration: 0.3,
        ease: "power2.in",
        onComplete: resolve,
      });
    });
  });

  useGSAP(
    () => {
      animateIn();
    },
    { scope: containerRef, dependencies: [activeTab] }
  );

  const handleTabClick = contextSafe(async (key: keyof typeof packages) => {
    if (isAnimatingRef.current || key === activeTab) return;
    isAnimatingRef.current = true;
    await animateOut();
    setActiveTab(key);
    isAnimatingRef.current = false;
  });

  const pkg = packages[activeTab];

  return (
    <section
      ref={containerRef}
      className="relative w-screen bg-[#403528] pb-16 md:pb-24 overflow-x-hidden"
    >
       <div
        className=" absolute inset-0 z-90 opacity-12 pointer-events-none"
        style={{
          backgroundImage: "url('/grain.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Top nav */}
      <div className="w-full bg-beige-one border-b border-black flex flex-col md:flex-row items-center justify-between px-[5vw] lg:px-[3.5vw] py-4">
        <span className="font-inconsolata text-black text-lg md:text-xl tracking-wide">
          EXPLORE INVESTMENT
        </span>
        <nav className="flex flex-wrap md:flex-nowrap gap-4 md:gap-12 mt-4 md:mt-0">
          {packageTabs.map((tab) => (
            <button
              key={tab.key}
              className={`font-la-belle-aurore text-lg md:text-2xl lg:text-3xl transition-colors duration-200 ${
                activeTab === tab.key
                  ? "text-black underline underline-offset-4"
                  : "text-[#403528] opacity-70"
              }`}
              onClick={() => handleTabClick(tab.key as keyof typeof packages)}
              style={{
                fontWeight: activeTab === tab.key ? 500 : 400,
                letterSpacing: "0.02em",
              }}
            >
              {tab.label}
            </button>

            
          ))}
        </nav>
      </div>

      {/* Main package content */}
      <div
        data-package-content
        className="
          relative z-20 px-[5vw] lg:px-[3.5vw]
          flex flex-col lg:flex-row md:justify-between items-stretch
          gap-10 md:gap-16 pt-12
        "
      >
        {/* Image */}
        <div className="
          relative w-full lg:w-[36%] h-[240px] md:h-[400px] lg:h-auto border-2 border-beige-one overflow-hidden shadow-lg
          mb-8 md:mb-0 flex-shrink-0
        ">
          <Image
              src={pkg.image}
              alt={pkg.title}
              fill
              className="object-cover"
              
            />
        </div>

        {/* Package details */}
        <div className="
          w-full lg:w-[60%] flex flex-col items-start
        ">
          <h2
            className="font-instrument-serif text-beige-one mb-4 capitalize"
            style={{ fontSize: fontSizes.galleryTitle }}
          >
            {pkg.title}
          </h2>
          <div className="flex items-center gap-4 mb-6">
            <span
              className="font-travel-november text-beige-one text-2xl md:text-3xl"
              style={{
                textDecoration: "underline",
                textUnderlineOffset: "6px",
              }}
            >
              - {pkg.price}
            </span>
          </div>
          <ul className="font-inconsolata text-beige-one text-base md:text-lg leading-relaxed space-y-2 mb-8">
            {pkg.features.map((feature, i) => (
              <li
                key={i}
                className="list-none pl-3"
                style={{
                  textIndent: "-1em",
                  marginBottom: "0.5em",
                  whiteSpace: "pre-line",
                  
                }}
              >
                • {feature}
              </li>
            ))}
          </ul>
          <div className="flex w-full justify-between mt-4">
            <button
              className="font-travel-november text-beige-one text-xl underline underline-offset-4 hover:cursor-pointer"
              style={{ fontSize: fontSizes.approachQuote }}
            >
              Inquire
            </button>
            <button
              className="font-la-belle-aurore text-beige-one text-xl flex items-center gap-2 hover:cursor-pointer"
              style={{ fontSize: fontSizes.bodyLarge }}
            >
              &lt; Explore More Offerings &gt;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestmentPackages;
