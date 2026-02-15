'use client';

import { Language } from '@/lib/languages';

interface LanguageCardProps {
  language: Language;
  onClick: () => void;
  isSelected?: boolean;
}

export default function LanguageCard({ language, onClick, isSelected }: LanguageCardProps) {
  return (
    <button
      onClick={onClick}
      className={`group relative p-6 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
        isSelected
          ? 'border-primary bg-primary/10 shadow-lg scale-105'
          : 'border-gray-200 bg-white hover:border-primary/50 hover:shadow-md'
      }`}
    >
      <div className="text-center">
        <div className="text-5xl mb-3 transform group-hover:scale-110 transition-transform">
          {language.flag}
        </div>
        <h3 className="font-heading font-bold text-lg text-text mb-1">
          {language.name}
        </h3>
        <p className="text-sm text-text-light mb-2">{language.nativeName}</p>
        {language.learners && (
          <p className="text-xs text-text-light">
            {language.learners.toLocaleString()} learners
          </p>
        )}
      </div>
      
      {isSelected && (
        <div className="absolute top-2 right-2">
          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      )}
    </button>
  );
}

