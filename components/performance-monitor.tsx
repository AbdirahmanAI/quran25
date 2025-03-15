'use client';

import { useEffect } from 'react';

export function PerformanceMonitor() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            // Send to your analytics service
            const metric = {
              name: entry.name,
              value: entry.startTime,
              duration: 'duration' in entry ? entry.duration : undefined,
              type: entry.entryType,
            };
            
            console.log('[Performance Metric]:', metric);
            
            // Example: Send to Google Analytics
            if (window.gtag) {
              window.gtag('event', 'performance_metric', {
                metric_name: entry.name,
                metric_value: entry.startTime,
                metric_duration: 'duration' in entry ? entry.duration : undefined,
                metric_type: entry.entryType,
              });
            }
          });
        });

        // Observe key performance metrics
        observer.observe({
          entryTypes: [
            'largest-contentful-paint',
            'first-input',
            'layout-shift',
            'longtask',
            'paint',
            'navigation'
          ]
        });

        return () => observer.disconnect();
      } catch (error) {
        console.error('Performance monitoring error:', error);
      }
    }
  }, []);

  return null;
} 