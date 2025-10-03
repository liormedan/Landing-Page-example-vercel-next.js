import React from 'react';
import Script from 'next/script';

interface StructuredDataProps {
  type?: 'organization' | 'service' | 'webpage';
}

export function StructuredData({ type = 'organization' }: StructuredDataProps) {
  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Landing Page Service',
    description: 'Professional landing page development service using React, Next.js, and Vercel',
    url: 'https://landingpageservice.com',
    logo: 'https://landingpageservice.com/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+972-XX-XXX-XXXX',
      contactType: 'Customer Service',
      availableLanguage: ['English', 'Hebrew'],
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IL',
      addressLocality: 'Israel',
    },
    sameAs: [
      'https://linkedin.com/company/landingpageservice',
      'https://github.com/landingpageservice',
    ],
    foundingDate: '2024',
    numberOfEmployees: '1-10',
    knowsAbout: [
      'Web Development',
      'React Development',
      'Next.js Development',
      'Landing Page Design',
      'RTL Support',
      'Hebrew Websites',
      'Vercel Deployment',
    ],
  };

  const serviceData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Landing Page Development Service',
    description: 'Professional landing page development using React, Next.js, and Vercel with fast delivery and modern design',
    provider: {
      '@type': 'Organization',
      name: 'Landing Page Service',
      url: 'https://landingpageservice.com',
    },
    serviceType: 'Web Development',
    areaServed: {
      '@type': 'Country',
      name: 'Israel',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Landing Page Packages',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Basic Landing Page',
            description: 'Landing Page, Mobile Responsive, Basic SEO',
          },
          price: '1900',
          priceCurrency: 'ILS',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Recommended Landing Page',
            description: 'Everything in Basic + Contact Forms, Analytics, RTL Support',
          },
          price: '3200',
          priceCurrency: 'ILS',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Premium Landing Page',
            description: 'Everything in Recommended + A/B Testing, CRM Integration, Premium Support',
          },
          price: '5400',
          priceCurrency: 'ILS',
        },
      ],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '47',
      bestRating: '5',
      worstRating: '1',
    },
  };

  const webPageData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Landing Page Service | Professional Next.js Development',
    description: 'Professional landing page development service using React, Next.js, and Vercel. Fast delivery, modern design, RTL support, and performance optimization.',
    url: 'https://landingpageservice.com',
    mainEntity: {
      '@type': 'Organization',
      name: 'Landing Page Service',
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://landingpageservice.com',
        },
      ],
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'h2', '.hero-description'],
    },
  };

  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How long does it take to create a landing page?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Typically, we deliver a complete landing page within 5 working days, including design, development, and deployment.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you provide RTL support for Hebrew websites?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we specialize in RTL (Right-to-Left) support for Hebrew and Arabic websites, ensuring proper layout and typography.',
        },
      },
      {
        '@type': 'Question',
        name: 'What technologies do you use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We use modern technologies including React, Next.js, Tailwind CSS, and deploy on Vercel for optimal performance and reliability.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I own the code after completion?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, you receive full ownership of the code and all assets upon project completion and final payment.',
        },
      },
    ],
  };

  let structuredData;
  switch (type) {
    case 'service':
      structuredData = [organizationData, serviceData, faqData];
      break;
    case 'webpage':
      structuredData = [organizationData, webPageData];
      break;
    default:
      structuredData = organizationData;
  }

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(Array.isArray(structuredData) ? structuredData : [structuredData]),
      }}
    />
  );
}