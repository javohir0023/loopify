'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';
import { GradientCard } from '@/components/loopify/GradientCard';
import { GlowButton } from '@/components/loopify/GlowButton';

export default function Lesson1() {
  const { language } = useLanguage();
  const [completed, setCompleted] = useState(false);

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/learning/python" className="text-sm text-primary hover:underline mb-4 inline-block">
            ← {language === 'uz' ? 'Python asoslari' : 'Python Basics'}
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {language === 'uz' ? 'Python nima va o\'rnatish' : 'What is Python and Installation'}
          </h1>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <span>15 min</span>
            <span>Beginner</span>
            <span>XP: +20</span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6 mb-12">
          {/* Section 1 */}
          <GradientCard variant="blue" className="p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">
              {language === 'uz' ? 'Python nima?' : 'What is Python?'}
            </h2>
            <div className="space-y-3 text-foreground">
              <p>
                {language === 'uz'
                  ? 'Python – bu kuchli, sodda va universal dasturlash tilidir. 1991 yilda Guido van Rossum tomonidan yaratilgan bu til bugungi kunda eng ko\'p ishlatiladigan tillardan biri.'
                  : 'Python is a powerful, simple, and versatile programming language. Created in 1991 by Guido van Rossum, it is one of the most popular languages today.'}
              </p>
              <p>
                {language === 'uz'
                  ? 'Python sodda sintaksisiga tufayli o\'rnatish va o\'qrish oson. Uni veb-dasturlash, sun\'iy intellekt, ma\'lumotlar tahlili va ko\'p boshqa sohalarda ishlatiladi.'
                  : 'Python is easy to learn and understand due to its simple syntax. It is used in web development, artificial intelligence, data analysis, and many other fields.'}
              </p>
            </div>
          </GradientCard>

          {/* Section 2 */}
          <GradientCard variant="purple" className="p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">
              {language === 'uz' ? 'Python nima uchun foydali?' : 'Why is Python Useful?'}
            </h2>
            <ul className="space-y-2 text-foreground list-disc list-inside">
              <li>{language === 'uz' ? 'Sodda va tushunarli kod yozish' : 'Simple and readable code'}</li>
              <li>{language === 'uz' ? 'Katta kutubxonalar va frameworklar' : 'Large libraries and frameworks'}</li>
              <li>{language === 'uz' ? 'Tezkor ishlab chiqish' : 'Fast development'}</li>
              <li>{language === 'uz' ? 'Veb, AI, Data Science da qo\'llaniladi' : 'Used in Web, AI, Data Science'}</li>
              <li>{language === 'uz' ? 'Bepul va ochiq kodli' : 'Free and open source'}</li>
            </ul>
          </GradientCard>

          {/* Section 3 */}
          <GradientCard variant="pink" className="p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">
              {language === 'uz' ? 'Python o\'rnatish' : 'Installing Python'}
            </h2>
            <div className="space-y-4 text-foreground">
              <div>
                <h3 className="font-bold mb-2">Windows:</h3>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  <li>{language === 'uz' ? 'python.org saytiga tashrif buyuring' : 'Visit python.org'}</li>
                  <li>{language === 'uz' ? 'Oxirgi versiyani yuklab oling (Download Python)' : 'Download the latest version'}</li>
                  <li>{language === 'uz' ? 'O\'rnatuvchi faylini ishga tushiring' : 'Run the installer'}</li>
                  <li>{language === 'uz' ? '"Add Python to PATH" ni tanlang' : 'Check "Add Python to PATH"'}</li>
                  <li>{language === 'uz' ? 'O\'rnatuvni tugatish uchun Next ni bosing' : 'Click Install Now'}</li>
                </ol>
              </div>

              <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                <p className="text-primary mb-2">{language === 'uz' ? 'O\'rnatilganini tekshirish:' : 'Verify installation:'}</p>
                <code className="text-foreground">python --version</code>
              </div>
            </div>
          </GradientCard>

          {/* Section 4 */}
          <GradientCard variant="green" className="p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">
              {language === 'uz' ? 'Birinchi Python dasturi' : 'Your First Python Program'}
            </h2>
            <div className="bg-muted rounded-lg p-4 font-mono text-sm space-y-2">
              <p className="text-primary">{language === 'uz' ? 'hello.py faylni yarating:' : 'Create hello.py file:'}</p>
              <code className="text-green-400 block">print("Salom, Python!")</code>
              <code className="text-green-400 block">print("Loopify platformasida xush kelibsiz!")</code>
              <p className="text-muted-foreground text-xs mt-4">
                {language === 'uz'
                  ? 'Terminalda: python hello.py'
                  : 'In terminal: python hello.py'}
              </p>
            </div>
          </GradientCard>

          {/* Key Points */}
          <GradientCard variant="blue" className="p-6 border-2 border-primary">
            <h2 className="text-xl font-bold text-foreground mb-4">
              {language === 'uz' ? 'Muhim nuqtalar' : 'Key Points'}
            </h2>
            <ul className="space-y-2 text-foreground">
              <li>✓ {language === 'uz' ? 'Python – universal va oson dasturlash tili' : 'Python is universal and easy to learn'}</li>
              <li>✓ {language === 'uz' ? 'Python o\'rnatish juda sodda' : 'Python installation is easy'}</li>
              <li>✓ {language === 'uz' ? 'print() funktsiyasi ekranga matn chiqaradi' : 'print() function shows text on screen'}</li>
              <li>✓ {language === 'uz' ? 'Terminalni ishlatib Python kodini ishga tushirasiz' : 'Run Python code from terminal'}</li>
            </ul>
          </GradientCard>
        </div>

        {/* Completion Button */}
        {!completed ? (
          <div className="flex justify-center mb-8">
            <GlowButton onClick={() => setCompleted(true)} size="lg">
              {language === 'uz' ? 'Darsni tugatish' : 'Complete Lesson'}
            </GlowButton>
          </div>
        ) : (
          <div className="bg-green-500/20 border border-green-500 rounded-lg p-4 mb-8 text-center">
            <p className="text-green-400 font-bold">
              {language === 'uz' ? '✓ Dars tugatildi! +20 XP' : '✓ Lesson completed! +20 XP'}
            </p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between">
          <Link href="/learning/python">
            <GlowButton variant="outline">
              ← {language === 'uz' ? 'Orqaga' : 'Back'}
            </GlowButton>
          </Link>
          <Link href="/learning/python/lesson-2">
            <GlowButton disabled={!completed}>
              {language === 'uz' ? 'Keyingi dars' : 'Next Lesson'} →
            </GlowButton>
          </Link>
        </div>
      </div>
    </main>
  );
}
