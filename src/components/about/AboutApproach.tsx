import { fontSizes } from "@/styles/typography";
import { urlFor } from "@/sanity/lib/image";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import Link from "next/link";
import React from "react";

interface AboutApproachProps {
  data?: {
    title: string;
    paragraphs: string[];
    backgroundImage: {
      asset: {
        _id: string;
        url: string;
      };
    };
    leftImage?: {
      asset: {
        _id: string;
        url: string;
      };
    };
    rightImage?: {
      asset: {
        _id: string;
        url: string;
      };
    };
    ctaButtonText: string;
  };
}

const AboutApproach: React.FC<AboutApproachProps> = ({ data }) => {
  // Helper function to resolve image URLs
  const getImageUrl = (image: { asset: { _id: string; url: string; } } | undefined): string | null => {
    if (!image?.asset) return null;
    return urlFor(image.asset).url();
  };

  return (
    <section className="relative max-w-[2200px] mx-auto w-full py-16 md:py-20 lg:py-24 bg-beige-one border-b-4 border-beige-two">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src={getImageUrl(data?.backgroundImage)}
          alt="About approach background"
          fill
          className="object-cover"
          fallback={
            <div className="w-full h-full bg-gradient-to-br from-brown-one to-beige-one"></div>
          }
        />
        <div className="absolute inset-0 bg-brown-one/40"></div>
      </div>

      <div className="absolute right-0 bottom-0 w-[180px] h-[240px] hidden lg:block">
        <div className="relative w-full h-full overflow-hidden">
          <ImageWithFallback
            src={getImageUrl(data?.rightImage)}
            alt="Wedding couple"
            fill
            className="object-cover"
            fallback={
              <div className="w-full h-full bg-brown-one/20"></div>
            }
          />
          <div className="absolute inset-0 border-t-4 border-l-4 border-beige-two pointer-events-none"></div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-[180px] h-[240px] hidden lg:block">
        <div className="relative w-full h-full overflow-hidden">
          <ImageWithFallback
            src={getImageUrl(data?.leftImage)}
            alt="Wedding detail"
            fill
            className="object-cover"
            fallback={
              <div className="w-full h-full bg-brown-one/20"></div>
            }
          />
          {/* White border around smaller image */}
          <div className="absolute inset-0 border-t-4 border-r-4 border-beige-two pointer-events-none"></div>
        </div>
      </div>

      {/* Grain overlay */}
      <div
    className="absolute inset-0 z-5 opacity-25 pointer-events-none"
    style={{
      backgroundImage: "url('/grain.webp')",
      
      backgroundRepeat: "repeat",
    }}
  />

      <div className="relative flex flex-col items-center gap-6 z-10 px-[5vw] lg:px-0 lg:max-w-3xl xl:max-w-5xl mx-auto">

        {/* Main Quote */}
        <div className="text-center">
          <h1
            className="font-instrument-serif text-beige-one leading-tight"
            style={{ fontSize: fontSizes.galleryTitle }}
          >
            {data?.title || "CAPTURING YOUR LOVE, LIKE THE WARM EMBRACE OF AUTUMN."}
          </h1>
        </div>
        <div className="flex flex-col items-center gap-6 lg:max-w-2xl xl:max-w-4xl">
          {data?.paragraphs?.map((paragraph, index) => (
            <p
              key={index}
              className="font-inconsolata text-beige-two leading-relaxed tracking-tight text-center"
              style={{ fontSize: fontSizes.bodyMedium }}
            >
              {paragraph}
            </p>
          )) || (
            <>
              <p
                className="font-inconsolata text-beige-two leading-relaxed tracking-tight text-center"
                style={{ fontSize: fontSizes.bodyMedium }}
              >
                It is so hard to put into words how I capture a day or what my
                approach is without using cliché words. If I had to put it into
                words, I would say - I capture the days as they happen in its rawest
                form while enhancing the moments through a creative eye.
              </p>
              <p
                className="font-inconsolata text-beige-two leading-relaxed tracking-tight text-center"
                style={{ fontSize: fontSizes.bodyMedium }}
              >
                I think the most beautiful moments are the ones that happen
                naturally, so my goal is to make you feel comfortable and
                comfortable for everyone. This comfortable is where I ease your
                worries about posing for me and just let you in our time together
                and give my advice on positioning, but I do not &quot;pose&quot; you in ways
                that feel stiff because, to me, that isn&apos;t the true nature of
                your love story.
              </p>
              <p
                className="font-inconsolata text-beige-two leading-relaxed tracking-tight text-center"
                style={{ fontSize: fontSizes.bodyMedium }}
              >
                With that, I approach a day honestly + bringing my guidance while
                keeping your story and moments at the center of it all.
              </p>
            </>
          )}

          <Link href="/portfolio">
            <button className="font-inconsolata text-black rounded-full bg-blue  hover:bg-beige-one hover:text-brown-one transition-colors duration-300 py-2 px-5 hover:cursor-pointer">
              {data?.ctaButtonText || "VIEW PORTFOLIO"}
            </button>
          </Link>
        </div>
        
      </div>
    </section>
  );
};

export default AboutApproach;
