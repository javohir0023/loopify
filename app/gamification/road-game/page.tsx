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
  const [showResult, setShowResult] = useState(false);
  const [gameQuestions, setGameQuestions] = useState<GameQuestion[]>([]);
  const [roadOffset, setRoadOffset] = useState(0);

  // Shuffle and select 10 random questions
  const initializeGame = useCallback(() => {
    const shuffled = [...QUIZ_QUESTIONS]
      .sort(() => Math.random() - 0.5)
      .slice(0, 10)
      .map(q => ({
        question: q.question,
        questionUz: q.questionUz,
        options: q.options.slice(0, 3),
      }));
    setGameQuestions(shuffled);
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  // Road animation
  useEffect(() => {
    if (gameState === 'playing' && !showResult) {
      const interval = setInterval(() => {
        setRoadOffset(prev => (prev + 2) % 40);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [gameState, showResult]);

  const startGame = () => {
    setGameState('playing');
    setLives(3);
    setCurrentQuestionIndex(0);
    setScore(0);
    setCarPosition(1);
    setShowResult(false);
    initializeGame();
  };

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'playing' || isAnimating || showResult) return;
      
      if (e.key === 'ArrowLeft' || e.key === 'a') {
        selectLane(0);
      } else if (e.key === 'ArrowUp' || e.key === 'w') {
        selectLane(1);
      } else if (e.key === 'ArrowRight' || e.key === 'd') {
        selectLane(2);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, isAnimating, showResult, gameQuestions, currentQuestionIndex, lives]);

  const selectLane = (laneIndex: number) => {
    if (isAnimating || showResult) return;
    
    setIsAnimating(true);
    setCarPosition(laneIndex);
    
    setTimeout(() => {
      const isCorrect = gameQuestions[currentQuestionIndex].options[laneIndex]?.isCorrect;
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
                ? 'Mashinani to\'g\'ri yo\'lga buring! 3 ta joningiz bor.'
                : 'Steer the car to the correct lane! You have 3 lives.'}
            </p>
            
            <GradientCard className="p-4 text-left">
              <h3 className="font-semibold mb-2">{language === 'uz' ? 'Qoidalar:' : 'Rules:'}</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• {language === 'uz' ? 'Chap yo\'l = chap variant' : 'Left lane = left option'}</li>
                <li>• {language === 'uz' ? 'O\'rta yo\'l = o\'rta variant' : 'Middle lane = middle option'}</li>
                <li>• {language === 'uz' ? 'O\'ng yo\'l = o\'ng variant' : 'Right lane = right option'}</li>
                <li>• {language === 'uz' ? 'Klaviatura: A/←, W/↑, D/→' : 'Keyboard: A/←, W/↑, D/→'}</li>
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

            {/* Road with Options */}
            <div className="relative h-72 bg-gradient-to-b from-slate-600 to-slate-800 rounded-lg overflow-hidden">
              {/* Moving road lines */}
              <div className="absolute inset-0">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute left-1/2 -translate-x-1/2 w-3 h-10 bg-yellow-400/70"
                    style={{
                      top: `${((roadOffset + i * 40) % 320) - 40}px`,
                    }}
                  />
                ))}
              </div>
              
              {/* Lane dividers */}
              <div className="absolute top-0 bottom-0 left-[33%] w-1 border-l-4 border-dashed border-white/30" />
              <div className="absolute top-0 bottom-0 left-[66%] w-1 border-l-4 border-dashed border-white/30" />
              
              {/* Options on road (in front of car) */}
              <div className="absolute top-8 left-0 right-0 flex">
                {currentQuestion.options.map((option, index) => {
                  const isCorrect = option.isCorrect;
                  const isSelected = carPosition === index && showResult;
                  
                  return (
                    <button
                      key={option.id}
                      onClick={() => selectLane(index)}
                      disabled={isAnimating || showResult}
                      className={`flex-1 mx-1 py-3 px-2 rounded-lg text-xs font-bold transition-all ${
                        showResult
                          ? isCorrect
                            ? 'bg-green-500 text-white shadow-lg shadow-green-500/50'
                            : isSelected
                              ? 'bg-red-500 text-white shadow-lg shadow-red-500/50 animate-pulse'
                              : 'bg-slate-700/80 text-slate-300'
                          : 'bg-slate-900/90 text-white hover:bg-slate-800 border-2 border-cyan-500/50 hover:border-cyan-400'
                      }`}
                    >
                      <div className="truncate">
                        {language === 'uz' ? option.textUz : option.text}
                      </div>
                    </button>
                  );
                })}
              </div>
              
              {/* Lane highlight on selection */}
              <div className="absolute top-0 bottom-0 left-0 right-0 flex pointer-events-none">
                {[0, 1, 2].map((lane) => (
                  <div 
                    key={lane}
                    className={`flex-1 transition-all duration-300 ${
                      showResult && carPosition === lane
                        ? currentQuestion.options[lane]?.isCorrect
                          ? 'bg-green-500/20'
                          : 'bg-red-500/30'
                        : ''
                    }`}
                  />
                ))}
              </div>
              
              {/* Crash effect */}
              {showResult && !currentQuestion.options[carPosition]?.isCorrect && (
                <div 
                  className="absolute text-5xl animate-bounce"
                  style={{ 
                    left: `${(carPosition * 33.33) + 16.66}%`,
                    transform: 'translateX(-50%)',
                    top: '40%'
                  }}
                >
                  💥
                </div>
              )}
              
              {/* Car */}
              <div 
                className="absolute bottom-8 transition-all duration-300 ease-out"
                style={{ 
                  left: `${(carPosition * 33.33) + 16.66}%`,
                  transform: 'translateX(-50%)'
                }}
              >
                <div className={`text-5xl ${isAnimating ? 'animate-bounce' : ''}`}>
                  🚗
                </div>
              </div>

              {/* Control hints */}
              <div className="absolute bottom-2 left-0 right-0 flex justify-around text-xs text-white/50">
                <span>← A</span>
                <span>↑ W</span>
                <span>→ D</span>
              </div>
            </div>

            {/* Mobile lane buttons */}
            <div className="grid grid-cols-3 gap-2">
              {['← Chap', '↑ O\'rta', '→ O\'ng'].map((label, index) => (
                <button
                  key={index}
                  onClick={() => selectLane(index)}
                  disabled={isAnimating || showResult}
                  className={`py-3 rounded-lg font-bold transition-all ${
                    isAnimating || showResult
                      ? 'bg-muted text-muted-foreground'
                      : 'bg-primary/20 text-primary hover:bg-primary/30 active:scale-95'
                  }`}
                >
                  {language === 'uz' 
                    ? label 
                    : ['← Left', '↑ Middle', '→ Right'][index]}
                </button>
              ))}
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
