'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { 
  BarChart3, 
  Database, 
  PenTool, 
  Sparkles, 
  Image, 
  HeadphonesIcon,
  ArrowRight,
  Plus
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface AddOn {
  id: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  benefits: string[]
  popular?: boolean
}

const addOns: AddOn[] = [
  {
    id: 'ab-testing',
    name: 'A/B Testing Setup',
    description: 'Optimize your conversion rates with professional A/B testing implementation and analytics tracking.',
    icon: BarChart3,
    benefits: [
      'Multiple page variants',
      'Conversion tracking setup',
      'Statistical analysis tools',
      'Performance reporting'
    ]
  },
  {
    id: 'crm-integration',
    name: 'CRM Integration',
    description: 'Seamlessly connect your landing page with your existing CRM system for automated lead management.',
    icon: Database,
    benefits: [
      'Popular CRM connections',
      'Automated lead capture',
      'Custom field mapping',
      'Real-time synchronization'
    ]
  },
  {
    id: 'advanced-copywriting',
    name: 'Advanced Copywriting',
    description: 'Professional copywriting services to craft compelling, conversion-focused content for your landing page.',
    icon: PenTool,
    benefits: [
      'Conversion-optimized copy',
      'Brand voice alignment',
      'Multiple revision rounds',
      'A/B testing variations'
    ],
    popular: true
  },
  {
    id: 'custom-animations',
    name: 'Custom Animations',
    description: 'Enhance user experience with smooth, professional animations and micro-interactions.',
    icon: Sparkles,
    benefits: [
      'Scroll-triggered animations',
      'Hover effects',
      'Loading transitions',
      'Mobile-optimized performance'
    ]
  },
  {
    id: 'premium-images',
    name: 'Premium Images & Graphics',
    description: 'High-quality stock photos, custom graphics, and professional visual assets for your landing page.',
    icon: Image,
    benefits: [
      'Premium stock photo license',
      'Custom graphic design',
      'Brand-consistent visuals',
      'Optimized for web performance'
    ]
  },
  {
    id: 'monthly-support',
    name: 'Monthly Support Package',
    description: 'Ongoing maintenance, updates, and optimization services to keep your landing page performing at its best.',
    icon: HeadphonesIcon,
    benefits: [
      'Regular performance monitoring',
      'Content updates',
      'Security maintenance',
      'Priority support access'
    ]
  }
]

interface AddOnsProps {
  className?: string
}

export function AddOns({ className }: AddOnsProps) {
  const handleContactForAddOn = () => {
    // Scroll to contact form with add-on pre-selected
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleCustomSolution = () => {
    // Scroll to contact form for custom solutions
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className={cn('py-20 px-4 bg-gray-50', className)} id="add-ons">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Enhance Your Landing Page
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Take your landing page to the next level with our professional add-on services. 
            Each service is designed to maximize your conversion potential.
          </p>
        </div>

        {/* Add-ons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {addOns.map((addOn) => {
            const IconComponent = addOn.icon
            return (
              <div key={addOn.id} className="relative">
                {/* Popular Badge */}
                {addOn.popular && (
                  <div className="absolute -top-3 -right-3 z-10">
                    <Badge variant="default" className="bg-blue-500 hover:bg-blue-600">
                      Popular
                    </Badge>
                  </div>
                )}
                
                <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <IconComponent className="h-6 w-6 text-blue-600" />
                      </div>
                      <CardTitle className="text-xl font-bold text-gray-900">
                        {addOn.name}
                      </CardTitle>
                    </div>
                    <CardDescription className="text-gray-600 leading-relaxed">
                      {addOn.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="space-y-2 mb-6">
                      {addOn.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Plus className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button
                      variant="outline"
                      className="w-full group"
                      onClick={handleContactForAddOn}
                    >
                      Get Quote
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>

        {/* Custom Solutions CTA */}
        <div className="bg-white rounded-2xl p-8 md:p-12 text-center shadow-sm border">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Need Something Custom?
            </h3>
            <p className="text-lg text-gray-600 mb-8">
              Every project is unique. If you have specific requirements or need a combination 
              of services not listed above, let&apos;s discuss a personalized solution that fits 
              your exact needs and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={handleCustomSolution}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Discuss Custom Solution
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleCustomSolution}
              >
                Schedule a Call
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Free consultation • No commitment required • Quick response guaranteed
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}