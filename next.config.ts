import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // liste explicite des qualités que tu veux autoriser
    qualities: [75, 90, 100],
  },
};

export default nextConfig;
