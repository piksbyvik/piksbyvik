import { fontSizes } from "@/styles/typography";
import { cn } from "@/lib/utils";

const headingWords = [
  { word: "CAPTURING", line: 1 },
  { word: "CAPTIVATING", line: 1, special: "captivating" },
  { word: "&", line: 1, special: "and" },
  { word: "Real", line: 2, special: "real" },
  { word: "CONNECTIONS", line: 2, special: "connections" },
];

export function HeadingText() {
  return (
    <h1
      style={{ wordSpacing: "0.2em", color: "#F3EADB" }}
      className="text-[24px] md:text-[48px] order-1 md:order-none"
    >
      <div>
        {/* First line */}
        <div className="flex flex-wrap items-baseline">
          {headingWords
            .filter((item) => item.line === 1)
            .map((item, index) => (
              <span
                key={index}
                data-word
                className={cn(
                  "mr-2 md:mr-[18px]",
                  item.word === "&" ? "italic font-instrument-serif" : "font-domaine-display"
                )}
                style={{
                  color: item.word === "&" ? "#B2C3D3" : "#F3EADB",
                  clipPath: "inset(0 100% 0 0)",
                  opacity: 0,
                  fontSize: fontSizes.heroTitle,
                }}
              >
                {item.word}
              </span>
            ))}
        </div>

        {/* Second line */}
        <div className="flex flex-wrap items-baseline">
          {headingWords
            .filter((item) => item.line === 2)
            .map((item, index) => (
              <span
                key={index + 3}
                data-word
                className={cn(
                  "mr-4 md:mr-[18px]",
                  item.word === "Real" && "font-travel-november leading-tight",
                  item.word === "CONNECTIONS" && "tracking-wide font-domaine-display font-medium leading-tight"
                )}
                style={{
                  color: item.word === "Real" ? "#B2C3D3" : "#B2C3D3",
                  clipPath: "inset(0 100% 0 0)",
                  opacity: 0,
                  fontSize:
                    item.word === "Real"
                      ? fontSizes.heroReal
                      : fontSizes.heroTitle,
                }}
              >
                {item.word}
              </span>
            ))}
        </div>
      </div>
    </h1>
  );
}
