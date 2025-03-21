'use client';

import { AppProviders } from '../providers/app-providers';
import { Toaster } from '@/components/ui/toaster';
import CookieConsent from '@/components/cookie-consent';
import Header from '@/components/header';
import Footer from '@/components/footer';

export function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProviders>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster />
        <CookieConsent />
      </div>
    </AppProviders>
  );
}