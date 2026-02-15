'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, Trophy, ArrowRight, RotateCcw } from 'lucide-react';

interface Question {
  id: number;
  type: 'multiple_choice' | 'fill_blank' | 'translation' | 'listening' | 'speaking';
  question: string;
  italian?: string;
  english?: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

interface TestResult {
  score: number;
  totalQuestions: number;
  timeSpent: number;
  correctAnswers: number;
  incorrectAnswers: number;
  passedLevel: boolean;
  detailedResults: QuestionResult[];
  nextLevelUnlocked: boolean;
}

interface QuestionResult {
  questionId: number;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  timeSpent: number;
}

export function ItalianTestSystem({ 
  level, 
  storyId, 
  onTestComplete 
}: { 
  level: string; 
  storyId: number;
  onTestComplete: (result: TestResult) => void;
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);
  const [timeStarted, setTimeStarted] = useState(Date.now());
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [questionTimes, setQuestionTimes] = useState<number[]>([]);
  const [testResult, setTestResult] = useState<TestResult | null>(null);

  // Generate questions based on level and story
  const questions: Question[] = generateQuestions(level, storyId);

  const handleAnswer = (answer: string) => {
    // Record time spent on this question
    const timeSpent = Date.now() - questionStartTime;
    setQuestionTimes([...questionTimes, timeSpent]);
    
    // Save answer
    setUserAnswers({ ...userAnswers, [currentQuestion]: answer });
    
    // Move to next question or show results
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setQuestionStartTime(Date.now());
    } else {
      calculateResults();
    }
  };

  const calculateResults = () => {
    const totalTime = Date.now() - timeStarted;
    let correct = 0;
    const detailedResults: QuestionResult[] = [];

    questions.forEach((question, index) => {
      const userAnswer = userAnswers[index] || '';
      const isCorrect = userAnswer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim();
      
      if (isCorrect) correct++;
      
      detailedResults.push({
        questionId: question.id,
        userAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect,
        timeSpent: questionTimes[index] || 0
      });
    });

    const score = Math.round((correct / questions.length) * 100);
    const passedLevel = score >= 70; // 70% to pass
    const nextLevelUnlocked = passedLevel && level !== 'C2';

    const result: TestResult = {
      score,
      totalQuestions: questions.length,
      timeSpent: Math.round(totalTime / 1000), // in seconds
      correctAnswers: correct,
      incorrectAnswers: questions.length - correct,
      passedLevel,
      detailedResults,
      nextLevelUnlocked
    };

    setTestResult(result);
    setShowResults(true);
    onTestComplete(result);
  };

  const retakeTest = () => {
    setCurrentQuestion(0);
    setUserAnswers({});
    setShowResults(false);
    setTimeStarted(Date.now());
    setQuestionStartTime(Date.now());
    setQuestionTimes([]);
    setTestResult(null);
  };

