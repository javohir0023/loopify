import React from 'react';
import { GradientCard } from './GradientCard';

interface StreakDisplayProps {
  count: number;
  atRisk?: boolean;
  hoursUntilReset?: number;
}

export function StreakDisplay({
  count,
  atRisk = false,
  hoursUntilReset,
}: StreakDisplayProps) {
  return (
    <GradientCard
      variant={atRisk ? 'pink' : 'default'}
      className={`p-3 ${atRisk ? 'border-orange-500/50' : ''}`}
    >
      <div className="flex items-center gap-3">
        <div className="text-4xl">🔥</div>
        <div className="flex-1">
          <div className="text-sm text-muted-foreground">Current Streak</div>
          <div className="text-2xl font-bold text-foreground">{count} days</div>
          {atRisk && hoursUntilReset && (
            <div className="text-xs text-orange-400 font-semibold mt-1">
              ⚠️ Reset in {hoursUntilReset}h
            </div>
          )}
        </div>
      </div>
    </GradientCard>
  );
}
