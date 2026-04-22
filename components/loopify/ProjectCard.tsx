import React from 'react';
import { GradientCard } from './GradientCard';
import { GlowButton } from './GlowButton';

interface ProjectCardProps {
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  xpReward: number;
  isCompleted?: boolean;
  isPremium?: boolean;
  onStart: () => void;
}

export function ProjectCard({
  title,
  description,
  difficulty,
  xpReward,
  isCompleted = false,
  isPremium = false,
  onStart,
}: ProjectCardProps) {
  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'Beginner':
        return 'pink';
      case 'Intermediate':
        return 'purple';
      case 'Advanced':
        return 'blue';
    }
  };

  const getDifficultyIcon = () => {
    switch (difficulty) {
      case 'Beginner':
        return '🌱';
      case 'Intermediate':
        return '🌿';
      case 'Advanced':
        return '🌳';
    }
  };

  return (
    <GradientCard variant={getDifficultyColor()} className="p-4">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-foreground">{title}</h3>
              {isPremium && <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">Premium</span>}
            </div>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          {isCompleted && <span className="text-2xl">✅</span>}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-center gap-2">
            <span>{getDifficultyIcon()}</span>
            <span className="text-xs font-medium text-muted-foreground">{difficulty}</span>
            <span className="text-xs text-primary font-bold">+{xpReward} XP</span>
          </div>
          {!isCompleted && (
            <GlowButton size="sm" onClick={onStart}>
              Start
            </GlowButton>
          )}
        </div>
      </div>
    </GradientCard>
  );
}
