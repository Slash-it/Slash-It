import React, { useState, useEffect, useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import { collideCircle, createHandKeypoint, findCoord } from '../helpers';
import Sketch from "react-p5";
import FruitLeft from "../objects/fruitLeft";
import FruitRight from "../objects/fruitRight";

const music = new Audio('/assets/audio/GameBg.mp3');

const Game = ({ width, height }) => {
  const [fruits, setFruits] = useState([]);
  const [boundary, setBoundary] = useState(300);
  const [time, setTime] = useState(10);
  const [isTimerOn, setIsTimerOn] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  let timerId = useRef();

  const calibrated = useSelector((state) => state.keypoint.calibrated);
  const keypoints = useSelector((state) => state.keypoint.keypoints);

  useEffect(() => {
    music.addEventListener('ended', function() {
      music.play();
    })
    music.volume = 0.5;
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
    setBoundary(rShoulder.x - lShoulder.x);
    const { letfHandKeypoints, rightHandKeypoints } = createHandKeypoint(
      keypoints
    );
  
    if (letfHandKeypoints) {
      for (let fruit of fruits) {
        if (
          collideCircle(
            letfHandKeypoints.x,
            letfHandKeypoints.y,
            150,
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
            150,
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
    if(Math.random() >= 0.98){
      setFruits([...fruits, new FruitLeft(p5, boundary)]);
    }
    if(Math.random() >= 0.98){
      setFruits([...fruits, new FruitRight(p5, boundary)]);
    }
    
    for(let fruit of fruits){
      fruit.show()
      fruit.move()
    }

    p5.fill(240, 0, 0)
    
    p5.rect(boundary, 0, 2, p5.height-5)
    p5.rect(p5.width - boundary, 0, 2, p5.height-5)
  }

  return(
    <>
    <h1 style={{ textAlign: 'center' }} >Time: {time}</h1>
    {calibrated.keypoints ? <Sketch setup={setup} draw={draw} /> : null}
    </>
  )

};

export default Game;
