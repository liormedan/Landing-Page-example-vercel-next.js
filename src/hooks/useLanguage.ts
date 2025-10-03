'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { Locale, defaultLocale, getTranslations, getDirection, type Translations } from '@/lib/i18n';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
  direction: 'ltr' | 'rtl';
  isRTL: boolean;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export function useLocale() {
  const [locale, setLocaleState] = useState<Locale>('he'); // Start with Hebrew

  // Load locale from localStorage on mount
  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') as Locale;
    if (savedLocale && (savedLocale === 'en' || savedLocale === 'he')) {
      setLocaleState(savedLocale);
    } else {
      // Default to Hebrew for Israeli market
      setLocaleState('he');
      // Optionally detect browser language
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('en')) {
        setLocaleState('en');
      }
    }
  }, []);

  // Update document direction and lang when locale changes
  useEffect(() => {
    const direction = getDirection(locale);
    const html = document.documentElement;
    
    html.setAttribute('lang', locale);
    html.setAttribute('dir', direction);
    
    // Update CSS custom properties for RTL support
    html.style.setProperty('--text-align-start', direction === 'rtl' ? 'right' : 'left');
    html.style.setProperty('--text-align-end', direction === 'rtl' ? 'left' : 'right');
    html.style.setProperty('--margin-start', direction === 'rtl' ? 'margin-right' : 'margin-left');
    html.style.setProperty('--margin-end', direction === 'rtl' ? 'margin-left' : 'margin-right');
    html.style.setProperty('--padding-start', direction === 'rtl' ? 'padding-right' : 'padding-left');
    html.style.setProperty('--padding-end', direction === 'rtl' ? 'padding-left' : 'padding-right');
    
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('locale', newLocale);
    
    // Announce language change to screen readers
    const announcement = newLocale === 'he' ? 'שפה שונתה לעברית' : 'Language changed to English';
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.style.position = 'absolute';
    announcer.style.left = '-10000px';
    announcer.textContent = announcement;
    document.body.appendChild(announcer);
    
    setTimeout(() => {
      document.body.removeChild(announcer);
    }, 1000);
  };

  const translations = getTranslations(locale);
  const direction = getDirection(locale);
  const isRTL = direction === 'rtl';

  return {
    locale,
    setLocale,
    t: translations,
    direction,
    isRTL
  };
}