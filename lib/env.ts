// Environment variable validation and typing
export const env = {
  API_BASE: process.env.NEXT_PUBLIC_API_BASE || 'https://api.qurancdn.com/api/qdc',
  AUDIO_BASE: process.env.NEXT_PUBLIC_AUDIO_BASE || 'https://everyayah.com/data',
  STATIC_EXPORT: true, // Force static export
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'https://qurankareem.app',
  BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH || '',
  IS_SERVER: typeof window === 'undefined',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production'
} as const;

// Validate required environment variables
const requiredEnvs = {
  NEXT_PUBLIC_API_BASE: env.API_BASE,
  NEXT_PUBLIC_AUDIO_BASE: env.AUDIO_BASE,
} as const;

Object.entries(requiredEnvs).forEach(([key, value]) => {
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

// Type-safe environment variables
export type Env = typeof env;