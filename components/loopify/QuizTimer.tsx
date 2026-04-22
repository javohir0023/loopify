'use client';

import { useEffect, useState } from 'react';

interface QuizTimerProps {
  duration: number; // in seconds
  onTimeUp: () => void;
  isActive?: boolean;
}

export function QuizTimer({ duration, onTimeUp, isActive = true }: QuizTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (!isActive) return;

    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isActive, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isWarning = timeLeft < 10;
  const isLowTime = timeLeft < 30;

  return (
    <div
      className={`
        inline-flex items-center gap-2 px-4 py-2 rounded-lg border-2
        transition-all
        ${
          isWarning
            ? 'border-red-500 bg-red-500/10 animate-pulse'
            : isLowTime
              ? 'border-orange-500 bg-orange-500/10'
              : 'border-primary bg-primary/10'
        }
      `}
    >
      <span className="text-lg">⏱️</span>
      <span
        className={`
          font-bold text-sm font-mono
          ${isWarning ? 'text-red-500' : isLowTime ? 'text-orange-500' : 'text-primary'}
        `}
      >
        {minutes}:{seconds.toString().padStart(2, '0')}
      </span>
    </div>
  );
}
