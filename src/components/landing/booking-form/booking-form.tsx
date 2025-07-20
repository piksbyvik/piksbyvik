"use client";
import React, { useState } from "react";
import Image from "next/image";

import { fontSizes } from "@/styles/typography";

const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    eventDate: "",
    eventLocation: "",
    interests: {
      wedding: false,
      engagements: false,
      family: false,
      newborn: false,
      maternity: false,
      events: false,
    },
    vision: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: {
        ...prev.interests,
        [interest]: !prev.interests[interest as keyof typeof prev.interests],
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <section className="relative w-screen py-16 lg:py-24 bg-beige-two overflow-hidden">
      {/* Grain overlay */}

      <div className="w-full relative z-20 px-[5vw] lg:px-[3.5vw] max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2
            className="font-la-belle-aurore text-brown-one mb-8 transform -rotate-2"
            style={{ fontSize: fontSizes.galleryTitle }}
          >
            Now Booking 2026!
          </h2>

          <p
            className="font-inconsolata font-medium text-brown-one uppercase tracking-wide"
            style={{ fontSize: fontSizes.bodyMedium }}
          >
            FILL OUT THE FORM BELOW
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Name and Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20">
            <div>
              <label
                htmlFor="fullName"
                className="block font-inconsolata text-brown-one mb-3"
                style={{ fontSize: fontSizes.bodySmall }}
              >
                Your Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Angela Yu"
                className="w-full px-4 py-3 bg-beige-one border border-brown-one/30 focus:border-brown-one focus:outline-none transition-colors font-inconsolata"
                style={{ fontSize: fontSizes.bodySmall }}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block font-inconsolata text-brown-one mb-3"
                style={{ fontSize: fontSizes.bodySmall }}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="angela@gmail.com"
                className="w-full px-4 py-3 bg-beige-one border border-brown-one/30 focus:border-brown-one focus:outline-none transition-colors font-inconsolata"
                style={{ fontSize: fontSizes.bodySmall }}
              />
            </div>
          </div>

          {/* Event Date and Location Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20">
            <div>
              <label
                htmlFor="eventDate"
                className="block font-inconsolata text-brown-one mb-3"
                style={{ fontSize: fontSizes.bodySmall }}
              >
                Event Date (if it's set in stone)
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="eventDate"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleInputChange}
                  placeholder="MM/DD/YY"
                  className="w-full px-4 py-3 bg-beige-one border border-brown-one/30 focus:border-brown-one focus:outline-none transition-colors font-inconsolata pr-12"
                  style={{ fontSize: fontSizes.bodySmall }}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Image
                    src="/calendar-icon.svg"
                    alt="calendar"
                    width={20}
                    height={20}
                  />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="eventLocation"
                className="block font-inconsolata text-brown-one mb-3"
                style={{ fontSize: fontSizes.bodySmall }}
              >
                Event Location
              </label>
              <input
                type="text"
                id="eventLocation"
                name="eventLocation"
                value={formData.eventLocation}
                onChange={handleInputChange}
                placeholder="Location, venue name, city/state"
                className="w-full px-4 py-3 bg-beige-one border border-brown-one/30 focus:border-brown-one focus:outline-none transition-colors font-inconsolata"
                style={{ fontSize: fontSizes.bodySmall }}
              />
            </div>
          </div>

          {/* Interests Section */}
          <div className="relative">
            <div>
              <h3
                className="font-inconsolata text-brown-one mb-6"
                style={{ fontSize: fontSizes.bodyMedium }}
              >
                I'm Interested In
              </h3>

              <div className="space-y-4">
                {[
                  { key: "wedding", label: "Be My Wedding Photographer" },
                  { key: "engagements", label: "Engagements / Couples" },
                  { key: "family", label: "Family" },
                  { key: "newborn", label: "Newborn" },
                  { key: "maternity", label: "Maternity" },
                  { key: "events", label: "Events" },
                ].map(({ key, label }) => (
                  <label
                    key={key}
                    className="flex items-center cursor-pointer group"
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={
                          formData.interests[
                            key as keyof typeof formData.interests
                          ]
                        }
                        onChange={() => handleCheckboxChange(key)}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 border-2 border-brown-one transition-colors rounded-sm ${
                          formData.interests[
                            key as keyof typeof formData.interests
                          ]
                            ? "bg-brown-one"
                            : "bg-beige-one"
                        }`}
                      ></div>
                    </div>
                    <span
                      className="ml-3 font-inconsolata text-brown-one group-hover:text-brown-two transition-colors"
                      style={{ fontSize: fontSizes.bodySmall }}
                    >
                      {label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Mail Illustration - Absolute positioned */}
            <div className="absolute top-8 right-0">
              <Image
                src="/mail-icon.svg"
                alt="mail envelope"
                width={120}
                height={80}
                
              />
            </div>
          </div>

          {/* Vision Textarea */}
          <div>
            <label
              htmlFor="vision"
              className="block font-inconsolata text-brown-one mb-3"
              style={{ fontSize: fontSizes.bodySmall }}
            >
              Tell me about your vision! (optional)
            </label>
            <textarea
              id="vision"
              name="vision"
              value={formData.vision}
              onChange={handleInputChange}
              placeholder="I'd love to know more about your story and your vision for your session!"
              rows={6}
              className="w-full px-4 py-3 bg-beige-one border border-brown-one/30 focus:border-brown-one focus:outline-none transition-colors font-inconsolata resize-none"
              style={{ fontSize: fontSizes.bodySmall }}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-start">
            <button
            type="submit"
              className="bg-brown-two text-beige-two border-none px-6 md:px-8 py-3 rounded-full font-inconsolata font-medium cursor-pointer transition-all duration-300 hover:bg-brown-one min-w-[140px] responsive-border-radius"
              style={{
                fontSize: fontSizes.buttonText,
              }}
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default BookingForm;

