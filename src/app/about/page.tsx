import AboutHero from "@/components/about/AboutHero";
import AboutIntro from "@/components/about/AboutIntro";
import AboutApproach from "@/components/about/AboutApproach";
import AboutPassions from "@/components/about/AboutPassions";
import AboutRightFit from "@/components/about/AboutRightFit";
import AboutBanner from "@/components/about/AboutBanner";
import Footer from "@/components/shared/footer";
import { client } from "@/sanity/lib/client";
import { ABOUT_PAGE_QUERY, type AboutPageData } from "@/sanity/queries";

const options = { 
  next: { 
    revalidate: process.env.NODE_ENV === 'production' ? 1800 : 30 // 30 min in production, 30 sec in dev
  } 
};

export default async function AboutPage() {
  try {
    const data = await client.fetch<AboutPageData>(ABOUT_PAGE_QUERY, {}, options);
    
    return (
      <div className="w-screen relative">
        <AboutHero data={data?.aboutPage?.heroSection} />
        <AboutIntro data={data?.aboutPage?.introSection} />
        <AboutApproach data={data?.aboutPage?.approachSection} />
        <AboutPassions data={data?.aboutPage?.passionsSection} />
        <AboutRightFit data={data?.aboutPage?.rightFitSection} />
        <AboutBanner data={data?.aboutPage?.bannerSection} />
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('Error fetching About page data:', error);
    
    // Fallback to components without Sanity data
    return (
      <div className="w-screen relative">
        <AboutHero />
        <AboutIntro />
        <AboutApproach />
        <AboutPassions />
        <AboutRightFit />
        <AboutBanner />
        <Footer />
      </div>
    );
  }
}
