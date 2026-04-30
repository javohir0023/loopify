'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/language-context';
import { QUIZ_QUESTIONS, QUIZ_CATEGORIES, getQuizzesByCategory } from '@/lib/quiz-questions';
import { GradientCard } from '@/components/loopify/GradientCard';
import { GlowButton } from '@/components/loopify/GlowButton';
import { updateStreakAfterQuiz, getStreakData, type StreakData } from '@/lib/streak-utils';
import { addXP, getXPData, type XPData } from '@/lib/xp-utils';

type QuizState = 'categories' | 'questions' | 'results';

interface QuizSession {
  categoryName: string;
  questions: typeof QUIZ_QUESTIONS;
  currentQuestionIndex: number;
  score: number;
  totalXP: number;
  answers: Record<string, string>;
}

export default function QuizPage() {
  const { language } = useLanguage();
  const [state, setState] = useState<QuizState>('categories');
  const [session, setSession] = useState<QuizSession | null>(null);
  const [streak, setStreak] = useState<StreakData | null>(null);
  const [streakAnimation, setStreakAnimation] = useState(false);
  const [xpData, setXPData] = useState<XPData | null>(null);
  const [xpAnimation, setXPAnimation] = useState(false);

  useEffect(() => {
    setStreak(getStreakData());
    setXPData(getXPData());
  }, []);

  const handleSelectCategory = (category: string) => {
    const questions = getQuizzesByCategory(category);
    setSession({
      categoryName: category,
      questions,
      currentQuestionIndex: 0,
      score: 0,
      totalXP: 0,
      answers: {},
    });
    setState('questions');
  };

  const handleAnswerQuestion = (optionId: string, isCorrect: boolean) => {
    if (!session) return;

    const newSession = { ...session };
    newSession.answers[session.questions[session.currentQuestionIndex].id] = optionId;

    if (isCorrect) {
      newSession.score += 1;
      newSession.totalXP += session.questions[session.currentQuestionIndex].xpReward;
    }

    if (session.currentQuestionIndex < session.questions.length - 1) {
      newSession.currentQuestionIndex += 1;
      setSession(newSession);
    } else {
      setSession(newSession);
      // Streakni update qil va animatsiya boshla
      const newStreak = updateStreakAfterQuiz();
      setStreak(newStreak);
      setStreakAnimation(true);
      
      // XP-ni add qil
      const newXPData = addXP(newSession.totalXP);
      setXPData(newXPData);
      setXPAnimation(true);
      setTimeout(() => setXPAnimation(false), 1000);
      
      setTimeout(() => setStreakAnimation(false), 1000);
      setState('results');
    }
  };

  const handleBackToCategories = () => {
    setState('categories');
    setSession(null);
  };

  // Categories View
  if (state === 'categories') {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="sticky top-0 z-10 bg-gradient-to-b from-background to-background/80 backdrop-blur-sm border-b border-border p-4">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-3">
              <h1 className="text-2xl font-bold gradient-text">
                {language === 'uz' ? 'Quizlar' : 'Quizzes'}
              </h1>
              <div className="flex items-center gap-4">
                {xpData && (
                  <div className={`text-center transition-transform ${xpAnimation ? 'scale-110' : 'scale-100'}`}>
                    <p className="text-xs text-muted-foreground">
                      {language === 'uz' ? 'Umumiy XP' : 'Total XP'}
                    </p>
                    <p className="text-2xl font-bold text-accent">⭐ {xpData.total}</p>
                  </div>
                )}
                {streak && (
                  <div className={`text-center transition-transform ${streakAnimation ? 'scale-110' : 'scale-100'}`}>
                    <p className="text-xs text-muted-foreground">
                      {language === 'uz' ? 'Ketma-ketlik' : 'Streak'}
                    </p>
                    <p className="text-2xl font-bold text-primary">🔥 {streak.current}</p>
                  </div>
                )}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              {language === 'uz' ? 'Bilimingizni sinab ko\'ring va XP oling' : 'Test your knowledge and earn XP'}
            </p>
          </div>
        </div>

        <div className="p-4 max-w-2xl mx-auto space-y-4">
          {QUIZ_CATEGORIES.map((category) => {
            const quizzes = getQuizzesByCategory(category);
            const totalXP = quizzes.reduce((sum, q) => sum + q.xpReward, 0);

            return (
              <GradientCard key={category} variant="purple" className="p-6">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-lg font-bold text-foreground">{category}</h2>
                      <p className="text-xs text-muted-foreground mt-1">
                        {quizzes.length} {language === 'uz' ? 'savol' : 'questions'} • +{totalXP} XP
                      </p>
                    </div>
                  </div>
                  <GlowButton
                    onClick={() => handleSelectCategory(category)}
                    className="w-full"
                  >
                    {language === 'uz' ? 'Quizni boshlash' : 'Start Quiz'}
                  </GlowButton>
                </div>
              </GradientCard>
            );
          })}
        </div>
      </div>
    );
  }

  // Quiz View
  if (state === 'questions' && session) {
    const currentQuestion = session.questions[session.currentQuestionIndex];
    const correctOption = currentQuestion.options.find((opt) => opt.isCorrect);

    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="sticky top-0 z-10 bg-gradient-to-b from-background to-background/80 backdrop-blur-sm border-b border-border p-4">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold gradient-text">{session.categoryName}</h1>
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-muted-foreground">
                {language === 'uz' ? 'Savol' : 'Question'} {session.currentQuestionIndex + 1}/{session.questions.length}
              </p>
              <div className="text-xs font-semibold text-primary">
                {session.score}/{session.currentQuestionIndex}
              </div>
            </div>
            <div className="w-full bg-border rounded-full h-2 mt-2">
              <div
                className="bg-primary h-2 rounded-full transition-all"
                style={{
                  width: `${((session.currentQuestionIndex + 1) / session.questions.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>

        <div className="p-4 max-w-2xl mx-auto space-y-6">
          <GradientCard variant="pink" className="p-6">
            <h2 className="text-lg font-bold text-foreground mb-6">
              {language === 'uz' ? currentQuestion.questionUz : currentQuestion.question}
            </h2>

            <div className="space-y-3">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleAnswerQuestion(option.id, option.isCorrect || false)}
                  className="w-full p-4 text-left rounded-lg border-2 border-border hover:border-primary transition-colors bg-card hover:bg-card/80"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full border-2 border-border flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary opacity-0 group-hover:opacity-100" />
                    </div>
                    <span className="text-foreground">
                      {language === 'uz' ? option.textUz : option.text}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-6 p-4 bg-card/50 rounded-lg border border-border">
              <p className="text-xs text-muted-foreground">
                <span className="font-semibold">💡 {language === 'uz' ? 'İzoh' : 'Tip'}:</span>{' '}
                {language === 'uz' ? currentQuestion.explanationUz : currentQuestion.explanation}
              </p>
            </div>
          </GradientCard>
        </div>
      </div>
    );
  }

  // Results View
  if (state === 'results' && session) {
    const percentage = Math.round((session.score / session.questions.length) * 100);
    const isPerfect = session.score === session.questions.length;

    return (
      <div className="min-h-screen bg-background pb-20 flex flex-col items-center justify-center p-4">
        <div className="max-w-sm w-full">
          <GradientCard variant={isPerfect ? 'blue' : 'pink'} className="p-8 text-center">
            <div className="text-6xl mb-4">{isPerfect ? '🎉' : '🌟'}</div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {language === 'uz' ? 'Tabriklaydi!' : 'Excellent!'}
            </h1>
            <p className="text-muted-foreground mb-6">
              {language === 'uz' ? `${session.categoryName} quizini yakunladingiz` : `You completed ${session.categoryName}`}
            </p>

            <div className="space-y-4 mb-8">
              <div className="bg-card/50 rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">
                  {language === 'uz' ? "To'g'ri Javoblar" : 'Correct Answers'}
                </p>
                <p className="text-3xl font-bold text-primary">
                  {session.score}/{session.questions.length}
                </p>
              </div>

              <div className="bg-card/50 rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">
                  {language === 'uz' ? 'Foiz' : 'Percentage'}
                </p>
                <p className="text-3xl font-bold text-primary">{percentage}%</p>
              </div>

              <div className="bg-card/50 rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">
                  {language === 'uz' ? 'Olingan XP' : 'Earned XP'}
                </p>
                <p className="text-3xl font-bold text-primary">+{session.totalXP}</p>
              </div>

              {xpData && (
                <div className={`bg-accent/20 border-2 border-accent rounded-lg p-4 transition-all transform ${xpAnimation ? 'scale-105 shadow-lg shadow-accent/50' : 'scale-100'}`}>
                  <p className="text-sm text-muted-foreground mb-1">
                    {language === 'uz' ? 'Umumiy XP' : 'Total XP'}
                  </p>
                  <p className="text-3xl font-bold text-accent">⭐ {xpData.total}</p>
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">
                        {language === 'uz' ? `Daraja ${xpData.level}` : `Level ${xpData.level}`}
                      </span>
                      <span className="text-xs text-muted-foreground">{xpData.progress}%</span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2">
                      <div
                        className="bg-accent h-2 rounded-full transition-all"
                        style={{ width: `${xpData.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {streak && (
                <div className={`bg-primary/20 border-2 border-primary rounded-lg p-4 transition-all transform ${streakAnimation ? 'scale-105 shadow-lg shadow-primary/50' : 'scale-100'}`}>
                  <p className="text-sm text-muted-foreground mb-1">
                    {language === 'uz' ? 'Hozirgi Ketma-ketlik' : 'Current Streak'}
                  </p>
                  <p className="text-3xl font-bold text-primary">🔥 {streak.current}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {language === 'uz' ? `Eng uzun ketma-ketlik: ${streak.longest}` : `Longest streak: ${streak.longest}`}
                  </p>
                </div>
              )}
            </div>

            <GlowButton onClick={handleBackToCategories} className="w-full">
              {language === 'uz' ? 'Quizlarga qaytish' : 'Back to Quizzes'}
            </GlowButton>
          </GradientCard>
        </div>
      </div>
    );
  }

  return null;
}
