"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [hasScrolledPastHero, setHasScrolledPastHero] = useState(false);
  const pathname = usePathname();

  // Check if coming soon mode is enabled
  const isComingSoonMode = process.env.NEXT_PUBLIC_COMING_SOON_MODE === 'true';
  
  // Don't render navbar if coming soon mode is enabled
  if (isComingSoonMode) {
    return null;
  }

  // Define pages with light backgrounds that need dark navbar
  const lightBackgroundPages = ["/investment", "/portfolio"];
  const isLightPage = lightBackgroundPages.includes(pathname);

  // Close menu when pathname changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const heroHeight = window.innerHeight;

      setHasScrolledPastHero(currentScrollY > heroHeight * 0.3);

      if (currentScrollY < 50) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dynamic styles based on page type
  const getNavbarStyles = () => {
    if (hasScrolledPastHero) {
      // When scrolled, use consistent dark overlay style
      return {
        textColor: "text-white",
        borderColor: "border-white/10",
        logoSrc: "/piksbyvik-logo.svg",
        buttonBorder: "border-white",
        hoverBg: "#8B7D6B",
        hoverBorder: "#8B7D6B",
        hoverText: "#F3EADB",
      };
    }

    // At the top, adapt to page background
    return {
      textColor: isLightPage ? "text-black" : "text-white",
      borderColor: isLightPage ? "border-black/80" : "border-white/80",
      logoSrc: isLightPage ? "/logo-light-navbar.svg" : "/piksbyvik-logo.svg",
      buttonBorder: isLightPage ? "border-black" : "border-white",
      hoverBg: isLightPage ? "#403528" : "#8B7D6B",
      hoverBorder: isLightPage ? "#403528" : "#8B7D6B",
      hoverText: "#F3EADB",
    };
  };

  const styles = getNavbarStyles();

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 px-[5vw] md:px-[3.5vw] py-4 md:py-3 w-screen transition-all duration-300 ease-in-out",
          isVisible ? "translate-y-0" : "-translate-y-full",
          hasScrolledPastHero
            ? "backdrop-blur-md bg-brown-one/30 border-b border-white/10"
            : `border-b ${styles.borderColor}`
        )}
      >
        <div className="flex justify-between items-center w-full">
          {/* Brand - Left on mobile, center on desktop */}
          <Link href="/" className="block md:hidden">
            <Image
              src={styles.logoSrc}
              alt="Piks by Vik Logo"
              width={160}
              height={50}
              priority={true}
            />
          </Link>
          {/* Burger Menu - Left on desktop, right on mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={cn(
              "font-inconsolata text-base md:text-lg tracking-wide hover:opacity-70 hover:cursor-pointer transition-opacity order-2 md:order-none",
              styles.textColor
            )}
          >
            MENU
          </button>
          {/* Brand - Center on desktop only */}
          <Link href="/" className="hidden md:block ml-30">
            <Image
              src={styles.logoSrc}
              alt="Piks by Vik Logo"
              width={160}
              height={50}
              className="md:w-[266px] md:h-[76px]"
              priority={true}
            />
          </Link>{" "}
          {/* CTA Button - Hidden on mobile */}
          <Link
            href="/contact"
            className={cn(
              "hidden md:block font-inconsolata text-sm px-6 py-3 rounded-[50%] border hover:cursor-pointer",
              styles.textColor,
              styles.buttonBorder
            )}
            style={
              {
                "--hover-bg": styles.hoverBg,
                "--hover-border": styles.hoverBorder,
                "--hover-text": styles.hoverText,
              } as React.CSSProperties
            }
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = styles.hoverBg;
              e.currentTarget.style.borderColor = styles.hoverBorder;
              e.currentTarget.style.color = styles.hoverText;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.borderColor = "";
              e.currentTarget.style.color = "";
            }}
          >
            GET IN TOUCH
          </Link>
        </div>
      </nav>

      {/* Full-screen Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-90 flex">
          {/* Grain overlay */}
          <div
            className="absolute inset-0 z-5 opacity-30 pointer-events-none"
            style={{
              backgroundImage: "url('/grain.webp')",

              backgroundRepeat: "repeat",
            }}
          />
          {/* Menu Content */}
          <div className="relative w-full md:w-1/2 h-full bg-brown-one flex flex-col justify-between px-8 py-12 md:px-12 md:pt-12 md:pb-4">
            {/* Header */}
            <div className="flex justify-between md:justify-start mb-16 md:mb-8">
              <h2 className="font-travel-november text-beige-one text-3xl md:text-4xl">
                Navigate
              </h2>
              <Image
                src="/piksbyvik-logo.svg"
                alt="Piks by Vik Logo"
                width={160}
                height={50}
                priority={true}
                className="md:hidden"
              />
            </div>

            {/* Circular Image - Desktop only */}
            <div className="hidden lg:block z-40 absolute w-64 h-80 rounded-[50%] top-20 right-10 border border-beige-one overflow-hidden">
              <Image
                src="/gallery-4.png"
                alt="couple Image for navbar"
                fill
                className="object-cover rounded-[50%]"
              />
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col items-start justify-center flex-1">
              <nav className="mb-16 md:mb-8">
                <ul className="flex flex-col items-start w-full space-y-16 md:space-y-10">
                  <li className="relative">
                    <Link
                      href="/"
                      className=" relative text-beige-one block font-instrument-serif text-4xl hover:text-beige-two hover:cursor-pointer transition-colors tracking-wide"
                    >
                      HOME
                    </Link>
                  </li>
                  <li className="relative">
                    <Link
                      href="/about"
                      className="text-beige-one block font-instrument-serif text-4xl hover:text-beige-two hover:cursor-pointer transition-colors tracking-wide"
                    >
                      ABOUT
                    </Link>
                  </li>
                  <li className="relative">
                    <Link
                      href="/portfolio"
                      className="text-beige-one block font-instrument-serif text-4xl hover:text-beige-two hover:cursor-pointer transition-colors tracking-wide"
                    >
                      PORTFOLIO
                    </Link>
                  </li>
                  <li className="relative">
                    <Link
                      href="/investment"
                      className="text-beige-one block font-instrument-serif text-4xl hover:text-beige-two hover:cursor-pointer transition-colors tracking-wide"
                    >
                      INVESTMENT
                    </Link>
                  </li>
                  <li className="relative">
                    <Link
                      href="/contact"
                      className="text-beige-one block font-instrument-serif text-4xl hover:text-beige-two hover:cursor-pointer transition-colors tracking-wide"
                    >
                      CONTACT
                    </Link>
                  </li>
                </ul>
              </nav>

              {/* Decorative Quote - Desktop only */}
              <div className="hidden md:block mb-16 md:mb-0 mx-auto md:mx-0 md:mt-2">
                <p className="font-la-belle-aurore text-xl md:text-2xl text-beige-two italic">
                  &quot;Every moment tells a story&quot;
                </p>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 md:gap-4">
              {/* Contact Info - Desktop only */}
              <div className="hidden md:block space-y-2">
                <p className="font-inconsolata text-sm text-beige-two/80">
                  BASED IN LONG ISLAND, NEW YORK
                </p>
                <p className="font-inconsolata text-sm text-beige-two/80">
                  piksbyvik@gmail.com
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setIsMenuOpen(false)}
                className="font-inconsolata text-base md:text-lg px-6 py-2 md:px-8 md:py-2 border border-beige-one text-beige-one hover:bg-beige-one hover:text-brown-two hover:cursor-pointer transition-colors tracking-wide ml-auto md:ml-0 rounded-[50%]"
              >
                CLOSE
              </button>
            </div>
          </div>

          {/* Right Half - Clickable Area to Close (Desktop only) */}
          <div
            className="hidden md:block w-1/2 h-full bg-black/20 cursor-pointer"
            onClick={() => setIsMenuOpen(false)}
          />
        </div>
      )}
    </>
  );
}
