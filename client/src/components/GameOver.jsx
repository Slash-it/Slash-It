import React, { useState, useEffect } from "react";
import "./style/GameOver.css"
const gameOverIcon = "/assets/game_over.png"

function GameOver (props) {
    const replay = () => {

    }

    const submit = () => {

    }

    return (
        <div className="gameOver">
            <img src={gameOverIcon} alt="Game Over" className="gameOver-logo" />
            <div className="button-container">
                <button className="gameOverButton" onClick={() => replay()} >Replay</button>
                <button className="gameOverButton" onClick={() => submit()} >Submit</button>
            </div>
        </div>
    )
}

export default GameOver;