import React, { useState } from 'react';
import { games } from './gamesConfig';

function App() {
  const [selectedGameId, setSelectedGameId] = useState<number | null>(null);

  const SelectedGame = selectedGameId
    ? games.find((game) => game.id === selectedGameId)?.component
    : null;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Game Selector</h1>

      {/* Game Selector */}
      <div className="mb-4 flex flex-wrap gap-4">
        {games.map((game) => (
          <button
            key={game.id}
            onClick={() => setSelectedGameId(game.id)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {game.name}
          </button>
        ))}
      </div>

      {/* Render Selected Game */}
      <div className="mt-8">
        {SelectedGame ? (
          <SelectedGame />
        ) : (
          <p className="text-gray-700">Please select a game to start playing.</p>
        )}
      </div>
    </div>
  );
}

export default App;
