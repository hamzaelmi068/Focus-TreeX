export interface Task {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  focusTime: number;
  createdAt: number;
}

export interface TreeType {
  name: string;
  requiredSessions: number;
  color: string;
  unlocked: boolean;
  description: string;
}

export interface UserStats {
  totalFocusTime: number;
  completedSessions: number;
  currentStreak: number;
  longestStreak: number;
  averageSessionDuration: number;
  weeklySessionCount: number;
  lastSessionDate: string | null;
  dailyFocusTimes: { [key: string]: number };
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  target: number;
}

export interface SessionHistory {
  id: string;
  date: string;
  duration: number;
  taskId: string | null;
  treeType: string;
  notes?: string;
}