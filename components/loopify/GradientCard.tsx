import React from 'react';

interface GradientCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'pink' | 'purple' | 'blue' | 'default';
  interactive?: boolean;
}

export function GradientCard({
  children,
  className = '',
  variant = 'default',
  interactive = true,
}: GradientCardProps) {
  const getGradient = () => {
    switch (variant) {
      case 'pink':
        return 'from-pink-500/10 to-pink-600/5';
      case 'purple':
        return 'from-purple-500/10 to-purple-600/5';
      case 'blue':
        return 'from-cyan-500/10 to-cyan-600/5';
      default:
        return 'from-primary/10 to-secondary/10';
    }
  };

  return (
    <div
      className={`
        bg-gradient-to-br ${getGradient()}
        border border-primary/30 rounded-xl
        backdrop-blur-sm transition-all duration-300
        ${interactive ? 'hover:border-primary/60 hover:shadow-lg hover:shadow-primary/20' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
