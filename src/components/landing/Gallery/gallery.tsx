import { urlFor } from "@/sanity/lib/image";
import type { GallerySectionData } from "@/sanity/queries";
import { fontSizes } from "@/styles/typography";
import Image from "next/image";
import React from "react";
import Polaroid from "../../ui/Polaroid";
import Link from "next/link";

// Fallback gallery data
const fallbackGalleryImages = [
  {
    id: 1,
    src: "/gallery-4.png",
    caption: "Jennifer & Anthony's Wedding",
    link: "https://piksbyvik.passgallery.com/-piksbyvikfilmphotography/gallery",
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
    link: "https://piksbyvik.passgallery.com/-piksbyvikfilmphotography/gallery",
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
    src: "/gallery-4.png",
    caption: "Emily & Ryan's Wedding",
    link: "https://piksbyvik.passgallery.com/-piksbyvikfilmphotography/gallery",
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
    src: "/gallery-4.png",
    caption: "Amaris & Anthony's Wedding",
    link: "https://piksbyvik.passgallery.com/-piksbyvikfilmphotography/gallery",
    rotation: 3,
    shadowRotation: 8,
    decorativeElement: {
      type: "tape",
      src: "/tape-2.svg",
      position: { top: "-30px", left: "40%", translateX: "-50%" },
      rotation: 8,
      size: { width: 132, height: 77 },
    },
  },
  {
    id: 5,
    src: "/gallery-4.png",
    caption: "The Nguyen Maternity Session",
    link: "https://piksbyvik.passgallery.com/-piksbyvikfilmphotography/gallery",
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
    src: "/gallery-4.png",
    caption: "Amy's Maternity Session",
    link: "https://piksbyvik.passgallery.com/-piksbyvikfilmphotography/gallery",
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

interface GalleryProps {
  data?: GallerySectionData;
}

const Gallery: React.FC<GalleryProps> = ({ data }) => {
  // Use Sanity data if available, otherwise fallback
  const backgroundImage = data?.backgroundImage
    ? urlFor(data.backgroundImage.asset).url()
    : "/gallery-bg.webp";

  const galleryItems =
    data?.galleryItems?.map((item, index) => ({
      id: index + 1,
      src: urlFor(item.image.asset).url(),
      caption: item.caption,
      link: item.link,
      rotation:
        fallbackGalleryImages[index]?.rotation || (index % 2 === 0 ? -2 : 2),
      shadowRotation:
        fallbackGalleryImages[index]?.shadowRotation ||
        (index % 2 === 0 ? -6 : 6),
      decorativeElement: fallbackGalleryImages[index]?.decorativeElement,
    })) || fallbackGalleryImages;

  return (
    <section
      className="relative w-screen bg-beige-one min-h-screen py-8 md:py-16 lg:py-24 overflow-hidden"
      style={{
        backgroundImage: `url('${backgroundImage}')`,
        backgroundPosition: "center",
        backgroundRepeat: "repeat",
      }}
    >
      <div className="w-full relative z-20 px-[5vw] lg:px-[3.5vw]">
        {/* Section Header */}
        <div className="text-left relative mb-8 md:mb-12 lg:mb-20">
          <div className="flex items-start sm:items-center gap-2 sm:gap-6">
            <h2
              className="font-travel-november text-brown-one mb-4 sm:mb-6 relative inline-block gallery-underline"
              style={{ fontSize: fontSizes.galleryTitle }}
            >
              {data?.title || "Featured Galleries"}
            </h2>
            <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 opacity-80 mb-4 sm:mb-6 rotate-12">
              <Image
                src="/heart-dark.svg"
                alt="Decorative heart"
                width={40}
                height={40}
              />
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-24 md:gap-x-16 sm:gap-y-16 lg:gap-y-32 mt-10 mb-12 sm:mb-16 lg:mb-32 z-20">
          {galleryItems.map((image) => {
            // If there's a link, use an anchor tag, otherwise use a div
            const Component = image.link ? 'a' : 'div';
            const linkProps = image.link ? {
              href: image.link,
              target: '_blank',
              rel: 'noopener noreferrer',
              'aria-label': `View ${image.caption} gallery`
            } : {};

            return (
              <Component
                key={image.id}
                className={`relative flex justify-center items-center min-h-[300px] sm:min-h-[350px] lg:min-h-[420px] group`}
                {...linkProps}
              >
                

                {/* Background Polaroid - Direct responsive sizing */}
                <div className="absolute z-0 translate-x-1 translate-y-1 sm:translate-x-2 sm:translate-y-2 transition-transform duration-300 group-hover:translate-x-2 group-hover:translate-y-2">
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
                <div className="relative z-20 transition-transform duration-300 group-hover:scale-[1.01]">
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

                  {/* Decorative Element */}
                  {image.decorativeElement && (
                    <div
                      className="absolute z-30 scale-[0.8] md:scale-[1] transition-transform duration-300"
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
              </Component>
            );
          })}
        </div>

        {/* Action Buttons - Mobile responsive */}
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-6 justify-center sm:justify-start items-center">
          <>
            <Link
              href="/portfolio"
              className="bg-brown-two text-beige-two border-none px-6 md:px-8 py-3 text-center font-inconsolata font-medium cursor-pointer transition-all duration-300 hover:bg-brown-one min-w-[140px] rounded-[50%]"
              style={{
                fontSize: fontSizes.buttonText,
              }}
            >
              SEE MY WORK
            </Link>
            <Link
              href="/contact"
              className="bg-transparent text-black border-black border px-6 md:px-8 py-3 text-center font-inconsolata font-medium cursor-pointer transition-all duration-300 hover:bg-brown-two hover:text-beige-one min-w-[140px] rounded-[50%]"
              style={{
                fontSize: fontSizes.buttonText,
              }}
            >
              GET IN TOUCH
            </Link>
          </>
        </div>

        {/* Decorative Elements - Mobile responsive positioning */}
        <div className="hidden sm:block absolute bottom-0 left-[25%] w-16 h-16 sm:w-20 sm:h-20 opacity-100 z-10 rotate-8 scale-80">
          <Image
            src="/heart-dark.svg"
            alt="Decorative heart"
            width={40}
            height={40}
          />
        </div>

        {/* Dots decoration - Responsive sizing and positioning */}
        <div className="absolute top-0 -right-20 sm:-top-20 md:-right-15 z-10 opacity-60 md:opacity-80">
          <Image
            src="/dots-dark.svg"
            alt="Decorative dots"
            width={390}
            height={340}
          />
        </div>
        <div className="absolute top-[60%] -left-10 z-0 opacity-80">
          <Image
            src="/dots-dark.svg"
            alt="Decorative dots"
            width={390}
            height={340}
          />
        </div>
        <div className="absolute -left-10 z-0 opacity-60">
          <Image
            src="/dots-dark.svg"
            alt="Decorative dots"
            width={300}
            height={300}
          />
        </div>
        <div className="absolute bottom-[12%] right-0 md:top-[40%] md:left-1/2 z-10 opacity-70">
          <Image
            src="/dots-dark.svg"
            alt="Decorative dots"
            width={390}
            height={340}
          />
        </div>
      </div>
    </section>
  );
};

export default Gallery;
