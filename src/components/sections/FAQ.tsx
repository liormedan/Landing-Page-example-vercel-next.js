'use client'

import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ChevronDown, ChevronUp, MessageCircle, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FAQItem } from '@/types'
import { analytics } from '@/lib/analytics'
import { useScrollTracking } from '@/hooks/useScrollTracking'

const faqData: FAQItem[] = [
  {
    id: 'timeline',
    question: 'How long does it take to complete a landing page?',
    answer: 'Typically, a complete landing page takes 5-7 working days from start to finish. This includes specification gathering (1 day), design creation (1-2 days), development (2-3 days), and deployment with optimization (1 day). Rush delivery is available for an additional fee if you need it faster.',
    category: 'timeline'
  },
  {
    id: 'ownership',
    question: 'Do I own the landing page and its code?',
    answer: 'Absolutely! You receive complete ownership of your landing page, including all source code, design files, and assets. The page is deployed to your own Vercel account, and you have full control over hosting, domain, and future modifications. No vendor lock-in whatsoever.',
    category: 'ownership'
  },
  {
    id: 'payments',
    question: 'What are the payment terms and methods?',
    answer: 'We require 50% payment upfront to begin work, with the remaining 50% due upon completion and your approval. We accept bank transfers, PayPal, and major credit cards. All prices are quoted before VAT (if applicable). Payment plans are available for Premium packages.',
    category: 'payments'
  },
  {
    id: 'maintenance',
    question: 'What ongoing maintenance is required?',
    answer: 'Your landing page is built on Vercel, which handles hosting, SSL certificates, and basic security automatically. The page requires minimal maintenance. We provide 30 days of free support after delivery, and optional monthly maintenance packages are available for ongoing updates and optimization.',
    category: 'maintenance'
  },
  {
    id: 'revisions',
    question: 'How many revisions are included?',
    answer: 'Each package includes specific revision rounds: Basic (2 rounds), Recommended (3 rounds), Premium (unlimited revisions). Revisions cover design changes, content updates, and functionality adjustments. Additional revisions beyond the package limit are available at an hourly rate.',
    category: 'process'
  },
  {
    id: 'content',
    question: 'Do you provide copywriting and content creation?',
    answer: 'Yes! All packages include professional copywriting tailored to your business and target audience. We create compelling headlines, persuasive copy, and clear calls-to-action. You can also provide your own content if preferred. Advanced copywriting with A/B testing variations is available as an add-on.',
    category: 'content'
  },
  {
    id: 'rtl-support',
    question: 'Do you support Hebrew and RTL languages?',
    answer: 'Absolutely! RTL (Right-to-Left) support is one of our specialties. We ensure proper Hebrew text rendering, RTL layout adjustments, and cultural considerations for Israeli markets. All our landing pages are fully optimized for both Hebrew and English content.',
    category: 'technical'
  },
  {
    id: 'analytics',
    question: 'What analytics and tracking is included?',
    answer: 'All packages include Google Analytics 4 setup, conversion tracking for forms and CTAs, and basic performance monitoring. We provide detailed setup documentation and can integrate with your existing analytics tools. Advanced tracking and custom events are available in higher-tier packages.',
    category: 'technical'
  }
]

interface FAQProps {
  className?: string
}

interface FAQItemProps {
  item: FAQItem
  isOpen: boolean
  onToggle: () => void
}

function FAQItemComponent({ item, isOpen, onToggle }: FAQItemProps) {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onToggle()
    }
  }

  return (
    <Card className="transition-all duration-200 hover:shadow-md">
      <div
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${item.id}`}
        className="w-full p-6 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
        onClick={onToggle}
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 pr-4 text-left">
            {item.question}
          </h3>
          <div className="flex-shrink-0">
            {isOpen ? (
              <ChevronUp className="h-5 w-5 text-blue-600 transition-transform duration-200" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500 transition-transform duration-200" />
            )}
          </div>
        </div>
      </div>
      
      <div
        id={`faq-answer-${item.id}`}
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
        aria-hidden={!isOpen}
      >
        <CardContent className="pt-0 pb-6 px-6">
          <div className="border-t border-gray-100 pt-4">
            <p className="text-gray-700 leading-relaxed">
              {item.answer}
            </p>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}

export function FAQ({ className }: FAQProps) {
  const sectionRef = useScrollTracking({ sectionName: 'faq' });
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())

  const toggleItem = (itemId: string) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(itemId)) {
      newOpenItems.delete(itemId)
    } else {
      newOpenItems.add(itemId)
      // Track FAQ expansion
      const faqItem = faqData.find(item => item.id === itemId);
      if (faqItem) {
        analytics.trackFAQExpand(faqItem.question);
      }
    }
    setOpenItems(newOpenItems)
  }

  const handleContactSupport = () => {
    analytics.trackCTAClick('Contact Us', 'faq');
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleWhatsAppClick = () => {
    analytics.trackContactMethod('whatsapp');
    analytics.trackCTAClick('WhatsApp Chat', 'faq');
  }

  return (
    <section 
      ref={sectionRef}
      className={cn('py-20 px-4 bg-white', className)} 
      id="faq"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MessageCircle className="h-8 w-8 text-blue-600" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get answers to the most common questions about our landing page development process, 
            pricing, and services. Can&apos;t find what you&apos;re looking for? We&apos;re here to help!
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4 mb-12">
          {faqData.map((item) => (
            <FAQItemComponent
              key={item.id}
              item={item}
              isOpen={openItems.has(item.id)}
              onToggle={() => toggleItem(item.id)}
            />
          ))}
        </div>

        {/* Contact CTA */}
        <div className="bg-gray-50 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            Still Have Questions?
          </h3>
          <p className="text-gray-600 mb-6">
            We&apos;re here to help! Get in touch and we&apos;ll answer any questions 
            about your specific project requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleContactSupport}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Contact Us
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline"
              onClick={() => {
                handleWhatsAppClick();
                window.open('https://wa.me/972123456789', '_blank');
              }}
            >
              WhatsApp Chat
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}