'use client';

import Link from 'next/link';
import { GradientCard } from '@/components/loopify/GradientCard';
import { GlowButton } from '@/components/loopify/GlowButton';

const FEATURES = [
  {
    icon: '🔥',
    title: 'Streak Tracking',
    description: 'Build consistency with daily streaks and never lose motivation',
    color: 'pink' as const,
  },
  {
    icon: '🏆',
    title: 'Achievement System',
    description: 'Unlock badges and milestones as you progress',
    color: 'purple' as const,
  },
  {
    icon: '📈',
    title: 'Level Progression',
    description: 'Watch your level grow with every XP earned',
    color: 'blue' as const,
  },
  {
    icon: '📝',
    title: 'Smart Quizzes',
    description: 'Test your knowledge with timed quizzes and instant feedback',
    color: 'pink' as const,
  },
  {
    icon: '🛠️',
    title: 'Real Projects',
    description: 'Build practical projects and apply what you learn',
    color: 'purple' as const,
  },
  {
    icon: '⚡',
    title: 'Daily Challenges',
    description: 'Bite-sized challenges to keep your coding skills sharp',
    color: 'blue' as const,
  },
  {
    icon: '🤖',
    title: 'AI Chatbot',
    description: 'Get instant help with coding questions from our AI assistant',
    color: 'pink' as const,
  },
  {
    icon: '🌟',
    title: 'Premium Content',
    description: 'Access advanced courses and exclusive learning materials',
    color: 'purple' as const,
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-b from-background to-background/80 backdrop-blur-sm border-b border-border p-4">
        <h1 className="text-2xl font-bold gradient-text">Features</h1>
        <p className="text-xs text-muted-foreground mt-1">Everything you need to learn coding</p>
      </div>

      {/* Hero Section */}
      <div className="p-4 max-w-2xl mx-auto">
        <GradientCard variant="purple" className="p-8 text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-3">Loopify Features</h2>
          <p className="text-muted-foreground mb-6">
            Gamified learning designed to keep you engaged and motivated
          </p>
          <Link href="/">
            <GlowButton className="w-full">Start Learning Now</GlowButton>
          </Link>
        </GradientCard>

        {/* Features Grid */}
        <div className="grid gap-4">
          {FEATURES.map((feature, index) => (
            <GradientCard key={index} variant={feature.color} className="p-5">
              <div className="flex gap-4">
                <div className="text-4xl flex-shrink-0">{feature.icon}</div>
                <div>
                  <h3 className="font-bold text-foreground text-lg">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{feature.description}</p>
                </div>
              </div>
            </GradientCard>
          ))}
        </div>

        {/* CTA Section */}
        <GradientCard variant="blue" className="p-6 mt-8">
          <h3 className="font-bold text-foreground text-lg mb-3">Ready to level up?</h3>
          <p className="text-muted-foreground text-sm mb-4">
            Join thousands of learners building coding skills with Loopify. Start with free lessons, projects, and challenges.
          </p>
          <Link href="/">
            <GlowButton className="w-full" variant="secondary">
              Begin Your Journey
            </GlowButton>
          </Link>
        </GradientCard>
      </div>
    </div>
  );
}
