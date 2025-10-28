"use client";
import React, { useState } from "react";
import Image from "next/image";

interface ImageWithFallbackProps {
  // Pre-resolved URL string only - NO Sanity objects
  src?: string | null;
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
  // Image object-position style
  objectPosition?: string;
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
 * ImageWithFallback - For pre-resolved URLs only
 * 
 * DO NOT USE for:
 * - Sanity image objects (resolve URLs in server components first)
 * - Public folder assets (use Next.js Image directly)
 * 
 * USE ONLY for:
 * - Pre-resolved Sanity URLs from server components
 * - External URLs that might fail
 * - Dynamic content URLs
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
  objectPosition,
  quality = 100,
}) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // If no valid image URL or error occurred, show fallback
  if (!src || (typeof src === 'string' && !src.trim()) || imageError) {
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
    src,
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
    ...(objectPosition && { style: { objectPosition } }),
  };

  return <Image {...imageProps} />;
};

export default ImageWithFallback;
