export const COOKIE_CATEGORIES = {
  NECESSARY: 'necessary',
  ANALYTICS: 'analytics',
  MARKETING: 'marketing',
  PREFERENCES: 'preferences',
} as const;

export const COOKIE_NAMES = {
  CONSENT: 'cookie-consent',
  THEME: 'theme',
  FONT: 'font',
  LANGUAGE: 'language',
  LAST_VISITED: 'last-visited'
} as const;

export const COOKIE_DEFAULTS = {
  path: '/',
  secure: true,
  sameSite: 'lax'
} as const;