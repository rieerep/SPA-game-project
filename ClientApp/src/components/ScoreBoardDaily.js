import React, { useState, useEffect } from 'react';
import './Scoreboard.css'

const Scoreboard = () => {

    const [scoreboard, setScoreboard] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/scoreboard');
                const data = await response.json();
                setScoreboard(data);
            } catch (error) {
                console.error('ERRRORR', error)
            }
        }

        fetchData();
    }, []);

    return (
        <div className="scoreboard">
            <h1>Scoreboard</h1>
            <ul>
                {scoreboard.map((scoreboard, index) => (
                    <li key={index}>{scoreboard.gamerTag}: {scoreboard.wins}</li>
                ))}
            </ul>
        </div>
    );
}

export default Scoreboard;