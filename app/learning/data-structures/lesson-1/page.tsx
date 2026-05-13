'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';
import { GradientCard } from '@/components/loopify/GradientCard';
import { GlowButton } from '@/components/loopify/GlowButton';

export default function DataStructuresLesson1() {
  const { language } = useLanguage();
  const [completed, setCompleted] = useState(false);

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/learning/data-structures" className="text-sm text-primary hover:underline mb-4 inline-block">
            ← {language === 'uz' ? "Ma'lumotlar strukturalari" : 'Data Structures'}
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {language === 'uz' ? 'Massivlar va Ro\'yxatlar' : 'Arrays and Lists'}
          </h1>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <span>25 min</span>
            <span>Intermediate</span>
            <span>XP: +30</span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6 mb-12">
          {/* Section 1 */}
          <GradientCard variant="blue" className="p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">
              {language === 'uz' ? 'Massiv (Array) nima?' : 'What is an Array?'}
            </h2>
            <div className="space-y-3 text-foreground">
              <p>
                {language === 'uz'
                  ? 'Massiv – bir xil turdagi elementlarni saqlaydigan ma\'lumotlar strukturasi. Massivda har bir element indeksga ega (0 dan boshlanadi).'
                  : 'An array is a data structure that stores elements of the same type. Each element has an index starting from 0.'}
              </p>
              <p>
                {language === 'uz'
                  ? 'Massivning o\'lchami o\'zgarmasligi va o\'z vaqtida qulay boʻlsa-da, ba\'zan o\'zgaruvchan o\'lchamda ro\'yxat kerak bo\'ladi. Shuning uchun ro\'yxatlar mavjud.'
                  : 'Arrays have fixed size, but sometimes we need dynamic size. That\'s where lists come in.'}
              </p>
            </div>
          </GradientCard>

          {/* Section 2 */}
          <GradientCard variant="purple" className="p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">
              {language === 'uz' ? 'Massiv misolları' : 'Array Examples'}
            </h2>
            <div className="bg-muted rounded-lg p-4 font-mono text-sm space-y-3 overflow-x-auto">
              <p className="text-primary">{language === 'uz' ? 'Python massivi:' : 'Python Array:'}</p>
              <code className="text-green-400 block">numbers = [1, 2, 3, 4, 5]</code>
              <code className="text-green-400 block">print(numbers[0])  # 1 ni chiqaradi</code>
              <code className="text-green-400 block">print(numbers[2])  # 3 ni chiqaradi</code>

              <p className="text-primary mt-4">{language === 'uz' ? 'JavaScript massivi:' : 'JavaScript Array:'}</p>
              <code className="text-green-400 block">let fruits = ["Apple", "Banana", "Orange"];</code>
              <code className="text-green-400 block">console.log(fruits[0]);  // "Apple"</code>
            </div>
          </GradientCard>

          {/* Section 3 */}
          <GradientCard variant="pink" className="p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">
              {language === 'uz' ? 'Massiv operatsiyalari' : 'Array Operations'}
            </h2>
            <div className="space-y-2 text-foreground text-sm">
              <div className="flex justify-between border-b border-muted pb-2">
                <span className="font-bold">{language === 'uz' ? 'Qo\'shish' : 'Add'}</span>
                <span>{language === 'uz' ? 'append() yoki push()' : 'append() or push()'}</span>
              </div>
              <div className="flex justify-between border-b border-muted pb-2">
                <span className="font-bold">{language === 'uz' ? 'O\'chirish' : 'Remove'}</span>
                <span>{language === 'uz' ? 'remove() yoki pop()' : 'remove() or pop()'}</span>
              </div>
              <div className="flex justify-between border-b border-muted pb-2">
                <span className="font-bold">{language === 'uz' ? 'Qidiruv' : 'Search'}</span>
                <span>{language === 'uz' ? 'index() yoki indexOf()' : 'index() or indexOf()'}</span>
              </div>
              <div className="flex justify-between border-b border-muted pb-2">
                <span className="font-bold">{language === 'uz' ? 'O\'lchami' : 'Size'}</span>
                <span>{language === 'uz' ? 'len() yoki length' : 'len() or length'}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">{language === 'uz' ? 'Saralash' : 'Sort'}</span>
                <span>{language === 'uz' ? 'sort()' : 'sort()'}</span>
              </div>
            </div>
          </GradientCard>

          {/* Section 4 */}
          <GradientCard variant="green" className="p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">
              {language === 'uz' ? 'Ro\'yxat (List) nima?' : 'What is a List?'}
            </h2>
            <div className="space-y-3 text-foreground">
              <p>
                {language === 'uz'
                  ? 'Ro\'yxat – o\'zgaruvchan o\'lchamli ma\'lumotlar strukturasi. Elementi dinamik ravishda qo\'shish va o\'chirishni ta\'minlaydi.'
                  : 'A list is a dynamic data structure. You can add and remove elements dynamically.'}
              </p>
              <p>
                {language === 'uz'
                  ? 'Python da ro\'yxatlar [] kursiv qavslar bilan yaratilib, JavaScript da massivlar sifatida ishlatilib, boshqa tillarda esa List yoki LinkedList klasslari mavjud.'
                  : 'Lists provide more flexibility than arrays because they can grow and shrink dynamically.'}
              </p>
            </div>
          </GradientCard>

          {/* Section 5 */}
          <GradientCard variant="cyan" className="p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">
              {language === 'uz' ? 'Massiv vs Ro\'yxat' : 'Array vs List'}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-foreground">
                <thead>
                  <tr className="border-b border-muted">
                    <th className="text-left py-2">{language === 'uz' ? 'Xususiyat' : 'Feature'}</th>
                    <th className="text-left py-2">{language === 'uz' ? 'Massiv' : 'Array'}</th>
                    <th className="text-left py-2">{language === 'uz' ? 'Ro\'yxat' : 'List'}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-muted">
                    <td className="py-2">{language === 'uz' ? "O'lchami" : 'Size'}</td>
                    <td>{language === 'uz' ? "O'zgarmas" : 'Fixed'}</td>
                    <td>{language === 'uz' ? "O'zgaruvchi" : 'Dynamic'}</td>
                  </tr>
                  <tr className="border-b border-muted">
                    <td className="py-2">{language === 'uz' ? 'Tezlik' : 'Speed'}</td>
                    <td>{language === 'uz' ? 'Tezroq' : 'Faster'}</td>
                    <td>{language === 'uz' ? 'Sekinroq' : 'Slower'}</td>
                  </tr>
                  <tr>
                    <td className="py-2">{language === 'uz' ? 'Xotira' : 'Memory'}</td>
                    <td>{language === 'uz' ? "Aniqlanadi" : 'Fixed'}</td>
                    <td>{language === 'uz' ? "Dinamik" : 'Dynamic'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </GradientCard>

          {/* Key Points */}
          <GradientCard variant="blue" className="p-6 border-2 border-primary">
            <h2 className="text-xl font-bold text-foreground mb-4">
              {language === 'uz' ? 'Muhim nuqtalar' : 'Key Points'}
            </h2>
            <ul className="space-y-2 text-foreground">
              <li>✓ {language === 'uz' ? 'Massiv – fixed o\'lchamli, tezroq' : 'Arrays have fixed size and are faster'}</li>
              <li>✓ {language === 'uz' ? 'Ro\'yxat – dynamic o\'lchamli, o\'zgaruvchi' : 'Lists have dynamic size and are flexible'}</li>
              <li>✓ {language === 'uz' ? 'Indeks 0 dan boshlanadi' : 'Index starts from 0'}</li>
              <li>✓ {language === 'uz' ? 'Qo\'shish, o\'chirish, qidiruv operatsiyalari tez' : 'Add, remove, search operations are quick'}</li>
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
              {language === 'uz' ? '✓ Dars tugatildi! +30 XP' : '✓ Lesson completed! +30 XP'}
            </p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between">
          <Link href="/learning/data-structures">
            <GlowButton variant="outline">
              ← {language === 'uz' ? 'Orqaga' : 'Back'}
            </GlowButton>
          </Link>
          <Link href="/learning/data-structures/lesson-2">
            <GlowButton disabled={!completed}>
              {language === 'uz' ? 'Keyingi dars' : 'Next Lesson'} →
            </GlowButton>
          </Link>
        </div>
      </div>
    </main>
  );
}
