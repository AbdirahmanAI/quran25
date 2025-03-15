/** @type {import('next').NextConfig} */

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  },
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval' *.google-analytics.com *.googletagmanager.com;
      style-src 'self' 'unsafe-inline' fonts.googleapis.com;
      img-src 'self' data: https: blob: *;
      font-src 'self' fonts.gstatic.com;
      connect-src 'self' *.google-analytics.com *.googleapis.com https://everyayah.com https://*.everyayah.com *;
      media-src 'self' https://everyayah.com https://*.everyayah.com https: data: blob: *;
      frame-src 'self';
      worker-src 'self' blob:;
    `.replace(/\s{2,}/g, ' ').trim()
  }
];

const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
  reactStrictMode: true,
  distDir: '.next',
  poweredByHeader: false,
  trailingSlash: true,
  images: {
    domains: ['api.qurancdn.com', 'everyayah.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.qurancdn.com',
      },
      {
        protocol: 'https',
        hostname: 'everyayah.com',
      }
    ]
  },
  experimental: {
    optimizeCss: true
  },
  staticPageGenerationTimeout: 120,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
    NEXT_PUBLIC_ADSENSE_ID: process.env.NEXT_PUBLIC_ADSENSE_ID
  }
};

module.exports = nextConfig;