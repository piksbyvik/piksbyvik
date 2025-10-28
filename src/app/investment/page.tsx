import InvestmentBanner from "@/components/investment/investment-banner";
import InvestmentHero from "@/components/investment/InvestmentHero";
import InvestmentPackages from "@/components/investment/InvestmentPackages";
import InvestmentValueProps from "@/components/investment/InvestmentValueProps";
import NextSteps2 from "@/components/investment/next-steps-2";
import Footer from "@/components/shared/footer";
import Testimonial from "@/components/testimonials/testimonial";
import { client } from "@/sanity/lib/client";
import {
  INVESTMENT_PAGE_QUERY,
  type InvestmentPageData,
} from "@/sanity/queries";

// This automatically detects the environment
const options = {
  next: {
    revalidate: 0, // Disable cache temporarily to see changes immediately
  },
};

export default async function Investment() {
  try {
    const data = await client.fetch<InvestmentPageData>(
      INVESTMENT_PAGE_QUERY,
      {},
      options
    );

    return (
      <div className="w-screen relative">
        <InvestmentHero data={data?.investmentHero} />
        <InvestmentValueProps data={data?.investmentValueProps} />

        <Testimonial
          data={data?.testimonialSection}
          bgColor="#D0DDEA"
          textColor="#403528"
          accentColor="#403528"
          borderColor="#403528"
          headerColor="#403528"
          buttonColor="#403528"
          imgBg="#1e1e1e"
          imgBorder="#F3EADB"
        />
        <InvestmentPackages data={data?.investmentPackages} />
        <NextSteps2 data={data?.investmentNextSteps} />
        <Footer />
      </div>
    );
  } catch (error) {
    console.error("Error fetching Sanity data:", error);

    // Fallback to components without Sanity data
    return (
      <div className="w-screen relative">
        <InvestmentHero />
        <InvestmentValueProps />
        <InvestmentBanner />
        <Testimonial
          bgColor="#D0DDEA"
          textColor="#403528"
          accentColor="#403528"
          borderColor="#403528"
          headerColor="#403528"
          buttonColor="#403528"
          imgBg="#1e1e1e"
          imgBorder="#F3EADB"
        />
        <InvestmentPackages />
        <NextSteps2 />
        <Footer />
      </div>
    );
  }
}
