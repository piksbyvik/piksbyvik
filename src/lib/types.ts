// types.ts
export interface ProcessedCategory {
  title: string;
  imageUrl: string | null;
}

export interface ProcessedApproachTab {
  title?: string;
  description?: string[];
  image?: string | null; // Pre-resolved URL string
  ctaButtonText?: string;
  bottomQuote?: string;
  bottomQuoteBackground?: string | null; // Pre-resolved URL string
}

export interface ProcessedApproachSectionData {
  backgroundImage?: string | null; // Pre-resolved URL string
  whatICaptureTab?: {
    title?: string;
    quote?: string;
    ctaButtonText?: string;
    categories?: ProcessedCategory[];
  };
  myApproachTab?: ProcessedApproachTab;
}

export interface ProcessedAboutSectionData {
  heading?: string;
  description?: string[];
  ctaButtonText?: string;
  profileImageUrl?: string | null;
  polaroidCaption?: string;
}

export interface ProcessedTestimonial {
  id: number;
  text: string;
  author: string;
  imageUrl: string; // Pre-resolved URL string
}

export interface ProcessedTestimonialSectionData {
  title?: string;
  subtitle?: string;
  testimonials?: ProcessedTestimonial[];
}

export interface ProcessedHeroSectionData {
  typewriterText?: string;
  locationText?: string;
  backgroundImageUrls?: string[]; // Pre-resolved URL strings
  backgroundImageAlts?: string[];
}

export interface ProcessedInvestmentPackageItem {
  title: string;
  price: string;
  imageUrl: string | null;
  features: string[];
}

export interface ProcessedInvestmentPackagesData {
  sectionTitle: string;
  weddingPackages: ProcessedInvestmentPackageItem[];
  engagementPackage: ProcessedInvestmentPackageItem;
  lifestylePackages: ProcessedInvestmentPackageItem[];
  eventsPackage: ProcessedInvestmentPackageItem;
}

export interface ProcessedInvestmentHeroData {
  title: string;
  description: string;
  heroImages: {
    mainImageUrl: string | null;
    topSmallImageUrl: string | null;
    bottomSmallImageUrl: string | null;
  };
  quoteOverlay: {
    text: string;
    author: string;
  };
  propImageUrl: string | null;
}

export interface ProcessedInvestmentBannerData {
  text: string;
  backgroundImageUrl: string | null;
}


