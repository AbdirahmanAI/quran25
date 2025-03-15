'use client';

import { useEffect, useState } from 'react';
import type { CookieConsent } from '@/lib/utils/cookies';
import { getConsentCookie } from '@/lib/utils/cookies';
import CookieBanner from './cookie-consent/cookie-banner';

export default function CookieConsentManager() {
  const [consent, setConsent] = useState<CookieConsent | null>(null);

  useEffect(() => {
    const storedConsent = getConsentCookie();
    setConsent(storedConsent);
  }, []);

  if (!consent) {
    return <CookieBanner onConsent={setConsent} />;
  }

  return null;
}