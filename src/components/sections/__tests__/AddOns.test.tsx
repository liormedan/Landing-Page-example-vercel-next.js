import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { AddOns } from '../AddOns'

// Mock the lucide-react icons
vi.mock('lucide-react', () => ({
  BarChart3: ({ className }: { className?: string }) => (
    <div data-testid="bar-chart-icon" className={className}>📊</div>
  ),
  Database: ({ className }: { className?: string }) => (
    <div data-testid="database-icon" className={className}>🗄️</div>
  ),
  PenTool: ({ className }: { className?: string }) => (
    <div data-testid="pen-tool-icon" className={className}>✏️</div>
  ),
  Sparkles: ({ className }: { className?: string }) => (
    <div data-testid="sparkles-icon" className={className}>✨</div>
  ),
  Image: ({ className }: { className?: string }) => (
    <div data-testid="image-icon" className={className}>🖼️</div>
  ),
  HeadphonesIcon: ({ className }: { className?: string }) => (
    <div data-testid="headphones-icon" className={className}>🎧</div>
  ),
  ArrowRight: ({ className }: { className?: string }) => (
    <div data-testid="arrow-right-icon" className={className}>→</div>
  ),
  Plus: ({ className }: { className?: string }) => (
    <div data-testid="plus-icon" className={className}>+</div>
  )
}))

// Mock scrollIntoView
const mockScrollIntoView = vi.fn()
Object.defineProperty(Element.prototype, 'scrollIntoView', {
  value: mockScrollIntoView,
  writable: true
})

