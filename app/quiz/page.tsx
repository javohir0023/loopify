'use client';

import { useState } from 'react';
import Link from 'next/link';
import { QuizCard, QuizQuestion } from '@/components/loopify/QuizCard';
import { QuizTimer } from '@/components/loopify/QuizTimer';
import { QuizResults } from '@/components/loopify/QuizResults';
import { GlowButton } from '@/components/loopify/GlowButton';
import { ConfettiAnimation } from '@/components/loopify/ConfettiAnimation';

type QuizState = 'intro' | 'question' | 'results';

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: '1',
    question: 'What is the correct syntax for creating a list in Python?',
    options: [
      'my_list = {1, 2, 3}',
      'my_list = [1, 2, 3]',
      'my_list = (1, 2, 3)',
      'my_list = 1, 2, 3 |',
    ],
    correctOptionIndex: 1,
    explanation: 'In Python, lists are created using square brackets [].',
  },
  {
    id: '2',
    question: 'Which of the following is a mutable data type in Python?',
    options: ['Tuple', 'String', 'List', 'Integer'],
    correctOptionIndex: 2,
    explanation: 'Lists are mutable, meaning you can modify their elements after creation.',
  },
  {
    id: '3',
    question: 'What does the `len()` function return?',
    options: [
      'The last element of a sequence',
      'The length of a sequence',
      'The first element of a sequence',
      'The sum of all elements',
    ],
    correctOptionIndex: 1,
    explanation: 'The len() function returns the number of items in a sequence.',
  },
  {
    id: '4',
    question: 'How do you add an element to a list?',
    options: [
      'list.add(item)',
      'list.append(item)',
      'list.insert(item)',
      'list.push(item)',
    ],
    correctOptionIndex: 1,
    explanation: 'The append() method adds an element to the end of a list.',
  },
  {
    id: '5',
    question: 'What is the output of `"hello".upper()`?',
    options: ['"HELLO"', '"Hello"', 'Error', '"hello"'],
    correctOptionIndex: 0,
    explanation: 'The upper() method converts all characters in a string to uppercase.',
  },
];

const TIMER_DURATION = 60; // seconds per question
const XP_REWARD = 10;

export default function QuizPage() {
  const [state, setQuizState] = useState<QuizState>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const handleStartQuiz = () => {
    setQuizState('question');
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setScore(0);
    setAnswered(false);
  };

  const handleSelectOption = (index: number) => {
    setSelectedAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[currentQuestion] = index;
      return newAnswers;
    });
  };

  const handleAnswerQuestion = () => {
    const question = QUIZ_QUESTIONS[currentQuestion];
    if (selectedAnswers[currentQuestion] === question.correctOptionIndex) {
      setScore((prev) => prev + 1);
    }
    setAnswered(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setAnswered(false);
    } else {
      setQuizState('results');
    }
  };

  const handleTimeUp = () => {
    if (!answered) {
      handleAnswerQuestion();
    } else {
      handleNextQuestion();
    }
  };

  const handleRetryQuiz = () => {
    handleStartQuiz();
  };

  const handleExitQuiz = () => {
    setQuizState('intro');
  };

  const isPerfectScore = score === QUIZ_QUESTIONS.length;
  const isGoodScore = score >= Math.ceil(QUIZ_QUESTIONS.length * 0.6);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Show confetti for good scores */}
      {state === 'results' && isGoodScore && (
        <ConfettiAnimation trigger={true} duration={3000} />
      )}
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-b from-background to-background/80 backdrop-blur-sm border-b border-border p-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold gradient-text">Python Fundamentals</h1>
          <p className="text-xs text-muted-foreground mt-1">
            {state === 'question'
              ? `Question ${currentQuestion + 1} of ${QUIZ_QUESTIONS.length}`
              : state === 'results'
                ? 'Quiz Complete!'
                : 'Ready to test your knowledge?'}
          </p>
        </div>
        {state === 'question' && (
          <QuizTimer
            duration={TIMER_DURATION}
            onTimeUp={handleTimeUp}
            isActive={state === 'question' && !answered}
          />
        )}
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-6 max-w-2xl mx-auto">
        {/* Intro State */}
        {state === 'intro' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-foreground mb-3">Python Fundamentals Quiz</h2>
              <p className="text-muted-foreground mb-4">
                Test your knowledge of Python basics with this interactive quiz. You'll have 60 seconds per question
                to answer correctly.
              </p>
              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  <span>5 questions to complete</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  <span>Earn +{XP_REWARD * QUIZ_QUESTIONS.length} XP on completion</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  <span>60 seconds per question</span>
                </p>
              </div>
            </div>

            <GlowButton onClick={handleStartQuiz} className="w-full" size="lg">
              Start Quiz
            </GlowButton>

            <Link href="/gamification">
              <GlowButton variant="outline" className="w-full">
                Back to Challenges
              </GlowButton>
            </Link>
          </div>
        )}

        {/* Question State */}
        {state === 'question' && (
          <div className="space-y-6">
            <QuizCard
              question={QUIZ_QUESTIONS[currentQuestion]}
              currentQuestion={currentQuestion + 1}
              totalQuestions={QUIZ_QUESTIONS.length}
              selectedOption={selectedAnswers[currentQuestion]}
              onSelectOption={handleSelectOption}
              isAnswered={answered}
            />

            {/* Action Buttons */}
            <div className="flex gap-3">
              {!answered ? (
                <GlowButton
                  onClick={handleAnswerQuestion}
                  disabled={selectedAnswers[currentQuestion] === undefined}
                  className="flex-1"
                >
                  Submit Answer
                </GlowButton>
              ) : (
                <GlowButton onClick={handleNextQuestion} className="flex-1">
                  {currentQuestion === QUIZ_QUESTIONS.length - 1 ? 'Finish Quiz' : 'Next Question'}
                </GlowButton>
              )}
            </div>
          </div>
        )}

        {/* Results State */}
        {state === 'results' && (
          <QuizResults
            score={score}
            totalQuestions={QUIZ_QUESTIONS.length}
            xpEarned={score * XP_REWARD}
            onRetry={handleRetryQuiz}
            onExit={handleExitQuiz}
          />
        )}
      </div>
    </div>
  );
}
