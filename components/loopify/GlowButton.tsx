import React from 'react';

interface GlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  glowColor?: 'pink' | 'purple' | 'blue';
  disabled?: boolean;
}

export function GlowButton({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  glowColor = 'pink',
  disabled = false,
  ...props
}: GlowButtonProps) {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3.5 text-lg',
  };

  const variantClasses = {
    primary: 'bg-gradient-to-r from-primary to-accent text-black font-semibold border border-primary',
    secondary: 'bg-gradient-to-r from-secondary to-purple-600 text-white font-semibold border border-secondary',
    outline: 'bg-transparent text-primary border-2 border-primary font-semibold',
  };

  const glowColors = {
    pink: 'shadow-[0_0_20px_rgba(236,72,153,0.3)]',
    purple: 'shadow-[0_0_20px_rgba(124,58,237,0.3)]',
    blue: 'shadow-[0_0_20px_rgba(6,182,212,0.3)]',
  };

  return (
    <button
      className={`
        rounded-lg font-semibold transition-all duration-300
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${glowColors[glowColor]}
        hover:scale-105 active:scale-95
        hover:shadow-[0_0_30px_rgba(236,72,153,0.5)]
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
