'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';
import { GradientCard } from '@/components/loopify/GradientCard';
import { GlowButton } from '@/components/loopify/GlowButton';

export default function ComputerLiteracyLesson1() {
  const { language } = useLanguage();
  const [completed, setCompleted] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-b from-background to-background/80 backdrop-blur-sm border-b border-border p-4">
        <Link href="/learning/computer-literacy" className="text-primary hover:underline text-sm mb-2 block">
          ← {language === 'uz' ? 'Kompyuter savodxonligi' : 'Computer Literacy'}
        </Link>
        <h1 className="text-2xl font-bold gradient-text">
          {language === 'uz' ? 'Kompyuter va uning qismlari' : 'Computer and Its Parts'}
        </h1>
      </div>

      {/* Main Content */}
      <div className="p-4 max-w-2xl mx-auto space-y-4">
        {/* Progress */}
        <div className="text-xs text-muted-foreground">
          {language === 'uz' ? 'Dars 1 / 10' : 'Lesson 1 / 10'} • ⏱️ 15 {language === 'uz' ? 'daqiqa' : 'minutes'}
        </div>

        {/* Content */}
        <GradientCard className="p-6 space-y-4">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-3">
              {language === 'uz' ? 'Kompyuter nima?' : 'What is a Computer?'}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {language === 'uz'
                ? 'Kompyuter - bu ma\'lumotlarni saqlash, qayta ishlash va boshqarish uchun mo\'ljallangan elektron qurilma. U turli qismlardan iborat bo\'lib, har biri o\'zining muhim vazifasini bajaradi.'
                : 'A computer is an electronic device designed to store, process, and manage information. It consists of various components, each with its important function.'}
            </p>
          </div>

          <div className="border-t border-border pt-4">
            <h2 className="text-xl font-bold text-foreground mb-3">
              {language === 'uz' ? 'Kompyuterning asosiy qismlari' : 'Main Computer Components'}
            </h2>
            
            <div className="space-y-3">
              {/* CPU */}
              <div className="bg-card/50 p-4 rounded-lg border border-border">
                <h3 className="font-bold text-foreground flex items-center gap-2 mb-2">
                  <span className="text-2xl">⚙️</span> CPU (Processor)
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {language === 'uz'
                    ? 'Kompyuterning "miyasi". U barcha hisob-kitoblarni va buyruqlarni bajara.'
                    : 'The "brain" of the computer. It performs all calculations and instructions.'}
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• {language === 'uz' ? 'Tezlik: GHz da o\'lchanadi' : 'Speed: measured in GHz'}</li>
                  <li>• {language === 'uz' ? 'Yadro soni: 2, 4, 8 yoki ko\'p' : 'Cores: 2, 4, 8 or more'}</li>
                </ul>
              </div>

              {/* RAM */}
              <div className="bg-card/50 p-4 rounded-lg border border-border">
                <h3 className="font-bold text-foreground flex items-center gap-2 mb-2">
                  <span className="text-2xl">💾</span> RAM (Memory)
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {language === 'uz'
                    ? 'Vaqtinchalik xotira. Faqat kompyuter ishlayotganida ma\'lumotlarni saqlaydi.'
                    : 'Temporary memory. Stores data only while the computer is running.'}
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• {language === 'uz' ? 'Hajmi: 4GB, 8GB, 16GB, 32GB' : 'Capacity: 4GB, 8GB, 16GB, 32GB'}</li>
                  <li>• {language === 'uz' ? 'Ko\'p RAM - ko\'p vaqt bir vaqtda ishlar' : 'More RAM = More multitasking'}</li>
                </ul>
              </div>

              {/* Storage */}
              <div className="bg-card/50 p-4 rounded-lg border border-border">
                <h3 className="font-bold text-foreground flex items-center gap-2 mb-2">
                  <span className="text-2xl">💿</span> Storage (Disk)
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {language === 'uz'
                    ? 'Doimiy xotira. Fayllar va dasturlar shu yerda saqlanadi.'
                    : 'Permanent memory. Files and programs are stored here.'}
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• HDD: {language === 'uz' ? 'Sekin, katta hajmli' : 'Slow, large capacity'}</li>
                  <li>• SSD: {language === 'uz' ? 'Tez, qimmat, kichik hajmli' : 'Fast, expensive, small capacity'}</li>
                </ul>
              </div>

              {/* Motherboard */}
              <div className="bg-card/50 p-4 rounded-lg border border-border">
                <h3 className="font-bold text-foreground flex items-center gap-2 mb-2">
                  <span className="text-2xl">🔗</span> Motherboard
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {language === 'uz'
                    ? 'Barcha qismlarni bog\'lovchi "asosiy plata". Ular orasida ma\'lumot almashadi.'
                    : 'The "main board" that connects all parts. Data is exchanged between them.'}
                </p>
              </div>

              {/* Power Supply */}
              <div className="bg-card/50 p-4 rounded-lg border border-border">
                <h3 className="font-bold text-foreground flex items-center gap-2 mb-2">
                  <span className="text-2xl">⚡</span> Power Supply
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {language === 'uz'
                    ? 'Barcha qismlarga elektr energiyasi beradi.'
                    : 'Provides electrical power to all components.'}
                </p>
              </div>

              {/* Cooling System */}
              <div className="bg-card/50 p-4 rounded-lg border border-border">
                <h3 className="font-bold text-foreground flex items-center gap-2 mb-2">
                  <span className="text-2xl">❄️</span> Cooling System
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {language === 'uz'
                    ? 'Kompyuterni ortiqcha issinishdan himoya qiladi.'
                    : 'Protects the computer from overheating.'}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <h2 className="text-xl font-bold text-foreground mb-3">
              {language === 'uz' ? 'Muhim nuqtalar' : 'Key Points'}
            </h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-primary">✓</span>
                <span>
                  {language === 'uz'
                    ? 'CPU kompyuterning "miyasi" bo\'lib, barcha hisob-kitoblarni bajaradi'
                    : 'CPU is the "brain" of the computer and performs all calculations'}
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">✓</span>
                <span>
                  {language === 'uz'
                    ? 'RAM vaqtinchalik xotira - ishlatilmasa, ma\'lumotlar yo\'qoladi'
                    : 'RAM is temporary memory - data is lost if not saved'}
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">✓</span>
                <span>
                  {language === 'uz'
                    ? 'Storage doimiy xotira - kompyuter o\'chsa ham ma\'lumotlar qoladi'
                    : 'Storage is permanent memory - data remains even when computer is off'}
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">✓</span>
                <span>
                  {language === 'uz'
                    ? 'Barcha qismlar motherboard orqali bir-biriga bog\'lanadi'
                    : 'All components are connected through the motherboard'}
                </span>
              </li>
            </ul>
          </div>
        </GradientCard>

        {/* Mark as Complete */}
        <GradientCard variant="purple" className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-foreground">
                {language === 'uz' ? 'Darsni yakunlash' : 'Complete Lesson'}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {language === 'uz' ? '+15 XP oling' : 'Earn +15 XP'}
              </p>
            </div>
            <GlowButton
              onClick={() => setCompleted(true)}
              disabled={completed}
            >
              {completed
                ? language === 'uz'
                  ? '✓ Tayyorlangan'
                  : '✓ Completed'
                : language === 'uz'
                ? 'Tugatish'
                : 'Complete'}
            </GlowButton>
          </div>
        </GradientCard>

        {/* Navigation */}
        <div className="flex gap-2">
          <Link href="/learning/computer-literacy" className="flex-1">
            <GlowButton variant="secondary" fullWidth>
              {language === 'uz' ? '← Orqaga' : '← Back'}
            </GlowButton>
          </Link>
          <Link href="/learning/computer-literacy/lesson-2" className="flex-1">
            <GlowButton fullWidth>
              {language === 'uz' ? 'Keyingi →' : 'Next →'}
            </GlowButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
