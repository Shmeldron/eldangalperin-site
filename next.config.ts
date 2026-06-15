import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Cross-fade navigations (home ↔ case study) via the View Transitions API.
    viewTransition: true,
  },
};

export default nextConfig;
