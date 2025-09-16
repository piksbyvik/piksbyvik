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
      title: "Photography (fav one)",
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
            className="font-domaine-display text-beige-one uppercase leading-tight"
            style={{ fontSize: fontSizes.heroTitle }}
          >
            {data?.title ? (
              data.title
            ) : (
              <>
                SOME OF MY <br />
                <span className="text-blue">PASSIONS</span>
              </>
            )}
          </h2>
        </div>{" "}
        {/* Passions Messy Layout */}
        <div className="relative max-w-6xl mx-auto h-[600px] md:h-[500px] lg:h-[400px]">
          <Image
            src="/heart-light.svg"
            alt="Decorative heart"
            width={40}
            height={40}
            className="absolute -bottom-4 -right-8 w-7 h-8 text-beige-one/60 hidden lg:block"
          />
          <Image
            src="/heart-light.svg"
            alt="Decorative heart"
            width={40}
            height={40}
            className="absolute right-[60%] rotate-20 inset-y-2/3 w-7 h-8 text-beige-one/60 hidden lg:block"
          />
          <Image
            src="/heart-light.svg"
            alt="Decorative heart"
            width={40}
            height={40}
            className="absolute -top-8 -left-8 w-7 h-8 text-beige-one/60 hidden lg:block"
          />          {passions.map((passion, index) => {
            // Define positions for each passion item
            const positions = [
              { top: "10%", left: "5%" }, // Rewatching movies - top left
              { top: "60%", left: "15%" }, // Alternative music - bottom left
              { top: "35%", left: "45%" }, // Photography - center (with hearts)
              { top: "-4%", right: "8%" }, // Travelling - top right
              { bottom: "5%", right: "5%" }, // Girls night out - bottom right
            ];

            // Small rotation values for each item
            const rotations = ["-3deg", "2deg", "-1deg", "4deg", "-2deg"];
            const rotation = rotations[index] || "0deg";

            const position = positions[index] || { top: "50%", left: "50%" };

            return (
              <div
                key={index}
                className="absolute flex flex-col items-center text-center group"
                style={{ 
                  ...position, 
                  transform: `rotate(${rotation})` 
                }}
              >
                <div className="mb-3">
                  <ImageWithFallback
                    src={passion.icon.asset.url}
                    alt={`${passion.title} icon`}
                    width={80}
                    height={80}
                    className="scale-90 md:scale-100"
                  />
                </div>
                <h3
                  className="font-la-belle-aurore text-beige-one leading-tight max-w-[140px] md:max-w-[240px]"
                  style={{ fontSize: fontSizes.bodyLarge }}
                >
                  {passion.title}
                </h3>
              </div>
            );
          })}
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
