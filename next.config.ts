import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  distDir: process.env.COTU_DEV === "1" ? ".next-local" : ".next",
};

export default nextConfig;
