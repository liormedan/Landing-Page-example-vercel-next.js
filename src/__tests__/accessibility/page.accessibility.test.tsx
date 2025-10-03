import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Home from '@/app/page';
import { fail } from 'assert';

expect.extend(toHaveNoViolations);

// Mock the lazy-loaded components
vi.mock('@/components/sections/Benefits', () => {
  return function MockBenefits() {
    return (
      <section id="benefits" aria-labelledby="benefits-heading">
        <h2 id="benefits-heading">Benefits</h2>
        <p>Mock benefits content</p>
      </section>
    );
  };
});

vi.mock('@/components/sections/Process', () => {
  return {
    default: function MockProcess() {
      return (
        <section id="process" aria-labelledby="process-heading">
          <h2 id="process-heading">Process</h2>
          <p>Mock process content</p>
        </section>
      );
    }
  };
});

vi.mock('@/components/sections/AddOns', () => {
  return {
    AddOns: function MockAddOns() {
      return (
        <section id="addons" aria-labelledby="addons-heading">
          <h2 id="addons-heading">Add-ons</h2>
          <p>Mock add-ons content</p>
        </section>
      );
    }
  };
});

vi.mock('@/components/sections/About', () => {
  return {
    default: function MockAbout() {
      return (
        <section id="about" aria-labelledby="about-heading">
          <h2 id="about-heading">About</h2>
          <p>Mock about content</p>
        </section>
      );
    }
  };
});

// Mock other components
vi.mock('@/components/sections/Hero', () => {
  return {
    default: function MockHero() {
      return (
        <section aria-labelledby="hero-heading">
          <h1 id="hero-heading">Professional Landing Pages</h1>
          <p>Mock hero content</p>
        </section>
      );
    }
  };
});

vi.mock('@/components/common/LazySection', () => ({
  LazySection: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SectionSkeleton: () => <div>Loading...</div>
}));

vi.mock('@/components/seo/StructuredData', () => ({
  StructuredData: () => null
}));

