import { forwardRef } from "react";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  withGrain?: boolean;
  grainOpacity?: number;
}

export const SectionWrapper = forwardRef<HTMLDivElement, SectionWrapperProps>(
  (
    { children, className = "", withGrain = false, grainOpacity = 18 },
    ref
  ) => {
    return (
      <section
        ref={ref}
        className={`relative py-16 lg:py-24 px-[5vw] lg:px-[3.5vw] ${className}`}
      >
        {withGrain && (
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              backgroundImage: "url('/grain.png')",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              opacity: grainOpacity / 100,
            }}
          />
        )}
        <div className="w-full mx-auto relative z-20">{children}</div>
      </section>
    );
  }
);

SectionWrapper.displayName = "SectionWrapper";
