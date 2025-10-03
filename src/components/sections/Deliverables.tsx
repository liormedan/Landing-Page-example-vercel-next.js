'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { DeliverableItem, DeliverableCategory } from '@/types';
import { 
  CheckCircleIcon, 
  StarIcon, 
  ChevronDownIcon, 
  ChevronUpIcon,
  PaintBrushIcon,
  CodeBracketIcon,
  CloudArrowUpIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline';

// Mock data for deliverables - in a real app this would come from props or API
const deliverableCategories: DeliverableCategory[] = [
  {
    id: 'design',
    title: 'Design & User Experience',
    items: [
      {
        id: 'custom-design',
        title: 'Custom Landing Page Design',
        description: 'Tailored design that matches your brand identity',
        category: 'design',
        included: true,
        icon: 'paint-brush',
        details: [
          'Brand-aligned color scheme and typography',
          'Mobile-first responsive design',
          'Professional visual hierarchy',
          'Custom graphics and icons'
        ],
        expandable: true
      },
      {
        id: 'copywriting',
        title: 'Professional Copywriting',
        description: 'Compelling copy that converts visitors to customers',
        category: 'design',
        included: true,
        icon: 'document-text',
        details: [
          'Conversion-focused headlines',
          'Benefit-driven content',
          'Clear call-to-action messaging',
          'SEO-optimized text'
        ],
        expandable: true
      }
    ]
  },
  {
    id: 'development',
    title: 'Development & Functionality',
    items: [
      {
        id: 'react-development',
        title: 'React/Next.js Development',
        description: 'Modern, fast-loading website built with latest technologies',
        category: 'development',
        included: true,
        icon: 'code-bracket',
        details: [
          'Next.js 14+ with App Router',
          'TypeScript for type safety',
          'Tailwind CSS for styling',
          'Server-side rendering (SSR)'
        ],
        expandable: true
      },
      {
        id: 'contact-forms',
        title: 'Contact Forms & Validation',
        description: 'Professional contact forms with spam protection',
        category: 'development',
        included: true,
        icon: 'envelope',
        details: [
          'Form validation and error handling',
          'Email integration',
          'Spam protection',
          'Success/error notifications'
        ],
        expandable: true
      },
      {
        id: 'rtl-support',
        title: 'RTL Language Support',
        description: 'Full Hebrew/Arabic language support with proper RTL layout',
        category: 'development',
        included: true,
        icon: 'language',
        details: [
          'Right-to-left text direction',
          'Mirrored layouts and components',
          'Hebrew font optimization',
          'Cultural design considerations'
        ],
        expandable: true
      }
    ]
  },
  {
    id: 'deployment',
    title: 'Deployment & Infrastructure',
    items: [
      {
        id: 'vercel-deployment',
        title: 'Vercel Deployment',
        description: 'Lightning-fast hosting with global CDN',
        category: 'deployment',
        included: true,
        icon: 'cloud-arrow-up',
        details: [
          'Automatic deployments from Git',
          'Global CDN for fast loading',
          'SSL certificate included',
          'Custom domain setup'
        ],
        expandable: true
      },
      {
        id: 'domain-setup',
        title: 'Domain Configuration',
        description: 'Complete domain setup and DNS configuration',
        category: 'deployment',
        included: true,
        icon: 'globe-alt',
        details: [
          'DNS configuration',
          'SSL certificate setup',
          'Subdomain support',
          'Email forwarding setup'
        ],
        expandable: true
      }
    ]
  },
  {
    id: 'optimization',
    title: 'SEO & Performance',
    items: [
      {
        id: 'seo-optimization',
        title: 'SEO Optimization',
        description: 'Complete SEO setup for better search rankings',
        category: 'optimization',
        included: true,
        icon: 'magnifying-glass',
        details: [
          'Meta tags and descriptions',
          'Open Graph social sharing',
          'Structured data markup',
          'XML sitemap generation'
        ],
        expandable: true
      },
      {
        id: 'analytics',
        title: 'Analytics Integration',
        description: 'Google Analytics setup for tracking performance',
        category: 'optimization',
        included: true,
        icon: 'chart-bar',
        details: [
          'Google Analytics 4 setup',
          'Conversion tracking',
          'Event tracking for interactions',
          'Performance monitoring'
        ],
        expandable: true
      }
    ]
  },
  {
    id: 'premium',
    title: 'Premium Add-ons',
    items: [
      {
        id: 'ab-testing',
        title: 'A/B Testing Setup',
        description: 'Test different versions to optimize conversions',
        category: 'premium',
        included: false,
        icon: 'beaker',
        details: [
          'Multiple page variants',
          'Conversion tracking',
          'Statistical analysis',
          'Performance reporting'
        ],
        expandable: true
      },
      {
        id: 'crm-integration',
        title: 'CRM Integration',
        description: 'Connect forms to your CRM system',
        category: 'premium',
        included: false,
        icon: 'users',
        details: [
          'Salesforce integration',
          'HubSpot connection',
          'Custom API integrations',
          'Lead scoring setup'
        ],
        expandable: true
      },
      {
        id: 'advanced-animations',
        title: 'Advanced Animations',
        description: 'Engaging micro-interactions and animations',
        category: 'premium',
        included: false,
        icon: 'sparkles',
        details: [
          'Scroll-triggered animations',
          'Hover effects and transitions',
          'Loading animations',
          'Interactive elements'
        ],
        expandable: true
      }
    ]
  }
];

const iconMap = {
  'paint-brush': PaintBrushIcon,
  'code-bracket': CodeBracketIcon,
  'cloud-arrow-up': CloudArrowUpIcon,
  'rocket-launch': RocketLaunchIcon,
  'document-text': (props: any) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5-3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  ),
  'envelope': (props: any) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  ),
  'language': (props: any) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.61 0 3.2.021 4.8.021a48.473 48.473 0 0 1 4.8-.021m-9.6 0a47.906 47.906 0 0 0-.9 4.993c0 1.836.15 3.64.427 5.404M12 5.25c1.61 0 3.2.021 4.8.021a48.473 48.473 0 0 1 4.8-.021m-9.6 0a47.906 47.906 0 0 0-.9 4.993c0 1.836.15 3.64.427 5.404" />
    </svg>
  ),
  'globe-alt': (props: any) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3s-4.5 4.03-4.5 9 2.015 9 4.5 9zm8.716-6.747c-1.22-2.44-3.547-4.53-6.716-5.687m6.716 5.687A9.004 9.004 0 0112 21m-8.716-6.747c1.22-2.44 3.547-4.53 6.716-5.687m-6.716 5.687A9.004 9.004 0 0012 21m0-18c-2.485 0-4.5 4.03-4.5 9s2.015 9 4.5 9m0-18c2.485 0 4.5-4.03 4.5 9s-2.015 9-4.5 9m0-18v18" />
    </svg>
  ),
  'magnifying-glass': (props: any) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
  ),
  'chart-bar': (props: any) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
    </svg>
  ),
  'beaker': (props: any) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5a2.25 2.25 0 00-.659 1.591v3.853a3.75 3.75 0 003.75 3.75h7.5a3.75 3.75 0 003.75-3.75v-3.853a2.25 2.25 0 00-.659-1.591L15.409 10.409A2.25 2.25 0 0114.75 8.818V3.104a48.524 48.524 0 00-4.5 0z" />
    </svg>
  ),
  'users': (props: any) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  ),
  'sparkles': (props: any) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  )
};

