'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { 
  FileText, 
  Palette, 
  Code, 
  Rocket,
  Clock
} from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

interface ProcessStep {
  id: number;
  title: string;
  description: string;
  duration: string;
  icon: React.ReactNode;
  details: string[];
}

const Process: React.FC = () => {
  const { t } = useLanguage();

  const processSteps: ProcessStep[] = [
    {
      id: 1,
      title: t.process.steps.consultation.title,
      description: t.process.steps.consultation.description,
      duration: 'יום 1',
      icon: <FileText className="w-6 h-6" />,
      details: [
        'איסוף דרישות מפורט',
        'תכנון תוכן ומסרים',
        'מפרט טכני',
        'אישור לוח זמנים'
      ]
    },
    {
      id: 2,
      title: t.process.steps.design.title,
      description: t.process.steps.design.description,
      duration: 'ימים 2-1',
      icon: <Palette className="w-6 h-6" />,
      details: [
        'יצירת wireframes',
        'עיצוב ויזואלי',
        'אופטימיזציה למובייל',
        'שילוב משוב הלקוח'
      ]
    },
    {
      id: 3,
      title: t.process.steps.development.title,
      description: t.process.steps.development.description,
      duration: 'ימים 3-2',
      icon: <Code className="w-6 h-6" />,
      details: [
        'פיתוח React/Next.js',
        'יישום רספונסיבי',
        'אינטגרציית טפסים',
        'אופטימיזציית ביצועים'
      ]
    },
    {
      id: 4,
      title: t.process.steps.launch.title,
      description: t.process.steps.launch.description,
      duration: 'יום 1',
      icon: <Rocket className="w-6 h-6" />,
      details: [
        'פריסה על Vercel',
        'הגדרת דומיין',
        'אופטימיזציית SEO',
        'אינטגרציית אנליטיקס'
      ]
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {t.process.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
            {t.process.subtitle}
          </p>
          <div className="flex items-center justify-center gap-2 text-blue-600">
            <Clock className="w-5 h-5" />
            <span className="font-semibold">סה"כ זמן ביצוע: ~5 ימי עבודה</span>
          </div>
        </div>

        {/* Desktop Timeline - Horizontal */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 transform -translate-y-1/2" />
            <div className="absolute top-1/2 left-0 h-0.5 bg-blue-500 transform -translate-y-1/2 transition-all duration-1000 ease-out"
                 style={{ width: '100%' }} />

            {/* Process Steps */}
            <div className="relative grid grid-cols-4 gap-8">
              {processSteps.map((step) => (
                <div key={step.id} className="relative">
                  {/* Step Circle */}
                  <div className="flex justify-center mb-6">
                    <div className={cn(
                      "relative w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg",
                      "bg-blue-500 border-4 border-white"
                    )}>
                      {step.icon}
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-xs font-bold text-white">
                        {step.id}
                      </div>
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <Badge variant="secondary" className="mb-3 bg-blue-100 text-blue-700 hover:bg-blue-100/80">
                      <Clock className="w-3 h-3 mr-1" />
                      {step.duration}
                    </Badge>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {step.description}
                    </p>
                    
                    {/* Step Details */}
                    <Card>
                      <CardContent className="p-4">
                        <ul className="text-left space-y-1">
                          {step.details.map((detail, detailIndex) => (
                            <li key={detailIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Timeline - Vertical */}
        <div className="lg:hidden">
          <div className="relative">
            {/* Vertical Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300" />
            <div className="absolute left-8 top-0 w-0.5 bg-blue-500 transition-all duration-1000 ease-out"
                 style={{ height: '100%' }} />

            {/* Process Steps */}
            <div className="space-y-12">
              {processSteps.map((step) => (
                <div key={step.id} className="relative flex items-start gap-6">
                  {/* Step Circle */}
                  <div className="relative flex-shrink-0">
                    <div className={cn(
                      "w-16 h-16 rounded-full flex items-center justify-center text-white font-bold shadow-lg",
                      "bg-blue-500 border-4 border-white"
                    )}>
                      {step.icon}
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-xs font-bold text-white">
                        {step.id}
                      </div>
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 pb-8">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {step.title}
                      </h3>
                      <Badge variant="secondary" className="mb-3 bg-blue-100 text-blue-700 hover:bg-blue-100/80">
                        <Clock className="w-3 h-3 mr-1" />
                        {step.duration}
                      </Badge>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                    
                    {/* Step Details */}
                    <Card>
                      <CardContent className="p-4">
                        <ul className="space-y-2">
                          {step.details.map((detail, detailIndex) => (
                            <li key={detailIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                Ready to Get Started?
              </h3>
              <p className="text-muted-foreground mb-6">
                Let&apos;s discuss your project and create a landing page that converts visitors into customers.
              </p>
              <Button 
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                size="lg"
                className="gap-2"
              >
                Start Your Project
                <Rocket className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Process;