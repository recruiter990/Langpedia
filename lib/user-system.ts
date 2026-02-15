/**
 * User System - Manages all user data in localStorage
 * Handles profile, story progress, conversation stats, and test results
 */

export interface UserProfile {
  name: string;
  nativeLanguage: string;
  targetLanguage: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  learningGoal: string;
  dailyGoalMinutes: number;
  createdAt: number;
  hasCompletedOnboarding: boolean;
}

export interface StoryProgress {
  currentChapter: number;
  currentScene: number;
  totalXP: number;
  completedChapters: number[];
  lastUpdated: number;
}

export interface ConversationStats {
  messagesExchanged: number;
  correctResponses: number;
  wordsLearned: string[];
  grammarPoints: string[];
  scenariosCompleted: string[];
  totalSessions: number;
  lastSessionDate: number;
}

export interface TestResult {
  chapterId: number;
  score: number;
  passed: boolean;
  date: number;
  timeSpent: number;
}

export interface TestResults {
  [chapterId: number]: TestResult;
}

export interface AllUserData {
  profile: UserProfile | null;
  storyProgress: StoryProgress | null;
  conversationStats: ConversationStats | null;
  testResults: TestResults;
}

// ============================================
// USER PROFILE FUNCTIONS
// ============================================

export function getUserProfile(): UserProfile | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem('user-profile');
    if (!stored) return null;
    return JSON.parse(stored) as UserProfile;
  } catch (error) {
    console.error('Error loading user profile:', error);
    return null;
  }
}

export function saveUserProfile(profile: UserProfile): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('user-profile', JSON.stringify(profile));
  } catch (error) {
    console.error('Error saving user profile:', error);
  }
}

export function hasCompletedOnboarding(): boolean {
  const profile = getUserProfile();
  return profile?.hasCompletedOnboarding === true;
}

// ============================================
// STORY PROGRESS FUNCTIONS
// ============================================

export function getStoryProgress(): StoryProgress {
  if (typeof window === 'undefined') {
    return getDefaultStoryProgress();
  }
  
  try {
    const stored = localStorage.getItem('story-progress');
    if (!stored) return getDefaultStoryProgress();
    return JSON.parse(stored) as StoryProgress;
  } catch (error) {
    console.error('Error loading story progress:', error);
    return getDefaultStoryProgress();
  }
}

export function saveStoryProgress(progress: StoryProgress): void {
  if (typeof window === 'undefined') return;
  
  try {
    const updated = {
      ...progress,
      lastUpdated: Date.now()
    };
    localStorage.setItem('story-progress', JSON.stringify(updated));
  } catch (error) {
    console.error('Error saving story progress:', error);
  }
}

export function resetStoryProgress(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem('story-progress');
  } catch (error) {
    console.error('Error resetting story progress:', error);
  }
}

function getDefaultStoryProgress(): StoryProgress {
  return {
    currentChapter: 1,
    currentScene: 0,
    totalXP: 0,
    completedChapters: [],
    lastUpdated: Date.now()
  };
}

// ============================================
// CONVERSATION STATS FUNCTIONS
// ============================================

export function getConversationStats(): ConversationStats {
  if (typeof window === 'undefined') {
    return getDefaultConversationStats();
  }
  
  try {
    const stored = localStorage.getItem('conversation-stats');
    if (!stored) return getDefaultConversationStats();
    return JSON.parse(stored) as ConversationStats;
  } catch (error) {
    console.error('Error loading conversation stats:', error);
    return getDefaultConversationStats();
  }
}

export function saveConversationStats(stats: ConversationStats): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('conversation-stats', JSON.stringify(stats));
  } catch (error) {
    console.error('Error saving conversation stats:', error);
  }
}

function getDefaultConversationStats(): ConversationStats {
  return {
    messagesExchanged: 0,
    correctResponses: 0,
    wordsLearned: [],
    grammarPoints: [],
    scenariosCompleted: [],
    totalSessions: 0,
    lastSessionDate: Date.now()
  };
}

// ============================================
// TEST RESULTS FUNCTIONS
// ============================================

export function getTestResults(): TestResults {
  if (typeof window === 'undefined') {
    return {};
  }
  
  try {
    const stored = localStorage.getItem('test-results');
    if (!stored) return {};
    return JSON.parse(stored) as TestResults;
  } catch (error) {
    console.error('Error loading test results:', error);
    return {};
  }
}

export function saveTestResult(chapterId: number, score: number, passed: boolean, timeSpent: number = 0): void {
  if (typeof window === 'undefined') return;
  
  try {
    const results = getTestResults();
    results[chapterId] = {
      chapterId,
      score,
      passed,
      date: Date.now(),
      timeSpent
    };
    localStorage.setItem('test-results', JSON.stringify(results));
  } catch (error) {
    console.error('Error saving test result:', error);
  }
}

// ============================================
// COMBINED DATA FUNCTION
// ============================================

export function getAllUserData(): AllUserData {
  return {
    profile: getUserProfile(),
    storyProgress: getStoryProgress(),
    conversationStats: getConversationStats(),
    testResults: getTestResults()
  };
}

