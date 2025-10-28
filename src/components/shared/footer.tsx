import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="relative w-full max-w-[2200px] mx-auto bg-beige-one pt-8 lg:pt-12 overflow-hidden border-t-4 border-black">
      {/* Grain overlay */}
      <div
        className="absolute inset-0 z-5 opacity-12 pointer-events-none"
        style={{
          backgroundImage: "url('/grain.webp')",

          backgroundRepeat: "repeat",
        }}
      />

      <div className="w-full relative z-20 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 px-[5vw] lg:px-[3.5vw]">
          {/* Left Content - Logo and Navigation */}
          <div className="lg:col-span-8 space-y-6">
            {/* Logo */}
            <Link href="/" className="hover:cursor-pointer">
              <Image
                src="/logo-footer-version.svg"
                alt="Piks by Vik Photography"
                width={569}
                height={134}
              />
            </Link>

            {/* Navigation Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8 pt-10">
              {/* Find Your Way */}
              <div>
                <h3
                  className="font-domaine-display font-medium text-brown-one mb-4 uppercase tracking-wide"
                  style={{ fontSize: "clamp(24px, 2vw, 32px)" }}
                >
                  FIND YOUR WAY
                </h3>
                <nav>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        href="/"
                        className="font-inconsolata text-brown-one hover:text-brown-two transition-colors text-sm"
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/about"
                        className="font-inconsolata text-brown-one hover:text-brown-two transition-colors text-sm"
                      >
                        About
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/portfolio"
                        className="font-inconsolata text-brown-one hover:text-brown-two transition-colors text-sm"
                      >
                        Portfolio
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/investment"
                        className="font-inconsolata text-brown-one hover:text-brown-two transition-colors text-sm"
                      >
                        Investment
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/contact"
                        className="font-inconsolata text-brown-one hover:text-brown-two transition-colors text-sm"
                      >
                        Contact
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>

              {/* Connect */}
              <div>
                <h3
                  className="font-domaine-display font-medium text-brown-one mb-4 uppercase tracking-wide"
                  style={{ fontSize: "clamp(24px, 2vw, 32px)" }}
                >
                  CONNECT
                </h3>
                <nav>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="https://www.instagram.com/piksbyvik/"
                        className="font-inconsolata text-brown-one hover:text-brown-two transition-colors text-sm"
                      >
                        Instagram
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="font-inconsolata text-brown-one hover:text-brown-two transition-colors text-sm"
                      >
                        TikTok
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="font-inconsolata text-brown-one hover:text-brown-two transition-colors text-sm"
                      >
                        Facebook
                      </a>
                    </li>
                  </ul>
                </nav>

                {/* Email */}
                <div className="mt-4">
                  <a
                    href="mailto:piksbyvik@gmail.com"
                    className="font-inconsolata text-brown-one hover:text-brown-two transition-colors underline text-sm"
                  >
                    piksbyvik@gmail.com
                  </a>
                </div>
              </div>

              {/* Handwritten Text - Hidden on mobile, shown on larger screens */}
              <div className="hidden md:block absolute right-[30%] top-[17%] md:col-span-1">
                <div className="mt-4">
                  <p
                    className="font-travel-november text-brown-one transform -rotate-18 leading-relaxed"
                    style={{ fontSize: "clamp(20px, 2vw, 56px)" }}
                  >
                    Timeless Love Captured!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="relative w-48 lg:w-72">
              <div className="aspect-[3/4] relative overflow-hidden">
                <Image
                  src="/footer-img.jpg"
                  alt="Romantic couple photography"
                  fill
                  className="object-cover opacity-40 md:opacity-100 border-4 border-black"
                  sizes="(max-width: 768px) 192px, 224px"
                />
              </div>

              {/* Handwritten text overlay on mobile */}
              <div className="md:hidden absolute -top-4 -right-6">
                <p className="font-la-belle-aurore text-brown-one transform rotate-12 leading-relaxed text-lg">
                  Timeless Love
                  <br />
                  Captured!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="w-full mt-8 border-t-8 border-brown-one px-[5vw] lg:px-[3.5vw] pt-4 pb-4">
          <div className="w-full flex justify-between items-center h-[40px]">
            <a href="https://www.dyodigitals.com" className="font-inconsolata text-brown-one/70 text-sm md:text-lg text-center">
              SITE BY DYO DIGITALS
            </a>
            <p className="font-inconsolata text-brown-one/70 text-sm md:text-lg text-center">
              PHOTOGRAPHER BASED IN NY
            </p>
            <p className="font-inconsolata text-brown-one/70 text-sm md:text-lg text-center">
              © PIKSBYVIK PHOTOGRAPHY
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
