import type { Position } from '../types/game';

export const GRID_SIZE = 20;
export const CELL_SIZE = 20;
export const INITIAL_SPEED = 150;
export const MIN_SPEED = 50; // Maximum speed (minimum delay)
export const SPEED_INCREMENT = 2; // How much to decrease delay per snake segment

export function calculateSpeed(snakeLength: number): number {
  const newSpeed = INITIAL_SPEED - (snakeLength - 1) * SPEED_INCREMENT;
  return Math.max(newSpeed, MIN_SPEED); // Don't go faster than MIN_SPEED
}

export function generateFood(gridSize: number): Position {
  return {
    x: Math.floor(Math.random() * gridSize),
    y: Math.floor(Math.random() * gridSize),
  };
}

export function wrapPosition(pos: number, gridSize: number): number {
  if (pos < 0) return gridSize - 1;
  if (pos >= gridSize) return 0;
  return pos;
}

export function checkSelfCollision(head: Position, snake: Position[]): boolean {
  return snake.slice(1).some(segment => 
    segment.x === head.x && segment.y === head.y
  );
}