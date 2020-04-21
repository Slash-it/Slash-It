import React, { useRef, useEffect } from 'react';
import './style/Ready.css';
import { useSelector, useDispatch } from 'react-redux';
import { pauseGame } from '../store/actions/keypoints';

const PauseCounter = () => {
  const dispatch = useDispatch();
  const startPauseCounter = useSelector((state) => state.keypoint.readyToPause);
  const gamePaused = useSelector((state) => state.keypoint.gamePaused);
  const [countdown, setCountdown] = React.useState(4);
  let timerId = useRef();

  const getCountdown = () => {
    setCountdown((countdown) => {
      return countdown - 1;
    });
  };

  React.useEffect(() => {
    if (startPauseCounter && !gamePaused) {
      timerId.current = setInterval(() => {
        getCountdown();
      }, 1000);
    }
  }, [startPauseCounter, gamePaused]);

  if (startPauseCounter && !gamePaused) {
    if (countdown === 4) {
      return (
        <>
        <div className="countdown">
          <h1>PAUSE IN </h1>
          </div>
        </>
      );
    } else if (countdown === 0) {
      clearInterval(timerId.current);
      dispatch(pauseGame());
    } else {
      return ( 
      <>
      <div className="countdown">
          <h1>{countdown}</h1>
          </div>
      </>
      )
    }
  } else {
    return null;
  }
};

export default PauseCounter;
