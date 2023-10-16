import React from 'react';
import './Game.css';







const Game = () => {
    return (
        <>
        <h1>Game</h1>
        <div>
        </div>
        <div id="main">
            <h1>TIC TAC TOE</h1>
            <p id="ins">
                Game starts by just Tap on
                box<br/>First Player starts as
                <b>Player X </b>And Second Player as
                <b>Player 0</b>
            </p>
            <br/>
            <div class="ui">
                <div class="row">
                    <input type="text" id="b1" class="cell" onclick="myfunc_3(); myfunc();" readonly />
                    <input type="text" id="b2" class="cell" onclick="myfunc_4(); myfunc();" readonly />
                    <input type="text" id="b3" class="cell" onclick="myfunc_5(); myfunc();" readonly />
                </div>
                <div class="row">
                    <input type="text" id="b4" class="cell" onclick="myfunc_6(); myfunc();" readonly />
                    <input type="text" id="b5" class="cell" onclick="myfunc_7(); myfunc();" readonly />
                    <input type="text" id="b6" class="cell" onclick="myfunc_8(); myfunc();" readonly />
                </div>
            <div class="row">
                <input type="text" id="b7" class="cell" onclick="myfunc_9(); myfunc();" readonly />
                <input type="text" id="b8" class="cell" onclick="myfunc_10();myfunc();" readonly />
                <input type="text" id="b9" class="cell" onclick="myfunc_11();myfunc();" readonly />
            </div>
            </div>
            <br/>
            <button id="but" onclick="myfunc_2()">
                RESET
            </button>
            <br/>
            <p id="print"></p>
        </div>
        </>
    );
}

export default Game;