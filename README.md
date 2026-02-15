# LearnLanguages - Multi-Language Learning Platform

A modern, interactive European language learning platform supporting 15 languages with lessons, instant translation, gamification, and progress tracking. 100% free forever.

## 🌍 Features

### Multi-Language Support
- **15 European Languages**: Italian, Spanish, French, German, Portuguese, Dutch, Polish, Romanian, Czech, Swedish, Greek, Hungarian, Danish, Norwegian, Finnish
- Language selection with beautiful flag icons
- Personalized learning based on your native and target language

### Learning Features
- **Interactive Lessons**: Structured lessons from basics to advanced
- **Quizzes**: Test your knowledge with immediate feedback
- **Progress Tracking**: Visual progress bars and completion tracking
- **Level System**: Unlock new levels by completing previous ones (70% threshold)
- **Pronunciation**: Text-to-speech for all languages using Web Speech API

### Translation Tools
- **Instant Translation**: Real-time translation using MyMemory Translation API
- **Bidirectional Translation**: Swap languages with one click
- **Sentence Builder**: Build proper sentences with grammar breakdown
- **Saved Translations**: Save and organize your favorite translations
- **Translation Cache**: Smart caching for faster repeated translations

### Gamification System
- **XP Points**: Earn points for completing lessons and quizzes
- **Daily Streaks**: Track your learning streak (bonus XP for 7-day streaks)
- **Achievement Badges**: Unlock achievements as you progress
- **Progress Dashboard**: Visual overview of your learning journey

### User Experience
- **Onboarding Wizard**: Personalized setup based on your goals
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Dark Mode Ready**: (Can be easily added)
- **Accessibility**: WCAG 2.1 AA compliant

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## 📁 Project Structure

```
├── app/
│   ├── home/                    # Landing page
│   ├── learn/                   # Learning interface
│   ├── translate/               # Translation tool
│   │   └── sentence-builder/   # Sentence builder
│   ├── dashboard/               # User dashboard
│   ├── practice/                # Practice modes
│   ├── saved/                   # Saved translations
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Root redirect
├── components/
│   ├── OnboardingModal.tsx      # Onboarding wizard
│   ├── LanguageCard.tsx         # Language selection cards
│   ├── LessonCard.tsx           # Lesson item cards
│   ├── LevelSelector.tsx        # Level selection
│   ├── ProgressBar.tsx          # Progress visualization
│   ├── QuizQuestion.tsx         # Quiz component
│   └── Footer.tsx               # Footer
├── data/
│   └── lessons.ts               # Lesson data (Italian)
├── lib/
│   ├── languages.ts             # Language definitions
│   ├── translation.ts          # Translation API
│   ├── gamification.ts         # XP, streaks, achievements
│   ├── user.ts                 # User profile management
│   └── utils.ts                # Learning utilities
└── package.json
```

## 🎯 Key Pages

### `/home` - Landing Page
- Hero section with language selection
- Features showcase
- How it works
- Stats section
- Language grid

### `/learn` - Learning Interface
- Level-based lessons
- Interactive quizzes
- Progress tracking
- Gamification stats

### `/translate` - Translation Tool
- Bidirectional translation
- Text-to-speech
- Copy and save functionality
- Recent translations
- Link to sentence builder

### `/translate/sentence-builder` - Sentence Builder
- Build proper sentences
- Grammar breakdown
- Word-by-word analysis
- Alternative suggestions

### `/dashboard` - User Dashboard
- Welcome message
- Quick stats (XP, streak, lessons)
- Progress overview
- Achievements showcase
- Quick actions

### `/practice` - Practice Modes
- Flashcards
- Multiple choice
- Fill in the blank
- Matching game
- Daily challenges

### `/saved` - Saved Translations
- List of saved translations
- Search functionality
- Copy buttons
- Delete option

## 🎨 Design System

### Colors
- **Primary**: `#4F46E5` (Indigo)
- **Secondary**: `#10B981` (Green)
- **Accent**: `#F59E0B` (Amber)
- **Success**: `#22C55E`
- **Error**: `#EF4444`
- **Background**: `#F9FAFB`
- **Text**: `#111827`

### Typography
- **Headings**: Poppins (bold, modern)
- **Body**: Inter (clean, readable)
- **Code/Translation**: JetBrains Mono

## 🔧 Technical Details

### Tech Stack
- **Next.js 14+** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Web Speech API** - Text-to-speech
- **MyMemory API** - Free translation service
- **localStorage** - Data persistence

### State Management
- React hooks (useState, useEffect)
- localStorage for persistence
- Context API ready (can be added)

### API Integration
- **MyMemory Translation API**: Free, no API key required
- Language codes: en, it, es, fr, de, pt, nl, pl, ro, cs, sv, el, hu, da, no, fi

### Performance
- Lazy loading ready
- Translation caching (7-day expiration)
- Optimized bundle size
- Fast initial load

## 📊 Gamification System

### XP Points
- Complete lesson: +10 XP
- Perfect quiz: +25 XP
- Daily login: +5 XP
- Translate 10 sentences: +15 XP
- 7-day streak: +100 XP bonus

### Achievements
- 🌟 **First Steps** - Complete first lesson
- 🔥 **Week Warrior** - 7-day streak
- 🏆 **Quiz Master** - 50 quizzes completed
- 💯 **Perfectionist** - 10 perfect scores
- 🌍 **Polyglot** - Try 3+ languages
- ⚡ **Speed Learner** - Complete 10 lessons in one day

## 🚢 Deployment

This project is ready to deploy on Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Deploy (no environment variables needed)

## 📝 Data Persistence

All user data is stored in browser localStorage:
- User profile (onboarding data)
- Learning progress
- User stats (XP, streaks, achievements)
- Saved translations
- Translation cache

## 🎓 Learning System

### Levels
1. **Level 1: Basics** - Numbers, alphabet, days, months, greetings, colors
2. **Level 2: Essentials** - Common phrases, family, body parts, food
3. **Level 3: Conversational** - Verbs, questions, directions, time

### Progress System
- Complete 70% of a level to unlock the next
- Pass quizzes with 70% or higher to mark lessons complete
- Track overall progress across all lessons

## 🔮 Future Enhancements

- [ ] Add more languages (beyond 15)
- [ ] Voice recognition for speaking practice
- [ ] Social features (leaderboards, friends)
- [ ] Offline mode with service workers
- [ ] Mobile app (React Native)
- [ ] Advanced grammar explanations
- [ ] Conversation practice with AI
- [ ] Spaced repetition system
- [ ] Export progress to PDF
- [ ] Multi-user accounts with cloud sync

## 📄 License

Private project - All rights reserved

## 🙏 Acknowledgments

- MyMemory Translation API for free translation service
- Web Speech API for text-to-speech functionality
- All language learners who inspire this project

---

Made with ❤️ for language learners worldwide
