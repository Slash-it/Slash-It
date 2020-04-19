import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import collideCircle from '../helpers/collideCircle';
import { createHandKeypoint } from '../helpers/extend';
import Sketch from "react-p5";
import FruitLeft from "../objects/fruitLeft";
import FruitRight from "../objects/fruitRight";

const music = new Audio('/assets/audio/GameBg.mp3');

const Game = ({ width, height }) => {
  const [fruits, setFruits] = useState([]);
  const [boundary, setBoundary] = useState(300);

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
    {calibrated.keypoints ? <Sketch setup={setup} draw={draw} /> : null}
    </>
  )

};

export default Game;
