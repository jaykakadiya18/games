import React from 'react';

interface GameStatusProps {
  isGameOver: boolean;
  isPaused: boolean;
}

export function GameStatus({ isGameOver, isPaused }: GameStatusProps) {
  if (isGameOver) {
    return <div className="mt-4 text-xl">Game Over! Press any key to restart</div>;
  }

  if (isPaused) {
    return <div className="mt-4 text-xl">Game Paused! Press space to continue</div>;
  }

  return null;
}