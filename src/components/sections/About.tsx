'use client';

import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { 
  Code2, 
  Headphones, 
  Globe, 
  Zap, 
  Heart,
  CheckCircle,
  Star,
  Award
} from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const About: React.FC = () => {
  const { t } = useLanguage();
  
  const expertisePoints = [
    {
      icon: <Code2 className="w-8 h-8 text-blue-600" />,
      title: t.about.title,
      description: t.about.description
    },
    {
      icon: <Headphones className="w-8 h-8 text-purple-600" />,
      title: t.benefits.items.performance.title,
      description: t.benefits.items.performance.description
    },
    {
      icon: <Globe className="w-8 h-8 text-green-600" />,
      title: t.benefits.items.rtl.title,
      description: t.benefits.items.rtl.description
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-600" />,
      title: t.benefits.items.analytics.title,
      description: t.benefits.items.analytics.description
    },
    {
      icon: <Heart className="w-8 h-8 text-red-600" />,
      title: t.benefits.items.support.title,
      description: "Direct communication, attention to detail, and commitment to delivering exactly what you need."
    }
  ];

  const credibilityIndicators = [
    { icon: <CheckCircle className="w-5 h-5" />, text: "50+ successful projects delivered" },
    { icon: <Star className="w-5 h-5" />, text: "5-star client satisfaction rating" },
    { icon: <Award className="w-5 h-5" />, text: "Specialized in Hebrew/RTL development" },
    { icon: <Zap className="w-5 h-5" />, text: "Average 95+ PageSpeed scores" }
  ];

  return (
    <section id="about" className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <Badge variant="outline" size="md" className="mb-4">
              About Me
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Unique Expertise for
              <span className="block text-blue-600">Exceptional Results</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              I bring a rare combination of technical precision from audio engineering 
              and modern web development expertise to create landing pages that truly perform.
            </p>
          </div>

          {/* Expertise Points Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {expertisePoints.map((point, index) => (
              <div 
                key={index}
                className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-2 bg-white rounded-lg shadow-sm">
                    {point.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {point.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Personal Approach Section */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 lg:p-12 mb-16">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                Why This Unique Background Matters
              </h3>
              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    Audio Engineering Precision
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    Years of audio engineering taught me obsessive attention to detail, 
                    technical precision, and the importance of every millisecond. 
                    I apply this same meticulous approach to web performance and user experience.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    RTL Development Expertise
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    Living and working in Israel, I understand the nuances of Hebrew/Arabic 
                    layouts, cultural considerations, and the technical challenges of RTL development. 
                    Your site will look perfect in any language.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Credibility Indicators */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Proven Track Record
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {credibilityIndicators.map((indicator, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-center gap-3 p-4 bg-gray-50 rounded-lg"
                >
                  <div className="text-green-600">
                    {indicator.icon}
                  </div>
                  <span className="text-gray-700 font-medium text-sm">
                    {indicator.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Personal Touch */}
          <div className="mt-16 text-center">
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-gray-600 leading-relaxed italic">
                &ldquo;I don&apos;t just build websites – I craft digital experiences that convert visitors 
                into customers. Every project gets my personal attention, from the first consultation 
                to the final deployment and beyond.&rdquo;
              </p>
              <div className="mt-6 flex items-center justify-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  A
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">Alex</div>
                  <div className="text-sm text-gray-600">Landing Page Specialist</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;