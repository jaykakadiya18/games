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