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
  preload: false,
  fallback: ['monospace']
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  preload: false,
  fallback: ['serif']
});

const laBelleAurore = La_Belle_Aurore({
  variable: "--font-la-belle-aurore",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  preload: false,
  fallback: ['cursive']
});

const domaineDisplay = localFont({
  src: [
    {
      path: "../../public/fonts/test-domaine-display-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/test-domaine-display-medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/test-domaine-display-semibold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-domaine-display",
  display: "swap",
  preload: false,
  fallback: ['serif']
});

const travelNovember = localFont({
  src: "../../public/fonts/Travel-November.otf",
  variable: "--font-travel-november",
  display: "swap",
  preload: false,
  fallback: ['cursive']
});

export const metadata: Metadata = {
  title: {
    default: "PiksByVik - Wedding | Lifestyle Photography",
    template: "%s | PiksByVik"
  },
  description: "Vintage-inspired wedding photography capturing timeless moments. Based in New York, serving couples worldwide with authentic, editorial-style photography.",
  keywords: ["wedding photography", "lifestyle photography", "New York photographer", "vintage photography", "editorial photography", "couples photography"],
  authors: [{ name: "Victoria", url: "https://www.piksbyvikphotography.com" }],
  creator: "Victoria - PiksByVik",
  publisher: "PiksByVik",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.piksbyvikphotography.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'PiksByVik - Wedding | Lifestyle Photography',
    description: 'Vintage-inspired wedding photography capturing timeless moments. Based in Long Island, New York, serving couples worldwide.',
    siteName: 'PiksByVik',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'PiksByVik - Wedding Photography',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PiksByVik - Wedding | Lifestyle Photography',
    description: 'Vintage-inspired wedding photography capturing timeless moments',
    images: ['/og-image.jpg'],
    creator: '@piksbyvik',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico", sizes: "48x48" }
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#5bbad5" }
    ]
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/hero-1.webp" as="image" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <meta name="apple-mobile-web-app-title" content="PiksByVik" />
        <meta name="application-name" content="PiksByVik" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#f3eadb" />
      </head>
      <body
        className={`${inconsolata.variable} ${instrumentSerif.variable} ${laBelleAurore.variable} ${domaineDisplay.variable} ${travelNovember.variable} antialiased`}
      >
        <main className="max-w-[2200px]">
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
}
