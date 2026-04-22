/**
 * XP System for Loopify
 * Handles all XP-related calculations and rewards
 */

export const XP_REWARDS = {
  QUIZ: 10,
  DAILY_CHALLENGE: 20,
  MINI_PROJECT_BEGINNER: 50,
  MINI_PROJECT_INTERMEDIATE: 75,
  MINI_PROJECT_ADVANCED: 100,
  STREAK_BONUS: 5,
} as const;

export const XP_PER_LEVEL = 100;

/**
 * Calculate the current level based on total XP
 * Level = Floor(Total XP / 100)
 */
export function calculateLevel(totalXP: number): number {
  return Math.floor(totalXP / XP_PER_LEVEL);
}

/**
 * Calculate XP needed to reach next level
 */
export function getXPForNextLevel(currentXP: number): number {
  const currentLevel = calculateLevel(currentXP);
  const xpForCurrentLevel = currentLevel * XP_PER_LEVEL;
  const nextLevelXP = (currentLevel + 1) * XP_PER_LEVEL;
  return nextLevelXP - xpForCurrentLevel;
}

/**
 * Calculate current XP progress in the current level
 */
export function getCurrentLevelXP(totalXP: number): number {
  const currentLevel = calculateLevel(totalXP);
  const xpForCurrentLevel = currentLevel * XP_PER_LEVEL;
  return totalXP - xpForCurrentLevel;
}

/**
 * Check if user just leveled up
 */
export function didLevelUp(previousXP: number, currentXP: number): boolean {
  return calculateLevel(previousXP) < calculateLevel(currentXP);
}

/**
 * Get the next level milestone
 */
export function getNextLevelMilestone(totalXP: number): number {
  const currentLevel = calculateLevel(totalXP);
  return (currentLevel + 1) * XP_PER_LEVEL;
}

/**
 * Format XP display
 */
export function formatXP(xp: number): string {
  return xp.toLocaleString();
}

/**
 * Calculate daily streak bonus
 */
export function calculateStreakBonus(streakDays: number): number {
  return streakDays * XP_REWARDS.STREAK_BONUS;
}
