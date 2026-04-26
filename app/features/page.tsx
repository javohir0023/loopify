'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';
import { GradientCard } from '@/components/loopify/GradientCard';
import { GlowButton } from '@/components/loopify/GlowButton';

const FEATURES = [
  {
    icon: '🔥',
    title: 'Ketma-ketlik Kuzatish',
    titleEn: 'Streak Tracking',
    description: 'Kundalik ketma-ketliklar bilan izchil bo\'ling va hech qachon motivatsiyani yo\'qotmang',
    descriptionEn: 'Build consistency with daily streaks and never lose motivation',
    color: 'pink' as const,
  },
  {
    icon: '🏆',
    title: 'Erishim Tizimi',
    titleEn: 'Achievement System',
    description: 'Rivojlanish davomida medallar va o\'rinbosarlarni qulfdan chiqaring',
    descriptionEn: 'Unlock badges and milestones as you progress',
    color: 'purple' as const,
  },
  {
    icon: '📈',
    title: 'Daraja Rivojlanishi',
    titleEn: 'Level Progression',
    description: 'Har bir olingan XP bilan sizning darajangiz o\'sishini kuzating',
    descriptionEn: 'Watch your level grow with every XP earned',
    color: 'blue' as const,
  },
  {
    icon: '📝',
    title: 'Aqlli Quizlar',
    titleEn: 'Smart Quizzes',
    description: 'Vaqtli quizlar bilan bilimingizni sinab ko\'ring va darhol javoblar oling',
    descriptionEn: 'Test your knowledge with timed quizzes and instant feedback',
    color: 'pink' as const,
  },
  {
    icon: '🛠️',
    title: 'Haqiqiy Loyihalar',
    titleEn: 'Real Projects',
    description: 'Amaliy loyihalar qurilishi va o\'rgangan narsalaringizni qo\'llang',
    descriptionEn: 'Build practical projects and apply what you learn',
    color: 'purple' as const,
  },
  {
    icon: '⚡',
    title: 'Kundalik Tanlovlar',
    titleEn: 'Daily Challenges',
    description: 'Kodlash ko\'nikmalarini keskin saqlash uchun kichik tanlovlar',
    descriptionEn: 'Bite-sized challenges to keep your coding skills sharp',
    color: 'blue' as const,
  },
  {
    icon: '🤖',
    title: 'AI Chatbot',
    titleEn: 'AI Chatbot',
    description: 'Bizning AI yordamchisidan kodlash savollariga darhol yordam oling',
    descriptionEn: 'Get instant help with coding questions from our AI assistant',
    color: 'pink' as const,
  },
  {
    icon: '🌟',
    title: 'Premium Kontent',
    titleEn: 'Premium Content',
    description: 'Murakkab kurslar va eksklyuziv o\'quv materiallariga kirish',
    descriptionEn: 'Access advanced courses and exclusive learning materials',
    color: 'purple' as const,
  },
];

export default function FeaturesPage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-b from-background to-background/80 backdrop-blur-sm border-b border-border p-4">
        <h1 className="text-2xl font-bold gradient-text">
          {language === 'uz' ? 'Xususiyatlar' : 'Features'}
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          {language === 'uz' ? 'Dasturlashni o\'rganish uchun zarur bo\'lgan hamma narsa' : 'Everything you need to learn coding'}
        </p>
      </div>

      {/* Hero Section */}
      <div className="p-4 max-w-2xl mx-auto">
        <GradientCard variant="purple" className="p-8 text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-3">Loopify Xususiyatlari</h2>
          <p className="text-muted-foreground mb-6">
            {language === 'uz'
              ? 'Siz shodlik bilan o\'rganishingizni saqlash uchun mo\'ljallangan gamifikatsiyalashtirilgan o\'quv'
              : 'Gamified learning designed to keep you engaged and motivated'}
          </p>
          <Link href="/">
            <GlowButton className="w-full">
              {language === 'uz' ? 'Hozir o\'quvni boshlang' : 'Start Learning Now'}
            </GlowButton>
          </Link>
        </GradientCard>

        {/* Features Grid */}
        <div className="grid gap-4">
          {FEATURES.map((feature, index) => (
            <GradientCard key={index} variant={feature.color} className="p-5">
              <div className="flex gap-4">
                <div className="text-4xl flex-shrink-0">{feature.icon}</div>
                <div>
                  <h3 className="font-bold text-foreground text-lg">
                    {language === 'uz' ? feature.title : feature.titleEn}
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    {language === 'uz' ? feature.description : feature.descriptionEn}
                  </p>
                </div>
              </div>
            </GradientCard>
          ))}
        </div>

        {/* CTA Section */}
        <GradientCard variant="blue" className="p-6 mt-8">
          <h3 className="font-bold text-foreground text-lg mb-3">
            {language === 'uz' ? 'Yuqoriga ko\'tarish tayyor?' : 'Ready to level up?'}
          </h3>
          <p className="text-muted-foreground text-sm mb-4">
            {language === 'uz'
              ? 'Loopify bilan dasturlash ko\'nikmalarini qurasayotgan minglab o\'quvchilarga qo\'shiling. Bepul darslardan, loyihalardan va tanlovlardan boshlang.'
              : 'Join thousands of learners building coding skills with Loopify. Start with free lessons, projects, and challenges.'}
          </p>
          <Link href="/">
            <GlowButton className="w-full">
              {language === 'uz' ? 'Sayohatni boshlang' : 'Begin Your Journey'}
            </GlowButton>
          </Link>
        </GradientCard>
      </div>
    </div>
  );
}
