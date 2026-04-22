import React from 'react';
import { GradientCard } from './GradientCard';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation?: string;
}

interface QuizCardProps {
  question: QuizQuestion;
  currentQuestion: number;
  totalQuestions: number;
  selectedOption?: number;
  onSelectOption: (index: number) => void;
  isAnswered?: boolean;
}

export function QuizCard({
  question,
  currentQuestion,
  totalQuestions,
  selectedOption,
  onSelectOption,
  isAnswered = false,
}: QuizCardProps) {
  return (
    <div className="space-y-6">
      {/* Question Header */}
      <div>
        <p className="text-xs text-muted-foreground mb-2">
          Question {currentQuestion} of {totalQuestions}
        </p>
        <h2 className="text-xl font-bold text-foreground">{question.question}</h2>
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-card border border-border rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
          style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
        />
      </div>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selectedOption === index;
          const isCorrect = index === question.correctOptionIndex;
          const showResult = isAnswered && (isSelected || isCorrect);

          return (
            <button
              key={index}
              onClick={() => !isAnswered && onSelectOption(index)}
              disabled={isAnswered}
              className={`
                w-full p-4 rounded-lg border-2 transition-all text-left
                ${
                  showResult
                    ? isCorrect
                      ? 'border-green-500 bg-green-500/10'
                      : 'border-red-500 bg-red-500/10'
                    : isSelected
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                }
                ${isAnswered ? 'cursor-default' : 'cursor-pointer'}
              `}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`
                    w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold
                    ${
                      showResult
                        ? isCorrect
                          ? 'border-green-500 bg-green-500 text-white'
                          : 'border-red-500 bg-red-500 text-white'
                        : isSelected
                          ? 'border-primary bg-primary text-black'
                          : 'border-muted-foreground'
                    }
                  `}
                >
                  {showResult ? (isCorrect ? '✓' : '✗') : String.fromCharCode(65 + index)}
                </div>
                <span className="text-foreground">{option}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {isAnswered && question.explanation && (
        <GradientCard variant="blue" className="p-4">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Explanation: </span>
            {question.explanation}
          </p>
        </GradientCard>
      )}
    </div>
  );
}
