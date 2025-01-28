import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RefreshCw } from 'lucide-react';

const TIMER_PRESETS = [15, 25, 45];

interface TimerProps {
  onComplete: () => void;
  onTimeUpdate: (timeLeft: number) => void;
}

export function Timer({ onComplete, onTimeUpdate }: TimerProps) {
  const [duration, setDuration] = useState(25 * 60);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  
  useEffect(() => {
    let interval: number;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          const newTime = time - 1;
          onTimeUpdate(newTime);
          return newTime;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      onComplete();
    }
    
    return () => clearInterval(interval);
  }, [isActive, timeLeft, onComplete, onTimeUpdate]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = useCallback(() => {
    setIsActive(false);
    setTimeLeft(duration);
  }, [duration]);

  const handlePresetClick = useCallback((preset: number) => {
    const newDuration = preset * 60;
    setDuration(newDuration);
    setTimeLeft(newDuration);
    setIsActive(false);
  }, []);

  return (
    <div className="flex flex-col items-center space-y-8 w-full max-w-md">
      <div className="flex justify-center space-x-4 w-full">
        {TIMER_PRESETS.map((preset) => (
          <button
            key={preset}
            onClick={() => handlePresetClick(preset)}
            className={`
              flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200
              transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500
              ${duration === preset * 60
                ? 'bg-green-500 text-white shadow-lg'
                : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}
            `}
          >
            {preset}m
          </button>
        ))}
      </div>
      
      <div className="text-7xl font-bold font-mono tracking-wider bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
        {formatTime(timeLeft)}
      </div>
      
      <div className="flex space-x-6">
        <button
          onClick={toggleTimer}
          className="p-4 rounded-full bg-green-500 text-white hover:bg-green-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
          aria-label={isActive ? 'Pause timer' : 'Start timer'}
        >
          {isActive ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
        </button>
        <button
          onClick={resetTimer}
          className="p-4 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transform hover:scale-105 transition-all duration-200"
          aria-label="Reset timer"
        >
          <RefreshCw className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
}