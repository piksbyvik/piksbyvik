"use client";
import About from "@/components/landing/About/about";
import Approach from "@/components/landing/Approach/Approach";
import BookingForm from "@/components/landing/booking-form/booking-form";
import Gallery from "@/components/landing/Gallery/gallery";
import Hero from "@/components/landing/Hero/Hero";
import Footer from "@/components/shared/footer";
import Testimonial from "@/components/testimonials/testimonial";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  return (
    <div className="w-screen relative">
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
