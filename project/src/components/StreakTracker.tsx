import React from 'react';
import { Calendar } from 'lucide-react';

interface StreakTrackerProps {
  currentStreak: number;
  longestStreak: number;
}

export function StreakTracker({ currentStreak, longestStreak }: StreakTrackerProps) {
  return (
    <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-xl p-6">
      <div className="flex items-center space-x-4 mb-4">
        <Calendar className="text-orange-500" />
        <h3 className="font-semibold text-lg">Focus Streak</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-4 bg-white/90 dark:bg-gray-800/90 rounded-lg">
          <div className="text-3xl font-bold text-orange-500">{currentStreak}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Current Streak</div>
        </div>
        
        <div className="text-center p-4 bg-white/90 dark:bg-gray-800/90 rounded-lg">
          <div className="text-3xl font-bold text-red-500">{longestStreak}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Longest Streak</div>
        </div>
      </div>
      
      <div className="mt-4 flex justify-center">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className={`w-8 h-2 mx-1 rounded-full ${
              i < (currentStreak % 7)
                ? 'bg-orange-500'
                : 'bg-gray-300 dark:bg-gray-700'
            }`}
          />
        ))}
      </div>
    </div>
  );
}