'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Shield, Zap, Globe } from 'lucide-react';
import { analytics } from '@/lib/analytics';
import { useScrollTracking } from '@/hooks/useScrollTracking';

const Hero: React.FC = () => {
  const sectionRef = useScrollTracking({ sectionName: 'hero' });

  const handleGetQuote = () => {
    analytics.trackCTAClick('Get Instant Quote', 'hero');
    
    // Scroll to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewPortfolio = () => {
    analytics.trackCTAClick('View Portfolio', 'hero');
    
    // Scroll to portfolio section
    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative bg-gradient-to-br from-blue-50 to-purple-50 py-20 lg:py-32 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500 rounded-full blur-xl" />
        <div className="absolute top-40 right-20 w-32 h-32 bg-purple-500 rounded-full blur-xl" />
        <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-blue-400 rounded-full blur-xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge variant="success" size="md" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              SSL Secured
            </Badge>
            <Badge variant="info" size="md" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Fast Delivery
            </Badge>
            <Badge variant="default" size="md" className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Global CDN
            </Badge>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Professional Landing Pages
            <span className="block text-blue-600">Built for Results</span>
          </h1>

          {/* Value Proposition */}
          <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Get a high-converting landing page built with React, Next.js, and deployed on Vercel. 
            Fast delivery, RTL support, and performance optimization included.
          </p>

          {/* Key Benefits */}
          <div className="flex flex-wrap justify-center gap-6 mb-10 text-gray-700">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-lg">5-day delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-lg">Mobile optimized</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-lg">SEO ready</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={handleGetQuote}
              className="min-w-[200px]"
            >
              Get Instant Quote
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleViewPortfolio}
              className="min-w-[200px]"
            >
              View Portfolio
            </Button>
          </div>

          {/* Additional Trust Indicator */}
          <p className="text-sm text-gray-500 mt-6">
            ✨ Trusted by 50+ businesses • No setup fees • 30-day support included
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;