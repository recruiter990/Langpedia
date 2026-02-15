# 🇮🇹 Italian Learning Website

A modern, interactive Italian learning application built with Next.js 14+, TypeScript, and Tailwind CSS. This single-page application provides a comprehensive learning experience with progressive difficulty levels, interactive quizzes, and progress tracking.

## ✨ Features

### 📚 Learning Content
- **Level 1: Basics**
  - Numbers (1-100)
  - Alphabet (A-Z with Italian pronunciation)
  - Days of the week
  - Months of the year
  - Basic greetings
  - Colors

- **Level 2: Essentials**
  - Common phrases
  - Family members
  - Body parts
  - Food and drinks

- **Level 3: Conversational**
  - Verbs (present tense)
  - Questions and answers
  - Directions
  - Time and dates

### 🎯 Interactive Features
- **Progressive Learning System**: Unlock levels by completing previous ones (70% pass rate required)
- **Interactive Quizzes**: Multiple-choice questions with immediate feedback
- **Progress Tracking**: Save progress in localStorage with visual progress bars
- **Audio Pronunciation**: Click to hear Italian words using Web Speech API
- **Responsive Design**: Mobile-first design that works on all devices
- **Beautiful UI**: Clean, minimalist design with smooth animations

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository or navigate to the project directory:
```bash
cd your-project-directory
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
├── app/
│   ├── page.tsx          # Main learning interface
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles and animations
├── components/
│   ├── LessonCard.tsx    # Individual lesson item display
│   ├── QuizQuestion.tsx  # Quiz question component
│   ├── ProgressBar.tsx   # Progress visualization
│   └── LevelSelector.tsx # Level navigation component
├── data/
│   └── lessons.ts        # All Italian-English lesson content
├── lib/
│   └── utils.ts          # Utility functions for progress tracking
└── package.json
```

## 🎨 Key Components

### LessonCard
Displays Italian text (large, bold) with English translation (smaller, gray) below. Includes audio pronunciation button.

### QuizQuestion
Interactive quiz component that:
- Shows Italian word/phrase
- Provides 4 multiple-choice English options
- Shows immediate feedback (green for correct, red for incorrect)
- Displays correct answer if wrong

### ProgressBar
Visual progress indicator with gradient styling, showing completion percentage.

### LevelSelector
Level navigation with unlock system. Levels unlock after completing 70% of the previous level.

## 🔧 Technology Stack

- **Next.js 14+**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Web Speech API**: Audio pronunciation (browser-native)

## 📦 Building for Production

```bash
npm run build
npm start
```

## 🚢 Deployment to Vercel

This application is ready for Vercel deployment:

1. **Push to GitHub**: Ensure your code is in a GitHub repository

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect Next.js and configure the build
   - Click "Deploy"

3. **Automatic Deployments**: 
   - Every push to main branch triggers a new deployment
   - Preview deployments are created for pull requests

### Vercel Configuration

The project includes `vercel.json` with optimal settings:
- Build command: `npm run build`
- Framework: Next.js
- Static site generation ready

## 📱 Features in Detail

### Progress Tracking
- Progress is saved in browser localStorage
- Each completed lesson (70%+ quiz score) is marked
- Overall progress bar in header
- Level-specific progress indicators

### Quiz System
- Multiple-choice questions (4 options)
- Immediate visual feedback
- Score tracking (X/Y correct)
- Completion percentage display
- 70% pass rate required to unlock next level

### Level Unlocking
- Level 1 is always unlocked
- Level 2 unlocks after 70% completion of Level 1
- Level 3 unlocks after 70% completion of Level 2

## 🎯 Usage

1. **Select a Level**: Click on an unlocked level card
2. **Choose a Lesson**: Click on a lesson category
3. **Study the Content**: Review Italian words/phrases with English translations
4. **Take the Quiz**: Click "Start Quiz" after reviewing
5. **Answer Questions**: Select your answer and see immediate feedback
6. **Complete the Quiz**: Achieve 70%+ to mark the lesson as complete
7. **Unlock Next Level**: Complete enough lessons to unlock the next level

## 🛠️ Customization

### Adding New Lessons
Edit `data/lessons.ts` to add new lessons:

```typescript
{
  id: 'your-lesson-id',
  level: 1, // or 2, 3
  category: 'Your Category',
  items: [
    { italian: 'Italian Text', english: 'English Translation' }
  ],
  quiz: [
    {
      question: 'Italian Question',
      correctAnswer: 'Correct English Answer',
      options: ['Correct', 'Wrong 1', 'Wrong 2', 'Wrong 3']
    }
  ]
}
```

### Styling
- Colors: Edit Tailwind classes in components
- Animations: Modify `app/globals.css` for custom animations
- Theme: Update `tailwind.config.js` for color scheme changes

## 📝 Notes

- **Audio Pronunciation**: Uses browser's Web Speech API (may vary by browser)
- **Progress Storage**: Uses localStorage (clears if browser data is cleared)
- **Static Site**: No API routes needed - fully client-side
- **Mobile Responsive**: Optimized for all screen sizes

## 🐛 Troubleshooting

### Audio not working
- Check browser compatibility for Web Speech API
- Ensure microphone permissions are granted (if required)
- Try a different browser (Chrome, Firefox, Edge)

### Progress not saving
- Check browser localStorage is enabled
- Clear browser cache and try again
- Check browser console for errors

## 📄 License

This project is open source and available for personal and educational use.

## 🙏 Acknowledgments

Built with love for Italian language learners worldwide.

---

**Happy Learning! Buona fortuna! 🍀**









