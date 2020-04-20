import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import collideCircle from "../helpers/collideCircle";
import { createHandKeypoint } from "../helpers/extend";
import Sketch from "react-p5";
import FruitLeft from "../objects/fruitLeft";
import FruitRight from "../objects/fruitRight";
import BombLeft from "../objects/bomLeft";
import BombRight from "../objects/bombRight";

const music = new Audio('/assets/audio/GameBg.mp3');

const Game = ({ width, height }) => {
  const [fruits, setFruits] = useState([]);
  const [bombs, setBombs] = useState([]);
  const [boundary, setBoundary] = useState(400);
  const [gameMode, setGameMode] = useState(2);
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
    music.play();
  }, []);

  const start = () => {
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
  }

  useEffect(() => {
    if (calibrated.keypoints) {
      start();
    }
  }, [calibrated, keypoints])

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(width, height).parent(canvasParentRef);
  }

  const draw = (p5) => {
    p5.clear()
    if(Math.random() >= gameConfig[gameMode].fruitTriggerConstant){
      setFruits([...fruits, new FruitLeft(
        p5, 
        boundary, 
        gameConfig[gameMode].gravity, 
        gameConfig[gameMode].vyRandomFactor,
      )]);
    };
    if(Math.random() >= gameConfig[gameMode].fruitTriggerConstant){
      setFruits([...fruits, new FruitRight(
        p5, 
        boundary, 
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
    
    p5.rect(0, 0, boundary, p5.height-5);
    p5.rect(p5.width - boundary, 0, boundary, p5.height-5);
  }

  return(
    <>
    {calibrated.keypoints ? <Sketch setup={setup} draw={draw} /> : null}
    </>
  )

};

export default Game;
