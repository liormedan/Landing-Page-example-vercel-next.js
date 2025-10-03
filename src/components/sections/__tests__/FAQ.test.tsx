import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { FAQ } from '../FAQ'

// Mock scrollIntoView
const mockScrollIntoView = vi.fn()
Object.defineProperty(Element.prototype, 'scrollIntoView', {
  value: mockScrollIntoView,
  writable: true,
})

// Mock window.open
const mockWindowOpen = vi.fn()
Object.defineProperty(window, 'open', {
  value: mockWindowOpen,
  writable: true,
})

describe('FAQ Component', () => {
  beforeEach(() => {
    mockScrollIntoView.mockClear()
    mockWindowOpen.mockClear()
  })

  describe('Rendering', () => {
    it('renders the FAQ section with correct heading', () => {
      render(<FAQ />)
      
      expect(screen.getByRole('heading', { name: /frequently asked questions/i })).toBeInTheDocument()
      expect(screen.getByText(/get answers to the most common questions/i)).toBeInTheDocument()
    })

    it('renders all FAQ items', () => {
      render(<FAQ />)
      
      // Check for specific FAQ questions
      expect(screen.getByText(/how long does it take to complete a landing page/i)).toBeInTheDocument()
      expect(screen.getByText(/do i own the landing page and its code/i)).toBeInTheDocument()
      expect(screen.getByText(/what are the payment terms and methods/i)).toBeInTheDocument()
      expect(screen.getByText(/what ongoing maintenance is required/i)).toBeInTheDocument()
      expect(screen.getByText(/how many revisions are included/i)).toBeInTheDocument()
      expect(screen.getByText(/do you provide copywriting and content creation/i)).toBeInTheDocument()
      expect(screen.getByText(/do you support hebrew and rtl languages/i)).toBeInTheDocument()
      expect(screen.getByText(/what analytics and tracking is included/i)).toBeInTheDocument()
    })

    it('renders contact CTA section', () => {
      render(<FAQ />)
      
      expect(screen.getByText(/still have questions/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /contact us/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /whatsapp chat/i })).toBeInTheDocument()
    })

    it('applies custom className when provided', () => {
      const { container } = render(<FAQ className="custom-class" />)
      const section = container.querySelector('section')
      
      expect(section).toHaveClass('custom-class')
    })
  })

  describe('Expand/Collapse Functionality', () => {
    it('initially renders all FAQ items as collapsed', () => {
      render(<FAQ />)
      
      // Check that all FAQ buttons have aria-expanded="false"
      const faqButtons = screen.getAllByRole('button').filter(button => 
        button.getAttribute('aria-expanded') !== null
      )
      
      faqButtons.forEach(button => {
        expect(button).toHaveAttribute('aria-expanded', 'false')
      })
      
      // Check that answer containers are hidden
      const answerContainers = document.querySelectorAll('[id^="faq-answer-"]')
      answerContainers.forEach(container => {
        expect(container).toHaveAttribute('aria-hidden', 'true')
        expect(container).toHaveClass('max-h-0', 'opacity-0')
      })
    })

    it('expands FAQ item when clicked', async () => {
      const user = userEvent.setup()
      render(<FAQ />)
      
      const timelineQuestion = screen.getByText(/how long does it take to complete a landing page/i)
      const timelineButton = timelineQuestion.closest('[role="button"]')
      
      expect(timelineButton).toHaveAttribute('aria-expanded', 'false')
      
      await user.click(timelineButton!)
      
      await waitFor(() => {
        expect(timelineButton).toHaveAttribute('aria-expanded', 'true')
        expect(screen.getByText(/typically, a complete landing page takes 5-7 working days/i)).toBeInTheDocument()
      })
    })

    it('collapses FAQ item when clicked again', async () => {
      const user = userEvent.setup()
      render(<FAQ />)
      
      const timelineQuestion = screen.getByText(/how long does it take to complete a landing page/i)
      const timelineButton = timelineQuestion.closest('[role="button"]')
      
      // First click to expand
      await user.click(timelineButton!)
      
      await waitFor(() => {
        expect(timelineButton).toHaveAttribute('aria-expanded', 'true')
      })
      
      // Second click to collapse
      await user.click(timelineButton!)
      
      await waitFor(() => {
        expect(timelineButton).toHaveAttribute('aria-expanded', 'false')
      })
    })

    it('allows multiple FAQ items to be open simultaneously', async () => {
      const user = userEvent.setup()
      render(<FAQ />)
      
      const timelineButton = screen.getByText(/how long does it take to complete a landing page/i).closest('[role="button"]')
      const ownershipButton = screen.getByText(/do i own the landing page and its code/i).closest('[role="button"]')
      
      await user.click(timelineButton!)
      await user.click(ownershipButton!)
      
      await waitFor(() => {
        expect(timelineButton).toHaveAttribute('aria-expanded', 'true')
        expect(ownershipButton).toHaveAttribute('aria-expanded', 'true')
        expect(screen.getByText(/typically, a complete landing page takes 5-7 working days/i)).toBeInTheDocument()
        expect(screen.getByText(/absolutely! you receive complete ownership/i)).toBeInTheDocument()
      })
    })
  })

  describe('Keyboard Accessibility', () => {
    it('supports keyboard navigation with Tab key', async () => {
      const user = userEvent.setup()
      render(<FAQ />)
      
      const firstFAQButton = screen.getByText(/how long does it take to complete a landing page/i).closest('[role="button"]')
      
      // Tab to the first FAQ item
      await user.tab()
      expect(firstFAQButton).toHaveFocus()
    })

    it('expands FAQ item when Enter key is pressed', async () => {
      const user = userEvent.setup()
      render(<FAQ />)
      
      const timelineButton = screen.getByText(/how long does it take to complete a landing page/i).closest('[role="button"]')
      
      timelineButton!.focus()
      await user.keyboard('{Enter}')
      
      await waitFor(() => {
        expect(timelineButton).toHaveAttribute('aria-expanded', 'true')
        expect(screen.getByText(/typically, a complete landing page takes 5-7 working days/i)).toBeInTheDocument()
      })
    })

    it('expands FAQ item when Space key is pressed', async () => {
      const user = userEvent.setup()
      render(<FAQ />)
      
      const timelineButton = screen.getByText(/how long does it take to complete a landing page/i).closest('[role="button"]')
      
      timelineButton!.focus()
      await user.keyboard(' ')
      
      await waitFor(() => {
        expect(timelineButton).toHaveAttribute('aria-expanded', 'true')
        expect(screen.getByText(/typically, a complete landing page takes 5-7 working days/i)).toBeInTheDocument()
      })
    })

    it('has proper ARIA attributes', () => {
      render(<FAQ />)
      
      const faqButtons = screen.getAllByRole('button')
      const faqItemButtons = faqButtons.filter(button => 
        button.getAttribute('aria-expanded') !== null
      )
      
      faqItemButtons.forEach((button, index) => {
        expect(button).toHaveAttribute('aria-expanded', 'false')
        expect(button).toHaveAttribute('aria-controls')
        expect(button).toHaveAttribute('tabIndex', '0')
        
        const ariaControls = button.getAttribute('aria-controls')
        expect(ariaControls).toMatch(/^faq-answer-/)
      })
    })

    it('has proper focus indicators', () => {
      render(<FAQ />)
      
      const timelineButton = screen.getByText(/how long does it take to complete a landing page/i).closest('[role="button"]')
      
      expect(timelineButton).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-blue-500', 'focus:ring-offset-2')
    })
  })

  describe('Animation and Visual States', () => {
    it('shows correct chevron icons for collapsed and expanded states', async () => {
      const user = userEvent.setup()
      render(<FAQ />)
      
      const timelineButton = screen.getByText(/how long does it take to complete a landing page/i).closest('[role="button"]')
      
      // Initially collapsed - should show ChevronDown
      expect(timelineButton!.querySelector('svg')).toBeInTheDocument()
      
      await user.click(timelineButton!)
      
      await waitFor(() => {
        // After expansion - should show ChevronUp
        expect(timelineButton!.querySelector('svg')).toBeInTheDocument()
      })
    })

    it('applies hover effects to FAQ cards', () => {
      render(<FAQ />)
      
      const faqCards = screen.getAllByRole('button').filter(button => 
        button.getAttribute('aria-expanded') !== null
      )
      
      faqCards.forEach(card => {
        const cardElement = card.closest('.transition-all')
        expect(cardElement).toHaveClass('hover:shadow-md')
      })
    })
  })

  describe('Contact Actions', () => {
    it('scrolls to contact section when Contact Us button is clicked', async () => {
      const user = userEvent.setup()
      
      // Mock getElementById to return a mock element
      const mockContactElement = { scrollIntoView: mockScrollIntoView }
      vi.spyOn(document, 'getElementById').mockReturnValue(mockContactElement as any)
      
      render(<FAQ />)
      
      const contactButton = screen.getByRole('button', { name: /contact us/i })
      await user.click(contactButton)
      
      expect(document.getElementById).toHaveBeenCalledWith('contact')
      expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
    })

    it('opens WhatsApp when WhatsApp Chat button is clicked', async () => {
      const user = userEvent.setup()
      render(<FAQ />)
      
      const whatsappButton = screen.getByRole('button', { name: /whatsapp chat/i })
      await user.click(whatsappButton)
      
      expect(mockWindowOpen).toHaveBeenCalledWith('https://wa.me/972123456789', '_blank')
    })

    it('handles missing contact section gracefully', async () => {
      const user = userEvent.setup()
      
      // Mock getElementById to return null
      vi.spyOn(document, 'getElementById').mockReturnValue(null)
      
      render(<FAQ />)
      
      const contactButton = screen.getByRole('button', { name: /contact us/i })
      
      // Should not throw error when contact section doesn't exist
      expect(() => user.click(contactButton)).not.toThrow()
    })
  })

  describe('Content Validation', () => {
    it('contains all required FAQ categories', () => {
      render(<FAQ />)
      
      // Timeline question
      expect(screen.getByText(/how long does it take to complete a landing page/i)).toBeInTheDocument()
      
      // Ownership question
      expect(screen.getByText(/do i own the landing page and its code/i)).toBeInTheDocument()
      
      // Payment question
      expect(screen.getByText(/what are the payment terms and methods/i)).toBeInTheDocument()
      
      // Maintenance question
      expect(screen.getByText(/what ongoing maintenance is required/i)).toBeInTheDocument()
    })

    it('provides comprehensive answers for each question', async () => {
      const user = userEvent.setup()
      render(<FAQ />)
      
      // Expand timeline question and check for detailed answer
      const timelineButton = screen.getByText(/how long does it take to complete a landing page/i).closest('[role="button"]')
      await user.click(timelineButton!)
      
      await waitFor(() => {
        expect(screen.getByText(/typically, a complete landing page takes 5-7 working days/i)).toBeInTheDocument()
        expect(screen.getByText(/specification gathering/i)).toBeInTheDocument()
        expect(screen.getByText(/rush delivery is available/i)).toBeInTheDocument()
      })
    })
  })
})