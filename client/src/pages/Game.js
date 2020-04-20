import React, { useState, useEffect, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { collideCircle, createHandKeypoint, findCoord } from '../helpers';

import Sketch from "react-p5";
import FruitLeft from "../objects/fruitLeft";
import FruitRight from "../objects/fruitRight";
import BombLeft from "../objects/bomLeft";
import BombRight from "../objects/bombRight";
import { gameStart } from "../store/actions/keypoints";

import GameOver from '../components/GameOver';
import FloatingScores from "../components/FloatingScores";
import { showFloatingScore } from "../store/actions/floatingScores";

const music = new Audio('/assets/audio/GameBg.mp3');

const Game = ({ width, height }) => {
  const dispatch = useDispatch();
  const [fruits, setFruits] = useState([]);
  const [time, setTime] = useState(60);
  const [score, setScore] = useState(0);
  const [isTimerOn, setIsTimerOn] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  let timerId = useRef();
  const [bombs, setBombs] = useState([]);
  const [boundary, setBoundary] = useState(400);
  const [lBoundary, setLBoundary] = useState(0);
  const [rBoundary, setRBoundary] = useState(0);
  const [gameMode, setGameMode] = useState(1);
  const [gameConfig, setGameConfig] = useState(
    [
      {
        fruitTriggerConstant: 0.98,
        bombTriggerConstant: 0.995,
        vyRandomFactor: 15,
        gravity: 0.15
      },
      {
        fruitTriggerConstant: 0.97,
        bombTriggerConstant: 0.99,
        vyRandomFactor: 20,
        gravity: 0.3
      },
      {
        fruitTriggerConstant: 0.96,
        bombTriggerConstant: 0.99,
        vyRandomFactor: 24,
        gravity: 0.4
      }
    ]
  );

  const calibrated = useSelector((state) => state.keypoint.calibrated);
  const keypoints = useSelector((state) => state.keypoint.keypoints);
  const isGameStarted = useSelector((state) => state.keypoint.isGameStarted);

  useEffect(() => {
    music.addEventListener('ended', function() {
      music.play();
    })
    music.volume = 0.2;
    music.play();
  }, []);

  const countDown = () => {
    setTime((time) => time - 1);
  };

  const startTimer = useCallback(() => {
    setIsTimerOn(true);
    timerId.current = setInterval(() => countDown(), 1000);
  }, []);

  const start = useCallback(() => {
    if (!isTimerOn && !gameOver && isGameStarted ) {
      startTimer();
    }

    if (isGameStarted && !gameOver) {
      const lShoulder = findCoord('leftShoulder', keypoints);
      const rShoulder = findCoord('rightShoulder', keypoints);
      setLBoundary(lShoulder.x - 120)
      setRBoundary(rShoulder.x + 120)
      const { letfHandKeypoints, rightHandKeypoints } = createHandKeypoint(
        keypoints
      );

      if (letfHandKeypoints) {
        for (let fruit of fruits) {
          if (
            collideCircle(
              letfHandKeypoints.x,
              letfHandKeypoints.y,
              100,
              fruit.x,
              fruit.y,
              fruit.diameter
            )
            && fruit.isShown
          ) {
            fruit.unShow();
            dispatch(showFloatingScore(`+100`, fruit.x, fruit.y));
            setScore(score + 100);
          }
        }
      }
    
      if (rightHandKeypoints) {
        for (let fruit of fruits) {
          if (
            collideCircle(
              rightHandKeypoints.x,
              rightHandKeypoints.y,
              100,
              fruit.x,
              fruit.y,
              fruit.diameter
            )
            && fruit.isShown
          ) {
            fruit.unShow();
            dispatch(showFloatingScore(`+100`, fruit.x, fruit.y));
            setScore(score + 100);
          }
        }
      }

      // TODO: handle collide with bomb
    }

    if (time <= 0) {
      setGameOver(true);
      clearInterval(timerId.current);
    }

  }, [keypoints, fruits, isTimerOn, startTimer, isGameStarted, gameOver, time]);

  useEffect(() => {
    if (calibrated.keypoints && !isGameStarted && !gameOver) {
      setTimeout(() => {
        dispatch(gameStart());
      }, 4000)
    }

    start();
  }, [calibrated, start, isGameStarted, gameOver, dispatch]);

  // CANVAS P5 SETUP
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(width, height).parent(canvasParentRef);
  }

  const draw = (p5) => {
    p5.clear()
    if(Math.random() >= gameConfig[gameMode].fruitTriggerConstant){
      setFruits([...fruits, new FruitLeft(
        p5, 
        lBoundary, 
        gameConfig[gameMode].gravity, 
        gameConfig[gameMode].vyRandomFactor,
      )]);
    };
    if(Math.random() >= gameConfig[gameMode].fruitTriggerConstant){
      setFruits([...fruits, new FruitRight(
        p5, 
        rBoundary, 
        gameConfig[gameMode].gravity, 
        gameConfig[gameMode].vyRandomFactor,
      )]);
    };
    if(Math.random() >= gameConfig[gameMode].bombTriggerConstant){
      setBombs([...bombs, new BombLeft(
        p5,
        boundary
      )]);
    };
    if(Math.random() >= gameConfig[gameMode].bombTriggerConstant){
      setBombs([...bombs, new BombRight(
        p5,
        boundary
      )]);
    };
    
    for(let fruit of fruits){
      fruit.show()
      //if (fruit.isShown) {
        fruit.move()
      //}
    };

    for(let bomb of bombs){
      bomb.show()
      bomb.move()
    };

    p5.fill(255, 255, 255);
    p5.stroke(0, 0, 0);
    p5.strokeWeight(2);
    p5.textSize(36);
    p5.text(`SCORE: ${score}`, 50, 50);
    p5.text(`Time: ${time}`, p5.width - 200, 50);

    // p5.rect(0, 0, lBoundary, p5.height-5);
    // p5.rect(rBoundary, 0, rBoundary, p5.height-5);
  }

  return(
    <>
    {/* <h1 style={{ textAlign: 'center' }} >Time: {time}</h1> */}
    {calibrated.keypoints && isGameStarted && !gameOver ? <Sketch setup={setup} draw={draw} /> : null}
    <FloatingScores/>
    { gameOver && <GameOver /> }
    </>
  )

};

export default Game;
