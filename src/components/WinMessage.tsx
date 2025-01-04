import React from 'react';
import { Trophy } from 'lucide-react';
import { Celebration } from './Celebration';

interface WinMessageProps {
  moves: number;
}

export function WinMessage({ moves }: WinMessageProps) {
  return (
    <>
      <div className="flex items-center gap-2 p-4 bg-green-100 text-green-800 rounded-lg">
        <Trophy size={24} />
        <p className="text-lg font-medium">
          Congratulations! You won in {moves} moves!
        </p>
      </div>
      <Celebration />
    </>
  );
}