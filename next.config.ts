import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/**",
      },
    ],
    // Disable ALL Next.js image optimization - Sanity CDN handles everything
    // This prevents Vercel cache write limits from being hit
    unoptimized: true, // No Vercel optimization = no cache writes
     // Cache for 1 year
  },
  webpack: (config: any, { isServer }: { isServer: boolean }) => {
    if (process.env.ANALYZE === "true" && !isServer) {
      const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
      const { StatsWriterPlugin } = require("webpack-stats-plugin");

      // Analyzer report
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: "static",
          openAnalyzer: false,
          reportFilename: "bundle-analyzer-report.html",
        })
      );

      // Raw stats JSON dump
      config.plugins.push(
        new StatsWriterPlugin({
          filename: "stats.json",
          fields: null, // dump everything
        })
      );
    }
    return config;
  },
};

  export default nextConfig;
