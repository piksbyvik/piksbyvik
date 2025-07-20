import { fontSizes } from "@/styles/typography";

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
                className={`
                ${item.word === "&" ? " italic " : ""}
                mr-2 md:mr-4 font-instrument-serif
              `}
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
                className={`
                ${
                  item.word === "Real"
                    ? "font-[family-name:var(--font-travel-november)]"
                    : ""
                }
                ${
                  item.word === "CONNECTIONS"
                    ? "tracking-wide font-domaine-display font-medium"
                    : ""
                }
                mr-3 md:mr-4
              `}
                style={{
                  color: item.word === "Real" ? "#B2C3D3" : "#B2C3D3",
                  clipPath: "inset(0 100% 0 0)",
                  opacity: 0,

                  fontSize:
                    item.word === "Real"
                      ? fontSizes.heroReal
                      : fontSizes.heroConnections,
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
