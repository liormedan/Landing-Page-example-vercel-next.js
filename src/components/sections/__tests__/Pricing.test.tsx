import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { Pricing } from '../Pricing'

// Mock the lucide-react Check icon
vi.mock('lucide-react', () => ({
  Check: ({ className }: { className?: string }) => (
    <div data-testid="check-icon" className={className}>✓</div>
  )
}))

// Mock scrollIntoView
const mockScrollIntoView = vi.fn()
Object.defineProperty(Element.prototype, 'scrollIntoView', {
  value: mockScrollIntoView,
  writable: true
})

describe('Pricing Component', () => {
  beforeEach(() => {
    mockScrollIntoView.mockClear()
  })

  it('renders all three pricing tiers', () => {
    render(<Pricing />)
    
    expect(screen.getByText('Basic')).toBeInTheDocument()
    expect(screen.getByText('Recommended')).toBeInTheDocument()
    expect(screen.getByText('Premium')).toBeInTheDocument()
  })

  it('displays correct pricing information', () => {
    render(<Pricing />)
    
    expect(screen.getByText('₪1,900')).toBeInTheDocument()
    expect(screen.getByText('₪3,200')).toBeInTheDocument()
    expect(screen.getByText('₪5,400')).toBeInTheDocument()
  })

  it('shows "Most Popular" badge on recommended package', () => {
    render(<Pricing />)
    
    expect(screen.getByText('Most Popular')).toBeInTheDocument()
  })

  it('displays package descriptions', () => {
    render(<Pricing />)
    
    expect(screen.getByText('Perfect for simple landing pages with essential features')).toBeInTheDocument()
    expect(screen.getByText('Most popular choice with advanced features and optimization')).toBeInTheDocument()
    expect(screen.getByText('Complete solution with premium features and ongoing support')).toBeInTheDocument()
  })

  it('renders feature lists with check icons', () => {
    render(<Pricing />)
    
    // Check that check icons are rendered
    const checkIcons = screen.getAllByTestId('check-icon')
    expect(checkIcons.length).toBeGreaterThan(0)
    
    // Check some specific features
    expect(screen.getByText('Responsive design')).toBeInTheDocument()
    expect(screen.getByText('RTL support (Hebrew)')).toBeInTheDocument()
    expect(screen.getByText('Custom copywriting')).toBeInTheDocument()
  })

  it('displays CTA buttons for each package', () => {
    render(<Pricing />)
    
    expect(screen.getByText('Choose Basic')).toBeInTheDocument()
    expect(screen.getByText('Choose Recommended')).toBeInTheDocument()
    expect(screen.getByText('Choose Premium')).toBeInTheDocument()
  })

  it('shows custom solution CTA', () => {
    render(<Pricing />)
    
    expect(screen.getByText('Talk to Me for Custom Solution')).toBeInTheDocument()
    expect(screen.getByText('Need something different? Let\'s create a custom solution for you.')).toBeInTheDocument()
  })

  it('displays VAT disclaimer', () => {
    render(<Pricing />)
    
    expect(screen.getByText('*Prices shown before VAT')).toBeInTheDocument()
  })

  it('handles package selection clicks', () => {
    // Mock getElementById to return a mock element
    const mockContactSection = { scrollIntoView: mockScrollIntoView }
    vi.spyOn(document, 'getElementById').mockReturnValue(mockContactSection as any)
    
    render(<Pricing />)
    
    const basicButton = screen.getByText('Choose Basic')
    fireEvent.click(basicButton)
    
    expect(document.getElementById).toHaveBeenCalledWith('contact')
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
  })

  it('handles custom solution click', () => {
    const mockContactSection = { scrollIntoView: mockScrollIntoView }
    vi.spyOn(document, 'getElementById').mockReturnValue(mockContactSection as any)
    
    render(<Pricing />)
    
    const customButton = screen.getByText('Talk to Me for Custom Solution')
    fireEvent.click(customButton)
    
    expect(document.getElementById).toHaveBeenCalledWith('contact')
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
  })

  it('applies popular styling to recommended package', () => {
    render(<Pricing />)
    
    const recommendedCard = screen.getByText('Recommended').closest('.relative')
    expect(recommendedCard?.querySelector('.border-blue-500')).toBeInTheDocument()
  })

  it('renders section with correct id', () => {
    const { container } = render(<Pricing />)
    
    expect(container.innerHTML).toContain('id="pricing"')
  })

  it('displays section header correctly', () => {
    render(<Pricing />)
    
    expect(screen.getByText('Choose Your Package')).toBeInTheDocument()
    expect(screen.getByText(/Select the perfect package for your landing page needs/)).toBeInTheDocument()
  })

  it('handles missing contact section gracefully', () => {
    vi.spyOn(document, 'getElementById').mockReturnValue(null)
    
    render(<Pricing />)
    
    const basicButton = screen.getByText('Choose Basic')
    fireEvent.click(basicButton)
    
    // Should not throw error when contact section doesn't exist
    expect(document.getElementById).toHaveBeenCalledWith('contact')
    expect(mockScrollIntoView).not.toHaveBeenCalled()
  })

  it('applies custom className when provided', () => {
    const { container } = render(<Pricing className="custom-class" />)
    
    expect(container.firstChild).toHaveClass('custom-class')
  })
})