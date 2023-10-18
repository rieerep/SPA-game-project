import React, { useEffect } from 'react';
import './Game.css';




const handleReset = () => {
    console.log("ResetBtn")
}

const handleClick = () => {
    console.log("HandleClick!")
}


const Game = (props) => {

    return (
        <>
            <div className={props.board}>
                <h1 className="gameHeader">TIC TAC TOE</h1>
            <p id="ins">
                Game starts by just Tap on
                    box<br></br>First Player starts as
                    <br></br>
                <b>Player X </b>And Second Player as
                <b>Player 0</b>
            </p>
            <br/>
            <div className="ui">
                <div className="row">
                        <input type="text" id="b1" className="cell" onClick={handleClick} readOnly />
                        <input type="text" id="b2" className="cell" readOnly />
                        <input type="text" id="b3" className="cell" readOnly />
                </div>
                <div className="row">
                        <input type="text" id="b4" className="cell" readOnly />
                        <input type="text" id="b5" className="cell" readOnly />
                        <input type="text" id="b6" className="cell" readOnly />
                </div>
            <div className="row">
                        <input type="text" id="b7" className="cell" readOnly />
                        <input type="text" id="b8" className="cell" readOnly />
                        <input type="text" id="b9" className="cell" readOnly />
            </div>
            </div>
            <br/>
                <button id="but" onClick={handleReset}>
                RESET
            </button>
            <br/>
            <p id="print"></p>
        </div>
        </>
    );
}

export default Game;