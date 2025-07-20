"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

const backgroundImages = ["/hero-1.jpg", "/hero-2.jpg", "/hero-3.jpg"];
const grainImageUrl = "/grain.png"; // Local image instead of external URL

export function HeroBackground() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [grainLoaded, setGrainLoaded] = useState(false);

  useEffect(() => {
    const preloadImages = async () => {
      // Preload hero images AND grain image together
      const allImages = [...backgroundImages, grainImageUrl];

      const imagePromises = allImages.map((src) => {
        return new Promise((resolve, reject) => {
          const img = document.createElement("img");
          img.onload = resolve;
          img.onerror = reject;
          img.src = src;
        });
      });

      try {
        await Promise.all(imagePromises);
        setImagesLoaded(true);
        setGrainLoaded(true);
      } catch (error) {
        console.error("Error preloading images:", error);
        setImagesLoaded(true);
        setGrainLoaded(true);
      }
    };

    preloadImages();
  }, []);

  useEffect(() => {
    if (!imagesLoaded) return;

    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImages.length
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [imagesLoaded]);

  return (
    <>
      {/* Background with absolute positioning instead of fixed */}
      <div className="absolute inset-0 z-0 w-full h-full">
        {imagesLoaded ? (
          <Image
            src={backgroundImages[currentImageIndex]}
            alt="Vintage wedding photography"
            fill
            priority
            className="object-cover"
            style={{ filter: "brightness(0.6) contrast(1.1) saturate(0.9)" }}
          />
        ) : (
          <Image
            src={backgroundImages[0]}
            alt="Vintage wedding photography"
            fill
            priority
            className="object-cover"
            style={{ filter: "brightness(0.6) contrast(1.1) saturate(0.9)" }}
          />
        )}
      </div>

      {/* Hidden preload images */}
      <div className="hidden">
        {backgroundImages.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt=""
            width={1}
            height={1}
            priority={index < 3}
          />
        ))}
        <Image
          src={grainImageUrl}
          alt=""
          width={1}
          height={1}
          priority
        />
      </div>

      {/* Grain overlay - absolute instead of fixed */}
      {grainLoaded && (
        <div
          className="absolute inset-0 z-10 opacity-45 mix-blend-multiply"
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