  if (showResults && testResult) {
    return <TestResults result={testResult} questions={questions} userAnswers={userAnswers} onRetake={retakeTest} />;
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 mb-6">
          {/* Question Type Badge */}
          <div className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold mb-6">
            {question.type.replace('_', ' ').toUpperCase()} • {question.difficulty.toUpperCase()}
          </div>

          {/* Question */}
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            {question.question}
          </h2>

          {/* Question Content Based on Type */}
          {question.type === 'multiple_choice' && (
            <div className="space-y-4">
              {question.options?.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="w-full p-6 text-left bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900 border-2 border-transparent hover:border-blue-500 rounded-2xl transition-all transform hover:scale-[1.02] text-lg font-medium text-gray-800 dark:text-white"
                >
                  <span className="inline-block w-8 h-8 bg-blue-600 text-white rounded-full text-center leading-8 mr-4">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </button>
              ))}
            </div>
          )}

          {question.type === 'translation' && (
            <div>
              <div className="mb-6 p-6 bg-blue-50 dark:bg-blue-900/30 rounded-2xl">
                <p className="text-xl font-semibold text-blue-900 dark:text-blue-200">
                  {question.italian || question.english}
                </p>
              </div>
              <input
                type="text"
                placeholder="Type your translation..."
                onKeyPress={(e) => e.key === 'Enter' && e.currentTarget.value && handleAnswer(e.currentTarget.value)}
                className="w-full p-4 text-lg border-2 border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 outline-none"
              />
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Press Enter to submit
              </p>
            </div>
          )}

          {question.type === 'fill_blank' && (
            <div>
              <div className="mb-6 p-6 bg-yellow-50 dark:bg-yellow-900/30 rounded-2xl">
                <p className="text-xl font-semibold text-yellow-900 dark:text-yellow-200">
                  {question.italian}
                </p>
              </div>
              <input
                type="text"
                placeholder="Fill in the blank..."
                onKeyPress={(e) => e.key === 'Enter' && e.currentTarget.value && handleAnswer(e.currentTarget.value)}
                className="w-full p-4 text-lg border-2 border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 dark:focus:ring-yellow-800 outline-none"
              />
            </div>
          )}
        </div>

        {/* Skip Button */}
        <div className="flex justify-between">
          <button
            onClick={() => handleAnswer('')}
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Skip Question
          </button>
          
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <Clock size={20} />
            <span className="font-mono">
              {Math.floor((Date.now() - timeStarted) / 1000 / 60)}:
              {String(Math.floor((Date.now() - timeStarted) / 1000) % 60).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function TestResults({ 
  result, 
  questions, 
  userAnswers, 
  onRetake 
}: { 
  result: TestResult; 
  questions: Question[]; 
  userAnswers: { [key: number]: string };
  onRetake: () => void;
}) {
  const passed = result.passedLevel;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Results Header */}
        <div className={`bg-gradient-to-r ${passed ? 'from-green-500 to-emerald-600' : 'from-red-500 to-pink-600'} rounded-3xl shadow-2xl p-12 text-white mb-8 text-center`}>
          <div className="text-7xl mb-4">
            {passed ? '🎉' : '📚'}
          </div>
          <h1 className="text-5xl font-bold mb-4">
            {passed ? 'Congratulazioni!' : 'Keep Practicing!'}
          </h1>
          <p className="text-2xl mb-6 opacity-90">
            {passed 
              ? 'You passed the test! Ready for the next level!' 
              : 'You need 70% to pass. Review and try again!'}
          </p>
          <div className="flex justify-center gap-12 mt-8">
            <div>
              <div className="text-6xl font-bold">{result.score}%</div>
              <div className="text-xl opacity-90">Score</div>
            </div>
            <div>
              <div className="text-6xl font-bold">{result.correctAnswers}/{result.totalQuestions}</div>
              <div className="text-xl opacity-90">Correct</div>
            </div>
            <div>
              <div className="text-6xl font-bold">{Math.floor(result.timeSpent / 60)}m</div>
              <div className="text-xl opacity-90">Time</div>
            </div>
          </div>
        </div>

        {/* Detailed Results */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Question Review
          </h2>
          
          <div className="space-y-6">
            {questions.map((question, index) => {
              const detailResult = result.detailedResults[index];
              const isCorrect = detailResult?.isCorrect;
              
              return (
    <div
      key={question.id}
      className={`p-6 rounded-2xl border-2 ${
        isCorrect 
          ? 'bg-green-50 dark:bg-green-900/20 border-green-500' 
          : 'bg-red-50 dark:bg-red-900/20 border-red-500'
      }`}
    >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      {isCorrect ? (
                        <CheckCircle className="text-green-600 dark:text-green-400" size={32} />
                      ) : (
                        <XCircle className="text-red-600 dark:text-red-400" size={32} />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                        Question {index + 1}: {question.question}
                      </h3>
                      
                      <div className="space-y-2 text-sm">
                        <p className="text-gray-700 dark:text-gray-300">
                          <span className="font-semibold">Your answer:</span> {userAnswers[index] || '(Skipped)'}
                        </p>
                        {!isCorrect && (
                          <p className="text-gray-700 dark:text-gray-300">
                            <span className="font-semibold">Correct answer:</span> {question.correctAnswer}
                          </p>
                        )}
                        <p className="text-gray-600 dark:text-gray-400 italic">
                          💡 {question.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={onRetake}
            className="px-8 py-4 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-colors text-lg font-semibold flex items-center gap-2 shadow-lg"
          >
            <RotateCcw size={24} />
            Retake Test
          </button>
          
          {passed && result.nextLevelUnlocked && (
            <button
              onClick={() => window.location.href = '/story-mode'}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all text-lg font-semibold flex items-center gap-2 shadow-lg"
            >
              Continue to Next Level
              <ArrowRight size={24} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Generate questions based on level and story
function generateQuestions(level: string, storyId: number): Question[] {
  // This is a sample - in production, load from database
  const levelQuestions: { [key: string]: Question[] } = {
    'A1': [
      {
        id: 1,
        type: 'multiple_choice',
        question: 'How do you say "Good morning" in Italian?',
        options: ['Buonasera', 'Buongiorno', 'Buonanotte', 'Ciao'],
        correctAnswer: 'Buongiorno',
        explanation: 'Buongiorno is used from morning until early afternoon (around 1-2pm).',
        difficulty: 'easy',
        category: 'Greetings'
      },
      {
        id: 2,
        type: 'translation',
        question: 'Translate to Italian:',
        english: 'My name is Alex',
        correctAnswer: 'Mi chiamo Alex',
        explanation: '"Mi chiamo" literally means "I call myself" and is the standard way to introduce yourself.',
        difficulty: 'easy',
        category: 'Introduction'
      },
      {
        id: 3,
        type: 'multiple_choice',
        question: 'What is the correct response to "Come stai?"',
        options: ['Piacere', 'Bene, grazie', 'Mi chiamo', 'Arrivederci'],
        correctAnswer: 'Bene, grazie',
        explanation: '"Come stai?" means "How are you?", so "Bene, grazie" (Well, thanks) is appropriate.',
        difficulty: 'easy',
        category: 'Greetings'
      },
      {
        id: 4,
        type: 'fill_blank',
        question: 'Complete the sentence:',
        italian: 'Vorrei un caffè, ___ favore',
        correctAnswer: 'per',
        explanation: '"Per favore" means "please" in Italian. Always use it to be polite!',
        difficulty: 'easy',
        category: 'Politeness'
      },
      {
        id: 5,
        type: 'multiple_choice',
        question: 'Which word means "thank you"?',
        options: ['Prego', 'Scusi', 'Grazie', 'Ciao'],
        correctAnswer: 'Grazie',
        explanation: 'Grazie means "thank you". You can say "Grazie mille" for "Thanks a lot!"',
        difficulty: 'easy',
        category: 'Politeness'
      },
      {
        id: 6,
        type: 'translation',
        question: 'Translate to English:',
        italian: 'Dov\'è il bagno?',
        correctAnswer: 'Where is the bathroom?',
        explanation: '"Dov\'è" means "where is". Essential phrase for tourists!',
        difficulty: 'medium',
        category: 'Questions'
      },
      {
        id: 7,
        type: 'multiple_choice',
        question: 'How do you say "I don\'t understand" in Italian?',
        options: ['Non parlo italiano', 'Non capisco', 'Non so', 'Non mi piace'],
        correctAnswer: 'Non capisco',
        explanation: '"Non capisco" literally means "I don\'t understand". Very useful phrase!',
        difficulty: 'medium',
        category: 'Communication'
      },
      {
        id: 8,
        type: 'fill_blank',
        question: 'Complete: "Quanto ___ questa pizza?"',
        italian: 'Quanto ___ questa pizza?',
        correctAnswer: 'costa',
        explanation: '"Quanto costa?" means "How much does it cost?" Essential for shopping!',
        difficulty: 'medium',
        category: 'Shopping'
      },
      {
        id: 9,
        type: 'translation',
        question: 'Translate to Italian:',
        english: 'Excuse me',
        correctAnswer: 'Scusi',
        explanation: '"Scusi" (formal) or "Scusa" (informal) means "excuse me". Use it to get someone\'s attention.',
        difficulty: 'easy',
        category: 'Politeness'
      },
      {
        id: 10,
        type: 'multiple_choice',
        question: 'What time-related word means "today"?',
        options: ['Domani', 'Ieri', 'Oggi', 'Ora'],
        correctAnswer: 'Oggi',
        explanation: 'Oggi = today, Domani = tomorrow, Ieri = yesterday, Ora = now',
        difficulty: 'medium',
        category: 'Time'
      }
    ],
    // Add more levels...
  };

  return levelQuestions[level] || levelQuestions['A1'];
}
