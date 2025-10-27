import { fontSizes } from "@/styles/typography";
import { urlFor } from "@/sanity/lib/image";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import Link from "next/link";
import React from "react";

interface AboutApproachProps {
  data?: {
    title: string;
    paragraphs: string[];
    backgroundImage: {
      asset: {
        _id: string;
        url: string;
      };
    };
    leftImage?: {
      asset: {
        _id: string;
        url: string;
      };
    };
    rightImage?: {
      asset: {
        _id: string;
        url: string;
      };
    };
    ctaButtonText: string;
  };
}

const AboutApproach: React.FC<AboutApproachProps> = ({ data }) => {
  // Helper function to resolve image URLs
  const getImageUrl = (
    image: { asset: { _id: string; url: string } } | undefined
  ): string | null => {
    if (!image?.asset) return null;
    return urlFor(image.asset).url();
  };

  return (
    <section className="relative max-w-[2200px] mx-auto w-full py-16 md:py-20 lg:py-24 bg-beige-one border-b-4 border-t-4 border-t-brown-one border-beige-two">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src={getImageUrl(data?.backgroundImage)}
          alt="About approach background"
          fill
          className="object-cover"
          fallback={
            <div className="w-full h-full bg-gradient-to-br from-brown-one to-beige-one"></div>
          }
        />
        <div className="absolute inset-0 bg-brown-one/40"></div>
      </div>

      {/* Grain overlay */}
      <div
        className="absolute inset-0 z-5 opacity-25 pointer-events-none"
        style={{
          backgroundImage: "url('/grain.webp')",

          backgroundRepeat: "repeat",
        }}
      />

      <div className="relative flex flex-col items-center gap-10 z-10 px-[5vw] lg:px-0 lg:max-w-3xl xl:max-w-5xl mx-auto">
        {/* Main Quote */}
        <div className="text-center">
          <h1
            className="font-instrument-serif text-beige-one leading-tight"
            style={{ fontSize: fontSizes.galleryTitle }}
          >
            {data?.title ||
              "CAPTURING YOUR LOVE, LIKE THE WARM EMBRACE OF AUTUMN."}
          </h1>
        </div>
        <div className="flex flex-col items-center gap-12 lg:max-w-2xl xl:max-w-4xl">
          {data?.paragraphs?.map((paragraph, index) => (
            <p
              key={index}
              className="font-inconsolata text-beige-two leading-relaxed tracking-tight text-center"
              style={{ fontSize: fontSizes.bodyMedium }}
            >
              {paragraph}
            </p>
          )) || (
            <>
              <p
                className="font-inconsolata text-beige-two leading-relaxed tracking-tight text-center"
                style={{ fontSize: fontSizes.bodyMedium }}
              >
                I capture your day as it unfolds — the raw, real moments — using
                a creative eye to highlight the details that make it uniquely
                yours. The moments I love most are the ones that happen
                naturally, so my main focus is always making you feel
                comfortable and relaxed. My approach is simple: I show up
                honestly, offer guidance when you need it, and remain fully
                present, keeping your story — all the little in-between moments
                included — at the heart of everything I do, while making the
                experience feel effortless, fun, and completely true to who you
                are.
              </p>
            </>
          )}

          <Link href="/portfolio">
            <button className="font-inconsolata text-black rounded-full bg-blue  hover:bg-beige-one hover:text-brown-one transition-colors duration-300 py-2 px-5 hover:cursor-pointer">
              {data?.ctaButtonText || "VIEW PORTFOLIO"}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutApproach;
