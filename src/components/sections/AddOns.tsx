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
import { useLanguage } from '@/hooks/useLanguage'

interface AddOn {
  id: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  benefits: string[]
  popular?: boolean
}

interface AddOnsProps {
  className?: string
}

export const AddOns: React.FC<AddOnsProps> = ({ className }) => {
  const { t, locale } = useLanguage();

  const addOns: AddOn[] = [
    {
      id: 'ab-testing',
      name: t.addons.items.abTesting.title,
      description: t.addons.items.abTesting.description,
      icon: BarChart3,
      benefits: t.addons.items.abTesting.features
    },
    {
      id: 'crm-integration',
      name: t.addons.items.crmIntegration.title,
      description: t.addons.items.crmIntegration.description,
      icon: Database,
      benefits: t.addons.items.crmIntegration.features,
      popular: t.addons.items.crmIntegration.popular
    },
    {
      id: 'advanced-copywriting',
      name: t.addons.items.copywriting.title,
      description: t.addons.items.copywriting.description,
      icon: PenTool,
      benefits: t.addons.items.copywriting.features
    },
    {
      id: 'custom-animations',
      name: t.addons.items.animations.title,
      description: t.addons.items.animations.description,
      icon: Sparkles,
      benefits: t.addons.items.animations.features
    },
    {
      id: 'premium-images',
      name: t.addons.items.premiumImages.title,
      description: t.addons.items.premiumImages.description,
      icon: Image,
      benefits: t.addons.items.premiumImages.features
    },
    {
      id: 'monthly-support',
      name: t.addons.items.monthlySupport.title,
      description: t.addons.items.monthlySupport.description,
      icon: HeadphonesIcon,
      benefits: t.addons.items.monthlySupport.features
    }
  ];

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
            {t.addons.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t.addons.subtitle}
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
                      {t.addons.popular}
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
                      {t.addons.getQuote}
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
              {locale === 'he' ? 'צריכים משהו מותאם אישית?' : 'Need Something Custom?'}
            </h3>
            <p className="text-lg text-gray-600 mb-8">
              {locale === 'he' 
                ? 'כל פרויקט הוא ייחודי. אם יש לכם דרישות ספציפיות או שאתם צריכים שילוב של שירותים שלא מופיעים למעלה, בואו נדבר על פתרון אישי שמתאים בדיוק לצרכים ולתקציב שלכם.'
                : 'Every project is unique. If you have specific requirements or need a combination of services not listed above, let\'s discuss a personalized solution that fits your exact needs and budget.'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={handleCustomSolution}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {locale === 'he' ? 'בואו נדבר על פתרון מותאם' : 'Discuss Custom Solution'}
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleCustomSolution}
              >
                {locale === 'he' ? 'קבעו שיחה' : 'Schedule a Call'}
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              {locale === 'he' 
                ? 'ייעוץ חינם • ללא התחייבות • מענה מהיר מובטח'
                : 'Free consultation • No commitment required • Quick response guaranteed'
              }
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}