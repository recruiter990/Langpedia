'use client';

import { useState, useEffect } from 'react';
import { loadUserProfile } from '@/lib/user';
import { lessonsData } from '@/data/lessons';
import { speak, languageCodes } from '@/lib/speech';
import { languages } from '@/lib/languages';
import Link from 'next/link';

type PracticeMode = 'flashcards' | 'quiz' | 'fill-blank' | 'matching' | null;

export default function PracticePage() {
  const [practiceMode, setPracticeMode] = useState<PracticeMode>(null);
  const [profile, setProfile] = useState(loadUserProfile());
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('numbers');

  useEffect(() => {
    setProfile(loadUserProfile());
  }, []);

  const targetLanguage = profile?.targetLanguage || 'it';
  const lessons = lessonsData[targetLanguage]?.basics || lessonsData['it'].basics;
  const currentLessons = lessons[selectedCategory as keyof typeof lessons] || [];

  const categories = [
    { key: 'numbers', label: 'Numbers', icon: '🔢' },
    { key: 'alphabet', label: 'Alphabet', icon: '🔤' },
    { key: 'days', label: 'Days', icon: '📅' },
    { key: 'months', label: 'Months', icon: '📆' },
    { key: 'greetings', label: 'Greetings', icon: '👋' },
    { key: 'colors', label: 'Colors', icon: '🎨' },
  ];

  const practiceModes = [
    {
      id: 'flashcards' as PracticeMode,
      title: 'Flashcards',
      icon: '🃏',
      description: 'Swipe through vocabulary cards',
      color: 'from-primary to-secondary',
    },
    {
      id: 'quiz' as PracticeMode,
      title: 'Multiple Choice',
      icon: '❓',
      description: 'Test your knowledge with quizzes',
      color: 'from-secondary to-success',
    },
    {
      id: 'fill-blank' as PracticeMode,
      title: 'Fill in the Blank',
      icon: '✍️',
      description: 'Complete sentences',
      color: 'from-accent to-primary',
    },
    {
      id: 'matching' as PracticeMode,
      title: 'Matching Game',
      icon: '🔗',
      description: 'Match words to translations',
      color: 'from-primary to-accent',
    },
  ];

  const handleNextFlashcard = () => {
    if (flashcardIndex < currentLessons.length - 1) {
      setFlashcardIndex(flashcardIndex + 1);
      setIsFlipped(false);
    } else {
      setFlashcardIndex(0);
      setIsFlipped(false);
    }
  };

  const handlePrevFlashcard = () => {
    if (flashcardIndex > 0) {
      setFlashcardIndex(flashcardIndex - 1);
      setIsFlipped(false);
    } else {
      setFlashcardIndex(currentLessons.length - 1);
      setIsFlipped(false);
    }
  };

  // Generate quiz questions from current lessons
  const generateQuizQuestions = () => {
    return currentLessons.slice(0, 10).map((item, index) => {
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
  };

  const [quizQuestions, setQuizQuestions] = useState(generateQuizQuestions());
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState({ correct: 0, total: 0 });
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    if (practiceMode === 'quiz') {
      setQuizQuestions(generateQuizQuestions());
      setCurrentQuizIndex(0);
      setSelectedAnswer(null);
      setQuizScore({ correct: 0, total: generateQuizQuestions().length });
      setQuizCompleted(false);
    }
  }, [practiceMode, selectedCategory]);

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
      setQuizCompleted(true);
    }
  };

  // Matching game state
  const [matchingPairs, setMatchingPairs] = useState<Array<{ target: string; english: string; matched: boolean }>>([]);
  const [selectedMatch, setSelectedMatch] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState(0);

  useEffect(() => {
    if (practiceMode === 'matching') {
      const pairs = currentLessons.slice(0, 8).map(item => ({
        target: item.target,
        english: item.english,
        matched: false,
      }));
      setMatchingPairs(pairs);
      setSelectedMatch(null);
      setMatchedPairs(0);
    }
  }, [practiceMode, selectedCategory]);

  const handleMatchSelect = (item: { target: string; english: string }, type: 'target' | 'english') => {
    if (selectedMatch === null) {
      setSelectedMatch(`${type}-${type === 'target' ? item.target : item.english}`);
    } else {
      const [prevType, prevValue] = selectedMatch.split('-');
      if (prevType === type) {
        setSelectedMatch(null);
        return;
      }
      
      const currentValue = type === 'target' ? item.target : item.english;
      const pair = matchingPairs.find(p => 
        (p.target === prevValue || p.english === prevValue) &&
        (p.target === currentValue || p.english === currentValue)
      );
      
      if (pair && !pair.matched) {
        pair.matched = true;
        setMatchedPairs(matchedPairs + 1);
        setMatchingPairs([...matchingPairs]);
      }
      setSelectedMatch(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-heading font-bold text-text">Practice Mode</h1>
            <div className="flex gap-4">
              <Link href="/learn" className="text-primary hover:underline">Learn</Link>
              <Link href="/dashboard" className="text-primary hover:underline">Dashboard</Link>
              <Link href="/story-mode" className="text-primary hover:underline">📖 Story Mode</Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!practiceMode ? (
          <>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading font-bold text-text mb-4">
                Choose Your Practice Mode
              </h2>
              <p className="text-text-light">
                Practice makes perfect! Select a mode to improve your skills
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {practiceModes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setPracticeMode(mode.id)}
                  className={`p-8 rounded-xl bg-gradient-to-r ${mode.color} text-white text-left hover:shadow-xl transform hover:scale-105 transition-all`}
                >
                  <div className="text-5xl mb-4">{mode.icon}</div>
                  <h3 className="text-2xl font-heading font-bold mb-2">{mode.title}</h3>
                  <p className="text-white/90">{mode.description}</p>
                </button>
              ))}
            </div>

            {/* Daily Challenge */}
            <div className="bg-gradient-to-r from-accent to-primary rounded-xl p-8 text-white text-center">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-2xl font-heading font-bold mb-2">Daily Challenge</h3>
              <p className="text-white/90 mb-6">
                Complete today's challenge to earn bonus XP!
              </p>
              <button className="px-8 py-3 bg-white text-primary rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all">
                Start Challenge
              </button>
            </div>
          </>
        ) : (
          <div>
            {/* Category Selector */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-text mb-2">Select Category:</label>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => {
                      setSelectedCategory(cat.key);
                      if (practiceMode === 'quiz') {
                        setQuizQuestions(generateQuizQuestions());
                        setCurrentQuizIndex(0);
                        setQuizCompleted(false);
                      }
                    }}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedCategory === cat.key
                        ? 'border-primary bg-primary/10'
                        : 'border-gray-200 hover:border-primary/50'
                    }`}
                  >
                    <div className="text-2xl mb-1">{cat.icon}</div>
                    <div className="text-xs font-medium">{cat.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Flashcards Mode */}
            {practiceMode === 'flashcards' && currentLessons.length > 0 && (
              <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-lg">
                <div className="text-center mb-6">
                  <div className="text-sm text-text-light mb-2">
                    Card {flashcardIndex + 1} of {currentLessons.length}
                  </div>
                  <div
                    className="relative h-64 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl cursor-pointer transform transition-transform duration-300"
                    style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                    onClick={() => setIsFlipped(!isFlipped)}
                  >
                    <div className="absolute inset-0 flex items-center justify-center p-6">
                      {!isFlipped ? (
                        <div className="text-center">
                          <div className="text-5xl font-bold text-text mb-4">
                            {currentLessons[flashcardIndex].target}
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              speak(currentLessons[flashcardIndex].target, languageCodes[targetLanguage]);
                            }}
                            className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary-dark"
                          >
                            🔊 Listen
                          </button>
                        </div>
                      ) : (
                        <div className="text-center">
                          <div className="text-3xl font-bold text-primary mb-2">
                            {currentLessons[flashcardIndex].english}
                          </div>
                          {currentLessons[flashcardIndex].pronunciation && (
                            <div className="text-sm text-text-light font-mono">
                              /{currentLessons[flashcardIndex].pronunciation}/
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-text-light mt-4">Click card to flip</p>
                </div>
                <div className="flex justify-between">
                  <button
                    onClick={handlePrevFlashcard}
                    className="px-6 py-3 bg-gray-200 text-text rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={handleNextFlashcard}
                    className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    Next →
                  </button>
                </div>
                <button
                  onClick={() => setPracticeMode(null)}
                  className="w-full mt-4 px-6 py-3 bg-gray-100 text-text rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Back to Practice Modes
                </button>
              </div>
            )}

            {/* Quiz Mode */}
            {practiceMode === 'quiz' && !quizCompleted && quizQuestions.length > 0 && (
              <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-lg">
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
                  onClick={() => setPracticeMode(null)}
                  className="w-full mt-4 px-6 py-3 bg-gray-100 text-text rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Back to Practice Modes
                </button>
              </div>
            )}

            {/* Quiz Results */}
            {practiceMode === 'quiz' && quizCompleted && (
              <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-lg text-center">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-3xl font-heading font-bold text-text mb-4">Quiz Complete!</h3>
                <div className="text-5xl font-bold text-primary mb-4">
                  {Math.round((quizScore.correct / quizScore.total) * 100)}%
                </div>
                <p className="text-text-light mb-6">
                  You got {quizScore.correct} out of {quizScore.total} questions correct
                </p>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => {
                      setQuizQuestions(generateQuizQuestions());
                      setCurrentQuizIndex(0);
                      setSelectedAnswer(null);
                      setQuizScore({ correct: 0, total: generateQuizQuestions().length });
                      setQuizCompleted(false);
                    }}
                    className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    Try Again
                  </button>
                  <button
                    onClick={() => setPracticeMode(null)}
                    className="px-6 py-3 bg-gray-200 text-text rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Back to Practice Modes
                  </button>
                </div>
              </div>
            )}

            {/* Matching Game */}
            {practiceMode === 'matching' && matchingPairs.length > 0 && (
              <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-lg">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-heading font-bold text-text mb-2">Matching Game</h3>
                  <p className="text-text-light">
                    Match {languages.find(l => l.code === targetLanguage)?.name} words with their English translations
                  </p>
                  <div className="mt-4 text-lg font-semibold text-primary">
                    Matched: {matchedPairs} / {matchingPairs.length}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <h4 className="font-semibold text-text mb-3">
                      {languages.find(l => l.code === targetLanguage)?.name} Words
                    </h4>
                    <div className="space-y-2">
                      {matchingPairs.map((pair, index) => (
                        <button
                          key={index}
                          onClick={() => handleMatchSelect(pair, 'target')}
                          disabled={pair.matched}
                          className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                            pair.matched
                              ? 'bg-secondary/20 border-secondary opacity-50'
                              : selectedMatch === `target-${pair.target}`
                              ? 'bg-primary/20 border-primary'
                              : 'bg-white border-gray-200 hover:border-primary'
                          }`}
                        >
                          {pair.target}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-text mb-3">English Translations</h4>
                    <div className="space-y-2">
                      {matchingPairs
                        .sort(() => Math.random() - 0.5)
                        .map((pair, index) => (
                          <button
                            key={index}
                            onClick={() => handleMatchSelect(pair, 'english')}
                            disabled={pair.matched}
                            className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                              pair.matched
                                ? 'bg-secondary/20 border-secondary opacity-50'
                                : selectedMatch === `english-${pair.english}`
                                ? 'bg-primary/20 border-primary'
                                : 'bg-white border-gray-200 hover:border-primary'
                            }`}
                          >
                            {pair.english}
                          </button>
                        ))}
                    </div>
                  </div>
                </div>
                {matchedPairs === matchingPairs.length && (
                  <div className="text-center p-4 bg-secondary/10 rounded-lg mb-4">
                    <div className="text-4xl mb-2">🎉</div>
                    <p className="text-lg font-semibold text-text">Perfect! All pairs matched!</p>
                  </div>
                )}
                <button
                  onClick={() => setPracticeMode(null)}
                  className="w-full px-6 py-3 bg-gray-100 text-text rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Back to Practice Modes
                </button>
              </div>
            )}

            {/* Fill in the Blank - Coming Soon */}
            {practiceMode === 'fill-blank' && (
              <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-lg text-center">
                <p className="text-text-light mb-4">
                  Fill in the Blank mode coming soon!
                </p>
                <button
                  onClick={() => setPracticeMode(null)}
                  className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Back to Practice Modes
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
