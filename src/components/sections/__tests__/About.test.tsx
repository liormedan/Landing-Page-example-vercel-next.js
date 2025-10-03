import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import About from '../About';

describe('About Component', () => {
  it('renders the section with correct id', () => {
    render(<About />);
    
    const section = document.querySelector('#about');
    expect(section).toBeInTheDocument();
  });

  it('displays the main heading and subheading', () => {
    render(<About />);
    
    expect(screen.getByText('Unique Expertise for')).toBeInTheDocument();
    expect(screen.getByText('Exceptional Results')).toBeInTheDocument();
    expect(screen.getByText('About Me')).toBeInTheDocument();
  });

  it('renders the main description paragraph', () => {
    render(<About />);
    
    const description = screen.getByText(/I bring a rare combination of technical precision/);
    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent('audio engineering and modern web development expertise');
  });

  it('displays all 5 expertise points with correct titles', () => {
    render(<About />);
    
    const expertiseTitles = [
      'Full-Stack Development',
      'Audio Engineering Background',
      'RTL & Internationalization',
      'Performance Optimization',
      'Personal Approach'
    ];

    expertiseTitles.forEach(title => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it('renders expertise point descriptions', () => {
    render(<About />);
    
    expect(screen.getByText(/Expert in React, Next.js, and modern web technologies/)).toBeInTheDocument();
    expect(screen.getByText(/Unique combination of technical precision from audio engineering/)).toBeInTheDocument();
    expect(screen.getByText(/Specialized expertise in Hebrew\/Arabic RTL layouts/)).toBeInTheDocument();
    expect(screen.getByText(/Obsessed with Core Web Vitals, loading speeds/)).toBeInTheDocument();
    expect(screen.getByText(/Direct communication, attention to detail/)).toBeInTheDocument();
  });

  it('displays the personal approach section with correct headings', () => {
    render(<About />);
    
    expect(screen.getByText('Why This Unique Background Matters')).toBeInTheDocument();
    expect(screen.getByText('Audio Engineering Precision')).toBeInTheDocument();
    expect(screen.getByText('RTL Development Expertise')).toBeInTheDocument();
  });

  it('renders personal approach descriptions', () => {
    render(<About />);
    
    expect(screen.getByText(/Years of audio engineering taught me obsessive attention to detail/)).toBeInTheDocument();
    expect(screen.getByText(/Living and working in Israel, I understand the nuances/)).toBeInTheDocument();
  });

  it('displays all credibility indicators', () => {
    render(<About />);
    
    const credibilityTexts = [
      '50+ successful projects delivered',
      '5-star client satisfaction rating',
      'Specialized in Hebrew/RTL development',
      'Average 95+ PageSpeed scores'
    ];

    credibilityTexts.forEach(text => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  it('renders the proven track record section', () => {
    render(<About />);
    
    expect(screen.getByText('Proven Track Record')).toBeInTheDocument();
  });

  it('displays the personal quote and signature', () => {
    render(<About />);
    
    const quote = screen.getByText(/I don't just build websites – I craft digital experiences/);
    expect(quote).toBeInTheDocument();
    expect(quote).toHaveTextContent('Every project gets my personal attention');
    
    expect(screen.getByText('Alex')).toBeInTheDocument();
    expect(screen.getByText('Landing Page Specialist')).toBeInTheDocument();
  });

  it('has proper responsive grid layouts', () => {
    render(<About />);
    
    // Expertise points grid
    const expertiseGrid = document.querySelector('.grid.md\\:grid-cols-2.lg\\:grid-cols-3');
    expect(expertiseGrid).toBeInTheDocument();
    
    // Credibility indicators grid
    const credibilityGrid = document.querySelector('.grid.sm\\:grid-cols-2.lg\\:grid-cols-4');
    expect(credibilityGrid).toBeInTheDocument();
  });

  it('applies correct styling classes to main elements', () => {
    render(<About />);
    
    const section = document.querySelector('#about');
    expect(section).toHaveClass('py-20', 'lg:py-32', 'bg-white');
    
    const mainHeading = screen.getByText('Unique Expertise for');
    expect(mainHeading).toHaveClass('text-3xl', 'sm:text-4xl', 'lg:text-5xl', 'font-bold');
    
    const blueText = screen.getByText('Exceptional Results');
    expect(blueText).toHaveClass('text-blue-600');
  });

  it('renders expertise cards with hover effects', () => {
    render(<About />);
    
    const expertiseCards = document.querySelectorAll('.bg-gray-50.rounded-xl.p-6.hover\\:shadow-lg');
    expect(expertiseCards).toHaveLength(5);
  });

  it('displays the gradient background section', () => {
    render(<About />);
    
    const gradientSection = document.querySelector('.bg-gradient-to-r.from-blue-50.to-purple-50');
    expect(gradientSection).toBeInTheDocument();
  });

  it('renders the personal avatar with correct styling', () => {
    render(<About />);
    
    const avatar = document.querySelector('.w-12.h-12.bg-gradient-to-r.from-blue-600.to-purple-600.rounded-full');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveTextContent('A');
  });

  it('has proper semantic structure with headings hierarchy', () => {
    render(<About />);
    
    // Check heading levels
    const h2 = screen.getByRole('heading', { level: 2, name: /Unique Expertise for/ });
    expect(h2).toBeInTheDocument();
    
    const h3Elements = screen.getAllByRole('heading', { level: 3 });
    expect(h3Elements.length).toBeGreaterThan(0);
    
    const h4Elements = screen.getAllByRole('heading', { level: 4 });
    expect(h4Elements).toHaveLength(2); // Audio Engineering Precision and RTL Development Expertise
  });

  it('renders all required icons for expertise points', () => {
    render(<About />);
    
    // Check that SVG icons are present (Lucide icons render as SVGs)
    const svgIcons = document.querySelectorAll('svg');
    expect(svgIcons.length).toBeGreaterThan(8); // At least 5 expertise + 4 credibility icons
  });

  it('has proper accessibility attributes', () => {
    render(<About />);
    
    const section = document.querySelector('#about');
    expect(section).toHaveAttribute('id', 'about');
    
    // Check that all text content is properly structured
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(5);
  });

  it('displays content in correct order', () => {
    render(<About />);
    
    const allText = document.body.textContent;
    
    // Check order of main sections
    const aboutMeIndex = allText?.indexOf('About Me') || 0;
    const expertiseIndex = allText?.indexOf('Full-Stack Development') || 0;
    const backgroundIndex = allText?.indexOf('Why This Unique Background Matters') || 0;
    const trackRecordIndex = allText?.indexOf('Proven Track Record') || 0;
    const quoteIndex = allText?.indexOf('I don\'t just build websites') || 0;
    
    expect(aboutMeIndex).toBeLessThan(expertiseIndex);
    expect(expertiseIndex).toBeLessThan(backgroundIndex);
    expect(backgroundIndex).toBeLessThan(trackRecordIndex);
    expect(trackRecordIndex).toBeLessThan(quoteIndex);
  });
});