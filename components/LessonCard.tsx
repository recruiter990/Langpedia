'use client';

import { LessonItem } from '@/data/lessons';
import { speak, languageCodes } from '@/lib/speech';
import { loadUserProfile } from '@/lib/user';

interface LessonCardProps {
  item: LessonItem;
  index: number;
  languageCode?: string;
}

export default function LessonCard({ item, index, languageCode }: LessonCardProps) {
  const profile = loadUserProfile();
  const langCode = languageCode || profile?.targetLanguage || 'it';

  return (
    <div
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 animate-fade-in"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-2xl md:text-3xl font-bold text-text mb-2">
            {item.target}
          </h3>
          <p className="text-sm md:text-base text-text-light">{item.english}</p>
          {item.pronunciation && (
            <p className="text-xs text-accent mt-1 font-mono">/{item.pronunciation}/</p>
          )}
        </div>
        <button
          onClick={() => speak(item.target, languageCodes[langCode])}
          className="ml-4 p-2 rounded-full bg-secondary text-white hover:bg-secondary-dark transition-colors duration-200 flex-shrink-0"
          aria-label="Pronounce"
          title="Click to hear pronunciation"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}



