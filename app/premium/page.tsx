'use client';

import Link from 'next/link';
import { GradientCard } from '@/components/loopify/GradientCard';
import { GlowButton } from '@/components/loopify/GlowButton';

const TIERS = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    description: 'Perfect for getting started',
    features: [
      'Basic learning content',
      '3 quizzes per day',
      'Limited AI chatbot (5 msg/day)',
      'Community access',
      'Ad-supported',
    ],
    cta: 'Current Plan',
    disabled: true,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$9.99',
    period: '/month',
    description: 'For serious learners',
    features: [
      'All Free features',
      'Unlimited quizzes',
      'All mini projects',
      'Unlimited AI chatbot',
      'Ad-free experience',
      'Offline content',
    ],
    cta: 'Upgrade to Pro',
    disabled: false,
  },
  {
    id: 'pro-plus',
    name: 'Pro+',
    price: '$19.99',
    period: '/month',
    description: 'Ultimate learning experience',
    features: [
      'All Pro features',
      '1-on-1 mentorship',
      'Advanced projects',
      'Code review service',
      'Priority support',
      'Certificate of completion',
    ],
    cta: 'Upgrade to Pro+',
    disabled: false,
    badge: 'Most Popular',
  },
];

export default function PremiumPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-b from-background to-background/80 backdrop-blur-sm border-b border-border p-4">
        <Link href="/">
          <button className="text-muted-foreground hover:text-foreground transition-colors mb-2">
            ← Back
          </button>
        </Link>
        <h1 className="text-2xl font-bold gradient-text">Premium Plans</h1>
        <p className="text-xs text-muted-foreground mt-1">Unlock your full potential</p>
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
            <div key={tier.id} className="relative">
              {tier.badge && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-black text-xs font-bold px-3 py-1 rounded-full">
                    {tier.badge}
                  </span>
                </div>
              )}
              <GradientCard
                className={`p-6 ${tier.id === 'pro-plus' ? 'border-primary' : ''}`}
              >
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{tier.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{tier.description}</p>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-primary">{tier.price}</span>
                    {tier.period && <span className="text-muted-foreground text-sm">{tier.period}</span>}
                  </div>

                  <div className="space-y-2 border-t border-border pt-4">
                    {tier.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        <span className="text-primary mt-0.5">✓</span>
                        <span className="text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <GlowButton
                    className="w-full"
                    disabled={tier.disabled}
                    variant={tier.id === 'pro-plus' ? 'primary' : 'secondary'}
                  >
                    {tier.cta}
                  </GlowButton>
                </div>
              </GradientCard>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <GradientCard variant="blue" className="p-6">
          <h3 className="font-bold text-foreground mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-semibold text-foreground">Can I change my plan later?</p>
              <p className="text-muted-foreground mt-1">
                Yes, you can upgrade or downgrade anytime. Changes take effect at your next billing cycle.
              </p>
            </div>
            <div>
              <p className="font-semibold text-foreground">Do you offer a free trial?</p>
              <p className="text-muted-foreground mt-1">
                We offer a 7-day free trial for Pro and Pro+ plans. No credit card required!
              </p>
            </div>
            <div>
              <p className="font-semibold text-foreground">What payment methods do you accept?</p>
              <p className="text-muted-foreground mt-1">
                We accept all major credit cards, Apple Pay, Google Pay, and PayPal.
              </p>
            </div>
          </div>
        </GradientCard>

        {/* Back Button */}
        <Link href="/">
          <GlowButton className="w-full" variant="outline">
            Back to Home
          </GlowButton>
        </Link>
      </div>
    </div>
  );
}
