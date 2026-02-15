'use client';

import { useState, useEffect } from 'react';
import { loadUserProfile, UserProfile } from '@/lib/user';
import { speak, languageCodes } from '@/lib/speech';
import { languages, getLanguageByCode } from '@/lib/languages';
import { getCachedTranslation, setCachedTranslation } from '@/lib/translation';
import Link from 'next/link';

export default function TranslatePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [fromLang, setFromLang] = useState('en');
  const [toLang, setToLang] = useState('it');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [recentTranslations, setRecentTranslations] = useState<Array<{
    id: string;
    original: string;
    translated: string;
    fromLang: string;
    toLang: string;
    timestamp: number;
  }>>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const userProfile = loadUserProfile();
    setProfile(userProfile);
    if (userProfile?.targetLanguage) {
      setToLang(userProfile.targetLanguage);
    }
    
    // Load recent translations
    const saved = localStorage.getItem('saved-translations');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setRecentTranslations(parsed.slice(0, 5));
      } catch (e) {
        console.error('Failed to load recent translations:', e);
      }
    }
  }, []);

  const translateText = async () => {
    if (!inputText.trim()) {
      setError('Please enter text to translate');
      return;
    }

    setIsLoading(true);
    setError('');

    // Check cache first
    const cached = getCachedTranslation(inputText, fromLang, toLang);
    if (cached) {
      setTranslatedText(cached);
      setIsLoading(false);
      setTimeout(() => {
        speak(cached, languageCodes[toLang]);
      }, 300);
      return;
    }

    try {
      const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
        inputText
      )}&langpair=${fromLang}|${toLang}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.responseData && data.responseData.translatedText) {
        const translated = data.responseData.translatedText;
        setTranslatedText(translated);
        
        // Cache the translation
        setCachedTranslation(inputText, fromLang, toLang, translated);
        
        // Add to recent translations
        const newTranslation = {
          id: Date.now().toString(),
          original: inputText,
          translated,
          fromLang,
          toLang,
          timestamp: Date.now(),
        };
        const updated = [newTranslation, ...recentTranslations].slice(0, 5);
        setRecentTranslations(updated);

        // Auto-play pronunciation
        setTimeout(() => {
          speak(translated, languageCodes[toLang]);
        }, 300);
      } else {
        setError('Translation failed. Please try again.');
      }
    } catch (err) {
      console.error('Translation error:', err);
      setError('Translation failed. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSave = () => {
    if (!inputText || !translatedText || typeof window === 'undefined') return;
    
    const saved = localStorage.getItem('saved-translations');
    const existing = saved ? JSON.parse(saved) : [];
    
    const newTranslation = {
      id: Date.now().toString(),
      original: inputText,
      translated: translatedText,
      fromLang,
      toLang,
      timestamp: Date.now(),
    };
    
    const updated = [newTranslation, ...existing];
    localStorage.setItem('saved-translations', JSON.stringify(updated));
    
    // Show success message
    alert('Translation saved!');
  };

  const swapLanguages = () => {
    const temp = fromLang;
    setFromLang(toLang);
    setToLang(temp);
    setInputText(translatedText);
    setTranslatedText(inputText);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      translateText();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-heading font-bold text-text">Translator</h1>
            <div className="flex gap-4">
              <Link href="/learn" className="text-primary hover:underline">Learn</Link>
              <Link href="/dashboard" className="text-primary hover:underline">Dashboard</Link>
              <Link href="/story-mode" className="text-primary hover:underline">📖 Story Mode</Link>
              <Link href="/translate/sentence-builder" className="text-primary hover:underline">Sentence Builder</Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Language Selector */}
        <div className="flex items-center gap-4 mb-6">
          <select
            value={fromLang}
            onChange={(e) => setFromLang(e.target.value)}
            className="flex-1 p-4 border-2 border-gray-200 rounded-xl bg-white font-semibold text-lg focus:border-primary focus:outline-none"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.name}
              </option>
            ))}
            <option value="en">🇬🇧 English</option>
          </select>

          <button
            onClick={swapLanguages}
            className="p-4 bg-gray-200 rounded-xl hover:bg-gray-300 transition-colors text-2xl"
            title="Swap languages"
          >
            ⇄
          </button>

          <select
            value={toLang}
            onChange={(e) => setToLang(e.target.value)}
            className="flex-1 p-4 border-2 border-gray-200 rounded-xl bg-white font-semibold text-lg focus:border-primary focus:outline-none"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.name}
              </option>
            ))}
            <option value="en">🇬🇧 English</option>
          </select>
        </div>

        {/* Input Area */}
        <div className="bg-white rounded-xl p-6 mb-6 border-2 border-gray-200 shadow-lg">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type something to translate..."
            className="w-full h-40 p-4 border-2 border-gray-200 rounded-lg resize-none focus:border-primary focus:outline-none text-lg"
            maxLength={500}
          />
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-text-light">
              {inputText.length} / 500 characters
              <span className="ml-4 text-xs">Press Ctrl+Enter to translate</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => speak(inputText, languageCodes[fromLang])}
                disabled={!inputText.trim()}
                className="px-6 py-3 bg-secondary text-white rounded-lg hover:bg-secondary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold"
              >
                🔊 Listen
              </button>
              <button
                onClick={translateText}
                disabled={isLoading || !inputText.trim()}
                className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold transform hover:scale-105"
              >
                {isLoading ? 'Translating...' : 'Translate ▼'}
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-xl mb-6">
            {error}
          </div>
        )}

        {/* Output Area */}
        {translatedText && (
          <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-6 border-2 border-primary/20 shadow-lg">
            <div className="text-sm font-semibold text-primary mb-2">Translation:</div>
            <div className="text-3xl font-bold text-text mb-6 leading-relaxed">
              {translatedText}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => speak(translatedText, languageCodes[toLang])}
                className="px-6 py-3 bg-secondary text-white rounded-lg hover:bg-secondary-dark transition-all font-semibold flex items-center gap-2 transform hover:scale-105"
              >
                🔊 Listen
              </button>
              <button
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    navigator.clipboard.writeText(translatedText);
                    alert('Copied to clipboard!');
                  }
                }}
                className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-dark transition-all font-semibold flex items-center gap-2 transform hover:scale-105"
              >
                📋 Copy
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all font-semibold flex items-center gap-2 transform hover:scale-105"
              >
                ⭐ Save
              </button>
            </div>
          </div>
        )}

        {/* Recent Translations */}
        {recentTranslations.length > 0 && (
          <div className="mt-8 bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-heading font-bold text-text">Recent Translations</h3>
              <Link href="/saved" className="text-sm text-primary hover:underline">
                View All →
              </Link>
            </div>
            <div className="space-y-3">
              {recentTranslations.map((trans) => (
                <div key={trans.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="text-xs text-text-light mb-1">
                    {getLanguageByCode(trans.fromLang)?.flag} {getLanguageByCode(trans.fromLang)?.name} → {getLanguageByCode(trans.toLang)?.flag} {getLanguageByCode(trans.toLang)?.name}
                  </div>
                  <div className="text-text font-medium">{trans.original}</div>
                  <div className="text-primary">{trans.translated}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Suggested Phrases */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-text mb-2">Suggested Phrases:</h3>
          <div className="flex flex-wrap gap-2">
            {[
              'Hello, how are you?',
              'Thank you very much',
              'Where is the bathroom?',
              "I don't understand",
              'Can you help me?',
            ].map((phrase, index) => (
              <button
                key={index}
                onClick={() => setInputText(phrase)}
                className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
              >
                {phrase}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
