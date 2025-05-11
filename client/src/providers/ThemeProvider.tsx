import React, { ReactNode } from 'react';
import { ThemeProvider as ThemeContextProvider } from '@/contexts/ThemeContext';

interface ThemeProviderProps {
  children: ReactNode;
}

// This component combines the ThemeContext provider with applying the dark class
export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <ThemeContextProvider>
      {children}
    </ThemeContextProvider>
  );
}
