import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ConsentBanner } from '@/components/analytics/ConsentBanner';

// Mock the analytics module
vi.mock('@/lib/analytics', () => ({
  consentManager: {
    grantConsent: vi.fn(),
    denyConsent: vi.fn(),
  },
  initGA: vi.fn(),
}));

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
  writable: true,
});

describe('ConsentBanner', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should show banner when no consent is stored', async () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    
    render(<ConsentBanner />);
    
    await waitFor(() => {
      expect(screen.getByText(/We use cookies and analytics/)).toBeInTheDocument();
    });
  });

  it('should not show banner when consent is already stored', async () => {
    mockLocalStorage.getItem.mockReturnValue('granted');
    
    render(<ConsentBanner />);
    
    await waitFor(() => {
      expect(screen.queryByText(/We use cookies and analytics/)).not.toBeInTheDocument();
    });
  });

  it('should handle accept button click', async () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    const { consentManager, initGA } = await import('@/lib/analytics');
    
    render(<ConsentBanner />);
    
    await waitFor(() => {
      expect(screen.getByText(/We use cookies and analytics/)).toBeInTheDocument();
    });

    const acceptButton = screen.getByRole('button', { name: /accept/i });
    fireEvent.click(acceptButton);

    expect(consentManager.grantConsent).toHaveBeenCalled();
    expect(initGA).toHaveBeenCalled();
    
    await waitFor(() => {
      expect(screen.queryByText(/We use cookies and analytics/)).not.toBeInTheDocument();
    });
  });

  it('should handle decline button click', async () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    const { consentManager } = await import('@/lib/analytics');
    
    render(<ConsentBanner />);
    
    await waitFor(() => {
      expect(screen.getByText(/We use cookies and analytics/)).toBeInTheDocument();
    });

    const declineButton = screen.getByRole('button', { name: /decline/i });
    fireEvent.click(declineButton);

    expect(consentManager.denyConsent).toHaveBeenCalled();
    
    await waitFor(() => {
      expect(screen.queryByText(/We use cookies and analytics/)).not.toBeInTheDocument();
    });
  });

  it('should include privacy policy link', async () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    
    render(<ConsentBanner />);
    
    await waitFor(() => {
      const privacyLink = screen.getByRole('link', { name: /privacy policy/i });
      expect(privacyLink).toBeInTheDocument();
      expect(privacyLink).toHaveAttribute('href', '/privacy-policy');
      expect(privacyLink).toHaveAttribute('target', '_blank');
    });
  });

  it('should have proper accessibility attributes', async () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    
    render(<ConsentBanner />);
    
    await waitFor(() => {
      const acceptButton = screen.getByRole('button', { name: /accept/i });
      const declineButton = screen.getByRole('button', { name: /decline/i });
      
      expect(acceptButton).toBeInTheDocument();
      expect(declineButton).toBeInTheDocument();
    });
  });
});