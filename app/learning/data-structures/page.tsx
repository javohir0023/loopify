'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';
import { GradientCard } from '@/components/loopify/GradientCard';
import { GlowButton } from '@/components/loopify/GlowButton';

const LESSONS = [
  {
    id: 1,
    title: 'Massivlar va Ro\'yxatlar',
    titleEn: 'Arrays and Lists',
    duration: '25 min',
    difficulty: 'Intermediate',
    slug: 'lesson-1',
  },
  {
    id: 2,
    title: 'Stack va Queue',
    titleEn: 'Stack and Queue',
    duration: '30 min',
    difficulty: 'Intermediate',
    slug: 'lesson-2',
    locked: true,
  },
  {
    id: 3,
    title: 'Bog\'langan Ro\'yxatlar',
    titleEn: 'Linked Lists',
    duration: '35 min',
    difficulty: 'Intermediate',
    slug: 'lesson-3',
    locked: true,
  },
  {
    id: 4,
    title: 'Daraxt strukturasi',
    titleEn: 'Tree Structure',
    duration: '40 min',
    difficulty: 'Advanced',
    slug: 'lesson-4',
    locked: true,
  },
  {
    id: 5,
    title: 'Graf strukturasi',
    titleEn: 'Graph Structure',
    duration: '45 min',
    difficulty: 'Advanced',
    slug: 'lesson-5',
    locked: true,
  },
  {
    id: 6,
    title: 'Saralash algoritmləri',
    titleEn: 'Sorting Algorithms',
    duration: '40 min',
    difficulty: 'Advanced',
    slug: 'lesson-6',
    locked: true,
  },
  {
    id: 7,
    title: 'Qidiruv algoritmləri',
    titleEn: 'Search Algorithms',
    duration: '35 min',
    difficulty: 'Advanced',
    slug: 'lesson-7',
    locked: true,
  },
  {
    id: 8,
    title: 'Hash Tablitsa',
    titleEn: 'Hash Table',
    duration: '30 min',
    difficulty: 'Advanced',
    slug: 'lesson-8',
    locked: true,
  },
  {
    id: 9,
    title: 'Dinamik Programlash',
    titleEn: 'Dynamic Programming',
    duration: '50 min',
    difficulty: 'Advanced',
    slug: 'lesson-9',
    locked: true,
  },
  {
    id: 10,
    title: 'Loyiha: Murakkab Struktura',
    titleEn: 'Project: Complex Structure',
    duration: '90 min',
    difficulty: 'Advanced',
    slug: 'lesson-10',
    locked: true,
  },
];

export default function DataStructuresCourse() {
  const { language } = useLanguage();
  const [completedLessons] = useState<number[]>([1]);

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/learning" className="text-sm text-primary hover:underline mb-4 inline-block">
            ← {language === 'uz' ? "O'quv" : 'Learning'}
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {language === 'uz' ? 'Ma\'lumotlar strukturalari' : 'Data Structures'}
          </h1>
          <p className="text-muted-foreground">
            {language === 'uz'
              ? 'Murakkab algoritmlar va optimal dasturlashni o\'rganing'
              : 'Learn complex algorithms and optimal programming'}
          </p>
        </div>

        {/* Progress */}
        <GradientCard variant="blue" className="mb-8 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-foreground">
              {language === 'uz' ? 'Sizning taraqqiyotingiz' : 'Your Progress'}
            </h3>
            <span className="text-sm text-primary font-bold">
              {completedLessons.length}/{LESSONS.length}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary rounded-full h-2 transition-all duration-300"
              style={{ width: `${(completedLessons.length / LESSONS.length) * 100}%` }}
            />
          </div>
        </GradientCard>

        {/* Lessons Grid */}
        <div className="space-y-3">
          {LESSONS.map((lesson) => (
            <div key={lesson.id}>
              {lesson.locked ? (
                <div className="bg-muted rounded-lg p-4 opacity-50 cursor-not-allowed">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {language === 'uz' ? lesson.title : lesson.titleEn}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {lesson.duration} • {lesson.difficulty}
                      </p>
                    </div>
                    <span className="text-xl">🔒</span>
                  </div>
                </div>
              ) : (
                <Link href={`/learning/data-structures/${lesson.slug}`}>
                  <GradientCard
                    variant={completedLessons.includes(lesson.id) ? 'green' : 'purple'}
                    className="p-4 cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {language === 'uz' ? lesson.title : lesson.titleEn}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          {lesson.duration} • {lesson.difficulty}
                        </p>
                      </div>
                      <div className="text-right">
                        {completedLessons.includes(lesson.id) && (
                          <span className="text-sm text-green-400 font-bold">✓</span>
                        )}
                        <span className="text-2xl">→</span>
                      </div>
                    </div>
                  </GradientCard>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
