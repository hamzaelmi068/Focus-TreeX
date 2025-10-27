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
    <div className="bg-white rounded-lg shadow-lg p-6 text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {sessionType === 'focus' ? 'Focus Session' : 'Break Time'}
      </h2>
      
      <div className="relative w-48 h-48 mx-auto mb-6">
        {/* Circular Progress */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#e5e7eb"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke={sessionType === 'focus' ? '#3b82f6' : '#10b981'}
            strokeWidth="8"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 45}`}
            strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        
        {/* Time Display */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-bold text-gray-800">
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>
      
      {/* Controls */}
      <div className="flex justify-center space-x-4">
        {!isRunning ? (
          <button
            onClick={onStart}
            className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <Play size={20} />
            <span>Start</span>
          </button>
        ) : (
          <button
            onClick={onStop}
            className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <Pause size={20} />
            <span>Pause</span>
          </button>
        )}
        
        <button
          onClick={() => {
            setTimeLeft(25 * 60)
            setSessionType('focus')
            onStop()
          }}
          className="flex items-center space-x-2 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          <Square size={20} />
          <span>Reset</span>
        </button>
      </div>
      
      {/* Session Info */}
      <div className="mt-4 text-sm text-gray-600">
        <p>Next: {sessionType === 'focus' ? '5 min break' : '25 min focus'}</p>
      </div>
    </div>
  )
}

export default Timer
