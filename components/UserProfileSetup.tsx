'use client';

import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { UserProfile, saveUserProfile } from '@/lib/user-system';

interface UserProfileSetupProps {
  onComplete: (profile: UserProfile) => void;
}

export function UserProfileSetup({ onComplete }: UserProfileSetupProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    name: '',
    nativeLanguage: '',
    targetLanguage: 'it',
    level: 'A1',
    learningGoal: '',
    dailyGoalMinutes: 15,
    hasCompletedOnboarding: false
  });

  const totalSteps = 5;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    const completeProfile: UserProfile = {
      name: profile.name || 'Learner',
      nativeLanguage: profile.nativeLanguage || 'en',
      targetLanguage: profile.targetLanguage || 'it',
      level: profile.level || 'A1',
      learningGoal: profile.learningGoal || 'general',
      dailyGoalMinutes: profile.dailyGoalMinutes || 15,
      createdAt: Date.now(),
      hasCompletedOnboarding: true
    };
    
    saveUserProfile(completeProfile);
    onComplete(completeProfile);
  };

  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-pink-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="mb-8 min-h-[400px]">
          {currentStep === 1 && (
            <Step1Name
              name={profile.name || ''}
              onChange={(name) => setProfile({ ...profile, name })}
            />
          )}
          
          {currentStep === 2 && (
            <Step2Languages
              nativeLanguage={profile.nativeLanguage || ''}
              targetLanguage={profile.targetLanguage || 'it'}
              onChange={(native, target) => setProfile({ ...profile, nativeLanguage: native, targetLanguage: target })}
            />
          )}
          
          {currentStep === 3 && (
            <Step3Level
              level={profile.level || 'A1'}
              onChange={(level) => setProfile({ ...profile, level })}
            />
          )}
          
          {currentStep === 4 && (
            <Step4Goal
              learningGoal={profile.learningGoal || ''}
              onChange={(goal) => setProfile({ ...profile, learningGoal: goal })}
            />
          )}
          
          {currentStep === 5 && (
            <Step5Time
              dailyGoalMinutes={profile.dailyGoalMinutes || 15}
              onChange={(minutes) => setProfile({ ...profile, dailyGoalMinutes: minutes })}
            />
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all ${
              currentStep === 1
                ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            <ArrowLeft size={20} />
            Back
          </button>

          <button
            onClick={handleNext}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all flex items-center gap-2"
          >
            {currentStep === totalSteps ? (
              <>
                Complete Setup
                <CheckCircle size={20} />
              </>
            ) : (
              <>
                Continue
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// Step 1: Name
function Step1Name({ name, onChange }: { name: string; onChange: (name: string) => void }) {
  return (
    <div className="text-center">
      <div className="text-7xl mb-6">👋</div>
      <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        What's your name?
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        We'll use this to personalize your learning experience
      </p>
      <input
        type="text"
        value={name}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter your name"
        className="w-full px-6 py-4 text-xl border-2 border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800 outline-none"
        autoFocus
      />
    </div>
  );
}

// Step 2: Languages
function Step2Languages({
  nativeLanguage,
  targetLanguage,
  onChange
}: {
  nativeLanguage: string;
  targetLanguage: string;
  onChange: (native: string, target: string) => void;
}) {
  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
    { code: 'it', name: 'Italian', flag: '🇮🇹' },
  ];

  return (
    <div className="text-center">
      <div className="text-7xl mb-6">🌍</div>
      <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        Your Languages
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        Tell us about your native and target languages
      </p>
      
      <div className="space-y-6">
        <div>
          <label className="block text-left text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Native Language
          </label>
          <div className="grid grid-cols-3 gap-3">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => onChange(lang.code, targetLanguage)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  nativeLanguage === lang.code
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="text-3xl mb-2">{lang.flag}</div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">{lang.name}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-left text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Target Language (What you want to learn)
          </label>
          <div className="grid grid-cols-3 gap-3">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => onChange(nativeLanguage, lang.code)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  targetLanguage === lang.code
                    ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/30'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="text-3xl mb-2">{lang.flag}</div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">{lang.name}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Step 3: Level
function Step3Level({ level, onChange }: { level: string; onChange: (level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2') => void }) {
  const levels = [
    { code: 'A1' as const, name: 'Absolute Beginner', desc: 'Starting from scratch' },
    { code: 'A2' as const, name: 'Elementary', desc: 'Basic phrases and words' },
    { code: 'B1' as const, name: 'Intermediate', desc: 'Can have conversations' },
    { code: 'B2' as const, name: 'Upper-Intermediate', desc: 'Fluent in most situations' },
    { code: 'C1' as const, name: 'Advanced', desc: 'Near-native fluency' },
    { code: 'C2' as const, name: 'Mastery', desc: 'Native-like proficiency' },
  ];

  return (
    <div className="text-center">
      <div className="text-7xl mb-6">📊</div>
      <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        What's your current level?
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        Don't worry, you can always change this later
      </p>
      
      <div className="grid grid-cols-2 gap-4">
        {levels.map((lvl) => (
          <button
            key={lvl.code}
            onClick={() => onChange(lvl.code)}
            className={`p-6 rounded-2xl border-2 text-left transition-all ${
              level === lvl.code
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 shadow-lg'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {lvl.code}
            </div>
            <div className="font-semibold text-gray-900 dark:text-white mb-1">
              {lvl.name}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {lvl.desc}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// Step 4: Learning Goal
function Step4Goal({ learningGoal, onChange }: { learningGoal: string; onChange: (goal: string) => void }) {
  const goals = [
    { id: 'travel', emoji: '✈️', name: 'Travel', desc: 'For vacation and tourism' },
    { id: 'work', emoji: '💼', name: 'Work', desc: 'Professional opportunities' },
    { id: 'culture', emoji: '🎭', name: 'Culture', desc: 'Love for Italian culture' },
    { id: 'family', emoji: '👨‍👩‍👧‍👦', name: 'Family', desc: 'Connect with relatives' },
    { id: 'education', emoji: '🎓', name: 'Education', desc: 'Academic purposes' },
    { id: 'general', emoji: '🌟', name: 'General', desc: 'Just for fun!' },
  ];

  return (
    <div className="text-center">
      <div className="text-7xl mb-6">🎯</div>
      <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        What's your learning goal?
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        This helps us tailor your experience
      </p>
      
      <div className="grid grid-cols-2 gap-4">
        {goals.map((goal) => (
          <button
            key={goal.id}
            onClick={() => onChange(goal.id)}
            className={`p-6 rounded-2xl border-2 text-left transition-all ${
              learningGoal === goal.id
                ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/30 shadow-lg'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <div className="text-4xl mb-3">{goal.emoji}</div>
            <div className="font-semibold text-gray-900 dark:text-white mb-1">
              {goal.name}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {goal.desc}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// Step 5: Daily Time
function Step5Time({ dailyGoalMinutes, onChange }: { dailyGoalMinutes: number; onChange: (minutes: number) => void }) {
  const timeOptions = [
    { minutes: 5, label: '5 minutes', desc: 'Quick daily practice' },
    { minutes: 15, label: '15 minutes', desc: 'Perfect for consistency' },
    { minutes: 30, label: '30 minutes', desc: 'Serious learning' },
    { minutes: 60, label: '1 hour', desc: 'Intensive study' },
  ];

  return (
    <div className="text-center">
      <div className="text-7xl mb-6">⏰</div>
      <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        Daily time commitment?
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        How much time can you dedicate each day?
      </p>
      
      <div className="grid grid-cols-2 gap-4">
        {timeOptions.map((option) => (
          <button
            key={option.minutes}
            onClick={() => onChange(option.minutes)}
            className={`p-6 rounded-2xl border-2 text-left transition-all ${
              dailyGoalMinutes === option.minutes
                ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30 shadow-lg'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {option.label}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {option.desc}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

