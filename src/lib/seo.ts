import { Metadata } from 'next';

interface SEOConfig {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  noIndex?: boolean;
  ogImage?: string;
  twitterImage?: string;
}

export function generateSEOMetadata({
  title,
  description,
  keywords = [],
  canonical,
  noIndex = false,
  ogImage = '/og-image.jpg',
  twitterImage = '/twitter-image.jpg',
}: SEOConfig = {}): Metadata {
  const baseUrl = 'https://landingpageservice.com';
  const defaultTitle = 'Landing Page Service | Professional Next.js Development';
  const defaultDescription = 'Professional landing page development service using React, Next.js, and Vercel. Fast delivery, modern design, RTL support, and performance optimization.';
  
  const seoTitle = title ? `${title} | Landing Page Service` : defaultTitle;
  const seoDescription = description || defaultDescription;
  
  const defaultKeywords = [
    'landing page development',
    'Next.js development',
    'React development',
    'Vercel deployment',
    'web development service',
    'RTL support',
    'Hebrew website',
    'responsive design',
    'SEO optimization',
  ];

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: [...defaultKeywords, ...keywords],
    robots: noIndex ? 'noindex, nofollow' : 'index, follow',
    alternates: {
      canonical: canonical || baseUrl,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: canonical || baseUrl,
      siteName: 'Landing Page Service',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: seoTitle,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: [twitterImage],
      creator: '@landingpageservice',
    },
  };
}

export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateArticleStructuredData({
  headline,
  description,
  author,
  datePublished,
  dateModified,
  image,
  url,
}: {
  headline: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Landing Page Service',
      logo: {
        '@type': 'ImageObject',
        url: 'https://landingpageservice.com/logo.png',
      },
    },
    datePublished,
    dateModified: dateModified || datePublished,
    image: image ? [image] : undefined,
    url,
  };
}

export const seoConstants = {
  siteName: 'Landing Page Service',
  baseUrl: 'https://landingpageservice.com',
  defaultOGImage: '/og-image.jpg',
  defaultTwitterImage: '/twitter-image.jpg',
  twitterHandle: '@landingpageservice',
  author: 'Landing Page Service',
  locale: 'en_US',
  alternateLocale: 'he_IL',
} as const;