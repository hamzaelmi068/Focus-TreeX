import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useStore } from '../UI Files/store';
import { Play, Pause, RotateCcw } from 'lucide-react';

export function Timer() {
  const { timer, startTimer, pauseTimer, resetTimer, tickTimer } = useStore();

  useEffect(() => {
    const interval = setInterval(() => {
      tickTimer();
    }, 1000);

    return () => clearInterval(interval);
  }, [tickTimer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-4xl font-bold font-mono">
        {formatTime(timer.timeRemaining)}
      </div>
      <div className="flex gap-2">
        {!timer.isRunning ? (
          <Button onClick={startTimer} size="lg">
            <Play className="mr-2 h-4 w-4" /> Start Focus
          </Button>
        ) : (
          <Button onClick={pauseTimer} variant="secondary" size="lg">
            <Pause className="mr-2 h-4 w-4" /> Pause
          </Button>
        )}
        <Button onClick={resetTimer} variant="outline" size="lg">
          <RotateCcw className="mr-2 h-4 w-4" /> Reset
        </Button>
      </div>
    </div>
  );
}