"use client";
import React, { useState, useRef } from "react";
import { fontSizes } from "@/styles/typography";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import { InvestmentPackagesData } from "@/sanity/queries";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

interface InvestmentPackagesProps {
  data?: InvestmentPackagesData;
}

// Define separate interfaces for Sanity and fallback data
interface SanityPackageItem {
  title: string;
  price: string;
  image: { asset: { url: string } };
  features: string[];
}

interface FallbackPackageItem {
  title: string;
  price: string;
  image: string;
  features: string[];
}

// Union type for package items
type PackageItem = SanityPackageItem | FallbackPackageItem;

interface PackagesData {
  weddings: PackageItem[];
  engagements: PackageItem;
  lifestyle: PackageItem[];
  events: PackageItem;
}

// Move fallback data outside component to prevent re-renders - remove image URLs
const FALLBACK_WEDDING_PACKAGES: FallbackPackageItem[] = [
  {
    title: "TRADITIONAL PACKAGE",
    price: "$5600",
    image: "",
    features: [
      "Upto 250 guests",
      "10 hours of photo coverage by Me!",
      "Second Photographer Included",
      "1000+ fully enhanced & edited high-resolution JPEG images made available to client via digital download",
      "Personal printing & sharing rights",
      "Travel included up to 70 miles round trip (Over 70 miles round-trip results in an additional travel fee)",
      "Preview of 100+ fully enhanced & edited high-resolution images made available to client 7-10 days following the wedding date",
    ],
  },
  {
    title: "INTIMATE PACKAGE",
    price: "$3800",
    image: "",
    features: [
      "Up to 75 guests",
      "8 hours of photo coverage",
      "600+ fully enhanced & edited high-resolution images",
      "Personal printing & sharing rights",
      "Travel included up to 50 miles round trip",
      "Preview of 75+ images within 5-7 days",
      "Online gallery for easy sharing",
    ],
  },
  {
    title: "ELOPEMENT PACKAGE",
    price: "$2200",
    image: "",
    features: [
      "Up to 10 guests",
      "4 hours of photo coverage",
      "300+ fully enhanced & edited images",
      "Personal printing & sharing rights",
      "Travel included up to 30 miles round trip",
      "Preview of 50+ images within 3-5 days",
      "Intimate ceremony focus",
    ],
  },
];

const FALLBACK_LIFESTYLE_PACKAGES: FallbackPackageItem[] = [
  {
    title: "FAMILY SESSIONS",
    price: "$1200",
    image: "",
    features: [
      "Up to 1.5 hours of coverage",
      "Location of your choice or studio",
      "100+ edited high-resolution images",
      "Personal printing & sharing rights",
      "Online gallery for downloads",
      "Perfect for family milestones & updates",
    ],
  },
  {
    title: "MATERNITY SESSIONS",
    price: "$1400",
    image: "",
    features: [
      "Up to 2 hours of coverage",
      "Multiple outfit changes included",
      "120+ edited high-resolution images",
      "Partner & family shots included",
      "Personal printing & sharing rights",
      "Celebrating this beautiful chapter",
    ],
  },
  {
    title: "NEWBORN SESSIONS",
    price: "$1600",
    image: "",
    features: [
      "Up to 3 hours of coverage",
      "In-home or studio setting",
      "80+ edited high-resolution images",
      "Family & sibling shots included",
      "Props & styling assistance",
      "Capturing those precious first weeks",
    ],
  },
  {
    title: "JOURNEY TO MOTHERHOOD",
    price: "$3200",
    image: "",
    features: [
      "Maternity session (2nd or 3rd trimester)",
      "Newborn session (first 2 weeks)",
      "6-month milestone session",
      "300+ edited images across all sessions",
      "Personal printing & sharing rights",
      "Documenting your complete journey",
    ],
  },
];

const packageTabs = [
  { key: "weddings", label: "Weddings" },
  { key: "engagements", label: "Engagements" },
  { key: "lifestyle", label: "Lifestyle" },
  { key: "events", label: "Events" },
] as const;



