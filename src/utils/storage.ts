import { DailyPost, UserStats } from '../types';

const POSTS_KEY = 'leetcode-tracker-posts';
const STATS_KEY = 'leetcode-tracker-stats';

export const loadPosts = (): DailyPost[] => {
  try {
    const stored = localStorage.getItem(POSTS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const savePosts = (posts: DailyPost[]): void => {
  try {
    localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
  } catch (error) {
    console.error('Failed to save posts:', error);
  }
};

export const loadStats = (): UserStats | null => {
  try {
    const stored = localStorage.getItem(STATS_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

export const saveStats = (stats: UserStats): void => {
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch (error) {
    console.error('Failed to save stats:', error);
  }
};

export const calculateStats = (posts: DailyPost[]): UserStats => {
  const totalProblems = posts.reduce((sum, post) => sum + post.problemsSolved, 0);
  const currentDay = Math.max(...posts.map(p => p.day), 0);
  
  // Calculate streak
  const sortedPosts = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  let currentStreak = 0;
  let maxStreak = 0;
  let tempStreak = 0;
  
  const today = new Date();
  for (let i = 0; i < sortedPosts.length; i++) {
    const postDate = new Date(sortedPosts[i].date);
    const daysDiff = Math.floor((today.getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (i === 0 && daysDiff <= 1) {
      currentStreak = 1;
      tempStreak = 1;
    } else if (i > 0) {
      const prevDate = new Date(sortedPosts[i - 1].date);
      const daysBetween = Math.floor((prevDate.getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysBetween === 1) {
        tempStreak++;
        if (i === 1 || currentStreak > 0) currentStreak++;
      } else {
        maxStreak = Math.max(maxStreak, tempStreak);
        tempStreak = 1;
        if (currentStreak > 0) currentStreak = 0;
      }
    }
  }
  
  maxStreak = Math.max(maxStreak, tempStreak, currentStreak);
  
  // Calculate difficulty distribution
  const problemsByDifficulty = { easy: 0, medium: 0, hard: 0 };
  const patternCounts: Record<string, number> = {};
  
  posts.forEach(post => {
    post.problems.forEach(problem => {
      problemsByDifficulty[problem.difficulty.toLowerCase() as keyof typeof problemsByDifficulty]++;
    });
    
    if (post.pattern) {
      patternCounts[post.pattern] = (patternCounts[post.pattern] || 0) + 1;
    }
  });
  
  return {
    totalProblems,
    currentDay,
    currentStreak,
    maxStreak,
    completionPercentage: Math.round((currentDay / 100) * 100),
    problemsByDifficulty,
    patternCounts
  };
};