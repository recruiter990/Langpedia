'use client';

import { useState, useEffect } from 'react';
import { languages, getLanguageByCode } from '@/lib/languages';
import Link from 'next/link';

type SavedTranslation = {
  id: string;
  original: string;
  translated: string;
  fromLang: string;
  toLang: string;
  timestamp: number;
};

export default function SavedPage() {
  const [savedTranslations, setSavedTranslations] = useState<SavedTranslation[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const saved = localStorage.getItem('saved-translations');
    if (saved) {
      try {
        setSavedTranslations(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load saved translations:', e);
      }
    }
  }, []);

  const handleDelete = (id: string) => {
    if (typeof window === 'undefined') return;
    
    const updated = savedTranslations.filter(t => t.id !== id);
    setSavedTranslations(updated);
    localStorage.setItem('saved-translations', JSON.stringify(updated));
  };

  const handleCopy = (text: string) => {
    if (typeof window === 'undefined') return;
    navigator.clipboard.writeText(text);
  };

  const filteredTranslations = savedTranslations.filter(t =>
    t.original.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.translated.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-heading font-bold text-text">Saved Translations</h1>
            <Link href="/translate" className="text-primary hover:underline">Back to Translator</Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search translations..."
            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Translations List */}
        {filteredTranslations.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-heading font-bold text-text mb-2">
              No saved translations yet
            </h3>
            <p className="text-text-light mb-6">
              Save translations from the translator to see them here
            </p>
            <Link
              href="/translate"
              className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              Go to Translator
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTranslations.map((trans) => (
              <div
                key={trans.id}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2 text-sm text-text-light">
                    <span>
                      {getLanguageByCode(trans.fromLang)?.flag}{' '}
                      {getLanguageByCode(trans.fromLang)?.name}
                    </span>
                    <span>→</span>
                    <span>
                      {getLanguageByCode(trans.toLang)?.flag}{' '}
                      {getLanguageByCode(trans.toLang)?.name}
                    </span>
                    <span className="ml-4">
                      {new Date(trans.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDelete(trans.id)}
                    className="text-error hover:text-error-dark transition-colors"
                    title="Delete"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-text-light mb-1">Original</div>
                    <div className="font-mono text-text">{trans.original}</div>
                  </div>
                  <div>
                    <div className="text-xs text-text-light mb-1">Translation</div>
                    <div className="font-mono text-primary">{trans.translated}</div>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleCopy(trans.original)}
                    className="px-3 py-1 text-xs bg-gray-100 text-text rounded hover:bg-gray-200 transition-colors"
                  >
                    Copy Original
                  </button>
                  <button
                    onClick={() => handleCopy(trans.translated)}
                    className="px-3 py-1 text-xs bg-primary text-white rounded hover:bg-primary-dark transition-colors"
                  >
                    Copy Translation
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

