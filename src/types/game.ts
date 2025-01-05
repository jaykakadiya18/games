// The filp and find game start

export interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameState {
  cards: Card[];
  flippedCards: number[];
  moves: number;
  isWon: boolean;
  timeLeft: number;
  isGameOver: boolean;
  hasStarted: boolean;
}
// The filp and find game end

// The snake game start

export type Position = {
  x: number;
  y: number;
};

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

//  The snake game end