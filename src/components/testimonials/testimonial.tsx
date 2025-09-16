import { urlFor } from "@/sanity/lib/image";
import type { TestimonialSectionData } from "@/sanity/queries";
import type { ProcessedTestimonialSectionData } from "@/lib/types";
import TestimonialClient from "./TestimonialClient";

interface TestimonialProps {
  data?: TestimonialSectionData;
  bgColor?: string;
  textColor?: string;
  accentColor?: string;
  borderColor?: string;
  headerColor?: string;
  buttonColor?: string;
  imgBg?: string;
  imgBorder?: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ data, ...styleProps }) => {
  // Pre-resolve image URLs
  const processedData: ProcessedTestimonialSectionData | undefined = data ? {
    title: data.title,
    subtitle: data.subtitle,
    testimonials: data.testimonials?.map((testimonial, index) => ({
      id: index + 1,
      text: testimonial.text,
      author: testimonial.author,
      imageUrl: urlFor(testimonial.image.asset).url(),
    }))
  } : undefined;

  return <TestimonialClient data={processedData} {...styleProps} />;
};

export default Testimonial;