'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface SkipLink {
  href: string;
  label: string;
}

interface SkipLinksProps {
  links?: SkipLink[];
  className?: string;
}

const defaultLinks: SkipLink[] = [
  { href: '#main-content', label: 'Skip to main content' },
  { href: '#navigation', label: 'Skip to navigation' },
  { href: '#contact', label: 'Skip to contact form' },
];

export function SkipLinks({ links = defaultLinks, className }: SkipLinksProps) {
  const handleSkipClick = (href: string, event: React.MouseEvent) => {
    event.preventDefault();
    
    const target = document.querySelector(href);
    if (target) {
      // Make the target focusable if it isn't already
      const element = target as HTMLElement;
      const originalTabIndex = element.getAttribute('tabindex');
      
      if (!element.hasAttribute('tabindex')) {
        element.setAttribute('tabindex', '-1');
      }
      
      element.focus();
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // Remove temporary tabindex after focus
      if (!originalTabIndex) {
        setTimeout(() => {
          element.removeAttribute('tabindex');
        }, 100);
      }
    }
  };

  return (
    <div className={cn('skip-links', className)}>
      {links.map((link, index) => (
        <a
          key={index}
          href={link.href}
          onClick={(e) => handleSkipClick(link.href, e)}
          className={cn(
            // Position off-screen by default
            'absolute left-[-10000px] top-auto w-[1px] h-[1px] overflow-hidden',
            // Show when focused
            'focus:left-4 focus:top-4 focus:w-auto focus:h-auto focus:overflow-visible',
            // Styling when visible
            'focus:z-[9999] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground',
            'focus:rounded-md focus:shadow-lg focus:border-2 focus:border-primary-foreground',
            'focus:text-sm focus:font-medium focus:no-underline',
            // Smooth transitions
            'transition-all duration-200 ease-in-out',
            // Ensure it's above everything when focused
            'focus:fixed'
          )}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}

export default SkipLinks;