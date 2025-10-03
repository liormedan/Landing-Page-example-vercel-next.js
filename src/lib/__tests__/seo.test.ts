import { describe, it, expect } from 'vitest';
import { generateSEOMetadata, generateBreadcrumbStructuredData, generateArticleStructuredData, seoConstants } from '../seo';

describe('SEO utilities', () => {
  describe('generateSEOMetadata', () => {
    it('generates default metadata when no config provided', () => {
      const metadata = generateSEOMetadata();
      
      expect(metadata.title).toBe('Landing Page Service | Professional Next.js Development');
      expect(metadata.description).toContain('Professional landing page development service');
      expect(metadata.keywords).toContain('landing page development');
      expect(metadata.robots).toBe('index, follow');
    });

    it('generates custom metadata when config provided', () => {
      const config = {
        title: 'Custom Page',
        description: 'Custom description',
        keywords: ['custom', 'keywords'],
        canonical: 'https://example.com/custom',
      };
      
      const metadata = generateSEOMetadata(config);
      
      expect(metadata.title).toBe('Custom Page | Landing Page Service');
      expect(metadata.description).toBe('Custom description');
      expect(metadata.keywords).toContain('custom');
      expect(metadata.keywords).toContain('landing page development'); // includes defaults
      expect(metadata.alternates?.canonical).toBe('https://example.com/custom');
    });

    it('sets noindex when specified', () => {
      const metadata = generateSEOMetadata({ noIndex: true });
      
      expect(metadata.robots).toBe('noindex, nofollow');
    });

    it('includes proper Open Graph data', () => {
      const metadata = generateSEOMetadata({ title: 'Test Page' });
      
      expect(metadata.openGraph?.title).toBe('Test Page | Landing Page Service');
      expect(metadata.openGraph?.siteName).toBe('Landing Page Service');
      expect(metadata.openGraph?.locale).toBe('en_US');
      expect(metadata.openGraph?.type).toBe('website');
      expect(metadata.openGraph?.images).toHaveLength(1);
    });

    it('includes proper Twitter Card data', () => {
      const metadata = generateSEOMetadata({ title: 'Test Page' });
      
      expect(metadata.twitter?.card).toBe('summary_large_image');
      expect(metadata.twitter?.title).toBe('Test Page | Landing Page Service');
      expect(metadata.twitter?.creator).toBe('@landingpageservice');
      expect(metadata.twitter?.images).toHaveLength(1);
    });
  });

  describe('generateBreadcrumbStructuredData', () => {
    it('generates proper breadcrumb structured data', () => {
      const items = [
        { name: 'Home', url: 'https://example.com' },
        { name: 'Services', url: 'https://example.com/services' },
        { name: 'Landing Pages', url: 'https://example.com/services/landing-pages' },
      ];
      
      const breadcrumb = generateBreadcrumbStructuredData(items);
      
      expect(breadcrumb['@context']).toBe('https://schema.org');
      expect(breadcrumb['@type']).toBe('BreadcrumbList');
      expect(breadcrumb.itemListElement).toHaveLength(3);
      expect(breadcrumb.itemListElement[0].position).toBe(1);
      expect(breadcrumb.itemListElement[0].name).toBe('Home');
      expect(breadcrumb.itemListElement[2].position).toBe(3);
    });
  });

  describe('generateArticleStructuredData', () => {
    it('generates proper article structured data', () => {
      const config = {
        headline: 'Test Article',
        description: 'Test description',
        author: 'John Doe',
        datePublished: '2024-01-01',
        url: 'https://example.com/article',
      };
      
      const article = generateArticleStructuredData(config);
      
      expect(article['@context']).toBe('https://schema.org');
      expect(article['@type']).toBe('Article');
      expect(article.headline).toBe('Test Article');
      expect(article.author.name).toBe('John Doe');
      expect(article.publisher.name).toBe('Landing Page Service');
      expect(article.datePublished).toBe('2024-01-01');
      expect(article.dateModified).toBe('2024-01-01'); // defaults to datePublished
    });

    it('uses custom dateModified when provided', () => {
      const config = {
        headline: 'Test Article',
        description: 'Test description',
        author: 'John Doe',
        datePublished: '2024-01-01',
        dateModified: '2024-01-02',
        url: 'https://example.com/article',
      };
      
      const article = generateArticleStructuredData(config);
      
      expect(article.dateModified).toBe('2024-01-02');
    });
  });

  describe('seoConstants', () => {
    it('contains all required constants', () => {
      expect(seoConstants.siteName).toBe('Landing Page Service');
      expect(seoConstants.baseUrl).toBe('https://landingpageservice.com');
      expect(seoConstants.twitterHandle).toBe('@landingpageservice');
      expect(seoConstants.locale).toBe('en_US');
      expect(seoConstants.alternateLocale).toBe('he_IL');
    });
  });
});