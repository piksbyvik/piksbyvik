// Landing Page Queries - Optimized for performance
export const LANDING_PAGE_QUERY = `{
  "heroSection": *[_type == "heroSection"][0]{
    typewriterText,
    locationText,
    backgroundImages[0...3] {
      asset->{
        _id,
        url
      },
      alt
    }
  },
  "approachSection": *[_type == "approachSection"][0]{
    backgroundImage {
      asset->{
        _id,
        url
      }
    },
    whatICaptureTab {
      title,
      quote,
      ctaButtonText,
      categories[0...3] {
        title,
        image {
          asset->{
            _id,
            url
          }
        }
      }
    },
    myApproachTab {
      title,
      description[0...3],
      image {
        asset->{
          _id,
          url
        }
      },
      bottomQuote,
      bottomQuoteBackground {
        asset->{
          _id,
          url
        }
      }
    }
  },
  "aboutSection": *[_type == "aboutSection"][0]{
    heading,
    description[0...3],
    profileImage {
      asset->{
        _id,
        url
      }
    },
    polaroidCaption,
    decorativeImage {
      asset->{
        _id,
        url
      }
    }
  },
  "gallerySection": *[_type == "gallerySection"][0]{
    backgroundImage {
      asset->{
        _id,
        url
      }
    },
    title,
    galleryItems[0...6] {
      image {
        asset->{
          _id,
          url
        }
      },
      caption
    }
  },
  "testimonialSection": *[_type == "testimonial"][0]{
    title,
    subtitle,
    testimonials[0...3] {
      text,
      author,
      image {
        asset->{
          _id,
          url
        }
      }
    }
  },
  "bookingSection": *[_type == "bookingSection"][0]{
    title
  }
}`

// Investment Page Query
export const INVESTMENT_PAGE_QUERY = `{
  "investmentHero": *[_type == "investmentHero"][0]{
    title,
    description,
    heroImages {
      mainImage {
        asset->{
          _id,
          url
        }
      },
      topSmallImage {
        asset->{
          _id,
          url
        }
      },
      bottomSmallImage {
        asset->{
          _id,
          url
        }
      }
    },
    quoteOverlay {
      text,
      author
    },
    propImage {
      asset->{
        _id,
        url
      }
    }
  },
  "investmentValueProps": *[_type == "investmentValueProps"][0]{
    heading {
      preText,
      highlightedText
    },
    valueCards[0...3] {
      title,
      description,
      backgroundColor
    }
  },
  "investmentBanner": *[_type == "investmentBanner"][0]{
    text,
    backgroundImage {
      asset->{
        _id,
        url
      }
    }
  },
  "investmentPackages": *[_type == "investmentPackages"][0]{
    sectionTitle,
    weddingPackages[0...3] {
      title,
      price,
      image {
        asset->{
          _id,
          url
        }
      },
      features
    },
    engagementPackage {
      title,
      price,
      image {
        asset->{
          _id,
          url
        }
      },
      features
    },
    lifestylePackages[0...4] {
      title,
      price,
      image {
        asset->{
          _id,
          url
        }
      },
      features
    },
    eventsPackage {
      title,
      price,
      image {
        asset->{
          _id,
          url
        }
      },
      features
    }
  },
  "investmentNextSteps": *[_type == "investmentNextSteps"][0]{
    title,
    subtitle,
    steps[0...4] {
      number,
      title,
      description
    }
  },
  "testimonialSection": *[_type == "testimonial"][0]{
    title,
    subtitle,
    testimonials[0...3] {
      text,
      author,
      image {
        asset->{
          _id,
          url
        }
      }
    }
  }
}`

// Portfolio Page Query
export const PORTFOLIO_PAGE_QUERY = `{
  "portfolioGallery": *[_type == "portfolioGallery"][0]{
    title,
    weddingImages[] {
      image {
        asset->{
          _id,
          url,
          "dimensions": metadata.dimensions,
          "lqip": metadata.lqip
        }
      },
      alt,
      caption
    },
    lifestyleImages[] {
      image {
        asset->{
          _id,
          url,
          "dimensions": metadata.dimensions,
          "lqip": metadata.lqip
        }
      },
      alt,
      caption
    }
  }
}`

