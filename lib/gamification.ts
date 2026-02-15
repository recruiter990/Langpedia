export type Achievement = {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: number;
};

export type UserStats = {
  xp: number;
  currentStreak: number;
  longestStreak: number;
  totalLessons: number;
  perfectQuizzes: number;
  languagesTried: string[];
  achievements: Achievement[];
  lastLoginDate: string;
};

const defaultAchievements: Achievement[] = [
  { id: 'first-steps', name: 'First Steps', description: 'Complete your first lesson', icon: '🌟', unlocked: false },
  { id: 'week-warrior', name: 'Week Warrior', description: 'Maintain a 7-day streak', icon: '🔥', unlocked: false },
  { id: 'quiz-master', name: 'Quiz Master', description: 'Complete 50 quizzes', icon: '🏆', unlocked: false },
  { id: 'perfectionist', name: 'Perfectionist', description: 'Get 10 perfect quiz scores', icon: '💯', unlocked: false },
  { id: 'polyglot', name: 'Polyglot', description: 'Try learning 3+ languages', icon: '🌍', unlocked: false },
  { id: 'speed-learner', name: 'Speed Learner', description: 'Complete 10 lessons in one day', icon: '⚡', unlocked: false },
];

export const getDefaultStats = (): UserStats => ({
  xp: 0,
  currentStreak: 0,
  longestStreak: 0,
  totalLessons: 0,
  perfectQuizzes: 0,
  languagesTried: [],
  achievements: defaultAchievements,
  lastLoginDate: '',
});

export const loadUserStats = (): UserStats => {
  if (typeof window === 'undefined') return getDefaultStats();
  
  const saved = localStorage.getItem('user-stats');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load user stats:', e);
    }
  }
  return getDefaultStats();
};

export const saveUserStats = (stats: UserStats): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('user-stats', JSON.stringify(stats));
};

export const addXP = (amount: number): void => {
  if (typeof window === 'undefined') return;
  
  const stats = loadUserStats();
  stats.xp += amount;
  saveUserStats(stats);
};

export const updateStreak = (): void => {
  if (typeof window === 'undefined') return;
  
  const stats = loadUserStats();
  const today = new Date().toDateString();
  const lastLogin = stats.lastLoginDate;
  
  if (lastLogin === today) {
    // Already logged in today
    return;
  }
  
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toDateString();
  
  if (lastLogin === yesterdayStr) {
    // Continue streak
    stats.currentStreak += 1;
  } else if (lastLogin !== today) {
    // Reset streak
    stats.currentStreak = 1;
  }
  
  if (stats.currentStreak > stats.longestStreak) {
    stats.longestStreak = stats.currentStreak;
  }
  
  stats.lastLoginDate = today;
  saveUserStats(stats);
  
  // Award daily login XP
  addXP(5);
};

export const checkAchievements = (stats: UserStats): Achievement[] => {
  const updated = [...stats.achievements];
  
  // First Steps
  if (stats.totalLessons >= 1 && !updated.find(a => a.id === 'first-steps')?.unlocked) {
    const achievement = updated.find(a => a.id === 'first-steps');
    if (achievement) {
      achievement.unlocked = true;
      achievement.unlockedAt = Date.now();
      addXP(50);
    }
  }
  
  // Week Warrior
  if (stats.currentStreak >= 7 && !updated.find(a => a.id === 'week-warrior')?.unlocked) {
    const achievement = updated.find(a => a.id === 'week-warrior');
    if (achievement) {
      achievement.unlocked = true;
      achievement.unlockedAt = Date.now();
      addXP(100);
    }
  }
  
  // Quiz Master
  if (stats.totalLessons >= 50 && !updated.find(a => a.id === 'quiz-master')?.unlocked) {
    const achievement = updated.find(a => a.id === 'quiz-master');
    if (achievement) {
      achievement.unlocked = true;
      achievement.unlockedAt = Date.now();
      addXP(200);
    }
  }
  
  // Perfectionist
  if (stats.perfectQuizzes >= 10 && !updated.find(a => a.id === 'perfectionist')?.unlocked) {
    const achievement = updated.find(a => a.id === 'perfectionist');
    if (achievement) {
      achievement.unlocked = true;
      achievement.unlockedAt = Date.now();
      addXP(150);
    }
  }
  
  // Polyglot
  if (stats.languagesTried.length >= 3 && !updated.find(a => a.id === 'polyglot')?.unlocked) {
    const achievement = updated.find(a => a.id === 'polyglot');
    if (achievement) {
      achievement.unlocked = true;
      achievement.unlockedAt = Date.now();
      addXP(300);
    }
  }
  
  return updated;
};

export const completeLesson = (): void => {
  if (typeof window === 'undefined') return;
  
  const stats = loadUserStats();
  stats.totalLessons += 1;
  addXP(10);
  stats.achievements = checkAchievements(stats);
  saveUserStats(stats);
};

export const completePerfectQuiz = (): void => {
  if (typeof window === 'undefined') return;
  
  const stats = loadUserStats();
  stats.perfectQuizzes += 1;
  addXP(25);
  stats.achievements = checkAchievements(stats);
  saveUserStats(stats);
};

