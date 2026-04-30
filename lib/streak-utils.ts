export interface StreakData {
  current: number;
  longest: number;
  lastQuizDate: string; // ISO date string
}

const STREAK_KEY = 'loopify_streak';

export function getStreakData(): StreakData {
  try {
    if (typeof window === 'undefined') {
      return { current: 0, longest: 0, lastQuizDate: '' };
    }

    const stored = localStorage.getItem(STREAK_KEY);
    if (!stored) {
      return { current: 0, longest: 0, lastQuizDate: '' };
    }

    return JSON.parse(stored);
  } catch {
    return { current: 0, longest: 0, lastQuizDate: '' };
  }
}

export function updateStreakAfterQuiz(): StreakData {
  const streak = getStreakData();
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

  // Agar bugun allaqachon quiz o'tkazgan bo'lsa, streakni o'zgaritirma
  if (streak.lastQuizDate === today) {
    return streak;
  }

  const lastDate = streak.lastQuizDate ? new Date(streak.lastQuizDate) : null;
  const currentDate = new Date(today);

  let newCurrent = streak.current;

  if (lastDate) {
    const diffTime = currentDate.getTime() - lastDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // Agar bugun yoki kecha quiz o'tkazgan bo'lsa streakni davom ettir
    if (diffDays === 0) {
      // Bugun allaqachon o'tkazgan
      newCurrent = streak.current;
    } else if (diffDays === 1) {
      // Kecha o'tkazgan - streakni davom ettir
      newCurrent = streak.current + 1;
    } else {
      // Streakni to'xtat va yangi boshla
      newCurrent = 1;
    }
  } else {
    // Birinchi marta
    newCurrent = 1;
  }

  const longest = Math.max(streak.longest, newCurrent);

  const newStreak: StreakData = {
    current: newCurrent,
    longest: longest,
    lastQuizDate: today,
  };

  localStorage.setItem(STREAK_KEY, JSON.stringify(newStreak));
  return newStreak;
}

export function resetStreak(): void {
  localStorage.removeItem(STREAK_KEY);
}
