'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';
import { GradientCard } from '@/components/loopify/GradientCard';
import { GlowButton } from '@/components/loopify/GlowButton';

const LESSONS = [
  {
    id: 1,
    title: 'Kompyuter va uning qismlari',
    titleUz: 'Kompyuter va uning qismlari',
    description: 'Learn about computer hardware components',
    descriptionUz: 'Kompyuterning asosiy qismlari va ularning vazifalarini o\'rganing',
    duration: 15,
    level: 'Beginner',
    levelUz: 'Boshlang\'ich',
  },
  {
    id: 2,
    title: 'Operating Systems',
    titleUz: 'Operatsion tizimlar',
    description: 'Windows, Mac, Linux va boshqa OS lar',
    descriptionUz: 'Turli operatsion tizimlar va ularning xususiyatlari',
    duration: 20,
    level: 'Beginner',
    levelUz: 'Boshlang\'ich',
  },
  {
    id: 3,
    title: 'File Management',
    titleUz: 'Fayllarni boshqarish',
    description: 'How to organize and manage files',
    descriptionUz: 'Fayllar va papkalarni tartibda saqlash',
    duration: 15,
    level: 'Beginner',
    levelUz: 'Boshlang\'ich',
  },
  {
    id: 4,
    title: 'Internet Basics',
    titleUz: 'Internet asoslari',
    description: 'How the internet works',
    descriptionUz: 'Internet qanday ishlaydi va veb-brauzer',
    duration: 18,
    level: 'Beginner',
    levelUz: 'Boshlang\'ich',
  },
  {
    id: 5,
    title: 'Email va Communication',
    titleUz: 'Email va muloqot',
    description: 'Email, chat va video call',
    descriptionUz: 'Email va turli muloqot vositalari',
    duration: 15,
    level: 'Beginner',
    levelUz: 'Boshlang\'ich',
  },
  {
    id: 6,
    title: 'Microsoft Office',
    titleUz: 'Microsoft Office',
    description: 'Word, Excel va PowerPoint',
    descriptionUz: 'Word, Excel va PowerPoint dasturlari',
    duration: 25,
    level: 'Intermediate',
    levelUz: 'O\'rta',
  },
  {
    id: 7,
    title: 'Cloud Storage',
    titleUz: 'Bulutli saqlash',
    description: 'Google Drive, OneDrive va boshqalar',
    descriptionUz: 'Bulutli saqlash xizmatlari',
    duration: 12,
    level: 'Intermediate',
    levelUz: 'O\'rta',
  },
  {
    id: 8,
    title: 'Digital Safety',
    titleUz: 'Raqamli xavfsizlik',
    description: 'Online safety and security',
    descriptionUz: 'Internetda xavfsiz qolish',
    duration: 20,
    level: 'Intermediate',
    levelUz: 'O\'rta',
  },
  {
    id: 9,
    title: 'Troubleshooting',
    titleUz: 'Muammolarni hal qilish',
    description: 'Fix common computer problems',
    descriptionUz: 'Keng tarqalgan muammolarni hal qilish',
    duration: 18,
    level: 'Intermediate',
    levelUz: 'O\'rta',
  },
  {
    id: 10,
    title: 'Digital Skills',
    titleUz: 'Raqamli ko\'nikma',
    description: 'Essential digital skills',
    descriptionUz: 'Zamonaviy raqamli ko\'nikma',
    duration: 22,
    level: 'Intermediate',
    levelUz: 'O\'rta',
  },
];

export default function ComputerLiteracyPage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-b from-background to-background/80 backdrop-blur-sm border-b border-border p-4">
        <Link href="/learning" className="text-primary hover:underline text-sm mb-2 block">
          ← {language === 'uz' ? "O'quv" : 'Learning'}
        </Link>
        <h1 className="text-2xl font-bold gradient-text">
          {language === 'uz' ? 'Kompyuter savodxonligi' : 'Computer Literacy'}
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          {language === 'uz' ? 'Kompyuter va internet qo\'llashni o\'rganing' : 'Learn computer and internet basics'}
        </p>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-3 max-w-2xl mx-auto">
        <GradientCard variant="purple" className="p-4 mb-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              {language === 'uz' 
                ? 'Bu kurs kompyuter va internetdan samarali foydalanish uchun zarur bo\'lgan asosiy ko\'nikmalarni o\'rgatadi. Boshlang\'ich darajadan boshlang va yoqolmas raqamli ko\'nikmalarga ega bo\'ling.'
                : 'This course teaches essential skills for effective computer and internet use. Start from basics and become digitally literate.'}
            </p>
            <div className="flex gap-2 mt-3">
              <span className="text-xs px-2 py-1 rounded bg-primary/20 text-primary">📚 {LESSONS.length} {language === 'uz' ? 'dars' : 'lessons'}</span>
              <span className="text-xs px-2 py-1 rounded bg-accent/20 text-accent">⏱️ ~3 {language === 'uz' ? 'soat' : 'hours'}</span>
            </div>
          </div>
        </GradientCard>

        {/* Lessons */}
        {LESSONS.map((lesson) => (
          <GradientCard key={lesson.id} className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">📖</span>
                  <h3 className="font-bold text-foreground">
                    {language === 'uz' ? lesson.titleUz : lesson.title}
                  </h3>
                  <span className="text-xs px-2 py-1 rounded bg-primary/20 text-primary">
                    {language === 'uz' ? lesson.levelUz : lesson.level}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {language === 'uz' ? lesson.descriptionUz : lesson.description}
                </p>
                <p className="text-xs text-muted-foreground">
                  ⏱️ {lesson.duration} {language === 'uz' ? 'daqiqa' : 'minutes'}
                </p>
              </div>
              <Link href={`/learning/computer-literacy/lesson-${lesson.id}`}>
                <GlowButton size="sm">
                  {language === 'uz' ? 'O\'qish' : 'Learn'}
                </GlowButton>
              </Link>
            </div>
          </GradientCard>
        ))}
      </div>
    </div>
  );
}