describe('AddOns Component', () => {
  beforeEach(() => {
    mockScrollIntoView.mockClear()
  })

  it('renders section header correctly', () => {
    render(<AddOns />)
    
    expect(screen.getByText('Enhance Your Landing Page')).toBeInTheDocument()
    expect(screen.getByText(/Take your landing page to the next level/)).toBeInTheDocument()
  })

  it('renders all add-on services', () => {
    render(<AddOns />)
    
    expect(screen.getByText('A/B Testing Setup')).toBeInTheDocument()
    expect(screen.getByText('CRM Integration')).toBeInTheDocument()
    expect(screen.getByText('Advanced Copywriting')).toBeInTheDocument()
    expect(screen.getByText('Custom Animations')).toBeInTheDocument()
    expect(screen.getByText('Premium Images & Graphics')).toBeInTheDocument()
    expect(screen.getByText('Monthly Support Package')).toBeInTheDocument()
  })

  it('displays add-on descriptions', () => {
    render(<AddOns />)
    
    expect(screen.getByText(/Optimize your conversion rates with professional A\/B testing/)).toBeInTheDocument()
    expect(screen.getByText(/Seamlessly connect your landing page with your existing CRM/)).toBeInTheDocument()
    expect(screen.getByText(/Professional copywriting services to craft compelling/)).toBeInTheDocument()
  })

  it('shows popular badge on advanced copywriting', () => {
    render(<AddOns />)
    
    expect(screen.getByText('Popular')).toBeInTheDocument()
  })

  it('renders icons for each add-on service', () => {
    render(<AddOns />)
    
    expect(screen.getByTestId('bar-chart-icon')).toBeInTheDocument()
    expect(screen.getByTestId('database-icon')).toBeInTheDocument()
    expect(screen.getByTestId('pen-tool-icon')).toBeInTheDocument()
    expect(screen.getByTestId('sparkles-icon')).toBeInTheDocument()
    expect(screen.getByTestId('image-icon')).toBeInTheDocument()
    expect(screen.getByTestId('headphones-icon')).toBeInTheDocument()
  })

  it('displays benefits for each add-on', () => {
    render(<AddOns />)
    
    // Check some specific benefits
    expect(screen.getByText('Multiple page variants')).toBeInTheDocument()
    expect(screen.getByText('Automated lead capture')).toBeInTheDocument()
    expect(screen.getByText('Conversion-optimized copy')).toBeInTheDocument()
    expect(screen.getByText('Scroll-triggered animations')).toBeInTheDocument()
  })

  it('renders plus icons for benefits', () => {
    render(<AddOns />)
    
    const plusIcons = screen.getAllByTestId('plus-icon')
    expect(plusIcons.length).toBeGreaterThan(0)
  })

  it('displays "Get Quote" buttons for each add-on', () => {
    render(<AddOns />)
    
    const getQuoteButtons = screen.getAllByText('Get Quote')
    expect(getQuoteButtons).toHaveLength(6) // One for each add-on
  })

  it('renders custom solutions section', () => {
    render(<AddOns />)
    
    expect(screen.getByText('Need Something Custom?')).toBeInTheDocument()
    expect(screen.getByText(/Every project is unique/)).toBeInTheDocument()
    expect(screen.getByText('Discuss Custom Solution')).toBeInTheDocument()
    expect(screen.getByText('Schedule a Call')).toBeInTheDocument()
  })

  it('displays consultation benefits', () => {
    render(<AddOns />)
    
    expect(screen.getByText('Free consultation • No commitment required • Quick response guaranteed')).toBeInTheDocument()
  })

  it('handles add-on quote button clicks', () => {
    const mockContactSection = { scrollIntoView: mockScrollIntoView }
    vi.spyOn(document, 'getElementById').mockReturnValue(mockContactSection as any)
    
    render(<AddOns />)
    
    const getQuoteButtons = screen.getAllByText('Get Quote')
    fireEvent.click(getQuoteButtons[0])
    
    expect(document.getElementById).toHaveBeenCalledWith('contact')
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
  })

  it('handles custom solution button clicks', () => {
    const mockContactSection = { scrollIntoView: mockScrollIntoView }
    vi.spyOn(document, 'getElementById').mockReturnValue(mockContactSection as any)
    
    render(<AddOns />)
    
    const customSolutionButton = screen.getByText('Discuss Custom Solution')
    fireEvent.click(customSolutionButton)
    
    expect(document.getElementById).toHaveBeenCalledWith('contact')
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
  })

  it('handles schedule call button clicks', () => {
    const mockContactSection = { scrollIntoView: mockScrollIntoView }
    vi.spyOn(document, 'getElementById').mockReturnValue(mockContactSection as any)
    
    render(<AddOns />)
    
    const scheduleCallButton = screen.getByText('Schedule a Call')
    fireEvent.click(scheduleCallButton)
    
    expect(document.getElementById).toHaveBeenCalledWith('contact')
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
  })

  it('handles missing contact section gracefully', () => {
    vi.spyOn(document, 'getElementById').mockReturnValue(null)
    
    render(<AddOns />)
    
    const getQuoteButtons = screen.getAllByText('Get Quote')
    fireEvent.click(getQuoteButtons[0])
    
    expect(document.getElementById).toHaveBeenCalledWith('contact')
    expect(mockScrollIntoView).not.toHaveBeenCalled()
  })

  it('renders section with correct id', () => {
    const { container } = render(<AddOns />)
    
    expect(container.innerHTML).toContain('id="add-ons"')
  })

  it('applies custom className when provided', () => {
    const { container } = render(<AddOns className="custom-class" />)
    
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('has proper background styling', () => {
    const { container } = render(<AddOns />)
    
    expect(container.firstChild).toHaveClass('bg-gray-50')
  })

  it('renders arrow right icons in buttons', () => {
    render(<AddOns />)
    
    const arrowIcons = screen.getAllByTestId('arrow-right-icon')
    expect(arrowIcons.length).toBeGreaterThan(0)
  })

  it('displays all required add-on services from requirements', () => {
    render(<AddOns />)
    
    // Verify all services mentioned in Requirement 6.1 are present
    expect(screen.getByText('A/B Testing Setup')).toBeInTheDocument()
    expect(screen.getByText('CRM Integration')).toBeInTheDocument()
    expect(screen.getByText('Advanced Copywriting')).toBeInTheDocument()
    expect(screen.getByText('Custom Animations')).toBeInTheDocument()
    expect(screen.getByText('Premium Images & Graphics')).toBeInTheDocument()
    expect(screen.getByText('Monthly Support Package')).toBeInTheDocument()
  })

  it('encourages direct contact for custom solutions as per requirements', () => {
    render(<AddOns />)
    
    // Verify requirement 6.3 - encourage direct contact for personalized quotes
    expect(screen.getByText(/let's discuss a personalized solution/)).toBeInTheDocument()
    expect(screen.getByText('Discuss Custom Solution')).toBeInTheDocument()
    expect(screen.getByText('Schedule a Call')).toBeInTheDocument()
  })

  it('provides clear descriptions for each service as per requirements', () => {
    render(<AddOns />)
    
    // Verify requirement 6.2 - clear descriptions for each service
    const descriptions = [
      /Optimize your conversion rates/,
      /Seamlessly connect your landing page/,
      /Professional copywriting services/,
      /Enhance user experience with smooth/,
      /High-quality stock photos/,
      /Ongoing maintenance, updates/
    ]
    
    descriptions.forEach(description => {
      expect(screen.getByText(description)).toBeInTheDocument()
    })
  })
})