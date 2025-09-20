import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { fontSizes } from "@/styles/typography";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
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
  // Helper function to resolve image URLs
  const getImageUrl = (image: { asset: { _id: string; url: string; } } | undefined): string | null => {
    if (!image?.asset) return null;
    return urlFor(image.asset).url();
  };

  // Default fit items if no data provided
  const defaultFitItems = [
    {
      title: "YOU LOVE CANDID SHOTS",
      description: "the little in-between moments that tell the truest story",
    },
    {
      title: "YOU WANT TO FEEL RELAXED AT YOUR SESSION",
      description: "no pressure, no posing—just being yourself",
    },
    {
      title: "YOU WANT A FRIEND AND A PHOTOGRAPHER",
      description: "someone who gets you, not just takes your photo",
    },
  ];

  const fitItems = data?.fitItems || defaultFitItems;

  return (
    <section className="relative max-w-[2200px] mx-auto w-full bg-beige-one">
      <div className="relative flex flex-col lg:flex-row items-stretch min-h-[600px] lg:min-h-[700px]">
        {/* Left side - Text content */}
        <div className="lg:w-1/2 flex flex-col justify-center px-[5vw] lg:pl-[3.5vw] lg:pr-[2vw] py-8 lg:py-10">
          {/* Title with heart */}
          <div className="flex items-start gap-3 mb-8 lg:my-10">
            <Image
              src="/heart-dark.svg"
              alt="Decorative heart"
              width={36}
              height={36}
              className="mt-2 lg:mt-[10px]"
            />
            
            <h2
              className="font-domaine-display w-full font-medium text-brown-one uppercase leading-tight"
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
                className={
                  index < fitItems.length - 1
                    ? "pb-6 lg:pb-8 border-b border-brown-one/50"
                    : ""
                }
              >
                <h3
                  className="font-instrument-serif tracking-wide text-brown-one uppercase mb-2 lg:mb-3"
                  style={{ fontSize: fontSizes.approachCategoryTitle }}
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
                  "When we work together, I'll take the time to really understand your story. My approach is calm and intentional, so you can relax and simply be yourself. In the end, you'll have photos that feel true, heartfelt, and timeless."}
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Image */}
        <div className="lg:w-1/2 relative min-h-[400px] lg:min-h-full">
          <ImageWithFallback
            src={getImageUrl(data?.sectionImage)}
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
        className="absolute inset-0 z-5 opacity-15 pointer-events-none"
        style={{
          backgroundImage: "url('/grain.webp')",

          backgroundRepeat: "repeat",
        }}
      />
    </section>
  );
};

export default AboutRightFit;
