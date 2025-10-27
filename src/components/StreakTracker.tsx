import { Flame, Trophy, Star } from 'lucide-react'

interface StreakTrackerProps {
  streak: number
}

const StreakTracker = ({ streak }: StreakTrackerProps) => {
  const getStreakLevel = (streak: number) => {
    if (streak >= 30) return { level: 'Master', color: 'text-purple-600', icon: Star }
    if (streak >= 14) return { level: 'Expert', color: 'text-blue-600', icon: Trophy }
    if (streak >= 7) return { level: 'Advanced', color: 'text-green-600', icon: Flame }
    if (streak >= 3) return { level: 'Intermediate', color: 'text-yellow-600', icon: Flame }
    return { level: 'Beginner', color: 'text-gray-600', icon: Flame }
  }

  const { level, color, icon: Icon } = getStreakLevel(streak)

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Focus Streak</h2>
      
      <div className="flex flex-col items-center space-y-4">
        <div className={`text-6xl ${color}`}>
          <Icon size={64} />
        </div>
        
        <div className="text-4xl font-bold text-gray-800">
          {streak}
        </div>
        
        <div className="text-lg font-medium text-gray-600">
          {streak === 1 ? 'day' : 'days'} streak
        </div>
        
        <div className={`text-lg font-semibold ${color}`}>
          {level}
        </div>
        
        {streak > 0 && (
          <div className="mt-4 p-3 bg-green-50 rounded-lg">
            <p className="text-sm text-green-700">
              🎉 Keep it up! You're building great habits!
            </p>
          </div>
        )}
        
        {streak === 0 && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              Start your focus journey today!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default StreakTracker
