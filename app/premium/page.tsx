'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';
import { GradientCard } from '@/components/loopify/GradientCard';
import { GlowButton } from '@/components/loopify/GlowButton';

const TIERS = [
  {
    id: 'free',
    name: 'Bepul',
    nameEn: 'Free',
    price: '$0',
    description: 'Boshlash uchun ideal',
    descriptionEn: 'Perfect for getting started',
    features: [
      'Asosiy o\'quv materiallari',
      'Kunga 3 quiz',
      'Cheklangan AI chatbot (kunga 5 xabar)',
      'Jamoaviy kirish',
      'Reklama bilan',
    ],
    featuresEn: [
      'Basic learning content',
      '3 quizzes per day',
      'Limited AI chatbot (5 msg/day)',
      'Community access',
      'Ad-supported',
    ],
    cta: 'Hozirgi rejani',
    ctaEn: 'Current Plan',
    disabled: true,
  },
  {
    id: 'pro',
    name: 'Pro',
    nameEn: 'Pro',
    price: '$9.99',
    period: '/oy',
    periodEn: '/month',
    description: 'Jiddiy o\'quvchilar uchun',
    descriptionEn: 'For serious learners',
    features: [
      'Barcha Bepul xususiyatlar',
      'Cheksiz quizlar',
      'Barcha mini loyihalar',
      'Cheksiz AI chatbot',
      'Reklamasiz tajriba',
      'Oflayn kontent',
    ],
    featuresEn: [
      'All Free features',
      'Unlimited quizzes',
      'All mini projects',
      'Unlimited AI chatbot',
      'Ad-free experience',
      'Offline content',
    ],
    cta: 'Pro\'ga yangilash',
    ctaEn: 'Upgrade to Pro',
    disabled: false,
  },
  {
    id: 'pro-plus',
    name: 'Pro+',
    nameEn: 'Pro+',
    price: '$19.99',
    period: '/oy',
    periodEn: '/month',
    description: 'Eng yaxshi o\'quv tajribasi',
    descriptionEn: 'Ultimate learning experience',
    features: [
      'Barcha Pro xususiyatlar',
      '1-on-1 mentorligi',
      'Murakkab loyihalar',
      'Kod ko\'rib chiqish xizmati',
      'Prioritet yordami',
      'Tugatish sertifikati',
    ],
    featuresEn: [
      'All Pro features',
      '1-on-1 mentorship',
      'Advanced projects',
      'Code review service',
      'Priority support',
      'Certificate of completion',
    ],
    cta: 'Pro+\'ga yangilash',
    ctaEn: 'Upgrade to Pro+',
    disabled: false,
    badge: 'Eng mashhur',
    badgeEn: 'Most Popular',
  },
];

export default function PremiumPage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-b from-background to-background/80 backdrop-blur-sm border-b border-border p-4">
        <h1 className="text-2xl font-bold gradient-text">
          {language === 'uz' ? 'Premium Rejalari' : 'Premium Plans'}
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          {language === 'uz' ? 'Cheksiz o\'quvni qulfdan chiqaring' : 'Unlock unlimited learning'}
        </p>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-6 max-w-2xl mx-auto">
        {/* Hero Section */}
        <GradientCard variant="purple" className="p-6 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Level Up Your Learning</h2>
          <p className="text-muted-foreground">
            Get unlimited access to advanced courses, projects, and personalized mentorship
          </p>
        </GradientCard>

        {/* Pricing Cards */}
        <div className="space-y-4">
          {TIERS.map((tier) => (
            <GradientCard key={tier.id} variant={tier.id === 'pro-plus' ? 'purple' : 'pink'} className="p-6 relative">
              {tier.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-black px-3 py-1 rounded-full text-xs font-bold">
                  {language === 'uz' ? tier.badge : tier.badgeEn}
                </div>
              )}
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {language === 'uz' ? tier.name : tier.nameEn}
              </h2>
              <p className="text-muted-foreground text-sm mb-4">
                {language === 'uz' ? tier.description : tier.descriptionEn}
              </p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-primary">{tier.price}</span>
                <span className="text-muted-foreground text-sm">
                  {language === 'uz' ? tier.period : tier.periodEn}
                </span>
              </div>
              <ul className="space-y-3 mb-6">
                {(language === 'uz' ? tier.features : tier.featuresEn).map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-foreground">
                    <span className="text-primary mt-1">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <GlowButton disabled={tier.disabled} className="w-full">
                {language === 'uz' ? tier.cta : tier.ctaEn}
              </GlowButton>
            </GradientCard>
          ))}
        </div>

        {/* FAQ Section */}
        <GradientCard variant="blue" className="p-6">
          <h3 className="font-bold text-foreground mb-4">
            {language === 'uz' ? 'Tez-tez so\'raladigan savollar' : 'Frequently Asked Questions'}
          </h3>
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-semibold text-foreground">
                {language === 'uz' ? 'Keyinchalik rejani o\'zgartirishim mumkinmi?' : 'Can I change my plan later?'}
              </p>
              <p className="text-muted-foreground mt-1">
                {language === 'uz'
                  ? 'Ha, siz istalgan vaqtda yangilashingiz yoki pasaytirishingiz mumkin. O\'zgarishlar keyingi to\'liq siklida amalga oshadi.'
                  : 'Yes, you can upgrade or downgrade anytime. Changes take effect at your next billing cycle.'}
              </p>
            </div>
            <div>
              <p className="font-semibold text-foreground">
                {language === 'uz' ? 'Bepul sinov vaqtini taqdim etasizmi?' : 'Do you offer a free trial?'}
              </p>
              <p className="text-muted-foreground mt-1">
                {language === 'uz'
                  ? 'Biz Pro va Pro+ rejalari uchun 7 kunlik bepul sinov taqdim etamiz. Kredit kartasi kerak emas!'
                  : 'We offer a 7-day free trial for Pro and Pro+ plans. No credit card required!'}
              </p>
            </div>
            <div>
              <p className="font-semibold text-foreground">
                {language === 'uz' ? 'Qanday to\'lov usullarini qabul qilasiz?' : 'What payment methods do you accept?'}
              </p>
              <p className="text-muted-foreground mt-1">
                {language === 'uz'
                  ? 'Biz barcha asosiy kredit kartalarini, Apple Pay, Google Pay va PayPalni qabul qilamiz.'
                  : 'We accept all major credit cards, Apple Pay, Google Pay, and PayPal.'}
              </p>
            </div>
          </div>
        </GradientCard>

        {/* Back Button */}
        <Link href="/">
          <GlowButton className="w-full">
            {language === 'uz' ? 'Bosh sahifaga qaytish' : 'Back to Home'}
          </GlowButton>
        </Link>
      </div>
    </div>
  );
}
