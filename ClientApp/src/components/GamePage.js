import React, { useState } from 'react';
import './Game.css';
import GameBoard from './GameBoard';



function GamePage() {

    const [isVisible, setIsVisible] = useState(true);

    return (
        <>
            <h1>Game</h1>
            <div className="game-board">
            <button className={isVisible ? "hide" : "hide"} onClick={() => setIsVisible(!isVisible)}>Play</button>
                <GameBoard board={isVisible ? "game-board" : ""} />
            </div>
        </>
    )
}

export default GamePage;