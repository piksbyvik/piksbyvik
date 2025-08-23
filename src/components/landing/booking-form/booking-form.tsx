"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import emailjs from '@emailjs/browser';
import ThankYouModal from "./thank-you-modal";

import { fontSizes } from "@/styles/typography";
import type { BookingSectionData } from "@/sanity/queries";

interface BookingFormProps {
  data?: BookingSectionData;
}

const BookingForm: React.FC<BookingFormProps> = ({ data }) => {
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

  const [honeypot, setHoneypot] = useState("");
  const [formStartTime] = useState(Date.now());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [showThankYouModal, setShowThankYouModal] = useState(false);

  // Initialize EmailJS
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
      emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
    }
  }, []);

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

  const validateForm = (): boolean => {
    // Reset any previous errors
    setErrorMessage('');

    if (!formData.fullName.trim() || formData.fullName.length < 2) {
      setErrorMessage('Please enter a valid name (at least 2 characters)');
      return false;
    }

    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMessage('Please enter a valid email address');
      return false;
    }

    // Honeypot check
    if (honeypot) {
      setErrorMessage('Invalid submission detected');
      return false;
    }

    // Time-based validation (form should take at least 3 seconds to fill)
    const timeDiff = Date.now() - formStartTime;
    if (timeDiff < 3000) {
      setErrorMessage('Please take your time filling out the form');
      return false;
    }

    // Check for suspicious patterns
    const suspiciousPatterns = [
      /https?:\/\//i,
      /\b(seo|marketing|promotion|business|loan|crypto|bitcoin)\b/i,
      /(.)\1{4,}/
    ];
    
    const textToCheck = `${formData.fullName} ${formData.vision}`.toLowerCase();
    if (suspiciousPatterns.some(pattern => pattern.test(textToCheck))) {
      setErrorMessage('Please remove any promotional content or URLs');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Format interests for email
      const selectedInterests = Object.entries(formData.interests)
        .filter(([_, selected]) => selected)
        .map(([interest, _]) => interest)
        .join(", ");

      // Prepare template parameters for EmailJS
      const templateParams = {
        to_name: 'Vik',
        from_name: formData.fullName,
        from_email: formData.email,
        event_date: formData.eventDate || "Not specified",
        event_location: formData.eventLocation || "Not specified",
        interests: selectedInterests || "None specified",
        vision: formData.vision || "No additional details provided",
        submission_date: new Date().toLocaleDateString(),
        submission_time: new Date().toLocaleTimeString()
      };

      // Send email via EmailJS
      const emailResponse = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateParams
      );

      if (emailResponse.status === 200) {
        setSubmitStatus('success');
        setShowThankYouModal(true);
        // Reset form
        setFormData({
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
        setHoneypot("");
      } else {
        throw new Error('EmailJS failed');
      }

    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
      setErrorMessage('Failed to send message. Please check your EmailJS configuration and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setShowThankYouModal(false);
  };

  return (
    <section className="relative w-screen py-16 lg:py-24 bg-beige-two overflow-hidden">
      {/* Thank You Modal */}
      {showThankYouModal && (
        <ThankYouModal 
          customerName={formData.fullName || "You"} 
          onClose={handleCloseModal} 
        />
      )}

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

        {/* Error Message (Success is now handled by modal) */}
        {submitStatus === 'error' && (
          <div className="mb-8 p-4 bg-red-100 border border-red-300 rounded-lg">
            <p className="font-inconsolata text-red-800 text-center">
              {errorMessage}
            </p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Honeypot field - hidden from users */}
          <input
            type="text"
            name="website"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            style={{ 
              position: 'absolute', 
              left: '-9999px', 
              top: '-9999px',
              opacity: 0,
              pointerEvents: 'none'
            }}
            tabIndex={-1}
            autoComplete="off"
          />

          {/* Name and Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20">
            <div>
              <label
                htmlFor="fullName"
                className="block font-inconsolata text-brown-one mb-3"
                style={{ fontSize: fontSizes.bodySmall }}
              >
                Your Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Angela Yu"
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-beige-one border border-brown-one/30 focus:border-brown-one focus:outline-none transition-colors font-inconsolata disabled:opacity-50"
                style={{ fontSize: fontSizes.bodySmall }}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block font-inconsolata text-brown-one mb-3"
                style={{ fontSize: fontSizes.bodySmall }}
              >
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="angela@gmail.com"
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-beige-one border border-brown-one/30 focus:border-brown-one focus:outline-none transition-colors font-inconsolata disabled:opacity-50"
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
                Event Date (if it&apos;s set in stone)
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="eventDate"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleInputChange}
                  placeholder="MM/DD/YY"
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-beige-one border border-brown-one/30 focus:border-brown-one focus:outline-none transition-colors font-inconsolata pr-12 disabled:opacity-50"
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
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-beige-one border border-brown-one/30 focus:border-brown-one focus:outline-none transition-colors font-inconsolata disabled:opacity-50"
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
                I&apos;m Interested In
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
                        disabled={isSubmitting}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 border-2 border-brown-one transition-colors rounded-sm ${
                          formData.interests[
                            key as keyof typeof formData.interests
                          ]
                            ? "bg-brown-one"
                            : "bg-beige-one"
                        } ${isSubmitting ? 'opacity-50' : ''}`}
                      ></div>
                    </div>
                    <span
                      className={`ml-3 font-inconsolata text-brown-one group-hover:text-brown-two transition-colors ${isSubmitting ? 'opacity-50' : ''}`}
                      style={{ fontSize: fontSizes.bodySmall }}
                    >
                      {label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Mail Illustration */}
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
              disabled={isSubmitting}
              className="w-full px-4 py-3 bg-beige-one border border-brown-one/30 focus:border-brown-one focus:outline-none transition-colors font-inconsolata resize-none disabled:opacity-50"
              style={{ fontSize: fontSizes.bodySmall }}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-start">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-brown-two text-beige-two border-none px-6 md:px-8 py-3 rounded-full font-inconsolata font-medium cursor-pointer transition-all duration-300 hover:bg-brown-one min-w-[140px] responsive-border-radius disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                fontSize: fontSizes.buttonText,
              }}
            >
              {isSubmitting ? 'SENDING...' : 'SUBMIT'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default BookingForm;
