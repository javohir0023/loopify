export interface XPData {
  total: number;
  lastUpdated: string;
  level: number;
  progress: number; // 0-100, progress to next level
}

const XP_PER_LEVEL = 500; // Her level uchun zarur bo'lgan XP
const STORAGE_KEY = 'loopify_xp_data';

export function getXPData(): XPData {
  if (typeof window === 'undefined') {
    return {
      total: 0,
      lastUpdated: new Date().toISOString(),
      level: 1,
      progress: 0,
    };
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.log('[v0] XP data parsing error:', e);
  }

  return {
    total: 0,
    lastUpdated: new Date().toISOString(),
    level: 1,
    progress: 0,
  };
}

export function addXP(amount: number): XPData {
  const current = getXPData();
  const newTotal = current.total + amount;
  
  // Level va progress hisoblash
  const level = Math.floor(newTotal / XP_PER_LEVEL) + 1;
  const xpForCurrentLevel = (level - 1) * XP_PER_LEVEL;
  const progress = Math.round(((newTotal - xpForCurrentLevel) / XP_PER_LEVEL) * 100);

  const updated: XPData = {
    total: newTotal,
    lastUpdated: new Date().toISOString(),
    level,
    progress: Math.min(progress, 100),
  };

  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  return updated;
}

export function resetXP(): XPData {
  const reset: XPData = {
    total: 0,
    lastUpdated: new Date().toISOString(),
    level: 1,
    progress: 0,
  };

  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reset));
  }

  return reset;
}

export function getLevelProgress(xpData: XPData): {
  current: number;
  nextLevel: number;
  xpNeeded: number;
} {
  const xpForCurrentLevel = (xpData.level - 1) * XP_PER_LEVEL;
  const xpForNextLevel = xpData.level * XP_PER_LEVEL;
  const xpNeeded = xpForNextLevel - xpData.total;

  return {
    current: xpData.level,
    nextLevel: xpData.level + 1,
    xpNeeded: Math.max(0, xpNeeded),
  };
}
