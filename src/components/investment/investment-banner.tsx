import { urlFor } from "@/sanity/lib/image";
import type { InvestmentBannerData } from "@/sanity/queries";
import React from "react";
import InvestmentBannerClient from "./InvestmentBannerClient";

interface InvestmentBannerProps {
  data?: InvestmentBannerData;
}

const InvestmentBanner: React.FC<InvestmentBannerProps> = ({ data }) => {
  // Pre-resolve image URL
  const processedData = data ? {
    text: data.text,
    backgroundImageUrl: data.backgroundImage ? urlFor(data.backgroundImage.asset).url() : null,
  } : undefined;

  return <InvestmentBannerClient data={processedData} />;
};

export default InvestmentBanner;
