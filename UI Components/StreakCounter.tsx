import React from 'react';
import { useStore } from '../utils/store';
import brain from 'brain';
import { Flame, Trophy, Star, Sparkles, Brain } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const getStreakMessage = (streak: number): string => {
  if (streak === 0) return 'Start your streak today!';
  if (streak === 1) return 'Great start! Keep it going!';
  if (streak === 2) return 'Two days and counting!';
  if (streak === 3) return 'Three days! You\'re on fire! 🔥';
  if (streak === 4) return 'Four days strong!';
  if (streak === 5) return 'High five! Five days! ✋';
  if (streak === 6) return 'Six days! Almost a week!';
  if (streak === 7) return 'A whole week! Amazing! 🌟';
  if (streak >= 14) return 'Two weeks! You\'re unstoppable! 🚀';
  if (streak >= 30) return 'A month of focus! Legendary! 👑';
  return 'Keep that streak alive! 🔥';
};

export function StreakCounter() {
  const { streak, timer, motivationMessage } = useStore();
  const [isLoading, setIsLoading] = React.useState(false);

  const updateMotivationMessage = React.useCallback(async () => {
    // Only update every 5 minutes
    const now = Date.now();
    if (now - motivationMessage.lastUpdated < 5 * 60 * 1000) return;

    setIsLoading(true);
    try {
      const response = await brain.get_motivation({
        current_streak: streak.currentStreak,
        highest_streak: streak.highestStreak,
        total_focus_minutes: timer.totalFocusMinutes,
        today_completed: streak.todaySessionCompleted
      });
      
      const data = await response.json();
      useStore.setState({
        motivationMessage: {
          message: data.message,
          lastUpdated: now
        }
      });
    } catch (error) {
      console.error('Failed to fetch motivation message:', error);
    } finally {
      setIsLoading(false);
    }
  }, [streak, timer, motivationMessage.lastUpdated]);

  React.useEffect(() => {
    updateMotivationMessage();
  }, [updateMotivationMessage]);

  return (
    <Card className="w-full max-w-sm bg-white/50 backdrop-blur-sm hover:bg-white/60 transition-all duration-300 border-2 shadow-lg">
      <CardContent className="pt-6 space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/50 transition-all duration-200 group">
            <Flame className="w-5 h-5 text-orange-500 animate-pulse" />
            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">Current Streak</span>
            <Badge variant="secondary" className="ml-2 font-bold text-lg">
              {streak.currentStreak} days
            </Badge>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/50 transition-all duration-200 group">
            <Trophy className="w-5 h-5 text-yellow-500 hover:scale-110 transition-transform duration-200" />
            <span className="text-sm font-medium">Best</span>
            <Badge variant="secondary" className="ml-2 font-bold text-lg">
              {streak.highestStreak} days
            </Badge>
          </div>
        </div>
        
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 shadow-lg transition-all duration-300 hover:shadow-xl">
          <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />
          <div className="relative flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="rounded-full bg-purple-100 p-2">
                <Brain className="h-5 w-5 text-purple-600" />
              </div>
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-400" />
                <span className="text-xs font-medium text-purple-600">AI Coach</span>
              </div>

              <p className="text-sm font-medium text-gray-700 leading-relaxed animate-fade-in">
            {isLoading ? 'Getting motivated...' :
             motivationMessage.message || getStreakMessage(streak.currentStreak)}
              </p>
            </div>
          </div>
        </div>

        {streak.todaySessionCompleted && (
          <div className="flex items-center gap-2 p-2 rounded-lg bg-green-50 border border-green-200 shadow-sm">
            <span className="inline-block w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            Today's session completed!
          </div>
        )}
      </CardContent>
    </Card>
  );
}
