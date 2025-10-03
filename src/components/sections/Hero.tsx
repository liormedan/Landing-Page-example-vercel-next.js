'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Shield, Zap, Globe } from 'lucide-react';
import { analytics } from '@/lib/analytics';
import { useScrollTracking } from '@/hooks/useScrollTracking';
import { useLanguage } from '@/hooks/useLanguage';

const Hero: React.FC = () => {
  const { t, isRTL } = useLanguage();
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
      className="relative animated-bg py-20 lg:py-32 overflow-hidden"
    >
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-20 dark:opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary rounded-full blur-xl animate-pulse" />
        <div className="absolute top-40 right-20 w-32 h-32 bg-primary/70 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-primary/50 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge variant="success" size="md" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              {t.hero.badges.sslSecured}
            </Badge>
            <Badge variant="info" size="md" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              {t.hero.badges.fastDelivery}
            </Badge>
            <Badge variant="default" size="md" className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              {t.hero.badges.globalCdn}
            </Badge>
          </div>

          {/* Main Headline */}
          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight ${isRTL ? 'text-right' : 'text-center'}`}>
            {t.hero.title}
          </h1>

          {/* Value Proposition */}
          <p className={`text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed ${isRTL ? 'text-right' : 'text-center'}`}>
            {t.hero.description}
          </p>

          {/* Key Benefits */}
          <div className="flex flex-wrap justify-center gap-6 mb-10 text-gray-700">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-lg">{t.hero.benefits.delivery}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-lg">{t.hero.benefits.mobile}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-lg">{t.hero.benefits.seo}</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
            <Button
              size="lg"
              onClick={handleGetQuote}
              className="min-w-[200px]"
            >
              {t.hero.cta.getQuote}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleViewPortfolio}
              className="min-w-[200px]"
            >
              {t.hero.cta.viewPortfolio}
            </Button>
          </div>

          {/* Additional Trust Indicator */}
          <p className="text-sm text-gray-500 mt-6">
            {t.hero.trustIndicator}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;