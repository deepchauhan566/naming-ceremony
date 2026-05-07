import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    'localhost:3000',
    '127.0.0.1:3000',
    '192.168.29.91:3000',
    '192.168.29.91',
    '*.ngrok-free.app'
  ],
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
