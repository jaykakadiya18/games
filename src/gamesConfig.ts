// src/gamesConfig.ts
import { GameBoard } from './components/FlipAndFind/GameBoard';
import { Game } from './components/Snake/Game';
// Import other games as needed

export const games = [
  { id: 1, name: 'Flip & Find', component: GameBoard },
  { id: 2, name: 'Snake', component: Game },
  
  // Add more games here
];
