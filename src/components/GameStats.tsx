import React from 'react';
import { RotateCcw } from 'lucide-react';
import { Timer } from './Timer';

interface GameStatsProps {
  moves: number;
  timeLeft: number;
  onReset: () => void;
  hasStarted: boolean;
}

export function GameStats({ moves, timeLeft, onReset, hasStarted }: GameStatsProps) {
  return (
    <div className="flex items-center gap-4">
      <Timer timeLeft={timeLeft} hasStarted={hasStarted} />
      <p className="text-lg font-medium">Moves: {moves}</p>
      <button
        onClick={onReset}
        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
      >
        <RotateCcw size={20} />
        Reset Game
      </button>
    </div>
  );
}