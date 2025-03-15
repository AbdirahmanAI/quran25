'use client';

import { ThemeProvider } from '@/components/theme-provider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AudioProvider } from '@/lib/audio-context';
import { FontProvider } from '@/lib/font-context';
import { useEffect } from 'react';
import { Toaster } from '@/components/ui/toaster';
import CookieConsent from '@/components/cookie-consent';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { clearLocalStorageIfNeeded } from '@/lib/utils';
import { Suspense } from 'react';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  useEffect(() => {
    clearLocalStorageIfNeeded();
  }, []);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AudioProvider>
        <FontProvider>
          <TooltipProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1">
                <Suspense fallback={null}>
                  {children}
                </Suspense>
              </main>
              <Footer />
              <CookieConsent />
              <Toaster />
            </div>
          </TooltipProvider>
        </FontProvider>
      </AudioProvider>
    </ThemeProvider>
  );
}