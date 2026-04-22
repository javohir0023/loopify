import React from 'react';
import { GradientCard } from './GradientCard';
import { GlowButton } from './GlowButton';

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  xpEarned: number;
  onRetry: () => void;
  onExit: () => void;
}

export function QuizResults({
  score,
  totalQuestions,
  xpEarned,
  onRetry,
  onExit,
}: QuizResultsProps) {
  const percentage = (score / totalQuestions) * 100;
  const isPerfect = score === totalQuestions;
  const isPassed = percentage >= 60;

  const getResultMessage = () => {
    if (isPerfect) return 'Perfect Score!';
    if (percentage >= 80) return 'Excellent Work!';
    if (percentage >= 60) return 'Good Job!';
    return 'Keep Learning!';
  };

  const getResultEmoji = () => {
    if (isPerfect) return '🌟';
    if (percentage >= 80) return '🎉';
    if (percentage >= 60) return '👍';
    return '💪';
  };

  return (
    <div className="space-y-6">
      {/* Result Header */}
      <GradientCard variant="purple" className="p-8 text-center">
        <div className="text-6xl mb-4">{getResultEmoji()}</div>
        <h2 className="text-3xl font-bold text-foreground mb-2">{getResultMessage()}</h2>
        <p className="text-muted-foreground">Quiz completed!</p>
      </GradientCard>

      {/* Score Display */}
      <GradientCard variant={isPassed ? 'pink' : 'blue'} className="p-6">
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-5xl font-bold text-primary">{percentage.toFixed(0)}%</div>
            <p className="text-muted-foreground mt-2">
              {score} out of {totalQuestions} correct
            </p>
          </div>

          {/* Progress Bar */}
          <div className="h-3 bg-card border border-border rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </GradientCard>

      {/* XP Earned */}
      <GradientCard className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">XP Earned</p>
            <p className="text-2xl font-bold text-primary mt-1">+{xpEarned} XP</p>
          </div>
          <div className="text-4xl">⭐</div>
        </div>
      </GradientCard>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <GlowButton
          onClick={onExit}
          variant="outline"
          className="flex-1"
        >
          Exit
        </GlowButton>
        {!isPerfect && (
          <GlowButton
            onClick={onRetry}
            className="flex-1"
          >
            Try Again
          </GlowButton>
        )}
      </div>
    </div>
  );
}
