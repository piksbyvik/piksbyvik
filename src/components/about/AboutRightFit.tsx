"use client";
import { fontSizes } from "@/styles/typography";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import Heart from "@/components/icons/heart";
import React from "react";

interface AboutRightFitProps {
  data?: {
    title: string;
    fitItems: Array<{
      title: string;
      description: string;
    }>;
    bottomParagraph: string;
    sectionImage: {
      asset: {
        _id: string;
        url: string;
      };
    };
  };
}

const AboutRightFit: React.FC<AboutRightFitProps> = ({ data }) => {
  // Default fit items if no data provided
  const defaultFitItems = [
    {
      title: "YOU LOVE CANDID SHOTS",
      description: "the little in-between moments that tell the truest story"
    },
    {
      title: "YOU WANT TO FEEL RELAXED AT YOUR SESSION",
      description: "no pressure, no posing—just being yourself"
    },
    {
      title: "YOU WANT A FRIEND AND A PHOTOGRAPHER",
      description: "someone who gets you, not just takes your photo"
    }
  ];

  const fitItems = data?.fitItems || defaultFitItems;

  return (
    <section className="relative w-screen bg-beige-one">
      <div className="relative flex flex-col lg:flex-row items-stretch min-h-[600px] lg:min-h-[700px]">
        {/* Left side - Text content */}
        <div className="lg:w-1/2 flex flex-col justify-center px-[5vw] lg:px-[3.5vw] py-8 lg:py-0">
          {/* Title with heart */}
          <div className="flex items-center gap-3 mb-8 lg:my-10">
            <Heart className="w-6 h-7 lg:w-8 lg:h-9 text-brown-one mt-1 flex-shrink-0" />
            <h2
              className="font-domaine-display text-brown-one uppercase leading-tight"
              style={{ fontSize: fontSizes.heroTitle }}
            >
              {data?.title || "WE'RE THE RIGHT FIT IF..."}
            </h2>
          </div>

          {/* Three sections */}
          <div className="space-y-8 lg:space-y-10">
            {fitItems.map((item, index) => (
              <div 
                key={index}
                className={index < fitItems.length - 1 ? "pb-6 lg:pb-8 border-b border-brown-one/50" : ""}
              >
                <h3
                  className="font-instrument-serif text-brown-one uppercase mb-2 lg:mb-3"
                  style={{ fontSize: fontSizes.approachCategoryTitle}}
                >
                  {item.title}
                </h3>
                <p
                  className="font-la-belle-aurore text-brown-one/80 leading-relaxed"
                  style={{ fontSize: fontSizes.bodyLarge }}
                >
                  {item.description}
                </p>
              </div>
            ))}

            {/* Bottom paragraph */}
            <div className="pt-4 lg:pt-6 pb-10">
              <p
                className="font-inconsolata text-brown-one leading-relaxed tracking-tight"
                style={{ fontSize: fontSizes.bodyMedium }}
              >
                {data?.bottomParagraph || 
                  "When we work together, I'll take the time to really understand your story. My approach is calm and intentional, so you can relax and simply be yourself. In the end, you'll have photos that feel true, heartfelt, and timeless."
                }
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Image */}
        <div className="lg:w-1/2 relative min-h-[400px] lg:min-h-full">
          <ImageWithFallback
            src={data?.sectionImage}
            alt="Couple walking in field at sunset"
            fill
            className="object-cover"
            fallback={
              <div className="w-full h-full bg-gradient-to-br from-beige-one to-brown-one"></div>
            }
          />
        </div>
      </div>

      {/* Grain overlay */}
      <div
        className="absolute inset-0 z-5 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "url('/grain.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />
    </section>
  );
};

export default AboutRightFit;
