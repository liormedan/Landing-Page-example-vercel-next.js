'use client';

import React, { useState } from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { Locale, languageNames } from '@/lib/i18n';
import { cn } from '@/lib/utils';

interface LanguageToggleProps {
  className?: string;
  variant?: 'button' | 'dropdown';
}

export function LanguageToggle({ className, variant = 'dropdown' }: LanguageToggleProps) {
  const { locale, setLocale, t, isRTL } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const toggleLanguage = () => {
    const newLocale: Locale = locale === 'en' ? 'he' : 'en';
    setLocale(newLocale);
    setIsOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (variant === 'button') {
        toggleLanguage();
      } else {
        setIsOpen(!isOpen);
      }
    } else if (event.key === 'Escape' && isOpen) {
      setIsOpen(false);
    }
  };

  if (variant === 'button') {
    return (
      <button
        onClick={toggleLanguage}
        onKeyDown={handleKeyDown}
        className={cn(
          'inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md',
          'bg-background border border-input hover:bg-accent hover:text-accent-foreground',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'transition-colors duration-200',
          className
        )}
        aria-label={t.a11y.languageSelector}
        title={`${t.a11y.currentLanguage}: ${languageNames[locale]}`}
      >
        <Globe className="w-4 h-4" aria-hidden="true" />
        <span className="hidden sm:inline">
          {languageNames[locale]}
        </span>
      </button>
    );
  }

  return (
    <div className={cn('relative', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className={cn(
          'inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md',
          'bg-background border border-input hover:bg-accent hover:text-accent-foreground',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'transition-colors duration-200'
        )}
        aria-label={t.a11y.languageSelector}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Globe className="w-4 h-4" aria-hidden="true" />
        <span className="hidden sm:inline">
          {languageNames[locale]}
        </span>
        <svg
          className={cn(
            'w-4 h-4 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          
          {/* Dropdown */}
          <div
            className={cn(
              'absolute z-20 mt-2 w-48 rounded-md border border-input bg-popover shadow-lg',
              'focus:outline-none',
              isRTL ? 'left-0' : 'right-0'
            )}
            role="listbox"
            aria-label={t.a11y.languageSelector}
          >
            <div className="py-1">
              <button
                onClick={() => {
                  setLocale('en');
                  setIsOpen(false);
                }}
                className={cn(
                  'flex w-full items-center gap-3 px-4 py-2 text-sm',
                  'hover:bg-accent hover:text-accent-foreground',
                  'focus:bg-accent focus:text-accent-foreground focus:outline-none',
                  locale === 'en' && 'bg-accent text-accent-foreground font-medium'
                )}
                role="option"
                aria-selected={locale === 'en'}
              >
                <span className="text-lg">🇺🇸</span>
                <span>English</span>
                {locale === 'en' && (
                  <span className="mr-auto text-primary" aria-hidden="true">✓</span>
                )}
              </button>
              
              <button
                onClick={() => {
                  setLocale('he');
                  setIsOpen(false);
                }}
                className={cn(
                  'flex w-full items-center gap-3 px-4 py-2 text-sm',
                  'hover:bg-accent hover:text-accent-foreground',
                  'focus:bg-accent focus:text-accent-foreground focus:outline-none',
                  locale === 'he' && 'bg-accent text-accent-foreground font-medium'
                )}
                role="option"
                aria-selected={locale === 'he'}
              >
                <span className="text-lg">🇮🇱</span>
                <span>עברית</span>
                {locale === 'he' && (
                  <span className="mr-auto text-primary" aria-hidden="true">✓</span>
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}