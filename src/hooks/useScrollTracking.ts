'use client';

import { useEffect, useRef } from 'react';
import { analytics } from '@/lib/analytics';

interface UseScrollTrackingOptions {
  sectionName: string;
  threshold?: number;
  trackOnce?: boolean;
}

export function useScrollTracking({
  sectionName,
  threshold = 0.5,
  trackOnce = true,
}: UseScrollTrackingOptions) {
  const elementRef = useRef<HTMLElement>(null);
  const hasTracked = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
            if (!trackOnce || !hasTracked.current) {
              analytics.trackSectionView(sectionName);
              hasTracked.current = true;
            }
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -10% 0px', // Trigger when section is 10% from bottom of viewport
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [sectionName, threshold, trackOnce]);

  return elementRef;
}