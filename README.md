# Loopify - Gamified Programming Learning Platform

A modern, gamified learning platform for Python, Web Development, and AI with interactive quizzes, real-world projects, daily challenges, and an XP-based progression system.

## Features

### Core Learning System
- **Onboarding Flow**: Goal selection (Python/Web/AI), skill level (Beginner/Intermediate), and daily time commitment (5/15/30 min)
- **Learning Paths**: Structured courses with lessons, exercises, and progress tracking
- **Interactive Quizzes**: Timed multiple-choice quizzes with instant feedback and explanation
- **Real Projects**: Beginner to Advanced coding projects with XP rewards (50-100 XP)
- **Daily Challenges**: Timed challenges with streak tracking and bonus rewards

### Gamification & Engagement
- **XP System**:
  - Quiz completion: +10 XP
  - Daily challenges: +20 XP
  - Mini projects: +50-100 XP (based on difficulty)
  - Streak bonus: +5 XP per consecutive day

- **Level Progression**: Level = Total XP / 100
  - Visual progress bars showing XP toward next level
  - Real-time level calculations

- **Streak System**:
  - Daily streak tracking with fire emoji display
  - Streak loss warnings (20+ hours without activity)
  - Streak protection indicators

- **Achievement Badges**:
  - First Steps, Quiz Master, Week Warrior, Project Builder
  - Unlock badges as you hit milestones

- **Leaderboard**: Compete with other learners globally

### Retention Features
- **Notifications**:
  - Daily reminder notifications at user's preferred time
  - Streak loss warnings
  - Level up celebrations
  - Achievement unlocked alerts

- **Reward Animations**:
  - Confetti bursts on quiz completion and level ups
  - Floating "+XP" text on reward triggers
  - Glow pulse effects on XP counter
  - Level up animations with celebratory messages

### Premium Model
- **Free Tier**: Basic content, 3 quizzes/day, limited AI chatbot (5 msg/day)
- **Pro Tier ($9.99/month)**: Unlimited quizzes, all projects, unlimited AI chatbot, ad-free
- **Pro+ Tier ($19.99/month)**: Everything + 1-on-1 mentorship, code reviews, priority support

### Design System
- **Dark Theme**: Navy and purple backgrounds with pink/neon accents
- **Modern Aesthetics**: Glassmorphism, gradient cards, neon glow effects
- **Mobile-First**: Fully responsive design optimized for mobile learning
- **Accessible**: Semantic HTML, ARIA labels, keyboard navigation

## Project Structure

```
app/
├── page.tsx                 # Home dashboard
├── onboarding/             # Onboarding flow
├── learning/               # Learning paths and courses
├── gamification/           # Quizzes, challenges, projects, leaderboard
├── chat/                   # AI chatbot interface
├── quiz/                   # Interactive quiz page
├── profile/                # User profile and stats
├── premium/                # Premium plans and pricing
├── features/               # Features showcase
└── layout.tsx              # Root layout with providers

components/loopify/        # Custom Loopify components
├── GradientCard.tsx        # Reusable gradient card component
├── GlowButton.tsx          # Neon-style glowing button
├── ProgressRing.tsx        # Circular progress indicator
├── StatCard.tsx            # Stats display card
├── LevelProgressBar.tsx    # XP progress toward next level
├── StreakDisplay.tsx       # Streak counter with warnings
├── NavBar.tsx              # Bottom mobile navigation
├── QuizCard.tsx            # Quiz question display
├── QuizTimer.tsx           # Countdown timer
├── QuizResults.tsx         # Quiz results screen
├── ProjectCard.tsx         # Mini project card
├── ConfettiAnimation.tsx   # Confetti burst effect
├── XPFloatingText.tsx      # Floating XP display
└── OnboardingCard.tsx      # Onboarding selection card

lib/
├── onboarding-context.tsx  # Onboarding state management
├── user-context.tsx        # User progress and XP tracking
├── xp-system.ts            # XP calculations and level logic
└── notifications.ts        # Push notification utilities

app/globals.css            # Global styles and animations
```

## Technology Stack

- **Framework**: Next.js 16 with App Router
- **UI**: React 19 with TypeScript
- **Styling**: Tailwind CSS with custom design tokens
- **State Management**: React Context API
- **Storage**: localStorage for persistence
- **Animations**: CSS animations with Tailwind utilities

## Getting Started

### Installation

```bash
# Clone the repository
git clone <repo-url>

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The app will be available at `http://localhost:3000`

### First Run

1. You'll be redirected to the onboarding flow
2. Select your learning goal (Python/Web/AI)
3. Choose your skill level (Beginner/Intermediate)
4. Set your daily commitment (5/15/30 minutes)
5. Enter your username
6. Start learning!

## Key Components

### Onboarding Context
Manages user's learning preferences and onboarding completion status, persisted to localStorage.

```tsx
const { data, updateData } = useOnboarding();
```

### User Context
Tracks user progress including XP, level, streak, badges, and completed activities.

```tsx
const { progress, addXP, updateStreak } = useUser();
```

### XP System
Centralized XP calculations and level progression logic.

```tsx
import { calculateLevel, getXPForNextLevel } from '@/lib/xp-system';
```

## Mobile Navigation

Bottom navigation bar provides access to:
- Home (Dashboard)
- Learn (Learning paths)
- Challenges (Quizzes, projects, leaderboard)
- Chat (AI assistant)
- Profile (User stats and settings)

## Customization

### Colors & Theme
Edit design tokens in `app/globals.css`:
- `--primary`: Pink (#ec4899)
- `--secondary`: Purple (#7c3aed)
- `--glow-blue`: Cyan (#06b6d4)
- `--background`: Dark navy (#0f0620)

### XP Rewards
Modify values in `lib/xp-system.ts`:
```typescript
export const XP_REWARDS = {
  QUIZ: 10,
  DAILY_CHALLENGE: 20,
  MINI_PROJECT_BEGINNER: 50,
  MINI_PROJECT_INTERMEDIATE: 75,
  MINI_PROJECT_ADVANCED: 100,
  STREAK_BONUS: 5,
};
```

### Quiz Questions
Update quiz data in `app/quiz/page.tsx` QUIZ_QUESTIONS array.

## Performance Features

- Responsive design optimized for all screen sizes
- Smooth animations and transitions
- Lazy loading of components
- Efficient state management with Context API
- CSS-based animations for smooth 60fps performance

## Future Enhancements

- Backend API integration for multiplayer leaderboards
- Persistent data storage in database
- Push notification service integration
- Real AI chatbot with Claude/GPT-4
- Offline content downloads
- Code editor for projects
- Social features (friend challenges, team learning)
- Mobile app with React Native

## License

MIT License - Feel free to use this for personal or commercial projects.
