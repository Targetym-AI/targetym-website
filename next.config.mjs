import { securityHeaders } from './lib/site/securityHeaders.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Cloudflare bloque /_next/image en production (403) : les images sont
    // servies directement. À retirer une fois l'exception ajoutée côté Cloudflare.
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'targetym-media.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'targetym-media.s3.eu-west-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'api.targetym.ai',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders({
          apiUrl: process.env.NEXT_PUBLIC_API_URL || 'https://api.targetym.ai',
          isDev: process.env.NODE_ENV !== 'production',
          isPreview: process.env.VERCEL_ENV === 'preview',
        }),
      },
    ];
  },
};

export default nextConfig;
