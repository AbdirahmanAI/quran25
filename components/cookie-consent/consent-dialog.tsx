'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import type { CookieConsent } from '@/lib/utils/cookies';

interface ConsentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialConsent?: CookieConsent | null;
  onConsent: (consent: CookieConsent) => void;
}

export default function ConsentDialog({ open, onOpenChange, initialConsent, onConsent }: ConsentDialogProps) {
  const [consent, setConsent] = useState<CookieConsent>({
    necessary: true,
    marketing: initialConsent?.marketing || false,
    preferences: initialConsent?.preferences || false,
    timestamp: new Date().toISOString()
  });

  const handleAcceptAll = () => {
    const newConsent: CookieConsent = {
      ...consent,
      marketing: true,
      preferences: true
    };
    onConsent(newConsent);
    onOpenChange(false);
  };

  const handleSave = () => {
    onConsent(consent);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cookie Preferences</DialogTitle>
          <DialogDescription>
            Manage your cookie preferences. Some cookies are necessary for the website to function and cannot be disabled.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Necessary Cookies */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium">Necessary Cookies</Label>
              <p className="text-sm text-muted-foreground">Required for the website to function properly.</p>
            </div>
            <Switch checked disabled />
          </div>

          {/* Marketing Cookies */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium">Marketing Cookies</Label>
              <p className="text-sm text-muted-foreground">Used to deliver personalized content.</p>
            </div>
            <Switch
              checked={consent.marketing}
              onCheckedChange={(checked) =>
                setConsent(prev => ({ ...prev, marketing: checked }))
              }
            />
          </div>

          {/* Preference Cookies */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium">Preference Cookies</Label>
              <p className="text-sm text-muted-foreground">Remember your preferences and settings.</p>
            </div>
            <Switch
              checked={consent.preferences}
              onCheckedChange={(checked) =>
                setConsent(prev => ({ ...prev, preferences: checked }))
              }
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button variant="secondary" onClick={handleSave}>
            Save Preferences
          </Button>
          <Button onClick={handleAcceptAll}>
            Accept All
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}