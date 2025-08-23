"use client";
import { fontSizes } from "@/styles/typography";
import DotsPrimary from "@/components/icons/dots-primary";
import Heart from "@/components/icons/heart";
import HeartTwo from "@/components/icons/heart-v-2";
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
    { title: "Rewatching movies", icon: { asset: { _id: "", url: "/movie-passion.svg" } }, hasHeart: false },
    { title: "Alternative music", icon: { asset: { _id: "", url: "/music-passion.svg" } }, hasHeart: false },
    { title: "Photography (for one)", icon: { asset: { _id: "", url: "/photography-passion.svg" } }, hasHeart: true },
    { title: "Travelling anywhere & everywhere", icon: { asset: { _id: "", url: "/travel-passion.svg" } }, hasHeart: false },
    { title: "Girls night out", icon: { asset: { _id: "", url: "/party-passion.svg" } }, hasHeart: false },
  ];

  const passions = data?.passions || defaultPassions;

  return (
    <section className="relative w-screen py-16 md:py-20 lg:py-24 bg-brown-one">
      {/* Decorative dots - positioned like in the image */}
      <div className="absolute top-8 left-0 w-[350px] h-[250px] text-beige-one/80 hidden lg:block">
        <DotsPrimary className="w-full h-full" />
      </div>
      
      <div className="absolute bottom-8 right-8 w-[350px] h-[250px] text-beige-one/80 hidden lg:block">
        <DotsPrimary className="w-full h-full" />
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
              className={`flex flex-col items-center text-center group relative ${
                passion.hasHeart ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="mb-4 lg:mb-6">
                <ImageWithFallback 
                  src={passion.icon.asset.url}
                  alt={`${passion.title} icon`}
                  width={80}
                  height={80}
                  className="w-16 h-16 lg:w-20 lg:h-20 object-contain"
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
                    <Heart className="w-full h-full rotate-12" />
                  </div>
                  <div className="absolute -bottom-2 -right-6 w-7 h-8 text-beige-one/60 hidden lg:block">
                    <HeartTwo className="w-full h-full -rotate-6" />
                  </div>
                </>
              )}
            </div>
          ))}
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

export default AboutPassions;
