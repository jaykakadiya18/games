import React from 'react';
import { CELL_SIZE, GRID_SIZE } from '../../utils/gameUtils';
import type { Position } from '../../types/game';


interface GameBoardProps {
  snake: Position[];
  food: Position;
}

export function GameBoard({ snake, food }: GameBoardProps) {
  return (
    <div
      className="relative bg-gray-800 border-4 border-gray-700"
      style={{
        width: GRID_SIZE * CELL_SIZE,
        height: GRID_SIZE * CELL_SIZE,
      }}
    >
      {snake.map((segment, index) => (
        <div
          key={index}
          className="absolute bg-green-500"
          style={{
            width: CELL_SIZE - 2,
            height: CELL_SIZE - 2,
            left: segment.x * CELL_SIZE,
            top: segment.y * CELL_SIZE,
          }}
        />
      ))}
      <div
        className="absolute bg-red-500"
        style={{
          width: CELL_SIZE - 2,
          height: CELL_SIZE - 2,
          left: food.x * CELL_SIZE,
          top: food.y * CELL_SIZE,
        }}
      />
    </div>
  );
}