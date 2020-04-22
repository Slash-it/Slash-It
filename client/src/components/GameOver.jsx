import React, { useState, useEffect } from "react";
import "./style/GameOver.css"
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { gameStart, submitScore } from "../store/actions/keypoints";
// const gameOverIcon = "/assets/game_over.png";
const gameOverIcon2 = '/assets/game_over2.png';

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
        <div className="gameOver center">
            <img src={gameOverIcon2} alt="Game Over" className="gameOver-logo" />
            <div className="button-container">
                <button className="gameOverButton btn btn-warning" onClick={() => submit()} ><h4>Submit</h4></button>
                <button className="gameOverButton btn btn-warning" onClick={() => home()} ><h4>Home</h4></button>
            </div>
        </div>
    )
}

export default GameOver;