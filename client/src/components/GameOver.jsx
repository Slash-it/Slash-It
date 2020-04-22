import React, { useState, useEffect } from "react";
import "./style/GameOver.css"
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { gameStart, submitScore } from "../store/actions/keypoints";
const gameOverIcon = "/assets/game_over.png"

function GameOver (props) {
  const history = useHistory();
  const dispatch = useDispatch();

    const submit = () => {
      dispatch(submitScore('bambang', 0));
    }

    const home = () => {
      props.stopVideo();

      dispatch(gameStart(false));
      history.push('/mode');
    };

    return (
        <div className="gameOver">
            <img src={gameOverIcon} alt="Game Over" className="gameOver-logo" />
            <div className="button-container">
                <button className="gameOverButton" onClick={() => submit()} >Submit</button>
                <button className="gameOverButton" onClick={() => home()} >Home</button>
            </div>
        </div>
    )
}

export default GameOver;