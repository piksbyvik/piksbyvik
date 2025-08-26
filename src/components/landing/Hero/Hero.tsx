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
    backgroundImageAlts: data.backgroundImages?.map(img => img.alt)
  } : undefined;

  return <HeroClient data={processedData} />;
}
