'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useOnboarding } from '@/lib/onboarding-context';
import { useLanguage } from '@/lib/language-context';
import { GlowButton } from '@/components/loopify/GlowButton';
import { GradientCard } from '@/components/loopify/GradientCard';

type OnboardingStep = 'goal' | 'level' | 'time' | 'profile';

export default function OnboardingPage() {
  const router = useRouter();
  const { data, updateData } = useOnboarding();
  const { t } = useLanguage();
  const [step, setStep] = useState<OnboardingStep>('goal');
  const [username, setUsername] = useState('');

  const GOALS = [
    { id: 'python', label: 'Python', icon: '🐍', description: 'Python asoslarini o\'rganing' },
    { id: 'web', label: 'Web Dasturlash', icon: '🌐', description: 'HTML, CSS va JavaScriptni o\'zlashtiring' },
    { id: 'ai', label: 'Sun\'iy intellekt', icon: '🤖', description: 'Sun\'iy intellekt va mashina o\'qitishini o\'rganing' },
  ];

  const LEVELS = [
    { id: 'beginner', label: t.onboarding.levels.beginner, description: 'Yangi boshlovchi' },
    { id: 'intermediate', label: t.onboarding.levels.intermediate, description: 'Birozam tajribam bor' },
  ];

  const TIMES = [
    { id: 5, label: t.onboarding.times.five, description: 'Tez kunlik sessiyalari' },
    { id: 15, label: t.onboarding.times.fifteen, description: 'Muvozanatlashtirilgan o\'quv' },
    { id: 30, label: t.onboarding.times.thirty, description: 'Chuqur diqqat bilan o\'quv' },
  ];

  const handleGoalSelect = (goalId: string) => {
    updateData({ goal: goalId as 'python' | 'web' | 'ai' });
    setStep('level');
  };

  const handleLevelSelect = (levelId: string) => {
    updateData({ skillLevel: levelId as 'beginner' | 'intermediate' });
    setStep('time');
  };

  const handleTimeSelect = (timeId: number) => {
    updateData({ dailyTime: timeId as 5 | 15 | 30 });
    setStep('profile');
  };

  const handleStartLearning = () => {
    if (username.trim()) {
      updateData({
        username: username.trim(),
        hasCompleted: true,
      });
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Image
              src="/loopify-logo.png"
              alt="Loopify Logo"
              width={80}
              height={80}
              className="rounded-lg"
              priority
            />
          </div>
          <p className="text-muted-foreground">Gamifikatsiya va kundalik tanlovlar bilan dasturlashni o'rganing</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex gap-2 mb-8">
          {['goal', 'level', 'time', 'profile'].map((s) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition-all ${
                s === step ? 'bg-primary' : ['goal', 'level', 'time', 'profile'].indexOf(s) < ['goal', 'level', 'time', 'profile'].indexOf(step) ? 'bg-primary/50' : 'bg-border'
              }`}
            />
          ))}
        </div>

        {/* Step 1: Goal Selection */}
        {step === 'goal' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Nima o'rganmoqchi bo'lasiz?</h2>
              <p className="text-muted-foreground">O'quv yo'lingizni tanlang</p>
            </div>
            <div className="grid gap-4">
              {GOALS.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => handleGoalSelect(goal.id)}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    data.goal === goal.id
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{goal.icon}</span>
                    <div>
                      <h3 className="font-bold text-foreground">{goal.label}</h3>
                      <p className="text-sm text-muted-foreground">{goal.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Skill Level */}
        {step === 'level' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Sizning ko'nikma darajangiz nima?</h2>
              <p className="text-muted-foreground">Biz kontentni sizning tajribangizga muvofiq tanlayb beramiz</p>
            </div>
            <div className="grid gap-4">
              {LEVELS.map((level) => (
                <button
                  key={level.id}
                  onClick={() => handleLevelSelect(level.id)}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    data.skillLevel === level.id
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <h3 className="font-bold text-foreground">{level.label}</h3>
                  <p className="text-sm text-muted-foreground">{level.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Daily Time */}
        {step === 'time' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Kuniga qancha vaqt yo'llab berish mumkin?</h2>
              <p className="text-muted-foreground">Kuniga o'quv vaqtini tanlang</p>
            </div>
            <div className="grid gap-4">
              {TIMES.map((time) => (
                <button
                  key={time.id}
                  onClick={() => handleTimeSelect(time.id)}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    data.dailyTime === time.id
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <h3 className="font-bold text-foreground">{time.label}</h3>
                  <p className="text-sm text-muted-foreground">{time.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Profile Setup */}
        {step === 'profile' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Deyarli tayyor!</h2>
              <p className="text-muted-foreground">Ismingizni bizga bildiring</p>
            </div>
            <GradientCard className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Sizning ismingiz</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Ismingizni kiriting"
                    className="w-full bg-input border border-border rounded-lg px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleStartLearning();
                      }
                    }}
                  />
                </div>
                <div className="space-y-3 p-4 bg-card/50 rounded-lg border border-border">
                  <div className="text-sm">
                    <p className="font-semibold text-foreground mb-1">Sizning o'quv yo'lingiz:</p>
                    <p className="text-muted-foreground">
                      {GOALS.find((g) => g.id === data.goal)?.label} • {data.skillLevel?.charAt(0).toUpperCase() + data.skillLevel?.slice(1)} • {data.dailyTime} daqiqa/kun
                    </p>
                  </div>
                </div>
              </div>
            </GradientCard>
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-3 mt-8">
          {step !== 'goal' && (
            <button
              onClick={() => {
                const steps: OnboardingStep[] = ['goal', 'level', 'time', 'profile'];
                const currentIndex = steps.indexOf(step);
                if (currentIndex > 0) {
                  setStep(steps[currentIndex - 1]);
                }
              }}
              className="px-6 py-2.5 rounded-lg border border-border text-foreground hover:border-primary transition-colors"
            >
              Orqaga
            </button>
          )}
          <div className="flex-1" />
          {step !== 'profile' ? (
            <GlowButton
              onClick={() => {
                const steps: OnboardingStep[] = ['goal', 'level', 'time', 'profile'];
                const currentIndex = steps.indexOf(step);
                if (currentIndex < steps.length - 1) {
                  setStep(steps[currentIndex + 1]);
                }
              }}
              disabled={
                (step === 'goal' && !data.goal) ||
                (step === 'level' && !data.skillLevel) ||
                (step === 'time' && !data.dailyTime)
              }
            >
              Keyingi
            </GlowButton>
          ) : (
            <GlowButton
              onClick={handleStartLearning}
              disabled={!username.trim()}
            >
              O'quvni boshlash
            </GlowButton>
          )}
        </div>
      </div>
    </div>
  );
}
