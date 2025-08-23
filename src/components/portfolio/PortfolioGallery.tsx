"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import { PortfolioGalleryData } from "@/sanity/queries";

interface PortfolioGalleryProps {
  data?: PortfolioGalleryData;
}

const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<"weddings" | "lifestyle">("weddings");
  const galleryRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);

  const { contextSafe } = useGSAP({ scope: galleryRef });

  // Fallback data
  const fallbackData = {
    title: "PORTFOLIO",
    weddingImages: [],
    lifestyleImages: [],
  };

  const content = data || fallbackData;

  const animateGalleryIn = contextSafe(() => {
    const images = galleryRef.current?.querySelectorAll("[data-gallery-image]");
    if (images && images.length > 0) {
      gsap.fromTo(
        images,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: "power2.out",
        }
      );
    }
  });

  const animateGalleryOut = contextSafe(() => {
    return new Promise<void>((resolve) => {
      const images = galleryRef.current?.querySelectorAll(
        "[data-gallery-image]"
      );
      if (images && images.length > 0) {
        gsap.to(images, {
          opacity: 0,
          y: -20,
          scale: 0.95,
          duration: 0.3,
          stagger: 0.02,
          ease: "power2.in",
          onComplete: resolve,
        });
      } else {
        resolve();
      }
    });
  });

  const handleTabClick = contextSafe(async (tab: "weddings" | "lifestyle") => {
    if (isAnimatingRef.current || tab === activeTab) return;

    isAnimatingRef.current = true;
    await animateGalleryOut();
    setActiveTab(tab);
    isAnimatingRef.current = false;
  });

  useGSAP(
    () => {
      if (!isAnimatingRef.current) {
        setTimeout(() => animateGalleryIn(), 50);
      }
    },
    { scope: galleryRef, dependencies: [activeTab] }
  );

  const currentImages = activeTab === "weddings" ? content.weddingImages : content.lifestyleImages;

  return (
    <section className="relative min-h-screen bg-beige-one pt-19 md:pt-25">
      {/* Simple Header Navigation */}
      <div className="relative z-10 w-full border-b border-black">
        <div className="w-full flex">
          {/* Weddings Tab */}
          <div
            className="w-1/2 flex justify-center items-center py-4 cursor-pointer bg-blue"
            onClick={() => handleTabClick("weddings")}
          >
            <h2
              className={cn(
                "font-instrument-serif text-3xl md:text-4xl lg:text-5xl text-black",
                activeTab === "weddings" ? "opacity-100" : "opacity-80"
              )}
              style={{
                fontWeight: 500,
                letterSpacing: "0.02em",
              }}
            >
              WEDDINGS
            </h2>
          </div>

          {/* Lifestyle Tab */}
          <div
            className="w-1/2 flex justify-center items-center py-4 cursor-pointer bg-brown-one"
            onClick={() => handleTabClick("lifestyle")}
          >
            <h2
              className={cn(
                "font-instrument-serif text-3xl md:text-4xl lg:text-5xl text-beige-one",
                activeTab === "lifestyle" ? "opacity-100" : "opacity-80"
              )}
              style={{
                fontWeight: 500,
                letterSpacing: "0.02em",
              }}
            >
              LIFESTYLE
            </h2>
          </div>
        </div>
      </div>

      {/* Masonry Gallery */}
      <div
        ref={galleryRef}
        className="relative z-10 px-[3vw] lg:px-[2vw] py-8 md:py-12"
      >
        <div
          className="absolute inset-0 z-0 opacity-12 pointer-events-none"
          style={{
            backgroundImage: "url('/grain.png')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        />
        {currentImages && currentImages.length > 0 ? (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6">
            {currentImages.map((item, index) => {
              const imageUrl = item?.image?.asset?.url;
              const alt = item?.alt || `${activeTab} photo ${index + 1}`;
              const caption = item?.caption;
              const imageId = item?.image?.asset?._id;

              if (!imageUrl) {
                return null;
              }

              return (
                <div
                  key={imageId || index}
                  data-gallery-image
                  className="break-inside-avoid block w-full group cursor-pointer mb-4 md:mb-6"
                >
                  <div className="relative w-full overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]">
                    <Image
                      src={imageUrl}
                      alt={alt}
                      width={item.image.asset.dimensions?.width || 400}
                      height={item.image.asset.dimensions?.height || 600}
                      className="w-full h-auto object-cover"
                      placeholder="blur"
                      blurDataURL={
                        item.image.asset.lqip ||
                        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTk4yB0xXzXalGVZk8vr0w/8QAGhAAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAgBAQABPxDbGkjIooBx8fqNxWOVKO0OiPR5b/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAgBAgEBPwDbGkjIooBx8fqNxWOVKO0OiPR5b/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAgBAwEBPwDbGkjIooBx8fqNxWOVKO0OiPR5b//Z"
                      }
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      
                      priority={index < 6}
                    />
                  </div>

                  {caption && (
                    <p className="font-inconsolata text-brown-one text-sm mt-2 opacity-70">
                      {caption}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          // Empty state with placeholders - 3 columns
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6">
            {Array.from({ length: 9 }).map((_, index) => (
              <div
                key={index}
                className="break-inside-avoid block w-full"
                style={{ height: `${200 + (index % 3) * 100}px` }}
              >
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse flex items-center justify-center">
                  <div className="w-12 h-12 bg-gray-400 rounded-full animate-pulse opacity-50"></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PortfolioGallery;
