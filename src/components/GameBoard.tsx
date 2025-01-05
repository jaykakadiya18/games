import React, { useState, useEffect, useRef } from 'react';
import { Card } from './Card';
import { GameStats } from './GameStats';
import { WinMessage } from './WinMessage';
import { GameOver } from './GameOver';
import { createDeck, checkForMatch, checkForWin } from '../utils/gameLogic';
import { createAudioInstance } from '../utils/audio';
import { AUDIO_PATHS } from '../constants/audio';
import type { GameState } from '../types/game';

const GAME_DURATION = 60; // 1 minute in seconds

export function GameBoard() {
  const [gameState, setGameState] = useState<GameState>({
    cards: createDeck(),
    flippedCards: [],
    moves: 0,
    isWon: false,
    timeLeft: GAME_DURATION,
    isGameOver: false,
    hasStarted: false
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = createAudioInstance(AUDIO_PATHS.BACKGROUND_MUSIC);
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!gameState.hasStarted || gameState.isWon || gameState.isGameOver) return;

    const timer = setInterval(() => {
      setGameState(prev => {
        const newTimeLeft = prev.timeLeft - 1;
        return {
          ...prev,
          timeLeft: newTimeLeft,
          isGameOver: newTimeLeft <= 0,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState.hasStarted, gameState.isWon, gameState.isGameOver]);

  useEffect(() => {
    if (gameState.flippedCards.length === 2) {
      if (checkForMatch(gameState.cards, gameState.flippedCards)) {
        const newCards = gameState.cards.map((card, index) =>
          gameState.flippedCards.includes(index)
            ? { ...card, isMatched: true }
            : card
        );
        
        setGameState(prev => ({
          ...prev,
          cards: newCards,
          isWon: checkForWin(newCards),
        }));
      }
      
      setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          cards: prev.cards.map((card, index) =>
            prev.flippedCards.includes(index)
              ? { ...card, isFlipped: false }
              : card
          ),
          flippedCards: [],
        }));
      }, 1000);
    }
  }, [gameState.flippedCards]);

  const handleCardClick = async (index: number) => {
    if (
      gameState.isGameOver ||
      gameState.flippedCards.length === 2 ||
      gameState.flippedCards.includes(index) ||
      gameState.cards[index].isMatched
    ) {
      return;
    }

    // Start the game and music on first card click
    if (!gameState.hasStarted && audioRef.current) {
      try {
        await audioRef.current.play();
      } catch (error) {
        console.error('Failed to play audio:', error);
      }
    }

    setGameState(prev => ({
      ...prev,
      hasStarted: true,
      cards: prev.cards.map((card, i) =>
        i === index ? { ...card, isFlipped: true } : card
      ),
      flippedCards: [...prev.flippedCards, index],
      moves: prev.moves + 1,
    }));
  };

  const resetGame = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setGameState({
      cards: createDeck(),
      flippedCards: [],
      moves: 0,
      isWon: false,
      timeLeft: GAME_DURATION,
      isGameOver: false,
      hasStarted: false
    });
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <GameStats 
        moves={gameState.moves} 
        timeLeft={gameState.timeLeft}
        onReset={resetGame}
        hasStarted={gameState.hasStarted}
      />
      
      <div className="grid grid-cols-4 gap-4">
        {gameState.cards.map((card, index) => (
          <Card
            key={card.id}
            {...card}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>

      {gameState.isWon && <WinMessage moves={gameState.moves} />}
      {gameState.isGameOver && !gameState.isWon && <GameOver />}
    </div>
  );
}



