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
  imagePosition?: string;
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
    price: "$5800",
    imageUrl: null,
    features: [
      "Up to 250 guests",
      "10 hours of photo coverage",
      "Second Photographer Included",
      "1000+ fully enhanced & edited high-resolution JPEG images made available to client via digital download",
      "Personal printing & sharing rights",
      "Travel included up to 70 miles round trip (Over 70 miles round-trip results in an additional travel fee)",
      "Preview of 100+ fully enhanced & edited high-resolution images made available to client within 7-10 days following the wedding date",
    ],
  },
  {
    title: "INTIMATE PACKAGE",
    price: "$4000",
    imageUrl: null,
    features: [
      "Up to 60 guests",
      "6 hours of photo coverage",
      "600+ fully enhanced & edited high-resolution JPEG images made available to client via digital download",
      "Personal printing & sharing rights",
      "Travel included up to 70 miles round trip (Over 70 miles round-trip results in an additional travel fee)",
      "Preview of 50+ fully enhanced & edited high-resolution images made available to client within 5 days following the wedding date",
    ],
  },
  {
    title: "ELOPEMENT PACKAGE",
    price: "$2000",
    imageUrl: null,
    features: [
      "Up to 20 guests",
      "3 hours of photo coverage",
      "300+ fully enhanced & edited high-resolution JPEG images made available to client via digital download",
      "Personal printing & sharing rights",
      "Travel included up to 70 miles round trip (Over 70 miles round-trip results in an additional travel fee)",
      "Preview of 20+ fully enhanced & edited high-resolution images made available to client within 5 days following the wedding date",
    ],
  },
];

const FALLBACK_LIFESTYLE_PACKAGES: ProcessedPackageItem[] = [
  {
    title: "FAMILY PACKAGE",
    price: "$450",
    imageUrl: null,
    features: [
      "1 hour of coverage",
      "80+ professionally edited images",
      "Personal printing & sharing rights",
      "Styling & location guide",
      "Online client gallery for downloads",
    ],
  },
  {
    title: "MATERNITY PACKAGE",
    price: "$450",
    imageUrl: null,
    features: [
      "1 hour of coverage",
      "80+ professionally edited images",
      "Personal printing & sharing rights",
      "Styling & location guide",
      "Online client gallery for downloads",
    ],
  },
  {
    title: "NEWBORN SESSION",
    price: "$550",
    imageUrl: null,
    features: [
      "Up to 90 minutes of coverage",
      "80+ professionally edited images",
      "Personal printing & sharing rights",
      "Online client gallery for downloads",
      "Adding one or more siblings to the session is a flat $50 fee (not per sibling).",
    ],
  },
  {
    title: "JOURNEY TO MOTHERHOOD PACKAGE",
    price: "$950",
    imageUrl: null,
    features: [
      "Includes both maternity & newborn package combined into one",
      "By booking together, you'll save $50 & ensure your story is captured from bump to baby with the same consistent style and care",
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
      title: "ENGAGEMENT PACKAGE",
      price: "$450",
      imageUrl: null,
      features: [
        "1 hour of coverage",
        "80+ professionally edited images",
        "Personal printing & sharing rights",
        "Styling & location guide",
        "Online client gallery for downloads",
      ],
    },
    lifestylePackages: FALLBACK_LIFESTYLE_PACKAGES,
    eventsPackage: {
      title: "EVENTS PACKAGE",
      price: "Starting From $650",
      imageUrl: null,
      features: [
        "3 hour minimum coverage for $650 - each additional hour is $200",
        "Unlimited professionally edited images",
        "Personal printing & sharing rights",
        "Online client gallery for downloads",
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

      // Special case for "Journey to Motherhood"
      if (
        nextPackage.title.toLowerCase().includes("journey") &&
        nextPackage.title.toLowerCase().includes("motherhood")
      ) {
        return "View Motherhood Package";
      }

      const sessionName = nextPackage.title.split(" ")[0].toLowerCase();
      const formattedName =
        sessionName.charAt(0).toUpperCase() + sessionName.slice(1);
      return `View ${formattedName} Package`;
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
    <section className="relative max-w-[2200px] mx-auto w-screen bg-[#403528] pb-16 md:pb-24 overflow-x-hidden">
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
          {" "}          <div
            className={cn(
              "relative w-full lg:w-[36%] h-[350px] md:h-[600px] lg:h-auto",
              "border-4 border-beige-one overflow-hidden shadow-lg",
              "mb-8 md:mb-0 flex-shrink-0"
            )}
          >            <ImageWithFallback
              src={pkg?.imageUrl || null}
              alt={pkg?.title || "Package image"}
              fill
              placeholder="blur"
              className="object-cover"
              objectPosition={pkg?.imagePosition?.replace(/_/g, ' ') || '50% 50%'}
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
              ))}{" "}
            </ul>

            {activeTab !== "weddings" && (
              <div className="font-inconsolata italic tracking-tight text-beige-one/90 text-sm md:text-xl mb-6 px-4 py-3 border-l-2 border-beige-one/30">
                Your story might take us just down the road or miles away —
                either way, I&apos;m in! For select locations, a travel fee may
                apply.
              </div>
            )}

            <div className="flex flex-col sm:flex-row w-full justify-between items-start sm:items-center gap-6 sm:gap-4 mt-6">
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
                <div className="flex flex-col justify-center items-center">
                  <button
                    onClick={handleExploreMoreClick}
                    className="font-domaine-display text-beige-one flex justify-start text-start items-center gap-3 hover:cursor-pointer hover:opacity-80 transition-opacity group"
                    style={{ fontSize: "clamp(18px, 3.5vw, 24px)" }}
                  >
                    <span className="">{getExploreButtonText()}</span>
                    <Image
                      src="/cta-arrow.svg"
                      width={26}
                      height={32}
                      alt=""
                      className="scale-120"
                    />
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
