import React, { useEffect } from 'react';
import './Game.css';
import Game from './Game';



const startNewGame = () => {
    //const showGame = document.querySelector('.play-gameBtn');
    console.log('clicked');
    //showGame.classList.add('.hide');
}


function GamePage() {
    //useEffect(() => {
    //    const showGame = document.querySelector('.play-gameBtn');
    //    showGame.classList.add('.hide');
    //})
    return (
        <>
            <h1>Game</h1>
            <button onClick={startNewGame} className="play-gameBtn">Play</button>
            <Game/>
        </>
    )
}

export default GamePage;