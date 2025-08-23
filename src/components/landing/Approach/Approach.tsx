"use client";
import DotsSecondary from "@/components/icons/dots-secondary";
import Heart from "@/components/icons/heart";
import { useImageRevealAnimations } from "@/hooks/useImageRevealAnimations";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";
import { urlFor } from "@/sanity/lib/image";
import type { ApproachSectionData } from "@/sanity/queries";
import { fontSizes } from "@/styles/typography";
import Image from "next/image";
import { useRef, useState } from "react";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

interface ApproachProps {
  data?: ApproachSectionData;
}

export default function Approach({ data }: ApproachProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<"capture" | "approach">(
    "capture"
  );

  useScrollAnimations(sectionRef);
  useImageRevealAnimations(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="relative w-screen min-h-screen overflow-hidden"
    >
      {/* Background using ImageWithFallback */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src={data?.backgroundImage}
          alt="Approach section background"
          fill
          className="object-cover"
          fallback={
            <div className="w-full h-full bg-gradient-to-br from-beige-one to-brown-one"></div>
          }
        />
      </div>

      {/* Grain overlay */}
      <div
        className="absolute inset-0 z-30 opacity-18 pointer-events-none"
        style={{
          backgroundImage: "url('/grain.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Mobile Tab Switcher - Now visible on mobile AND tablet */}
      <div className="lg:hidden w-full bg-brown-one/90 backdrop-blur-sm relative z-20">
        <div className="flex">
          <button
            className={`flex-1 py-4 px-4 text-center transition-all duration-300 ${
              activeSection === "capture"
                ? "bg-brown-one text-beige-one"
                : "bg-brown-one text-beige-one"
            }`}
            onClick={() => setActiveSection("capture")}
          >
            <div className="space-y-1">
              <p className="font-domaine-display text-xs text-beige-two">
                spectrum
              </p>
              <span className="font-instrument-serif uppercase font-medium block text-xl">
                WHAT I CAPTURE
              </span>
            </div>
          </button>

          <button
            className={`flex-1 py-4 px-4 text-center border-l border-black/20 transition-all duration-300 ${
              activeSection === "approach"
                ? "bg-beige-two text-brown-one"
                : "bg-beige-two text-brown-one"
            }`}
            onClick={() => setActiveSection("approach")}
          >
            <div className="space-y-1">
              <p className="font-domaine-display text-xs text-brown-one">
                ethos
              </p>
              <span className="font-instrument-serif uppercase font-medium block text-xl">
                MY APPROACH
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Main content wrapper */}
      <div className="flex min-h-screen relative z-20">
        {/* Left sidebar with two columns - Only visible on desktop */}
        <div className="hidden lg:flex">
          {/* WHAT I CAPTURE column - Brown */}
          <div
            className="w-24 flex items-center justify-center cursor-pointer transition-all duration-300 bg-brown-one"
            onClick={() => setActiveSection("capture")}
          >
            <div className="absolute top-12">
              <p
                className="font-domaine-display text-beige-two"
                style={{ fontSize: fontSizes.approachSidebarLabel }}
              >
                spectrum
              </p>
            </div>
            <div className="transform -rotate-90 origin-center">
              <span
                className="font-instrument-serif uppercase whitespace-nowrap transition-colors text-beige-one"
                style={{ fontSize: fontSizes.approachSidebarText }}
              >
                WHAT I CAPTURE
              </span>
            </div>
          </div>

          {/* MY APPROACH column - Beige */}
          <div
            className="w-24 relative flex items-center justify-center border border-black cursor-pointer transition-all duration-300 bg-beige-two"
            onClick={() => setActiveSection("approach")}
          >
            <div className="absolute top-12">
              <p
                className="font-domaine-display transition-colors text-brown-one"
                style={{ fontSize: fontSizes.approachSidebarLabel }}
              >
                ethos
              </p>
            </div>
            <div className="transform -rotate-90 origin-center">
              <span
                className="font-instrument-serif uppercase whitespace-nowrap transition-colors text-brown-one"
                style={{ fontSize: fontSizes.approachSidebarText }}
              >
                MY APPROACH
              </span>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="w-full pt-4 lg:pt-8 relative">
          {/* What I Capture Section */}
          {activeSection === "capture" && (
            <>
              {/* Header section */}
              <div
                className="relative pb-6 lg:pb-10 px-[5vw] lg:px-[3.5vw] overflow-hidden"
                data-fade="heading"
              >
                {/* Quote - positioned top right with rotation - Only on desktop */}
                <div className="hidden lg:block absolute top-12 right-15 transform -rotate-10 origin-top-right">
                  <p
                    className="font-la-belle-aurore text-black"
                    style={{ fontSize: fontSizes.approachQuote }}
                  >
                    {data?.whatICaptureTab?.quote ||
                      '"Because these days are worth remembering. ♡"'}
                  </p>

                  {/* Dots positioned below the quote */}
                  <div className="absolute top-4 right-5">
                    <DotsSecondary className="w-72 h-48" />
                  </div>
                </div>

                {/* Mobile/Tablet Quote - Centered */}
                <div className="lg:hidden text-center pt-4 mb-4 -rotate-3">
                  <p
                    className="font-la-belle-aurore text-black"
                    style={{ fontSize: fontSizes.bodyLarge }}
                  >
                    {data?.whatICaptureTab?.quote ||
                      '"Because these days are worth remembering. ♡"'}
                  </p>
                </div>

                {/* Main title and button */}
                <div className="flex flex-col items-start gap-4 lg:gap-8">
                  <h2
                    className="font-domaine-display font-semibold text-brown-one relative inline-block text-center lg:text-left w-full lg:w-auto word-underline"
                    style={{ fontSize: fontSizes.approachTitle }}
                  >
                    {data?.whatICaptureTab?.title || "WHERE MY LENS LEADS"}
                  </h2>

                  {/* View Packages Button */}
                  <button
                    className="w-full lg:w-auto inline-flex items-center justify-center gap-3 px-6 lg:px-10 py-3 lg:py-4 border-2 border-brown-one rounded-full text-brown-one hover:bg-brown-one hover:text-beige-one transition-all duration-300 font-inconsolata font-medium uppercase tracking-wide mt-4 lg:mt-8"
                    style={{ fontSize: fontSizes.approachButtonText }}
                  >
                    {data?.whatICaptureTab?.ctaButtonText ||
                      "EXPLORE MY PACKAGES"}
                    <svg
                      className="w-4 h-4 rotate-310"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                    >
                      <path d="M8 0L6.59 1.41L12.17 7H0v2h12.17L6.59 14.59L8 16l8-8z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Three category sections */}
              <div
                className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12 bg-[#4C453B] w-full pb-6 lg:pb-10 pt-8 lg:pt-14 px-[5vw] lg:px-[3.5vw] z-20"
                data-fade="categories"
              >
                {data?.whatICaptureTab?.categories?.map((category, index) => (
                  <div key={index} className="text-center lg:text-left z-40">
                    <h3
                      className="font-instrument-serif font-medium text-beige-two pb-4 lg:pb-6 uppercase"
                      style={{ fontSize: fontSizes.approachCategoryTitle }}
                    >
                      {category.title}
                    </h3>
                    <div
                      className="h-[440px] md:h-[500px] relative overflow-hidden p-3 lg:p-4 bg-white border border-black z-40"
                      data-frame-container
                    >
                      <div className="w-full h-full border border-black z-40">
                        <div
                          className="w-full h-full z-40"
                          data-image-reveal
                          style={{
                            backgroundImage: category.image 
                              ? `url('${urlFor(category.image.asset).url()}')` 
                              : 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* My Approach Section */}
          {activeSection === "approach" && (
            <>
              <div
                className="relative w-full min-h-screen flex flex-col justify-between px-[5vw] lg:px-[3.5vw] pt-4 lg:pt-7"
                data-fade="approach-content"
              >
                {/* Decorative hearts */}
                <div className="hidden lg:block absolute top-4 right-20">
                  <Heart className="w-[28px] h-[31px] rotate-12 text-brown-one/90"/>
                </div>
                <div className="hidden lg:block absolute top-0 right-10">
                  <Heart className="w-10 h-10 rotate-18 text-dark-beige"/>
                </div>

                {/* Main content */}
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-stretch w-full">
                  {/* Image with scale reveal animation */}
                  <div className="w-full lg:w-[80%] order-2 lg:order-1">
                    <div
                      className="aspect-[3/4] bg-brown-one p-3 shadow-xl overflow-hidden"
                      data-frame-container
                    >
                      <div
                        className="w-full h-full relative border border-white/80"
                        data-image-reveal
                      >
                        <ImageWithFallback
                          src={data?.myApproachTab?.image}
                          alt="My approach to photography"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Text content */}
                  <div className="flex flex-col items-start gap-4 lg:gap-8 max-w-full lg:max-w-[700px] order-1 lg:order-2">
                    <h2
                      className="font-domaine-display font-medium text-brown-one text-center lg:text-left w-full"
                      style={{ fontSize: fontSizes.approachWayIWork }}
                    >
                      {data?.myApproachTab?.title || "THE WAY I WORK"}
                    </h2>

                    <div className="space-y-4 lg:space-y-6 text-brown-one">
                      {data?.myApproachTab?.description?.map(
                        (paragraph, index) => {
                          const splitParagraphs = paragraph.split('\n\n').filter(p => p.trim());
                          if (splitParagraphs.length > 1) {
                            return splitParagraphs.map((splitPara, splitIndex) => (
                              <p
                                key={`${index}-${splitIndex}`}
                                className="font-inconsolata font-medium leading-relaxed text-center lg:text-left"
                                style={{ fontSize: fontSizes.approachBodyText }}
                              >
                                {splitPara.trim()}
                              </p>
                            ));
                          }
                          return (
                            <p
                              key={index}
                              className="font-inconsolata font-medium leading-relaxed text-center lg:text-left"
                              style={{ fontSize: fontSizes.approachBodyText }}
                            >
                              {paragraph}
                            </p>
                          );
                        }
                      ) || (
                        <>
                          <p
                            className="font-inconsolata font-medium leading-relaxed text-center lg:text-left"
                            style={{ fontSize: fontSizes.approachBodyText }}
                          >
                            I don&apos;t just take photos - I tune into the
                            energy of the moment, capturing the feelings that
                            can&apos;t be posed or repeated. Inspired by golden
                            light, real connection, and the way people just are
                            when they feel truly seen, my approach is raw,
                            intentional, and heart-first.
                          </p>
                          <p
                            className="font-inconsolata font-medium leading-relaxed text-center lg:text-left"
                            style={{ fontSize: fontSizes.approachBodyText }}
                          >
                            Whether it&apos;s a quiet elopement by the sea or a
                            chaotic, love-filled wedding dance floor - I chase
                            the moments that feel like you. Based in Long Island
                            but always ready to roam, I bring storytelling,
                            spontaneity, and soul into every frame.
                          </p>
                        </>
                      )}
                    </div>

                    <button
                      className="w-full lg:w-auto inline-flex items-center justify-center lg:justify-start font-instrument-serif text-brown-one hover:bg-brown-one hover:text-beige-one transition-all duration-300 font-medium uppercase tracking-wide underline underline-offset-8"
                      style={{ fontSize: fontSizes.approachButtonText }}
                    >
                      {data?.myApproachTab?.ctaButtonText ||
                        "EXPLORE MY PACKAGES"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom quote section */}
              <div className="relative w-full h-[200px] lg:h-[300px] mt-8 lg:mt-16 overflow-hidden">
                <ImageWithFallback
                  src={data?.myApproachTab?.bottomQuoteBackground}
                  alt="Approach background"
                  fill
                  className="object-cover"
                  fallback={
                    <div className="w-full h-full bg-gradient-to-br from-brown-one to-beige-one"></div>
                  }
                />
                <div className="absolute inset-0 bg-brown-one/50" />

                <div className="relative z-10 h-full flex items-center justify-center lg:justify-start pl-4 lg:pl-20 pr-4 lg:pr-6 text-center lg:text-left">
                  <div className="scale-[0.4] lg:scale-[0.9] absolute left-10 -top-4 lg:left-20 lg:top-4">
                    <Image
                      src="/my-approach-hearts.svg"
                      alt="heart icons"
                      width={94}
                      height={122}
                      className="object-cover"
                    />
                  </div>
                  <p
                    className="text-white font-la-belle-aurore italic max-w-3xl leading-relaxed transform -rotate-1 lg:-rotate-4 mt-0 lg:mt-10"
                    style={{ fontSize: fontSizes.approachQuote }}
                  >
                    {data?.myApproachTab?.bottomQuote ||
                      '"Every photo is a piece of your story, told with light and love."'}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
