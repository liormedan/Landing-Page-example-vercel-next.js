import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { getDirection } from '@/lib/utils';
import { Navigation } from '@/components/layout';
import { StructuredData } from '@/components/seo/StructuredData';
import { AnalyticsProvider } from '@/components/analytics';
import { PerformanceProvider } from '@/components/performance/PerformanceProvider';
import { ResourcePreloader, defaultCriticalResources, defaultPrefetchPages } from '@/components/performance/ResourcePreloader';
import { SkipLinks } from '@/components/accessibility/SkipLinks';
import { LanguageProvider } from '@/components/providers/LanguageProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Landing Page Service | Professional Next.js Development',
    template: '%s | Landing Page Service'
  },
  description:
    'Professional landing page development service using React, Next.js, and Vercel. Fast delivery, modern design, RTL support, and performance optimization. Get your landing page in 5 working days.',
  keywords: [
    'landing page development',
    'Next.js development',
    'React development',
    'Vercel deployment',
    'web development service',
    'RTL support',
    'Hebrew website',
    'responsive design',
    'SEO optimization',
    'fast delivery',
    'professional web design',
    'landing page service',
  ],
  authors: [{ name: 'Landing Page Service', url: 'https://landingpageservice.com' }],
  creator: 'Landing Page Service',
  publisher: 'Landing Page Service',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['he_IL'],
    url: 'https://landingpageservice.com',
    siteName: 'Landing Page Service',
    title: 'Landing Page Service | Professional Next.js Development',
    description:
      'Professional landing page development service using React, Next.js, and Vercel. Fast delivery, modern design, RTL support, and performance optimization. Get your landing page in 5 working days.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Landing Page Service - Professional Next.js Development',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@landingpageservice',
    creator: '@landingpageservice',
    title: 'Landing Page Service | Professional Next.js Development',
    description:
      'Professional landing page development service using React, Next.js, and Vercel. Fast delivery, modern design, RTL support, and performance optimization.',
    images: ['/twitter-image.jpg'],
  },
  alternates: {
    canonical: 'https://landingpageservice.com',
    languages: {
      'en-US': 'https://landingpageservice.com',
      'he-IL': 'https://landingpageservice.com/he',
    },
  },
  category: 'Web Development Services',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="scroll-smooth">
      <head>
        <StructuredData type="organization" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased min-h-screen bg-background text-foreground`}
      >
        <LanguageProvider>
          <AnalyticsProvider>
            <PerformanceProvider>
              <SkipLinks />
              <ResourcePreloader 
                criticalResources={defaultCriticalResources}
                prefetchPages={defaultPrefetchPages}
              />
              <Navigation />
              <main id="main-content" className="relative" tabIndex={-1}>
                {children}
              </main>
            </PerformanceProvider>
          </AnalyticsProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
