'use client';

import React from 'react';
import { LanguageContext, useLocale } from '@/hooks/useLanguage';

interface LanguageProviderProps {
  children: React.ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const languageData = useLocale();

  return (
    <LanguageContext.Provider value={languageData}>
      {children}
    </LanguageContext.Provider>
  );
}