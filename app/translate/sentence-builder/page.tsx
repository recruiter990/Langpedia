'use client';

import { useState } from 'react';
import Link from 'next/link';
import { languages, getLanguageByCode } from '@/lib/languages';
import { translateText } from '@/lib/translation';
import { loadUserProfile } from '@/lib/user';
import { speak, languageCodes } from '@/lib/speech';

export default function SentenceBuilderPage() {
  const profile = loadUserProfile();
  const [targetLang, setTargetLang] = useState(profile?.targetLanguage || 'it');
  const [englishSentence, setEnglishSentence] = useState('');
  const [translatedSentence, setTranslatedSentence] = useState('');
  const [grammarBreakdown, setGrammarBreakdown] = useState<any[]>([]);
  const [isBuilding, setIsBuilding] = useState(false);

  const handleBuildSentence = async () => {
    if (!englishSentence.trim()) return;

    setIsBuilding(true);
    try {
      const translated = await translateText(englishSentence, 'en', targetLang);
      setTranslatedSentence(translated);
      
      // Simple grammar breakdown (in a real app, this would use NLP)
      const words = englishSentence.toLowerCase().split(' ');
      const breakdown = words.map((word, index) => {
        // This is a simplified breakdown - in production, use proper NLP
        let part = 'word';
        let gender = '';
        
        if (['i', 'you', 'he', 'she', 'we', 'they'].includes(word)) {
          part = 'pronoun';
        } else if (['want', 'eat', 'go', 'see', 'have', 'be', 'is', 'are', 'am'].includes(word)) {
          part = 'verb';
        } else if (['the', 'a', 'an'].includes(word)) {
          part = 'article';
        } else if (['to', 'in', 'on', 'at', 'for', 'with'].includes(word)) {
          part = 'preposition';
        }
        
        return {
          english: word,
          italian: translated.split(' ')[index] || '',
          part,
          gender,
        };
      });
      
      setGrammarBreakdown(breakdown);
    } catch (error) {
      console.error('Error building sentence:', error);
      setTranslatedSentence('Error building sentence. Please try again.');
    } finally {
      setIsBuilding(false);
    }
  };

  const handleSpeak = (text: string) => {
    speak(text, languageCodes[targetLang] || 'it-IT');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-heading font-bold text-text">Sentence Builder</h1>
            <Link href="/translate" className="text-primary hover:underline">Back to Translator</Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <label className="block text-sm font-semibold text-text mb-2">
            Target Language
          </label>
          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.name}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          {/* Input */}
          <div>
            <label className="block text-sm font-semibold text-text mb-2">
              Write in English:
            </label>
            <textarea
              value={englishSentence}
              onChange={(e) => setEnglishSentence(e.target.value)}
              placeholder="I want to eat pizza"
              className="w-full h-32 p-4 border-2 border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none font-mono"
            />
          </div>

          {/* Build Button */}
          <div className="text-center">
            <button
              onClick={handleBuildSentence}
              disabled={!englishSentence.trim() || isBuilding}
              className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isBuilding ? 'Building...' : '✨ Build Sentence'}
            </button>
          </div>

          {/* Translated Sentence */}
          {translatedSentence && (
            <div>
              <label className="block text-sm font-semibold text-text mb-2">
                📝 Proper Sentence ({getLanguageByCode(targetLang)?.name}):
              </label>
              <div className="p-4 bg-primary/10 rounded-lg border-2 border-primary/20">
                <div className="text-xl font-mono text-text mb-2">{translatedSentence}</div>
                <button
                  onClick={() => handleSpeak(translatedSentence)}
                  className="text-sm text-primary hover:underline"
                >
                  🔊 Listen to pronunciation
                </button>
              </div>
            </div>
          )}

          {/* Grammar Breakdown */}
          {grammarBreakdown.length > 0 && (
            <div>
              <label className="block text-sm font-semibold text-text mb-2">
                🔍 Grammar Breakdown:
              </label>
              <div className="space-y-2">
                {grammarBreakdown.map((item, index) => (
                  <div
                    key={index}
                    className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-text">{item.english}</span>
                        <span className="text-text-light mx-2">→</span>
                        <span className="font-mono text-primary">{item.target || item.italian}</span>
                      </div>
                      <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded">
                        {item.part}
                      </span>
                    </div>
                    {item.gender && (
                      <div className="text-xs text-text-light mt-1">
                        Gender: {item.gender}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Alternative Ways */}
          {translatedSentence && (
            <div>
              <label className="block text-sm font-semibold text-text mb-2">
                💡 Alternative Ways to Say It:
              </label>
              <div className="p-4 bg-secondary/10 rounded-lg border border-secondary/20">
                <p className="text-text-light text-sm">
                  Try rephrasing your sentence to learn different structures. For example:
                </p>
                <ul className="list-disc list-inside mt-2 text-text-light text-sm space-y-1">
                  <li>Use different verb tenses</li>
                  <li>Try formal vs informal forms</li>
                  <li>Experiment with word order</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

