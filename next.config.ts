import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      }
    ],
    domains: ['localhost', 'example.com']
  }
};

export default nextConfig;