"use client";
import Navbar from "@/components/shared/navbar";
import Hero from "@/components/landing/Hero/Hero";
import Approach from "@/components/landing/Approach/Approach";
import About from "@/components/landing/About/about";
import Gallery from "@/components/landing/Gallery/gallery";
import Testimonial from "@/components/testimonials/testimonial";
import BookingForm from "@/components/landing/booking-form/booking-form";
import Footer from "@/components/shared/footer";


export default function Home() {
  return (
    <div className="w-screen relative">
      <Navbar />
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
