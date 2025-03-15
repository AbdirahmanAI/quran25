'use client';

import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AudioProvider } from '@/lib/audio-context';
import { FontProvider } from '@/lib/font-context';
import { useEffect } from 'react';
import { preloadResources } from '@/lib/utils/performance';
import { addSecurityHeaders } from '@/lib/utils/security';

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const initializeApp = async () => {
      // Initialize core features
      preloadResources();
      addSecurityHeaders();
    };

    initializeApp();
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
            {children}
            <Toaster />
          </TooltipProvider>
        </FontProvider>
      </AudioProvider>
    </ThemeProvider>
  );
}