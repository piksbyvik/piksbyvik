import type { Metadata } from "next";
import {
  Inconsolata,
  Instrument_Serif,
  La_Belle_Aurore,
} from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/shared/navbar";

const inconsolata = Inconsolata({
  variable: "--font-inconsolata",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const laBelleAurore = La_Belle_Aurore({
  variable: "--font-la-belle-aurore",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const domaineDisplay = localFont({
  src: [
    {
      path: "../../public/fonts/test-domaine-display-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/test-domaine-display-regular-italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/test-domaine-display-medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/test-domaine-display-medium-italic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../public/fonts/test-domaine-display-semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/test-domaine-display-semibold-italic.woff2",
      weight: "600",
      style: "italic",
    },
  ],
  variable: "--font-domaine-display",
  display: "swap",
});

const travelNovember = localFont({
  src: "../../public/fonts/Travel-November.otf",
  variable: "--font-travel-november",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Victoria - Wedding Photography",
  description:
    "Vintage-inspired wedding photography capturing timeless moments",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inconsolata.variable} ${instrumentSerif.variable} ${laBelleAurore.variable} ${domaineDisplay.variable} ${travelNovember.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
