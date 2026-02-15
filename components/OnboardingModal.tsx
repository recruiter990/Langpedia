'use client';

import { useState } from 'react';
import { languages } from '@/lib/languages';
import { saveUserProfile, UserProfile } from '@/lib/user';
import { updateStreak } from '@/lib/gamification';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export default function OnboardingModal({ isOpen, onClose, onComplete }: OnboardingModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    nativeLanguage: 'en',
    targetLanguage: 'it',
    learningGoal: 'Hobby',
    currentLevel: 'Beginner',
    dailyGoal: '10 min',
  });

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Complete onboarding
      const profile: UserProfile = {
        ...formData as UserProfile,
        createdAt: Date.now(),
      };
      saveUserProfile(profile);
      updateStreak();
      onComplete();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const progress = (step / 3) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Progress Bar */}
        <div className="h-2 bg-gray-200 rounded-t-2xl">
          <div
            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="p-8">
          {/* Step 1: Language Selection */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-heading font-bold text-text mb-2">
                Choose Your Languages
              </h2>
              <p className="text-text-light">
                Select your native language and the language you want to learn
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-text mb-2">
                    I speak (Native Language)
                  </label>
                  <select
                    value={formData.nativeLanguage}
                    onChange={(e) => setFormData({ ...formData, nativeLanguage: e.target.value })}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  >
                    <option value="en">English</option>
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.flag} {lang.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text mb-2">
                    I want to learn
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => setFormData({ ...formData, targetLanguage: lang.code })}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          formData.targetLanguage === lang.code
                            ? 'border-primary bg-primary/10 scale-105'
                            : 'border-gray-200 hover:border-primary/50'
                        }`}
                      >
                        <div className="text-3xl mb-1">{lang.flag}</div>
                        <div className="text-xs font-medium text-text">{lang.name}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Learning Goals */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-heading font-bold text-text mb-2">
                Tell us about your goals
              </h2>
              <p className="text-text-light">
                Help us personalize your learning experience
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-text mb-2">
                    Why are you learning?
                  </label>
                  <select
                    value={formData.learningGoal}
                    onChange={(e) => setFormData({ ...formData, learningGoal: e.target.value })}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="Travel">✈️ Travel</option>
                    <option value="Work">💼 Work</option>
                    <option value="Hobby">🎨 Hobby</option>
                    <option value="Exam Preparation">📚 Exam Preparation</option>
                    <option value="Making Friends">👥 Making Friends</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text mb-2">
                    Current Level
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                      <button
                        key={level}
                        onClick={() => setFormData({ ...formData, currentLevel: level })}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          formData.currentLevel === level
                            ? 'border-primary bg-primary/10 scale-105'
                            : 'border-gray-200 hover:border-primary/50'
                        }`}
                      >
                        <div className="font-semibold text-text">{level}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text mb-2">
                    Daily Goal
                  </label>
                  <select
                    value={formData.dailyGoal}
                    onChange={(e) => setFormData({ ...formData, dailyGoal: e.target.value })}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="5 min">5 minutes per day</option>
                    <option value="10 min">10 minutes per day</option>
                    <option value="15 min">15 minutes per day</option>
                    <option value="30 min">30 minutes per day</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Ready to Start */}
          {step === 3 && (
            <div className="text-center space-y-6">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-heading font-bold text-text">
                You're all set!
              </h2>
              <p className="text-text-light">
                Let's start your language learning journey
              </p>
              <div className="bg-primary/10 rounded-lg p-4">
                <p className="text-sm text-text">
                  <strong>Learning:</strong> {languages.find(l => l.code === formData.targetLanguage)?.flag} {languages.find(l => l.code === formData.targetLanguage)?.name}
                </p>
                <p className="text-sm text-text-light mt-1">
                  <strong>Goal:</strong> {formData.learningGoal} • <strong>Level:</strong> {formData.currentLevel}
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={step === 1 ? onClose : handleBack}
              className="px-6 py-3 rounded-lg border-2 border-gray-300 text-text font-semibold hover:bg-gray-50 transition-colors"
            >
              {step === 1 ? 'Cancel' : 'Back'}
            </button>
            <button
              onClick={handleNext}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
            >
              {step === 3 ? 'Start Learning' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

