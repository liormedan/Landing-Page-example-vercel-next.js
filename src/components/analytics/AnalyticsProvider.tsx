'use client';

import { GoogleAnalytics } from './GoogleAnalytics';
import { ConsentBanner } from './ConsentBanner';

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  return (
    <>
      {children}
      <GoogleAnalytics />
      <ConsentBanner />
    </>
  );
}