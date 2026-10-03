import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Reverse Proxy configuration:
  // Forward client requests from /api/proxy/:path* to your backend (e.g. Go / NestJS)
  // Eliminates CORS issues during development and production.
  async rewrites() {
    const backendUrl = process.env.BACKEND_API_URL || "http://localhost:8080";
    return [
      {
        source: "/api/proxy/:path*",
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
