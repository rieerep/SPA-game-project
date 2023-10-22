import React, { useState, useEffect } from "react";
import authService from './api-authorization/AuthorizeService';


//This function is the Square-component seen in the return value of the GameBoard-component, 
// it takes in the arguments "value" and "onSquareClick".
// It returns a button html element, you can see that the value will be printed out on the button it self (probably X, O or null/nothing)
// And the onSquareClick is a function that will run once the button is clicked (onClick= function)
function Square({ value, onSquareClick }) {
    return <button className="square" onClick={onSquareClick}>{value}</button>
}



// The component GameBoard() is exported to be used elsewhere
export default function GameBoard(props) {
    // The useState below checks if there is a game or not
    const [found, setFound] = useState(false);
    const [gameId, setGameId] = useState("");
    const [isDraw, setIsDraw] = useState(false);
  
    
    let gameOver = false;
    let win = false;
    let draw = false;
    let lose = false;

    // The useState below is used as a flag to determin if it's X's turn, if not, it must be O's.
    const [xIsNext, setXIsNext] = useState(true);

    // The following useState right below here sets the actual boards starting state,
    // an array of 9 elements that are filled with null.
    const [squares, setSquares] = useState(Array(9).fill(null));

    //const test = [null, null, "X", null, "X", null, "O", null, "O"]
    //let test = ",,X,,X,,O,,O"

    const createGame = async () => {
        try {
            const token = await authService.getAccessToken();
            const response = await fetch('/api/game', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            //console.log("GameId is created with Id: " + data.gameId);
            await setFound(true);
            await setGameId(data.gameId);
        } catch (error) {
            console.error("Error: " + error)
        }
    }

    
    const updateGameState = async () => {
        try {
            if (gameId === "" || gameId === null) {
                return
            }
            //console.log("GameOver is: " + gameOver)
            //console.log(squares)
            const token = await authService.getAccessToken();
            const response = await fetch(`/api/game/${gameId}/${squares}/${gameOver ? true : false}/${win ? true : false}/${lose ? true : false}/${draw ? true : false}`, 
            {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();

            //console.log(data);
        } catch (error) {
            console.error("Error: " + error)
        }
    }
    

    useEffect(() => {
        const checkGame = async () => {
            try {
                const token = await authService.getAccessToken();
                const response = await fetch('/api/game/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                //console.log(data.foundGame)
                //console.log(data.gameId)
                
                
                //console.log("first");
                if (!data.foundGame && (data.gameId === null || data.gameId === "")) {
                    //console.log("No game has been found");
                    //console.log("Creating new game");
                    createGame();
                }
                else {
                    let newState = data.gameState.split(',').map(item => item === '' ? null : item);
                    //console.log(data.gameState)
                    setSquares(newState);
                    setFound(data.foundGame);
                    setGameId(data.gameId);
                }
            } catch (error) {
                console.error("Error: " + error);
            }
        };

        checkGame();
    }, []); // Empty dependency array to run the effect only once

    useEffect(() => {
        if (squares.length === 9) {
            //console.log("Squares length is 9")
            updateGameState();
        }
    }, [squares]);


    function handleClick(i) {

        //console.log("squares[i]: " + squares[i] + " " + i)
        if (squares[i] || calculateWinner(squares)) {
            return;
        }

        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = "X";

        }

        if (nextSquares.includes(null)) {
            let random = Math.floor(Math.random() * 9);
            while (nextSquares[random] === 'X' || nextSquares[random] === 'O') {
                random = Math.floor(Math.random() * 9);
            }
            nextSquares[random] = 'O';
        }

        setSquares(nextSquares);
        //console.log(squares)
        setXIsNext(xIsNext)

        if (nextSquares.filter(square => square === null).length === 0) {
            setIsDraw(true);
        }

    }

    //använd variabel som slår om win, draw och lose till true
    //skicka med i update api requestet

    const winner = calculateWinner(squares);
    
    let status;
    if (winner) {
        status = "Winner: " + winner;
        gameOver = true;
        if (winner === "X") {
            win = true;
            console.log("X is winner, win is: " + win);
        }

        if (winner === "O") {
            lose = true;
            console.log("O is winner, lose is: " + lose);
        }
    } else if (isDraw) {
        //console.log("Draw")
        status = "Draw!"
        gameOver = true;
        draw = true;
        console.log("No winner, is draw: " + draw);
        //console.log("GameOver is: " + gameOver)
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }

    function reloadPage() {
        window.location.reload();
    }

    return (
        <div className={props.board}>
            <div className="status">{status}</div>
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
                <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
                <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
            </div>
            <div className="board-row">
                <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
                <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
                <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
            </div>
            <div className="board-row">
                <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
                <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
                <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
            </div>
            <button className={gameOver ? "new-game-btn" : "hide"} onClick={reloadPage}>Start new game</button>
        </div>
    );
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    
    return null;
}