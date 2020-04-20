import React, { useState, useEffect, useCallback, useRef } from "react";
import { useSelector } from "react-redux";

import { collideCircle, createHandKeypoint, findCoord } from '../helpers';

import Sketch from "react-p5";
import FruitLeft from "../objects/fruitLeft";
import FruitRight from "../objects/fruitRight";
import BombLeft from "../objects/bomLeft";
import BombRight from "../objects/bombRight";

const music = new Audio('/assets/audio/GameBg.mp3');

const Game = ({ width, height }) => {
  const [fruits, setFruits] = useState([]);
  const [time, setTime] = useState(10);
  const [isTimerOn, setIsTimerOn] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
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
    const lShoulder = findCoord('leftShoulder', keypoints);
    const rShoulder = findCoord('rightShoulder', keypoints);
    // setBoundary(rShoulder.x - lShoulder.x);
    console.log(rShoulder, 'r shoulder')
    console.log(lShoulder, 'l shoulder')
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
        ) {
          fruit.unShow();
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
        ) {
          fruit.unShow();
        }
      }
    }

    if (time <= 0) {
      setGameOver(true);
      clearInterval(timerId.current);
    }

  }, [keypoints, fruits, isTimerOn, startTimer, isGameStarted, gameOver, time]);

  useEffect(() => {
    if (calibrated.keypoints) {
      setIsGameStarted(true);
      start();
    }
  }, [calibrated, start]);

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
      fruit.move()
    };

    for(let bomb of bombs){
      bomb.show()
      bomb.move()
    };

    p5.noStroke();
    p5.fill(75, 75, 75, 100);

    p5.rect(0, 0, lBoundary, p5.height-5);
    p5.rect(rBoundary, 0, rBoundary, p5.height-5);
  }

  return(
    <>
    {/* <h1 style={{ textAlign: 'center' }} >Time: {time}</h1> */}
    {calibrated.keypoints ? <Sketch setup={setup} draw={draw} /> : null}
    </>
  )

};

export default Game;
