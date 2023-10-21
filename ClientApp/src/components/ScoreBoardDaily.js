﻿import React, { useState, useEffect } from 'react';
import './Scoreboard.css'

const ScoreboardDaily = () => {

    const [scoreboard, setScoreboard] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/scoreboarddaily');
                const data = await response.json();
                setScoreboard(data);
            } catch (error) {
                console.error('ERRRORR', error)
            }
        }

        fetchData();
    }, []);

    return (
        <div className="scoreboarddaily">
            <h1>Daily highscores!</h1>
            <ul>
                {scoreboard.map((scoreboard, index) => (
                    <li key={index}>{scoreboard.gamerTag}: {scoreboard.score}</li>
                ))}
            </ul>
        </div>
    );
}

export default ScoreboardDaily;