"use client";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";

interface HeroBackgroundProps {
  backgroundImageUrls?: string[];
  backgroundImageAlts?: string[];
  backgroundImagePositions?: {
    desktop: string[];
    mobile: string[];
  };
}

const fallbackImages = ["/hero-1.webp"];
const grainImageUrl = "/grain.webp";

export function HeroBackground({
  backgroundImageUrls,
  backgroundImageAlts,
  backgroundImagePositions,
}: HeroBackgroundProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Memoize images to prevent recalculation
  const imagesToUse = useMemo(
    () => (backgroundImageUrls?.length ? backgroundImageUrls : fallbackImages),
    [backgroundImageUrls]
  );
  useEffect(() => {
    // Preload all images
    const preloadImages = async () => {
      const imagePromises = imagesToUse.map((src) => {
        return new Promise((resolve) => {
          const img = new window.Image();
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false);
          img.src = src;
        });
      });

      await Promise.all(imagePromises);
      setImagesLoaded(true);
    };

    preloadImages();
  }, [imagesToUse]);

  useEffect(() => {
    if (!imagesLoaded) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagesToUse.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [imagesLoaded, imagesToUse.length]);

  // Preload next image
  useEffect(() => {
    if (imagesLoaded && imagesToUse.length > 1) {
      const nextIndex = (currentImageIndex + 1) % imagesToUse.length;
      const img = new window.Image();
      img.src = imagesToUse[nextIndex];
    }
  }, [currentImageIndex, imagesToUse, imagesLoaded]);  return (
    <>
      {/* Background with absolute positioning */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <Image
          src={imagesToUse[currentImageIndex]}
          alt={
            backgroundImageAlts?.[currentImageIndex] ||
            "Vintage wedding photography"
          }
          fill
          priority
          className="object-cover"
          style={{
            objectPosition: backgroundImagePositions?.desktop?.[currentImageIndex] || 'center'
          }}
          sizes="100vw"
        />
        {/* Mobile overlay with different positioning */}
        <Image
          src={imagesToUse[currentImageIndex]}
          alt={
            backgroundImageAlts?.[currentImageIndex] ||
            "Vintage wedding photography"
          }
          fill
          priority
          className="object-cover md:hidden"
          style={{
            objectPosition: backgroundImagePositions?.mobile?.[currentImageIndex] || 'center'
          }}
          sizes="100vw"
        />
      </div>

      {/* Grain overlay - only render when images are loaded */}
      {imagesLoaded && (
        <>
          <div className="absolute inset-0 z-10 opacity-25 bg-black  pointer-events-none" />
         
        </>
      )}
    </>
  );
}
