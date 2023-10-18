import React, { useEffect, useState } from 'react';
import './Game.css';
import Game from './Game';



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
            <button className={isVisible ? "play-gameBtn" : "hide"} onClick={() => setIsVisible(!isVisible)}>Play</button>
            <Game board={isVisible ? "hide" : "main"} />
        </>
    )
}

export default GamePage;