interface DeliverableItemProps {
  item: DeliverableItem;
  isExpanded: boolean;
  onToggleExpand: (id: string) => void;
}

const DeliverableItemComponent: React.FC<DeliverableItemProps> = ({
  item,
  isExpanded,
  onToggleExpand
}) => {
  const IconComponent = iconMap[item.icon as keyof typeof iconMap] || CodeBracketIcon;
  
  return (
    <div className={cn(
      'border rounded-lg p-4 transition-all duration-200',
      item.included 
        ? 'border-green-200 bg-green-50' 
        : 'border-amber-200 bg-amber-50'
    )}>
      <div className="flex items-start gap-3">
        <div className={cn(
          'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
          item.included 
            ? 'bg-green-100 text-green-600' 
            : 'bg-amber-100 text-amber-600'
        )}>
          {item.included ? (
            <CheckCircleIcon className="w-5 h-5" />
          ) : (
            <StarIcon className="w-5 h-5" />
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 flex-1">
              <IconComponent className="w-5 h-5 text-gray-600 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">
                  {item.title}
                  {!item.included && (
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                      Premium
                    </span>
                  )}
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  {item.description}
                </p>
              </div>
            </div>
            
            {item.expandable && item.details && (
              <button
                onClick={() => onToggleExpand(item.id)}
                className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
              >
                {isExpanded ? (
                  <ChevronUpIcon className="w-4 h-4" />
                ) : (
                  <ChevronDownIcon className="w-4 h-4" />
                )}
              </button>
            )}
          </div>
          
          {item.expandable && item.details && isExpanded && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <ul className="space-y-1">
                {item.details.map((detail, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface DeliverablesProps {
  className?: string;
}

const Deliverables: React.FC<DeliverablesProps> = ({ className }) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  
  const toggleExpand = (itemId: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };
  
  const includedCount = deliverableCategories.reduce(
    (count, category) => count + category.items.filter(item => item.included).length,
    0
  );
  
  const premiumCount = deliverableCategories.reduce(
    (count, category) => count + category.items.filter(item => !item.included).length,
    0
  );
  
  return (
    <section className={cn('py-20 bg-gray-50', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            What You&apos;ll Get
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Every landing page includes everything you need to succeed online. 
            From design to deployment, we handle it all.
          </p>
          
          <div className="flex items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircleIcon className="w-5 h-5 text-green-600" />
              <span className="text-gray-600">
                <span className="font-semibold text-gray-900">{includedCount}</span> included features
              </span>
            </div>
            <div className="flex items-center gap-2">
              <StarIcon className="w-5 h-5 text-amber-600" />
              <span className="text-gray-600">
                <span className="font-semibold text-gray-900">{premiumCount}</span> premium add-ons
              </span>
            </div>
          </div>
        </div>
        
        {/* Deliverables Grid */}
        <div className="space-y-12">
          {deliverableCategories.map((category) => (
            <div key={category.id}>
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                {category.id === 'design' && <PaintBrushIcon className="w-6 h-6 text-blue-600" />}
                {category.id === 'development' && <CodeBracketIcon className="w-6 h-6 text-blue-600" />}
                {category.id === 'deployment' && <CloudArrowUpIcon className="w-6 h-6 text-blue-600" />}
                {category.id === 'optimization' && <RocketLaunchIcon className="w-6 h-6 text-blue-600" />}
                {category.id === 'premium' && <StarIcon className="w-6 h-6 text-amber-600" />}
                {category.title}
              </h3>
              
              <div className="grid gap-4 md:grid-cols-2">
                {category.items.map((item) => (
                  <DeliverableItemComponent
                    key={item.id}
                    item={item}
                    isExpanded={expandedItems.has(item.id)}
                    onToggleExpand={toggleExpand}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-gray-600 mb-6">
              Choose your package and get your professional landing page delivered in just 5 working days.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                View Pricing Packages
              </button>
              <button className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                Get Custom Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Deliverables;