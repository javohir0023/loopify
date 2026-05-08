'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';
import { GradientCard } from '@/components/loopify/GradientCard';
import { GlowButton } from '@/components/loopify/GlowButton';
import { StatCard } from '@/components/loopify/StatCard';

type TabType = 'daily' | 'games' | 'quizzes' | 'projects' | 'leaderboard';

const GAMES = [
  {
    id: 1,
    title: 'Cyber Highway',
    titleUz: 'Cyber Highway',
    description: 'Cyberpunk racing game with quiz questions',
    descriptionUz: 'Kiber xavfsizlik poyga o\'yini',
    icon: '🏎️',
    xp: 50,
    href: '/cyber-highway',
    featured: true,
  },
  {
    id: 2,
    title: 'Road Game',
    titleUz: 'Yo\'l O\'yini',
    description: 'Answer quiz questions to stay on the road',
    descriptionUz: 'Savolga javob berib yo\'ldan chiqmang',
    icon: '🚗',
    xp: 50,
    href: '/gamification/road-game',
  },
];

const DAILY_CHALLENGES = [
  { id: 1, title: 'Python Quiz', titleUz: 'Python Testi', completed: true, xp: 20 },
  { id: 2, title: 'Code Challenge', titleUz: 'Kodlash Tanlovchiligi', completed: false, xp: 50 },
];

const QUIZZES = [
  { id: 1, title: 'Python Fundamentals', titleUz: 'Python Asoslari', questions: 10, xp: 10 },
  { id: 2, title: 'Web Basics', titleUz: 'Web Asoslari', questions: 8, xp: 10 },
  { id: 3, title: 'JavaScript Syntax', titleUz: 'JavaScript Sintaksisi', questions: 12, xp: 10 },
];

const PROJECTS = [
  {
    id: 1,
    title: 'Build a Calculator',
    titleUz: 'Kalkulyator yarating',
    difficulty: 'Beginner',
    difficultyUz: 'Boshlang\'ichlar uchun',
    xp: 50,
    completed: false,
  },
  {
    id: 2,
    title: 'Todo App',
    titleUz: 'Todo Ilovasi',
    difficulty: 'Intermediate',
    difficultyUz: 'O\'rta darajali',
    xp: 75,
    completed: false,
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    titleUz: 'Ob-havo Paneli',
    difficulty: 'Intermediate',
    difficultyUz: 'O\'rta darajali',
    xp: 75,
    completed: false,
  },
];

const LEADERBOARD = [
  { rank: 1, name: 'Alisher', xp: 1250, streak: 15 },
  { rank: 2, name: 'Rashid', xp: 1180, streak: 12 },
  { rank: 3, name: 'Farida', xp: 980, streak: 8 },
  { rank: 4, name: 'Jamol', xp: 850, streak: 6 },
  { rank: 5, name: 'Gulnor', xp: 720, streak: 4 },
];

