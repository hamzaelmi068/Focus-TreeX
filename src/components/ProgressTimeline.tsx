import { useState, useEffect } from 'react'
import Timeline from './Timeline'
import { Clock, Target, Trophy, Zap } from 'lucide-react'

interface ProgressTimelineProps {
  streak: number
  totalSessions: number
  totalFocusTime: number
}

const ProgressTimeline = ({ streak, totalSessions, totalFocusTime }: ProgressTimelineProps) => {
  const [timelineData, setTimelineData] = useState([
    {
      title: "First Focus Session",
      content: "Welcome to your focus journey! Complete your first 25-minute session to start growing your tree.",
      timestamp: "Start",
      completed: totalSessions > 0
    },
    {
      title: "Building Momentum",
      content: "Great start! You've completed multiple focus sessions. Your tree is beginning to flourish.",
      timestamp: "3+ sessions",
      completed: totalSessions >= 3
    },
    {
      title: "Streak Master",
      content: "Amazing! You've maintained a consistent focus streak. Your dedication is paying off.",
      timestamp: "7+ day streak",
      completed: streak >= 7
    },
    {
      title: "Focus Champion",
      content: "Outstanding! You've reached an impressive streak. Your tree has grown beautifully.",
      timestamp: "14+ day streak",
      completed: streak >= 14
    },
    {
      title: "Focus Legend",
      content: "Incredible! You've achieved legendary status. Your tree is a masterpiece of dedication.",
      timestamp: "30+ day streak",
      completed: streak >= 30
    }
  ])

  const getAchievementIcon = (index: number) => {
    switch (index) {
      case 0: return <Clock className="text-blue-500" size={20} />
      case 1: return <Target className="text-green-500" size={20} />
      case 2: return <Zap className="text-yellow-500" size={20} />
      case 3: return <Trophy className="text-purple-500" size={20} />
      case 4: return <Trophy className="text-gold-500" size={20} />
      default: return <Clock className="text-gray-500" size={20} />
    }
  }

  return (
    <div className="glass-card rounded-2xl p-8 card-hover">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <Trophy className="text-white" size={24} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Focus Journey
        </h2>
      </div>
      
      <div className="mb-6 grid grid-cols-3 gap-4">
        <div className="text-center p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{streak}</div>
          <div className="text-sm text-blue-700 dark:text-blue-300">Day Streak</div>
        </div>
        <div className="text-center p-4 rounded-xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">{totalSessions}</div>
          <div className="text-sm text-green-700 dark:text-green-300">Sessions</div>
        </div>
        <div className="text-center p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{Math.floor(totalFocusTime / 60)}</div>
          <div className="text-sm text-purple-700 dark:text-purple-300">Hours Focused</div>
        </div>
      </div>

      <Timeline data={timelineData} />
      
      {streak >= 30 && (
        <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200/50 dark:border-yellow-700/50">
          <div className="flex items-center gap-2 text-yellow-700 dark:text-yellow-300">
            <Zap size={20} />
            <span className="font-semibold">Legendary Achievement Unlocked!</span>
          </div>
          <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-1">
            You've reached the pinnacle of focus mastery. Your dedication is truly inspiring!
          </p>
        </div>
      )}
    </div>
  )
}

export default ProgressTimeline
