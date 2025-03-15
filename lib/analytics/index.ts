// Client-side analytics implementation
import { SITE_CONFIG } from '@/lib/constants';

interface AnalyticsEvent {
  type: string;
  data?: Record<string, any>;
  timestamp: number;
}

class Analytics {
  private static instance: Analytics;
  private queue: AnalyticsEvent[] = [];
  private isProcessing = false;

  private constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => this.flush());
    }
  }

  public static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics();
    }
    return Analytics.instance;
  }

  public track(type: string, data?: Record<string, any>) {
    const event: AnalyticsEvent = {
      type,
      data,
      timestamp: Date.now()
    };

    // For static export, send directly to GA
    if (SITE_CONFIG.analytics.enabled && typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', type, {
        ...data,
        timestamp: event.timestamp
      });
    } else {
      this.queue.push(event);
    }
  }

  private async flush() {
    if (this.queue.length > 0) {
      // Clear queue before unload
      this.queue = [];
    }
  }
}

export const analytics = Analytics.getInstance();