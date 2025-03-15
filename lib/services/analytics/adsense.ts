'use client';

'use client';

import { AnalyticsError } from './errors';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

class AdSenseService {
  private static instance: AdSenseService;
  private initialized = false;
  private readonly clientId = 'pub-4289944399243370';
  private initializationPromise: Promise<void> | null = null;

  private constructor() {}

  public static getInstance(): AdSenseService {
    if (!AdSenseService.instance) {
      AdSenseService.instance = new AdSenseService();
    }
    return AdSenseService.instance;
  }

  public async initialize(): Promise<void> {
    // Return existing initialization promise if it exists
    if (this.initializationPromise) {
      return this.initializationPromise;
    }

    // Don't initialize if already initialized or not in browser
    if (this.initialized || typeof window === 'undefined') {
      return Promise.resolve();
    }

    this.initializationPromise = new Promise((resolve, reject) => {
      try {
        // Initialize adsbygoogle only once
        if (!window.adsbygoogle) {
          window.adsbygoogle = [];
        }
        
        // Check if already loaded
        const adsense = window.adsbygoogle as any;
        if (!adsense.loaded) {
          window.adsbygoogle.push({
            google_ad_client: this.clientId,
            enable_page_level_ads: true
          });
          adsense.loaded = true;
        }
        
        this.initialized = true;
        resolve();
      } catch (error) {
        reject(new AnalyticsError('Failed to initialize AdSense', error));
      }
    });

    return this.initializationPromise;
  }

  public isInitialized(): boolean {
    return this.initialized;
  }
}

export const adSenseService = AdSenseService.getInstance();
