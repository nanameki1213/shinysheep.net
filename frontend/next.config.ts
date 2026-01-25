import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        // Strapiの画像(uploads)もこのプロキシを通るようにする
        source: '/api-proxy/:path*',
        destination: 'http://strapi:1337/:path*',
      },
    ];
  },
};

export default nextConfig;
