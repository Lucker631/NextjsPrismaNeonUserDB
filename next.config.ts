import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  "env":{
    POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL
  }
  /* config options here */
};

export default nextConfig;
