import React, { useEffect, useState } from 'react';
import './Game.css';
import GameBoard from './GameBoard';



const startNewGame = () => {
    //const showGame = document.querySelector('.play-gameBtn');
    console.log('clicked');
    //showGame.classList.add('.hide');
}


function GamePage() {

    const [isVisible, setIsVisible] = useState(true);

    return (
        <>
            <h1>Game</h1>
            <div className="game-board">
            <button className={isVisible ? "hide" : "hide"} onClick={() => setIsVisible(!isVisible)}>Play</button>
                <GameBoard board={isVisible ? "" : ""} />
            </div>
        </>
    )
}

export default GamePage;