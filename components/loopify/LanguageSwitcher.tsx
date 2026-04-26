'use client';

import { useLanguage } from '@/lib/language-context';
import { GlowButton } from './GlowButton';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex gap-2">
      <button
        onClick={() => setLanguage('uz')}
        className={`px-4 py-2 rounded-lg font-semibold transition-all ${
          language === 'uz'
            ? 'bg-primary text-black glow-button'
            : 'bg-card text-foreground border border-border hover:border-primary'
        }`}
      >
        O&apos;zbekcha
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-4 py-2 rounded-lg font-semibold transition-all ${
          language === 'en'
            ? 'bg-primary text-black glow-button'
            : 'bg-card text-foreground border border-border hover:border-primary'
        }`}
      >
        English
      </button>
    </div>
  );
}
