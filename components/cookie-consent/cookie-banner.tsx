'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import ConsentDialog from './consent-dialog';
import type { CookieConsent } from '@/lib/utils/cookies';

interface CookieBannerProps {
  onConsent: (consent: CookieConsent) => void;
}

export default function CookieBanner({ onConsent }: CookieBannerProps) {
  const [showDialog, setShowDialog] = useState(false);

  const handleAcceptAll = () => {
    onConsent({
      necessary: true,
      marketing: true,
      preferences: true,
      timestamp: new Date().toISOString()
    });
  };

  return (
    <>
      <Card className="fixed bottom-4 left-4 right-4 max-w-lg mx-auto shadow-lg">
        <CardHeader>
          <CardTitle>Cookie Settings</CardTitle>
          <CardDescription>
            We use cookies to enhance your browsing experience and analyze our traffic.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Click "Accept All" to consent to all cookies, or "Customize" to manage your preferences.
          </p>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setShowDialog(true)}>
            Customize
          </Button>
          <Button onClick={handleAcceptAll}>
            Accept All
          </Button>
        </CardFooter>
      </Card>

      <ConsentDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        onConsent={onConsent}
      />
    </>
  );
}