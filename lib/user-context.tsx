'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { calculateLevel, getCurrentLevelXP, getXPForNextLevel } from './xp-system';

export interface UserProgress {
  totalXP: number;
  level: number;
  streak: number;
  lastActivityDate: Date | null;
  badges: string[];
  totalQuizzesTaken: number;
  totalProjectsCompleted: number;
  isPremium: boolean;
}

interface UserContextType {
  progress: UserProgress;
  addXP: (amount: number) => void;
  updateStreak: () => void;
  addBadge: (badge: string) => void;
  completeQuiz: () => void;
  completeProject: () => void;
  togglePremium: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const defaultProgress: UserProgress = {
  totalXP: 250,
  level: 2,
  streak: 5,
  lastActivityDate: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  badges: ['first-steps', 'week-warrior'],
  totalQuizzesTaken: 8,
  totalProjectsCompleted: 2,
  isPremium: false,
};

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<UserProgress>(defaultProgress);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('loopify-progress');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setProgress(parsed);
      } catch (e) {
        console.error('Failed to parse user progress:', e);
      }
    }
  }, []);

  const addXP = (amount: number) => {
    setProgress((prev) => {
      const newProgress = {
        ...prev,
        totalXP: prev.totalXP + amount,
        level: calculateLevel(prev.totalXP + amount),
        lastActivityDate: new Date(),
      };
      localStorage.setItem('loopify-progress', JSON.stringify(newProgress));
      return newProgress;
    });
  };

  const updateStreak = () => {
    setProgress((prev) => {
      const lastActivity = prev.lastActivityDate ? new Date(prev.lastActivityDate) : new Date();
      const now = new Date();
      const daysSinceLastActivity = Math.floor((now.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24));

      const newStreak = daysSinceLastActivity === 0 ? prev.streak : daysSinceLastActivity === 1 ? prev.streak + 1 : 1;

      const newProgress = {
        ...prev,
        streak: newStreak,
        lastActivityDate: new Date(),
      };
      localStorage.setItem('loopify-progress', JSON.stringify(newProgress));
      return newProgress;
    });
  };

  const addBadge = (badge: string) => {
    setProgress((prev) => {
      if (prev.badges.includes(badge)) return prev;
      const newProgress = {
        ...prev,
        badges: [...prev.badges, badge],
      };
      localStorage.setItem('loopify-progress', JSON.stringify(newProgress));
      return newProgress;
    });
  };

  const completeQuiz = () => {
    setProgress((prev) => {
      const newProgress = {
        ...prev,
        totalQuizzesTaken: prev.totalQuizzesTaken + 1,
      };
      localStorage.setItem('loopify-progress', JSON.stringify(newProgress));
      return newProgress;
    });
  };

  const completeProject = () => {
    setProgress((prev) => {
      const newProgress = {
        ...prev,
        totalProjectsCompleted: prev.totalProjectsCompleted + 1,
      };
      localStorage.setItem('loopify-progress', JSON.stringify(newProgress));
      return newProgress;
    });
  };

  const togglePremium = () => {
    setProgress((prev) => {
      const newProgress = {
        ...prev,
        isPremium: !prev.isPremium,
      };
      localStorage.setItem('loopify-progress', JSON.stringify(newProgress));
      return newProgress;
    });
  };

  return (
    <UserContext.Provider
      value={{
        progress,
        addXP,
        updateStreak,
        addBadge,
        completeQuiz,
        completeProject,
        togglePremium,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}
