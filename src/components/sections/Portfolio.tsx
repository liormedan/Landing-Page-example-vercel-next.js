'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { 
  ExternalLink, 
  TrendingUp, 
  Users, 
  Clock, 
  Star,
  Quote,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { PortfolioItem } from '@/types'
import { OptimizedImage, ResponsiveImage } from '@/components/common/OptimizedImage'
import { analytics } from '@/lib/analytics'
import { useScrollTracking } from '@/hooks/useScrollTracking'

const portfolioItems: PortfolioItem[] = [
  {
    id: 'tech-startup-saas',
    title: 'SaaS Platform Landing Page',
    description: 'Modern landing page for a B2B SaaS platform focusing on team collaboration tools.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&crop=center',
    technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'TypeScript'],
    results: {
      metric: 'Conversion Rate',
      improvement: '+127% increase'
    },
    testimonial: {
      quote: 'The landing page exceeded our expectations. The conversion rate improvement was immediate and significant.',
      author: 'Sarah Chen',
      role: 'Marketing Director, TechFlow'
    },
    liveUrl: 'https://example-saas.vercel.app'
  },
  {
    id: 'ecommerce-fashion',
    title: 'Fashion E-commerce Store',
    description: 'High-converting landing page for a premium fashion brand with focus on mobile experience.',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop&crop=center',
    technologies: ['Next.js', 'Tailwind CSS', 'Shopify Integration', 'RTL Support'],
    results: {
      metric: 'Mobile Conversions',
      improvement: '+89% increase'
    },
    testimonial: {
      quote: 'Beautiful design that perfectly captures our brand essence. The RTL support was flawless.',
      author: 'Ahmed Al-Rashid',
      role: 'Founder, Luxe Fashion'
    },
    liveUrl: 'https://example-fashion.vercel.app'
  },
  {
    id: 'fintech-app',
    title: 'FinTech Mobile App Landing',
    description: 'Trust-focused landing page for a financial technology app with emphasis on security and compliance.',
    imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop&crop=center',
    technologies: ['Next.js', 'Tailwind CSS', 'Chart.js', 'Security Features'],
    results: {
      metric: 'App Downloads',
      improvement: '+156% increase'
    },
    testimonial: {
      quote: 'The security-focused design helped build immediate trust with our users. Downloads skyrocketed.',
      author: 'Michael Rodriguez',
      role: 'Product Manager, SecurePay'
    },
    liveUrl: 'https://example-fintech.vercel.app'
  },
  {
    id: 'healthcare-clinic',
    title: 'Medical Clinic Website',
    description: 'Professional healthcare landing page with appointment booking and patient portal integration.',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop&crop=center',
    technologies: ['Next.js', 'Tailwind CSS', 'Calendar Integration', 'HIPAA Compliant'],
    results: {
      metric: 'Online Bookings',
      improvement: '+203% increase'
    },
    testimonial: {
      quote: 'Patient engagement improved dramatically. The booking system is intuitive and professional.',
      author: 'Dr. Rachel Green',
      role: 'Medical Director, HealthFirst Clinic'
    },
    liveUrl: 'https://example-healthcare.vercel.app'
  },
  {
    id: 'restaurant-chain',
    title: 'Restaurant Chain Landing',
    description: 'Multi-location restaurant landing page with online ordering and delivery integration.',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop&crop=center',
    technologies: ['Next.js', 'Tailwind CSS', 'Maps Integration', 'Order System'],
    results: {
      metric: 'Online Orders',
      improvement: '+178% increase'
    },
    testimonial: {
      quote: 'Our online presence transformed completely. Orders increased significantly across all locations.',
      author: 'Tony Marinelli',
      role: 'Operations Manager, Bella Vista'
    },
    liveUrl: 'https://example-restaurant.vercel.app'
  },
  {
    id: 'education-platform',
    title: 'Online Learning Platform',
    description: 'Educational platform landing page with course previews and student enrollment system.',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop&crop=center',
    technologies: ['Next.js', 'Tailwind CSS', 'Video Integration', 'LMS Integration'],
    results: {
      metric: 'Course Enrollments',
      improvement: '+145% increase'
    },
    testimonial: {
      quote: 'The design perfectly showcases our courses. Student engagement and enrollments are at an all-time high.',
      author: 'Prof. Lisa Wang',
      role: 'Academic Director, LearnTech'
    },
    liveUrl: 'https://example-education.vercel.app'
  }
]

interface PortfolioProps {
  className?: string
}

interface PortfolioModalProps {
  item: PortfolioItem
  isOpen: boolean
  onClose: () => void
  onNext: () => void
  onPrevious: () => void
  currentIndex: number
  totalItems: number
  onExternalLinkClick: (url: string, projectTitle: string) => void
}

