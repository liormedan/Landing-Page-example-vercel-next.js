'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/hooks/useLanguage';
import { LanguageToggle } from '@/components/ui/LanguageToggle';

interface NavigationProps {
  className?: string;
}

export default function Navigation({ className }: NavigationProps) {
  const { t, isRTL } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { href: '#hero', label: t.nav.home },
    { href: '#benefits', label: t.nav.benefits },
    { href: '#pricing', label: t.nav.pricing },
    { href: '#portfolio', label: t.nav.portfolio },
    { href: '#about', label: t.nav.about },
    { href: '#contact', label: t.nav.contact },
  ];

  // Handle scroll behavior for sticky navigation
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);

      // Update active section based on scroll position
      const sections = navigationItems.map(item => item.href.substring(1));
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navigationItems]);

  // Smooth scroll to section
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      id="navigation"
      role="navigation"
      aria-label="Main navigation"
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200'
          : 'bg-transparent',
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#hero');
              }}
              className="text-xl font-bold text-primary-600 hover:text-primary-700 transition-colors"
            >
              {isRTL ? 'לנדינג פרו' : 'Landing Pro'}
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className={cn(
              'flex items-baseline space-x-4',
              isRTL ? 'mr-10 space-x-reverse' : 'ml-10'
            )}>
              {navigationItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className={cn(
                    'px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200',
                    activeSection === item.href.substring(1)
                      ? 'text-primary-600 bg-primary-50'
                      : isScrolled
                      ? 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
                      : 'text-white hover:text-primary-200 hover:bg-white/10'
                  )}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Language Toggle & CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageToggle variant="button" />
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#contact');
              }}
              className={cn(
                'inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-colors duration-200',
                isScrolled
                  ? 'text-white bg-primary-600 hover:bg-primary-700'
                  : 'text-primary-600 bg-white hover:bg-gray-50'
              )}
            >
              {t.nav.getQuote}
            </a>
          </div>

          {/* Mobile Language Toggle & Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageToggle variant="button" className="scale-90" />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                'inline-flex items-center justify-center p-2 rounded-md transition-colors duration-200',
                isScrolled
                  ? 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
                  : 'text-white hover:text-primary-200 hover:bg-white/10'
              )}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? t.a11y.closeMenu : t.a11y.openMenu}
            >
              <span className="sr-only">
                {isMobileMenuOpen ? t.a11y.closeMenu : t.a11y.openMenu}
              </span>
              {/* Hamburger icon */}
              <svg
                className={cn(
                  'h-6 w-6 transition-transform duration-200',
                  isMobileMenuOpen ? 'rotate-90' : 'rotate-0'
                )}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isMobileMenuOpen
                      ? 'M6 18L18 6M6 6l12 12'
                      : 'M4 6h16M4 12h16M4 18h16'
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        id="mobile-menu"
        className={cn(
          'md:hidden transition-all duration-300 ease-in-out',
          isMobileMenuOpen
            ? 'max-h-96 opacity-100'
            : 'max-h-0 opacity-0 overflow-hidden'
        )}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md shadow-lg border-t border-gray-200">
          {navigationItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.href);
              }}
              className={cn(
                'block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200',
                activeSection === item.href.substring(1)
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
              )}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#contact');
            }}
            className="block px-3 py-2 mt-4 text-center text-white bg-primary-600 hover:bg-primary-700 rounded-md text-base font-medium transition-colors duration-200"
          >
            {t.nav.getQuote}
          </a>
        </div>
      </div>
    </nav>
  );
}