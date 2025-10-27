import { urlFor } from "@/sanity/lib/image";
import type { HeroSectionData } from "@/sanity/queries";
import type { ProcessedHeroSectionData } from "@/lib/types";
import HeroClient from "./HeroClient";

interface HeroProps {
  data?: HeroSectionData;
}

export default function Hero({ data }: HeroProps) {
  // Pre-resolve image URLs
  const processedData: ProcessedHeroSectionData | undefined = data ? {
    typewriterText: data.typewriterText,
    locationText: data.locationText,
    backgroundImageUrls: data.backgroundImages?.map(img => urlFor(img.asset).url()),
    backgroundImageAlts: data.backgroundImages?.map(img => img.alt),
    // Add default positioning values for each image - customize these as needed
    backgroundImagePositions: {
      desktop: data.backgroundImages?.map((img, index) => {
        // Desktop positioning - customize for each image
        const positions = ["center", "center", "center", "50% 15%", "50% 80%"];
        return positions[index] || "center";
      }) || [],
      mobile: data.backgroundImages?.map((img, index) => {
        // Mobile positioning - often need different crops for portrait orientation
        const positions = ["53% 50%", "center top", "70% 50%", "35% 50%", "45% center"];
        return positions[index] || "center";
      }) || []
    }
  } : undefined;

  return <HeroClient data={processedData} />;
}
