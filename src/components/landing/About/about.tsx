import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { fontSizes } from "@/styles/typography";
import Image from "next/image";
import React, { useRef, useState } from "react";
import Polaroid from "../../ui/Polaroid";

const About: React.FC = () => {
  return (
    <SectionWrapper
      withGrain
      grainOpacity={12}
      className="bg-beige-one w-screen flex items-center justify-center border-b-2 border-brown-two"
    >
      <div className="w-full bg-blue rounded-2xl md:rounded-3xl px-4 py-8 md:p-8 lg:p-16 relative shadow-2xl border border-black overflow-hidden">
        {/* Grain overlay */}
        {/* <div
          className="absolute inset-0 z-30 opacity-18 pointer-events-none rounded-2xl md:rounded-3xl"
          style={{
            backgroundImage: "url('/grain.png')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        /> */}

        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center w-full relative z-20 gap-8 lg:gap-16">
          {/* Text Content */}
          <div className="text-brown-one order-2 lg:order-1 flex-1 lg:max-w-[55%] relative">
            <div className="flex lg:items-center sm:gap-6 md:gap-14 lg:gap-14 mb-6 md:mb-8">
              <h1
                className="font-travel-november font-normal m-0 text-brown-one text-center sm:text-left"
                style={{ fontSize: fontSizes.approachTitle }}
              >
                Hi I&apos;m Victoria
              </h1>
              {/* Camera SVG - fixed positioning */}
              <div className="absolute -right-4 -top-6 lg:-top-2 scale-[0.7] md:hidden lg:scale-[1] lg:flex lg:items-center">
                <Image
                  src="/camera.svg"
                  alt="camera"
                  width={100}
                  height={80}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <div className="mb-4 md:mb-6 leading-relaxed text-left">
              <p
                className="font-inconsolata font-medium text-black m-0 mb-4"
                style={{ fontSize: fontSizes.bodyMedium }}
              >
                I&apos;m not just your photographer - I&apos;m your hype girl, your calm
                in the chaos, and your biggest fan behind the lens. I&apos;m here to
                capture your magic, the wild love, the quiet glances, the
                full-body laughs - all the moments that make your story uniquely
                you.
              </p>
            </div>

            <div className="mb-6 md:mb-10 leading-relaxed text-left">
              <p
                className="font-inconsolata font-medium text-black m-0"
                style={{ fontSize: fontSizes.bodyMedium }}
              >
                Whether we&apos;re dancing barefoot on Long Island or chasing sunsets
                across the globe, I&apos;ll be right there - grounding you, guiding
                you, and soaking in every ounce of light + love right alongside
                you ♡
              </p>
            </div>

            {/* Button - regular button with responsive border radius */}
            <div className="">
              <button
                className="bg-black text-beige-two border-none px-6 md:px-8 py-3 rounded-full font-inconsolata font-medium cursor-pointer transition-all duration-300 hover:bg-brown-two hover:-translate-y-1 min-w-[140px] responsive-border-radius"
                style={{
                  fontSize: fontSizes.buttonText,
                }}
              >
                MY STORY
              </button>
            </div>
          </div>

          {/* Visual Content */}
          <div className="relative flex justify-center items-center order-1 lg:order-2 z-20 flex-shrink-0">
            <Polaroid
              imageSrc="/victoria.jpg"
              caption="Long Island, NY photographer for the wildly in love and endlessly inspired ♡"
              alt="Victoria with her camera in a field"
              rotation={3}
              className="w-[280px] sm:w-[320px] md:w-[380px] lg:w-[400px]"
              imgclassName="h-[260px] sm:h-[320px] md:h-[380px] lg:h-[400px]"
            />
            <Image
              src="/about-tape.svg"
              alt="tape-icon"
              width={194}
              height={169}
              className="absolute -top-16 lg:-top-14 left-1/2 -translate-x-1/2 scale-[0.7] md:scale-[0.8] lg:scale-[1]"
            />
          </div>
        </div>

        {/* Hearts decoration - hide on mobile, show on tablet+ */}
        <div className=" absolute top-2 right-0 md:top-8 md:right-16 w-12 h-9 md:w-16 md:h-12 scale-[0.8] z-10 md:z-30">
          <Image
            src="/heart.svg"
            alt="hearts decoration"
            width={64}
            height={48}
            className="w-full h-full object-contain opacity-70"
          />
        </div>
        <div className="absolute top-6 right-2 md:top-6 md:right-6 w-12 h-9 md:w-16 md:h-12 z-10 md:z-30">
          <Image
            src="/heart.svg"
            alt="hearts decoration"
            width={64}
            height={48}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Tree decorative image - responsive positioning */}
        <div className="absolute -bottom-2 md:-bottom-4 left-[55%] sm:left-[50%] md:left-[60%] lg:left-[55%] w-32 sm:w-40 md:w-64 lg:w-52 sm:h-[30%] md:h-[25%] lg:h-[35%] z-10">
          <Image
            src="/about-trees.jpg"
            alt="decorative trees"
            width={180}
            height={140}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </SectionWrapper>
  );
};

export default About;
