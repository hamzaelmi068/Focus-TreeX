import { create } from 'zustand';
import { StoreState, TreeStyle } from './types';

const INITIAL_TIME = 25 * 60; // 25 minutes in seconds

// Load streak data from localStorage or use initial values
const loadStreakData = () => {
  const savedStreak = localStorage.getItem('focusTreeStreak');
  if (savedStreak) {
    return JSON.parse(savedStreak);
  }
  return {
    currentStreak: 0,
    highestStreak: 0,
    lastSessionDate: null,
    todaySessionCompleted: false,
  };
};

// Save streak data to localStorage
const saveStreakData = (streak: StreakState) => {
  localStorage.setItem('focusTreeStreak', JSON.stringify(streak));
};

// Check if it's a new day compared to the last session
const isNewDay = (lastSessionDate: string | null) => {
  if (!lastSessionDate) return true;
  const last = new Date(lastSessionDate);
  const now = new Date();
  return last.getDate() !== now.getDate() || 
         last.getMonth() !== now.getMonth() || 
         last.getFullYear() !== now.getFullYear();
};

// Update streak based on session completion
const updateStreak = (streak: StreakState): StreakState => {
  const now = new Date();
  const newDay = isNewDay(streak.lastSessionDate);

  // If it's been more than 24 hours since last session, break the streak
  if (streak.lastSessionDate) {
    const lastSession = new Date(streak.lastSessionDate);
    const hoursSinceLastSession = (now.getTime() - lastSession.getTime()) / (1000 * 60 * 60);
    if (hoursSinceLastSession > 24) {
      return {
        currentStreak: 1,
        highestStreak: Math.max(streak.highestStreak, streak.currentStreak),
        lastSessionDate: now.toISOString(),
        todaySessionCompleted: true,
      };
    }
  }

  // If it's a new day, increment streak
  if (newDay) {
    const newStreak = streak.todaySessionCompleted ? streak.currentStreak + 1 : 1;
    return {
      currentStreak: newStreak,
      highestStreak: Math.max(streak.highestStreak, newStreak),
      lastSessionDate: now.toISOString(),
      todaySessionCompleted: true,
    };
  }

  // Same day, just update completion status
  return {
    ...streak,
    todaySessionCompleted: true,
    lastSessionDate: now.toISOString(),
  };
};

const initialTreeStyles: TreeStyle[] = [
  { id: 'oak', name: 'Oak Tree', color: 'emerald', unlockCost: 0, unlocked: true },
  { id: 'maple', name: 'Maple Tree', color: 'red', unlockCost: 10, unlocked: false },
  { id: 'cherry', name: 'Cherry Blossom', color: 'pink', unlockCost: 25, unlocked: false },
];

export const useStore = create<StoreState>((set) => ({
  motivationMessage: {
    message: '',
    lastUpdated: 0
  },
  streak: loadStreakData(),
  timer: {
    isRunning: false,
    timeRemaining: INITIAL_TIME,
    totalFocusMinutes: 0,
  },
  selectedTreeStyle: 'oak',
  treeStyles: initialTreeStyles,
  treeGrowth: 0,

  startTimer: () => set((state) => {
    // Don't start if already running
    if (state.timer.isRunning) return state;
    
    return {
    timer: { ...state.timer, isRunning: true },
    treeGrowth: 0
    };
  }),

  pauseTimer: () => set((state) => ({
    timer: { ...state.timer, isRunning: false }
  })),

  resetTimer: () => set((state) => ({
    timer: { ...state.timer, timeRemaining: INITIAL_TIME, isRunning: false },
    treeGrowth: 0
  })),

  tickTimer: () => set((state) => {
    if (!state.timer.isRunning || state.timer.timeRemaining <= 0) return state;

    const newTimeRemaining = state.timer.timeRemaining - 1;
    
    // Check if session is complete
    if (newTimeRemaining === 0) {
      const updatedStreak = updateStreak(state.streak);
      saveStreakData(updatedStreak);
      return {
        timer: {
          ...state.timer,
          timeRemaining: newTimeRemaining,
          totalFocusMinutes: state.timer.totalFocusMinutes + 25,
        },
        streak: updatedStreak,
        treeGrowth: 100,
      };
    }
    const newTotalMinutes = state.timer.totalFocusMinutes;
    const newTreeGrowth = ((INITIAL_TIME - newTimeRemaining) / INITIAL_TIME) * 100;

    return {
      timer: {
        ...state.timer,
        timeRemaining: newTimeRemaining,
        totalFocusMinutes: newTotalMinutes,
      },
      treeGrowth: newTreeGrowth,
    };
  }),

  selectTreeStyle: (id: string) => set((state) => ({
    selectedTreeStyle: id
  })),

  unlockTreeStyle: (id: string) => set((state) => ({
    treeStyles: state.treeStyles.map(style =>
      style.id === id ? { ...style, unlocked: true } : style
    )
  })),
}));