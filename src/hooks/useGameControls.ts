import { useEffect, useCallback } from 'react';
import type { Direction } from '../types/game';

interface UseGameControlsProps {
  direction: Direction;
  setDirection: (direction: Direction) => void;
  isGameOver: boolean;
  resetGame: () => void;
  setIsPaused: (isPaused: boolean) => void;
}

export function useGameControls({
  direction,
  setDirection,
  isGameOver,
  resetGame,
  setIsPaused
}: UseGameControlsProps) {
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (e.code === 'Space') {
      e.preventDefault();
      setIsPaused((prev) => !prev);
      return;
    }

    if (isGameOver) {
      resetGame();
      return;
    }

    const keyMap: { [key: string]: Direction } = {
      ArrowUp: 'UP',
      ArrowDown: 'DOWN',
      ArrowLeft: 'LEFT',
      ArrowRight: 'RIGHT',
      KeyW: 'UP',
      KeyS: 'DOWN',
      KeyA: 'LEFT',
      KeyD: 'RIGHT'
    };

    const newDirection = keyMap[e.code];
    if (newDirection) {
      e.preventDefault();
      const opposites = {
        UP: 'DOWN',
        DOWN: 'UP',
        LEFT: 'RIGHT',
        RIGHT: 'LEFT'
      };

      // Prevent moving in opposite direction
      if (opposites[newDirection] !== direction) {
        setDirection(newDirection);
      }
    }
  }, [direction, isGameOver, resetGame, setDirection, setIsPaused]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);
}