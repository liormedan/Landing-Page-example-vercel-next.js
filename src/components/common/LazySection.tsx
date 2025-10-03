'use client';

import { Suspense, lazy, ComponentType } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface LazySectionProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  rootMargin?: string;
  threshold?: number;
  className?: string;
}

/**
 * Lazy loading wrapper for sections that loads content when in viewport
 */
export function LazySection({ 
  children, 
  fallback = <div className="min-h-[200px] flex items-center justify-center">Loading...</div>,
  rootMargin = '100px',
  threshold = 0.1,
  className = ''
}: LazySectionProps) {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    rootMargin,
    threshold,
  });

  return (
    <div ref={elementRef} className={className}>
      {isIntersecting ? (
        <Suspense fallback={fallback}>
          {children}
        </Suspense>
      ) : (
        fallback
      )}
    </div>
  );
}

/**
 * Higher-order component for lazy loading sections
 */
export function withLazyLoading<P extends object>(
  Component: ComponentType<P>,
  fallback?: React.ReactNode,
  options?: {
    rootMargin?: string;
    threshold?: number;
  }
) {
  const LazyComponent = (props: P) => {
    const { elementRef, isIntersecting } = useIntersectionObserver({
      rootMargin: options?.rootMargin || '100px',
      threshold: options?.threshold || 0.1,
    });

    return (
      <div ref={elementRef}>
        {isIntersecting ? (
          <Suspense fallback={fallback || <div className="min-h-[200px]" />}>
            <Component {...props} />
          </Suspense>
        ) : (
          fallback || <div className="min-h-[200px]" />
        )}
      </div>
    );
  };

  LazyComponent.displayName = `withLazyLoading(${Component.displayName || Component.name})`;
  return LazyComponent;
}

/**
 * Skeleton loader for sections
 */
export function SectionSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="space-y-4">
        <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-3">
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}