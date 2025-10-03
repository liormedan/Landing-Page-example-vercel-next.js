'use client';

import { useEffect } from 'react';
import { preloadResource, prefetchPage } from '@/lib/performance';

interface ResourcePreloaderProps {
  criticalResources?: Array<{
    href: string;
    as: string;
    type?: string;
  }>;
  prefetchPages?: string[];
}

/**
 * Component for preloading critical resources and prefetching pages
 */
export function ResourcePreloader({ 
  criticalResources = [],
  prefetchPages = []
}: ResourcePreloaderProps) {
  useEffect(() => {
    // Preload critical resources
    criticalResources.forEach(resource => {
      preloadResource(resource.href, resource.as, resource.type);
    });

    // Prefetch pages after a short delay to avoid blocking critical resources
    const prefetchTimer = setTimeout(() => {
      prefetchPages.forEach(page => {
        prefetchPage(page);
      });
    }, 2000);

    return () => {
      clearTimeout(prefetchTimer);
    };
  }, [criticalResources, prefetchPages]);

  return null; // This component doesn't render anything
}

/**
 * Default critical resources for the landing page
 */
export const defaultCriticalResources = [
  {
    href: '/hero-bg.webp',
    as: 'image',
    type: 'image/webp',
  },
  {
    href: '/fonts/inter-var.woff2',
    as: 'font',
    type: 'font/woff2',
  },
];

/**
 * Default pages to prefetch
 */
export const defaultPrefetchPages = [
  '/contact',
  '/portfolio',
  '/about',
];