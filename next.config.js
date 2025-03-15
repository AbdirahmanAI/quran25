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
      script-src 'self' 'unsafe-inline' 'unsafe-eval';
      style-src 'self' 'unsafe-inline' fonts.googleapis.com;
      img-src 'self' data: https: blob: *;
      font-src 'self' fonts.gstatic.com;
      connect-src 'self' https://everyayah.com https://*.everyayah.com *;
      media-src 'self' https://everyayah.com https://*.everyayah.com https: data: blob: *;
      frame-src 'self';
      worker-src 'self' blob:;
    `.replace(/\s{2,}/g, ' ').trim()
  }
];

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
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
  reactStrictMode: true,
  distDir: '.next',
  poweredByHeader: false,
  trailingSlash: true,
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@radix-ui/react-icons', 'lucide-react']
  },
  staticPageGenerationTimeout: 300,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  }
};

module.exports = nextConfig;