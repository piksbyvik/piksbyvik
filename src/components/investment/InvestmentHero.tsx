
import { urlFor } from "@/sanity/lib/image";
import type { InvestmentHeroData } from "@/sanity/queries";
import React from "react";
import InvestmentHeroClient from "./InvestmentHeroClient";

interface InvestmentHeroProps {
  data?: InvestmentHeroData;
}

const InvestmentHero: React.FC<InvestmentHeroProps> = ({ data }) => {
  // Pre-resolve image URLs
  const processedData = data ? {
    title: data.title,
    description: data.description,
    heroImages: {
      mainImageUrl: data.heroImages?.mainImage ? urlFor(data.heroImages.mainImage.asset).url() : null,
      topSmallImageUrl: data.heroImages?.topSmallImage ? urlFor(data.heroImages.topSmallImage.asset).url() : null,
      bottomSmallImageUrl: data.heroImages?.bottomSmallImage ? urlFor(data.heroImages.bottomSmallImage.asset).url() : null,
    },
    quoteOverlay: data.quoteOverlay,
    propImageUrl: data.propImage ? urlFor(data.propImage.asset).url() : null,
  } : undefined;

  return <InvestmentHeroClient data={processedData} />;
};

export default InvestmentHero;
