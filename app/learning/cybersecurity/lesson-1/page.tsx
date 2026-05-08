'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';
import { GradientCard } from '@/components/loopify/GradientCard';
import { GlowButton } from '@/components/loopify/GlowButton';

export default function CybersecurityLesson1Page() {
  const { language } = useLanguage();
  const [currentSection, setCurrentSection] = useState(0);

  const sections = [
    {
      title: language === 'uz' ? 'Kirish' : 'Introduction',
      content: language === 'uz' 
        ? 'Bugungi kunda internetdan foydalanayotgan har bir inson kiber xavflarga duch kelishi mumkin. Eng ko\'p uchraydigan xavflardan biri — fishing (phishing) hujumlari va zaif parollardir.'
        : 'Today, everyone using the internet can face cyber threats. One of the most common threats is phishing attacks and weak passwords.',
    },
    {
      title: language === 'uz' ? 'Fishing Hujumlari' : 'Phishing Attacks',
      content: language === 'uz'
        ? 'Fishing hujumida firibgarlar sizga soxta sayt, email yoki xabar yuborib:\n\n• parolingizni\n• bank kartangiz ma\'lumotlarini\n• shaxsiy ma\'lumotlaringizni\n\nolishga harakat qiladi.'
        : 'In a phishing attack, scammers send you fake websites, emails, or messages trying to steal:\n\n• your password\n• your bank card information\n• your personal data',
    },
    {
      title: language === 'uz' ? 'Fishing Misollari' : 'Phishing Examples',
      content: language === 'uz'
        ? 'Masalan, quyidagi xabarlar fishing bo\'lishi mumkin:\n\n• "Siz yutuq yutdingiz"\n• "Accountingiz bloklandi"\n• "Parolni tasdiqlang"\n\nBunday xabarlarga ehtiyot bo\'ling!'
        : 'For example, these messages could be phishing:\n\n• "You won a prize"\n• "Your account is blocked"\n• "Confirm your password"\n\nBe careful with such messages!',
    },
    {
      title: language === 'uz' ? 'Kuchli Parol' : 'Strong Password',
      content: language === 'uz'
        ? 'Kuchli parolda:\n\n• katta va kichik harflar\n• sonlar\n• maxsus belgilar (@ # !)\n\nbo\'lishi kerak.\n\nMisol:\n❌ Weak: 123456\n✅ Strong: L00pify@2026!'
        : 'A strong password should have:\n\n• uppercase and lowercase letters\n• numbers\n• special characters (@ # !)\n\nExample:\n❌ Weak: 123456\n✅ Strong: L00pify@2026!',
    },
    {
      title: language === 'uz' ? 'Himoya Qoidalari' : 'Protection Rules',
      content: language === 'uz'
        ? '✅ Har xil saytlar uchun har xil parol ishlating\n\n✅ Noma\'lum linklarni bosmang (telegram, email, instagram DM)\n\n✅ 2 bosqichli himoya (2FA) yoqing\n\n✅ OTP kod, parol yoki karta ma\'lumotlarini hech kimga yubormang'
        : '✅ Use different passwords for different sites\n\n✅ Don\'t click unknown links (telegram, email, instagram DM)\n\n✅ Enable 2-factor authentication (2FA)\n\n✅ Never share OTP codes, passwords, or card information with anyone',
    },
  ];

  const isLastSection = currentSection === sections.length - 1;
  const isFirstSection = currentSection === 0;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-b from-background to-background/80 backdrop-blur-sm border-b border-border p-4">
        <div className="flex items-center gap-3 mb-2">
          <Link href="/learning/cybersecurity" className="text-muted-foreground hover:text-foreground transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </Link>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">
              {language === 'uz' ? 'Kiber Xavfsizlik · Dars 1' : 'Cybersecurity · Lesson 1'}
            </p>
            <h1 className="text-lg font-bold text-foreground">
              {language === 'uz' ? 'Kuchli Parol va Fishing Hujumlaridan Himoyalanish' : 'Strong Passwords and Phishing Protection'}
            </h1>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-2">
          <div className="flex gap-1">
            {sections.map((_, index) => (
              <div
                key={index}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  index <= currentSection ? 'bg-primary' : 'bg-border'
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-1 text-right">
            {currentSection + 1} / {sections.length}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 max-w-2xl mx-auto">
        <GradientCard className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🛡️</span>
            <h2 className="text-lg font-bold text-foreground">{sections[currentSection].title}</h2>
          </div>
          
          <div className="text-foreground leading-relaxed whitespace-pre-line">
            {sections[currentSection].content}
          </div>
        </GradientCard>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <GlowButton
            variant="secondary"
            onClick={() => setCurrentSection(currentSection - 1)}
            disabled={isFirstSection}
            className={isFirstSection ? 'opacity-50 cursor-not-allowed' : ''}
          >
            {language === 'uz' ? 'Oldingi' : 'Previous'}
          </GlowButton>

          {isLastSection ? (
            <Link href="/learning/cybersecurity">
              <GlowButton>
                {language === 'uz' ? 'Tugatish (+50 XP)' : 'Complete (+50 XP)'}
              </GlowButton>
            </Link>
          ) : (
            <GlowButton onClick={() => setCurrentSection(currentSection + 1)}>
              {language === 'uz' ? 'Keyingi' : 'Next'}
            </GlowButton>
          )}
        </div>

        {/* Tips */}
        <GradientCard variant="purple" className="p-4 mt-6">
          <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
            <span>💡</span>
            {language === 'uz' ? 'Maslahat' : 'Tip'}
          </h3>
          <p className="text-sm text-muted-foreground">
            {language === 'uz' 
              ? 'Har bir darsdan so\'ng quiz yechib, bilimingizni mustahkamlang va qo\'shimcha XP oling!'
              : 'After each lesson, take the quiz to reinforce your knowledge and earn extra XP!'}
          </p>
        </GradientCard>
      </div>
    </div>
  );
}
