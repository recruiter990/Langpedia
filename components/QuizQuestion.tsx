'use client';

import { useState } from 'react';
import { QuizQuestion as QuizQuestionType } from '@/data/lessons';

interface QuizQuestionProps {
  question: QuizQuestionType;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (isCorrect: boolean) => void;
  onAnswered?: () => void;
}

export default function QuizQuestion({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  onAnswered,
}: QuizQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  const handleSelect = (answer: string) => {
    if (hasAnswered) return;
    
    setSelectedAnswer(answer);
    setHasAnswered(true);
    const isCorrect = answer === question.correctAnswer;
    onAnswer(isCorrect);
    onAnswered?.();
  };

  const getButtonClass = (option: string) => {
    if (!hasAnswered) {
      return 'bg-white hover:bg-blue-50 border-gray-300 hover:border-blue-400';
    }
    
    if (option === question.correctAnswer) {
      return 'bg-green-500 text-white border-green-600';
    }
    
    if (option === selectedAnswer && option !== question.correctAnswer) {
      return 'bg-red-500 text-white border-red-600';
    }
    
    return 'bg-gray-100 text-gray-500 border-gray-300';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="mb-4">
        <span className="text-sm font-medium text-gray-500">
          Question {questionNumber} of {totalQuestions}
        </span>
      </div>
      
      <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6 text-center">
        {question.question}
      </h3>
      
      <p className="text-center text-gray-600 mb-6">What does this mean?</p>
      
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(option)}
            className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 ${getButtonClass(
              option
            )} ${
              hasAnswered
                ? 'cursor-default'
                : 'cursor-pointer transform hover:scale-[1.02]'
            }`}
            disabled={hasAnswered}
          >
            <span className="font-medium">{option}</span>
          </button>
        ))}
      </div>
      
      {hasAnswered && (
        <div
          className={`mt-4 p-3 rounded-lg ${
            selectedAnswer === question.correctAnswer
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {selectedAnswer === question.correctAnswer ? (
            <p className="font-medium">✓ Correct! Well done!</p>
          ) : (
            <p className="font-medium">
              ✗ Incorrect. The correct answer is: {question.correctAnswer}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

