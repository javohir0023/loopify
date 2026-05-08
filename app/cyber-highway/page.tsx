'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';
import { QUIZ_QUESTIONS } from '@/lib/quiz-questions';

type GameState = 'menu' | 'difficulty' | 'playing' | 'question' | 'correct' | 'wrong' | 'boss' | 'victory' | 'gameover';
type Difficulty = 'easy' | 'medium' | 'hardcore';

const CYBER_QUESTIONS = QUIZ_QUESTIONS.filter(q => q.category === 'Kiber Xavfsizlik');
const ALL_QUESTIONS = QUIZ_QUESTIONS;

export default function CyberHighwayPage() {
  const { language } = useLanguage();
  const [gameState, setGameState] = useState<GameState>('menu');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [lives, setLives] = useState(3);
  const [xp, setXp] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<typeof QUIZ_QUESTIONS>([]);
  const [currentQuestion, setCurrentQuestion] = useState<typeof QUIZ_QUESTIONS[0] | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [nitroActive, setNitroActive] = useState(false);
  const [screenShake, setScreenShake] = useState(false);
  const [roadPosition, setRoadPosition] = useState(0);
  const [carLane, setCarLane] = useState(1);

  const totalQuestions = difficulty === 'easy' ? 8 : difficulty === 'medium' ? 10 : 12;
  const bossStage = questionIndex >= totalQuestions - 2;

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const startGame = useCallback((diff: Difficulty) => {
    setDifficulty(diff);
    setLives(3);
    setXp(0);
    setCombo(0);
    setMaxCombo(0);
    setQuestionIndex(0);
    setCorrectAnswers(0);
    setNitroActive(false);

    const cyberQs = shuffleArray(CYBER_QUESTIONS);
    const otherQs = shuffleArray(ALL_QUESTIONS.filter(q => q.category !== 'Kiber Xavfsizlik'));
    const gameQuestions = [...cyberQs, ...otherQs].slice(0, totalQuestions);
    setQuestions(shuffleArray(gameQuestions));
    
    setGameState('playing');
    setTimeout(() => {
      setGameState('question');
      setCurrentQuestion(gameQuestions[0]);
    }, 2000);
  }, [totalQuestions]);

  const handleAnswer = (answerId: string) => {
    if (selectedAnswer) return;
    setSelectedAnswer(answerId);

    const isCorrect = currentQuestion?.options.find(o => o.id === answerId)?.isCorrect;

    if (isCorrect) {
      const baseXp = 10;
      const comboBonus = Math.floor(combo * 2);
      const earnedXp = baseXp + comboBonus;
      
      setXp(prev => prev + earnedXp);
      setCombo(prev => prev + 1);
      setMaxCombo(prev => Math.max(prev, combo + 1));
      setCorrectAnswers(prev => prev + 1);
      
      if (combo + 1 >= 5 && !nitroActive) {
        setNitroActive(true);
        setTimeout(() => setNitroActive(false), 3000);
      }

      setCarLane(currentQuestion?.options.findIndex(o => o.isCorrect) || 1);
      setGameState('correct');
    } else {
      setScreenShake(true);
      setTimeout(() => setScreenShake(false), 500);
      setCombo(0);
      setLives(prev => prev - 1);
      setGameState('wrong');
    }
  };

  useEffect(() => {
    if (gameState === 'correct' || gameState === 'wrong') {
      const timer = setTimeout(() => {
        if (lives <= 0) {
          setGameState('gameover');
          return;
        }

        const nextIndex = questionIndex + 1;
        if (nextIndex >= questions.length) {
          setXp(prev => prev + 50);
          setGameState('victory');
          return;
        }

        setQuestionIndex(nextIndex);
        setCurrentQuestion(questions[nextIndex]);
        setSelectedAnswer(null);
        setGameState(nextIndex >= totalQuestions - 2 ? 'boss' : 'question');
        
        if (nextIndex >= totalQuestions - 2) {
          setTimeout(() => setGameState('question'), 1500);
        }
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [gameState, lives, questionIndex, questions, totalQuestions]);

  useEffect(() => {
    if (gameState === 'playing' || gameState === 'question') {
      const interval = setInterval(() => {
        setRoadPosition(prev => (prev + 1) % 100);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [gameState]);

  const renderHearts = () => (
    <div className="flex gap-1">
      {[...Array(3)].map((_, i) => (
        <motion.span
          key={i}
          animate={i < lives ? { scale: [1, 1.2, 1] } : { opacity: 0.3 }}
          transition={{ duration: 0.5, repeat: i < lives ? Infinity : 0, repeatDelay: 1 }}
          className={`text-2xl ${i < lives ? 'text-red-500' : 'text-gray-600'}`}
        >
          {i < lives ? '❤️' : '🖤'}
        </motion.span>
      ))}
    </div>
  );

  const renderRoad = () => (
    <div className="absolute inset-0 overflow-hidden">
      {/* Cyber city background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0015] via-[#1a0030] to-[#0d001a]" />
      
      {/* Stars */}
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 40}%`,
            opacity: Math.random() * 0.8,
          }}
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 2 + Math.random() * 2, repeat: Infinity }}
        />
      ))}

      {/* City silhouette */}
      <div className="absolute bottom-40 left-0 right-0 h-32">
        <svg viewBox="0 0 400 100" className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="cityGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1a0030" />
              <stop offset="100%" stopColor="#0d001a" />
            </linearGradient>
          </defs>
          <path
            d="M0,100 L0,60 L20,60 L20,40 L40,40 L40,50 L60,50 L60,30 L80,30 L80,45 L100,45 L100,20 L120,20 L120,55 L140,55 L140,35 L160,35 L160,50 L180,50 L180,25 L200,25 L200,40 L220,40 L220,15 L240,15 L240,50 L260,50 L260,30 L280,30 L280,55 L300,55 L300,40 L320,40 L320,60 L340,60 L340,45 L360,45 L360,65 L380,65 L380,50 L400,50 L400,100 Z"
            fill="url(#cityGrad)"
          />
          {/* Building windows */}
          {[...Array(20)].map((_, i) => (
            <motion.rect
              key={i}
              x={20 + i * 18}
              y={30 + Math.random() * 40}
              width="3"
              height="4"
              fill="#00ffff"
              opacity={0.6}
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 1 + Math.random(), repeat: Infinity }}
            />
          ))}
        </svg>
      </div>

      {/* Road */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-48 perspective-[500px]">
        <div 
          className="relative w-full h-full"
          style={{ transform: 'rotateX(60deg)', transformOrigin: 'bottom center' }}
        >
          {/* Road surface */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] to-[#0f0f1a] border-l-4 border-r-4 border-cyan-500/50">
            {/* Lane dividers */}
            <div className="absolute left-1/3 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-50" />
            <div className="absolute left-2/3 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-50" />
            
            {/* Moving road lines */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute left-1/2 -translate-x-1/2 w-4 h-8 bg-cyan-400"
                style={{
                  top: `${((roadPosition + i * 12.5) % 100)}%`,
                  opacity: 0.8 - (((roadPosition + i * 12.5) % 100) / 100) * 0.6,
                }}
              />
            ))}
          </div>

          {/* Neon edge glow */}
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-r from-purple-500 to-transparent blur-sm" />
          <div className="absolute right-0 top-0 bottom-0 w-2 bg-gradient-to-l from-pink-500 to-transparent blur-sm" />
        </div>
      </div>

      {/* Player car */}
      <motion.div
        className="absolute bottom-16 left-1/2 -translate-x-1/2"
        animate={{
          x: carLane === 0 ? -60 : carLane === 2 ? 60 : 0,
          y: nitroActive ? [0, -5, 0] : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative">
          {/* Car body */}
          <div className="w-16 h-24 relative">
            <svg viewBox="0 0 60 90" className="w-full h-full">
              <defs>
                <linearGradient id="carGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#00ffff" />
                  <stop offset="50%" stopColor="#0066ff" />
                  <stop offset="100%" stopColor="#9900ff" />
                </linearGradient>
                <filter id="neonGlow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              {/* Car shape */}
              <path
                d="M10,85 L10,50 Q10,40 20,35 L20,25 Q20,15 30,10 Q40,15 40,25 L40,35 Q50,40 50,50 L50,85 Q50,90 45,90 L15,90 Q10,90 10,85"
                fill="url(#carGrad)"
                filter="url(#neonGlow)"
              />
              {/* Windshield */}
              <path
                d="M20,35 L20,25 Q20,18 30,15 Q40,18 40,25 L40,35 Z"
                fill="#00ffff"
                opacity="0.5"
              />
              {/* Headlights */}
              <motion.ellipse
                cx="20"
                cy="20"
                rx="4"
                ry="3"
                fill="#00ffff"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
              <motion.ellipse
                cx="40"
                cy="20"
                rx="4"
                ry="3"
                fill="#00ffff"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            </svg>
          </div>

          {/* Nitro effect */}
          {nitroActive && (
            <motion.div
              className="absolute -bottom-4 left-1/2 -translate-x-1/2"
              animate={{ scaleY: [1, 1.5, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 0.2, repeat: Infinity }}
            >
              <div className="w-8 h-12 bg-gradient-to-t from-orange-500 via-yellow-400 to-transparent blur-sm rounded-full" />
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className={`min-h-screen bg-[#0a0015] text-white overflow-hidden relative ${screenShake ? 'animate-shake' : ''}`}>
      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>

      {/* Menu Screen */}
      <AnimatePresence mode="wait">
        {gameState === 'menu' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-gradient-to-b from-[#0a0015] via-[#1a0030] to-[#0d001a]"
          >
            {/* Animated background grid */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f10_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f10_1px,transparent_1px)] bg-[size:50px_50px]" />
            </div>

            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center z-10"
            >
              <h1 className="text-5xl font-black mb-2 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                CYBER
              </h1>
              <h1 className="text-6xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                HIGHWAY
              </h1>
              <p className="text-cyan-400/70 mt-4 text-sm">
                {language === 'uz' ? 'Kiber xavfsizlik o\'yini' : 'Cybersecurity Racing Game'}
              </p>
            </motion.div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
              className="mt-12"
            >
              <button
                onClick={() => setGameState('difficulty')}
                className="px-12 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl font-bold text-xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all hover:scale-105 active:scale-95"
              >
                {language === 'uz' ? 'BOSHLASH' : 'START RACE'}
              </button>
            </motion.div>

            <Link href="/gamification" className="mt-8 text-cyan-400/60 hover:text-cyan-400 transition-colors">
              {language === 'uz' ? '← Orqaga' : '← Back'}
            </Link>
          </motion.div>
        )}

        {/* Difficulty Selection */}
        {gameState === 'difficulty' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-gradient-to-b from-[#0a0015] via-[#1a0030] to-[#0d001a] p-6"
          >
            <h2 className="text-3xl font-bold mb-8 text-cyan-400">
              {language === 'uz' ? 'Qiyinlik darajasi' : 'Select Difficulty'}
            </h2>

            <div className="space-y-4 w-full max-w-xs">
              {[
                { id: 'easy' as Difficulty, label: language === 'uz' ? 'OSON' : 'EASY', color: 'from-green-500 to-emerald-600', desc: '8 savol' },
                { id: 'medium' as Difficulty, label: language === 'uz' ? 'O\'RTA' : 'MEDIUM', color: 'from-yellow-500 to-orange-600', desc: '10 savol' },
                { id: 'hardcore' as Difficulty, label: language === 'uz' ? 'QIYIN' : 'HARDCORE', color: 'from-red-500 to-pink-600', desc: '12 savol' },
              ].map((d, i) => (
                <motion.button
                  key={d.id}
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => startGame(d.id)}
                  className={`w-full py-4 bg-gradient-to-r ${d.color} rounded-xl font-bold text-lg shadow-lg hover:scale-105 active:scale-95 transition-all`}
                >
                  {d.label}
                  <span className="block text-xs opacity-70">{d.desc}</span>
                </motion.button>
              ))}
            </div>

            <button
              onClick={() => setGameState('menu')}
              className="mt-8 text-cyan-400/60 hover:text-cyan-400 transition-colors"
            >
              {language === 'uz' ? '← Orqaga' : '← Back'}
            </button>
          </motion.div>
        )}

        {/* Game Playing State */}
        {(gameState === 'playing' || gameState === 'question' || gameState === 'correct' || gameState === 'wrong' || gameState === 'boss') && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0"
          >
            {renderRoad()}

            {/* HUD */}
            <div className="absolute top-0 left-0 right-0 p-4 z-20">
              <div className="flex items-center justify-between">
                {renderHearts()}
                
                <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-cyan-400 font-bold">{xp} XP</span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-2">
                <div className="text-sm text-purple-400">
                  {language === 'uz' ? 'Savol' : 'Q'}: {questionIndex + 1}/{questions.length}
                </div>
                
                {combo > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="bg-gradient-to-r from-orange-500 to-pink-500 px-3 py-1 rounded-full text-sm font-bold"
                  >
                    {combo}x COMBO
                  </motion.div>
                )}

                {nitroActive && (
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.3, repeat: Infinity }}
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 px-3 py-1 rounded-full text-sm font-bold"
                  >
                    NITRO!
                  </motion.div>
                )}
              </div>
            </div>

            {/* Boss Warning */}
            {gameState === 'boss' && (
              <motion.div
                initial={{ opacity: 0, scale: 2 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center z-30 bg-black/60"
              >
                <div className="text-center">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 0.5, repeat: 3 }}
                    className="text-6xl mb-4"
                  >
                    👾
                  </motion.div>
                  <h2 className="text-3xl font-black text-red-500">
                    {language === 'uz' ? 'BOSS BOSQICHI!' : 'BOSS STAGE!'}
                  </h2>
                  <p className="text-red-400/70 mt-2">
                    {language === 'uz' ? 'Hacker hujumi!' : 'Hacker Attack!'}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Question Card */}
            {gameState === 'question' && currentQuestion && (
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="absolute bottom-0 left-0 right-0 p-4 z-20"
              >
                <div className="bg-black/80 backdrop-blur-md rounded-2xl p-4 border border-cyan-500/30">
                  <h3 className="text-lg font-bold text-center mb-4 text-cyan-400">
                    {language === 'uz' ? currentQuestion.questionUz : currentQuestion.question}
                  </h3>

                  <div className="grid grid-cols-3 gap-2">
                    {currentQuestion.options.slice(0, 3).map((option, i) => (
                      <motion.button
                        key={option.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAnswer(option.id)}
                        className={`p-3 rounded-xl text-sm font-medium transition-all ${
                          i === 0 
                            ? 'bg-gradient-to-b from-purple-600 to-purple-800 hover:from-purple-500' 
                            : i === 1 
                            ? 'bg-gradient-to-b from-cyan-600 to-cyan-800 hover:from-cyan-500' 
                            : 'bg-gradient-to-b from-pink-600 to-pink-800 hover:from-pink-500'
                        }`}
                      >
                        {language === 'uz' ? option.textUz : option.text}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Correct Answer Feedback */}
            {gameState === 'correct' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
              >
                <div className="text-center">
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 0.3 }}
                    className="text-6xl text-green-400 font-black drop-shadow-[0_0_20px_rgba(74,222,128,0.8)]"
                  >
                    SYSTEM SECURED
                  </motion.div>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-2xl text-cyan-400 mt-2"
                  >
                    +{10 + Math.floor((combo - 1) * 2)} XP
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Wrong Answer Feedback */}
            {gameState === 'wrong' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none bg-red-900/30"
              >
                <div className="text-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 0.3 }}
                    className="text-5xl text-red-500 font-black drop-shadow-[0_0_20px_rgba(239,68,68,0.8)]"
                  >
                    DATA BREACH!
                  </motion.div>
                  <p className="text-red-400 mt-2">-1 ❤️</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Victory Screen */}
        {gameState === 'victory' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-gradient-to-b from-[#0a0015] via-[#1a0030] to-[#0d001a] p-6"
          >
            {/* Confetti */}
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: -20, x: Math.random() * 400 - 200, opacity: 1 }}
                animate={{ y: 800, rotate: 360 * (Math.random() > 0.5 ? 1 : -1) }}
                transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() }}
                className="absolute top-0 w-3 h-3 rounded-full"
                style={{ backgroundColor: ['#00ffff', '#ff00ff', '#ffff00', '#00ff00'][Math.floor(Math.random() * 4)] }}
              />
            ))}

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.5 }}
              className="text-8xl mb-4"
            >
              🏆
            </motion.div>

            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-black text-center bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-6"
            >
              {language === 'uz' ? 'MISSIYA TUGADI!' : 'MISSION COMPLETE!'}
            </motion.h1>

            <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 w-full max-w-xs space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">{language === 'uz' ? 'Yig\'ilgan XP' : 'XP Earned'}</span>
                <span className="text-2xl font-bold text-cyan-400">{xp}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">{language === 'uz' ? 'To\'g\'ri javoblar' : 'Correct'}</span>
                <span className="text-xl font-bold text-green-400">{correctAnswers}/{questions.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">{language === 'uz' ? 'Max Combo' : 'Max Combo'}</span>
                <span className="text-xl font-bold text-orange-400">{maxCombo}x</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">{language === 'uz' ? 'Aniqlik' : 'Accuracy'}</span>
                <span className="text-xl font-bold text-purple-400">
                  {Math.round((correctAnswers / questions.length) * 100)}%
                </span>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => startGame(difficulty)}
                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl font-bold hover:scale-105 transition-all"
              >
                {language === 'uz' ? 'Qayta o\'ynash' : 'Play Again'}
              </button>
              <Link
                href="/gamification"
                className="px-8 py-3 bg-white/10 rounded-xl font-bold hover:bg-white/20 transition-all"
              >
                {language === 'uz' ? 'Chiqish' : 'Exit'}
              </Link>
            </div>
          </motion.div>
        )}

        {/* Game Over Screen */}
        {gameState === 'gameover' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-gradient-to-b from-[#150005] via-[#1a0010] to-[#0d0005] p-6"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-8xl mb-4"
            >
              💀
            </motion.div>

            <h1 className="text-4xl font-black text-red-500 mb-2">
              GAME OVER
            </h1>
            <p className="text-red-400/70 text-center mb-6">
              {language === 'uz' 
                ? 'Hacker g\'alaba qildi! Qayta urinib ko\'ring.' 
                : 'The hacker won! Try again.'}
            </p>

            <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 w-full max-w-xs space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">{language === 'uz' ? 'Yig\'ilgan XP' : 'XP Earned'}</span>
                <span className="text-xl font-bold text-cyan-400">{xp}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">{language === 'uz' ? 'To\'g\'ri javoblar' : 'Correct'}</span>
                <span className="text-xl font-bold text-green-400">{correctAnswers}</span>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => startGame(difficulty)}
                className="px-8 py-3 bg-gradient-to-r from-red-500 to-orange-600 rounded-xl font-bold hover:scale-105 transition-all"
              >
                {language === 'uz' ? 'Qayta urinish' : 'Try Again'}
              </button>
              <Link
                href="/gamification"
                className="px-8 py-3 bg-white/10 rounded-xl font-bold hover:bg-white/20 transition-all"
              >
                {language === 'uz' ? 'Chiqish' : 'Exit'}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
