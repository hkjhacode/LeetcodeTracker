export interface LeetCodeProblem {
  id: string;
  title: string;
  slug: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  pattern?: string;
  url?: string;
}

export interface DailyPost {
  id: string;
  date: string;
  day: number;
  pattern: string;
  problemsSolved: number;
  problems: LeetCodeProblem[];
  tags: string[];
  notes?: string;
  images?: string[]; // Base64 encoded images or URLs
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  tags: string[];
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  problemSlug?: string;
  images?: string[];
  readTime: number;
}

export interface UserStats {
  totalProblems: number;
  currentDay: number;
  currentStreak: number;
  maxStreak: number;
  completionPercentage: number;
  problemsByDifficulty: {
    easy: number;
    medium: number;
    hard: number;
  };
  patternCounts: Record<string, number>;
}

export interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  active?: boolean;
}

export interface UserProfile {
  name: string;
  avatar?: string;
  bio: string;
  github?: string;
  linkedin?: string;
  website?: string;
}