"use client";
import React from "react";
import Image from "next/image";
import { fontSizes } from "@/styles/typography";

const InvestmentHero: React.FC = () => {
  return (
    <section className="relative w-screen min-h-screen bg-beige-one overflow-hidden pt-20 md:pt-24 pb-8 md:pb-16 lg:pb-[136px]">
      {/* Grain overlay */}
      <div
        className=" absolute inset-0 z-10 opacity-12 pointer-events-none"
        style={{
          backgroundImage: "url('/grain.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="relative w-full h-auto border-b pt-10 lg:pt-0">
        {/* Quote image - Desktop only */}
        <div className="hidden lg:block absolute bottom-0 -left-2">
          <div
            className="relative w-[372px] h-[260px] border-2 border-b-0 border-black"
            style={{
              backgroundImage: "url('/investment-hero-prop.webp')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              opacity: 0.4,
            }}
          ></div>
        </div>

        <div className="relative z-20 px-[5vw] lg:px-[3.5vw] h-full flex items-start">
          {/* Handwritten quote overlay - Desktop only */}
          <div className="hidden lg:block absolute bottom-1/4 left-1/4 z-10">
            <p
              className="font-la-belle-aurore text-black italic text-left leading-relaxed transform -rotate-7"
              style={{ fontSize: fontSizes.bodyLarge }}
            >
              Captured our day perfectly
              <br />- Emily & Ryan
            </p>
          </div>

          <div className="w-full flex flex-col lg:flex-row lg:justify-between gap-8 md:gap-10 lg:gap-12 items-start">
            {/* Left side - Text content */}
            <div className="w-full lg:w-[35%] flex flex-col justify-center pt-4 relative order-2 lg:order-1">
              <h1
                className="font-domaine-display font-medium text-brown-one mb-6 md:mb-8 lg:mb-6 text-center lg:text-left"
                style={{ fontSize: fontSizes.heroTitle }}
              >
                INVESTMENT
              </h1>

              <div className="space-y-4 mb-8 lg:mb-12">
                <p
                  className="font-inconsolata font-medium text-black text-center lg:text-left leading-relaxed max-w-lg mx-auto lg:mx-0"
                  style={{ fontSize: fontSizes.bodyMedium }}
                >
                  Your photos and film will only grow more valuable with time. That's why I share all pricing upfront - because transparency matters.
                </p>
              </div>

              
            </div>

            {/* Right side - Three images layout */}
            <div className="w-full lg:w-[50%] flex gap-3 md:gap-4 lg:gap-6 pt-0 md:pt-4 lg:pt-10 h-[60vh] md:h-[70vh] lg:h-[calc(100vh-136px)] order-1 lg:order-2">
              {/* Large main image */}
              <div className="w-3/5 relative">
                <div className="border-2 md:border-3 lg:border-4 border-b-2 lg:border-b-0 border-black h-full shadow-lg">
                  <div className="w-full h-full relative overflow-hidden">
                    <Image
                      src="/investment-hero-1.webp"
                      alt="Wedding couple celebration"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Two smaller images stacked */}
              <div className="w-2/5 flex flex-col items-start gap-3 md:gap-4 lg:gap-6">
                {/* Top small image */}
                <div className="h-[60%] w-full md:w-[85%] lg:w-[75%] relative">
                  <div className="border-2 md:border-3 lg:border-l-4 lg:border-t-2 lg:border-b-1 lg:border-r-2 border-black h-full shadow-lg">
                    <div className="w-full h-full relative overflow-hidden">
                      <Image
                        src="/investment-hero-2.webp"
                        alt="Wedding ceremony"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom small image with reel overlay */}
                <div className="h-[40%] w-full relative">
                  <div className="border-2 md:border-3 lg:border-r-5 lg:border-t-2 lg:border-b lg:border-l-2 h-full shadow-lg relative">
                    <div className="w-full h-full overflow-hidden border border-black lg:border-0">
                      <Image
                        src="/investment-hero-3.webp"
                        alt="Wedding details"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  
                  {/* Reel overlay - responsive sizing */}
                  <div className="absolute inset-0 w-full h-full flex items-center justify-center opacity-20">
                    <div className="w-8 h-8 md:w-12 md:h-12 lg:w-full lg:h-full relative">
                      <Image
                        src="/reel.webp"
                        alt="Video reel icon"
                        fill
                        className="object-cover lg:object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestmentHero;
