'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { languages } from '@/lib/languages';
import { hasCompletedOnboarding, loadUserProfile, saveUserProfile } from '@/lib/user';
import LanguageCard from '@/components/LanguageCard';
import OnboardingModal from '@/components/OnboardingModal';
import Link from 'next/link';

export default function HomePage() {
  const router = useRouter();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  useEffect(() => {
    // Check if user has completed onboarding
    if (!hasCompletedOnboarding()) {
      // Don't auto-show, wait for user to click "Start Learning"
    }
  }, []);

  const handleStartLearning = () => {
    if (hasCompletedOnboarding()) {
      router.push('/learn');
    } else {
      setShowOnboarding(true);
    }
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    router.push('/learn');
  };

  const handleLanguageSelect = (code: string) => {
    setSelectedLanguage(code);
    // Save selected language temporarily to form data if onboarding is open
    if (showOnboarding) {
      // Language will be saved in onboarding modal
      return;
    }
    // If user already has profile, update it
    const profile = loadUserProfile();
    if (profile) {
      profile.targetLanguage = code;
      saveUserProfile(profile);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🌍</span>
              <h1 className="text-2xl font-heading font-bold text-text">LearnLanguages</h1>
            </div>
            <nav className="hidden md:flex gap-6">
              <Link href="/translate" className="text-text-light hover:text-primary transition-colors">
                Translator
              </Link>
              <Link href="/learn" className="text-text-light hover:text-primary transition-colors">
                Learn
              </Link>
              <Link href="/story-mode" className="text-text-light hover:text-primary transition-colors">
                📖 Story Mode
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-heading font-bold text-text mb-6">
          Master Any European Language
          <br />
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Free & Interactive
          </span>
        </h1>
        <p className="text-xl text-text-light mb-8 max-w-2xl mx-auto">
          Learn through real conversations, instant translation, and gamified lessons
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleStartLearning}
            className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            Start Learning Now
          </button>
          <Link
            href="/translate"
            className="px-8 py-4 bg-white border-2 border-primary text-primary rounded-lg font-semibold text-lg hover:bg-primary/5 transition-all"
          >
            Try Translator
          </Link>
        </div>

        {/* Floating Language Flags Animation */}
        <div className="mt-16 relative h-32 overflow-hidden">
          {languages.slice(0, 8).map((lang, index) => (
            <div
              key={lang.code}
              className="absolute text-4xl animate-bounce-subtle"
              style={{
                left: `${(index * 12.5) + 5}%`,
                animationDelay: `${index * 0.2}s`,
              }}
            >
              {lang.flag}
            </div>
          ))}
        </div>
      </section>

      {/* Language Selection Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-heading font-bold text-text text-center mb-12">
          Choose Your Language
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {languages.map((lang) => (
            <LanguageCard
              key={lang.code}
              language={lang}
              onClick={() => handleLanguageSelect(lang.code)}
              isSelected={selectedLanguage === lang.code}
            />
          ))}
        </div>
      </section>

      {/* Features Showcase */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold text-text text-center mb-12">
            Why Choose LearnLanguages?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🌍', title: '15 European Languages', desc: 'Learn any language you want' },
              { icon: '💬', title: 'Instant Translation', desc: 'Type and translate in real-time' },
              { icon: '🎮', title: 'Gamified Learning', desc: 'Earn points, streaks, and badges' },
              { icon: '🎯', title: 'Smart Lessons', desc: 'From basics to advanced' },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-card border border-gray-200 hover:shadow-lg transition-all transform hover:scale-105"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="font-heading font-bold text-lg text-text mb-2">{feature.title}</h3>
                <p className="text-text-light">{feature.desc}</p>
              </div>
            ))}
          </div>
          
          {/* Story Mode Feature Card */}
          <div className="mt-8 max-w-4xl mx-auto">
            <div className="p-8 rounded-2xl bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 text-white shadow-2xl">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="text-7xl">📖</div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-3xl font-heading font-bold mb-3">
                    Interactive Story Mode
                  </h3>
                  <p className="text-lg text-white/90 mb-4">
                    Learn Italian through 50 engaging stories from beginner to advanced. 
                    Experience real-world scenarios, earn XP, and unlock new chapters as you progress!
                  </p>
                  <Link
                    href="/story-mode"
                    className="inline-block px-8 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105"
                  >
                    Start Your Journey →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-heading font-bold text-text text-center mb-12">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: '1', title: 'Choose Your Language', desc: 'Select from 15 European languages' },
            { step: '2', title: 'Learn & Practice', desc: 'Interactive lessons with quizzes' },
            { step: '3', title: 'Track Progress', desc: 'Watch your fluency grow daily' },
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="font-heading font-bold text-xl text-text mb-2">{item.title}</h3>
              <p className="text-text-light">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '10,000+', label: 'Active Learners' },
              { number: '50,000+', label: 'Lessons Completed' },
              { number: '15', label: 'Languages Supported' },
              { number: '100%', label: 'Free Forever' },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-4xl md:text-5xl font-heading font-bold mb-2">{stat.number}</div>
                <div className="text-white/90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-4xl font-heading font-bold text-text mb-4">
          Start Your Language Learning Journey Today
        </h2>
        <p className="text-xl text-text-light mb-8">
          Join 10,000+ learners mastering European languages
        </p>
        <button
          onClick={handleStartLearning}
          className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition-all"
        >
          Start Learning Free
        </button>
        <p className="text-sm text-text-light mt-4">
          100% free forever. No credit card required.
        </p>
      </section>

      {/* Onboarding Modal */}
      <OnboardingModal
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        onComplete={handleOnboardingComplete}
      />
    </div>
  );
}

