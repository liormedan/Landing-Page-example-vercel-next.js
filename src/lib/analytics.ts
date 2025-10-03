// Google Analytics 4 configuration and utilities
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'consent',
      targetId: string | 'default',
      config?: Record<string, any>
    ) => void;
    dataLayer: any[];
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

// Initialize Google Analytics
export const initGA = () => {
  if (!GA_MEASUREMENT_ID) {
    console.warn('Google Analytics Measurement ID not found');
    return;
  }

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  
  // gtag function
  window.gtag = function gtag(...args: any[]) {
    window.dataLayer.push(args);
  };

  // Configure GA4
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_title: document.title,
    page_location: window.location.href,
  });
};

// Event tracking types
export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, any>;
}

// Track custom events
export const trackEvent = ({
  action,
  category,
  label,
  value,
  custom_parameters = {},
}: AnalyticsEvent) => {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined' || !window.gtag) {
    return;
  }

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
    ...custom_parameters,
  });
};

// Predefined event tracking functions
export const analytics = {
  // CTA button clicks
  trackCTAClick: (buttonText: string, location: string) => {
    trackEvent({
      action: 'cta_click',
      category: 'engagement',
      label: `${buttonText} - ${location}`,
      custom_parameters: {
        button_text: buttonText,
        button_location: location,
      },
    });
  },

  // Form interactions
  trackFormStart: (formName: string) => {
    trackEvent({
      action: 'form_start',
      category: 'form',
      label: formName,
      custom_parameters: {
        form_name: formName,
      },
    });
  },

  trackFormSubmit: (formName: string, success: boolean) => {
    trackEvent({
      action: success ? 'form_submit_success' : 'form_submit_error',
      category: 'form',
      label: formName,
      custom_parameters: {
        form_name: formName,
        success: success,
      },
    });
  },

  // Package selection
  trackPackageSelect: (packageName: string, price: string) => {
    trackEvent({
      action: 'package_select',
      category: 'conversion',
      label: packageName,
      value: parseInt(price.replace(/[^\d]/g, '')),
      custom_parameters: {
        package_name: packageName,
        package_price: price,
      },
    });
  },

  // Portfolio interactions
  trackPortfolioView: (projectName: string) => {
    trackEvent({
      action: 'portfolio_view',
      category: 'engagement',
      label: projectName,
      custom_parameters: {
        project_name: projectName,
      },
    });
  },

  // FAQ interactions
  trackFAQExpand: (question: string) => {
    trackEvent({
      action: 'faq_expand',
      category: 'engagement',
      label: question,
      custom_parameters: {
        faq_question: question,
      },
    });
  },

  // Section visibility (scroll tracking)
  trackSectionView: (sectionName: string) => {
    trackEvent({
      action: 'section_view',
      category: 'engagement',
      label: sectionName,
      custom_parameters: {
        section_name: sectionName,
      },
    });
  },

  // Contact method selection
  trackContactMethod: (method: string) => {
    trackEvent({
      action: 'contact_method_select',
      category: 'engagement',
      label: method,
      custom_parameters: {
        contact_method: method,
      },
    });
  },

  // External link clicks
  trackExternalLink: (url: string, linkText: string) => {
    trackEvent({
      action: 'external_link_click',
      category: 'engagement',
      label: linkText,
      custom_parameters: {
        link_url: url,
        link_text: linkText,
      },
    });
  },
};

// Consent management
export const consentManager = {
  // Check if consent has been given
  hasConsent: (): boolean => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('analytics_consent') === 'granted';
  },

  // Grant consent
  grantConsent: () => {
    if (typeof window === 'undefined') return;
    
    localStorage.setItem('analytics_consent', 'granted');
    
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'denied', // We don't use ads
      });
    }
  },

  // Deny consent
  denyConsent: () => {
    if (typeof window === 'undefined') return;
    
    localStorage.setItem('analytics_consent', 'denied');
    
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
      });
    }
  },

  // Initialize consent (called on page load)
  initConsent: () => {
    if (typeof window === 'undefined') return;
    
    const consent = localStorage.getItem('analytics_consent');
    
    if (window.gtag) {
      window.gtag('consent', 'default', {
        analytics_storage: consent === 'granted' ? 'granted' : 'denied',
        ad_storage: 'denied',
        wait_for_update: 500,
      });
    }
  },
};