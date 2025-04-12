import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "encrypted-tbn0.gstatic.com" },
      { protocol: "https", hostname: "pilotcake-us.backendless.app" },
      { protocol: "https", hostname: "res.cloudinary.com"},
      { protocol: "http", hostname: "localhost"}
    ],
  },
};

export default nextConfig;