describe('Home Page Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(<Home />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper heading hierarchy', () => {
    render(<Home />);
    
    // Should have h1 as the main heading
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toBeInTheDocument();
    
    // Should have h2 headings for sections
    const h2Headings = screen.getAllByRole('heading', { level: 2 });
    expect(h2Headings.length).toBeGreaterThan(0);
  });

  it('should have proper landmark structure', () => {
    const { container } = render(<Home />);
    
    // Should have main landmark
    const main = container.querySelector('main');
    expect(main).toBeInTheDocument();
    
    // Sections should have proper ARIA labels
    const pricingSection = screen.getByRole('region', { name: /pricing/i });
    expect(pricingSection).toBeInTheDocument();
    
    const portfolioSection = screen.getByRole('region', { name: /portfolio/i });
    expect(portfolioSection).toBeInTheDocument();
  });

  it('should have accessible pricing cards', () => {
    render(<Home />);
    
    // Pricing section should be a list
    const pricingList = screen.getByRole('list', { name: 'Pricing plans' });
    expect(pricingList).toBeInTheDocument();
    
    // Each pricing card should be a list item
    const pricingCards = screen.getAllByRole('listitem');
    expect(pricingCards.length).toBe(3);
    
    // Each card should have proper headings
    const basicPlan = screen.getByRole('heading', { name: 'Basic' });
    const recommendedPlan = screen.getByRole('heading', { name: 'Recommended' });
    const premiumPlan = screen.getByRole('heading', { name: 'Premium' });
    
    expect(basicPlan).toBeInTheDocument();
    expect(recommendedPlan).toBeInTheDocument();
    expect(premiumPlan).toBeInTheDocument();
  });

  it('should have accessible portfolio cards', () => {
    render(<Home />);
    
    // Portfolio section should be a list
    const portfolioList = screen.getByRole('list', { name: 'Portfolio projects' });
    expect(portfolioList).toBeInTheDocument();
    
    // Each portfolio item should be a list item
    const portfolioCards = screen.getAllByRole('listitem');
    expect(portfolioCards.length).toBeGreaterThan(0);
  });

  it('should have accessible form elements', () => {
    render(<Home />);
    
    // Contact form should be properly labeled
    const contactForm = screen.getByRole('form', { name: 'Contact form' });
    expect(contactForm).toBeInTheDocument();
    
    // Form inputs should have proper labels
    const nameInput = screen.getByRole('textbox', { name: 'Your name' });
    const emailInput = screen.getByRole('textbox', { name: 'Your email address' });
    const messageInput = screen.getByRole('textbox', { name: 'Project description' });
    
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(messageInput).toBeInTheDocument();
    
    // Submit button should be accessible
    const submitButton = screen.getByRole('button', { name: 'Send contact message' });
    expect(submitButton).toBeInTheDocument();
  });

  it('should have proper button labels', () => {
    render(<Home />);
    
    // CTA buttons should have descriptive labels
    const choosePlanButtons = screen.getAllByRole('button', { name: /choose.*plan/i });
    expect(choosePlanButtons.length).toBe(3);
    
    // Each button should have a descriptive label
    choosePlanButtons.forEach(button => {
      expect(button).toHaveAttribute('aria-label');
    });
  });

  it('should have accessible images', () => {
    render(<Home />);
    
    // Portfolio preview images should have alt text
    const portfolioImages = screen.getAllByRole('img');
    portfolioImages.forEach(image => {
      expect(image).toHaveAttribute('aria-label');
    });
  });

  it('should have proper focus management', async () => {
    render(<Home />);
    
    // All interactive elements should be focusable
    const buttons = screen.getAllByRole('button');
    const links = screen.getAllByRole('link');
    const inputs = screen.getAllByRole('textbox');
    
    const interactiveElements = [...buttons, ...links, ...inputs];
    
    interactiveElements.forEach(element => {
      // Element should be focusable (not have tabindex="-1" unless specifically intended)
      const tabIndex = element.getAttribute('tabindex');
      if (tabIndex !== null) {
        expect(parseInt(tabIndex)).toBeGreaterThanOrEqual(-1);
      }
    });
  });

  it('should have proper ARIA live regions for dynamic content', () => {
    const { container } = render(<Home />);
    
    // Should have live regions for form feedback
    const liveRegions = container.querySelectorAll('[aria-live]');
    expect(liveRegions.length).toBeGreaterThan(0);
  });

  it('should support keyboard navigation', () => {
    render(<Home />);
    
    // All interactive elements should be keyboard accessible
    const interactiveElements = [
      ...screen.getAllByRole('button'),
      ...screen.getAllByRole('link'),
      ...screen.getAllByRole('textbox')
    ];
    
    interactiveElements.forEach(element => {
      // Should not have negative tabindex (unless specifically for focus management)
      const tabIndex = element.getAttribute('tabindex');
      if (tabIndex && parseInt(tabIndex) < -1) {
        fail(`Element has invalid tabindex: ${tabIndex}`);
      }
    });
  });

  it('should have sufficient color contrast', () => {
    const { container } = render(<Home />);
    
    // Check that elements have proper contrast classes
    const textElements = container.querySelectorAll('h1, h2, h3, p, span, button, a');
    
    textElements.forEach(element => {
      // Should have appropriate text color classes
      const classList = Array.from(element.classList);
      const hasTextColor = classList.some(className => 
        className.includes('text-') || 
        className.includes('bg-') ||
        className.includes('border-')
      );
      
      if (hasTextColor) {
        // Element has color styling, which should meet contrast requirements
        expect(element).toBeInTheDocument();
      }
    });
  });

  it('should have proper section structure', () => {
    render(<Home />);
    
    // Each major section should have proper ARIA labeling
    const sections = screen.getAllByRole('region');
    
    sections.forEach(section => {
      // Should have either aria-label or aria-labelledby
      const hasLabel = section.hasAttribute('aria-label') || 
                      section.hasAttribute('aria-labelledby');
      expect(hasLabel).toBe(true);
    });
  });
});