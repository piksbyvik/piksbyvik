export const fontSizes = {
  // Hero section
  heroTitle: "clamp(32px, 5vw, 72px)",
  heroReal: "clamp(28px, 4.5vw, 64px)", 
  heroConnections: "clamp(28px, 4vw, 56px)",
  heroTypewriter: "clamp(16px, 2vw, 20px)",
  heroLocation: "clamp(16px, 1.8vw, 20px)",
  
  // Body text
  bodyLarge: "clamp(18px, 2vw, 24px)",
  bodyMedium: "clamp(16px, 1.8vw, 20px)",
  bodySmall: "clamp(14px, 1.5vw, 18px)",
  
  // UI elements
  buttonText: "clamp(14px, 1.6vw, 16px)",
  navText: "clamp(15px, 1.7vw, 18px)",
  
  // Approach section - Better responsive scaling
  approachTitle: "clamp(32px, 4.5vw, 64px)",
  approachWayIWork: "clamp(32px, 5.5vw, 72px)",
  approachSidebarText: "clamp(24px, 2.2vw, 36px)",
  approachSidebarLabel: "clamp(10px, 1.2vw, 18px)",
  approachCategoryTitle: "clamp(20px, 2.5vw, 40px)",
  approachBodyText: "clamp(14px, 1.6vw, 18px)",
  approachButtonText: "clamp(14px, 1.8vw, 24px)",
  approachQuote: "clamp(16px, 2.2vw, 32px)",
  
  // Testimonial section
  testimonialTitle: "clamp(48px, 8vw, 120px)",
  galleryTitle: "clamp(40px, 4.5vw, 88px)",
} as const;
