import React from 'react';
import { GradientCard } from './GradientCard';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  secondaryValue?: string;
  variant?: 'pink' | 'purple' | 'blue' | 'default';
}

export function StatCard({
  icon,
  label,
  value,
  secondaryValue,
  variant = 'default',
}: StatCardProps) {
  return (
    <GradientCard variant={variant} className="p-4">
      <div className="flex items-start gap-3">
        <div className="text-primary text-2xl mt-1">{icon}</div>
        <div className="flex-1">
          <div className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
            {label}
          </div>
          <div className="text-2xl font-bold text-foreground mt-1">{value}</div>
          {secondaryValue && (
            <div className="text-xs text-muted-foreground mt-1">{secondaryValue}</div>
          )}
        </div>
      </div>
    </GradientCard>
  );
}
