"use client";
import React from "react";
import Image from "next/image";
import { fontSizes } from "@/styles/typography";
import Polaroid from "../../ui/Polaroid";

const galleryImages = [
  {
    id: 1,
    src: "/gallery-1.png",
    caption: "Jennifer & Anthony's Wedding",
    rotation: -3,
    shadowRotation: -8,
    decorativeElement: {
      type: "pin",
      src: "/pin.svg",
      position: { top: "-24px", left: "50%", translateX: "-50%" },
      rotation: -10,
      size: { width: 50, height: 50 },
    },
  },
  {
    id: 2,
    src: "/gallery-4.png",
    caption: "Emily & Ryan's Wedding",
    rotation: 2,
    shadowRotation: 6,
    decorativeElement: {
      type: "clip",
      src: "/clip.svg",
      position: { top: "-80px", left: "-30px" },
      rotation: 15,
      size: { width: 140, height: 160 },
    },
  },
  {
    id: 3,
    src: "/gallery-3.png",
    caption: "Emily & Ryan's Wedding",
    rotation: -1,
    shadowRotation: -7,
    decorativeElement: {
      type: "tape",
      src: "/about-tape.svg",
      position: { top: "-65px", left: "25%", translateX: "-50%" },
      rotation: 5,
      size: { width: 194, height: 169 },
    },
  },
  {
    id: 4,
    src: "/gallery-5.png",
    caption: "Amaris & Anthony's Wedding",
    rotation: 3,
    shadowRotation: 8,
    decorativeElement: {
      type: "tape",
      src: "/tape-2.svg",
      position: { top: "-30px", left: "50%", translateX: "-50%" },
      rotation: 8,
      size: { width: 132, height: 77 },
    },
  },
  {
    id: 5,
    src: "/gallery-2.png",
    caption: "The Nguyen Maternity Session",
    rotation: -2,
    shadowRotation: -6,
    decorativeElement: {
      type: "clip",
      src: "/clip.svg",
      position: { top: "-80px", right: "-40px" },
      rotation: -8,
      size: { width: 140, height: 160 },
    },
  },
  {
    id: 6,
    src: "/gallery-6.png",
    caption: "Amy's Maternity Session",
    rotation: 1,
    shadowRotation: 5,
    decorativeElement: {
      type: "pin",
      src: "/pin.svg",
      position: { top: "-4px", right: "-30px" },
      rotation: -10,
      size: { width: 50, height: 50 },
    },
  },
];

