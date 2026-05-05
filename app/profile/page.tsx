'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useOnboarding } from '@/lib/onboarding-context';
import { useUser } from '@/lib/user-context';
import { useLanguage } from '@/lib/language-context';
import { GradientCard } from '@/components/loopify/GradientCard';
import { GlowButton } from '@/components/loopify/GlowButton';
import { StatCard } from '@/components/loopify/StatCard';
import { LanguageSwitcher } from '@/components/loopify/LanguageSwitcher';
import { getXPData, getLevelProgress } from '@/lib/xp-utils';

const ACHIEVEMENTS = [
  { id: 1, name: 'Birinchi qadam', icon: '🚀', description: 'Birinchi darsni yakunlang' },
  { id: 2, name: 'Quiz Ustasi', icon: '📝', description: '5 ta quizda 100% oling' },
  { id: 3, name: 'Hafta jangari', icon: '🔥', description: '7 kunlik ketma-ketlikni saqlang' },
  { id: 4, name: 'Loyiha quruvchi', icon: '🛠️', description: '3 ta loyihani yakunlang' },
];

export default function ProfilePage() {
  const router = useRouter();
  const { data } = useOnboarding();
  const { progress } = useUser();
  const { language } = useLanguage();
  const [xpData, setXPData] = useState<ReturnType<typeof getXPData> | null>(null);

  useEffect(() => {
    setXPData(getXPData());
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    router.push('/onboarding');
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-b from-background to-background/80 backdrop-blur-sm border-b border-border p-4">
        <h1 className="text-2xl font-bold gradient-text">{language === 'uz' ? 'Profil' : 'Profile'}</h1>
        <p className="text-xs text-muted-foreground mt-1">Sizning o\'quv statistikangiz</p>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-6 max-w-2xl mx-auto">
        {/* Profile Header */}
        <GradientCard variant="purple" className="p-6 text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent mx-auto mb-4 flex items-center justify-center text-3xl">
            {data.username?.charAt(0).toUpperCase()}
          </div>
          <h2 className="text-2xl font-bold text-foreground">{data.username}</h2>
          <div className="mt-3 text-sm text-muted-foreground">
            <p>
              {data.goal === 'python'
                ? '🐍 Python'
                : data.goal === 'web'
                  ? '🌐 Web Development'
                  : '🤖 AI & ML'}
            </p>
            <p className="capitalize">{data.skillLevel} • {data.dailyTime} min/day</p>
          </div>
        </GradientCard>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <StatCard
            icon="⭐"
            label={language === 'uz' ? "Umumiy XP" : "Total XP"}
            value={xpData ? xpData.total.toLocaleString() : '0'}
            secondaryValue={xpData ? `${language === 'uz' ? 'Daraja' : 'Level'} ${xpData.level}` : 'Level 1'}
            variant="accent"
          />
          <StatCard
            icon="🔥"
            label={language === 'uz' ? "Ketma-ketlik" : "Streak"}
            value={progress.streak}
            secondaryValue={language === 'uz' ? "kun" : "days"}
            variant="blue"
          />
          <StatCard
            icon="🏆"
            label={language === 'uz' ? "Medallar" : "Achievements"}
            value={progress.badges.length}
            secondaryValue={language === 'uz' ? "olingan" : "earned"}
            variant="purple"
          />
          <StatCard
            icon="📚"
            label={language === 'uz' ? "Quizlar" : "Quizzes"}
            value={progress.totalQuizzesTaken}
            secondaryValue={language === 'uz' ? "yakunlangan" : "completed"}
          />
        </div>

        {/* Achievements */}
        <div>
          <h3 className="font-bold text-foreground mb-3">
            {language === 'uz' ? "Erishimlar" : "Achievements"}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {ACHIEVEMENTS.map((achievement) => (
              <GradientCard key={achievement.id} className="p-4 text-center">
                <div className="text-3xl mb-2">{achievement.icon}</div>
                <h4 className="font-semibold text-sm text-foreground">{achievement.name}</h4>
                <p className="text-xs text-muted-foreground mt-1">{achievement.description}</p>
              </GradientCard>
            ))}
          </div>
        </div>

        {/* Premium Status */}
        <GradientCard variant="blue" className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-foreground">
                {language === 'uz' ? "Premium holati" : "Premium Status"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {progress.isPremium 
                  ? (language === 'uz' ? 'Pro Plan faol' : 'Pro Plan active')
                  : (language === 'uz' ? 'Hozirda Bepul rejani ishlatmoqda' : 'Using Free plan')}
              </p>
            </div>
            {!progress.isPremium && (
              <Link href="/premium">
                <GlowButton size="sm" variant="secondary">
                  {language === 'uz' ? "Yangilash" : "Upgrade"}
                </GlowButton>
              </Link>
            )}
          </div>
        </GradientCard>

        {/* Language Settings */}
        <GradientCard className="p-4">
          <h3 className="font-bold text-foreground mb-4">
            {language === 'uz' ? "Til" : "Language"}
          </h3>
          <LanguageSwitcher />
        </GradientCard>

        {/* Settings */}
        <div className="space-y-2">
          <h3 className="font-bold text-foreground mb-3">
            {language === 'uz' ? "Sozlamalar" : "Settings"}
          </h3>
          <GradientCard className="p-4">
            <button className="w-full text-left hover:text-primary transition-colors">
              <p className="font-medium text-foreground">
                {language === 'uz' ? "Profilni tahrirlash" : "Edit Profile"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {language === 'uz' ? "Nomingiz va boshqa parametrlarni o'zgartiring" : "Edit your name and preferences"}
              </p>
            </button>
          </GradientCard>
          <GradientCard className="p-4">
            <button className="w-full text-left hover:text-primary transition-colors">
              <p className="font-medium text-foreground">
                {language === 'uz' ? "Bildirishnomalar" : "Notifications"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {language === 'uz' ? "Bildirishnomalar va eslatmalarni boshqarish" : "Manage push notifications and reminders"}
              </p>
            </button>
          </GradientCard>
          <GradientCard className="p-4">
            <button className="w-full text-left hover:text-primary transition-colors">
              <p className="font-medium text-foreground">
                {language === 'uz' ? "Yordam va qo'llab-quvvatlash" : "Help & Support"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {language === 'uz' ? "FAQ, fikr-mulohaza va qo'llab-quvvatlash" : "FAQ, feedback, and contact support"}
              </p>
            </button>
          </GradientCard>
        </div>

        {/* Logout */}
        <GlowButton
          onClick={handleLogout}
          variant="outline"
          className="w-full"
        >
          {language === 'uz' ? "Chiqish" : "Logout"}
        </GlowButton>
      </div>
    </div>
  );
}
