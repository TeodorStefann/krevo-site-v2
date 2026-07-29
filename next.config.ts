import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/krevo",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
