import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Process from '../Process';

// Mock Lucide React icons to avoid issues with SVG imports in tests
vi.mock('lucide-react', () => ({
  FileText: ({ className, ...props }: any) => (
    <svg className={className} data-testid="file-text-icon" {...props} />
  ),
  Palette: ({ className, ...props }: any) => (
    <svg className={className} data-testid="palette-icon" {...props} />
  ),
  Code: ({ className, ...props }: any) => (
    <svg className={className} data-testid="code-icon" {...props} />
  ),
  Rocket: ({ className, ...props }: any) => (
    <svg className={className} data-testid="rocket-icon" {...props} />
  ),
  Clock: ({ className, ...props }: any) => (
    <svg className={className} data-testid="clock-icon" {...props} />
  ),
}));

// Mock scrollIntoView
const mockScrollIntoView = vi.fn();
Object.defineProperty(window.HTMLElement.prototype, 'scrollIntoView', {
  configurable: true,
  value: mockScrollIntoView,
});

// Mock getElementById
const mockGetElementById = vi.fn();
Object.defineProperty(document, 'getElementById', {
  configurable: true,
  value: mockGetElementById,
});

describe('Process Component', () => {
  beforeEach(() => {
    mockScrollIntoView.mockClear();
    mockGetElementById.mockClear();
  });

  it('renders the process section with correct heading', () => {
    render(<Process />);
    
    expect(screen.getByText('Our Development Process')).toBeInTheDocument();
    expect(screen.getByText(/streamlined 4-phase approach/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Timeline: ~5 Working Days/i)).toBeInTheDocument();
  });

  it('renders all 4 process steps', () => {
    render(<Process />);
    
    // Check for all step titles (they appear twice due to desktop/mobile layouts)
    expect(screen.getAllByText('Specification')).toHaveLength(2);
    expect(screen.getAllByText('Design')).toHaveLength(2);
    expect(screen.getAllByText('Development')).toHaveLength(2);
    expect(screen.getAllByText('Deployment & Optimization')).toHaveLength(2);
  });

  it('displays correct duration for each step', () => {
    render(<Process />);
    
    expect(screen.getAllByText('1 day')).toHaveLength(4); // First and last steps × 2 (desktop + mobile)
    expect(screen.getAllByText('1-2 days')).toHaveLength(2); // Design step × 2
    expect(screen.getAllByText('2-3 days')).toHaveLength(2); // Development step × 2
  });

  it('shows step descriptions', () => {
    render(<Process />);
    
    expect(screen.getAllByText(/Understanding your needs and defining project requirements/i)).toHaveLength(2);
    expect(screen.getAllByText(/Creating visual mockups and user experience design/i)).toHaveLength(2);
    expect(screen.getAllByText(/Building your landing page with modern technologies/i)).toHaveLength(2);
    expect(screen.getAllByText(/Launching your site and ensuring optimal performance/i)).toHaveLength(2);
  });

  it('displays step details for each phase', () => {
    render(<Process />);
    
    // Check some key details from each step (they appear twice due to desktop/mobile layouts)
    expect(screen.getAllByText('Requirements gathering')).toHaveLength(2);
    expect(screen.getAllByText('Visual design')).toHaveLength(2);
    expect(screen.getAllByText('React/Next.js development')).toHaveLength(2);
    expect(screen.getAllByText('Vercel deployment')).toHaveLength(2);
  });

  it('renders step numbers correctly', () => {
    render(<Process />);
    
    // Check for numbered steps (they appear twice due to desktop/mobile layouts)
    const stepNumbers = screen.getAllByText('1');
    expect(stepNumbers.length).toBeGreaterThan(0);
    
    const stepNumbers2 = screen.getAllByText('2');
    expect(stepNumbers2.length).toBeGreaterThan(0);
    
    const stepNumbers3 = screen.getAllByText('3');
    expect(stepNumbers3.length).toBeGreaterThan(0);
    
    const stepNumbers4 = screen.getAllByText('4');
    expect(stepNumbers4.length).toBeGreaterThan(0);
  });

  it('has responsive layout classes', () => {
    const { container } = render(<Process />);
    
    // Check for desktop timeline (hidden on mobile)
    const desktopTimeline = container.querySelector('.hidden.lg\\:block');
    expect(desktopTimeline).toBeInTheDocument();
    
    // Check for mobile timeline (hidden on desktop)
    const mobileTimeline = container.querySelector('.lg\\:hidden');
    expect(mobileTimeline).toBeInTheDocument();
  });

  it('renders call to action section', () => {
    render(<Process />);
    
    expect(screen.getByText('Ready to Get Started?')).toBeInTheDocument();
    expect(screen.getByText(/Let's discuss your project/i)).toBeInTheDocument();
    expect(screen.getByText('Start Your Project')).toBeInTheDocument();
  });

  it('handles CTA button click and scrolls to contact section', () => {
    const mockContactElement = document.createElement('div');
    mockGetElementById.mockReturnValue(mockContactElement);
    
    render(<Process />);
    
    const ctaButton = screen.getByText('Start Your Project');
    fireEvent.click(ctaButton);
    
    expect(mockGetElementById).toHaveBeenCalledWith('contact');
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('handles CTA button click when contact section does not exist', () => {
    mockGetElementById.mockReturnValue(null);
    
    render(<Process />);
    
    const ctaButton = screen.getByText('Start Your Project');
    fireEvent.click(ctaButton);
    
    expect(mockGetElementById).toHaveBeenCalledWith('contact');
    expect(mockScrollIntoView).not.toHaveBeenCalled();
  });

  it('has proper accessibility attributes', () => {
    render(<Process />);
    
    // Check for proper heading hierarchy
    const mainHeading = screen.getByRole('heading', { level: 2 });
    expect(mainHeading).toHaveTextContent('Our Development Process');
    
    const stepHeadings = screen.getAllByRole('heading', { level: 3 });
    expect(stepHeadings).toHaveLength(9); // 4 steps × 2 (desktop + mobile) + 1 CTA heading
  });

  it('displays timeline visualization elements', () => {
    const { container } = render(<Process />);
    
    // Check for timeline lines (both horizontal and vertical)
    const timelineLines = container.querySelectorAll('.bg-gray-300, .bg-blue-500');
    expect(timelineLines.length).toBeGreaterThan(0);
    
    // Check for step circles
    const stepCircles = container.querySelectorAll('.rounded-full');
    expect(stepCircles.length).toBeGreaterThan(0);
  });

  it('shows icons for each step', () => {
    const { container } = render(<Process />);
    
    // Check that Lucide icons are rendered (they have specific classes)
    const icons = container.querySelectorAll('svg');
    expect(icons.length).toBeGreaterThan(0);
  });

  it('has proper styling classes for responsive design', () => {
    const { container } = render(<Process />);
    
    // Check for responsive grid classes
    expect(container.querySelector('.grid-cols-4')).toBeInTheDocument();
    
    // Check for responsive spacing classes
    expect(container.querySelector('.py-20')).toBeInTheDocument();
    expect(container.querySelector('.lg\\:py-32')).toBeInTheDocument();
  });

  it('renders step details as lists', () => {
    render(<Process />);
    
    // Check that step details are rendered as lists
    const lists = screen.getAllByRole('list');
    expect(lists.length).toBeGreaterThan(0);
    
    // Check for list items
    const listItems = screen.getAllByRole('listitem');
    expect(listItems.length).toBeGreaterThan(0);
  });

  it('has consistent visual styling', () => {
    const { container } = render(<Process />);
    
    // Check for consistent color scheme
    expect(container.querySelector('.bg-blue-500')).toBeInTheDocument();
    expect(container.querySelector('.text-blue-600')).toBeInTheDocument();
    
    // Check for shadow and border styling
    expect(container.querySelector('.shadow-lg')).toBeInTheDocument();
    expect(container.querySelector('.border-white')).toBeInTheDocument();
  });
});