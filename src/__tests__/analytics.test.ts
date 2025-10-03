import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';

// Mock environment before importing analytics
Object.defineProperty(globalThis, 'window', {
  value: {
    gtag: vi.fn(),
    localStorage: {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    },
    dataLayer: [],
  },
  writable: true,
});

import { analytics, consentManager, initGA, trackEvent } from '@/lib/analytics';

// Get references to the mocked functions
const mockGtag = globalThis.window.gtag as any;
const mockLocalStorage = globalThis.window.localStorage as any;

describe('Analytics Library', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    globalThis.window.dataLayer = [];
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = 'G-TEST123';
    
    // Reset window.gtag
    globalThis.window.gtag = mockGtag;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('trackEvent', () => {
    it('should call gtag with correct parameters', () => {
      const eventData = {
        action: 'test_action',
        category: 'test_category',
        label: 'test_label',
        value: 100,
        custom_parameters: { custom_param: 'test' },
      };

      trackEvent(eventData);

      expect(mockGtag).toHaveBeenCalledWith('event', 'test_action', {
        event_category: 'test_category',
        event_label: 'test_label',
        value: 100,
        custom_param: 'test',
      });
    });

    it('should not call gtag when GA_MEASUREMENT_ID is not set', () => {
      process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = '';
      
      trackEvent({
        action: 'test_action',
        category: 'test_category',
      });

      expect(mockGtag).not.toHaveBeenCalled();
    });

    it('should not call gtag when window.gtag is not available', () => {
      globalThis.window.gtag = undefined as any;
      
      trackEvent({
        action: 'test_action',
        category: 'test_category',
      });

      expect(mockGtag).not.toHaveBeenCalled();
    });
  });

  describe('analytics.trackCTAClick', () => {
    it('should track CTA clicks with correct parameters', () => {
      analytics.trackCTAClick('Get Started', 'hero');

      expect(mockGtag).toHaveBeenCalledWith('event', 'cta_click', {
        event_category: 'engagement',
        event_label: 'Get Started - hero',
        button_text: 'Get Started',
        button_location: 'hero',
      });
    });
  });

  describe('analytics.trackFormStart', () => {
    it('should track form start with correct parameters', () => {
      analytics.trackFormStart('contact');

      expect(mockGtag).toHaveBeenCalledWith('event', 'form_start', {
        event_category: 'form',
        event_label: 'contact',
        form_name: 'contact',
      });
    });
  });

  describe('analytics.trackFormSubmit', () => {
    it('should track successful form submission', () => {
      analytics.trackFormSubmit('contact', true);

      expect(mockGtag).toHaveBeenCalledWith('event', 'form_submit_success', {
        event_category: 'form',
        event_label: 'contact',
        form_name: 'contact',
        success: true,
      });
    });

    it('should track failed form submission', () => {
      analytics.trackFormSubmit('contact', false);

      expect(mockGtag).toHaveBeenCalledWith('event', 'form_submit_error', {
        event_category: 'form',
        event_label: 'contact',
        form_name: 'contact',
        success: false,
      });
    });
  });

  describe('analytics.trackPackageSelect', () => {
    it('should track package selection with correct parameters', () => {
      analytics.trackPackageSelect('Premium', '₪5,400');

      expect(mockGtag).toHaveBeenCalledWith('event', 'package_select', {
        event_category: 'conversion',
        event_label: 'Premium',
        value: 5400,
        package_name: 'Premium',
        package_price: '₪5,400',
      });
    });

    it('should extract numeric value from price string', () => {
      analytics.trackPackageSelect('Basic', '₪1,900');

      expect(mockGtag).toHaveBeenCalledWith('event', 'package_select', {
        event_category: 'conversion',
        event_label: 'Basic',
        value: 1900,
        package_name: 'Basic',
        package_price: '₪1,900',
      });
    });
  });

  describe('analytics.trackPortfolioView', () => {
    it('should track portfolio view with correct parameters', () => {
      analytics.trackPortfolioView('SaaS Platform');

      expect(mockGtag).toHaveBeenCalledWith('event', 'portfolio_view', {
        event_category: 'engagement',
        event_label: 'SaaS Platform',
        project_name: 'SaaS Platform',
      });
    });
  });

  describe('analytics.trackFAQExpand', () => {
    it('should track FAQ expansion with correct parameters', () => {
      const question = 'How long does it take?';
      analytics.trackFAQExpand(question);

      expect(mockGtag).toHaveBeenCalledWith('event', 'faq_expand', {
        event_category: 'engagement',
        event_label: question,
        faq_question: question,
      });
    });
  });

  describe('analytics.trackSectionView', () => {
    it('should track section view with correct parameters', () => {
      analytics.trackSectionView('pricing');

      expect(mockGtag).toHaveBeenCalledWith('event', 'section_view', {
        event_category: 'engagement',
        event_label: 'pricing',
        section_name: 'pricing',
      });
    });
  });

  describe('analytics.trackContactMethod', () => {
    it('should track contact method selection', () => {
      analytics.trackContactMethod('whatsapp');

      expect(mockGtag).toHaveBeenCalledWith('event', 'contact_method_select', {
        event_category: 'engagement',
        event_label: 'whatsapp',
        contact_method: 'whatsapp',
      });
    });
  });

  describe('analytics.trackExternalLink', () => {
    it('should track external link clicks', () => {
      analytics.trackExternalLink('https://example.com', 'View Live Site');

      expect(mockGtag).toHaveBeenCalledWith('event', 'external_link_click', {
        event_category: 'engagement',
        event_label: 'View Live Site',
        link_url: 'https://example.com',
        link_text: 'View Live Site',
      });
    });
  });
});

