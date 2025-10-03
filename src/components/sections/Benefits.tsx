'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/hooks/useLanguage';

// Icons as SVG components for better performance
const SpeedIcon = ({ className }: { className?: string }) => (
  <svg className={cn("w-8 h-8", className)} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const ShieldIcon = ({ className }: { className?: string }) => (
  <svg className={cn("w-8 h-8", className)} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const GlobeIcon = ({ className }: { className?: string }) => (
  <svg className={cn("w-8 h-8", className)} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
  </svg>
);

const TrendingUpIcon = ({ className }: { className?: string }) => (
  <svg className={cn("w-8 h-8", className)} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

interface BenefitItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  highlight?: string;
}

interface TechLogo {
  name: string;
  logo: string;
  description: string;
}

interface PerformanceMetric {
  label: string;
  value: string;
  description: string;
}

const Benefits: React.FC = () => {
  const { t } = useLanguage();
  
  const benefits: BenefitItem[] = [
    {
      icon: SpeedIcon,
      title: t.benefits.items.performance.title,
      description: t.benefits.items.performance.description,
      highlight: "< 2.5s LCP"
    },
    {
      icon: ShieldIcon,
      title: t.benefits.items.seo.title,
      description: t.benefits.items.seo.description,
      highlight: "99.99% Uptime"
    },
    {
      icon: GlobeIcon,
      title: t.benefits.items.responsive.title,
      description: t.benefits.items.responsive.description,
      highlight: "100+ Locations"
    },
    {
      icon: TrendingUpIcon,
      title: t.benefits.items.rtl.title,
      description: t.benefits.items.rtl.description,
      highlight: t.benefits.items.analytics.title
    }
  ];

  const techLogos: TechLogo[] = [
    {
      name: "React",
      logo: "⚛️",
      description: "Modern UI library"
    },
    {
      name: "Next.js",
      logo: "▲",
      description: "Full-stack framework"
    },
    {
      name: "Tailwind CSS",
      logo: "🎨",
      description: "Utility-first CSS"
    },
    {
      name: "Vercel",
      logo: "▲",
      description: "Deployment platform"
    }
  ];

  const performanceMetrics: PerformanceMetric[] = [
    {
      label: "Page Load Speed",
      value: "< 1.5s",
      description: "Average first contentful paint"
    },
    {
      label: "Performance Score",
      value: "95+",
      description: "Google Lighthouse score"
    },
    {
      label: "Uptime Guarantee",
      value: "99.99%",
      description: "Service level agreement"
    }
  ];

  return (
    <section id="benefits" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="info" className="mb-4">
            {t.benefits.title}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {t.benefits.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.benefits.subtitle}
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <Card 
                key={index} 
                className="relative overflow-hidden hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                        <IconComponent className="text-blue-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-semibold">
                          {benefit.title}
                        </h3>
                        {benefit.highlight && (
                          <Badge variant="success" size="sm">
                            {benefit.highlight}
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Technology Stack */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Powered by Modern Technology
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {techLogos.map((tech, index) => (
              <Card 
                key={index}
                className="text-center hover:shadow-md transition-all duration-200"
              >
                <CardContent className="p-6">
                  <div className="text-4xl mb-3">{tech.logo}</div>
                  <h4 className="font-semibold mb-1">{tech.name}</h4>
                  <p className="text-sm text-muted-foreground">{tech.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-blue-600 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold text-center mb-8">
            Performance That Converts
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold mb-2">{metric.value}</div>
                <div className="text-xl font-semibold mb-1">{metric.label}</div>
                <div className="text-blue-100 text-sm">{metric.description}</div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-blue-100">
              * Based on average performance across 1000+ deployed landing pages
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;