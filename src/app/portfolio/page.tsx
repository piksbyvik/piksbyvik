
import PortfolioGallery from "@/components/portfolio/PortfolioGallery";
import { client } from "@/sanity/lib/client";
import { PORTFOLIO_PAGE_QUERY, type PortfolioPageData } from "@/sanity/queries";

const options = { 
  next: { 
    revalidate: process.env.NODE_ENV === 'production' ? 3600 : 60 // 1 hour in production, 1 min in dev
  } 
};

export default async function Portfolio() {
  try {
    const data = await client.fetch<PortfolioPageData>(PORTFOLIO_PAGE_QUERY, {}, options);
    
    return (
      <div className="w-screen relative">
        <PortfolioGallery data={data?.portfolioGallery} />
      </div>
    );
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    
    // Fallback to component without Sanity data
    return (
      <div className="w-screen relative">
        <PortfolioGallery />
      </div>
    );
  }
}