export default function GamificationPage() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabType>('daily');

  const tabs: { id: TabType; label: string; labelUz: string; icon: string }[] = [
    { id: 'daily', label: 'Daily', labelUz: 'Kundalik', icon: '⚡' },
    { id: 'games', label: 'Games', labelUz: 'O\'yinlar', icon: '🎮' },
    { id: 'quizzes', label: 'Quizzes', labelUz: 'Quizlar', icon: '📝' },
    { id: 'projects', label: 'Projects', labelUz: 'Loyihalar', icon: '🛠️' },
    { id: 'leaderboard', label: 'Board', labelUz: 'Reyting', icon: '🏆' },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-b from-background to-background/80 backdrop-blur-sm border-b border-border p-4">
        <h1 className="text-2xl font-bold gradient-text">
          {language === 'uz' ? 'Tanlovlar va Mukofotlar' : 'Challenges & Rewards'}
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          {language === 'uz' ? 'XP oling va reyting jadvalida yuqoriga ko\'ting' : 'Earn XP and climb the leaderboard'}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border p-4 overflow-x-auto sticky top-14 bg-background/50 backdrop-blur-sm">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === tab.id
                ? 'bg-primary text-black font-semibold'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <span>{tab.icon}</span>
            {language === 'uz' ? tab.labelUz : tab.label}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-4 max-w-2xl mx-auto">
        {/* Daily Challenges */}
        {activeTab === 'daily' && (
          <div className="space-y-4">
            <div className="text-xs text-muted-foreground px-0 pb-2">
              {language === 'uz' ? 'Bu tanlovlarni yakunlang va bonus XP oling' : 'Complete these challenges to earn bonus XP'}
            </div>
            {DAILY_CHALLENGES.map((challenge) => (
              <GradientCard
                key={challenge.id}
                variant={challenge.completed ? 'blue' : 'pink'}
                className="p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{challenge.completed ? '✅' : '⭕'}</span>
                    <div>
                      <h3 className="font-bold text-foreground">
                        {language === 'uz' ? challenge.titleUz : challenge.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">+{challenge.xp} XP</p>
                    </div>
                  </div>
                  {!challenge.completed && (
                    <GlowButton size="sm">{language === 'uz' ? 'Boshlash' : 'Start'}</GlowButton>
                  )}
                </div>
              </GradientCard>
            ))}
          </div>
        )}

        {/* Games */}
        {activeTab === 'games' && (
          <div className="space-y-4">
            <div className="text-xs text-muted-foreground px-0 pb-2">
              {language === 'uz' ? 'O\'yin o\'ynang va XP oling' : 'Play games and earn XP'}
            </div>
            {GAMES.map((game) => (
              <GradientCard
                key={game.id}
                variant="purple"
                className="p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{game.icon}</span>
                    <div>
                      <h3 className="font-bold text-foreground">
                        {language === 'uz' ? game.titleUz : game.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {language === 'uz' ? game.descriptionUz : game.description}
                      </p>
                      <p className="text-xs text-primary mt-1">+{game.xp} XP</p>
                    </div>
                  </div>
                  <Link href={game.href}>
                    <GlowButton size="sm">{language === 'uz' ? 'O\'ynash' : 'Play'}</GlowButton>
                  </Link>
                </div>
              </GradientCard>
            ))}
          </div>
        )}

        {/* Quizzes */}
        {activeTab === 'quizzes' && (
          <div className="space-y-4">
            <div className="text-xs text-muted-foreground px-0 pb-2">
              {language === 'uz' ? 'Bilimingizni sinab ko\'ring va XP oling' : 'Test your knowledge and earn XP'}
            </div>
            {QUIZZES.map((quiz) => (
              <GradientCard key={quiz.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-foreground">{language === 'uz' ? quiz.titleUz : quiz.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      {quiz.questions} {language === 'uz' ? 'savol' : 'questions'} • +{quiz.xp} XP
                    </p>
                  </div>
                  <GlowButton size="sm">{language === 'uz' ? 'Quizni ol' : 'Take Quiz'}</GlowButton>
                </div>
              </GradientCard>
            ))}
          </div>
        )}

        {/* Projects */}
        {activeTab === 'projects' && (
          <div className="space-y-4">
            <div className="text-xs text-muted-foreground px-0 pb-2">
              {language === 'uz' ? 'Haqiqiy dunyo loyihalarini yarating va dasturlashda ustolarasin' : 'Build real-world projects and master coding'}
            </div>
            {PROJECTS.map((project) => (
              <GradientCard
                key={project.id}
                variant={project.difficulty === 'Beginner' ? 'pink' : 'purple'}
                className="p-4"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-foreground">{language === 'uz' ? project.titleUz : project.title}</h3>
                      <p className="text-xs text-muted-foreground">
                        {language === 'uz' ? project.difficultyUz : project.difficulty}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-primary">+{project.xp} XP</span>
                  </div>
                  {!project.completed && (
                    <GlowButton size="sm" className="w-full">
                      {language === 'uz' ? 'Loyihani boshlash' : 'Start Project'}
                    </GlowButton>
                  )}
                </div>
              </GradientCard>
            ))}
          </div>
        )}

        {/* Leaderboard */}
        {activeTab === 'leaderboard' && (
          <div className="space-y-3">
            <div className="text-xs text-muted-foreground px-0 pb-2">
              {language === 'uz' ? 'Bu oyning eng yaxshi o\'quvchilari' : 'Top learners this month'}
            </div>
            {LEADERBOARD.map((user) => (
              <GradientCard key={user.rank} className="p-4">
                <div className="flex items-center gap-3">
                  <div className="text-2xl font-bold text-primary min-w-12">
                    {user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : user.rank === 3 ? '🥉' : user.rank}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground">{user.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {user.xp.toLocaleString()} XP • 🔥 {user.streak} {language === 'uz' ? 'kun' : 'days'}
                    </p>
                  </div>
                </div>
              </GradientCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
