"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { urlFor } from "@/sanity/lib/image";

interface HeroBackgroundProps {
  backgroundImages?: Array<{
    asset: {
      _id: string;
      url: string;
    };
    alt: string;
  }>;
}

const fallbackImages = ["/hero-1.jpg", "/hero-2.jpg", "/hero-3.jpg"];
const grainImageUrl = "/grain.png";

export function HeroBackground({ backgroundImages }: HeroBackgroundProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);

  // Use Sanity images if available, otherwise fallback to static images
  const imagesToUse = backgroundImages?.length
    ? backgroundImages.map((img) => urlFor(img.asset).url())
    : fallbackImages;

  useEffect(() => {
    const preloadImages = async () => {
      const allImages = [...imagesToUse, grainImageUrl];

      const imagePromises = allImages.map((src) => {
        return new Promise<void>((resolve, reject) => {
          const img = new window.Image();
          img.onload = () => resolve();
          img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
          img.src = src;
        });
      });

      try {
        await Promise.all(imagePromises);
        setAllImagesLoaded(true);
      } catch (error) {
        console.error("Error preloading images:", error);
        setAllImagesLoaded(true);
      }
    };

    preloadImages();
  }, [imagesToUse]);

  useEffect(() => {
    if (!allImagesLoaded) return;

    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % imagesToUse.length
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [allImagesLoaded, imagesToUse.length]);

  return (
    <>
      {/* Background with absolute positioning */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <Image
          src={imagesToUse[currentImageIndex]}
          alt={backgroundImages?.[currentImageIndex]?.alt || "Vintage wedding photography"}
          fill
          priority
          className="object-cover"
          style={{ filter: "brightness(0.6) contrast(1.1) saturate(0.9)" }}
        />
      </div>

      {/* Grain overlay */}
      {allImagesLoaded && (
        <div
          className="absolute inset-0 z-10 opacity-18 pointer-events-none"
          style={{
            backgroundImage: `url(${grainImageUrl})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        />
      )}
    </>
  );
}



