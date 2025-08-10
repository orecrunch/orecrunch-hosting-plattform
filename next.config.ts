import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    viewTransition: true,
  },
  
  async redirects() {
    return [
      {
        source: '/login',
        destination: '/auth/login',
        permanent: true,
      },
      {
        source: '/app/servers/:id',
        destination: '/app/servers/:id/console',
        permanent: true,
      }
    ]
  }
};

export default nextConfig;
