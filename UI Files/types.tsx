export interface TreeStyle {
  id: string;
  name: string;
  color: string;
  unlockCost: number;
  unlocked: boolean;
}

export interface StreakState {
  currentStreak: number;
  highestStreak: number;
  lastSessionDate: string | null;
  todaySessionCompleted: boolean;
}

export interface TimerState {
  isRunning: boolean;
  timeRemaining: number;
  totalFocusMinutes: number;
}

export interface MotivationMessage {
  message: string;
  lastUpdated: number;
}

export interface StoreState {
  streak: StreakState;
  timer: TimerState;
  selectedTreeStyle: string;
  treeStyles: TreeStyle[];
  treeGrowth: number;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  tickTimer: () => void;
  selectTreeStyle: (id: string) => void;
  unlockTreeStyle: (id: string) => void;
}