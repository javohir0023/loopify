'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';
import { GradientCard } from '@/components/loopify/GradientCard';
import { GlowButton } from '@/components/loopify/GlowButton';

export default function WebLesson1() {
  const { language } = useLanguage();
  const [completed, setCompleted] = useState(false);

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/learning/web" className="text-sm text-primary hover:underline mb-4 inline-block">
            ← {language === 'uz' ? 'Web Dasturlash asoslari' : 'Web Development Basics'}
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {language === 'uz' ? 'HTML asoslari' : 'HTML Basics'}
          </h1>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <span>20 min</span>
            <span>Beginner</span>
            <span>XP: +25</span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6 mb-12">
          {/* Section 1 */}
          <GradientCard variant="blue" className="p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">
              {language === 'uz' ? 'HTML nima?' : 'What is HTML?'}
            </h2>
            <div className="space-y-3 text-foreground">
              <p>
                {language === 'uz'
                  ? 'HTML (HyperText Markup Language) – veb-sahifalarning asosi. U veb-browserga sahifaning strukturasini aytib beradi.'
                  : 'HTML (HyperText Markup Language) is the foundation of web pages. It tells the browser how to structure the content.'}
              </p>
              <p>
                {language === 'uz'
                  ? 'HTML-da taglar ishlatiladi. Har bir tag HTML elementini belgilaydi. Masalan, <h1> sarlavha uchun, <p> paragraf uchun.'
                  : 'HTML uses tags to mark content. Each tag defines an HTML element. For example, <h1> for heading, <p> for paragraph.'}
              </p>
            </div>
          </GradientCard>

          {/* Section 2 */}
          <GradientCard variant="purple" className="p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">
              {language === 'uz' ? 'HTML-ning asosiy tagi' : 'Basic HTML Tag Structure'}
            </h2>
            <div className="bg-muted rounded-lg p-4 font-mono text-sm space-y-2 overflow-x-auto">
              <code className="text-green-400 block">&lt;!DOCTYPE html&gt;</code>
              <code className="text-green-400 block">&lt;html&gt;</code>
              <code className="text-cyan-400 block ml-4">&lt;head&gt;</code>
              <code className="text-cyan-400 block ml-8">&lt;title&gt;Mening Sahifam&lt;/title&gt;</code>
              <code className="text-cyan-400 block ml-4">&lt;/head&gt;</code>
              <code className="text-cyan-400 block ml-4">&lt;body&gt;</code>
              <code className="text-cyan-400 block ml-8">&lt;h1&gt;Xush kelibsiz!&lt;/h1&gt;</code>
              <code className="text-cyan-400 block ml-8">&lt;p&gt;Bu mening veb-saytim&lt;/p&gt;</code>
              <code className="text-cyan-400 block ml-4">&lt;/body&gt;</code>
              <code className="text-green-400 block">&lt;/html&gt;</code>
            </div>
          </GradientCard>

          {/* Section 3 */}
          <GradientCard variant="pink" className="p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">
              {language === 'uz' ? 'Muhim HTML elementlar' : 'Important HTML Elements'}
            </h2>
            <div className="space-y-2 text-foreground text-sm">
              <div className="flex justify-between border-b border-muted pb-2">
                <span className="font-bold">&lt;h1&gt; - &lt;h6&gt;</span>
                <span>{language === 'uz' ? 'Sarlavhalar' : 'Headings'}</span>
              </div>
              <div className="flex justify-between border-b border-muted pb-2">
                <span className="font-bold">&lt;p&gt;</span>
                <span>{language === 'uz' ? 'Paragraf' : 'Paragraph'}</span>
              </div>
              <div className="flex justify-between border-b border-muted pb-2">
                <span className="font-bold">&lt;a&gt;</span>
                <span>{language === 'uz' ? 'Havola' : 'Link'}</span>
              </div>
              <div className="flex justify-between border-b border-muted pb-2">
                <span className="font-bold">&lt;img&gt;</span>
                <span>{language === 'uz' ? 'Rasm' : 'Image'}</span>
              </div>
              <div className="flex justify-between border-b border-muted pb-2">
                <span className="font-bold">&lt;ul&gt;, &lt;ol&gt;</span>
                <span>{language === 'uz' ? "Ro'yxatlar" : 'Lists'}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">&lt;div&gt;, &lt;span&gt;</span>
                <span>{language === 'uz' ? 'Konteyner' : 'Container'}</span>
              </div>
            </div>
          </GradientCard>

          {/* Section 4 */}
          <GradientCard variant="green" className="p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">
              {language === 'uz' ? 'Sodda HTML misoli' : 'Simple HTML Example'}
            </h2>
            <div className="bg-muted rounded-lg p-4 font-mono text-sm space-y-2 overflow-x-auto">
              <code className="text-green-400 block">&lt;h1&gt;Mening blog saytim&lt;/h1&gt;</code>
              <code className="text-green-400 block">&lt;p&gt;Xush kelibsiz mening blog saytiga!&lt;/p&gt;</code>
              <code className="text-green-400 block">&lt;a href="https://google.com"&gt;Google&lt;/a&gt;</code>
              <code className="text-green-400 block">&lt;img src="rasm.jpg" alt="Mening rasmi"&gt;</code>
            </div>
          </GradientCard>

          {/* Key Points */}
          <GradientCard variant="blue" className="p-6 border-2 border-primary">
            <h2 className="text-xl font-bold text-foreground mb-4">
              {language === 'uz' ? 'Muhim nuqtalar' : 'Key Points'}
            </h2>
            <ul className="space-y-2 text-foreground">
              <li>✓ {language === 'uz' ? 'HTML veb-sahifalarning asosi' : 'HTML is the foundation of web pages'}</li>
              <li>✓ {language === 'uz' ? 'Taglar HTML elementlarini belgilaydi' : 'Tags define HTML elements'}</li>
              <li>✓ {language === 'uz' ? 'Har bir opening tag uchun closing tag bo\'ladi' : 'Every tag has opening and closing parts'}</li>
              <li>✓ {language === 'uz' ? 'DOCTYPE va html taglar majbur' : 'DOCTYPE and html tags are required'}</li>
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
              {language === 'uz' ? '✓ Dars tugatildi! +25 XP' : '✓ Lesson completed! +25 XP'}
            </p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between">
          <Link href="/learning/web">
            <GlowButton variant="outline">
              ← {language === 'uz' ? 'Orqaga' : 'Back'}
            </GlowButton>
          </Link>
          <Link href="/learning/web/lesson-2">
            <GlowButton disabled={!completed}>
              {language === 'uz' ? 'Keyingi dars' : 'Next Lesson'} →
            </GlowButton>
          </Link>
        </div>
      </div>
    </main>
  );
}
