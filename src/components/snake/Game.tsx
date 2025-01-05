import React, { useState, useCallback } from 'react';
import { useInterval } from '../../hooks/useInterval';
import { useGameControls } from '../../hooks/useGameControls';
import { GameBoard } from './GameBoard';
import { GameStatus } from './GameStatus';
import { 
  generateFood, 
  checkSelfCollision, 
  wrapPosition, 
  calculateSpeed,
  GRID_SIZE, 
  INITIAL_SPEED 
} from '../../utils/gameUtils';
import type { Position, Direction } from '../../types/game';

export default function Game() {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>(() => generateFood(GRID_SIZE));
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const speed = calculateSpeed(snake.length);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setDirection('RIGHT');
    setIsGameOver(false);
    setScore(0);
    setFood(generateFood(GRID_SIZE));
    setIsPaused(false);
  };

  const moveSnake = useCallback(() => {
    if (isGameOver || isPaused) return;

    setSnake((prevSnake) => {
      const head = { ...prevSnake[0] };

      switch (direction) {
        case 'UP':
          head.y = wrapPosition(head.y - 1, GRID_SIZE);
          break;
        case 'DOWN':
          head.y = wrapPosition(head.y + 1, GRID_SIZE);
          break;
        case 'LEFT':
          head.x = wrapPosition(head.x - 1, GRID_SIZE);
          break;
        case 'RIGHT':
          head.x = wrapPosition(head.x + 1, GRID_SIZE);
          break;
      }

      if (checkSelfCollision(head, prevSnake)) {
        setIsGameOver(true);
        return prevSnake;
      }

      const newSnake = [head, ...prevSnake];

      if (head.x === food.x && head.y === food.y) {
        setScore((prev) => prev + 10);
        setFood(generateFood(GRID_SIZE));
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, isGameOver, isPaused]);

  useGameControls({
    direction,
    setDirection,
    isGameOver,
    resetGame,
    setIsPaused
  });

  useInterval(moveSnake, speed);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="mb-4 text-2xl font-bold">Score: {score}</div>
      <GameBoard snake={snake} food={food} />
      <GameStatus isGameOver={isGameOver} isPaused={isPaused} />
      <div className="mt-4 text-sm text-gray-400">
        Use arrow keys to move • Space to pause
      </div>
    </div>
  );
}