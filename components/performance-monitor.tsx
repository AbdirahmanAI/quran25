'use client';

import { useEffect } from 'react';

interface PerformanceMetrics {
  timeToFirstByte: number;
  timeToFirstPaint: number;
  timeToFirstContentfulPaint: number;
  domContentLoaded: number;
  windowLoaded: number;
}

export default function PerformanceMonitor() {
  useEffect(() => {
    const collectMetrics = (): PerformanceMetrics => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paint = performance.getEntriesByType('paint');
      const firstPaint = paint.find(entry => entry.name === 'first-paint');
      const firstContentfulPaint = paint.find(entry => entry.name === 'first-contentful-paint');

      return {
        timeToFirstByte: navigation.responseStart - navigation.requestStart,
        timeToFirstPaint: firstPaint?.startTime || 0,
        timeToFirstContentfulPaint: firstContentfulPaint?.startTime || 0,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.startTime,
        windowLoaded: navigation.loadEventEnd - navigation.startTime,
      };
    };

    const logMetrics = () => {
      const metrics = collectMetrics();
      console.debug('Performance metrics:', metrics);
    };

    window.addEventListener('load', logMetrics);
    return () => window.removeEventListener('load', logMetrics);
  }, []);

  return null;
} 