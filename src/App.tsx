import React, { useState } from 'react';
import { GameBoard } from './components/FlipAndFind/GameBoard';
import Game  from './components/Snake/Game';

function App() {
  const [flag,setFlag] =useState(false)
  const Changegame = () =>{
    setFlag(!flag)
    console.log("ss",flag);
    

  }
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Flip & Find Game</h1>
      <button
        onClick={Changegame}    
        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >

          Change Game
     </button> 
        {flag?
      <Game />
        :

      <GameBoard />}
    </div>
  );
}

export default App;