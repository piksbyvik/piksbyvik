"use client";
import React, { useState } from "react";
import { fontSizes } from "@/styles/typography";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import Link from "next/link";
import Image from "next/image";

interface ProcessedPackageItem {
  title: string;
  price: string;
  imageUrl: string | null;
  features: string[];
}

interface ProcessedPackagesData {
  weddings: ProcessedPackageItem[];
  engagements: ProcessedPackageItem;
  lifestyle: ProcessedPackageItem[];
  events: ProcessedPackageItem;
}

interface ProcessedInvestmentPackagesData {
  sectionTitle: string;
  weddingPackages: ProcessedPackageItem[];
  engagementPackage: ProcessedPackageItem;
  lifestylePackages: ProcessedPackageItem[];
  eventsPackage: ProcessedPackageItem;
}

interface InvestmentPackagesClientProps {
  data?: ProcessedInvestmentPackagesData;
}

const FALLBACK_WEDDING_PACKAGES: ProcessedPackageItem[] = [
  {
    title: "TRADITIONAL PACKAGE",
    price: "$5600",
    imageUrl: null,
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
    imageUrl: null,
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
    imageUrl: null,
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

const FALLBACK_LIFESTYLE_PACKAGES: ProcessedPackageItem[] = [
  {
    title: "FAMILY SESSIONS",
    price: "$1200",
    imageUrl: null,
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
    imageUrl: null,
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
    imageUrl: null,
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
    imageUrl: null,
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

const InvestmentPackagesClient: React.FC<InvestmentPackagesClientProps> = ({
  data,
}) => {
  const [activeTab, setActiveTab] =
    useState<keyof ProcessedPackagesData>("weddings");
  const [currentWeddingIndex, setCurrentWeddingIndex] = useState(0);
  const [currentLifestyleIndex, setCurrentLifestyleIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const fallbackData = {
    sectionTitle: "EXPLORE INVESTMENT",
    weddingPackages: FALLBACK_WEDDING_PACKAGES,
    engagementPackage: {
      title: "Engagement Package",
      price: "$1800",
      imageUrl: null,
      features: [
        "Up to 2 hours of coverage",
        "Location of your choice",
        "150+ edited high-res images",
        "Personal printing & sharing rights",
        "Online gallery for downloads",
      ],
    },
    lifestylePackages: FALLBACK_LIFESTYLE_PACKAGES,
    eventsPackage: {
      title: "Event Package",
      price: "$2200",
      imageUrl: null,
      features: [
        "Up to 4 hours of coverage",
        "Corporate events, parties, celebrations",
        "200+ edited images",
        "Personal printing & sharing rights",
        "Online gallery for downloads",
      ],
    },
  };

  const content = data || fallbackData;

  // Updated packages data with proper fallback handling
  const packagesData: ProcessedPackagesData = {
    weddings:
      content.weddingPackages && content.weddingPackages.length > 0
        ? content.weddingPackages
        : FALLBACK_WEDDING_PACKAGES,
    engagements:
      content.engagementPackage &&
      content.engagementPackage.title &&
      content.engagementPackage.price
        ? content.engagementPackage
        : fallbackData.engagementPackage,
    lifestyle:
      content.lifestylePackages && content.lifestylePackages.length > 0
        ? content.lifestylePackages
        : FALLBACK_LIFESTYLE_PACKAGES,
    events:
      content.eventsPackage &&
      content.eventsPackage.title &&
      content.eventsPackage.price
        ? content.eventsPackage
        : fallbackData.eventsPackage,
  };

  const handleTabClick = async (key: keyof ProcessedPackagesData) => {
    if (isAnimating || key === activeTab) return;
    setIsAnimating(true);
    setActiveTab(key);
    setCurrentWeddingIndex(0);
    setCurrentLifestyleIndex(0);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleExploreMoreClick = async () => {
    if (isAnimating) return;

    if (activeTab === "weddings") {
      if (packagesData.weddings.length > 1) {
        setIsAnimating(true);
        setCurrentWeddingIndex(
          (prev) => (prev + 1) % packagesData.weddings.length
        );
        setTimeout(() => setIsAnimating(false), 500);
      }
    } else if (activeTab === "lifestyle") {
      if (packagesData.lifestyle.length > 1) {
        setIsAnimating(true);
        setCurrentLifestyleIndex(
          (prev) => (prev + 1) % packagesData.lifestyle.length
        );
        setTimeout(() => setIsAnimating(false), 500);
      }
    }
  };

  const getCurrentPackage = (): ProcessedPackageItem => {
    if (activeTab === "weddings") {
      const weddingPackages = packagesData.weddings;
      if (!weddingPackages || weddingPackages.length === 0) {
        return FALLBACK_WEDDING_PACKAGES[0];
      }
      return (
        weddingPackages[currentWeddingIndex] || FALLBACK_WEDDING_PACKAGES[0]
      );
    } else if (activeTab === "lifestyle") {
      const lifestylePackages = packagesData.lifestyle;
      if (!lifestylePackages || lifestylePackages.length === 0) {
        return FALLBACK_LIFESTYLE_PACKAGES[0];
      }
      return (
        lifestylePackages[currentLifestyleIndex] ||
        FALLBACK_LIFESTYLE_PACKAGES[0]
      );
    } else {
      const packageItem = packagesData[activeTab];
      if (!packageItem || !packageItem.title || !packageItem.price) {
        return activeTab === "engagements"
          ? fallbackData.engagementPackage
          : fallbackData.eventsPackage;
      }
      return packageItem;
    }
  };

  const hasMultiplePackages = () => {
    if (activeTab === "weddings") {
      return packagesData.weddings && packagesData.weddings.length > 1;
    } else if (activeTab === "lifestyle") {
      return packagesData.lifestyle && packagesData.lifestyle.length > 1;
    }
    return false;
  };

  const getExploreButtonText = () => {
    if (activeTab === "weddings") {
      const weddingPackages = packagesData.weddings;
      if (!weddingPackages || weddingPackages.length <= 1) return "";

      const nextIndex = (currentWeddingIndex + 1) % weddingPackages.length;
      const nextPackage = weddingPackages[nextIndex];
      if (!nextPackage) return "";

      const packageName = nextPackage.title.split(" ")[0].toLowerCase();
      const formattedName =
        packageName.charAt(0).toUpperCase() + packageName.slice(1);
      return `View ${formattedName} Package`;
    } else if (activeTab === "lifestyle") {
      const lifestylePackages = packagesData.lifestyle;
      if (!lifestylePackages || lifestylePackages.length <= 1) return "";

      const nextIndex = (currentLifestyleIndex + 1) % lifestylePackages.length;
      const nextPackage = lifestylePackages[nextIndex];
      if (!nextPackage) return "";

      const sessionName = nextPackage.title.split(" ")[0].toLowerCase();
      const formattedName =
        sessionName.charAt(0).toUpperCase() + sessionName.slice(1);
      return `View ${formattedName} Sessions`;
    }
    return `More ${packageTabs.find((tab) => tab.key === activeTab)?.label} Options`;
  };

  const pkg = getCurrentPackage();

  if (!pkg) {
    return (
      <section className="relative w-screen bg-[#403528] pb-16 md:pb-24 overflow-x-hidden">
        <div className="flex items-center justify-center py-20">
          <p className="text-beige-one font-inconsolata">Loading packages...</p>
        </div>
      </section>
    );
  }

  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
  };

  return (
    <section className="relative w-screen bg-[#403528] pb-16 md:pb-24 overflow-x-hidden">
      <div
        className="absolute inset-0 z-5 opacity-25 pointer-events-none"
        style={{
          backgroundImage: "url('/grain.webp')",
          backgroundRepeat: "repeat",
        }}
      />

      <div className="w-full bg-beige-one border-b border-black flex flex-col md:flex-row items-center justify-between px-[5vw] lg:px-[3.5vw] py-8">
        <span className="font-inconsolata w-full text-center md:text-left text-black text-lg md:text-xl tracking-wide">
          {content.sectionTitle}
        </span>
        <nav className="w-full flex items-center justify-between md:justify-end md:gap-12 mt-4 md:mt-0">
          {packageTabs.map((tab) => (
            <button
              key={tab.key}
              className={cn(
                "font-la-belle-aurore hover:cursor-pointer text-lg md:text-2xl lg:text-3xl transition-colors duration-200",
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

      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeTab}-${currentWeddingIndex}-${currentLifestyleIndex}`}
          className={cn(
            "relative z-20 px-[5vw] lg:px-[3.5vw]",
            "flex flex-col lg:flex-row md:justify-between items-stretch",
            "gap-10 md:gap-16 pt-12"
          )}
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <div
            className={cn(
              "relative w-full lg:w-[36%] h-[240px] md:h-[400px] lg:h-auto",
              "border-4 border-beige-one overflow-hidden shadow-lg",
              "mb-8 md:mb-0 flex-shrink-0"
            )}
          >
            <ImageWithFallback
              src={pkg?.imageUrl || null}
              alt={pkg?.title || "Package image"}
              fill
              placeholder="blur"
            />
          </div>

          <div className="w-full lg:w-[60%] flex flex-col items-start">
            <h2
              className="font-instrument-serif text-beige-one mb-4 capitalize"
              style={{ fontSize: fontSizes.galleryTitle }}
            >
              {pkg?.title || "Package"}
            </h2>
            <div className="flex items-center gap-4 mb-6">
              <span
                className="font-travel-november text-beige-one text-2xl md:text-3xl"
                style={{
                  textDecoration: "underline",
                  textUnderlineOffset: "6px",
                }}
              >
                - {pkg?.price || "Contact for pricing"}
              </span>
            </div>
            <ul className="font-inconsolata text-beige-one text-base md:text-lg leading-relaxed tracking-tight space-y-2 mb-8">
              {(pkg?.features || []).map((feature: string, i: number) => (
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
              <Link
                href="/contact"
                className="font-travel-november text-beige-one underline underline-offset-4 hover:cursor-pointer hover:opacity-80 transition-opacity"
                style={{
                  fontSize: "clamp(20px, 4vw, 32px)",
                  letterSpacing: "clamp(0.5px, 0.1vw, 0px)",
                }}
              >
                Inquire About This Package
              </Link>

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
                    className="font-domaine-display text-beige-one flex justify-start text-start items-center gap-3 hover:cursor-pointer hover:opacity-80 transition-opacity group"
                    style={{ fontSize: "clamp(18px, 3.5vw, 24px)" }}
                  >
                    <span className="">{getExploreButtonText()}</span>
                    <Image src="/cta-arrow.svg" width={26} height={32} alt="" className="scale-120"/>
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default InvestmentPackagesClient;
