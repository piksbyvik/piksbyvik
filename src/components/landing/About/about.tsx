"use client";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { fontSizes } from "@/styles/typography";
import Image from "next/image";
import React, { useRef } from "react";
import Polaroid from "../../ui/Polaroid";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Cache element queries once - this is the real optimization
      const elements = {
        blueContainer: containerRef.current.querySelector(
          "[data-about-container]"
        ),
        heading: containerRef.current.querySelector("[data-about-heading]"),
        textParagraphs:
          containerRef.current.querySelectorAll("[data-about-text]"),
        button: containerRef.current.querySelector("[data-about-button]"),
        polaroidImage: containerRef.current.querySelector("[data-about-image]"),
        decorativeIcons:
          containerRef.current.querySelectorAll("[data-about-icon]"),
        camera: containerRef.current.querySelector("[data-about-camera]"),
        tape: containerRef.current.querySelector("[data-about-tape]"),
        decorativeImg: containerRef.current.querySelector("[data-about-trees]"),
      };

      // Create matchMedia instance with scope
      const mm = gsap.matchMedia(containerRef);

      // These functions are perfectly fine as regular functions inside useGSAP
      const createContainerAnimation = () => {
        gsap.set(elements.blueContainer, {
          clipPath: "inset(15%)",
          opacity: 0.7,
        });

        return gsap
          .timeline({
            scrollTrigger: {
              trigger: elements.blueContainer,
              start: "top 75%",
              toggleActions: "play none none none",
              once: true,
            },
          })
          .to(elements.blueContainer, {
            clipPath: "inset(0%)",
            opacity: 1,
            duration: 1.5,
            ease: "power2.out",
          });
      };

      const createFloatingAnimation = (delay = 2.2) => {
        return () => {
          elements.decorativeIcons.forEach((icon, index) => {
            gsap.to(icon, {
              y: -8,
              duration: 2.5 + index * 0.3,
              ease: "power2.inOut",
              repeat: -1,
              yoyo: true,
              delay: index * 0.2,
            });
          });
        };
      };

      // Add responsive breakpoints
      mm.add(
        {
          // Mobile and tablet
          isMobile: "(max-width: 1023px)",
          // Desktop
          isDesktop: "(min-width: 1024px)",
          // Accessibility
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isMobile, isDesktop, reduceMotion } = context.conditions || {};

          // Create master timeline - same for all devices
          const masterTl = createContainerAnimation();

          if (reduceMotion) {
            // Simplified animations for reduced motion preference
            gsap.set(
              [
                elements.heading,
                elements.textParagraphs,
                elements.button,
                elements.polaroidImage,
                elements.decorativeIcons,
                elements.camera,
                elements.tape,
                elements.decorativeImg,
              ],
              {
                opacity: 1,
                clipPath: "inset(0%)",
                rotation: 0,
                scale: 1,
                y: 0,
                filter: "blur(0px)",
              }
            );
            return;
          }

          if (isMobile) {
            // MOBILE ANIMATION SEQUENCE: Visual elements first, then text

            // Visual elements first
            if (elements.polaroidImage) {
              gsap.set(elements.polaroidImage, {
                opacity: 0,
                clipPath: "inset(50%)",
                rotation: -8,
                scale: 0.8,
              });

              masterTl.to(
                elements.polaroidImage,
                {
                  opacity: 1,
                  clipPath: "inset(0%)",
                  rotation: 3,
                  scale: 1,
                  duration: 1.2,
                  ease: "power2.out",
                },
                0.3
              );
            }

            if (elements.tape) {
              gsap.set(elements.tape, { opacity: 0 });
              masterTl.to(
                elements.tape,
                {
                  opacity: 1,
                  duration: 0.8,
                  ease: "power2.out",
                },
                0.5
              );
            }

            // Decorative elements
            if (elements.decorativeIcons.length) {
              elements.decorativeIcons.forEach((icon, index) => {
                gsap.set(icon, { opacity: 0, scale: 0 });
                masterTl.to(
                  icon,
                  {
                    opacity: index === 0 ? 0.7 : 1,
                    scale: 1,
                    duration: 0.6,
                    ease: "back.out(1.8)",
                  },
                  0.7 + index * 0.1
                );
              });
            }

            if (elements.decorativeImg) {
              gsap.set(elements.decorativeImg, {
                clipPath: "inset(100% 0 0 0)",
                opacity: 0,
              });
              masterTl.to(
                elements.decorativeImg,
                {
                  clipPath: "inset(0% 0 0 0)",
                  opacity: 1,
                  duration: 0.8,
                  ease: "power2.out",
                },
                0.9
              );
            }

            // Text content after visuals
            if (elements.heading) {
              const text = elements.heading.textContent || "";
              elements.heading.innerHTML = text
                .split("")
                .map((char, index) => {
                  if (char === " ") return " ";
                  return `<span class="about-letter-reveal" data-letter="${index}">${char}</span>`;
                })
                .join("");

              const letterElements = elements.heading.querySelectorAll(
                ".about-letter-reveal"
              );
              gsap.set(letterElements, {
                opacity: 0,
                y: 60,
                filter: "blur(2px)",
              });

              masterTl.to(
                letterElements,
                {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  duration: 1.0,
                  ease: "power2.out",
                  stagger: 0.04,
                },
                1.0
              );
            }

            if (elements.textParagraphs.length) {
              gsap.set(elements.textParagraphs, {
                opacity: 0,
                y: 30,
                filter: "blur(1px)",
              });
              masterTl.to(
                elements.textParagraphs,
                {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  duration: 0.8,
                  ease: "power2.out",
                  stagger: 0.15,
                },
                1.4
              );
            }

            if (elements.button) {
              gsap.set(elements.button, { opacity: 0 });
              masterTl.to(
                elements.button,
                {
                  opacity: 1,
                  duration: 0.8,
                  ease: "power2.in",
                },
                1.8
              );
            }

            // Floating animation for mobile
            masterTl.call(createFloatingAnimation(2.0), [], 2.0);
          } else if (isDesktop) {
            // DESKTOP ANIMATION SEQUENCE: Text first, then visuals

            // Text content first
            if (elements.heading) {
              const text = elements.heading.textContent || "";
              elements.heading.innerHTML = text
                .split("")
                .map((char, index) => {
                  if (char === " ") return " ";
                  return `<span class="about-letter-reveal" data-letter="${index}">${char}</span>`;
                })
                .join("");

              const letterElements = elements.heading.querySelectorAll(
                ".about-letter-reveal"
              );
              gsap.set(letterElements, {
                opacity: 0,
                y: 80,
                filter: "blur(3px)",
              });

              masterTl.to(
                letterElements,
                {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  duration: 1.2,
                  ease: "power2.out",
                  stagger: 0.03,
                },
                0.2
              );
            }

            if (elements.textParagraphs.length) {
              gsap.set(elements.textParagraphs, {
                opacity: 0,
                y: 40,
                filter: "blur(2px)",
              });
              masterTl.to(
                elements.textParagraphs,
                {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  duration: 0.8,
                  ease: "power2.out",
                  stagger: 0.2,
                },
                0.6
              );
            }

            if (elements.button) {
              gsap.set(elements.button, { opacity: 0 });
              masterTl.to(
                elements.button,
                {
                  opacity: 1,
                  duration: 0.8,
                  ease: "power2.in",
                },
                1.2
              );
            }

            // Visual elements after text
            if (elements.polaroidImage) {
              gsap.set(elements.polaroidImage, {
                opacity: 0,
                clipPath: "inset(50%)",
                rotation: -8,
                scale: 0.8,
              });
              masterTl.to(
                elements.polaroidImage,
                {
                  opacity: 1,
                  clipPath: "inset(0%)",
                  rotation: 3,
                  scale: 1,
                  duration: 1.2,
                  ease: "power2.out",
                },
                1.0
              );
            }

            if (elements.camera) {
              gsap.set(elements.camera, {
                opacity: 0,
                rotation: -15,
                scale: 0.5,
              });
              masterTl.to(
                elements.camera,
                {
                  opacity: 1,
                  rotation: 0,
                  scale: 1,
                  duration: 0.8,
                  ease: "power3.out",
                },
                1.1
              );
            }

            if (elements.tape) {
              gsap.set(elements.tape, { opacity: 0 });
              masterTl.to(
                elements.tape,
                {
                  opacity: 1,
                  duration: 0.8,
                  ease: "power2.out",
                },
                1.3
              );
            }

            if (elements.decorativeIcons.length) {
              elements.decorativeIcons.forEach((icon, index) => {
                gsap.set(icon, { opacity: 0, scale: 0 });
                masterTl.to(
                  icon,
                  {
                    opacity: index === 0 ? 0.7 : 1,
                    scale: 1,
                    duration: 0.6,
                    ease: "back.out(1.8)",
                  },
                  1.5 + index * 0.1
                );
              });
            }

            if (elements.decorativeImg) {
              gsap.set(elements.decorativeImg, {
                clipPath: "inset(100% 0 0 0)",
                opacity: 0,
              });
              masterTl.to(
                elements.decorativeImg,
                {
                  clipPath: "inset(0% 0 0 0)",
                  opacity: 1,
                  duration: 0.8,
                  ease: "power2.out",
                },
                1.6
              );
            }

            // Floating animation for desktop
            masterTl.call(createFloatingAnimation(2.2), [], 2.2);
          }

          // Return cleanup function (optional)
          return () => {
            // Custom cleanup if needed - GSAP animations are auto-cleaned
            // Don't call context.revert() here - it's done automatically
          };
        }
      );

      // Cleanup function for the hook
      return () => mm.revert();
    },
    { scope: containerRef } // This dependency array is what matters
  );

  return (
    <SectionWrapper
      ref={containerRef}
      withGrain
      grainOpacity={12}
      className="bg-beige-one w-screen flex items-center justify-center border-b-2 border-brown-two"
    >
      <div className="w-full rounded-2xl md:rounded-3xl shadow-2xl border border-black">
        <div
          className="w-full bg-blue rounded-2xl md:rounded-3xl px-4 py-8 md:p-8 lg:p-16 relative overflow-hidden"
          data-about-container
        >
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center w-full relative z-20 gap-8 lg:gap-16">
            {/* Text Content */}
            <div className="text-brown-one order-2 lg:order-1 flex-1 lg:max-w-[55%] relative">
              <div className="flex lg:items-center sm:gap-6 md:gap-14 lg:gap-14 mb-6 md:mb-8">
                <h1
                  className="overflow-hidden font-travel-november font-normal m-0 text-brown-one text-center sm:text-left"
                  style={{
                    fontSize: fontSizes.approachTitle,
                    lineHeight: "1.1", // Ensure letters have room to move
                  }}
                  data-about-heading
                >
                  Hi I&apos;m Victoria
                </h1>
                {/* Camera SVG */}
                <div
                  className="absolute -right-4 -top-6 lg:-top-2 scale-[0.7] md:hidden lg:scale-[1] lg:flex lg:items-center"
                  data-about-camera
                >
                  <Image
                    src="/camera.svg"
                    alt="camera"
                    width={100}
                    height={80}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              <div className="mb-4 md:mb-6 leading-relaxed text-left">
                <p
                  className="font-inconsolata font-medium text-black m-0 mb-4"
                  style={{ fontSize: fontSizes.bodyMedium }}
                  data-about-text
                >
                  I&apos;m not just your photographer - I&apos;m your hype girl,
                  your calm in the chaos, and your biggest fan behind the lens.
                  I&apos;m here to capture your magic, the wild love, the quiet
                  glances, the full-body laughs - all the moments that make your
                  story uniquely you.
                </p>
              </div>

              <div className="mb-6 md:mb-10 leading-relaxed text-left">
                <p
                  className="font-inconsolata font-medium text-black m-0"
                  style={{ fontSize: fontSizes.bodyMedium }}
                  data-about-text
                >
                  Whether we&apos;re dancing barefoot on Long Island or chasing
                  sunsets across the globe, I&apos;ll be right there - grounding
                  you, guiding you, and soaking in every ounce of light + love
                  right alongside you ♡
                </p>
              </div>

              {/* Button */}
              <div className="" data-about-button>
                <button
                  className="bg-black text-beige-two border-none px-6 md:px-8 py-3 rounded-full font-inconsolata font-medium cursor-pointer transition-all duration-300 hover:bg-brown-two hover:-translate-y-1 min-w-[140px] responsive-border-radius"
                  style={{
                    fontSize: fontSizes.buttonText,
                  }}
                >
                  MY STORY
                </button>
              </div>
            </div>

            {/* Visual Content */}
            <div className="relative flex justify-center items-center order-1 lg:order-2 z-20 flex-shrink-0">
              <div data-about-image>
                <Polaroid
                  imageSrc="/victoria.jpg"
                  caption="Long Island, NY photographer for the wildly in love and endlessly inspired ♡"
                  alt="Victoria with her camera in a field"
                  rotation={0} // Will be animated to 3
                  className="w-[280px] sm:w-[320px] md:w-[380px] lg:w-[400px]"
                  imgclassName="h-[260px] sm:h-[320px] md:h-[380px] lg:h-[400px]"
                />
              </div>
              <div data-about-tape>
                <Image
                  src="/about-tape.svg"
                  alt="tape-icon"
                  width={194}
                  height={169}
                  className="absolute -top-16 lg:-top-14 left-1/2 -translate-x-1/2 scale-[0.7] md:scale-[0.8] lg:scale-[1] z-50"
                />
              </div>
            </div>
          </div>

          {/* Decorative Icons */}
          <div
            className="absolute top-2 right-0 md:top-8 md:right-16 w-12 h-9 md:w-16 md:h-12 scale-[0.8] z-10 md:z-30"
            data-about-icon
          >
            <Image
              src="/heart.svg"
              alt="hearts decoration"
              width={64}
              height={48}
              className="w-full h-full object-contain opacity-70"
            />
          </div>
          <div
            className="absolute top-6 right-2 md:top-6 md:right-6 w-12 h-9 md:w-16 md:h-12 z-10 md:z-30"
            data-about-icon
          >
            <Image
              src="/heart.svg"
              alt="hearts decoration"
              width={64}
              height={48}
              className="w-full h-full object-contain"
            />
          </div>

          <div
            className="absolute -bottom-6 md:-bottom-4 left-[55%] sm:left-[50%] md:left-[60%] lg:left-[55%] w-28 sm:w-40 md:w-64 lg:w-52 sm:h-[30%] md:h-[25%] lg:h-[35%] z-10"
            data-about-trees
          >
            <Image
              src="/about-trees.jpg"
              alt="decorative trees"
              width={180}
              height={140}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default About;
