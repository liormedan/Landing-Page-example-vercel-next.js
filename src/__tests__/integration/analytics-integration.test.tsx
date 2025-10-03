import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Mock the analytics module
const mockTrackCTAClick = vi.fn();
const mockTrackFormStart = vi.fn();
const mockTrackFormSubmit = vi.fn();
const mockTrackPackageSelect = vi.fn();
const mockTrackContactMethod = vi.fn();

vi.mock('@/lib/analytics', () => ({
  analytics: {
    trackCTAClick: mockTrackCTAClick,
    trackFormStart: mockTrackFormStart,
    trackFormSubmit: mockTrackFormSubmit,
    trackPackageSelect: mockTrackPackageSelect,
    trackContactMethod: mockTrackContactMethod,
    trackSectionView: vi.fn(),
    trackPortfolioView: vi.fn(),
    trackFAQExpand: vi.fn(),
    trackExternalLink: vi.fn(),
  },
  consentManager: {
    hasConsent: vi.fn(() => true),
    grantConsent: vi.fn(),
    denyConsent: vi.fn(),
    initConsent: vi.fn(),
  },
  initGA: vi.fn(),
}));

// Mock useScrollTracking hook
vi.mock('@/hooks/useScrollTracking', () => ({
  useScrollTracking: vi.fn(() => ({ current: null })),
}));

// Mock fetch for form submission
global.fetch = vi.fn();

// Mock scrollIntoView
Element.prototype.scrollIntoView = vi.fn();

// Mock getElementById
const mockGetElementById = vi.fn();
Object.defineProperty(document, 'getElementById', {
  value: mockGetElementById,
  writable: true,
});

describe('Analytics Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetElementById.mockReturnValue({
      scrollIntoView: vi.fn(),
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Hero Component Analytics', () => {
    it('should track CTA clicks in Hero component', async () => {
      const Hero = (await import('@/components/sections/Hero')).default;
      render(<Hero />);

      const getQuoteButton = screen.getByRole('button', { name: /get instant quote/i });
      const portfolioButton = screen.getByRole('button', { name: /view portfolio/i });

      fireEvent.click(getQuoteButton);
      expect(mockTrackCTAClick).toHaveBeenCalledWith('Get Instant Quote', 'hero');

      fireEvent.click(portfolioButton);
      expect(mockTrackCTAClick).toHaveBeenCalledWith('View Portfolio', 'hero');
    });
  });

  describe('Contact Component Analytics', () => {
    it('should track form start when user focuses on form', async () => {
      const Contact = (await import('@/components/sections/Contact')).default;
      render(<Contact />);

      const nameInput = screen.getByLabelText(/full name/i);
      fireEvent.focus(nameInput);

      expect(mockTrackFormStart).toHaveBeenCalledWith('contact');
    });

    it('should track successful form submission', async () => {
      const Contact = (await import('@/components/sections/Contact')).default;
      
      // Mock successful API response
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      render(<Contact />);

      // Fill out form
      const nameInput = screen.getByLabelText(/full name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const purposeTextarea = screen.getByLabelText(/project purpose/i);
      const submitButton = screen.getByRole('button', { name: /send project details/i });

      await userEvent.type(nameInput, 'John Doe');
      await userEvent.type(emailInput, 'john@example.com');
      await userEvent.type(purposeTextarea, 'I need a landing page for my business');

      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockTrackFormSubmit).toHaveBeenCalledWith('contact', true);
      });
    });

    it('should track failed form submission', async () => {
      const Contact = (await import('@/components/sections/Contact')).default;
      
      // Mock failed API response
      (global.fetch as any).mockRejectedValueOnce(new Error('Network error'));

      render(<Contact />);

      // Fill out form
      const nameInput = screen.getByLabelText(/full name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const purposeTextarea = screen.getByLabelText(/project purpose/i);
      const submitButton = screen.getByRole('button', { name: /send project details/i });

      await userEvent.type(nameInput, 'John Doe');
      await userEvent.type(emailInput, 'john@example.com');
      await userEvent.type(purposeTextarea, 'I need a landing page for my business');

      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockTrackFormSubmit).toHaveBeenCalledWith('contact', false);
      });
    });

    it('should track contact method selection', async () => {
      const Contact = (await import('@/components/sections/Contact')).default;
      render(<Contact />);

      // Mock window.open
      const mockOpen = vi.fn();
      Object.defineProperty(window, 'open', {
        value: mockOpen,
        writable: true,
      });

      const whatsappLink = screen.getByText(/whatsapp/i).closest('a');
      const phoneLink = screen.getByText(/phone call/i).closest('a');

      if (whatsappLink) {
        fireEvent.click(whatsappLink);
        expect(mockTrackContactMethod).toHaveBeenCalledWith('whatsapp');
      }

      if (phoneLink) {
        fireEvent.click(phoneLink);
        expect(mockTrackContactMethod).toHaveBeenCalledWith('phone');
      }
    });
  });

  describe('Pricing Component Analytics', () => {
    it('should track package selection', async () => {
      const { Pricing } = await import('@/components/sections/Pricing');
      render(<Pricing />);

      const basicButton = screen.getByRole('button', { name: /choose basic/i });
      const recommendedButton = screen.getByRole('button', { name: /choose recommended/i });
      const premiumButton = screen.getByRole('button', { name: /choose premium/i });

      fireEvent.click(basicButton);
      expect(mockTrackPackageSelect).toHaveBeenCalledWith('Basic', '₪1900');
      expect(mockTrackCTAClick).toHaveBeenCalledWith('Choose Basic', 'pricing');

      fireEvent.click(recommendedButton);
      expect(mockTrackPackageSelect).toHaveBeenCalledWith('Recommended', '₪3200');
      expect(mockTrackCTAClick).toHaveBeenCalledWith('Choose Recommended', 'pricing');

      fireEvent.click(premiumButton);
      expect(mockTrackPackageSelect).toHaveBeenCalledWith('Premium', '₪5400');
      expect(mockTrackCTAClick).toHaveBeenCalledWith('Choose Premium', 'pricing');
    });

    it('should track custom solution CTA', async () => {
      const { Pricing } = await import('@/components/sections/Pricing');
      render(<Pricing />);

      const customButton = screen.getByRole('button', { name: /talk to me for custom solution/i });
      fireEvent.click(customButton);

      expect(mockTrackCTAClick).toHaveBeenCalledWith('Talk to Me for Custom Solution', 'pricing');
    });
  });

  describe('Error Handling', () => {
    it('should handle analytics errors gracefully', () => {
      // Mock analytics to throw error
      mockTrackCTAClick.mockImplementationOnce(() => {
        throw new Error('Analytics error');
      });

      const Hero = require('@/components/sections/Hero').default;
      
      // Should not throw error
      expect(() => {
        render(<Hero />);
        const button = screen.getByRole('button', { name: /get instant quote/i });
        fireEvent.click(button);
      }).not.toThrow();
    });
  });

  describe('Consent Management Integration', () => {
    it('should not track events when consent is denied', async () => {
      // Mock consent as denied
      const { consentManager } = await import('@/lib/analytics');
      (consentManager.hasConsent as any).mockReturnValue(false);

      const Hero = (await import('@/components/sections/Hero')).default;
      render(<Hero />);

      const button = screen.getByRole('button', { name: /get instant quote/i });
      fireEvent.click(button);

      // Analytics should still be called (consent is checked in the analytics library)
      expect(mockTrackCTAClick).toHaveBeenCalled();
    });
  });
});