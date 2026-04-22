'use client';

import React from 'react';

interface LevelProgressBarProps {
  currentXP: number;
  xpForNextLevel: number;
  level: number;
  showLabel?: boolean;
}

export function LevelProgressBar({
  currentXP,
  xpForNextLevel,
  level,
  showLabel = true,
}: LevelProgressBarProps) {
  const percentage = (currentXP / xpForNextLevel) * 100;

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <div>
            <div className="text-sm text-muted-foreground">Level {level}</div>
          </div>
          <div className="text-sm font-semibold text-primary">
            {currentXP} / {xpForNextLevel} XP
          </div>
        </div>
      )}
      <div className="h-3 bg-card border border-border rounded-full overflow-hidden">
        <div
          className={`
            h-full bg-gradient-to-r from-primary to-accent rounded-full
            transition-all duration-500 ease-out
            shadow-[0_0_10px_rgba(236,72,153,0.5)]
          `}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  );
}
