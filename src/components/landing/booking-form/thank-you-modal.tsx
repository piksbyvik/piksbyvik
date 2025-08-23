"use client";
import React from "react";
import Image from "next/image";

interface ThankYouModalProps {
  customerName: string;
  onClose: () => void;
}

const ThankYouModal: React.FC<ThankYouModalProps> = ({ customerName, onClose }) => {
  // Format today's date as DD / MM / YYYY
  const today = new Date();
  const formattedDate = `${today.getDate().toString().padStart(2, '0')} / ${(today.getMonth() + 1).toString().padStart(2, '0')} / ${today.getFullYear()}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4">
      <div className="relative w-full max-w-3xl bg-[#403528] p-8 shadow-xl rounded-md">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Left side - Image */}
          <div className="w-full md:w-2/5">
            <div className="relative h-full min-h-[250px] md:min-h-0 overflow-hidden rounded">
              <Image 
                src="/wedding-bride.jpg" 
                alt="Wedding photo" 
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="w-full md:w-3/5 text-white">
            {/* Header */}
            <h2 className="font-la-belle-aurore text-2xl md:text-3xl mb-4">
              Light&apos;s Camera
              <br />
              Let&apos;s Do This
            </h2>

            {/* Date */}
            <div className="flex justify-between items-center mb-6 border-b border-gray-400 pb-2">
              <span className="font-inconsolata">TO :</span>
              <span className="font-la-belle-aurore text-xl">{customerName} ❤</span>
            </div>
            <div className="flex justify-between items-center mb-6 border-b border-gray-400 pb-2">
              <span className="font-inconsolata">DATE :</span>
              <span className="font-inconsolata">{formattedDate}</span>
            </div>

            {/* Message */}
            <p className="font-inconsolata text-sm leading-relaxed mb-6">
              Every person has a story. I would love for your photos
              to be the pages - tangible memories to cherish and pass
              down, evoking wonder with every glance. I promise to
              bring my best work, investing fully in your dream and
              tapping into my deepest creativity. You can expect
              intentionality, connection, friendship, a foundation of
              faith, and authenticity from me. I am excited to learn
              more about your vision for our time working together!
            </p>

            {/* Signature */}
            <div className="flex items-center">
              <span className="text-white mr-2">❤</span>
              <span className="font-la-belle-aurore text-2xl">Victoria</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouModal;
