"use client";
import DotsPrimary from "@/components/icons/dots-primary";
import { fontSizes } from "@/styles/typography";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import React from "react";

interface AboutIntroProps {
  data?: {
    name: string;
    subtitle: string;
    description: string;
    paragraphs: string[];
    mainImage: {
      asset: {
        _id: string;
        url: string;
      };
    };
    smallImageTop: {
      asset: {
        _id: string;
        url: string;
      };
    };
    smallImageBottom: {
      asset: {
        _id: string;
        url: string;
      };
    };
    ctaButtonText: string;
  };
}

const AboutIntro: React.FC<AboutIntroProps> = ({ data }) => {
  return (
    <section className="relative w-screen min-h-screen py-8 md:py-16">
      {/* Full screen background image */}
      <div className="absolute inset-0 z-0"></div>

      {/* Bottom left smaller image - desktop only */}
      <div className="absolute bottom-0 right-3 w-[130px] h-[160px] lg:w-[150px] lg:h-[180px] hidden lg:block">
        <div className="relative w-full h-full overflow-hidden">
          <ImageWithFallback
            src={data?.smallImageBottom}
            alt="Victoria portrait small 2"
            fill
            className="object-cover"
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

      <div className="relative w-full h-full z-20 mx-auto px-[5vw] lg:px-[3.5vw]">
        {/* Main heading and subtitle */}
        <div className="text-left mb-8 lg:mb-8">
          <h1
            className="font-travel-november text-brown-one mb-2 md:mb-4 leading-tight"
            style={{ fontSize: fontSizes.approachTitle }}
          >
            {data?.name || "I'm Victoria Rezny"}
          </h1>
          <p
            className="font-inconsolata text-brown-one uppercase tracking-wider mb-4 md:mb-0"
            style={{ fontSize: "clamp(14px, 1.8vw, 20px)" }}
          >
            {data?.subtitle || "( MOTHER )"}
          </p>

          {/* Descriptive text - desktop top right, mobile below subtitle */}
          <div className="lg:absolute lg:top-0 lg:right-[3.5vw] max-w-[350px] lg:hidden block z-20 mb-6">
            <p
              className="font-inconsolata font-medium text-brown-one/80 text-left lg:text-right italic leading-tight"
              style={{ fontSize: "clamp(12px, 1.2vw, 16px)" }}
            >
              {data?.description ||
                "A detail-obsessed, fantasy-loving, Nature-obsessed festival documentary-style wedding photographer"}
            </p>
          </div>

          {/* Desktop version - hidden on mobile */}
          <div className="hidden lg:block absolute top-0 right-[3.5vw] max-w-[350px] z-20">
            <p
              className="font-inconsolata font-medium text-brown-one/80 text-right italic leading-tight"
              style={{ fontSize: "clamp(11px, 1.2vw, 16px)" }}
            >
              {data?.description ||
                "A detail-obsessed, fantasy-loving, Nature-obsessed festival documentary-style wedding photographer"}
            </p>
          </div>
        </div>

        {/* Content grid */}
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left side - Text content */}
          <div className="order-2 lg:order-1 max-w-xl">
            <div className="mb-6 md:mb-8">
              {data?.paragraphs?.map((paragraph, index) => (
                <p
                  key={index}
                  className="font-inconsolata text-brown-one mb-4 md:mb-6 leading-relaxed"
                  style={{ fontSize: "clamp(14px, 1.5vw, 18px)" }}
                >
                  {paragraph}
                </p>
              )) || (
                <>
                  <p
                    className="font-inconsolata text-brown-one mb-4 md:mb-6 leading-relaxed"
                    style={{ fontSize: "clamp(14px, 1.5vw, 18px)" }}
                  >
                    If you're looking for a photographer who feels like a
                    friend, will immerse you in nature, and capture how your day
                    feels instead of only prioritizing the big moments - you're
                    in the right place!
                  </p>
                  <p
                    className="font-inconsolata text-brown-one mb-6 md:mb-8 leading-relaxed"
                    style={{ fontSize: "clamp(14px, 1.5vw, 18px)" }}
                  >
                    I strive to make my everyday moments feel significant,
                    whether that's making my daily peppermint matcha, attending
                    a pottery class, or knitting at home with my favorite candle
                    burning. Exploring is one of my favorite passions - one that
                    allows me to have a unique and creative perspective of the
                    world, which results in inspired, intentional, and emotive
                    images for you.
                  </p>
                </>
              )}
            </div>

            {/* INQUIRE button */}
            <button
              className="bg-brown-one text-beige-two border-none px-6 md:px-8 py-2 md:py-3 font-inconsolata font-medium cursor-pointer transition-all duration-300 hover:bg-brown-two hover:-translate-y-1 min-w-[120px] md:min-w-[140px] responsive-border-radius"
              style={{
                fontSize: "clamp(12px, 1.6vw, 16px)",
              }}
            >
              {data?.ctaButtonText || "INQUIRE"}
            </button>
          </div>

          {/* Right side - Images */}
          <div className="order-1 lg:order-2 relative h-[300px] md:h-[400px] lg:h-auto">
            {/* Mobile: Single centered image */}
            <div className="lg:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[280px] md:w-[260px] md:h-[320px]">
              <div className="relative w-full h-full overflow-hidden">
                <ImageWithFallback
                  src={data?.mainImage}
                  alt="Victoria portrait main"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Desktop: Main large image */}
            <div className="hidden lg:block absolute left-1/4 -top-15 -translate-x-1/2 w-[320px] h-[400px]">
              <div className="relative w-full h-full overflow-hidden">
                <ImageWithFallback
                  src={data?.mainImage}
                  alt="Victoria portrait main"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Top right smaller image - desktop only */}
            <div className="absolute top-8 right-0 w-[140px] h-[170px] lg:w-[160px] lg:h-[200px] hidden lg:block">
              <div className="relative w-full h-full overflow-hidden">
                <ImageWithFallback
                  src={data?.smallImageTop}
                  alt="Victoria portrait small 1"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative dots - desktop only */}
      <div className="hidden lg:block absolute bottom-0 right-16 w-[350px] h-[250px] text-brown-one z-10">
        <DotsPrimary className="w-full h-full" />
      </div>

      <div className="hidden lg:block absolute -top-10 -right-10 w-[350px] h-[250px] text-brown-one/70 z-10">
        <DotsPrimary className="w-full h-full" />
      </div>
    </section>
  );
};

export default AboutIntro;
