'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';
import { GradientCard } from '@/components/loopify/GradientCard';
import { GlowButton } from '@/components/loopify/GlowButton';
import { StatCard } from '@/components/loopify/StatCard';

const COURSES = [
  {
    id: 1,
    title: 'Python asoslari',
    progress: 65,
    lessons: 12,
    completed: 8,
    nextLesson: 'Funktsiyalar va usullar',
    quizzes: 2,
    completedQuizzes: 1,
    slug: 'python',
  },
  {
    id: 2,
    title: 'Web Dasturlash asoslari',
    progress: 40,
    lessons: 15,
    completed: 6,
    nextLesson: 'CSS Flexbox',
    quizzes: 3,
    completedQuizzes: 2,
    slug: 'web',
  },
  {
    id: 3,
    title: 'Ma\'lumotlar strukturalari',
    progress: 0,
    lessons: 10,
    completed: 0,
    nextLesson: 'Massivlar va Ro\'yxatlar',
    quizzes: 2,
    completedQuizzes: 0,
    slug: 'data-structures',
  },
  {
    id: 4,
    title: 'Kiber Xavfsizlik',
    progress: 0,
    lessons: 8,
    completed: 0,
    nextLesson: 'Kuchli Parol va Fishing Hujumlaridan Himoyalanish',
    quizzes: 1,
    completedQuizzes: 0,
    slug: 'cybersecurity',
  },
  {
    id: 5,
    title: 'Kompyuter savodxonligi',
    progress: 0,
    lessons: 10,
    completed: 0,
    nextLesson: 'Kompyuter va uning qismlari',
    quizzes: 2,
    completedQuizzes: 0,
    slug: 'computer-literacy',
  },
];

export default function LearningPage() {
  const { language } = useLanguage();
  const [expandedCourse, setExpandedCourse] = useState<number | null>(null);
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-b from-background to-background/80 backdrop-blur-sm border-b border-border p-4">
        <h1 className="text-2xl font-bold gradient-text">
          {language === 'uz' ? "O'quv" : 'Learning'}
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          {language === 'uz' ? "O'z dasturla yazish yo'lingizni davom ettiring" : 'Continue your coding journey'}
        </p>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-4 max-w-2xl mx-auto">
        {COURSES.map((course) => (
          <div key={course.id}>
            <GradientCard className="p-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-foreground">{course.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {course.completed} / {course.lessons} {language === 'uz' ? 'darslar' : 'lessons'}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-primary">{course.progress}%</span>
                </div>

                {/* Progress Bar */}
                <div className="h-2 bg-card border border-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <p className="text-xs text-muted-foreground">
                    {language === 'uz' ? 'Keyingi:' : 'Next:'} <span className="text-foreground font-medium">{course.nextLesson}</span>
                  </p>
                  <Link href={`/learning/${course.slug}`}>
                    <GlowButton size="sm">
                      {course.completed > 0 ? (language === 'uz' ? 'Davom et' : 'Continue') : (language === 'uz' ? 'Boshlash' : 'Start')}
                    </GlowButton>
                  </Link>
                </div>
              </div>
            </GradientCard>

            {/* Expanded Quiz Section */}
            {expandedCourse === course.id && (
              <GradientCard variant="purple" className="p-4 mt-2">
                <h4 className="font-bold text-foreground mb-3">
                  {language === 'uz' ? 'Quiz va testlar' : 'Quizzes & Tests'}
                </h4>
                <div className="space-y-2">
                  {Array.from({ length: course.quizzes }).map((_, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-card/40 p-3 rounded-lg border border-primary/20">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">📝</span>
                        <div>
                          <p className="text-sm font-semibold text-foreground">Quiz {idx + 1}</p>
                          <p className="text-xs text-muted-foreground">
                            {language === 'uz' ? '5 savol · 10 daqiqa' : '5 questions · 10 minutes'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {idx < course.completedQuizzes && (
                          <span className="text-xs text-green-400 font-semibold">
                            ✓ {language === 'uz' ? 'Tayyorlangan' : 'Completed'}
                          </span>
                        )}
                        <GlowButton size="sm" variant={idx < course.completedQuizzes ? "secondary" : "primary"}>
                          {idx < course.completedQuizzes ? (language === 'uz' ? 'Qayta ishlash' : 'Redo') : (language === 'uz' ? 'Boshlash' : 'Start')}
                        </GlowButton>
                      </div>
                    </div>
                  ))}
                </div>
              </GradientCard>
            )}
          </div>
        ))}

        {/* Resources Section */}
        <GradientCard variant="purple" className="p-4 mt-6">
          <h3 className="font-bold text-foreground mb-3">
            {language === 'uz' ? "O'quv manbalari" : 'Learning Resources'}
          </h3>
          <div className="space-y-2 text-sm">
            <p className="flex items-center gap-2 text-muted-foreground">
              <span>📖</span> {language === 'uz' ? "Haqiqiy dunyo misollaridan foydalanilgan interaktiv darslar" : 'Interactive lessons with real-world examples'}
            </p>
            <p className="flex items-center gap-2 text-muted-foreground">
              <span>🎬</span> {language === 'uz' ? "Video qo'llanmalar va tushuntirish" : 'Video tutorials and explanations'}
            </p>
            <p className="flex items-center gap-2 text-muted-foreground">
              <span>⚙️</span> {language === 'uz' ? "Kodlash mashg'ulotlari" : 'Coding practice exercises'}
            </p>
            <p className="flex items-center gap-2 text-muted-foreground">
              <span>📝</span> {language === 'uz' ? "Her dars uchun quizlar va testlar" : 'Quizzes and tests for each lesson'}
            </p>
            <p className="flex items-center gap-2 text-muted-foreground">
              <span>🤔</span> {language === 'uz' ? "Tezkor yordam uchun AI yordamchi" : 'AI assistant for instant help'}
            </p>
          </div>
        </GradientCard>
      </div>
    </div>
  );
}
