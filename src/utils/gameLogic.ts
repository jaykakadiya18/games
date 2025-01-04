import { Card } from '../types/game';

const emojis = ['🐶', '🐱', '🐼', '🦊', '🦁', '🐯', '🐸', '🦄'];

export const createDeck = (): Card[] => 
  [...emojis, ...emojis]
    .sort(() => Math.random() - 0.5)
    .map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false,
      isMatched: false,
    }));

export const checkForMatch = (cards: Card[], flippedIndices: number[]): boolean => {
  const [first, second] = flippedIndices;
  return cards[first].emoji === cards[second].emoji;
};

export const checkForWin = (cards: Card[]): boolean => 
  cards.every(card => card.isMatched);