'use client';

import React from 'react';

interface ProgressRingProps {
  percentage: number;
  radius?: number;
  strokeWidth?: number;
  label?: string;
  color?: 'pink' | 'purple' | 'blue';
}

export function ProgressRing({
  percentage,
  radius = 45,
  strokeWidth = 4,
  label,
  color = 'pink',
}: ProgressRingProps) {
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const colorMap = {
    pink: '#ec4899',
    purple: '#7c3aed',
    blue: '#06b6d4',
  };

  const normalizedRadius = radius - strokeWidth / 2;

  return (
    <div className="flex flex-col items-center gap-2">
      <svg
        height={radius * 2 + 4}
        width={radius * 2 + 4}
        className="transform -rotate-90"
      >
        <circle
          stroke="#2d1e47"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={radius + 2}
          cy={radius + 2}
        />
        <circle
          stroke={colorMap[color]}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference + ' ' + circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius + 2}
          cy={radius + 2}
          style={{ transition: 'stroke-dashoffset 0.35s' }}
          filter="drop-shadow(0 0 5px rgba(236, 72, 153, 0.3))"
        />
      </svg>
      {label && (
        <div className="text-center">
          <div className="text-lg font-bold text-primary">{percentage}%</div>
          <div className="text-xs text-muted-foreground">{label}</div>
        </div>
      )}
    </div>
  );
}
