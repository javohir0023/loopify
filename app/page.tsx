'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useOnboarding } from '@/lib/onboarding-context';
import { useUser } from '@/lib/user-context';
import { useLanguage } from '@/lib/language-context';
import { getCurrentLevelXP, getXPForNextLevel } from '@/lib/xp-system';
import { GlowButton } from '@/components/loopify/GlowButton';
import { GradientCard } from '@/components/loopify/GradientCard';
import { StatCard } from '@/components/loopify/StatCard';
import { LevelProgressBar } from '@/components/loopify/LevelProgressBar';
import { StreakDisplay } from '@/components/loopify/StreakDisplay';

export default function HomePage() {
  const router = useRouter();
  const { data } = useOnboarding();
  const { progress } = useUser();
  const { t } = useLanguage();

  useEffect(() => {
    if (!data.hasCompleted) {
      router.push('/onboarding');
    }
  }, [data.hasCompleted, router]);

  if (!data.hasCompleted) {
    return null;
  }

  const currentXPForLevel = getCurrentLevelXP(progress.totalXP);
  const xpForNextLevel = getXPForNextLevel(progress.totalXP);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-b from-background to-background/80 backdrop-blur-sm border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold gradient-text">Loopify</h1>
            <p className="text-xs text-muted-foreground">{t.home.welcome} {data.username}!</p>
          </div>
          <button className="w-10 h-10 rounded-full bg-card border border-border hover:border-primary transition-colors flex items-center justify-center text-lg">
            {data.username?.charAt(0).toUpperCase()}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-6 max-w-2xl mx-auto">
        {/* Level and XP Section */}
        <GradientCard variant="purple" className="p-6">
          <div className="space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-primary">{t.common.level} {progress.level}</span>
              <span className="text-sm text-muted-foreground">
                {progress.totalXP.toLocaleString()} {t.common.xp}
              </span>
            </div>
            <LevelProgressBar
              currentXP={currentXPForLevel}
              xpForNextLevel={xpForNextLevel}
              level={progress.level}
            />
            <div className="pt-2 text-sm text-muted-foreground">
              {xpForNextLevel - currentXPForLevel} {t.common.xp} {t.home.xpToNextLevel}
            </div>
          </div>
        </GradientCard>

        {/* Streak Display */}
        <StreakDisplay
          count={progress.streak}
          atRisk={progress.streak >= 5}
          hoursUntilReset={progress.streak >= 5 ? 18 : undefined}
        />

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <StatCard
            icon="🎯"
            label={t.learning.quiz}
            value={progress.totalQuizzesTaken}
            variant="pink"
          />
          <StatCard
            icon="🏆"
            label={t.gamification.achievements}
            value={progress.badges.length}
            variant="blue"
          />
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 gap-4">
          <GradientCard className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-bold text-foreground mb-1">{t.gamification.dailyChallenge}</h3>
                <p className="text-sm text-muted-foreground">{t.gamification.challenge}ni yakunlang +20 {t.common.xp} uchun</p>
              </div>
              <GlowButton size="sm">{t.common.start}</GlowButton>
            </div>
          </GradientCard>

          <GradientCard className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-bold text-foreground mb-1">{t.nav.learning}ni davom ettiring</h3>
                <p className="text-sm text-muted-foreground">Python asoslari - Dars 3</p>
              </div>
              <GlowButton size="sm">{t.common.next}</GlowButton>
            </div>
          </GradientCard>

          <GradientCard className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-bold text-foreground mb-1">Yangi loyiha</h3>
                <p className="text-sm text-muted-foreground">Kalkulyator ilovasi yarating ({t.gamification.beginner})</p>
              </div>
              <GlowButton size="sm" variant="secondary">
                {t.common.start}
              </GlowButton>
            </div>
          </GradientCard>
        </div>

        {/* Features Preview */}
        <GradientCard variant="blue" className="p-6">
          <h3 className="font-bold text-foreground mb-4">Yangiliklari</h3>
          <div className="space-y-3 text-sm">
            <div className="flex gap-2">
              <span className="text-primary">✨</span>
              <div>
                <p className="font-semibold text-foreground">Yangi AI Yordamchi</p>
                <p className="text-muted-foreground text-xs">Dasturlash savollari uchun tezkor yordam oling</p>
              </div>
            </div>
            <div className="flex gap-2">
              <span className="text-primary">🎁</span>
              <div>
                <p className="font-semibold text-foreground">Premium mavjud</p>
                <p className="text-muted-foreground text-xs">Murakkab kurslar va loyihalarni qulfdan chiqaring</p>
              </div>
            </div>
          </div>
        </GradientCard>
      </div>
    </div>
  );
}
