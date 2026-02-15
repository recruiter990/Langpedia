'use client';

import { useState, useEffect } from 'react';
import { loadUserProfile, UserProfile } from '@/lib/user';
import { lessonsData } from '@/data/lessons';
import { speak, languageCodes } from '@/lib/speech';
import { languages } from '@/lib/languages';
import { addXP, completeLesson } from '@/lib/gamification';
import Link from 'next/link';

export default function LearnPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('numbers');
  const [isLoading, setIsLoading] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<Array<{
    question: string;
    correctAnswer: string;
    options: string[];
  }>>([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState({ correct: 0, total: 0 });
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    const userProfile = loadUserProfile();
    setProfile(userProfile);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-text-light">Loading lessons...</p>
        </div>
      </div>
    );
  }

  const targetLanguage = profile?.targetLanguage || 'it';
  const lessons = lessonsData[targetLanguage]?.basics || lessonsData['it'].basics;
  const currentLessons = lessons[selectedCategory as keyof typeof lessons] || [];

  // Generate quiz questions
  const generateQuiz = () => {
    const questions = currentLessons.slice(0, Math.min(10, currentLessons.length)).map((item) => {
      const wrongAnswers = currentLessons
        .filter(l => l.target !== item.target)
        .slice(0, 3)
        .map(l => l.english);
      const options = [item.english, ...wrongAnswers].sort(() => Math.random() - 0.5);
      return {
        question: item.target,
        correctAnswer: item.english,
        options,
      };
    });
    setQuizQuestions(questions);
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setQuizScore({ correct: 0, total: questions.length });
    setQuizCompleted(false);
    setShowQuiz(true);
  };

  const handleQuizAnswer = (answer: string) => {
    if (selectedAnswer) return;
    setSelectedAnswer(answer);
    const isCorrect = answer === quizQuestions[currentQuizIndex].correctAnswer;
    if (isCorrect) {
      setQuizScore(prev => ({ ...prev, correct: prev.correct + 1 }));
    }
  };

  const handleNextQuiz = () => {
    if (currentQuizIndex < quizQuestions.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
      setSelectedAnswer(null);
    } else {
      // Calculate final score before completing
      const finalScore = selectedAnswer === quizQuestions[currentQuizIndex].correctAnswer
        ? quizScore.correct + 1
        : quizScore.correct;
      setQuizScore(prev => ({ ...prev, correct: finalScore }));
      setQuizCompleted(true);
      
      // Award XP based on final score
      const percentage = (finalScore / quizScore.total) * 100;
      if (percentage >= 80) {
        addXP(50);
        completeLesson(`${selectedCategory}-quiz`);
      } else if (percentage >= 60) {
        addXP(30);
      } else {
        addXP(10);
      }
    }
  };

  const categories = [
    { key: 'numbers', label: 'Numbers', icon: '🔢' },
    { key: 'alphabet', label: 'Alphabet', icon: '🔤' },
    { key: 'days', label: 'Days', icon: '📅' },
    { key: 'months', label: 'Months', icon: '📆' },
    { key: 'greetings', label: 'Greetings', icon: '👋' },
    { key: 'colors', label: 'Colors', icon: '🎨' },
  ];

  const targetLangName = languages.find(l => l.code === targetLanguage)?.name || 'Italian';
  const targetLangFlag = languages.find(l => l.code === targetLanguage)?.flag || '🇮🇹';

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-heading font-bold text-text">
                {targetLangFlag} Learn {targetLangName}
              </h1>
              <p className="text-sm text-text-light">
                Master {targetLangName} step by step
              </p>
            </div>
            <div className="flex gap-4">
              <Link href="/dashboard" className="text-primary hover:underline">Dashboard</Link>
              <Link href="/translate" className="text-primary hover:underline">Translate</Link>
              <Link href="/story-mode" className="text-primary hover:underline">📖 Story Mode</Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Selector */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => {
                setSelectedCategory(category.key);
                setShowQuiz(false);
              }}
              className={`p-4 rounded-xl border-2 transition-all transform hover:scale-105 ${
                selectedCategory === category.key
                  ? 'bg-gradient-to-r from-primary to-secondary text-white border-primary shadow-lg'
                  : 'bg-white text-text border-gray-200 hover:border-primary'
              }`}
            >
              <div className="text-3xl mb-2">{category.icon}</div>
              <div className="font-semibold">{category.label}</div>
            </button>
          ))}
        </div>

        {/* Quiz Button */}
        {currentLessons.length > 0 && !showQuiz && (
          <div className="mb-6 text-center">
            <button
              onClick={generateQuiz}
              className="px-8 py-4 bg-gradient-to-r from-accent to-primary text-white rounded-xl font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              🎯 Take Quiz for {categories.find(c => c.key === selectedCategory)?.label}
            </button>
          </div>
        )}

        {/* Quiz Mode */}
        {showQuiz && !quizCompleted && quizQuestions.length > 0 && (
          <div className="bg-white rounded-xl p-8 border-2 border-primary shadow-lg mb-8">
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-text-light">
                  Question {currentQuizIndex + 1} of {quizQuestions.length}
                </span>
                <span className="text-sm font-semibold text-primary">
                  Score: {quizScore.correct}/{quizScore.total}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: `${((currentQuizIndex + 1) / quizQuestions.length) * 100}%` }}
                />
              </div>
            </div>
            <div className="text-center mb-8">
              <h3 className="text-4xl font-bold text-text mb-6">
                {quizQuestions[currentQuizIndex].question}
              </h3>
              <p className="text-text-light mb-6">What does this mean?</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quizQuestions[currentQuizIndex].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuizAnswer(option)}
                    disabled={selectedAnswer !== null}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      selectedAnswer === option
                        ? option === quizQuestions[currentQuizIndex].correctAnswer
                          ? 'bg-secondary text-white border-secondary'
                          : 'bg-red-500 text-white border-red-600'
                        : selectedAnswer && option === quizQuestions[currentQuizIndex].correctAnswer
                        ? 'bg-secondary text-white border-secondary'
                        : 'bg-white border-gray-200 hover:border-primary'
                    } ${selectedAnswer ? 'cursor-default' : 'cursor-pointer hover:scale-105'}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            {selectedAnswer && (
              <div className="text-center">
                <button
                  onClick={handleNextQuiz}
                  className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-semibold"
                >
                  {currentQuizIndex < quizQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                </button>
              </div>
            )}
            <button
              onClick={() => setShowQuiz(false)}
              className="mt-4 px-6 py-2 bg-gray-100 text-text rounded-lg hover:bg-gray-200 transition-colors"
            >
              Back to Lessons
            </button>
          </div>
        )}

        {/* Quiz Results */}
        {showQuiz && quizCompleted && (
          <div className="bg-white rounded-xl p-8 border-2 border-primary shadow-lg mb-8 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-3xl font-heading font-bold text-text mb-4">Quiz Complete!</h3>
            <div className="text-5xl font-bold text-primary mb-4">
              {Math.round((quizScore.correct / quizScore.total) * 100)}%
            </div>
            <p className="text-text-light mb-6">
              You got {quizScore.correct} out of {quizScore.total} questions correct
            </p>
            {quizScore.correct / quizScore.total >= 0.8 && (
              <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4 mb-4">
                <p className="text-secondary font-semibold">⭐ Great job! You earned bonus XP!</p>
              </div>
            )}
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => {
                  generateQuiz();
                }}
                className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={() => setShowQuiz(false)}
                className="px-6 py-3 bg-gray-200 text-text rounded-lg hover:bg-gray-300 transition-colors"
              >
                Back to Lessons
              </button>
            </div>
          </div>
        )}

        {/* Lesson Items */}
        {!showQuiz && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentLessons.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all transform hover:scale-105"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="text-3xl font-bold text-text mb-2">
                      {item.target}
                    </div>
                    <div className="text-lg text-text-light">
                      {item.english}
                    </div>
                    {item.pronunciation && (
                      <div className="text-sm text-accent mt-1 font-mono">
                        /{item.pronunciation}/
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => speak(item.target, languageCodes[targetLanguage])}
                    className="ml-4 p-3 bg-secondary text-white rounded-full hover:bg-secondary-dark transition-colors flex-shrink-0 shadow-md hover:shadow-lg"
                    title="Listen to pronunciation"
                  >
                    🔊
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {currentLessons.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-light">No lessons available for this category.</p>
          </div>
        )}
      </main>
    </div>
  );
}
