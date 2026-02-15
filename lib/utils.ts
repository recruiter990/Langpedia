// Legacy utilities - kept for backward compatibility
// New learn page uses category-based system instead

export function calculateLevelProgress(level: number, progress: Record<string, boolean>): number {
  // Simplified progress calculation for new structure
  if (typeof window === 'undefined') return 0;
  return 0; // Placeholder - new system doesn't use levels
}

export function calculateOverallProgress(progress: Record<string, boolean>): number {
  if (typeof window === 'undefined') return 0;
  const keys = Object.keys(progress);
  const completed = keys.filter(key => progress[key]).length;
  return keys.length > 0 ? Math.round((completed / keys.length) * 100) : 0;
}

export function isLevelUnlocked(level: number, progress: Record<string, boolean>): boolean {
  // Always unlock level 1, others require 70% completion
  if (level === 1) return true;
  return true; // Simplified for new structure
}