const Gallery: React.FC = () => {
  return (
    <section
      className="relative w-screen min-h-screen py-8 md:py-16 lg:py-24 overflow-hidden"
      style={{
        backgroundImage: "url('/gallery-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Grain overlay */}
      <div
        className="absolute inset-0 z-30 opacity-12 pointer-events-none"
        style={{
          backgroundImage: "url('/grain.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="w-full relative z-20 px-[5vw] lg:px-[3.5vw]">
        {/* Section Header */}
        <div className="text-left relative mb-8 md:mb-12 lg:mb-20">
          <div className="flex items-start sm:items-center gap-2 sm:gap-4">
            <h2
              className="font-travel-november text-brown-one mb-4 sm:mb-6 relative inline-block gallery-underline"
              style={{ fontSize: fontSizes.galleryTitle }}
            >
              Featured Galleries
            </h2>
            <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 opacity-80 mb-4 sm:mb-6">
              <Image
                src="/heart.svg"
                alt="decorative heart"
                width={64}
                height={64}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-24 md:gap-x-16 sm:gap-y-16 lg:gap-y-32 mt-10 mb-12 sm:mb-16 lg:mb-32 z-20">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className="relative flex justify-center items-center min-h-[300px] sm:min-h-[350px] lg:min-h-[420px]"
            >
              {/* Background Polaroid - Direct responsive sizing */}
              <div className="absolute z-0 translate-x-1 translate-y-1 sm:translate-x-2 sm:translate-y-2">
                <Polaroid
                  imageSrc=""
                  caption=""
                  alt=""
                  rotation={image.shadowRotation}
                  className="shadow-lg bg-black"
                  style={{
                    width: "clamp(320px, 28vw, 380px)",
                  }}
                  imgclassName="bg-black"
                  imgStyle={{
                    height: "clamp(320px, 28vw, 400px)",
                  }}
                />
              </div>

              {/* Main Polaroid - Direct responsive sizing */}
              <div className="relative z-20">
                <Polaroid
                  imageSrc={image.src}
                  caption={image.caption}
                  alt={`Gallery image ${image.id}`}
                  rotation={image.rotation}
                  className="shadow-xl"
                  style={{
                    width: "clamp(310px, 28vw, 380px)",
                  }}
                  imgStyle={{
                    height: "clamp(310px, 28vw, 400px)",
                  }}
                />

                {/* Decorative Element - Now properly positioned relative to polaroid */}
                {image.decorativeElement && (
                  <div
                    className="absolute z-30"
                    style={{
                      top: image.decorativeElement.position.top,
                      left: image.decorativeElement.position.left,
                      right: image.decorativeElement.position.right,
                      transform: `${
                        image.decorativeElement.position.translateX
                          ? `translateX(${image.decorativeElement.position.translateX}) `
                          : ""
                      }rotate(${image.decorativeElement.rotation}deg) scale(${
                        image.decorativeElement.type === "pin"
                          ? "clamp(0.7, 1vw, 1)"
                          : image.decorativeElement.type === "clip"
                          ? "clamp(0.6, 1vw, 1)"
                          : "clamp(0.5, 1vw, 1)" // tape
                      })`,
                    }}
                  >
                    <Image
                      src={image.decorativeElement.src}
                      alt={`${image.decorativeElement.type} decoration`}
                      width={image.decorativeElement.size.width}
                      height={image.decorativeElement.size.height}
                      className="object-contain"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons - Mobile responsive */}
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-6 justify-center sm:justify-start items-center">
          <button
            className=" bg-brown-two text-beige-two border-none px-6 md:px-8 py-3 rounded-full font-inconsolata font-medium cursor-pointer transition-all duration-300 hover:bg-brown-one min-w-[140px] responsive-border-radius-gallery"
            style={{
              fontSize: fontSizes.buttonText,
            }}
          >
            SEE MY WORK
          </button>

          <button
            className=" bg-transparent text-black border-black border px-6 md:px-8 py-3 rounded-full font-inconsolata font-medium cursor-pointer transition-all duration-300 hover:bg-brown-two hover:text-beige-one min-w-[140px] responsive-border-radius-gallery"
            style={{
              fontSize: fontSizes.buttonText,
            }}
          >
            GET IN TOUCH
          </button>
        </div>

        {/* Decorative Elements - Mobile responsive positioning */}
        <div className="hidden sm:block absolute bottom-20 left-[30%] w-16 h-16 sm:w-20 sm:h-20 opacity-100 z-10 rotate-4">
          <Image
            src="/heart.svg"
            alt="decorative heart"
            width={80}
            height={80}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Dots decoration - Responsive sizing and positioning */}
        <div
          className="absolute -top-10 sm:-top-20 right-0 w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] lg:w-[293px] lg:h-[297px] z-10 opacity-30 sm:opacity-100"
          style={{
            backgroundImage: "url('/dots-2-dark.svg')",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div
          className="hidden sm:block absolute top-1/2 left-0 w-[200px] h-[200px] lg:w-[293px] lg:h-[297px] z-10"
          style={{
            backgroundImage: "url('/dots-2-dark.svg')",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div
          className="hidden lg:block absolute top-1/2 left-1/2 w-[293px] h-[297px] z-10"
          style={{
            backgroundImage: "url('/dots.svg')",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>
    </section>
  );
};

export default Gallery;
