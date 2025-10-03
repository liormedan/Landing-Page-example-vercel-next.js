import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Hero from '../Hero';

// Mock scrollIntoView
const mockScrollIntoView = vi.fn();
Object.defineProperty(Element.prototype, 'scrollIntoView', {
  value: mockScrollIntoView,
  writable: true,
});

// Mock getElementById
const mockGetElementById = vi.fn();
Object.defineProperty(document, 'getElementById', {
  value: mockGetElementById,
  writable: true,
});

describe('Hero Component', () => {
  beforeEach(() => {
    mockScrollIntoView.mockClear();
    mockGetElementById.mockClear();
  });

  it('renders the main headline correctly', () => {
    render(<Hero />);
    
    expect(screen.getByText('Professional Landing Pages')).toBeInTheDocument();
    expect(screen.getByText('Built for Results')).toBeInTheDocument();
  });

  it('displays the value proposition', () => {
    render(<Hero />);
    
    const valueProposition = screen.getByText(/Get a high-converting landing page built with React/);
    expect(valueProposition).toBeInTheDocument();
    expect(valueProposition).toHaveTextContent('Fast delivery, RTL support, and performance optimization included.');
  });

  it('renders trust badges with correct icons and text', () => {
    render(<Hero />);
    
    expect(screen.getByText('SSL Secured')).toBeInTheDocument();
    expect(screen.getByText('Fast Delivery')).toBeInTheDocument();
    expect(screen.getByText('Global CDN')).toBeInTheDocument();
  });

  it('displays key benefits', () => {
    render(<Hero />);
    
    expect(screen.getByText('5-day delivery')).toBeInTheDocument();
    expect(screen.getByText('Mobile optimized')).toBeInTheDocument();
    expect(screen.getByText('SEO ready')).toBeInTheDocument();
  });

  it('renders primary and secondary CTA buttons', () => {
    render(<Hero />);
    
    const primaryCTA = screen.getByRole('button', { name: 'Get Instant Quote' });
    const secondaryCTA = screen.getByRole('button', { name: 'View Portfolio' });
    
    expect(primaryCTA).toBeInTheDocument();
    expect(secondaryCTA).toBeInTheDocument();
  });

  it('displays trust indicator text', () => {
    render(<Hero />);
    
    const trustIndicator = screen.getByText(/Trusted by 50\+ businesses/);
    expect(trustIndicator).toBeInTheDocument();
    expect(trustIndicator).toHaveTextContent('No setup fees • 30-day support included');
  });

  it('handles primary CTA click - scrolls to contact section', () => {
    const mockContactElement = { scrollIntoView: mockScrollIntoView };
    mockGetElementById.mockReturnValue(mockContactElement);
    
    render(<Hero />);
    
    const primaryCTA = screen.getByRole('button', { name: 'Get Instant Quote' });
    fireEvent.click(primaryCTA);
    
    expect(mockGetElementById).toHaveBeenCalledWith('contact');
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('handles secondary CTA click - scrolls to portfolio section', () => {
    const mockPortfolioElement = { scrollIntoView: mockScrollIntoView };
    mockGetElementById.mockReturnValue(mockPortfolioElement);
    
    render(<Hero />);
    
    const secondaryCTA = screen.getByRole('button', { name: 'View Portfolio' });
    fireEvent.click(secondaryCTA);
    
    expect(mockGetElementById).toHaveBeenCalledWith('portfolio');
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('handles CTA clicks gracefully when target elements do not exist', () => {
    mockGetElementById.mockReturnValue(null);
    
    render(<Hero />);
    
    const primaryCTA = screen.getByRole('button', { name: 'Get Instant Quote' });
    const secondaryCTA = screen.getByRole('button', { name: 'View Portfolio' });
    
    // Should not throw errors when elements don't exist
    expect(() => {
      fireEvent.click(primaryCTA);
      fireEvent.click(secondaryCTA);
    }).not.toThrow();
    
    expect(mockScrollIntoView).not.toHaveBeenCalled();
  });

  it('has proper responsive classes for mobile and desktop', () => {
    render(<Hero />);
    
    const section = document.querySelector('section');
    expect(section).toHaveClass('py-20', 'lg:py-32');
    
    const headline = screen.getByText('Professional Landing Pages');
    expect(headline).toHaveClass('text-4xl', 'sm:text-5xl', 'lg:text-6xl');
  });

  it('applies correct styling classes', () => {
    render(<Hero />);
    
    const section = document.querySelector('section');
    expect(section).toHaveClass('bg-gradient-to-br', 'from-blue-50', 'to-purple-50');
    
    const headline = screen.getByText('Professional Landing Pages');
    expect(headline).toHaveClass('font-bold', 'text-gray-900', 'leading-tight');
    
    const blueText = screen.getByText('Built for Results');
    expect(blueText).toHaveClass('text-blue-600');
  });

  it('renders background decorative elements', () => {
    render(<Hero />);
    
    const backgroundElements = document.querySelectorAll('.bg-blue-500, .bg-purple-500, .bg-blue-400');
    expect(backgroundElements).toHaveLength(3);
  });
});