import { fontSizes } from "@/styles/typography";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
}

export function SectionHeading({ title, subtitle, align = "center" }: SectionHeadingProps) {
  return (
    <div className={`text-${align} mb-12 lg:mb-16`} data-fade="section-heading">
      {subtitle && (
        <p 
          className="font-la-belle-aurore text-brown-two mb-4"
          style={{ fontSize: fontSizes.bodyMedium }}
        >
          {subtitle}
        </p>
      )}
      <h2 
        className="font-domaine-display font-medium text-black"
        style={{ fontSize: fontSizes.heroConnections }}
      >
        {title}
      </h2>
    </div>
  );
}
