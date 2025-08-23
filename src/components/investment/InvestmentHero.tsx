"use client";
import React from "react";
import Image from "next/image";
import { fontSizes } from "@/styles/typography";
import { InvestmentHeroData } from "@/sanity/queries";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

interface InvestmentHeroProps {
  data?: InvestmentHeroData;
}

const InvestmentHero: React.FC<InvestmentHeroProps> = ({ data }) => {
  // Fallback data without images
  const fallbackData = {
    title: "INVESTMENT",
    description: "Your photos and film will only grow more valuable with time. That's why I share all pricing upfront - because transparency matters.",
    heroImages: {
      mainImage: null,
      topSmallImage: null,
      bottomSmallImage: null
    },
    quoteOverlay: {
      text: "Captured our day perfectly",
      author: "Emily & Ryan"
    },
    propImage: null
  };

  const content = data || fallbackData;

  return (
    <section className="relative w-screen min-h-screen bg-beige-one overflow-hidden pt-20 md:pt-24 pb-8 md:pb-16 lg:pb-[136px]">
      {/* Grain overlay - keep as background style since it's from public folder */}
      <div
        className=" absolute inset-0 z-0 opacity-12 pointer-events-none"
        style={{
          backgroundImage: "url('/grain.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="relative w-full h-auto border-b pt-10 lg:pt-0">
        {/* Quote image - Desktop only */}
        <div className="hidden lg:block absolute bottom-0 -left-2">
          <div className="relative w-[372px] h-[260px] border-2 border-b-0 border-black">
            <ImageWithFallback
              src={content.propImage}
              alt="Investment hero prop"
              fill
              className="opacity-40"
            />
          </div>
        </div>

        <div className="relative z-20 px-[5vw] lg:px-[3.5vw] h-full flex items-start">
          {/* Handwritten quote overlay - Desktop only */}
          <div className="hidden lg:block absolute bottom-1/4 left-1/4 z-10">
            <p
              className="font-la-belle-aurore text-black italic text-left leading-relaxed transform -rotate-7"
              style={{ fontSize: fontSizes.bodyLarge }}
            >
              {content.quoteOverlay?.text || "Captured our day perfectly"}
              <br />{content.quoteOverlay?.author || "Emily & Ryan"}
            </p>
          </div>

          <div className="w-full flex flex-col lg:flex-row lg:justify-between gap-8 md:gap-10 lg:gap-12 items-start">
            {/* Left side - Text content */}
            <div className="w-full lg:w-[35%] flex flex-col justify-center pt-4 relative order-2 lg:order-1">
              <h1
                className="font-domaine-display font-medium text-brown-one mb-6 md:mb-8 lg:mb-6 text-center lg:text-left"
                style={{ fontSize: fontSizes.galleryTitle }}
              >
                {content.title}
              </h1>

              <div className="space-y-4 mb-8 lg:mb-12">
                <p
                  className="font-inconsolata font-medium text-black text-center lg:text-left leading-relaxed tracking-tight max-w-lg mx-auto lg:mx-0"
                  style={{ fontSize: fontSizes.bodyMedium }}
                >
                  {content.description}
                </p>
              </div>
            </div>

            {/* Right side - Single image on mobile, three images on desktop */}
            <div className="w-full lg:w-[50%] pt-0 md:pt-4 lg:pt-10 h-[60vh] md:h-[70vh] lg:h-[calc(100vh-136px)] order-1 lg:order-2">
              
              {/* Mobile/Tablet: Single main image */}
              <div className="block lg:hidden w-full h-full relative">
                <div className="border border-black h-full shadow-lg">
                  <div className="w-full h-full relative overflow-hidden">
                    <ImageWithFallback
                      src={content.heroImages?.mainImage}
                      alt="Wedding couple celebration"
                      fill
                      placeholder="blur"
                    />
                  </div>
                </div>
              </div>

              {/* Desktop: Three images layout */}
              <div className="hidden lg:flex gap-3 md:gap-4 lg:gap-6 h-full">
                {/* Large main image */}
                <div className="w-3/5 relative">
                  <div className="border border-black border-b-0 h-full shadow-lg">
                    <div className="w-full h-full relative overflow-hidden">
                      <ImageWithFallback
                        src={content.heroImages?.mainImage}
                        alt="Wedding couple celebration"
                        fill
                        placeholder="blur"
                      />
                    </div>
                  </div>
                </div>

                {/* Two smaller images stacked */}
                <div className="w-2/5 flex flex-col items-start gap-3 md:gap-4 lg:gap-6">
                  {/* Top small image */}
                  <div className="h-[60%] w-full md:w-[85%] lg:w-[85%] relative">
                    <div className="border border-black h-full shadow-lg">
                      <div className="w-full h-full relative overflow-hidden">
                        <ImageWithFallback
                          src={content.heroImages?.topSmallImage}
                          alt="Wedding ceremony"
                          fill
                          placeholder="blur"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bottom small image with reel overlay */}
                  <div className="h-[40%] w-full relative">
                    <div className="border-2 md:border-3 lg:border-r-5 lg:border-t-2 lg:border-b-0 lg:border-l-2 h-full shadow-lg relative">
                      <div className="w-full h-full overflow-hidden border border-black lg:border-0">
                        <ImageWithFallback
                          src={content.heroImages?.bottomSmallImage}
                          alt="Wedding details"
                          fill
                          placeholder="blur"
                        />
                      </div>
                    </div>
                    
                    {/* Reel overlay - only show if there's an actual image AND keep as regular Image since it's from public folder */}
                    {content.heroImages?.bottomSmallImage && (
                      <div className="absolute inset-0 w-full h-full flex items-center justify-center opacity-10">
                        <div className="w-8 h-8 md:w-12 md:h-12 lg:w-full lg:h-full relative">
                          <Image
                            src="/reel.webp"
                            alt="Video reel icon"
                            fill
                            className="object-cover lg:object-cover"
                          />
                        </div>
                      </div>
                    )}
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
