import React from 'react';
import { Clock } from 'lucide-react';

export function GameOver() {
  return (
    <div className="flex items-center gap-2 p-4 bg-red-100 text-red-800 rounded-lg">
      <Clock size={24} />
      <p className="text-lg font-medium">
        Time's up! Try again to beat the clock!
      </p>
    </div>
  );
}