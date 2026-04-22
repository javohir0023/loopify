'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useOnboarding } from '@/lib/onboarding-context';
import { useUser } from '@/lib/user-context';
import { GradientCard } from '@/components/loopify/GradientCard';
import { GlowButton } from '@/components/loopify/GlowButton';
import { StatCard } from '@/components/loopify/StatCard';

const ACHIEVEMENTS = [
  { id: 1, name: 'First Steps', icon: '🚀', description: 'Complete your first lesson' },
  { id: 2, name: 'Quiz Master', icon: '📝', description: 'Score 100% on 5 quizzes' },
  { id: 3, name: 'Week Warrior', icon: '🔥', description: 'Maintain a 7-day streak' },
  { id: 4, name: 'Project Builder', icon: '🛠️', description: 'Complete 3 projects' },
];

export default function ProfilePage() {
  const router = useRouter();
  const { data } = useOnboarding();
  const { progress } = useUser();

  const handleLogout = () => {
    localStorage.clear();
    router.push('/onboarding');
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-b from-background to-background/80 backdrop-blur-sm border-b border-border p-4">
        <h1 className="text-2xl font-bold gradient-text">Profile</h1>
        <p className="text-xs text-muted-foreground mt-1">Your learning stats</p>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-6 max-w-2xl mx-auto">
        {/* Profile Header */}
        <GradientCard variant="purple" className="p-6 text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent mx-auto mb-4 flex items-center justify-center text-3xl">
            {data.username?.charAt(0).toUpperCase()}
          </div>
          <h2 className="text-2xl font-bold text-foreground">{data.username}</h2>
          <div className="mt-3 text-sm text-muted-foreground">
            <p>
              {data.goal === 'python'
                ? '🐍 Python'
                : data.goal === 'web'
                  ? '🌐 Web Development'
                  : '🤖 AI & ML'}
            </p>
            <p className="capitalize">{data.skillLevel} • {data.dailyTime} min/day</p>
          </div>
        </GradientCard>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <StatCard
            icon="📊"
            label="Total XP"
            value={progress.totalXP.toLocaleString()}
            secondaryValue={`Level ${progress.level}`}
            variant="pink"
          />
          <StatCard
            icon="🔥"
            label="Streak"
            value={progress.streak}
            secondaryValue="days"
            variant="blue"
          />
          <StatCard
            icon="🏆"
            label="Badges"
            value={progress.badges.length}
            secondaryValue="earned"
            variant="purple"
          />
          <StatCard
            icon="📚"
            label="Quizzes"
            value={progress.totalQuizzesTaken}
            secondaryValue="completed"
          />
        </div>

        {/* Achievements */}
        <div>
          <h3 className="font-bold text-foreground mb-3">Achievements</h3>
          <div className="grid grid-cols-2 gap-3">
            {ACHIEVEMENTS.map((achievement) => (
              <GradientCard key={achievement.id} className="p-4 text-center">
                <div className="text-3xl mb-2">{achievement.icon}</div>
                <h4 className="font-semibold text-sm text-foreground">{achievement.name}</h4>
                <p className="text-xs text-muted-foreground mt-1">{achievement.description}</p>
              </GradientCard>
            ))}
          </div>
        </div>

        {/* Premium Status */}
        <GradientCard variant="blue" className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-foreground">Premium Status</h3>
              <p className="text-sm text-muted-foreground">
                {progress.isPremium ? 'Pro Tier Active' : 'Currently Free Plan'}
              </p>
            </div>
            {!progress.isPremium && (
              <Link href="/premium">
                <GlowButton size="sm" variant="secondary">
                  Upgrade
                </GlowButton>
              </Link>
            )}
          </div>
        </GradientCard>

        {/* Settings */}
        <div className="space-y-2">
          <h3 className="font-bold text-foreground mb-3">Settings</h3>
          <GradientCard className="p-4">
            <button className="w-full text-left hover:text-primary transition-colors">
              <p className="font-medium text-foreground">Edit Profile</p>
              <p className="text-xs text-muted-foreground mt-1">Change your name and preferences</p>
            </button>
          </GradientCard>
          <GradientCard className="p-4">
            <button className="w-full text-left hover:text-primary transition-colors">
              <p className="font-medium text-foreground">Notifications</p>
              <p className="text-xs text-muted-foreground mt-1">Manage push notifications and reminders</p>
            </button>
          </GradientCard>
          <GradientCard className="p-4">
            <button className="w-full text-left hover:text-primary transition-colors">
              <p className="font-medium text-foreground">Help & Support</p>
              <p className="text-xs text-muted-foreground mt-1">FAQ, feedback, and contact support</p>
            </button>
          </GradientCard>
        </div>

        {/* Logout */}
        <GlowButton
          onClick={handleLogout}
          variant="outline"
          className="w-full"
        >
          Logout
        </GlowButton>
      </div>
    </div>
  );
}
