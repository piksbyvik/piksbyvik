import { urlFor } from "@/sanity/lib/image";
import type { InvestmentPackagesData } from "@/sanity/queries";
import InvestmentPackagesClient from "./InvestmentPackagesClient";

interface InvestmentPackagesProps {
  data?: InvestmentPackagesData;
}

const InvestmentPackages: React.FC<InvestmentPackagesProps> = ({ data }) => {
  // Pre-resolve image URLs with better null checking
  const processedData = data ? {
    sectionTitle: data.sectionTitle || "EXPLORE INVESTMENT",
    weddingPackages: data.weddingPackages?.map(pkg => ({
      title: pkg.title || "",
      price: pkg.price || "",
      imageUrl: pkg.image ? urlFor(pkg.image.asset).url() : null,
      imagePosition: pkg.imagePosition || undefined,
      features: pkg.features || [],
    })) || [],
    engagementPackage: data.engagementPackage ? {
      title: data.engagementPackage.title || "",
      price: data.engagementPackage.price || "",
      imageUrl: data.engagementPackage.image ? urlFor(data.engagementPackage.image.asset).url() : null,
      imagePosition: data.engagementPackage.imagePosition || undefined,
      features: data.engagementPackage.features || [],
    } : {
      title: "",
      price: "",
      imageUrl: null,
      features: [],
    },
    lifestylePackages: data.lifestylePackages?.map(pkg => ({
      title: pkg.title || "",
      price: pkg.price || "",
      imageUrl: pkg.image ? urlFor(pkg.image.asset).url() : null,
      imagePosition: pkg.imagePosition || undefined,
      features: pkg.features || [],
    })) || [],
    eventsPackage: data.eventsPackage ? {
      title: data.eventsPackage.title || "",
      price: data.eventsPackage.price || "",
      imageUrl: data.eventsPackage.image ? urlFor(data.eventsPackage.image.asset).url() : null,
      imagePosition: data.eventsPackage.imagePosition || undefined,
      features: data.eventsPackage.features || [],
    } : {
      title: "",
      price: "",
      imageUrl: null,
      features: [],
    },
  } : undefined;

  return <InvestmentPackagesClient data={processedData} />;
};

export default InvestmentPackages;
