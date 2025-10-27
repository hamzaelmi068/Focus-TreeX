import { useState, useEffect } from 'react'
import { Play, Pause, Square } from 'lucide-react'

interface TimerProps {
  isRunning: boolean
  onStart: () => void
  onStop: () => void
}

const Timer = ({ isRunning, onStart, onStop }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
  const [sessionType, setSessionType] = useState<'focus' | 'break'>('focus')

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      // Session completed
      setSessionType(sessionType === 'focus' ? 'break' : 'focus')
      setTimeLeft(sessionType === 'focus' ? 5 * 60 : 25 * 60) // 5 min break or 25 min focus
      onStop()
    }
    
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, timeLeft, sessionType, onStop])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const progress = ((25 * 60 - timeLeft) / (25 * 60)) * 100

  return (
    <div className="glass-card rounded-2xl p-8 text-center card-hover">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        {sessionType === 'focus' ? 'Focus Session' : 'Break Time'}
      </h2>
      
      <div className="relative w-64 h-64 mx-auto mb-8">
        {/* Circular Progress */}
        <svg className="w-full h-full transform -rotate-90 drop-shadow-lg" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-gray-200 dark:text-gray-700"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="url(#gradient)"
            strokeWidth="8"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 45}`}
            strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
            className="transition-all duration-1000 ease-out drop-shadow-lg"
            style={{
              filter: 'drop-shadow(0 0 10px rgba(34, 197, 94, 0.5))'
            }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Time Display */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <span className="text-5xl font-bold text-gray-800 dark:text-gray-100 drop-shadow-sm">
              {formatTime(timeLeft)}
            </span>
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 font-medium">
              {sessionType === 'focus' ? 'Stay focused!' : 'Take a break!'}
            </div>
          </div>
        </div>
      </div>
      
      {/* Controls */}
      <div className="flex justify-center space-x-4">
        {!isRunning ? (
          <button
            onClick={onStart}
            className="btn-modern flex items-center space-x-2 px-8 py-4 text-lg font-semibold"
          >
            <Play size={24} />
            <span>Start</span>
          </button>
        ) : (
          <button
            onClick={onStop}
            className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/25"
          >
            <Pause size={24} />
            <span>Pause</span>
          </button>
        )}
        
        <button
          onClick={() => {
            setTimeLeft(25 * 60)
            setSessionType('focus')
            onStop()
          }}
          className="flex items-center space-x-2 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gray-500/25"
        >
          <Square size={24} />
          <span>Reset</span>
        </button>
      </div>
      
      {/* Session Info */}
      <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200/50 dark:border-blue-700/50">
        <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">
          Next: {sessionType === 'focus' ? '5 min break' : '25 min focus'}
        </p>
      </div>
    </div>
  )
}

export default Timer
