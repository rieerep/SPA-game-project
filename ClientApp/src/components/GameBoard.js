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
    //const [gameOver, setGameOver] = useState(false);
    let gameOver = false;
    //const [flag, setFlag] = useState(false);
    let flag = false;

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
            console.log("flag is: " + flag)
            const token = await authService.getAccessToken();
            //console.log(gameId)
            const response = await fetch(`/api/game/${gameId}/${squares}/${gameOver ? true : false}`, 
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
                    console.log("No game has been found");
                    console.log("Creating new game");
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
        updateGameState();
    }, [squares]);


    //console.log(flag)
    //if (!flag) {
    //    console.log("Game continues")
    //}
    //else {
    //    console.log("Game has stopped")
    //}

    function handleClick(i) {

        //console.log("squares[i]: " + squares[i] + " " + i)
        if (squares[i] || calculateWinner(squares)) {
            return;
        }

        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = "X";

        } else {
            nextSquares[i] = "O";
        }
        setSquares(nextSquares);
        //console.log(squares)
        setXIsNext(!xIsNext)
    }
    
    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = "Winner: " + winner;
        gameOver = true;
        console.log("flag is: " + flag)
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }
    //console.log(squares)

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
            //console.log("Square[a] is: " + squares[a] + " " + squares[b] + " " + squares[c])
            //console.log("Lines: " + [a, b, c])
            return squares[a];
        }
    }
    return null;
}