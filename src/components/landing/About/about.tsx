import { urlFor } from "@/sanity/lib/image";
import type { AboutSectionData } from "@/sanity/queries";
import type { ProcessedAboutSectionData } from "@/lib/types";
import AboutClient from "./AboutClient";

interface AboutProps {
  data?: AboutSectionData;
}

const About: React.FC<AboutProps> = ({ data }) => {
  // Pre-resolve image URLs
  const processedData: ProcessedAboutSectionData | undefined = data ? {
    heading: data.heading,
    description: data.description,
    ctaButtonText: data.ctaButtonText,
    profileImageUrl: data.profileImage ? urlFor(data.profileImage.asset).url() : null,
    polaroidCaption: data.polaroidCaption
  } : undefined;

  return <AboutClient data={processedData} />;
};

export default About;
