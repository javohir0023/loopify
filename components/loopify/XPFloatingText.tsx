'use client';

interface XPFloatingTextProps {
  xp: number;
  x?: number;
  y?: number;
}

export function XPFloatingText({ xp, x = 50, y = 50 }: XPFloatingTextProps) {
  return (
    <div
      className="fixed pointer-events-none animate-[floating-text_2s_ease-out_forwards]"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        animation: 'floating-text 2s ease-out forwards',
      }}
    >
      <div className="text-2xl font-bold text-primary drop-shadow-lg">
        +{xp} XP
      </div>
    </div>
  );
}
