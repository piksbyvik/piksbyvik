"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [hasScrolledPastHero, setHasScrolledPastHero] = useState(false);
  const pathname = usePathname();

  // Define pages with light backgrounds that need dark navbar
  const lightBackgroundPages = ['/investment', '/about', '/contact'];
  const isLightPage = lightBackgroundPages.includes(pathname);

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

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dynamic styles based on page type
  const getNavbarStyles = () => {
    if (hasScrolledPastHero) {
      // When scrolled, use consistent dark overlay style
      return {
        textColor: 'text-white',
        borderColor: 'border-white/10',
        logoSrc: '/piksbyvik-logo.svg',
        buttonBorder: 'border-white',
        hoverBg: '#8B7D6B',
        hoverBorder: '#8B7D6B',
        hoverText: '#F3EADB'
      };
    }
    
    // At the top, adapt to page background
    return {
      textColor: isLightPage ? 'text-black' : 'text-white',
      borderColor: isLightPage ? 'border-black/80' : 'border-white/80',
      logoSrc: isLightPage ? '/logo-light-navbar.svg' : '/piksbyvik-logo.svg',
      buttonBorder: isLightPage ? 'border-black' : 'border-white',
      hoverBg: isLightPage ? '#403528' : '#8B7D6B',
      hoverBorder: isLightPage ? '#403528' : '#8B7D6B',
      hoverText: '#F3EADB'
    };
  };

  const styles = getNavbarStyles();

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 px-[5vw] md:px-[3.5vw] py-4 md:py-3 w-screen transition-all duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${
        hasScrolledPastHero 
          ? 'backdrop-blur-md bg-brown-one/30 border-b border-white/10' 
          : `border-b ${styles.borderColor}`
      }`}>
        <div className="flex justify-between items-center w-full">
          {/* Burger Menu */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`font-inconsolata text-base md:text-lg tracking-wide hover:opacity-70 transition-opacity ${styles.textColor}`}
          >
            MENU
          </button>

          {/* Brand */}
          <div className="ml-30">
            <Image 
              src={styles.logoSrc} 
              alt="Piks by Vik Logo" 
              width={160} 
              height={50} 
              className="block md:hidden"
            />
            <Image 
              src={styles.logoSrc} 
              alt="Piks by Vik Logo" 
              width={266} 
              height={76} 
              className="hidden md:block"
            />
          </div>

          {/* CTA Button - Hidden on mobile */}
          <button 
            className={`hidden md:block font-inconsolata text-sm px-6 py-2 border transition-colors ${styles.textColor} ${styles.buttonBorder}`}
            style={{ borderRadius: '65px/20px' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = styles.hoverBg;
              e.currentTarget.style.borderColor = styles.hoverBorder;
              e.currentTarget.style.color = styles.hoverText;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = styles.buttonBorder.includes('black') ? '#000000' : '#ffffff';
              e.currentTarget.style.color = styles.textColor.includes('black') ? '#000000' : '#ffffff';
            }}
          >
            GET IN TOUCH
          </button>
        </div>
      </nav>

      {/* Full-screen Menu Overlay for mobile, Half-screen for desktop */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-90 flex">
          {/* Menu Content */}
          <div className="w-full md:w-1/2 h-full bg-[#8B7D6B] flex flex-col justify-between p-8 md:p-12">
            {/* Decorative SVG - Top */}
            <div className="absolute top-6 md:top-8 right-6 md:right-8">
              <svg width="40" height="40" viewBox="0 0 60 60" fill="none" className="text-white/20 md:w-[60px] md:h-[60px]">
                <path d="M30 5C30 5 45 15 45 30C45 45 30 55 30 55C30 55 15 45 15 30C15 15 30 5 30 5Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <circle cx="30" cy="30" r="8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              </svg>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col space-y-8 mt-16">
              <nav>
                <ul className="space-y-4 md:space-y-6">
                  <li>
                    <Link href="/" className="block font-inconsolata text-2xl md:text-4xl text-white hover:text-[#F3EADB] transition-colors tracking-wide">
                      HOME
                    </Link>
                  </li>
                  <li>
                    <Link href="/portfolio" className="block font-inconsolata text-2xl md:text-4xl text-white hover:text-[#F3EADB] transition-colors tracking-wide">
                      PORTFOLIO
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="block font-inconsolata text-2xl md:text-4xl text-white hover:text-[#F3EADB] transition-colors tracking-wide">
                      ABOUT
                    </Link>
                  </li>
                  <li>
                    <Link href="/investment" className="block font-inconsolata text-2xl md:text-4xl text-white hover:text-[#F3EADB] transition-colors tracking-wide">
                      INVESTMENT
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="block font-inconsolata text-2xl md:text-4xl text-white hover:text-[#F3EADB] transition-colors tracking-wide">
                      CONTACT
                    </Link>
                  </li>
                </ul>
              </nav>

              {/* Decorative Quote */}
              <div className="mt-12 md:mt-16">
                <p className="font-la-belle-aurore text-xl md:text-2xl text-[#F3EADB] italic">
                  &quot;Every moment tells a story&quot;
                </p>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-0">
              {/* Contact Info */}
              <div>
                <p className="font-inconsolata text-sm text-white/80 mb-2">BASED IN NYC</p>
                <p className="font-inconsolata text-sm text-white/80">piksbyvik@gmail.com</p>
              </div>

              {/* Close Button */}
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="font-inconsolata text-base md:text-lg px-6 md:px-8 py-2 border border-white text-white hover:bg-white hover:text-[#8B7D6B] transition-colors tracking-wide"
                style={{ borderRadius: '60px/25px' }}
              >
                CLOSE
              </button>
            </div>

            {/* Decorative SVG - Bottom */}
            <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8">
              <svg width="60" height="30" viewBox="0 0 80 40" fill="none" className="text-white/15 md:w-[80px] md:h-[40px]">
                <path d="M10 20C10 20 20 10 40 20C60 30 70 20 70 20" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <circle cx="40" cy="20" r="3" fill="currentColor"/>
                <circle cx="15" cy="18" r="2" fill="currentColor"/>
                <circle cx="65" cy="22" r="2" fill="currentColor"/>
              </svg>
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