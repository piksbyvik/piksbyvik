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
