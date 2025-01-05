import React from 'react';
import { Timer as TimerIcon } from 'lucide-react';

interface TimerProps {
  timeLeft: number;
  hasStarted: boolean;
}

export function Timer({ timeLeft, hasStarted }: TimerProps) {
  const seconds = Math.max(0, timeLeft);
  const isLowTime = seconds <= 10 && hasStarted;

  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
      isLowTime ? 'bg-red-100 text-red-800' : 'bg-white'
    }`}>
      <TimerIcon size={20} />
      <span className="font-medium">
        {!hasStarted ? "Click to Start!" : `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`}
      </span>
    </div>
  );
}