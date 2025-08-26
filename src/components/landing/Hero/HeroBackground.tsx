"use client";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";

interface HeroBackgroundProps {
  backgroundImageUrls?: string[];
  backgroundImageAlts?: string[];
}

const fallbackImages = ["/hero-1.webp"];
const grainImageUrl = "/grain.webp";

export function HeroBackground({ backgroundImageUrls, backgroundImageAlts }: HeroBackgroundProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Memoize images to prevent recalculation
  const imagesToUse = useMemo(() => 
    backgroundImageUrls?.length ? backgroundImageUrls : fallbackImages,
    [backgroundImageUrls]
  );

  useEffect(() => {
    // Only preload first image for faster initial render
    const preloadFirstImage = () => {
      const img = new window.Image();
      img.onload = () => setImagesLoaded(true);
      img.onerror = () => setImagesLoaded(true);
      img.src = imagesToUse[0];
    };

    preloadFirstImage();
  }, [imagesToUse]);

  useEffect(() => {
    if (!imagesLoaded) return;

    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % imagesToUse.length
      );
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
  }, [currentImageIndex, imagesToUse, imagesLoaded]);

  return (
    <>
      {/* Background with absolute positioning */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <Image
          src={imagesToUse[currentImageIndex]}
          alt={backgroundImageAlts?.[currentImageIndex] || "Vintage wedding photography"}
          fill
          priority
          className="object-cover"
          sizes="100vw"
          style={{ filter: "brightness(0.6) contrast(1.1) saturate(0.9)" }}
        />
      </div>

      {/* Grain overlay - only render when images are loaded */}
      {imagesLoaded && (
        <div
          className="absolute inset-0 z-10 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `url(${grainImageUrl})`,
            backgroundRepeat: "repeat",
          }}
        />
      )}
    </>
  );
}



