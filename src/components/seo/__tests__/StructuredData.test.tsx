import React from 'react';
import { render } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import { StructuredData } from '../StructuredData';

// Mock Next.js Script component
vi.mock('next/script', () => ({
  default: ({ children, dangerouslySetInnerHTML, ...props }: any) => {
    if (dangerouslySetInnerHTML) {
      return <script {...props} dangerouslySetInnerHTML={dangerouslySetInnerHTML} />;
    }
    return <script {...props}>{children}</script>;
  },
}));

describe('StructuredData', () => {
  it('renders organization structured data by default', () => {
    const { container } = render(<StructuredData />);
    const script = container.querySelector('script[type="application/ld+json"]');
    
    expect(script).toBeInTheDocument();
    
    const structuredData = JSON.parse(script?.innerHTML || '[]');
    expect(structuredData).toHaveLength(1);
    expect(structuredData[0]['@type']).toBe('Organization');
    expect(structuredData[0].name).toBe('Landing Page Service');
  });

  it('renders service structured data when type is service', () => {
    const { container } = render(<StructuredData type="service" />);
    const script = container.querySelector('script[type="application/ld+json"]');
    
    expect(script).toBeInTheDocument();
    
    const structuredData = JSON.parse(script?.innerHTML || '[]');
    expect(structuredData).toHaveLength(3); // organization, service, faq
    
    const serviceData = structuredData.find((item: any) => item['@type'] === 'Service');
    expect(serviceData).toBeDefined();
    expect(serviceData.name).toBe('Landing Page Development Service');
    expect(serviceData.hasOfferCatalog.itemListElement).toHaveLength(3);
  });

  it('renders webpage structured data when type is webpage', () => {
    const { container } = render(<StructuredData type="webpage" />);
    const script = container.querySelector('script[type="application/ld+json"]');
    
    expect(script).toBeInTheDocument();
    
    const structuredData = JSON.parse(script?.innerHTML || '[]');
    expect(structuredData).toHaveLength(2); // organization, webpage
    
    const webPageData = structuredData.find((item: any) => item['@type'] === 'WebPage');
    expect(webPageData).toBeDefined();
    expect(webPageData.name).toBe('Landing Page Service | Professional Next.js Development');
  });

  it('includes FAQ structured data for service type', () => {
    const { container } = render(<StructuredData type="service" />);
    const script = container.querySelector('script[type="application/ld+json"]');
    
    const structuredData = JSON.parse(script?.innerHTML || '[]');
    const faqData = structuredData.find((item: any) => item['@type'] === 'FAQPage');
    
    expect(faqData).toBeDefined();
    expect(faqData.mainEntity).toHaveLength(4);
    expect(faqData.mainEntity[0]['@type']).toBe('Question');
  });

  it('includes proper pricing information in service data', () => {
    const { container } = render(<StructuredData type="service" />);
    const script = container.querySelector('script[type="application/ld+json"]');
    
    const structuredData = JSON.parse(script?.innerHTML || '[]');
    const serviceData = structuredData.find((item: any) => item['@type'] === 'Service');
    
    const offers = serviceData.hasOfferCatalog.itemListElement;
    expect(offers[0].price).toBe('1900');
    expect(offers[0].priceCurrency).toBe('ILS');
    expect(offers[1].price).toBe('3200');
    expect(offers[2].price).toBe('5400');
  });

  it('includes contact information in organization data', () => {
    const { container } = render(<StructuredData />);
    const script = container.querySelector('script[type="application/ld+json"]');
    
    const structuredData = JSON.parse(script?.innerHTML || '[]');
    const orgData = structuredData[0];
    
    expect(orgData.contactPoint).toBeDefined();
    expect(orgData.contactPoint.availableLanguage).toEqual(['English', 'Hebrew']);
    expect(orgData.address.addressCountry).toBe('IL');
  });
});