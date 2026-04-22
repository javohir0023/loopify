'use client';

import { GradientCard } from '@/components/loopify/GradientCard';
import { GlowButton } from '@/components/loopify/GlowButton';
import { StatCard } from '@/components/loopify/StatCard';

const COURSES = [
  {
    id: 1,
    title: 'Python Basics',
    progress: 65,
    lessons: 12,
    completed: 8,
    nextLesson: 'Functions & Methods',
  },
  {
    id: 2,
    title: 'Web Development Fundamentals',
    progress: 40,
    lessons: 15,
    completed: 6,
    nextLesson: 'CSS Flexbox',
  },
  {
    id: 3,
    title: 'Data Structures',
    progress: 0,
    lessons: 10,
    completed: 0,
    nextLesson: 'Arrays & Lists',
  },
];

export default function LearningPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-b from-background to-background/80 backdrop-blur-sm border-b border-border p-4">
        <h1 className="text-2xl font-bold gradient-text">Learning Path</h1>
        <p className="text-xs text-muted-foreground mt-1">Continue your programming journey</p>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-4 max-w-2xl mx-auto">
        {COURSES.map((course) => (
          <GradientCard key={course.id} className="p-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-foreground">{course.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {course.completed} of {course.lessons} lessons completed
                  </p>
                </div>
                <span className="text-sm font-bold text-primary">{course.progress}%</span>
              </div>

              {/* Progress Bar */}
              <div className="h-2 bg-card border border-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
                  style={{ width: `${course.progress}%` }}
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <p className="text-xs text-muted-foreground">
                  Next: <span className="text-foreground font-medium">{course.nextLesson}</span>
                </p>
                <GlowButton size="sm">
                  {course.completed > 0 ? 'Continue' : 'Start'}
                </GlowButton>
              </div>
            </div>
          </GradientCard>
        ))}

        {/* Resources Section */}
        <GradientCard variant="purple" className="p-4 mt-6">
          <h3 className="font-bold text-foreground mb-3">Learning Resources</h3>
          <div className="space-y-2 text-sm">
            <p className="flex items-center gap-2 text-muted-foreground">
              <span>📖</span> Interactive lessons with real-world examples
            </p>
            <p className="flex items-center gap-2 text-muted-foreground">
              <span>🎬</span> Video tutorials and explanations
            </p>
            <p className="flex items-center gap-2 text-muted-foreground">
              <span>⚙️</span> Hands-on coding exercises
            </p>
            <p className="flex items-center gap-2 text-muted-foreground">
              <span>🤔</span> AI chatbot for quick help
            </p>
          </div>
        </GradientCard>
      </div>
    </div>
  );
}
