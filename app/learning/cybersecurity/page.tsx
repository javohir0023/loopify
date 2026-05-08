'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';
import { GradientCard } from '@/components/loopify/GradientCard';
import { GlowButton } from '@/components/loopify/GlowButton';

const LESSONS = [
  {
    id: 1,
    title: 'Kuchli Parol va Fishing Hujumlaridan Himoyalanish',
    titleEn: 'Strong Passwords and Phishing Protection',
    duration: '15 min',
    xp: 50,
    completed: false,
    slug: 'lesson-1',
  },
  {
    id: 2,
    title: '2 Bosqichli Himoya (2FA)',
    titleEn: 'Two-Factor Authentication (2FA)',
    duration: '10 min',
    xp: 40,
    completed: false,
    slug: 'lesson-2',
  },
  {
    id: 3,
    title: 'Xavfsiz Internet Foydalanish',
    titleEn: 'Safe Internet Usage',
    duration: '12 min',
    xp: 45,
    completed: false,
    slug: 'lesson-3',
  },
  {
    id: 4,
    title: 'Ijtimoiy Muhandislik Hujumlari',
    titleEn: 'Social Engineering Attacks',
    duration: '15 min',
    xp: 50,
    completed: false,
    slug: 'lesson-4',
  },
  {
    id: 5,
    title: 'Malware va Viruslardan Himoya',
    titleEn: 'Protection from Malware and Viruses',
    duration: '12 min',
    xp: 45,
    completed: false,
    slug: 'lesson-5',
  },
  {
    id: 6,
    title: 'Xavfsiz Parol Menejerlari',
    titleEn: 'Secure Password Managers',
    duration: '10 min',
    xp: 40,
    completed: false,
    slug: 'lesson-6',
  },
  {
    id: 7,
    title: 'VPN va Xavfsiz Ulanishlar',
    titleEn: 'VPN and Secure Connections',
    duration: '12 min',
    xp: 45,
    completed: false,
    slug: 'lesson-7',
  },
  {
    id: 8,
    title: 'Shaxsiy Ma\'lumotlarni Himoya Qilish',
    titleEn: 'Protecting Personal Information',
    duration: '15 min',
    xp: 50,
    completed: false,
    slug: 'lesson-8',
  },
];

export default function CybersecurityCoursePage() {
  const { language } = useLanguage();

  const totalXP = LESSONS.reduce((sum, lesson) => sum + lesson.xp, 0);
  const completedLessons = LESSONS.filter((l) => l.completed).length;
  const progress = Math.round((completedLessons / LESSONS.length) * 100);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-b from-background to-background/80 backdrop-blur-sm border-b border-border p-4">
        <div className="flex items-center gap-3 mb-2">
          <Link href="/learning" className="text-muted-foreground hover:text-foreground transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </Link>
          <div>
            <h1 className="text-xl font-bold gradient-text">Kiber Xavfsizlik</h1>
            <p className="text-xs text-muted-foreground">
              {language === 'uz' ? 'Internetda xavfsiz bo\'lishni o\'rganing' : 'Learn to stay safe online'}
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-muted-foreground">{completedLessons} / {LESSONS.length} {language === 'uz' ? 'darslar' : 'lessons'}</span>
            <span className="text-primary font-semibold">{progress}%</span>
          </div>
          <div className="h-2 bg-card border border-border rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {language === 'uz' ? `Jami ${totalXP} XP olish mumkin` : `Total ${totalXP} XP available`}
          </p>
        </div>
      </div>

      {/* Lessons List */}
      <div className="p-4 space-y-3 max-w-2xl mx-auto">
        {LESSONS.map((lesson, index) => (
          <Link key={lesson.id} href={`/learning/cybersecurity/${lesson.slug}`}>
            <GradientCard className={`p-4 ${lesson.completed ? 'opacity-70' : ''}`}>
              <div className="flex items-center gap-4">
                {/* Lesson Number */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                  lesson.completed 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                    : index === 0 
                      ? 'bg-primary/20 text-primary border border-primary/30'
                      : 'bg-card text-muted-foreground border border-border'
                }`}>
                  {lesson.completed ? '✓' : index + 1}
                </div>

                {/* Lesson Info */}
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground text-sm">
                    {language === 'uz' ? lesson.title : lesson.titleEn}
                  </h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                      </svg>
                      {lesson.duration}
                    </span>
                    <span className="text-xs text-primary font-medium">+{lesson.xp} XP</span>
                  </div>
                </div>

                {/* Arrow */}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </div>
            </GradientCard>
          </Link>
        ))}

        {/* Quiz Section */}
        <GradientCard variant="purple" className="p-4 mt-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
              <span className="text-2xl">🛡️</span>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-foreground">
                {language === 'uz' ? 'Kiber Xavfsizlik Quiz' : 'Cybersecurity Quiz'}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                {language === 'uz' ? '8 savol · 120 XP · Bilimingizni sinab ko\'ring' : '8 questions · 120 XP · Test your knowledge'}
              </p>
            </div>
            <Link href="/quiz">
              <GlowButton size="sm">
                {language === 'uz' ? 'Boshlash' : 'Start'}
              </GlowButton>
            </Link>
          </div>
        </GradientCard>
      </div>
    </div>
  );
}
