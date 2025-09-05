import { fontSizes } from "@/styles/typography";
import Image from "next/image";
import React from "react";
import ImageWithFallback from "../ui/ImageWithFallback";

interface AboutPassionsProps {
  data?: {
    title: string;
    passions: Array<{
      title: string;
      icon: {
        asset: {
          _id: string;
          url: string;
        };
      };
      hasHeart: boolean;
    }>;
  };
}

const AboutPassions: React.FC<AboutPassionsProps> = ({ data }) => {
  // Default passions if no data provided
  const defaultPassions = [
    {
      title: "Rewatching movies",
      icon: { asset: { _id: "", url: "/movie-passion.svg" } },
      hasHeart: false,
    },
    {
      title: "Alternative music",
      icon: { asset: { _id: "", url: "/music-passion.svg" } },
      hasHeart: false,
    },
    {
      title: "Photography (for one)",
      icon: { asset: { _id: "", url: "/photography-passion.svg" } },
      hasHeart: true,
    },
    {
      title: "Travelling anywhere & everywhere",
      icon: { asset: { _id: "", url: "/travel-passion.svg" } },
      hasHeart: false,
    },
    {
      title: "Girls night out",
      icon: { asset: { _id: "", url: "/party-passion.svg" } },
      hasHeart: false,
    },
  ];

  const passions = data?.passions || defaultPassions;

  return (
    <section className="relative w-full py-16 md:py-20 lg:py-24 bg-brown-one">
      {/* Decorative dots - positioned like in the image */}
      <div className="absolute -top-8 -left-10 text-beige-one/80 hidden lg:block">
        <Image
          src="/dots-light.svg"
          alt="Decorative dots"
          width={300}
          height={250}
        />
      </div>

      <div className="absolute -bottom-10 -right-20 text-beige-one/80 hidden lg:block">
        <Image
          src="/dots-light.svg"
          alt="Decorative dots"
          width={350}
          height={250}
        />
      </div>

      <div className="relative z-10 px-[5vw] lg:px-[8vw]">
        {/* Main Title */}
        <div className="text-center mb-12 lg:mb-16">
          <h2
            className="font-instrument-serif text-beige-one uppercase leading-tight"
            style={{ fontSize: fontSizes.approachTitle }}
          >
            {data?.title || "SOME OF MY PASSIONS"}
          </h2>
        </div>

        {/* Passions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {passions.map((passion, index) => (
            <div
              key={index}
              className={`flex flex-col items-center justify-center text-center group relative ${
                passion.hasHeart ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="mb-4 lg:mb-6">
                <ImageWithFallback
                  src={passion.icon.asset.url}
                  alt={`${passion.title} icon`}
                  width={80}
                  height={80}
                  
                />
              </div>
              <h3
                className="font-la-belle-aurore text-beige-one mb-2 leading-tight"
                style={{ fontSize: fontSizes.bodyLarge }}
              >
                {passion.title}
              </h3>

              {/* Heart icons positioned around the text if hasHeart is true */}
              {passion.hasHeart && (
                <>
                  <div className="absolute -top-4 -left-8 w-6 h-7 text-beige-one/70 hidden lg:block">
                    <Image
                      src="/heart-light.svg"
                      alt="Decorative heart"
                      width={40}
                      height={40}
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-6 w-7 h-8 text-beige-one/60 hidden lg:block">
                    <Image
                      src="/heart-light.svg"
                      alt="Decorative heart"
                      width={40}
                      height={40}
                      className="opacity-80"
                    />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Grain overlay */}
      <div
        className="absolute inset-0 z-5 opacity-25 pointer-events-none"
        style={{
          backgroundImage: "url('/grain.webp')",

          backgroundRepeat: "repeat",
        }}
      />
    </section>
  );
};

export default AboutPassions;
