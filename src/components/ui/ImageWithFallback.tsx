"use client";
import React, { useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface SanityImageAsset {
  asset: {
    url: string;
    _id?: string;
  };
}

interface ImageWithFallbackProps {
  // Sanity image object or external URL string - NOT for public folder assets
  src?: SanityImageAsset | string | null;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  priority?: boolean;
  // Custom fallback component
  fallback?: React.ReactNode;
  // Loading placeholder component
  loadingComponent?: React.ReactNode;
  // Sizes for responsive images
  sizes?: string;
  // Image object-fit style
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  // Quality setting
  quality?: number;
}

const defaultBlurDataURL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTk4yB0xXzXalGVZk8vr0w/8QAGhAAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAgBAQABPxDbGkjIooBx8fqNxWOVKO0OiPR5b/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAgBAgEBPwDbGkjIooBx8fqNxWOVKO0OiPR5b/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAgBAwEBPwDbGkjIooBx8fqNxWOVKO0OiPR5b//Z";

// Default fallback component - elegant placeholder
const DefaultFallback: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse flex items-center justify-center ${className}`}>
    <div className="w-8 h-8 bg-gray-300 rounded-full opacity-50"></div>
  </div>
);

// Loading component
const DefaultLoading: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`bg-gradient-to-br from-beige-one to-gray-200 animate-pulse flex items-center justify-center ${className}`}>
    <div className="w-6 h-6 bg-brown-one bg-opacity-30 rounded-full animate-pulse"></div>
  </div>
);

/**
 * ImageWithFallback - For Sanity CMS images and external URLs only
 * 
 * DO NOT USE for public folder assets like:
 * - Icons (/camera.svg, /pin.svg, etc.)
 * - Static images (/grain.png, /reel.webp, etc.)
 * - Decorative elements
 * 
 * USE ONLY for:
 * - Sanity image objects from CMS
 * - External URLs that might fail
 * - Dynamic content images
 */
export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  width,
  height,
  fill = false,
  className = "",
  placeholder = "blur",
  blurDataURL = defaultBlurDataURL,
  priority = false,
  fallback,
  loadingComponent,
  sizes,
  objectFit = "cover",
  quality = 75,
}) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Get the actual image URL
  const getImageUrl = (): string | null => {
    if (!src) return null;
    
    // Handle Sanity image objects
    if (typeof src === "object" && "asset" in src && src.asset?.url) {
      return urlFor(src.asset).url();
    }
    
    // Handle direct URL strings (external URLs, not public folder paths)
    if (typeof src === "string" && src.trim()) {
      return src;
    }
    
    return null;
  };

  const imageUrl = getImageUrl();

  // If no valid image URL or error occurred, show fallback
  if (!imageUrl || imageError) {
    return (
      fallback || (
        <DefaultFallback 
          className={fill ? "w-full h-full" : `w-[${width}px] h-[${height}px]`} 
        />
      )
    );
  }

  // Show loading state
  if (isLoading && loadingComponent) {
    return loadingComponent;
  }

  const imageProps = {
    src: imageUrl,
    alt,
    className: `${className} ${objectFit === 'cover' ? 'object-cover' : objectFit === 'contain' ? 'object-contain' : `object-${objectFit}`}`,
    onError: () => setImageError(true),
    onLoad: () => setIsLoading(false),
    placeholder,
    blurDataURL,
    priority,
    quality,
    ...(sizes && { sizes }),
    ...(fill ? { fill: true } : { width, height }),
  };

  return <Image {...imageProps} />;
};

export default ImageWithFallback;
