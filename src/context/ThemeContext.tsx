'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { THEME_PALETTE, VISUAL_PROPORTIONS, THEME_CLASSES, COLORS } from '../theme';

export type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  palette: typeof THEME_PALETTE;
  proportions: typeof VISUAL_PROPORTIONS;
  classes: typeof THEME_CLASSES;
  colors: typeof COLORS;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('matricsmania-theme');
      if (saved === 'light' || saved === 'dark') {
        return saved;
      }
    }
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('matricsmania-theme', theme);

    // Dynamically update favicon based on selected theme
    const favicon = document.querySelector("link[rel*='icon']") as HTMLLinkElement | null;
    if (favicon) {
      favicon.href = theme === 'dark' ? '/matrics-mania-logo-dark.webp' : '/matrics-mania-logo-light.webp';
      favicon.type = 'image/webp';
    }
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme,
        palette: THEME_PALETTE,
        proportions: VISUAL_PROPORTIONS,
        classes: THEME_CLASSES,
        colors: COLORS,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    return {
      theme: 'dark',
      toggleTheme: () => {},
      setTheme: () => {},
      palette: THEME_PALETTE,
      proportions: VISUAL_PROPORTIONS,
      classes: THEME_CLASSES,
      colors: COLORS,
    };
  }
  return context;
};

export * from '../theme';