function PortfolioModal({ 
  item, 
  isOpen, 
  onClose, 
  onNext, 
  onPrevious, 
  currentIndex, 
  totalItems,
  onExternalLinkClick
}: PortfolioModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-10 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Navigation Buttons */}
        {totalItems > 1 && (
          <>
            <button
              onClick={onPrevious}
              aria-label="Previous project"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={onNext}
              aria-label="Next project"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Modal Content */}
        <div className="p-8">
          {/* Project Image */}
          <ResponsiveImage
            src={item.imageUrl}
            alt={item.title}
            aspectRatio="16/10"
            className="mb-8 rounded-xl overflow-hidden"
            priority={false}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          />

          {/* Project Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {item.title}
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {item.description}
              </p>

              {/* Technologies */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {item.technologies.map((tech, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Live URL */}
              {item.liveUrl && (
                <Button
                  variant="outline"
                  className="w-full sm:w-auto"
                  onClick={() => {
                    onExternalLinkClick(item.liveUrl!, item.title);
                    window.open(item.liveUrl, '_blank');
                  }}
                >
                  <ExternalLink className="h-4 w-4" />
                  View Live Site
                </Button>
              )}
            </div>

            <div className="space-y-6">
              {/* Results */}
              {item.results && (
                <div className="bg-green-50 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <h4 className="font-semibold text-gray-900">Results Achieved</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{item.results.metric}</p>
                  <p className="text-2xl font-bold text-green-600">{item.results.improvement}</p>
                </div>
              )}

              {/* Testimonial */}
              {item.testimonial && (
                <div className="bg-blue-50 rounded-xl p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <Quote className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                    <blockquote className="text-gray-700 italic leading-relaxed">
                      "{item.testimonial.quote}"
                    </blockquote>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="font-semibold text-gray-900">{item.testimonial.author}</p>
                    <p className="text-sm text-gray-600">{item.testimonial.role}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Modal Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500">
              Project {currentIndex + 1} of {totalItems}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Portfolio({ className }: PortfolioProps) {
  const sectionRef = useScrollTracking({ sectionName: 'portfolio' });
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const openModal = (item: PortfolioItem, index: number) => {
    analytics.trackPortfolioView(item.title);
    setSelectedItem(item)
    setCurrentIndex(index)
  }

  const closeModal = () => {
    setSelectedItem(null)
  }

  const nextItem = () => {
    const nextIndex = (currentIndex + 1) % portfolioItems.length
    const nextItem = portfolioItems[nextIndex]
    if (nextItem) {
      setCurrentIndex(nextIndex)
      setSelectedItem(nextItem)
    }
  }

  const previousItem = () => {
    const prevIndex = currentIndex === 0 ? portfolioItems.length - 1 : currentIndex - 1
    const prevItem = portfolioItems[prevIndex]
    if (prevItem) {
      setCurrentIndex(prevIndex)
      setSelectedItem(prevItem)
    }
  }

  const handleContactForProject = (buttonText: string) => {
    analytics.trackCTAClick(buttonText, 'portfolio');
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleExternalLinkClick = (url: string, projectTitle: string) => {
    analytics.trackExternalLink(url, `View Live Site - ${projectTitle}`);
  }

  return (
    <>
      <section 
        ref={sectionRef}
        className={cn('py-20 px-4 bg-white', className)} 
        id="portfolio"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Success Stories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See how we've helped businesses across different industries achieve their goals 
              with high-converting landing pages built on Vercel.
            </p>
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {portfolioItems.map((item, index) => (
              <div
                key={item.id}
                className="group cursor-pointer"
                onClick={() => openModal(item, index)}
              >
                <Card className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-2 overflow-hidden bg-white">
                  {/* Project Image */}
                  <div className="relative w-full h-48 overflow-hidden">
                    <OptimizedImage
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button variant="secondary" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>

                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 leading-relaxed">
                      {item.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {item.technologies.slice(0, 3).map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline" size="sm">
                          {tech}
                        </Badge>
                      ))}
                      {item.technologies.length > 3 && (
                        <Badge variant="outline" size="sm">
                          +{item.technologies.length - 3}
                        </Badge>
                      )}
                    </div>

                    {/* Results Preview */}
                    {item.results && (
                      <div className="flex items-center gap-2 text-green-600 mb-4">
                        <TrendingUp className="h-4 w-4" />
                        <span className="text-sm font-semibold">{item.results.improvement}</span>
                      </div>
                    )}

                    {/* Testimonial Preview */}
                    {item.testimonial && (
                      <div className="border-l-4 border-blue-200 pl-3">
                        <p className="text-sm text-gray-600 italic">
                          "{item.testimonial.quote.length > 80 ? item.testimonial.quote.substring(0, 80) + '...' : item.testimonial.quote}"
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          — {item.testimonial.author}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 md:p-12 text-center">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Ready to Join Our Success Stories?
              </h3>
              <p className="text-lg text-gray-600 mb-8">
                Let's create a high-converting landing page that drives real results for your business. 
                Every project is unique, and we're here to make yours exceptional.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  onClick={() => handleContactForProject('Start Your Project')}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Start Your Project
                  <ExternalLink className="h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => handleContactForProject('Schedule Consultation')}
                >
                  <Users className="h-5 w-5" />
                  Schedule Consultation
                </Button>
              </div>
              <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>5-day delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>100% satisfaction</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Modal */}
      {selectedItem && (
        <PortfolioModal
          item={selectedItem}
          isOpen={!!selectedItem}
          onClose={closeModal}
          onNext={nextItem}
          onPrevious={previousItem}
          currentIndex={currentIndex}
          totalItems={portfolioItems.length}
          onExternalLinkClick={handleExternalLinkClick}
        />
      )}
    </>
  )
}