describe('Consent Manager', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('hasConsent', () => {
    it('should return true when consent is granted', () => {
      mockLocalStorage.getItem.mockReturnValue('granted');
      
      const result = consentManager.hasConsent();
      
      expect(result).toBe(true);
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith('analytics_consent');
    });

    it('should return false when consent is denied', () => {
      mockLocalStorage.getItem.mockReturnValue('denied');
      
      const result = consentManager.hasConsent();
      
      expect(result).toBe(false);
    });

    it('should return false when no consent is stored', () => {
      mockLocalStorage.getItem.mockReturnValue(null);
      
      const result = consentManager.hasConsent();
      
      expect(result).toBe(false);
    });
  });

  describe('grantConsent', () => {
    it('should store consent and update gtag', () => {
      consentManager.grantConsent();

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('analytics_consent', 'granted');
      expect(mockGtag).toHaveBeenCalledWith('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'denied',
      });
    });
  });

  describe('denyConsent', () => {
    it('should store denial and update gtag', () => {
      consentManager.denyConsent();

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('analytics_consent', 'denied');
      expect(mockGtag).toHaveBeenCalledWith('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
      });
    });
  });

  describe('initConsent', () => {
    it('should initialize consent with granted status', () => {
      mockLocalStorage.getItem.mockReturnValue('granted');
      
      consentManager.initConsent();

      expect(mockGtag).toHaveBeenCalledWith('consent', 'default', {
        analytics_storage: 'granted',
        ad_storage: 'denied',
        wait_for_update: 500,
      });
    });

    it('should initialize consent with denied status', () => {
      mockLocalStorage.getItem.mockReturnValue('denied');
      
      consentManager.initConsent();

      expect(mockGtag).toHaveBeenCalledWith('consent', 'default', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        wait_for_update: 500,
      });
    });

    it('should default to denied when no consent is stored', () => {
      mockLocalStorage.getItem.mockReturnValue(null);
      
      consentManager.initConsent();

      expect(mockGtag).toHaveBeenCalledWith('consent', 'default', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        wait_for_update: 500,
      });
    });
  });
});