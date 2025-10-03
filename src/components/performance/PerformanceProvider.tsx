'use client';

import { useEffect } from 'react';
import { reportWebVital, PerformanceMonitor, preloadResource } from '@/lib/performance';

interface PerformanceProviderProps {
  children: React.ReactNode;
}

/**
 * Provider component for performance monitoring and optimization
 */
export function PerformanceProvider({ children }: PerformanceProviderProps) {
  useEffect(() => {
    // Initialize performance monitoring
    const monitor = PerformanceMonitor.getInstance();

    // Preload critical resources
    preloadResource('/fonts/inter-var.woff2', 'font', 'font/woff2');
    
    // Mark app initialization
    monitor.mark('app-init');

    // Set up Web Vitals reporting
    if (typeof window !== 'undefined') {
      // Dynamic import to avoid SSR issues
      import('web-vitals').then(({ onCLS, onFCP, onFID, onLCP, onTTFB, onINP }) => {
        onCLS(reportWebVital);
        onFCP(reportWebVital);
        onFID(reportWebVital);
        onLCP(reportWebVital);
        onTTFB(reportWebVital);
        onINP(reportWebVital);
      }).catch(() => {
        // Fallback if web-vitals is not available
        console.warn('[Performance] Web Vitals library not available');
      });
    }

    // Cleanup on unmount
    return () => {
      monitor.disconnect();
    };
  }, []);

  return <>{children}</>;
}