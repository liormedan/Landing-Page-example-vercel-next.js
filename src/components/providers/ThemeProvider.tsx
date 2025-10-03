'use client';

import React from 'react';
import { ThemeContext, useThemeState } from '@/hooks/useTheme';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const themeData = useThemeState();

  return (
    <ThemeContext.Provider value={themeData}>
      {children}
    </ThemeContext.Provider>
  );
}