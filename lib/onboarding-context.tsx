'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface OnboardingData {
  goal: 'python' | 'web' | 'ai' | null;
  skillLevel: 'beginner' | 'intermediate' | null;
  dailyTime: 5 | 15 | 30 | null;
  username: string | null;
  hasCompleted: boolean;
}

interface OnboardingContextType {
  data: OnboardingData;
  updateData: (partial: Partial<OnboardingData>) => void;
  resetOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

const defaultOnboarding: OnboardingData = {
  goal: null,
  skillLevel: null,
  dailyTime: null,
  username: null,
  hasCompleted: false,
};

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<OnboardingData>(defaultOnboarding);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('loopify-onboarding');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setData(parsed);
      } catch (e) {
        console.error('Failed to parse onboarding data:', e);
      }
    }
  }, []);

  const updateData = (partial: Partial<OnboardingData>) => {
    const newData = { ...data, ...partial };
    setData(newData);
    localStorage.setItem('loopify-onboarding', JSON.stringify(newData));
  };

  const resetOnboarding = () => {
    setData(defaultOnboarding);
    localStorage.removeItem('loopify-onboarding');
  };

  return (
    <OnboardingContext.Provider value={{ data, updateData, resetOnboarding }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider');
  }
  return context;
}
