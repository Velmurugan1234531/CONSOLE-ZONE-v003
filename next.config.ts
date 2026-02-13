import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // @ts-ignore
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: '/admin/dashboard',
        destination: '/admin/selling',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
