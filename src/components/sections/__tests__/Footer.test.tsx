import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '../Footer';

// Mock Next.js Link component
jest.mock('next/link', () => {
  return function MockLink({ children, href, ...props }: any) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

// Mock scrollIntoView
const mockScrollIntoView = jest.fn();
Object.defineProperty(Element.prototype, 'scrollIntoView', {
  value: mockScrollIntoView,
  writable: true,
});

describe('Footer Component', () => {
  beforeEach(() => {
    mockScrollIntoView.mockClear();
  });

  it('renders footer with company information', () => {
    render(<Footer />);
    
    expect(screen.getByText('Landing Page Service')).toBeInTheDocument();
    expect(screen.getByText(/Professional landing pages built with React/)).toBeInTheDocument();
  });

  it('displays all contact methods with correct links', () => {
    render(<Footer />);
    
    // Check email contact
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('hello@landingpageservice.com')).toBeInTheDocument();
    const emailLink = screen.getByRole('link', { name: 'hello@landingpageservice.com' });
    expect(emailLink).toHaveAttribute('href', 'mailto:hello@landingpageservice.com');

    // Check phone contact
    expect(screen.getByText('Phone')).toBeInTheDocument();
    expect(screen.getByText('+972-50-123-4567')).toBeInTheDocument();
    const phoneLink = screen.getByRole('link', { name: '+972-50-123-4567' });
    expect(phoneLink).toHaveAttribute('href', 'tel:+972501234567');

    // Check WhatsApp contact
    expect(screen.getByText('WhatsApp')).toBeInTheDocument();
    const whatsappLinks = screen.getAllByText('+972-50-123-4567');
    const whatsappLink = whatsappLinks.find(link => 
      link.closest('a')?.href.includes('wa.me')
    );
    expect(whatsappLink).toBeInTheDocument();
    expect(whatsappLink?.closest('a')).toHaveAttribute('target', '_blank');
    expect(whatsappLink?.closest('a')).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('includes legal links with correct hrefs', () => {
    render(<Footer />);
    
    const termsLink = screen.getByRole('link', { name: 'Terms of Service' });
    expect(termsLink).toHaveAttribute('href', '/terms-of-service');
    
    const privacyLink = screen.getByRole('link', { name: 'Privacy Policy' });
    expect(privacyLink).toHaveAttribute('href', '/privacy-policy');
  });

  it('displays current year in copyright', () => {
    render(<Footer />);
    
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`© ${currentYear} Landing Page Service. All rights reserved.`)).toBeInTheDocument();
  });

  it('includes legal compliance information', () => {
    render(<Footer />);
    
    expect(screen.getByText(/Business registration:/)).toBeInTheDocument();
    expect(screen.getByText(/This website uses cookies/)).toBeInTheDocument();
  });

  it('renders CTA buttons with correct functionality', () => {
    // Mock getElementById
    const mockContactElement = { scrollIntoView: mockScrollIntoView };
    const mockPortfolioElement = { scrollIntoView: mockScrollIntoView };
    
    jest.spyOn(document, 'getElementById').mockImplementation((id) => {
      if (id === 'contact') return mockContactElement as any;
      if (id === 'portfolio') return mockPortfolioElement as any;
      return null;
    });

    render(<Footer />);
    
    const quoteButton = screen.getByRole('button', { name: 'Get Instant Quote' });
    const portfolioButton = screen.getByRole('button', { name: 'View Portfolio' });
    
    expect(quoteButton).toBeInTheDocument();
    expect(portfolioButton).toBeInTheDocument();

    // Test quote button click
    fireEvent.click(quoteButton);
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });

    // Test portfolio button click
    fireEvent.click(portfolioButton);
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('applies custom className when provided', () => {
    const { container } = render(<Footer className="custom-footer-class" />);
    
    const footer = container.querySelector('footer');
    expect(footer).toHaveClass('custom-footer-class');
  });

  it('has proper responsive layout classes', () => {
    const { container } = render(<Footer />);
    
    const footer = container.querySelector('footer');
    expect(footer).toHaveClass('py-12', 'px-4', 'sm:px-6', 'lg:px-8');
    
    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3');
  });

  it('includes RTL support classes', () => {
    render(<Footer />);
    
    // Check for RTL space classes
    const contactMethods = screen.getByText('Contact Us').closest('div');
    const rtlElements = contactMethods?.querySelectorAll('.rtl\\:space-x-reverse');
    expect(rtlElements?.length).toBeGreaterThan(0);
  });

  it('renders all contact method icons', () => {
    render(<Footer />);
    
    // Check that SVG icons are present
    const svgElements = screen.getAllByRole('img', { hidden: true });
    expect(svgElements.length).toBeGreaterThanOrEqual(3); // At least 3 icons for contact methods
  });

  it('has proper accessibility attributes', () => {
    render(<Footer />);
    
    // Check that links have proper accessibility
    const whatsappLink = screen.getByRole('link', { name: /WhatsApp/ });
    expect(whatsappLink).toHaveAttribute('rel', 'noopener noreferrer');
    
    // Check that buttons are properly labeled
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toHaveAccessibleName();
    });
  });

  it('handles missing DOM elements gracefully', () => {
    // Mock getElementById to return null
    jest.spyOn(document, 'getElementById').mockReturnValue(null);

    render(<Footer />);
    
    const quoteButton = screen.getByRole('button', { name: 'Get Instant Quote' });
    
    // Should not throw error when element is not found
    expect(() => fireEvent.click(quoteButton)).not.toThrow();
  });
});