const InvestmentPackages: React.FC<InvestmentPackagesProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<keyof PackagesData>("weddings");
  const [currentWeddingIndex, setCurrentWeddingIndex] = useState(0);
  const [currentLifestyleIndex, setCurrentLifestyleIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);

  const { contextSafe } = useGSAP({ scope: containerRef });

  const animateIn = contextSafe(() => {
    gsap.fromTo(
      "[data-package-content]",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
  });

  const animateOut = contextSafe(() => {
    return new Promise<void>((resolve) => {
      gsap.to("[data-package-content]", {
        opacity: 0,
        y: -30,
        duration: 0.3,
        ease: "power2.in",
        onComplete: resolve,
      });
    });
  });

  useGSAP(
    () => {
      animateIn();
    },
    { scope: containerRef, dependencies: [activeTab, currentWeddingIndex, currentLifestyleIndex] }
  );

  const handleTabClick = contextSafe(async (key: keyof PackagesData) => {
    if (isAnimatingRef.current || key === activeTab) return;
    isAnimatingRef.current = true;
    await animateOut();
    setActiveTab(key);
    // Reset package indices when switching tabs
    setCurrentWeddingIndex(0);
    setCurrentLifestyleIndex(0);
    isAnimatingRef.current = false;
  });

  const handleExploreMoreClick = contextSafe(async () => {
    if (isAnimatingRef.current) return;

    if (activeTab === "weddings") {
      if (packagesData.weddings.length > 1) {
        isAnimatingRef.current = true;
        await animateOut();
        setCurrentWeddingIndex((prev) => (prev + 1) % packagesData.weddings.length);
        isAnimatingRef.current = false;
      }
    } else if (activeTab === "lifestyle") {
      if (packagesData.lifestyle.length > 1) {
        isAnimatingRef.current = true;
        await animateOut();
        setCurrentLifestyleIndex((prev) => (prev + 1) % packagesData.lifestyle.length);
        isAnimatingRef.current = false;
      }
    }
  });

  // Fallback data structure with proper typing
  const fallbackData = {
    sectionTitle: "EXPLORE INVESTMENT",
    weddingPackages: FALLBACK_WEDDING_PACKAGES as PackageItem[],
    engagementPackage: {
      title: "Engagement Package",
      price: "$1800",
      image: "",
      features: [
        "Up to 2 hours of coverage",
        "Location of your choice",
        "150+ edited high-res images",
        "Personal printing & sharing rights",
        "Online gallery for downloads",
      ],
    } as FallbackPackageItem,
    lifestylePackages: FALLBACK_LIFESTYLE_PACKAGES as PackageItem[],
    eventsPackage: {
      title: "Event Package",
      price: "$2200",
      image: "",
      features: [
        "Up to 4 hours of coverage",
        "Corporate events, parties, celebrations",
        "200+ edited images",
        "Personal printing & sharing rights",
        "Online gallery for downloads",
      ],
    } as FallbackPackageItem,
  };

  const content = data || fallbackData;

  // Use Sanity data if available, otherwise use fallback with proper typing
  const packagesData: PackagesData = {
    weddings: (content.weddingPackages as PackageItem[]) || FALLBACK_WEDDING_PACKAGES,
    engagements: (content.engagementPackage as PackageItem) || fallbackData.engagementPackage,
    lifestyle: (content.lifestylePackages as PackageItem[]) || FALLBACK_LIFESTYLE_PACKAGES,
    events: (content.eventsPackage as PackageItem) || fallbackData.eventsPackage,
  };

  // Get current package data - updated to use Sanity data
  const getCurrentPackage = (): PackageItem => {
    if (activeTab === "weddings") {
      return packagesData.weddings[currentWeddingIndex];
    } else if (activeTab === "lifestyle") {
      return packagesData.lifestyle[currentLifestyleIndex];
    } else {
      return packagesData[activeTab];
    }
  };

  // Check if current tab has multiple packages - updated for Sanity data
  const hasMultiplePackages = () => {
    if (activeTab === "weddings") {
      return packagesData.weddings.length > 1;
    } else if (activeTab === "lifestyle") {
      return packagesData.lifestyle.length > 1;
    }
    return false;
  };

  // Get explore button text - updated for Sanity data
  const getExploreButtonText = () => {
    if (activeTab === "weddings") {
      const nextIndex = (currentWeddingIndex + 1) % packagesData.weddings.length;
      const nextPackage = packagesData.weddings[nextIndex];
      const packageName = nextPackage.title.split(" ")[0].toLowerCase();
      const formattedName = packageName.charAt(0).toUpperCase() + packageName.slice(1);
      return `View ${formattedName} Package`;
    } else if (activeTab === "lifestyle") {
      const nextIndex = (currentLifestyleIndex + 1) % packagesData.lifestyle.length;
      const nextPackage = packagesData.lifestyle[nextIndex];
      const sessionName = nextPackage.title.split(" ")[0].toLowerCase();
      const formattedName = sessionName.charAt(0).toUpperCase() + sessionName.slice(1);
      return `View ${formattedName} Sessions`;
    }
    return `More ${packageTabs.find((tab) => tab.key === activeTab)?.label} Options`;
  };

  const pkg = getCurrentPackage();

  return (
    <section
      ref={containerRef}
      className="relative w-screen bg-[#403528] pb-16 md:pb-24 overflow-x-hidden"
    >
      <div
        className=" absolute inset-0 z-90 opacity-12 pointer-events-none"
        style={{
          backgroundImage: "url('/grain.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Top nav */}
      <div className="w-full bg-beige-one border-b border-black flex flex-col md:flex-row items-center justify-between px-[5vw] lg:px-[3.5vw] py-8">
        <span className="font-inconsolata text-black text-lg md:text-xl tracking-wide">
          {content.sectionTitle}
        </span>
        <nav className="flex flex-wrap md:flex-nowrap gap-4 md:gap-12 mt-4 md:mt-0">
          {packageTabs.map((tab) => (
            <button
              key={tab.key}
              className={cn(
                "font-la-belle-aurore text-lg md:text-2xl lg:text-3xl transition-colors duration-200",
                activeTab === tab.key
                  ? "text-black underline underline-offset-4"
                  : "text-[#403528] opacity-70"
              )}
              onClick={() => handleTabClick(tab.key)}
              style={{
                fontWeight: activeTab === tab.key ? 500 : 400,
                letterSpacing: "0.02em",
              }}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main package content */}
      <div
        data-package-content
        className={cn(
          "relative z-20 px-[5vw] lg:px-[3.5vw]",
          "flex flex-col lg:flex-row md:justify-between items-stretch",
          "gap-10 md:gap-16 pt-12"
        )}
      >
        <div
          className={cn(
            "relative w-full lg:w-[36%] h-[240px] md:h-[400px] lg:h-auto",
            "border-4 border-beige-one overflow-hidden shadow-lg",
            "mb-8 md:mb-0 flex-shrink-0"
          )}
        >
          <ImageWithFallback
            src={typeof pkg.image === "object" && "asset" in pkg.image ? pkg.image : null}
            alt={pkg.title}
            fill
            placeholder="blur"
          />
        </div>

        <div className="w-full lg:w-[60%] flex flex-col items-start">
          <h2
            className="font-instrument-serif text-beige-one mb-4 capitalize"
            style={{ fontSize: fontSizes.galleryTitle }}
          >
            {pkg.title}
          </h2>
          <div className="flex items-center gap-4 mb-6">
            <span
              className="font-travel-november text-beige-one text-2xl md:text-3xl"
              style={{
                textDecoration: "underline",
                textUnderlineOffset: "6px",
              }}
            >
              - {pkg.price}
            </span>
          </div>
          <ul className="font-inconsolata text-beige-one text-base md:text-lg leading-relaxed tracking-tight space-y-2 mb-8">
            {pkg.features.map((feature: string, i: number) => (
              <li
                key={i}
                className="list-none pl-3"
                style={{
                  textIndent: "-1em",
                  marginBottom: "0.5em",
                  whiteSpace: "pre-line",
                }}
              >
                • {feature}
              </li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row w-full justify-between items-start sm:items-end gap-6 sm:gap-4 mt-6">
            <button
              className="font-travel-november text-beige-one underline underline-offset-4 hover:cursor-pointer hover:opacity-80 transition-opacity"
              style={{
                fontSize: "clamp(20px, 4vw, 32px)",
                letterSpacing: "clamp(0.5px, 0.1vw, 0px)",
              }}
            >
              Inquire About This Package
            </button>

            {hasMultiplePackages() && (
              <div className="flex flex-col items-start sm:items-end">
                <span
                  className="font-inconsolata text-beige-one/70 mb-2"
                  style={{ fontSize: "clamp(14px, 3vw, 16px)" }}
                >
                  Looking for something different?
                </span>
                <button
                  onClick={handleExploreMoreClick}
                  className="font-la-belle-aurore text-beige-one flex justift-start text-start items-center gap-2 hover:cursor-pointer hover:opacity-80 transition-opacity group"
                  style={{ fontSize: "clamp(18px, 4vw, 24px)" }}
                >
                  <span className="">{getExploreButtonText()}</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="group-hover:translate-x-1 transition-transform"
                  >
                    <path d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestmentPackages;
