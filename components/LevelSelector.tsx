'use client';

import { Lesson } from '@/data/lessons';
import { calculateLevelProgress, isLevelUnlocked } from '@/lib/utils';
import ProgressBar from './ProgressBar';

interface LevelSelectorProps {
  currentLevel: number;
  onLevelSelect: (level: number) => void;
  progress: Record<string, boolean>;
}

export default function LevelSelector({
  currentLevel,
  onLevelSelect,
  progress,
}: LevelSelectorProps) {
  const levels = [1, 2, 3];
  const levelNames = ['Basics', 'Essentials', 'Conversational'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {levels.map((level) => {
        const unlocked = isLevelUnlocked(level, progress);
        const levelProgress = calculateLevelProgress(level, progress);
        const isActive = currentLevel === level;

        return (
          <button
            key={level}
            onClick={() => unlocked && onLevelSelect(level)}
            disabled={!unlocked}
            className={`relative p-6 rounded-lg border-2 transition-all duration-300 ${
              isActive
                ? 'border-blue-500 bg-blue-50 shadow-lg scale-105'
                : unlocked
                ? 'border-gray-300 bg-white hover:border-blue-400 hover:shadow-md'
                : 'border-gray-200 bg-gray-100 opacity-60 cursor-not-allowed'
            }`}
          >
            {!unlocked && (
              <div className="absolute top-2 right-2">
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
            )}
            
            <div className="text-left">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-slate-800">
                  Level {level}
                </h3>
                {unlocked && (
                  <span className="text-sm font-semibold text-blue-600">
                    {levelProgress}%
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 mb-3">{levelNames[level - 1]}</p>
              {unlocked && (
                <ProgressBar progress={levelProgress} showPercentage={false} />
              )}
              {!unlocked && (
                <p className="text-xs text-gray-500 mt-2">
                  Complete 70% of previous level to unlock
                </p>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}









