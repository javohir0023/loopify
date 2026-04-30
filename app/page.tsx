'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useOnboarding } from '@/lib/onboarding-context';
import { useUser } from '@/lib/user-context';
import { useLanguage } from '@/lib/language-context';
import { getCurrentLevelXP, getXPForNextLevel } from '@/lib/xp-system';
import { getXPData, type XPData } from '@/lib/xp-utils';
import { getStreakData, type StreakData } from '@/lib/streak-utils';
import { GlowButton } from '@/components/loopify/GlowButton';
import { GradientCard } from '@/components/loopify/GradientCard';
import { StatCard } from '@/components/loopify/StatCard';
import { LevelProgressBar } from '@/components/loopify/LevelProgressBar';
import { StreakDisplay } from '@/components/loopify/StreakDisplay';

export default function HomePage() {
  const router = useRouter();
  const { data } = useOnboarding();
  const { progress } = useUser();
  const { language } = useLanguage();
  const [xpData, setXPData] = useState<XPData | null>(null);
  const [streakData, setStreakData] = useState<StreakData | null>(null);

  useEffect(() => {
    if (!data.hasCompleted) {
      router.push('/onboarding');
    }
  }, [data.hasCompleted, router]);

  useEffect(() => {
    // XP va streak ma'lumotlarini har safar sahifa yuklanishida o'qiy
    setXPData(getXPData());
    setStreakData(getStreakData());
    
    // Storage o'zgarishlarini monitor qil (boshqa tab yoki window'dan o'zgarsa update qil)
    const handleStorageChange = () => {
      setXPData(getXPData());
      setStreakData(getStreakData());
    };
    
    window.addEventListener('storage', handleStorageChange);
    // Quiz page'dan qaytib kelganda update qil
    window.addEventListener('focus', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleStorageChange);
    };
  }, []);

  if (!data.hasCompleted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-b from-background to-background/80 backdrop-blur-sm border-b border-border p-4">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <div className="flex items-center gap-3">
            <Image
              src="/loopify-logo.png"
              alt="Loopify Logo"
              width={48}
              height={48}
              className="rounded-lg"
              priority
            />
            <div>
              <p className="text-xs text-muted-foreground">
                {language === 'uz' ? `Xush kelibsiz, ${data.username}!` : `Welcome, ${data.username}!`}
              </p>
            </div>
          </div>
          <button className="w-10 h-10 rounded-full bg-card border border-border hover:border-primary transition-colors flex items-center justify-center text-lg">
            {data.username?.charAt(0).toUpperCase()}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-6 max-w-2xl mx-auto">
        {/* Level and XP Section */}
        {xpData && (
          <GradientCard variant="purple" className="p-6">
            <div className="space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-primary">
                  {language === 'uz' ? 'Daraja' : 'Level'} {xpData.level}
                </span>
                <span className="text-sm text-muted-foreground">
                  {xpData.total.toLocaleString()} {language === 'uz' ? 'XP' : 'XP'}
                </span>
              </div>
              <div className="w-full bg-border rounded-full h-3">
                <div
                  className="bg-primary h-3 rounded-full transition-all"
                  style={{ width: `${xpData.progress}%` }}
                />
              </div>
              <div className="pt-2 text-sm text-muted-foreground">
                {xpData.nextLevelXP - xpData.currentLevelXP} {language === 'uz' ? 'XP' : 'XP'} {language === 'uz' ? 'keyingi darajasiga' : 'to next level'}
              </div>
            </div>
          </GradientCard>
        )}

        {/* Streak Display */}
        {streakData && (
          <GradientCard variant="pink" className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-foreground">
                  {language === 'uz' ? '🔥 Ketma-ketlik' : '🔥 Current Streak'}
                </h3>
                <p className="text-2xl font-bold text-primary mt-2">{streakData.current} {language === 'uz' ? 'kun' : 'days'}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {language === 'uz' ? `Eng uzun: ${streakData.longest}` : `Best: ${streakData.longest}`}
                </p>
              </div>
              <div className="text-5xl">🔥</div>
            </div>
          </GradientCard>
        )}

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <StatCard
            icon="📝"
            label={language === 'uz' ? 'Quizlar' : 'Quizzes'}
            value={progress.totalQuizzesTaken}
            variant="pink"
          />
          <StatCard
            icon="🏆"
            label={language === 'uz' ? 'Medallar' : 'Achievements'}
            value={progress.badges.length}
            variant="blue"
          />
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 gap-4">
          <GradientCard className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-bold text-foreground mb-1">
                  {language === 'uz' ? 'Kunlik Tanlov' : 'Daily Challenge'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {language === 'uz' ? 'Tanlovni yakunlang +20 XP uchun' : 'Complete the challenge for +20 XP'}
                </p>
              </div>
              <GlowButton size="sm">
                {language === 'uz' ? 'Boshlash' : 'Start'}
              </GlowButton>
            </div>
          </GradientCard>

          <GradientCard className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-bold text-foreground mb-1">
                  {language === 'uz' ? "O'quvni davom ettiring" : 'Continue Learning'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {language === 'uz' ? 'Python asoslari - Dars 3' : 'Python Basics - Lesson 3'}
                </p>
              </div>
              <GlowButton size="sm">
                {language === 'uz' ? 'Keyingi' : 'Next'}
              </GlowButton>
            </div>
          </GradientCard>

          <GradientCard className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-bold text-foreground mb-1">
                  {language === 'uz' ? 'Yangi loyiha' : 'New Project'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {language === 'uz' ? 'Kalkulyator ilovasi yarating (Boshlang\'ich)' : 'Build a Calculator App (Beginner)'}
                </p>
              </div>
              <GlowButton size="sm" variant="secondary">
                {language === 'uz' ? 'Boshlash' : 'Start'}
              </GlowButton>
            </div>
          </GradientCard>
        </div>

        {/* Features Preview */}
        <GradientCard variant="blue" className="p-6">
          <h3 className="font-bold text-foreground mb-4">
            {language === 'uz' ? 'Yangiliklari' : "What's New"}
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex gap-2">
              <span className="text-primary">✨</span>
              <div>
                <p className="font-semibold text-foreground">
                  {language === 'uz' ? 'Yangi AI Yordamchi' : 'New AI Assistant'}
                </p>
                <p className="text-muted-foreground text-xs">
                  {language === 'uz' ? 'Dasturlash savollari uchun tezkor yordam oling' : 'Get instant help for coding questions'}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <span className="text-primary">🎁</span>
              <div>
                <p className="font-semibold text-foreground">
                  {language === 'uz' ? 'Premium mavjud' : 'Premium Available'}
                </p>
                <p className="text-muted-foreground text-xs">
                  {language === 'uz' ? 'Murakkab kurslar va loyihalarni qulfdan chiqaring' : 'Unlock advanced courses and projects'}
                </p>
              </div>
            </div>
          </div>
        </GradientCard>
      </div>
    </div>
  );
}
