import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { TypewriterText } from "@/components/ui/TypewriterText";
import { fontSizes } from "@/styles/typography";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import React from "react";
import Link from "next/link";

interface AboutIntroProps {
  data?: {
    name: string;
    subtitle: string;
    typewriterWords: string[];
    description: string;
    paragraphs: string[];
    backgroundImage?: {
      asset: {
        _id: string;
        url: string;
      };
    };
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
  const typewriterWords = data?.typewriterWords || [
    "MOTHER",
    "PHOTOGRAPHER",
    "ARTIST",
    "DREAMER",
  ];

  // Helper function to resolve image URLs
  const getImageUrl = (
    image: { asset: { _id: string; url: string } } | undefined
  ): string | null => {
    if (!image?.asset) return null;
    return urlFor(image.asset).url();
  };
  return (
    <section className="relative max-w-[2200px] mx-auto w-full min-h-screen py-8 md:py-16">
      {/* Full screen background image */}
      <div className="absolute z-0 bottom-0 lg:left-1/4 right-0 w-[270px] h-[300px] scale-125">
        <div className="relative w-full h-full">
          {data?.backgroundImage?.asset?.url ? (
            <ImageWithFallback
              src={getImageUrl(data.backgroundImage)}
              alt="Victoria portrait"
              fill
              className="lg:opacity-30 opacity-20 object-cover"
            />
          ) : (
            <Image
              src="/about-intro-bg.avif"
              alt="Victoria portrait"
              fill
              className="opacity-30 object-cover"
            />
          )}
        </div>
      </div>

      {/* Bottom left smaller image - desktop only */}
      <div className="absolute bottom-0 right-3 w-[130px] h-[160px] lg:w-[150px] lg:h-[180px] hidden lg:block">
        <div className="relative w-full h-full overflow-hidden">
          <ImageWithFallback
            src={getImageUrl(data?.smallImageBottom)}
            alt="Victoria portrait small 2"
            fill
            className="object-cover"
          />
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

      <div className="relative w-full h-full z-20 mx-auto px-[5vw] lg:px-[3.5vw]">
        {/* Main heading and subtitle */}
        <div className="text-left mb-8 lg:mb-8">
          <h1
            className="font-travel-november text-brown-one mb-2 md:mb-4 leading-tight"
            style={{ fontSize: fontSizes.approachTitle }}
          >
            {data?.name || "I'm Victoria Rezny"}
          </h1>

          {/* Typewriter subtitle */}
          <div className="mb-4 md:mb-0">
            <span
              className="font-inconsolata text-brown-one uppercase tracking-wider"
              style={{ fontSize: "clamp(14px, 1.8vw, 20px)" }}
            >
              (
            </span>

            <TypewriterText
              key={JSON.stringify(typewriterWords)} // Force re-render when words change
              words={typewriterWords}
              speed={100}
              deleteSpeed={50}
              delayBetweenWords={2000}
              delay={500} // Reduced delay for testing
              className="font-inconsolata text-brown-one uppercase tracking-wider inline-block mx-2"
              style={{ fontSize: "clamp(14px, 1.8vw, 20px)" }}
            />
            <span
              className="font-inconsolata text-brown-one uppercase tracking-wider"
              style={{ fontSize: "clamp(14px, 1.8vw, 20px)" }}
            >
              )
            </span>
          </div>

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
            <div className="mb-8 md:mb-12">
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
                    If you&apos;re drawn to photos that feel alive — the kind that
                    make you remember the breeze, the laughter that made your
                    cheeks hurt, and the energy that filled the room — then we
                    are a great fit, and you&apos;re exactly where you should be.
                  </p>
                 
                </>
              )}
            </div>

            {/* INQUIRE button */}
            <Link
              href="/contact"
              className="bg-brown-one text-beige-two border-none px-4 md:px-8 py-2 md:py-3 font-inconsolata font-medium cursor-pointer transition-all duration-300 hover:bg-brown-two hover:-translate-y-1 min-w-[100px] md:min-w-[140px] rounded-[50%]"
              style={{
                fontSize: "clamp(12px, 1.6vw, 16px)",
              }}
            >
              {data?.ctaButtonText || "INQUIRE"}
            </Link>
          </div>

          {/* Right side - Images */}
          <div className="order-1 lg:order-2 relative h-[300px] md:h-[400px] lg:h-auto">
            {/* Mobile: Single centered image */}
            <div className="lg:hidden border-brown-one border-3 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[280px] md:w-[260px] md:h-[320px]">
              <div className="relative w-full h-full overflow-hidden">
                <ImageWithFallback
                  src={getImageUrl(data?.mainImage)}
                  alt="Victoria portrait main"
                  fill
                  className="object-cover object-[45%_50%]"
                />
              </div>
            </div>

            {/* Desktop: Main large image */}
            <div className="hidden lg:block absolute left-1/4 -top-15 -translate-x-1/2 w-[320px] h-[400px]">
              <div className="relative w-full h-full overflow-hidden border-4 border-brown-two">
                <ImageWithFallback
                  src={getImageUrl(data?.mainImage)}
                  alt="Victoria portrait main"
                  fill
                  className="object-cover object-[45%_50%]"
                />
              </div>
            </div>

            {/* Top right smaller image - desktop only */}
            <div className="absolute top-8 right-0 w-[140px] h-[170px] lg:w-[160px] lg:h-[200px] hidden lg:block">
              <div className="relative border w-full h-full overflow-hidden">
                <ImageWithFallback
                  src={getImageUrl(data?.smallImageTop)}
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
      <div className="hidden lg:block absolute bottom-0 -right-10 text-brown-one -z-10">
        <Image
          src="/dots-dark.svg"
          alt="Decorative dots"
          width={350}
          height={250}
        />
      </div>

      <div className="hidden lg:block absolute -top-10 -right-15 opacity-50 text-brown-one/70 -z-10">
        <Image
          src="/dots-dark.svg"
          alt="Decorative dots"
          width={300}
          height={250}
        />
      </div>
    </section>
  );
};

export default AboutIntro;
