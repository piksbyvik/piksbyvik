import About from "@/components/landing/About/about";
import Approach from "@/components/landing/Approach/Approach";
import BookingForm from "@/components/landing/booking-form/booking-form";
import Gallery from "@/components/landing/Gallery/gallery";
import Hero from "@/components/landing/Hero/Hero";
import Footer from "@/components/shared/footer";
import Testimonial from "@/components/testimonials/testimonial";
import { client } from "@/sanity/lib/client";
import { LANDING_PAGE_QUERY, type LandingPageData } from "@/sanity/queries";

const options = {
  next: {
    revalidate: process.env.NODE_ENV === "production" ? 1800 : 30,
  },
};

export default async function Home() {
  try {
    const data = await client.fetch<LandingPageData>(
      LANDING_PAGE_QUERY,
      {},
      options
    );

    return (
      <div className="w-screen relative">
        <Hero data={data?.heroSection} />
        <Approach data={data?.approachSection} />
        <About data={data?.aboutSection} />
        <Gallery data={data?.gallerySection} />
        <Testimonial data={data?.testimonialSection} />
        <BookingForm data={data?.bookingSection} />
        <Footer />
      </div>
    );
  } catch (error) {
    console.error("Error fetching Sanity data:", error);

    return (
      <div className="w-screen relative mx-auto">
        <Hero />
        <Approach />
        <About />
        <Gallery />
        <Testimonial />
        <BookingForm />
        <Footer />
      </div>
    );
  }
}
