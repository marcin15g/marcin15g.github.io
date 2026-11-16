import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build a fully static site into ./out for GitHub Pages.
  output: "export",
  // GitHub Pages serves /about/ -> /about/index.html, so emit folders.
  trailingSlash: true,
  // The default image optimizer needs a server; serve images as-is.
  images: { unoptimized: true },
};

export default nextConfig;
