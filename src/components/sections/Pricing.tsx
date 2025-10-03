'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { analytics } from '@/lib/analytics'
import { useScrollTracking } from '@/hooks/useScrollTracking'

interface PricingTier {
  id: string
  name: string
  price: number
  currency: string
  description: string
  features: string[]
  popular?: boolean
  ctaText: string
}

const pricingTiers: PricingTier[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 1900,
    currency: '₪',
    description: 'Perfect for simple landing pages with essential features',
    features: [
      'Responsive design',
      'Basic SEO optimization',
      'Contact form',
      'SSL certificate',
      'Vercel deployment',
      'Domain setup assistance',
      '3 revisions included'
    ],
    ctaText: 'Choose Basic'
  },
  {
    id: 'recommended',
    name: 'Recommended',
    price: 3200,
    currency: '₪',
    description: 'Most popular choice with advanced features and optimization',
    features: [
      'Everything in Basic',
      'Advanced SEO & meta tags',
      'Google Analytics setup',
      'Performance optimization',
      'RTL support (Hebrew)',
      'Custom animations',
      'A/B testing setup',
      '5 revisions included',
      'Priority support'
    ],
    popular: true,
    ctaText: 'Choose Recommended'
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 5400,
    currency: '₪',
    description: 'Complete solution with premium features and ongoing support',
    features: [
      'Everything in Recommended',
      'Custom copywriting',
      'Premium stock images',
      'Advanced form integrations',
      'CRM integration',
      'Monthly performance reports',
      'Unlimited revisions',
      '30 days post-launch support',
      'Dedicated project manager'
    ],
    ctaText: 'Choose Premium'
  }
]

interface PricingProps {
  className?: string
}

export function Pricing({ className }: PricingProps) {
  const sectionRef = useScrollTracking({ sectionName: 'pricing' });

  const handlePackageSelect = (tierId: string) => {
    // Track package selection
    const tier = pricingTiers.find(t => t.id === tierId);
    if (tier) {
      analytics.trackPackageSelect(tier.name, `${tier.currency}${tier.price}`);
      analytics.trackCTAClick(tier.ctaText, 'pricing');
    } else if (tierId === 'custom') {
      analytics.trackCTAClick('Talk to Me for Custom Solution', 'pricing');
    }
    
    // Scroll to contact form or open contact modal
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section 
      ref={sectionRef}
      className={cn('py-20 px-4', className)} 
      id="pricing"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Choose Your Package
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select the perfect package for your landing page needs. All packages include fast delivery and professional quality.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            *Prices shown before VAT
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingTiers.map((tier) => (
            <div key={tier.id} className="relative">
              {/* Popular Badge */}
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge variant="success" size="md" className="bg-blue-500 hover:bg-blue-600">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <Card 
                className={cn(
                  'h-full transition-all duration-300 hover:shadow-lg',
                  tier.popular && 'border-blue-500 border-2 shadow-lg scale-105'
                )}
              >
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    {tier.name}
                  </CardTitle>
                  <CardDescription className="text-gray-600 mt-2">
                    {tier.description}
                  </CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">
                      {tier.currency}{tier.price.toLocaleString()}
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <ul className="space-y-3">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="pt-4">
                  <Button
                    className={cn(
                      'w-full',
                      tier.popular 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                        : 'bg-gray-900 hover:bg-gray-800 text-white'
                    )}
                    size="lg"
                    onClick={() => handlePackageSelect(tier.id)}
                  >
                    {tier.ctaText}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>

        {/* Custom Solution CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Need something different? Let's create a custom solution for you.
          </p>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => handlePackageSelect('custom')}
          >
            Talk to Me for Custom Solution
          </Button>
        </div>
      </div>
    </section>
  )
}