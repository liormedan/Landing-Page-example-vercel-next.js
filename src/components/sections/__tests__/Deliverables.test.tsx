import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Deliverables from '../Deliverables';

// Mock Heroicons to avoid issues with SVG imports in tests
vi.mock('@heroicons/react/24/outline', () => ({
  CheckCircleIcon: ({ className, ...props }: any) => (
    <svg className={className} data-testid="check-circle-icon" {...props} />
  ),
  StarIcon: ({ className, ...props }: any) => (
    <svg className={className} data-testid="star-icon" {...props} />
  ),
  ChevronDownIcon: ({ className, ...props }: any) => (
    <svg className={className} data-testid="chevron-down-icon" {...props} />
  ),
  ChevronUpIcon: ({ className, ...props }: any) => (
    <svg className={className} data-testid="chevron-up-icon" {...props} />
  ),
  PaintBrushIcon: ({ className, ...props }: any) => (
    <svg className={className} data-testid="paint-brush-icon" {...props} />
  ),
  CodeBracketIcon: ({ className, ...props }: any) => (
    <svg className={className} data-testid="code-bracket-icon" {...props} />
  ),
  CloudArrowUpIcon: ({ className, ...props }: any) => (
    <svg className={className} data-testid="cloud-arrow-up-icon" {...props} />
  ),
  RocketLaunchIcon: ({ className, ...props }: any) => (
    <svg className={className} data-testid="rocket-launch-icon" {...props} />
  )
}));

