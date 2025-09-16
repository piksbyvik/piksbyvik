import { ApproachClient } from "./ApproachClient";
import type { ApproachSectionData } from "@/sanity/queries";
import type { ProcessedApproachSectionData } from "@/lib/types"; // import processed types
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { urlFor } from "@/sanity/lib/image";

interface ApproachProps {
  data?: ApproachSectionData;
}

export default function ApproachSection({ data }: ApproachProps) {
  if (!data) return null;

  const categories =
    data.whatICaptureTab?.categories?.map((c) => ({
      title: c.title,
      imageUrl: c.image ? urlFor(c.image.asset).url() : null,
    })) || [];

  const hydratedData: ProcessedApproachSectionData = {
    backgroundImage: data.backgroundImage
      ? urlFor(data.backgroundImage.asset).url()
      : null,
    whatICaptureTab: {
      ...data.whatICaptureTab,
      categories,
    },
    myApproachTab: {
      ...data.myApproachTab,
      image: data.myApproachTab?.image
        ? urlFor(data.myApproachTab.image.asset).url()
        : null,
      bottomQuoteBackground: data.myApproachTab?.bottomQuoteBackground
        ? urlFor(data.myApproachTab.bottomQuoteBackground.asset).url()
        : null,
    },
  };
  return (
    <section className="relative max-w-[2200px] mx-auto w-full overflow-hidden">
      <div className="absolute inset-0">
        <ImageWithFallback
          src={hydratedData.backgroundImage}
          alt="Approach section background"
          fill
          className="object-cover"
          fallback={
            <div className="w-full h-full bg-gradient-to-br from-beige-one to-brown-one"></div>
          }
        />
      </div>

      <ApproachClient data={hydratedData} />
    </section>
  );
}
