"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, cubicBezier } from "motion/react";
import { cn } from "@/lib/utils";
import { PortfolioGalleryData } from "@/sanity/queries";
import { useSearchParams } from "next/navigation";

interface PortfolioGalleryProps {
  data?: PortfolioGalleryData;
}

const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({ data }) => {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  
  const [activeTab, setActiveTab] = useState<"weddings" | "lifestyle">(
    (tabParam === 'lifestyle' || tabParam === 'weddings') ? tabParam : "weddings"
  );

  // Update active tab when URL parameter changes
  useEffect(() => {
    if (tabParam === 'lifestyle' || tabParam === 'weddings') {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  // Fallback data
  const fallbackData = {
    title: "PORTFOLIO",
    weddingImages: [],
    lifestyleImages: [],
  };
  const content = data || fallbackData;

  const handleTabClick = (tab: "weddings" | "lifestyle") => {
    if (tab === activeTab) return;
    setActiveTab(tab);
  };

  const currentImages =
    activeTab === "weddings" ? content.weddingImages : content.lifestyleImages;

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: cubicBezier(0.25, 0.46, 0.45, 0.94),
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: cubicBezier(0.25, 0.46, 0.45, 0.94),
      },
    },
  };

  return (
    <section className="relative min-h-screen bg-beige-one pt-19 md:pt-25">      {/* Simple Header Navigation */}
      <div className="relative z-10 w-full border-b border-black">
        <div className="w-full flex">
          {/* Weddings Tab */}
          <button
            className="w-1/2 flex justify-center items-center py-4 cursor-pointer bg-blue touch-manipulation active:scale-[0.98]"
            onTouchStart={() => handleTabClick("weddings")}
            onClick={() => handleTabClick("weddings")}
            type="button"
            aria-label="View weddings gallery"
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
          </button>

          {/* Lifestyle Tab */}
          <button
            className="w-1/2 flex justify-center items-center py-4 cursor-pointer bg-brown-one touch-manipulation active:scale-[0.98]"
            onTouchStart={() => handleTabClick("lifestyle")}
            onClick={() => handleTabClick("lifestyle")}
            type="button"
            aria-label="View lifestyle gallery"
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
          </button>
        </div>
      </div>

      {/* Masonry Gallery */}
      <div className="relative z-10 px-[3vw] lg:px-[2vw] py-8 md:py-12">
        <div
          className="absolute inset-0 z-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: "url('/grain.webp')",

            backgroundRepeat: "repeat",
          }}
        />

        <AnimatePresence mode="wait">
          {currentImages && currentImages.length > 0 ? (
            <motion.div
              key={activeTab}
              className="columns-1 md:columns-2 z-10 lg:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {currentImages.map((item, index) => {
                const imageUrl = item?.image?.asset?.url;
                const alt = item?.alt || `${activeTab} photo ${index + 1}`;
                const caption = item?.caption;
                const imageId = item?.image?.asset?._id;

                if (!imageUrl) {
                  return null;
                }

                return (
                  <motion.div
                    key={imageId || index}
                    className="break-inside-avoid z-20 block w-full cursor-pointer mb-4 md:mb-6"
                    variants={imageVariants}
                  >
                    <div className="relative w-full overflow-hidden">
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
                        priority={index < 3}
                      />
                    </div>

                    {caption && (
                      <p className="font-inconsolata text-brown-one text-sm mt-2 opacity-70">
                        {caption}
                      </p>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            // Empty state with placeholders - 3 columns
            <motion.div
              key={`${activeTab}-empty`}
              className="columns-1 md:columns-2 lg:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {Array.from({ length: 9 }).map((_, index) => (
                <motion.div
                  key={index}
                  className="break-inside-avoid block w-full"
                  style={{ height: `${200 + (index % 3) * 100}px` }}
                  variants={imageVariants}
                >
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse flex items-center justify-center">
                    <div className="w-12 h-12 bg-gray-400 rounded-full animate-pulse opacity-50"></div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PortfolioGallery;
