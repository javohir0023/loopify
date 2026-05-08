'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/language-context';
import { GradientCard } from '@/components/loopify/GradientCard';
import { GlowButton } from '@/components/loopify/GlowButton';
import { QUIZ_QUESTIONS } from '@/lib/quiz-questions';

type GameState = 'menu' | 'playing' | 'won' | 'lost';

interface GameQuestion {
  question: string;
  questionUz: string;
  options: { id: string; text: string; textUz: string; isCorrect?: boolean }[];
}

export default function RoadGamePage() {
  const { language } = useLanguage();
  const router = useRouter();
  
  const [gameState, setGameState] = useState<GameState>('menu');
  const [lives, setLives] = useState(3);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [carPosition, setCarPosition] = useState(1); // 0 = left, 1 = middle, 2 = right
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameQuestions, setGameQuestions] = useState<GameQuestion[]>([]);

  // Shuffle and select 10 random questions
  const initializeGame = useCallback(() => {
    const shuffled = [...QUIZ_QUESTIONS]
      .sort(() => Math.random() - 0.5)
      .slice(0, 10)
      .map(q => ({
        question: q.question,
        questionUz: q.questionUz,
        options: q.options.slice(0, 3), // Only take first 3 options for the game
      }));
    setGameQuestions(shuffled);
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const startGame = () => {
    setGameState('playing');
    setLives(3);
    setCurrentQuestionIndex(0);
    setScore(0);
    setCarPosition(1);
    setSelectedAnswer(null);
    setShowResult(false);
    initializeGame();
  };

  const handleAnswer = (optionIndex: number) => {
    if (isAnimating || showResult) return;
    
    setIsAnimating(true);
    setCarPosition(optionIndex);
    setSelectedAnswer(gameQuestions[currentQuestionIndex].options[optionIndex].id);
    
    setTimeout(() => {
      const isCorrect = gameQuestions[currentQuestionIndex].options[optionIndex].isCorrect;
      setShowResult(true);
      
      if (isCorrect) {
        setScore(prev => prev + 10);
      } else {
        setLives(prev => prev - 1);
      }
      
      setTimeout(() => {
        if (!isCorrect && lives <= 1) {
          setGameState('lost');
        } else if (currentQuestionIndex >= gameQuestions.length - 1) {
          setGameState('won');
        } else {
          setCurrentQuestionIndex(prev => prev + 1);
          setCarPosition(1);
          setSelectedAnswer(null);
          setShowResult(false);
        }
        setIsAnimating(false);
      }, 1500);
    }, 500);
  };

  const currentQuestion = gameQuestions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-b from-background to-background/80 backdrop-blur-sm border-b border-border p-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => router.push('/gamification')}
            className="text-muted-foreground hover:text-foreground"
          >
            ← {language === 'uz' ? 'Orqaga' : 'Back'}
          </button>
          <h1 className="text-xl font-bold gradient-text">
            {language === 'uz' ? 'Yol Oyini' : 'Road Game'}
          </h1>
          <div className="w-16"></div>
        </div>
      </div>

      <div className="p-4 max-w-lg mx-auto">
        {/* Menu State */}
        {gameState === 'menu' && (
          <div className="space-y-6 text-center pt-10">
            <div className="text-6xl mb-4">🚗</div>
            <h2 className="text-2xl font-bold text-foreground">
              {language === 'uz' ? 'Yol Oyini' : 'Road Game'}
            </h2>
            <p className="text-muted-foreground">
              {language === 'uz' 
                ? 'Savolga to\'g\'ri javob berib, yo\'ldan chiqmang! 3 ta joningiz bor. Oxirigacha yetib boring va +50 XP oling!'
                : 'Answer correctly to stay on the road! You have 3 lives. Reach the end and earn +50 XP!'}
            </p>
            
            <GradientCard className="p-4 text-left">
              <h3 className="font-semibold mb-2">{language === 'uz' ? 'Qoidalar:' : 'Rules:'}</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• {language === 'uz' ? '3 ta variant - 3 ta yo\'l' : '3 options - 3 roads'}</li>
                <li>• {language === 'uz' ? 'To\'g\'ri javob = davom etasiz' : 'Correct answer = continue'}</li>
                <li>• {language === 'uz' ? 'Xato javob = 1 jon ketadi' : 'Wrong answer = lose 1 life'}</li>
                <li>• {language === 'uz' ? '10 ta savol - +50 XP mukofot' : '10 questions - +50 XP reward'}</li>
              </ul>
            </GradientCard>
            
            <GlowButton onClick={startGame} className="w-full">
              {language === 'uz' ? 'Boshlash' : 'Start Game'}
            </GlowButton>
          </div>
        )}

        {/* Playing State */}
        {gameState === 'playing' && currentQuestion && (
          <div className="space-y-4">
            {/* Stats */}
            <div className="flex justify-between items-center">
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <span key={i} className={`text-2xl ${i < lives ? '' : 'opacity-30'}`}>
                    ❤️
                  </span>
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                {currentQuestionIndex + 1}/10
              </div>
              <div className="text-primary font-bold">
                {score} XP
              </div>
            </div>

            {/* Question */}
            <GradientCard className="p-4">
              <p className="text-foreground font-medium text-center">
                {language === 'uz' ? currentQuestion.questionUz : currentQuestion.question}
              </p>
            </GradientCard>

            {/* Road Animation */}
            <div className="relative h-48 bg-gradient-to-b from-slate-700 to-slate-800 rounded-lg overflow-hidden">
              {/* Road lines */}
              <div className="absolute inset-0 flex justify-around">
                <div className="w-1 bg-yellow-500/50 h-full animate-pulse"></div>
                <div className="w-1 bg-yellow-500/50 h-full animate-pulse"></div>
              </div>
              
              {/* Lanes */}
              <div className="absolute bottom-0 left-0 right-0 flex">
                {currentQuestion.options.map((_, index) => {
                  const isCorrect = currentQuestion.options[index].isCorrect;
                  const isSelected = carPosition === index && showResult;
                  
                  return (
                    <div 
                      key={index}
                      className={`flex-1 h-48 border-x border-white/20 transition-all duration-300 ${
                        isSelected 
                          ? isCorrect 
                            ? 'bg-green-500/30' 
                            : 'bg-red-500/30'
                          : ''
                      }`}
                    >
                      {showResult && !isCorrect && carPosition === index && (
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 text-4xl animate-bounce">
                          💥
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              
              {/* Car */}
              <div 
                className="absolute bottom-4 transition-all duration-500 ease-out"
                style={{ 
                  left: `${(carPosition * 33.33) + 16.66}%`,
                  transform: 'translateX(-50%)'
                }}
              >
                <div className={`text-4xl ${isAnimating ? 'animate-bounce' : ''}`}>
                  🚗
                </div>
              </div>
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-3 gap-2">
              {currentQuestion.options.map((option, index) => {
                const isCorrect = option.isCorrect;
                const isSelected = selectedAnswer === option.id;
                
                return (
                  <button
                    key={option.id}
                    onClick={() => handleAnswer(index)}
                    disabled={isAnimating || showResult}
                    className={`p-3 rounded-lg border-2 transition-all text-sm font-medium ${
                      showResult
                        ? isCorrect
                          ? 'border-green-500 bg-green-500/20 text-green-400'
                          : isSelected
                            ? 'border-red-500 bg-red-500/20 text-red-400'
                            : 'border-border bg-card text-muted-foreground'
                        : 'border-border bg-card text-foreground hover:border-primary hover:bg-primary/10'
                    } ${isAnimating ? 'cursor-not-allowed' : ''}`}
                  >
                    {language === 'uz' ? option.textUz : option.text}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Won State */}
        {gameState === 'won' && (
          <div className="space-y-6 text-center pt-10">
            <div className="text-6xl mb-4">🏆</div>
            <h2 className="text-2xl font-bold text-green-400">
              {language === 'uz' ? 'Tabriklaymiz!' : 'Congratulations!'}
            </h2>
            <p className="text-muted-foreground">
              {language === 'uz' 
                ? 'Siz muvaffaqiyatli tugatdingiz!'
                : 'You completed the game successfully!'}
            </p>
            
            <GradientCard variant="blue" className="p-6">
              <div className="text-4xl font-bold text-primary mb-2">+50 XP</div>
              <p className="text-sm text-muted-foreground">
                {language === 'uz' ? 'Qo\'shimcha ball' : 'Bonus points'}
              </p>
              <div className="mt-4 flex justify-center gap-1">
                {[...Array(lives)].map((_, i) => (
                  <span key={i} className="text-2xl">❤️</span>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {language === 'uz' ? `${lives} jon qoldi` : `${lives} lives remaining`}
              </p>
            </GradientCard>
            
            <div className="flex gap-3">
              <GlowButton onClick={startGame} className="flex-1">
                {language === 'uz' ? 'Qayta o\'ynash' : 'Play Again'}
              </GlowButton>
              <button 
                onClick={() => router.push('/gamification')}
                className="flex-1 px-4 py-2 rounded-lg border border-border text-foreground hover:bg-card"
              >
                {language === 'uz' ? 'Orqaga' : 'Back'}
              </button>
            </div>
          </div>
        )}

        {/* Lost State */}
        {gameState === 'lost' && (
          <div className="space-y-6 text-center pt-10">
            <div className="text-6xl mb-4">💔</div>
            <h2 className="text-2xl font-bold text-red-400">
              {language === 'uz' ? 'O\'yin tugadi!' : 'Game Over!'}
            </h2>
            <p className="text-muted-foreground">
              {language === 'uz' 
                ? 'Barcha jonlaringiz tugadi. Qayta urinib ko\'ring!'
                : 'You ran out of lives. Try again!'}
            </p>
            
            <GradientCard variant="pink" className="p-6">
              <div className="text-2xl font-bold text-foreground mb-2">
                {score} XP {language === 'uz' ? 'to\'plandi' : 'earned'}
              </div>
              <p className="text-sm text-muted-foreground">
                {currentQuestionIndex}/{10} {language === 'uz' ? 'savol' : 'questions'}
              </p>
            </GradientCard>
            
            <div className="flex gap-3">
              <GlowButton onClick={startGame} className="flex-1">
                {language === 'uz' ? 'Qayta o\'ynash' : 'Try Again'}
              </GlowButton>
              <button 
                onClick={() => router.push('/gamification')}
                className="flex-1 px-4 py-2 rounded-lg border border-border text-foreground hover:bg-card"
              >
                {language === 'uz' ? 'Orqaga' : 'Back'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
