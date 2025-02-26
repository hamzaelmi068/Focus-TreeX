import React from 'react';
import { UserStats } from '../types';
import { MessageCircle, Sparkles, TrendingUp } from 'lucide-react';

interface AICoachProps {
  stats: UserStats;
}

const getMotivationalMessage = (stats: UserStats): { message: string; icon: React.ReactNode } => {
  const messages = [
    {
      condition: stats.currentStreak > 5,
      message: `Amazing ${stats.currentStreak}-day streak! Keep the momentum going!`,
      icon: <TrendingUp className="text-green-500" />
    },
    {
      condition: stats.completedSessions > 0 && stats.weeklySessionCount < 3,
      message: "A small step each day leads to big achievements. Ready for another session?",
      icon: <Sparkles className="text-yellow-500" />
    },
    {
      condition: stats.weeklySessionCount > 5,
      message: "You're crushing it this week! Your dedication is inspiring!",
      icon: <MessageCircle className="text-blue-500" />
    },
    {
      condition: true,
      message: "Every focus session grows your forest. Let's plant another tree today!",
      icon: <Sparkles className="text-green-500" />
    }
  ];

  return messages.find(m => m.condition) || messages[messages.length - 1];
};

export function AICoach({ stats }: AICoachProps) {
  const { message, icon } = getMotivationalMessage(stats);

  return (
    <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl p-6 backdrop-blur-sm">
      <div className="flex items-start space-x-4">
        <div className="p-3 bg-white/90 dark:bg-gray-800/90 rounded-full">
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2">AI Coach</h3>
          <p className="text-gray-700 dark:text-gray-300">{message}</p>
        </div>
      </div>
    </div>
  );
}