describe('Deliverables Component', () => {
  it('renders the main heading and description', () => {
    render(<Deliverables />);
    
    expect(screen.getByText('What You\'ll Get')).toBeInTheDocument();
    expect(screen.getByText(/Every landing page includes everything you need to succeed online/)).toBeInTheDocument();
  });

  it('displays the correct count of included and premium features', () => {
    render(<Deliverables />);
    
    // Should show counts for included and premium features
    expect(screen.getByText(/included features/)).toBeInTheDocument();
    expect(screen.getByText(/premium add-ons/)).toBeInTheDocument();
  });

  it('renders all deliverable categories', () => {
    render(<Deliverables />);
    
    expect(screen.getByText('Design & User Experience')).toBeInTheDocument();
    expect(screen.getByText('Development & Functionality')).toBeInTheDocument();
    expect(screen.getByText('Deployment & Infrastructure')).toBeInTheDocument();
    expect(screen.getByText('SEO & Performance')).toBeInTheDocument();
    expect(screen.getByText('Premium Add-ons')).toBeInTheDocument();
  });

  it('displays deliverable items with correct styling for included vs premium', () => {
    render(<Deliverables />);
    
    // Check for included items (should have green styling)
    const customDesign = screen.getByText('Custom Landing Page Design');
    expect(customDesign).toBeInTheDocument();
    
    // Check for premium items (should have amber styling and premium badge)
    const abTesting = screen.getByText('A/B Testing Setup');
    expect(abTesting).toBeInTheDocument();
    expect(screen.getAllByText('Premium')).toHaveLength(3); // Should have 3 premium items
  });

  it('shows correct icons for included and premium items', () => {
    render(<Deliverables />);
    
    // Included items should show check circle icons
    const checkIcons = screen.getAllByTestId('check-circle-icon');
    expect(checkIcons.length).toBeGreaterThan(0);
    
    // Premium items should show star icons
    const starIcons = screen.getAllByTestId('star-icon');
    expect(starIcons.length).toBeGreaterThan(0);
  });

  it('handles expandable item functionality', () => {
    render(<Deliverables />);
    
    // Find all expand buttons by aria-label and use the first one
    const expandButtons = screen.getAllByRole('button', { name: /expand details/i });
    const expandButton = expandButtons[0];
    expect(expandButton).toBeInTheDocument();
    expect(within(expandButton).getByTestId('chevron-down-icon')).toBeInTheDocument();
    
    // Details should not be visible initially
    expect(screen.queryByText('Brand-aligned color scheme and typography')).not.toBeInTheDocument();
    
    // Click to expand
    fireEvent.click(expandButton);
    
    // Details should now be visible
    expect(screen.getByText('Brand-aligned color scheme and typography')).toBeInTheDocument();
    expect(screen.getByText('Mobile-first responsive design')).toBeInTheDocument();
    
    // Icon should change to chevron up
    expect(within(expandButton).getByTestId('chevron-up-icon')).toBeInTheDocument();
    
    // Click to collapse
    fireEvent.click(expandButton);
    
    // Details should be hidden again
    expect(screen.queryByText('Brand-aligned color scheme and typography')).not.toBeInTheDocument();
  });

  it('displays detailed information when items are expanded', () => {
    render(<Deliverables />);
    
    // Find all expand buttons and click the second one (React development)
    const expandButtons = screen.getAllByRole('button', { name: /expand details/i });
    fireEvent.click(expandButtons[2]); // React development item
    
    // Check that all detail items are displayed
    expect(screen.getByText('Next.js 14+ with App Router')).toBeInTheDocument();
    expect(screen.getByText('TypeScript for type safety')).toBeInTheDocument();
    expect(screen.getByText('Tailwind CSS for styling')).toBeInTheDocument();
    expect(screen.getByText('Server-side rendering (SSR)')).toBeInTheDocument();
  });

  it('renders call-to-action section', () => {
    render(<Deliverables />);
    
    expect(screen.getByText('Ready to Get Started?')).toBeInTheDocument();
    expect(screen.getByText(/Choose your package and get your professional landing page/)).toBeInTheDocument();
    
    // Check for CTA buttons
    expect(screen.getByText('View Pricing Packages')).toBeInTheDocument();
    expect(screen.getByText('Get Custom Quote')).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    const { container } = render(<Deliverables className="custom-class" />);
    
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('handles multiple items being expanded simultaneously', () => {
    render(<Deliverables />);
    
    // Get all expand buttons
    const expandButtons = screen.getAllByRole('button', { name: /expand details/i });
    
    // Expand first item (Custom Design)
    fireEvent.click(expandButtons[0]);
    
    // Expand second item (Copywriting)
    fireEvent.click(expandButtons[1]);
    
    // Both should be expanded
    expect(screen.getByText('Brand-aligned color scheme and typography')).toBeInTheDocument();
    expect(screen.getByText('Conversion-focused headlines')).toBeInTheDocument();
  });

  it('displays category icons correctly', () => {
    render(<Deliverables />);
    
    // Check that category icons are present (using getAllBy since there are multiple instances)
    expect(screen.getAllByTestId('paint-brush-icon')).toHaveLength(2); // Category + item icon
    expect(screen.getAllByTestId('code-bracket-icon')).toHaveLength(2); // Category + item icon
    expect(screen.getAllByTestId('cloud-arrow-up-icon')).toHaveLength(2); // Category + item icon
    expect(screen.getAllByTestId('rocket-launch-icon')).toHaveLength(1); // Category icon only
  });

  it('has proper accessibility attributes', () => {
    render(<Deliverables />);
    
    // Check that expand buttons have proper aria-labels
    const expandButtons = screen.getAllByRole('button', { name: /expand details/i });
    expect(expandButtons.length).toBeGreaterThan(0);
    
    expandButtons.forEach(button => {
      expect(button).toHaveAttribute('aria-label');
    });
  });

  it('shows correct visual hierarchy for different item types', () => {
    render(<Deliverables />);
    
    // Find included and premium items by looking for the container with the correct classes
    const includedItems = screen.getAllByText('Custom Landing Page Design');
    const premiumItems = screen.getAllByText('A/B Testing Setup');
    
    // Find the parent container with the styling classes
    const includedContainer = includedItems[0].closest('.border-green-200');
    const premiumContainer = premiumItems[0].closest('.border-amber-200');
    
    // Included items should have green styling
    expect(includedContainer).toHaveClass('border-green-200', 'bg-green-50');
    
    // Premium items should have amber styling
    expect(premiumContainer).toHaveClass('border-amber-200', 'bg-amber-50');
  });
});