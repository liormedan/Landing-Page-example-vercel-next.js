import { lazy, Suspense } from 'react';
import Hero from '@/components/sections/Hero';
import { LazySection, SectionSkeleton } from '@/components/common/LazySection';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { StructuredData } from '@/components/seo/StructuredData';

// Lazy load sections that are below the fold
const Benefits = lazy(() => import('@/components/sections/Benefits'));
const Process = lazy(() => import('@/components/sections/Process'));
const AddOns = lazy(() => import('@/components/sections/AddOns').then(module => ({ default: module.AddOns })));
const About = lazy(() => import('@/components/sections/About'));

export default function Home() {
  return (
    <>
      <StructuredData type="service" />
      <div className="pt-16">
        {/* Hero Section */}
        <Hero />

        {/* Benefits Section */}
        <LazySection fallback={<SectionSkeleton className="py-20" />}>
          <Benefits />
        </LazySection>

        {/* Process Section */}
        <LazySection fallback={<SectionSkeleton className="py-20" />}>
          <Process />
        </LazySection>

        {/* Pricing Section */}
        <section id="pricing" className="py-20" aria-labelledby="pricing-heading">
          <div className="max-w-6xl mx-auto px-4">
            <h2 id="pricing-heading" className="text-3xl md:text-4xl font-bold text-center mb-16">
              Simple, Transparent Pricing
            </h2>
            <div className="grid md:grid-cols-3 gap-8" role="list" aria-label="Pricing plans">
            {[
              { name: "Basic", price: "₪1,900", features: ["Landing Page", "Mobile Responsive", "Basic SEO"] },
              { name: "Recommended", price: "₪3,200", features: ["Everything in Basic", "Contact Forms", "Analytics", "RTL Support"], popular: true },
              { name: "Premium", price: "₪5,400", features: ["Everything in Recommended", "A/B Testing", "CRM Integration", "Premium Support"] }
            ].map((plan, index) => (
              <article key={index} role="listitem">
                <Card className={`relative ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle as="h3" className="text-2xl">{plan.name}</CardTitle>
                    <div className="text-4xl font-bold" aria-label={`Price: ${plan.price}`}>{plan.price}</div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-8" aria-label={`${plan.name} plan features`}>
                      {plan.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-center">
                          <span className="text-green-500 mr-3" aria-hidden="true">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className="w-full" 
                      variant={plan.popular ? "default" : "outline"}
                      aria-label={`Choose ${plan.name} plan for ${plan.price}`}
                    >
                      Choose Plan
                    </Button>
                  </CardContent>
                </Card>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <LazySection fallback={<SectionSkeleton className="py-20" />}>
        <AddOns />
      </LazySection>

      {/* Portfolio Section */}
      <LazySection fallback={<SectionSkeleton className="py-20 bg-gray-50" />}>
        <section id="portfolio" className="py-20 bg-gray-50" aria-labelledby="portfolio-heading">
          <div className="max-w-6xl mx-auto px-4">
            <h2 id="portfolio-heading" className="text-3xl md:text-4xl font-bold text-center mb-16">
              Our Work
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" role="list" aria-label="Portfolio projects">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <article key={item} role="listitem">
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-48 bg-gradient-to-br from-primary to-secondary" role="img" aria-label={`Project ${item} preview image`} />
                    <CardContent className="p-6">
                      <CardTitle as="h3" className="text-xl font-semibold mb-2">Project {item}</CardTitle>
                      <p className="text-muted-foreground mb-4">Professional landing page with modern design and optimized performance.</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Next.js • Vercel</span>
                        <Button variant="ghost" size="sm" className="p-0 h-auto font-medium" aria-label={`View details for Project ${item}`}>
                          View Details →
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </article>
              ))}
            </div>
          </div>
        </section>
      </LazySection>

      {/* About Section */}
      <LazySection fallback={<SectionSkeleton className="py-20" />}>
        <About />
      </LazySection>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-primary-600 text-white" aria-labelledby="contact-heading">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 id="contact-heading" className="text-3xl md:text-4xl font-bold mb-8">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Let&apos;s discuss your project and create something amazing together.
          </p>
          <div className="max-w-md mx-auto">
            <form className="space-y-4" aria-label="Contact form">
              <Input
                type="text"
                placeholder="Your Name"
                className="bg-white text-gray-900"
                aria-label="Your name"
                required
              />
              <Input
                type="email"
                placeholder="Your Email"
                className="bg-white text-gray-900"
                aria-label="Your email address"
                required
              />
              <Textarea
                placeholder="Tell us about your project"
                rows={4}
                className="bg-white text-gray-900"
                aria-label="Project description"
                required
              />
              <Button
                type="submit"
                variant="secondary"
                className="w-full bg-white text-primary hover:bg-gray-100"
                aria-label="Send contact message"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