// Contact Page Query
export const CONTACT_PAGE_QUERY = `{
  "contactPage": *[_type == "contactPage"][0]{
    text,
    backgroundImage {
      asset->{
        _id,
        url
      }
    }
  }
}`

// About Page Query
export const ABOUT_PAGE_QUERY = `{
  "aboutPage": *[_type == "aboutPage"][0]{
    heroSection {
      title,
      subtitle,
      backgroundImage {
        asset->{
          _id,
          url
        }
      },
      polaroidImage {
        asset->{
          _id,
          url
        }
      },
      polaroidCaption
    },
    introSection {
      name,
      subtitle,
      description,
      paragraphs,
      mainImage {
        asset->{
          _id,
          url
        }
      },
      smallImageTop {
        asset->{
          _id,
          url
        }
      },
      smallImageBottom {
        asset->{
          _id,
          url
        }
      },
      ctaButtonText
    },
    approachSection {
      title,
      paragraphs,
      backgroundImage {
        asset->{
          _id,
          url
        }
      },
      leftImage {
        asset->{
          _id,
          url
        }
      },
      rightImage {
        asset->{
          _id,
          url
        }
      },
      ctaButtonText
    },
    passionsSection {
      title,
      passions[] {
        title,
        icon {
          asset->{
            _id,
            url
          }
        },
        hasHeart
      }
    },
    rightFitSection {
      title,
      fitItems[] {
        title,
        description
      },
      bottomParagraph,
      sectionImage {
        asset->{
          _id,
          url
        }
      }
    },
    bannerSection {
      text,
      backgroundImage {
        asset->{
          _id,
          url
        }
      }
    }
  }
}`

// Type definitions for TypeScript
export interface LandingPageData {
  heroSection?: HeroSectionData
  approachSection?: ApproachSectionData
  aboutSection?: AboutSectionData
  gallerySection?: GallerySectionData
  testimonialSection?: TestimonialSectionData
  bookingSection?: BookingSectionData
}

export interface HeroSectionData {
  typewriterText: string
  locationText: string
  backgroundImages: Array<{
    asset: {
      _id: string
      url: string
    }
    alt: string
  }>
}

export interface ApproachSectionData {
  backgroundImage: {
    asset: {
      _id: string
      url: string
    }
  }
  whatICaptureTab: {
    title: string
    subtitle?: string
    quote?: string
    ctaButtonText?: string
    categories: Array<{
      title: string
      image: {
        asset: {
          _id: string
          url: string
        }
      }
    }>
  }
  myApproachTab: {
    title: string
    description: string[]
    image: {
      asset: {
        _id: string
        url: string
      }
    }
    ctaButtonText?: string
    bottomQuote?: string
    bottomQuoteBackground?: {
      asset: {
        _id: string
        url: string
      }
    }
  }
}

export interface AboutSectionData {
  heading: string
  description: string[]
  profileImage: {
    asset: {
      _id: string
      url: string
    }
  }
  polaroidCaption?: string
  ctaButtonText?: string
  decorativeImage?: {
    asset: {
      _id: string
      url: string
    }
  }
}

export interface GallerySectionData {
  backgroundImage: {
    asset: {
      _id: string
      url: string
    }
  }
  title: string
  galleryItems: Array<{
    image: {
      asset: {
        _id: string
        url: string
      }
    }
    caption: string
  }>
  ctaButtons?: Array<{
    text: string
    style: 'primary' | 'secondary'
  }>
}

export interface TestimonialSectionData {
  title: string
  subtitle?: string
  testimonials: Array<{
    text: string
    author: string
    image: {
      asset: {
        _id: string
        url: string
      }
    }
  }>
}

export interface BookingSectionData {
  title: string
}

// Investment Page Type Definitions
export interface InvestmentPageData {
  investmentHero?: InvestmentHeroData
  investmentValueProps?: InvestmentValuePropsData
  investmentBanner?: InvestmentBannerData
  investmentPackages?: InvestmentPackagesData
  investmentNextSteps?: InvestmentNextStepsData
  testimonialSection?: TestimonialSectionData
}

