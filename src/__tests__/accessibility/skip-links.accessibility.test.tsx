import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { SkipLinks } from '@/components/accessibility/SkipLinks';

expect.extend(toHaveNoViolations);

// Mock scrollIntoView and focus
Object.defineProperty(Element.prototype, 'scrollIntoView', {
  value: vi.fn(),
  writable: true,
});

Object.defineProperty(HTMLElement.prototype, 'focus', {
  value: vi.fn(),
  writable: true,
});

describe('SkipLinks Accessibility', () => {
  beforeEach(() => {
    // Mock target elements
    const mockElement = {
      scrollIntoView: vi.fn(),
      focus: vi.fn(),
      hasAttribute: vi.fn().mockReturnValue(false),
      setAttribute: vi.fn(),
      removeAttribute: vi.fn(),
      getAttribute: vi.fn().mockReturnValue(null),
    };
    
    vi.spyOn(document, 'querySelector').mockReturnValue(mockElement as any);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should not have accessibility violations', async () => {
    const { container } = render(<SkipLinks />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should render default skip links', () => {
    render(<SkipLinks />);
    
    expect(screen.getByRole('link', { name: 'Skip to main content' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Skip to navigation' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Skip to contact form' })).toBeInTheDocument();
  });

  it('should render custom skip links', () => {
    const customLinks = [
      { href: '#header', label: 'Skip to header' },
      { href: '#footer', label: 'Skip to footer' },
    ];
    
    render(<SkipLinks links={customLinks} />);
    
    expect(screen.getByRole('link', { name: 'Skip to header' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Skip to footer' })).toBeInTheDocument();
  });

  it('should be visually hidden by default', () => {
    render(<SkipLinks />);
    
    const skipLink = screen.getByRole('link', { name: 'Skip to main content' });
    expect(skipLink).toHaveClass('absolute');
    expect(skipLink).toHaveClass('left-[-10000px]');
    expect(skipLink).toHaveClass('w-[1px]');
    expect(skipLink).toHaveClass('h-[1px]');
    expect(skipLink).toHaveClass('overflow-hidden');
  });

  it('should become visible when focused', () => {
    render(<SkipLinks />);
    
    const skipLink = screen.getByRole('link', { name: 'Skip to main content' });
    expect(skipLink).toHaveClass('focus:left-4');
    expect(skipLink).toHaveClass('focus:top-4');
    expect(skipLink).toHaveClass('focus:w-auto');
    expect(skipLink).toHaveClass('focus:h-auto');
    expect(skipLink).toHaveClass('focus:overflow-visible');
  });

  it('should be focusable with keyboard', async () => {
    const user = userEvent.setup();
    render(<SkipLinks />);
    
    const skipLink = screen.getByRole('link', { name: 'Skip to main content' });
    
    await user.tab();
    expect(skipLink).toHaveFocus();
  });

  it('should navigate to target when clicked', async () => {
    const user = userEvent.setup();
    render(<SkipLinks />);
    
    const skipLink = screen.getByRole('link', { name: 'Skip to main content' });
    
    await user.click(skipLink);
    
    expect(document.querySelector).toHaveBeenCalledWith('#main-content');
  });

  it('should navigate to target when activated with Enter', async () => {
    const user = userEvent.setup();
    render(<SkipLinks />);
    
    const skipLink = screen.getByRole('link', { name: 'Skip to main content' });
    skipLink.focus();
    
    await user.keyboard('{Enter}');
    
    expect(document.querySelector).toHaveBeenCalledWith('#main-content');
  });

  it('should make target focusable if not already', async () => {
    const user = userEvent.setup();
    const mockElement = {
      scrollIntoView: jest.fn(),
      focus: jest.fn(),
      hasAttribute: jest.fn().mockReturnValue(false),
      setAttribute: jest.fn(),
      removeAttribute: jest.fn(),
      getAttribute: jest.fn().mockReturnValue(null),
    };
    
    vi.spyOn(document, 'querySelector').mockReturnValue(mockElement as any);
    
    render(<SkipLinks />);
    
    const skipLink = screen.getByRole('link', { name: 'Skip to main content' });
    await user.click(skipLink);
    
    expect(mockElement.setAttribute).toHaveBeenCalledWith('tabindex', '-1');
    expect(mockElement.focus).toHaveBeenCalled();
    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start'
    });
  });

  it('should have proper styling when focused', () => {
    render(<SkipLinks />);
    
    const skipLink = screen.getByRole('link', { name: 'Skip to main content' });
    
    // Check focus styles
    expect(skipLink).toHaveClass('focus:z-[9999]');
    expect(skipLink).toHaveClass('focus:px-4');
    expect(skipLink).toHaveClass('focus:py-2');
    expect(skipLink).toHaveClass('focus:bg-primary');
    expect(skipLink).toHaveClass('focus:text-primary-foreground');
    expect(skipLink).toHaveClass('focus:rounded-md');
    expect(skipLink).toHaveClass('focus:shadow-lg');
  });

  it('should have smooth transitions', () => {
    render(<SkipLinks />);
    
    const skipLink = screen.getByRole('link', { name: 'Skip to main content' });
    expect(skipLink).toHaveClass('transition-all');
    expect(skipLink).toHaveClass('duration-200');
    expect(skipLink).toHaveClass('ease-in-out');
  });

  it('should be positioned above all other content when focused', () => {
    render(<SkipLinks />);
    
    const skipLink = screen.getByRole('link', { name: 'Skip to main content' });
    expect(skipLink).toHaveClass('focus:fixed');
    expect(skipLink).toHaveClass('focus:z-[9999]');
  });

  it('should handle multiple skip links in tab order', async () => {
    const user = userEvent.setup();
    render(<SkipLinks />);
    
    const skipLinks = screen.getAllByRole('link');
    
    // First skip link should be focused first
    await user.tab();
    expect(skipLinks[0]).toHaveFocus();
    
    // Second skip link should be focused next
    await user.tab();
    expect(skipLinks[1]).toHaveFocus();
    
    // Third skip link should be focused next
    await user.tab();
    expect(skipLinks[2]).toHaveFocus();
  });
});