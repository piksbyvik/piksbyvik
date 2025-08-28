"use client";
import { fontSizes } from "@/styles/typography";
import dynamic from "next/dynamic";
import Image from "next/image";
import React, { useState } from "react";

const ThankYouModal = dynamic(() => import("./thank-you-modal"), {
  ssr: false,
});

const BookingFormClient: React.FC = () => {
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
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [showThankYouModal, setShowThankYouModal] = useState(false);

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
    const currentlySelected = Object.values(formData.interests).filter(Boolean).length;
    const isCurrentlyChecked = formData.interests[interest as keyof typeof formData.interests];
    
    // If trying to check a new box and already have 3 selected, don't allow it
    if (!isCurrentlyChecked && currentlySelected >= 3) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      interests: {
        ...prev.interests,
        [interest]: !prev.interests[interest as keyof typeof prev.interests],
      },
    }));
  };

  const validateForm = (): boolean => {
    setErrorMessage("");

    if (!formData.fullName.trim() || formData.fullName.length < 2) {
      setErrorMessage("Please enter a valid name (at least 2 characters)");
      return false;
    }

    if (
      !formData.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      setErrorMessage("Please enter a valid email address");
      return false;
    }

    if (!formData.eventLocation.trim()) {
      setErrorMessage("Please enter an event location");
      return false;
    }

    // Check if at least one interest is selected
    const selectedInterestsCount = Object.values(formData.interests).filter(Boolean).length;
    if (selectedInterestsCount === 0) {
      setErrorMessage("Please select at least one area of interest");
      return false;
    }

    if (selectedInterestsCount > 3) {
      setErrorMessage("Please select no more than 3 areas of interest");
      return false;
    }

    if (honeypot) {
      setErrorMessage("Invalid submission detected");
      return false;
    }

    const timeDiff = Date.now() - formStartTime;
    if (timeDiff < 3000) {
      setErrorMessage("Please take your time filling out the form");
      return false;
    }

    const suspiciousPatterns = [
      /https?:\/\//i,
      /\b(seo|marketing|promotion|business|loan|crypto|bitcoin)\b/i,
      /(.)\1{4,}/,
    ];

    const textToCheck = `${formData.fullName} ${formData.vision}`.toLowerCase();
    if (suspiciousPatterns.some((pattern) => pattern.test(textToCheck))) {
      setErrorMessage("Please remove any promotional content or URLs");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      // Lazy load EmailJS only when form is submitted
      const { default: emailjs } = await import("@emailjs/browser");
      
      // Initialize EmailJS here, right before use
      if (process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
        emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
      }

      const selectedInterests = Object.entries(formData.interests)
        .filter(([_, selected]) => selected)
        .map(([interest, _]) => interest)
        .join(", ");

      const isWeddingOrEngagement =
        formData.interests.wedding || formData.interests.engagements;

      const templateParams = {
        to_name: "Vik",
        from_name: formData.fullName,
        from_email: formData.email,
        event_date: formData.eventDate || "Not specified",
        event_location: formData.eventLocation || "Not specified",
        interests: selectedInterests || "None specified",
        vision: formData.vision || "No additional details provided",
        submission_date: new Date().toLocaleDateString(),
        submission_time: new Date().toLocaleTimeString(),
      };

      const emailResponse = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateParams
      );

      if (emailResponse.status === 200) {
        setSubmitStatus("success");

        if (isWeddingOrEngagement) {
          setShowThankYouModal(true);
        }

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
        throw new Error("EmailJS failed");
      }
    } catch (error) {
      console.error("EmailJS Error:", error);
      setSubmitStatus("error");
      setErrorMessage(
        "Failed to send message. Please check your EmailJS configuration and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setShowThankYouModal(false);
  };

  return (
    <>
      {/* Thank You Modal */}
      {showThankYouModal && (
        <ThankYouModal
          customerName={formData.fullName || "You"}
          onClose={handleCloseModal}
        />
      )}

      {/* Status Messages */}
      {submitStatus === "error" && (
        <div className="mb-8 p-4 bg-red-100 border border-red-300 rounded-lg">
          <p className="font-inconsolata text-red-800 text-center">
            {errorMessage}
          </p>
        </div>
      )}

      {submitStatus === "success" && !showThankYouModal && (
        <div className="mb-8 p-6 bg-green-100 border border-green-300 rounded-lg">
          <p className="font-inconsolata text-green-800 text-center text-lg">
            Thank you for your message! I&apos;ll be in touch soon.
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
            position: "absolute",
            left: "-9999px",
            top: "-9999px",
            opacity: 0,
            pointerEvents: "none",
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
              Event Location *
            </label>
            <input
              type="text"
              id="eventLocation"
              name="eventLocation"
              value={formData.eventLocation}
              onChange={handleInputChange}
              placeholder="Location, venue name, city/state"
              required
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
              className="font-inconsolata text-brown-one mb-2"
              style={{ fontSize: fontSizes.bodyMedium }}
            >
              I&apos;m Interested In *
            </h3>
            
            

            <div className="space-y-4">
              {[
                { key: "wedding", label: "Be My Wedding Photographer" },
                { key: "engagements", label: "Engagements / Couples" },
                { key: "family", label: "Family" },
                { key: "newborn", label: "Newborn" },
                { key: "maternity", label: "Maternity" },
                { key: "events", label: "Events" },
              ].map(({ key, label }) => {
                const isChecked = formData.interests[key as keyof typeof formData.interests];
                const selectedCount = Object.values(formData.interests).filter(Boolean).length;
                const isDisabled = isSubmitting || (!isChecked && selectedCount >= 3);
                
                return (
                  <label
                    key={key}
                    className={`flex items-center cursor-pointer group ${isDisabled ? 'cursor-not-allowed' : ''}`}
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleCheckboxChange(key)}
                        disabled={isDisabled}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 border-2 border-brown-one transition-colors rounded-sm ${
                          isChecked
                            ? "bg-brown-one"
                            : "bg-beige-one"
                        } ${isDisabled ? "opacity-50 border-brown-one/30" : ""}`}
                      ></div>
                    </div>
                    <span
                      className={`ml-3 font-inconsolata text-brown-one transition-colors ${
                        isDisabled 
                          ? "opacity-50 text-brown-one/50" 
                          : "group-hover:text-brown-two"
                      }`}
                      style={{ fontSize: fontSizes.bodySmall }}
                    >
                      {label}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Mail Illustration */}
          <div className="absolute top-8 -right-4 md:right-0 scale-80 md:scale-100">
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
            className="bg-brown-two text-beige-two border-none px-6 md:px-8 py-3 rounded-[50%] font-inconsolata font-medium cursor-pointer transition-all duration-300 hover:bg-brown-one min-w-[140px] disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              fontSize: fontSizes.buttonText,
            }}
          >
            {isSubmitting ? "SENDING..." : "SUBMIT"}
          </button>
        </div>
      </form>
    </>
  );
};

export default BookingFormClient;