export interface InvestmentHeroData {
  title: string
  description: string
  heroImages: {
    mainImage: {
      asset: {
        _id: string
        url: string
      }
    }
    topSmallImage: {
      asset: {
        _id: string
        url: string
      }
    }
    bottomSmallImage: {
      asset: {
        _id: string
        url: string
      }
    }
  }
  quoteOverlay: {
    text: string
    author: string
  }
  propImage: {
    asset: {
      _id: string
      url: string
    }
  }
}

export interface InvestmentValuePropsData {
  heading: {
    preText: string
    highlightedText: string
  }
  valueCards: Array<{
    title: string
    description: string
    backgroundColor: string
  }>
}

export interface InvestmentBannerData {
  text: string
  backgroundImage: {
    asset: {
      _id: string
      url: string
    }
  }
}

export interface InvestmentPackagesData {
  sectionTitle: string
  weddingPackages: Array<{
    title: string
    price: string
    image: {
      asset: {
        _id: string
        url: string
      }
    }
    features: string[]
  }>
  engagementPackage: {
    title: string
    price: string
    image: {
      asset: {
        _id: string
        url: string
      }
    }
    features: string[]
  }
  lifestylePackages: Array<{
    title: string
    price: string
    image: {
      asset: {
        _id: string
        url: string
      }
    }
    features: string[]
  }>
  eventsPackage: {
    title: string
    price: string
    image: {
      asset: {
        _id: string
        url: string
      }
    }
    features: string[]
  }
}

export interface InvestmentNextStepsData {
  title: string
  subtitle: string
  steps: Array<{
    number: number
    title: string
    description: string
  }>
}

// Portfolio Page Type Definitions
export interface PortfolioPageData {
  portfolioGallery?: PortfolioGalleryData
}

export interface PortfolioGalleryData {
  title?: string // Made optional
  weddingImages: Array<{
    image: {
      asset: {
        _id: string
        url: string
        dimensions?: {
          width: number
          height: number
        }
        lqip?: string
      }
    }
    alt?: string
    caption?: string
  }>
  lifestyleImages: Array<{
    image: {
      asset: {
        _id: string
        url: string
        dimensions?: {
          width: number
          height: number
        }
        lqip?: string
      }
    }
    alt?: string
    caption?: string
  }>
}

// Contact Page Type Definitions
export interface ContactPageData {
  contactPage?: ContactPageHeroData
}

export interface ContactPageHeroData {
  text: string
  backgroundImage: {
    asset: {
      _id: string
      url: string
    }
  }
}

// About Page Type Definitions
export interface AboutPageData {
  aboutPage?: AboutPageContent
}

export interface AboutPageContent {
  heroSection: {
    title: string
    subtitle: string
    backgroundImage: {
      asset: {
        _id: string
        url: string
      }
    }
    polaroidImage: {
      asset: {
        _id: string
        url: string
      }
    }
    polaroidCaption: string
  }
  introSection: {
    name: string
    subtitle: string
    description: string
    paragraphs: string[]
    mainImage: {
      asset: {
        _id: string
        url: string
      }
    }
    smallImageTop: {
      asset: {
        _id: string
        url: string
      }
    }
    smallImageBottom: {
      asset: {
        _id: string
        url: string
      }
    }
    ctaButtonText: string
  }
  approachSection: {
    title: string
    paragraphs: string[]
    backgroundImage: {
      asset: {
        _id: string
        url: string
      }
    }
    leftImage?: {
      asset: {
        _id: string
        url: string
      }
    }
    rightImage?: {
      asset: {
        _id: string
        url: string
      }
    }
    ctaButtonText: string
  }
  passionsSection: {
    title: string
    passions: Array<{
      title: string
      icon: {
        asset: {
          _id: string
          url: string
        }
      }
      hasHeart: boolean
    }>
  }
  rightFitSection: {
    title: string
    fitItems: Array<{
      title: string
      description: string
    }>
    bottomParagraph: string
    sectionImage: {
      asset: {
        _id: string
        url: string
      }
    }
  }
  bannerSection: {
    text: string
    backgroundImage?: {
      asset: {
        _id: string
        url: string
      }
    }
  }
}
