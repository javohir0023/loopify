'use client';

import { useEffect, useState } from 'react';

interface ConfettiAnimationProps {
  trigger?: boolean;
  duration?: number;
}

export function ConfettiAnimation({ trigger = true, duration = 3000 }: ConfettiAnimationProps) {
  const [confetti, setConfetti] = useState<Array<{ id: string; left: number; delay: number }>>([]);
  const [isVisible, setIsVisible] = useState(trigger);

  useEffect(() => {
    if (!trigger) return;

    // Create confetti pieces
    const pieces = Array.from({ length: 30 }, (_, i) => ({
      id: `confetti-${i}`,
      left: Math.random() * 100,
      delay: Math.random() * 0.3,
    }));

    setConfetti(pieces);
    setIsVisible(true);

    // Hide after animation completes
    const timer = setTimeout(() => {
      setIsVisible(false);
      setConfetti([]);
    }, duration);

    return () => clearTimeout(timer);
  }, [trigger, duration]);

  if (!isVisible || confetti.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute w-2 h-2 animate-[confetti_3s_linear_forwards]"
          style={{
            left: `${piece.left}%`,
            top: '-10px',
            backgroundColor: ['#ec4899', '#7c3aed', '#06b6d4', '#f472b6', '#8b5cf6'][Math.floor(Math.random() * 5)],
            animation: `confetti 3s linear ${piece.delay}s forwards`,
            opacity: 1,
          }}
        />
      ))}
      <style>{`
        @keyframes confetti {
          0% {
            opacity: 1;
            transform: translateY(0) rotate(0deg);
          }
          100% {
            opacity: 0;
            transform: translateY(100vh) rotate(720deg);
          }
        }
      `}</style>
    </div>
  );
}
