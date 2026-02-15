'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, Star, Lock, CheckCircle, Trophy, BookOpen, MessageCircle, Home, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { storyChapters, StoryChapter, StoryScene } from '@/data/story-chapters';
import { ItalianTestSystem } from '@/components/ItalianTestSystem';
import { AIConversationAgent } from '@/components/AIConversationAgent';
import { UserProfileSetup } from '@/components/UserProfileSetup';
import { 
  getUserProfile, 
  getStoryProgress, 
  saveStoryProgress, 
  saveTestResult,
  UserProfile 
} from '@/lib/user-system';

type ViewMode = 'profile-setup' | 'map' | 'story' | 'test' | 'conversation';

export default function StoryModePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [currentChapter, setCurrentChapter] = useState(1);
  const [currentScene, setCurrentScene] = useState(0);
  const [viewMode, setViewMode] = useState<ViewMode>('profile-setup');
  const [completedChapters, setCompletedChapters] = useState<number[]>([]);
  const [totalXP, setTotalXP] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check for profile and load progress on mount
  useEffect(() => {
    const userProfile = getUserProfile();
    if (userProfile) {
      setProfile(userProfile);
      const progress = getStoryProgress();
      setCurrentChapter(progress.currentChapter);
      setCurrentScene(progress.currentScene);
      setCompletedChapters(progress.completedChapters);
      setTotalXP(progress.totalXP);
      setViewMode('map');
    } else {
      setViewMode('profile-setup');
    }
    setIsLoading(false);
  }, []);

  const saveProgress = () => {
    saveStoryProgress({
      currentChapter,
      currentScene,
      totalXP,
      completedChapters,
      lastUpdated: Date.now()
    });
  };

  const handleProfileComplete = (newProfile: UserProfile) => {
    setProfile(newProfile);
    setViewMode('map');
  };

  const handleChapterSelect = (chapterId: number) => {
    // Check if chapter is unlocked
    if (chapterId === 1 || completedChapters.includes(chapterId - 1)) {
      setCurrentChapter(chapterId);
      setCurrentScene(0);
      setViewMode('story');
      saveProgress();
    }
  };

  const handleContinueFromLast = () => {
    setViewMode('story');
    saveProgress();
  };

  const handleChoiceSelect = (choiceIndex: number) => {
    setSelectedChoice(choiceIndex);
    setShowFeedback(true);
    
    const chapter = storyChapters.find(ch => ch.id === currentChapter);
    const scene = chapter?.scenes[currentScene];
    const choice = scene?.choices?.[choiceIndex];
    
    if (choice?.correct) {
      const newXP = totalXP + choice.xp;
      setTotalXP(newXP);
    }

    // Auto-advance after 3 seconds
    setTimeout(() => {
      if (scene && currentScene < (chapter?.scenes.length || 0) - 1) {
        const newScene = currentScene + 1;
        setCurrentScene(newScene);
        setSelectedChoice(null);
        setShowFeedback(false);
        saveProgress();
      } else {
        // Chapter complete!
        handleChapterComplete();
      }
    }, 3000);
  };

  const handleChapterComplete = () => {
    if (!completedChapters.includes(currentChapter)) {
      const newCompleted = [...completedChapters, currentChapter];
      setCompletedChapters(newCompleted);
      
      const chapter = storyChapters.find(ch => ch.id === currentChapter);
      if (chapter) {
        const newXP = totalXP + chapter.xpReward;
        setTotalXP(newXP);
      }
    }
    saveProgress();
    setViewMode('test'); // Go to test after completing chapter
  };

  const handleTestComplete = (result: any) => {
    // Save test result
    saveTestResult(currentChapter, result.score, result.passedLevel, result.timeSpent);
    
    if (result.passedLevel) {
      setViewMode('conversation'); // Unlock conversation practice
    } else {
      setViewMode('map'); // Return to map to retry
    }
    saveProgress();
  };

  const handleConversationComplete = () => {
    setViewMode('map');
    setCurrentChapter(currentChapter + 1);
    setCurrentScene(0);
    saveProgress();
  };

  const speakText = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'it-IT';
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your adventure...</p>
        </div>
      </div>
    );
  }

  // Profile Setup View
  if (viewMode === 'profile-setup') {
    return <UserProfileSetup onComplete={handleProfileComplete} />;
  }

  // Story Map View
  if (viewMode === 'map') {
    const progress = getStoryProgress();
    const hasProgress = progress.currentChapter > 1 || progress.currentScene > 0 || completedChapters.length > 0;
    
    return (
      <StoryMap 
        chapters={storyChapters} 
        completedChapters={completedChapters}
        totalXP={totalXP}
        onChapterSelect={handleChapterSelect}
        onContinueFromLast={hasProgress ? handleContinueFromLast : undefined}
        currentChapter={progress.currentChapter}
        currentScene={progress.currentScene}
      />
    );
  }

  // Test View
  if (viewMode === 'test') {
    const chapter = storyChapters.find(ch => ch.id === currentChapter);
    return (
      <div>
        <div className="bg-white dark:bg-gray-800 p-4 shadow-md">
          <Link
            href="/"
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 transition-colors inline-flex items-center gap-2"
          >
            <Home size={16} />
            Back to Home
          </Link>
        </div>
        <ItalianTestSystem 
          level={chapter?.level || 'A1'}
          storyId={currentChapter}
          onTestComplete={handleTestComplete}
        />
      </div>
    );
  }

  // Conversation Practice View
  if (viewMode === 'conversation') {
    return (
      <div>
        <div className="bg-white dark:bg-gray-800 p-4 shadow-md">
          <div className="flex justify-between items-center">
            <Link
              href="/"
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 transition-colors inline-flex items-center gap-2"
            >
              <Home size={16} />
              Back to Home
            </Link>
            <button
              onClick={handleConversationComplete}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              ← Back to Story Map
            </button>
          </div>
        </div>
        <AIConversationAgent />
      </div>
    );
  }

  // Story Scene View
  const chapter = storyChapters.find(ch => ch.id === currentChapter);
  const scene = chapter?.scenes[currentScene];

  if (!chapter || !scene) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-orange-900 dark:to-red-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 transition-colors inline-flex items-center gap-2"
              >
                <Home size={16} />
                Home
              </Link>
              <button
                onClick={() => {
                  setViewMode('map');
                  saveProgress();
                }}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 transition-colors"
              >
                ← Back to Map
              </button>
            </div>
            
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {chapter.title}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Scene {currentScene + 1} of {chapter.scenes.length}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="flex items-center gap-2">
                  <Trophy className="text-yellow-500" size={24} />
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">{totalXP}</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Total XP</p>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all"
              style={{ width: `${((currentScene + 1) / chapter.scenes.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Scene Content */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Location */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden mb-8">
          {/* Background Image */}
          <div 
            className="h-64 bg-cover bg-center relative"
            style={{ 
              backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${scene.backgroundImage})`,
              backgroundColor: '#3b82f6' // Fallback color
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-6xl mb-4">📍</div>
                <h2 className="text-4xl font-bold drop-shadow-lg">{scene.location}</h2>
              </div>
            </div>
          </div>

          {/* Dialogue */}
          <div className="p-8 space-y-6">
            {scene.dialogue.map((line, index) => (
              <div
                key={index}
                className={`flex gap-4 ${line.character === 'You' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] ${
                    line.character === 'You'
                      ? 'bg-blue-100 dark:bg-blue-900'
                      : 'bg-gray-100 dark:bg-gray-700'
                  } rounded-2xl p-6 shadow-md`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-3xl">
                      {scene.characters.find(c => c.name === line.character)?.avatar || '👤'}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">{line.character}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {scene.characters.find(c => c.name === line.character)?.role}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {/* Italian text */}
                    <div className="flex items-center gap-3">
                      <p className="text-xl font-semibold text-gray-900 dark:text-white flex-1">
                        {line.italian}
                      </p>
                      <button
                        onClick={() => speakText(line.italian)}
                        className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors flex-shrink-0"
                      >
                        <Volume2 size={20} />
                      </button>
                    </div>

                    {/* English translation */}
                    <p className="text-gray-600 dark:text-gray-300 italic">
                      "{line.english}"
                    </p>

                    {/* Grammar note */}
                    {line.grammar && (
                      <div className="mt-4 pt-4 border-t border-gray-300 dark:border-gray-600">
                        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-1">
                          💡 Grammar Tip:
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {line.grammar}
                        </p>
                      </div>
                    )}

                    {/* Emphasized words */}
                    {line.emphasis && line.emphasis.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {line.emphasis.map((word, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-yellow-200 dark:bg-yellow-800 text-yellow-900 dark:text-yellow-200 rounded-full text-sm font-medium"
                          >
                            {word}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Choices */}
        {scene.choices && scene.choices.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <MessageCircle className="text-blue-600" />
              How do you respond?
            </h3>

            <div className="space-y-4">
              {scene.choices.map((choice, index) => (
                <button
                  key={index}
                  onClick={() => handleChoiceSelect(index)}
                  disabled={selectedChoice !== null}
                  className={`w-full p-6 text-left rounded-2xl border-2 transition-all transform hover:scale-[1.02] ${
                    selectedChoice === index
                      ? choice.correct
                        ? 'bg-green-50 dark:bg-green-900/30 border-green-500'
                        : 'bg-red-50 dark:bg-red-900/30 border-red-500'
                      : 'bg-gray-50 dark:bg-gray-700 border-transparent hover:border-blue-500'
                  } ${selectedChoice !== null && selectedChoice !== index ? 'opacity-50' : ''}`}
                >
                  <p className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {choice.italian}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                    {choice.english}
                  </p>

                  {/* Feedback */}
                  {showFeedback && selectedChoice === index && (
                    <div className={`mt-4 pt-4 border-t ${choice.correct ? 'border-green-300' : 'border-red-300'}`}>
                      <p className={`text-sm font-medium ${choice.correct ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                        {choice.feedback}
                      </p>
                      {choice.correct && (
                        <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                          +{choice.xp} XP
                        </p>
                      )}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Learning Goals */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/30 rounded-2xl p-6">
          <h4 className="font-bold text-blue-900 dark:text-blue-200 mb-3 flex items-center gap-2">
            <BookOpen size={20} />
            Learning Goals for This Scene:
          </h4>
          <ul className="space-y-2">
            {scene.learningGoals.map((goal, index) => (
              <li key={index} className="flex items-center gap-2 text-blue-800 dark:text-blue-300">
                <CheckCircle size={16} className="flex-shrink-0" />
                <span>{goal}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function StoryMap({ 
  chapters, 
  completedChapters, 
  totalXP, 
  onChapterSelect,
  onContinueFromLast,
  currentChapter,
  currentScene
}: {
  chapters: StoryChapter[];
  completedChapters: number[];
  totalXP: number;
  onChapterSelect: (id: number) => void;
  onContinueFromLast?: () => void;
  currentChapter: number;
  currentScene: number;
}) {
  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Link
            href="/"
            className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors inline-flex items-center gap-2 shadow-md"
          >
            <Home size={16} />
            Back to Home
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
            🇮🇹 Lost in Italy
          </h1>
          <p className="text-2xl text-gray-700 dark:text-gray-300 mb-6">
            Your Italian Learning Adventure
          </p>
          <div className="inline-flex items-center gap-3 bg-yellow-400 dark:bg-yellow-600 text-gray-900 px-8 py-4 rounded-full text-2xl font-bold shadow-lg">
            <Trophy size={32} />
            {totalXP} XP
          </div>
        </div>

        {/* Continue Button */}
        {onContinueFromLast && currentChapter > 1 && (
          <div className="mb-8 text-center">
            <button
              onClick={onContinueFromLast}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold text-xl hover:shadow-2xl transform hover:scale-105 transition-all inline-flex items-center gap-3"
            >
              <ArrowRight size={24} />
              Continue Chapter {currentChapter}, Scene {currentScene + 1}
            </button>
          </div>
        )}

        {/* Level Sections */}
        {levels.map(level => {
          const levelChapters = chapters.filter(ch => ch.level === level);
          
          return (
            <div key={level} className="mb-12">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Level {level} - {getLevelName(level)}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {levelChapters.map(chapter => {
                  const isCompleted = completedChapters.includes(chapter.id);
                  const isUnlocked = chapter.id === 1 || completedChapters.includes(chapter.id - 1);
                  
                  return (
                    <button
                      key={chapter.id}
                      onClick={() => isUnlocked && onChapterSelect(chapter.id)}
                      disabled={!isUnlocked}
                      className={`relative p-6 rounded-2xl shadow-xl transform transition-all hover:scale-105 text-left ${
                        isCompleted
                          ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white'
                          : isUnlocked
                          ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:shadow-2xl'
                          : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {/* Lock Icon */}
                      {!isUnlocked && (
                        <div className="absolute top-4 right-4">
                          <Lock size={32} className="text-gray-400" />
                        </div>
                      )}

                      {/* Completed Badge */}
                      {isCompleted && (
                        <div className="absolute top-4 right-4">
                          <CheckCircle size={32} className="text-white" />
                        </div>
                      )}

                      {/* Chapter Info */}
                      <div className="mb-4">
                        <div className="text-5xl mb-3">{getChapterEmoji(chapter.id)}</div>
                        <h3 className="text-2xl font-bold mb-2">{chapter.title}</h3>
                        <p className={`text-sm mb-4 ${isCompleted ? 'text-white/90' : 'text-gray-600 dark:text-gray-400'}`}>
                          {chapter.description}
                        </p>
                      </div>

                      {/* Stats */}
                      <div className="flex justify-between items-center text-sm">
                        <span className={isCompleted ? 'text-white/90' : 'text-gray-500'}>
                          ⏱️ {chapter.estimatedTime}
                        </span>
                        <span className={`font-bold ${isCompleted ? 'text-white' : 'text-yellow-600'}`}>
                          +{chapter.xpReward} XP
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function getLevelName(level: string): string {
  const names: { [key: string]: string } = {
    'A1': 'Absolute Beginner',
    'A2': 'Elementary',
    'B1': 'Intermediate',
    'B2': 'Upper-Intermediate',
    'C1': 'Advanced',
    'C2': 'Mastery'
  };
  return names[level] || level;
}

function getChapterEmoji(id: number): string {
  const emojis = ['🛬', '🏨', '🍕', '🗺️', '🛒', '☕', '🚇', '📱', '🏛️', '🎭',
                  '🏠', '🚗', '👨‍⚕️', '💼', '🎉', '🏋️', '🌳', '📚', '🍷', '💑',
                  '🎓', '🏢', '🏛️', '🚑', '🏦', '📺', '🎭', '🍳', '🏃', '🎄',
                  '⚖️', '📰', '🏛️', '🔬', '🎨', '💼', '🏥', '📱', '🌍', '📖',
                  '🎓', '⚖️', '🏛️', '🎭', '💼', '📺', '⚖️', '🎤', '🎬', '🏛️'];
  return emojis[id - 1] || '📖';
}

