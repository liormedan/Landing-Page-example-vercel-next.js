import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import Benefits from '../Benefits';

// Mock the utils module
vi.mock('@/lib/utils', () => ({
  cn: (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' ')
}));

describe('Benefits Component', () => {
  beforeEach(() => {
    render(<Benefits />);
  });

  describe('Section Header', () => {
    it('renders the section badge', () => {
      expect(screen.getByText('Why Vercel?')).toBeInTheDocument();
    });

    it('renders the main heading', () => {
      expect(screen.getByText('Built on the World\'s Fastest Platform')).toBeInTheDocument();
    });

    it('renders the section description', () => {
      expect(screen.getByText(/Your landing page deserves the best infrastructure/)).toBeInTheDocument();
    });
  });

  describe('Benefits Grid', () => {
    it('renders all four benefit cards', () => {
      expect(screen.getByText('Lightning Fast Performance')).toBeInTheDocument();
      expect(screen.getByText('Enterprise-Grade Security')).toBeInTheDocument();
      expect(screen.getByText('Global CDN Distribution')).toBeInTheDocument();
      expect(screen.getByText('Automatic Scaling')).toBeInTheDocument();
    });

    it('renders benefit descriptions', () => {
      expect(screen.getByText(/Vercel's edge network delivers your landing page/)).toBeInTheDocument();
      expect(screen.getByText(/Built-in SSL certificates, DDoS protection/)).toBeInTheDocument();
      expect(screen.getByText(/Your landing page is served from 100\+ edge locations/)).toBeInTheDocument();
      expect(screen.getByText(/Handle traffic spikes effortlessly/)).toBeInTheDocument();
    });

    it('renders performance highlights', () => {
      expect(screen.getByText('< 2.5s LCP')).toBeInTheDocument();
      expect(screen.getByText('99.99% Uptime')).toBeInTheDocument();
      expect(screen.getByText('100+ Locations')).toBeInTheDocument();
      expect(screen.getByText('Infinite Scale')).toBeInTheDocument();
    });

    it('renders benefit icons', () => {
      // Check for SVG elements (icons)
      const svgElements = document.querySelectorAll('svg');
      expect(svgElements.length).toBeGreaterThanOrEqual(4);
    });
  });

  describe('Technology Stack Section', () => {
    it('renders technology section heading', () => {
      expect(screen.getByText('Powered by Modern Technology')).toBeInTheDocument();
    });

    it('renders all technology logos and names', () => {
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('Next.js')).toBeInTheDocument();
      expect(screen.getByText('Tailwind CSS')).toBeInTheDocument();
      expect(screen.getByText('Vercel')).toBeInTheDocument();
    });

    it('renders technology descriptions', () => {
      expect(screen.getByText('Modern UI library')).toBeInTheDocument();
      expect(screen.getByText('Full-stack framework')).toBeInTheDocument();
      expect(screen.getByText('Utility-first CSS')).toBeInTheDocument();
      expect(screen.getByText('Deployment platform')).toBeInTheDocument();
    });

    it('renders technology logos as emojis', () => {
      expect(screen.getByText('⚛️')).toBeInTheDocument();
      expect(screen.getAllByText('▲')).toHaveLength(2); // Next.js and Vercel both use triangle
      expect(screen.getByText('🎨')).toBeInTheDocument();
    });
  });

  describe('Performance Metrics Section', () => {
    it('renders performance metrics heading', () => {
      expect(screen.getByText('Performance That Converts')).toBeInTheDocument();
    });

    it('renders all performance metrics', () => {
      expect(screen.getByText('< 1.5s')).toBeInTheDocument();
      expect(screen.getByText('95+')).toBeInTheDocument();
      expect(screen.getByText('99.99%')).toBeInTheDocument();
    });

    it('renders metric labels', () => {
      expect(screen.getByText('Page Load Speed')).toBeInTheDocument();
      expect(screen.getByText('Performance Score')).toBeInTheDocument();
      expect(screen.getByText('Uptime Guarantee')).toBeInTheDocument();
    });

    it('renders metric descriptions', () => {
      expect(screen.getByText('Average first contentful paint')).toBeInTheDocument();
      expect(screen.getByText('Google Lighthouse score')).toBeInTheDocument();
      expect(screen.getByText('Service level agreement')).toBeInTheDocument();
    });

    it('renders performance disclaimer', () => {
      expect(screen.getByText(/Based on average performance across 1000\+ deployed landing pages/)).toBeInTheDocument();
    });
  });

  describe('Layout and Styling', () => {
    it('has proper section structure', () => {
      const section = document.querySelector('section#benefits');
      expect(section).toBeInTheDocument();
      expect(section).toHaveClass('py-20', 'bg-gradient-to-br', 'from-gray-50', 'to-white');
    });

    it('has responsive grid layout for benefits', () => {
      const benefitsGrid = document.querySelector('.grid.md\\:grid-cols-2');
      expect(benefitsGrid).toBeInTheDocument();
    });

    it('has responsive grid layout for technology stack', () => {
      const techGrid = document.querySelector('.grid.grid-cols-2.md\\:grid-cols-4');
      expect(techGrid).toBeInTheDocument();
    });

    it('has responsive grid layout for performance metrics', () => {
      const metricsGrid = document.querySelector('.grid.md\\:grid-cols-3');
      expect(metricsGrid).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      const h2 = screen.getByRole('heading', { level: 2 });
      expect(h2).toHaveTextContent('Built on the World\'s Fastest Platform');
      
      const h3Elements = screen.getAllByRole('heading', { level: 3 });
      expect(h3Elements.length).toBeGreaterThanOrEqual(2);
    });

    it('has proper section landmark', () => {
      const section = document.querySelector('section#benefits');
      expect(section).toBeInTheDocument();
    });

    it('has descriptive text for all visual elements', () => {
      // All benefits should have descriptive text
      expect(screen.getByText(/Vercel's edge network delivers/)).toBeInTheDocument();
      expect(screen.getByText(/Built-in SSL certificates/)).toBeInTheDocument();
      expect(screen.getByText(/Your landing page is served from/)).toBeInTheDocument();
      expect(screen.getByText(/Handle traffic spikes effortlessly/)).toBeInTheDocument();
    });
  });

  describe('Content Requirements Compliance', () => {
    it('addresses requirement 2.1 - displays Vercel advantages', () => {
      expect(screen.getByText(/Lightning Fast Performance/)).toBeInTheDocument();
      expect(screen.getByText(/Enterprise-Grade Security/)).toBeInTheDocument();
      expect(screen.getByText(/Global CDN Distribution/)).toBeInTheDocument();
      expect(screen.getByText(/Automatic Scaling/)).toBeInTheDocument();
    });

    it('addresses requirement 2.2 - shows technology logos', () => {
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('Next.js')).toBeInTheDocument();
      expect(screen.getByText('Tailwind CSS')).toBeInTheDocument();
      expect(screen.getByText('Vercel')).toBeInTheDocument();
    });

    it('addresses requirement 2.3 - provides technical details without overwhelming', () => {
      // Technical details are present but explained in user-friendly terms
      expect(screen.getByText(/edge network/)).toBeInTheDocument();
      expect(screen.getByText(/serverless architecture/)).toBeInTheDocument();
      expect(screen.getByText(/SSL certificates/)).toBeInTheDocument();
      
      // User-friendly explanations are provided
      expect(screen.getByText(/delivers your landing page in milliseconds/)).toBeInTheDocument();
      expect(screen.getByText(/scales from zero to millions of visitors/)).toBeInTheDocument();
    });
  });
});