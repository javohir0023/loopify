'use client';

import { useState } from 'react';
import { GradientCard } from '@/components/loopify/GradientCard';
import { GlowButton } from '@/components/loopify/GlowButton';
import { StatCard } from '@/components/loopify/StatCard';

type TabType = 'daily' | 'quizzes' | 'projects' | 'leaderboard';

const DAILY_CHALLENGES = [
  { id: 1, title: 'Python Quiz', completed: true, xp: 20 },
  { id: 2, title: 'Code Challenge', completed: false, xp: 50 },
];

const QUIZZES = [
  { id: 1, title: 'Python Fundamentals', questions: 10, xp: 10 },
  { id: 2, title: 'Web Basics', questions: 8, xp: 10 },
  { id: 3, title: 'JavaScript Syntax', questions: 12, xp: 10 },
];

const PROJECTS = [
  {
    id: 1,
    title: 'Build a Calculator',
    difficulty: 'Beginner',
    xp: 50,
    completed: false,
  },
  {
    id: 2,
    title: 'Todo App',
    difficulty: 'Intermediate',
    xp: 75,
    completed: false,
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    difficulty: 'Intermediate',
    xp: 75,
    completed: false,
  },
];

const LEADERBOARD = [
  { rank: 1, name: 'Alex', xp: 1250, streak: 15 },
  { rank: 2, name: 'Jordan', xp: 1180, streak: 12 },
  { rank: 3, name: 'Sam', xp: 980, streak: 8 },
  { rank: 4, name: 'Casey', xp: 850, streak: 6 },
  { rank: 5, name: 'Morgan', xp: 720, streak: 4 },
];

export default function GamificationPage() {
  const [activeTab, setActiveTab] = useState<TabType>('daily');

  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'daily', label: 'Daily', icon: '⚡' },
    { id: 'quizzes', label: 'Quizzes', icon: '📝' },
    { id: 'projects', label: 'Projects', icon: '🛠️' },
    { id: 'leaderboard', label: 'Board', icon: '🏆' },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-b from-background to-background/80 backdrop-blur-sm border-b border-border p-4">
        <h1 className="text-2xl font-bold gradient-text">Challenges & Rewards</h1>
        <p className="text-xs text-muted-foreground mt-1">Earn XP and climb the leaderboard</p>
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
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-4 max-w-2xl mx-auto">
        {/* Daily Challenges */}
        {activeTab === 'daily' && (
          <div className="space-y-4">
            <div className="text-xs text-muted-foreground px-0 pb-2">
              Complete these challenges to earn bonus XP
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
                      <h3 className="font-bold text-foreground">{challenge.title}</h3>
                      <p className="text-xs text-muted-foreground">+{challenge.xp} XP</p>
                    </div>
                  </div>
                  {!challenge.completed && <GlowButton size="sm">Start</GlowButton>}
                </div>
              </GradientCard>
            ))}
          </div>
        )}

        {/* Quizzes */}
        {activeTab === 'quizzes' && (
          <div className="space-y-4">
            <div className="text-xs text-muted-foreground px-0 pb-2">
              Test your knowledge and earn XP
            </div>
            {QUIZZES.map((quiz) => (
              <GradientCard key={quiz.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-foreground">{quiz.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      {quiz.questions} questions • +{quiz.xp} XP each
                    </p>
                  </div>
                  <GlowButton size="sm">Take Quiz</GlowButton>
                </div>
              </GradientCard>
            ))}
          </div>
        )}

        {/* Projects */}
        {activeTab === 'projects' && (
          <div className="space-y-4">
            <div className="text-xs text-muted-foreground px-0 pb-2">
              Build real-world projects and master coding
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
                      <h3 className="font-bold text-foreground">{project.title}</h3>
                      <p className="text-xs text-muted-foreground">{project.difficulty}</p>
                    </div>
                    <span className="text-sm font-semibold text-primary">+{project.xp} XP</span>
                  </div>
                  {!project.completed && (
                    <GlowButton size="sm" className="w-full">
                      Start Project
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
              Top learners this month
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
                      {user.xp.toLocaleString()} XP • 🔥 {user.streak} days
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
