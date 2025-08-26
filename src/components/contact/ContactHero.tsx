import React from "react";
import { fontSizes } from "@/styles/typography";
import { urlFor } from "@/sanity/lib/image";
import type { ContactPageHeroData } from "@/sanity/queries";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

interface ContactHeroProps {
  data?: ContactPageHeroData;
}

const ContactHero: React.FC<ContactHeroProps> = ({ data }) => {
  // Helper function to resolve image URLs
  const getImageUrl = (image: { asset: { _id: string; url: string; } } | undefined): string | null => {
    if (!image?.asset) return null;
    return urlFor(image.asset).url();
  };

  const heroText = data?.text || "GET IN TOUCH";

  return (
    <section className="relative w-screen h-screen overflow-hidden pb-5">
      {/* Background Image with fallback */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src={getImageUrl(data?.backgroundImage)}
          alt="Contact background"
          fill
          className="object-cover"
          priority
          fallback={
            <div className="w-full h-full bg-gradient-to-br from-brown-one to-beige-one">
              <div className="w-full h-full bg-gray-200 bg-opacity-30 backdrop-blur-sm"></div>
            </div>
          }
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-end justify-center">
        <h1
          className="font-instrument-serif text-beige-two text-center uppercase"
          style={{ fontSize: fontSizes.galleryTitle }}
        >
          {heroText}
        </h1>
      </div>

      {/* Grain overlay */}
      <div
        className="absolute inset-0 z-15 opacity-25 pointer-events-none"
        style={{
          backgroundImage: "url('/grain.webp')",
          backgroundRepeat: "repeat",
        }}
      />
    </section>
  );
};

export default ContactHero;
