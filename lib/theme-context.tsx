'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'moon';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      applyTheme('light');
    }
    setMounted(true);
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    
    if (newTheme === 'moon') {
      root.style.setProperty('--background', '#07111f');
      root.style.setProperty('--foreground', '#e2e8f0');
      root.style.setProperty('--card', '#0f172a');
      root.style.setProperty('--card-foreground', '#e2e8f0');
      root.style.setProperty('--primary', '#38bdf8');
      root.style.setProperty('--primary-foreground', '#07111f');
      root.style.setProperty('--secondary', '#818cf8');
      root.style.setProperty('--secondary-foreground', '#e2e8f0');
      root.style.setProperty('--accent', '#38bdf8');
      root.style.setProperty('--accent-foreground', '#07111f');
      root.style.setProperty('--muted', '#1e293b');
      root.style.setProperty('--muted-foreground', '#94a3b8');
      root.style.setProperty('--border', '#1e293b');
      root.style.setProperty('--input', '#0f172a');
      root.style.setProperty('--ring', '#38bdf8');
      root.style.setProperty('--glow-pink', '#38bdf8');
      root.style.setProperty('--glow-purple', '#818cf8');
      root.style.setProperty('--glow-blue', '#38bdf8');
      root.classList.add('moon-mode');
    } else {
      root.style.setProperty('--background', '#0f0620');
      root.style.setProperty('--foreground', '#fafafa');
      root.style.setProperty('--card', '#1a1030');
      root.style.setProperty('--card-foreground', '#fafafa');
      root.style.setProperty('--primary', '#ec4899');
      root.style.setProperty('--primary-foreground', '#000');
      root.style.setProperty('--secondary', '#7c3aed');
      root.style.setProperty('--secondary-foreground', '#fafafa');
      root.style.setProperty('--accent', '#f472b6');
      root.style.setProperty('--accent-foreground', '#000');
      root.style.setProperty('--muted', '#3f2556');
      root.style.setProperty('--muted-foreground', '#a8a8a8');
      root.style.setProperty('--border', '#2d1e47');
      root.style.setProperty('--input', '#1a1030');
      root.style.setProperty('--ring', '#ec4899');
      root.style.setProperty('--glow-pink', '#ec4899');
      root.style.setProperty('--glow-purple', '#7c3aed');
      root.style.setProperty('--glow-blue', '#06b6d4');
      root.classList.remove('moon-mode');
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'moon' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
