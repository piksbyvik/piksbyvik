"use client";
import React from "react";
import { fontSizes } from "@/styles/typography";
import Image from "next/image";
import Polaroid from "@/components/ui/Polaroid";
import { urlFor } from "@/sanity/lib/image";

interface AboutHeroProps {
  data?: {
    title: string;
    subtitle: string;
    backgroundImage: {
      asset: {
        _id: string;
        url: string;
      };
    };
    polaroidImage: {
      asset: {
        _id: string;
        url: string;
      };
    };
    polaroidCaption: string;
  };
}

const AboutHero: React.FC<AboutHeroProps> = ({ data }) => {
  return (
   <section className="relative w-screen h-screen overflow-hidden">
  {/* Background Image */}
  <div className="absolute inset-0 z-0">
    <Image
      src={data?.backgroundImage ? urlFor(data.backgroundImage.asset).url() : "/about-hero-bg.jpg"}
      alt="About hero background"
      fill
      className="object-cover"
      priority
    />
    <div className="absolute inset-0 bg-black/20" />
  </div>

  {/* Content */}
  <div className="relative z-10 h-full flex flex-col lg:flex-row items-center justify-center lg:justify-between px-[5vw] lg:px-[10vw] pt-40 lg:pt-20 gap-8">
    {/* Polaroid Image */}
    <div className="flex-shrink-0 mb-8 lg:mb-0">
      <Polaroid
        imageSrc={data?.polaroidImage ? urlFor(data.polaroidImage.asset).url() : "/about-hero-v.avif"}
        caption={data?.polaroidCaption || "Wedding | Lifestyle photographer"}
        alt="Victoria - Wedding and Lifestyle photographer"
        rotation={-2}
        className="w-[280px] md:w-[320px] lg:w-[400px]"
        imgclassName="h-[260px] sm:h-[300px] md:h-[340px] lg:h-[420px]"
      />
    </div>

    {/* Text Content */}
    <div className="flex-1 flex flex-col items-center lg:items-center text-center lg:text-center max-w-2xl">
      <h1
        className="font-domaine-display text-beige-two uppercase mb-4"
        style={{ fontSize: fontSizes.galleryTitle }}
      >
        {data?.title || "MEET VICTORIA"}
      </h1>
      <p
        className="font-la-belle-aurore font-medium text-beige-two/90 mb-8"
        style={{ fontSize: fontSizes.bodyLarge }}
      >
        {data?.subtitle || "( I am so glad you are here )"}
      </p>
    </div>
  </div>

  {/* Grain overlay */}
  <div
    className="absolute inset-0 z-5 opacity-15 pointer-events-none"
    style={{
      backgroundImage: "url('/grain.png')",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    }}
  />
</section>

  );
};

export default AboutHero;
