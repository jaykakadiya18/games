import React from 'react';
import './GameBoard.css';


interface CardProps {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}

export function Card({ emoji, isFlipped, isMatched, onClick }: CardProps) {
  return (
    <div
      className={`relative w-24 h-24 cursor-pointer transition-transform duration-200 ${
        !isFlipped && !isMatched ? 'hover:scale-105 active:scale-95' : ''
      }`}
      onClick={onClick}
    >
      <div
        className={`absolute w-full h-full rounded-xl transition-all duration-300 transform preserve-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front of card */}
        <div
          className={`absolute w-full h-full flex items-center justify-center text-4xl bg-white rounded-xl shadow-lg backface-hidden ${
            isMatched ? 'opacity-0' : ''
          }`}
        >
          ❓
        </div>
        
        {/* Back of card */}
        <div
          className="absolute w-full h-full flex items-center justify-center text-4xl bg-white rounded-xl shadow-lg backface-hidden rotate-y-180"
        >
          {emoji}
        </div>
      </div>
    </div>
  );
}