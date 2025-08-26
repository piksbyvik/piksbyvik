import React from "react";
import { fontSizes } from "@/styles/typography";
import type { BookingSectionData } from "@/sanity/queries";
import BookingFormClient from "./booking-form-client";

interface BookingFormProps {
  data?: BookingSectionData;
}

const BookingForm: React.FC<BookingFormProps> = ({ data }) => {
  return (
    <section className="relative w-screen py-16 lg:py-24 bg-beige-two overflow-hidden">
      <div className="w-full relative z-20 px-[5vw] lg:px-[3.5vw] max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2
            className="font-travel-november text-brown-one mb-8 transform -rotate-2"
            style={{ fontSize: fontSizes.galleryTitle }}
          >
            {data?.title || "Now Booking 2026!"}
          </h2>

          <p
            className="font-inconsolata font-medium text-brown-one uppercase tracking-wide"
            style={{ fontSize: fontSizes.bodyMedium }}
          >
            FILL OUT THE FORM BELOW
          </p>
        </div>

        {/* Client Form Component - handles all form logic and rendering */}
        <BookingFormClient />
      </div>
    </section>
  );
};

export default BookingForm;
