'use client';

import React, { useState } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
  variant?: 'button' | 'dropdown';
}

export function ThemeToggle({ className, variant = 'dropdown' }: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { locale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    {
      value: 'light' as const,
      label: locale === 'he' ? 'בהיר' : 'Light',
      icon: Sun
    },
    {
      value: 'dark' as const,
      label: locale === 'he' ? 'כהה' : 'Dark',
      icon: Moon
    },
    {
      value: 'system' as const,
      label: locale === 'he' ? 'אוטומטי' : 'System',
      icon: Monitor
    }
  ];

  const currentTheme = themes.find(t => t.value === theme) || themes[0];
  const CurrentIcon = currentTheme!.icon;

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light';
    setTheme(nextTheme);
    setIsOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (variant === 'button') {
        toggleTheme();
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
        onClick={toggleTheme}
        onKeyDown={handleKeyDown}
        className={cn(
          'inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md',
          'bg-background border border-input hover:bg-accent hover:text-accent-foreground',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'transition-colors duration-200',
          className
        )}
        aria-label={locale === 'he' ? 'החלף מצב תצוגה' : 'Toggle theme'}
        title={`${locale === 'he' ? 'מצב נוכחי' : 'Current theme'}: ${currentTheme!.label}`}
      >
        <CurrentIcon className="w-4 h-4" aria-hidden="true" />
        <span className="hidden sm:inline">
          {currentTheme!.label}
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
        aria-label={locale === 'he' ? 'בחר מצב תצוגה' : 'Select theme'}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <CurrentIcon className="w-4 h-4" aria-hidden="true" />
        <span className="hidden sm:inline">
          {currentTheme!.label}
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
              locale === 'he' ? 'left-0' : 'right-0'
            )}
            role="listbox"
            aria-label={locale === 'he' ? 'בחר מצב תצוגה' : 'Select theme'}
          >
            <div className="py-1">
              {themes.map((themeOption) => {
                const Icon = themeOption.icon;
                const isSelected = theme === themeOption.value;
                
                return (
                  <button
                    key={themeOption.value}
                    onClick={() => {
                      setTheme(themeOption.value);
                      setIsOpen(false);
                    }}
                    className={cn(
                      'flex w-full items-center gap-3 px-4 py-2 text-sm',
                      'hover:bg-accent hover:text-accent-foreground',
                      'focus:bg-accent focus:text-accent-foreground focus:outline-none',
                      isSelected && 'bg-accent text-accent-foreground font-medium'
                    )}
                    role="option"
                    aria-selected={isSelected}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{themeOption.label}</span>
                    {isSelected && (
                      <span className={cn('text-primary', locale === 'he' ? 'mr-auto' : 'ml-auto')} aria-hidden="true">
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}