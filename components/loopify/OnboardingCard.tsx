import React from 'react';

interface OnboardingCardProps {
  icon: string;
  label: string;
  description: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export function OnboardingCard({
  icon,
  label,
  description,
  isSelected = false,
  onClick,
}: OnboardingCardProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
        isSelected
          ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20'
          : 'border-border hover:border-primary/50'
      }`}
    >
      <div className="flex items-start gap-3">
        <span className="text-3xl">{icon}</span>
        <div>
          <h3 className="font-bold text-foreground">{label}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </button>
  );
}
