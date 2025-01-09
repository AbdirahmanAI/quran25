export const ANALYTICS_CONFIG = {
  enabled: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  debug: process.env.NEXT_PUBLIC_ENABLE_DEBUG === 'true',
  gaId: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_GA_ID : undefined,
  adsenseId: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_ADSENSE_ID : undefined,
  gtmId: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_GTM_ID : undefined, // Add GTM ID
  development: process.env.NODE_ENV === 'development',
} as const;

/**
 * Represents an analytics event to be tracked.
 */
export type AnalyticsEvent = {
  category: string; // The category of the event (e.g., "User", "Navigation").
  action: string;   // The action being tracked (e.g., "Click", "View").
  label?: string;   // Optional label providing additional information.
  value?: number;   // Optional value associated with the event.
};

/**
 * Interface for an analytics service.
 */
export interface AnalyticsService {
  /**
   * Initializes the analytics service.
   */
  initialize(): Promise<void>;

  /**
   * Tracks an analytics event.
   * @param event - The analytics event to track.
   */
  trackEvent(event: AnalyticsEvent): void;

  /**
   * Tracks a page view.
   * @param path - The path of the page being viewed.
   */
  trackPageView(path: string): void;
}
