'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';
import { GradientCard } from '@/components/loopify/GradientCard';
import { GlowButton } from '@/components/loopify/GlowButton';

const LESSONS = [
  {
    id: 1,
    title: 'Python nima va o\'rnatish',
    titleEn: 'What is Python and Installation',
    duration: '15 min',
    difficulty: 'Beginner',
    slug: 'lesson-1',
  },
  {
    id: 2,
    title: 'O\'zgaruvchilar va ma\'lumot turlari',
    titleEn: 'Variables and Data Types',
    duration: '20 min',
    difficulty: 'Beginner',
    slug: 'lesson-2',
    locked: true,
  },
  {
    id: 3,
    title: 'Operatorlar va arifmetika',
    titleEn: 'Operators and Arithmetic',
    duration: '18 min',
    difficulty: 'Beginner',
    slug: 'lesson-3',
    locked: true,
  },
  {
    id: 4,
    title: 'Shartli operatorlar (if/else)',
    titleEn: 'Conditional Statements',
    duration: '22 min',
    difficulty: 'Intermediate',
    slug: 'lesson-4',
    locked: true,
  },
  {
    id: 5,
    title: 'Takrorlash tsikllar (for, while)',
    titleEn: 'Loops',
    duration: '25 min',
    difficulty: 'Intermediate',
    slug: 'lesson-5',
    locked: true,
  },
  {
    id: 6,
    title: 'Funktsiyalar',
    titleEn: 'Functions',
    duration: '30 min',
    difficulty: 'Intermediate',
    slug: 'lesson-6',
    locked: true,
  },
  {
    id: 7,
    title: 'Ro\'yxatlar va Tuple\'lar',
    titleEn: 'Lists and Tuples',
    duration: '28 min',
    difficulty: 'Intermediate',
    slug: 'lesson-7',
    locked: true,
  },
  {
    id: 8,
    title: 'Lug\'atlar (Dictionaries)',
    titleEn: 'Dictionaries',
    duration: '25 min',
    difficulty: 'Intermediate',
    slug: 'lesson-8',
    locked: true,
  },
  {
    id: 9,
    title: 'Fayl ishlash',
    titleEn: 'File Handling',
    duration: '20 min',
    difficulty: 'Advanced',
    slug: 'lesson-9',
    locked: true,
  },
  {
    id: 10,
    title: 'Ob\'ekt-yo\'naltirilgan dasturlash (OOP)',
    titleEn: 'Object-Oriented Programming',
    duration: '35 min',
    difficulty: 'Advanced',
    slug: 'lesson-10',
    locked: true,
  },
];

export default function PythonCourse() {
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
            {language === 'uz' ? 'Python asoslari' : 'Python Basics'}
          </h1>
          <p className="text-muted-foreground">
            {language === 'uz'
              ? 'Python dasturlash tilini boshlang\'ich darajadan o\'rganing'
              : 'Learn Python programming from the beginning'}
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
                <Link href={`/learning/python/${lesson.slug}`}>
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
