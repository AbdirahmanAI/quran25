'use client';

import { useEffect, useState } from 'react';
import type { CookieConsent } from '@/lib/utils/cookies';
import { getConsentCookie } from '@/lib/utils/cookies';
import CookieBanner from './cookie-consent/cookie-banner';
import { initializeAnalytics } from '@/lib/analytics/google-analytics';

export default function CookieConsentManager() {
  const [consent, setConsent] = useState<CookieConsent | null>(null);

  useEffect(() => {
    const storedConsent = getConsentCookie();
    setConsent(storedConsent);

    if (storedConsent?.analytics) {
      initializeAnalytics();
    }
  }, []);

  if (!consent) {
    return <CookieBanner onConsent={setConsent} />;
  }

  return null;
}