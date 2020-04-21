import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resumeGame, startResumeCounter } from '../store/actions/keypoints';

const PauseAndResume = () => {
  const dispatch = useDispatch();
  const readyToResume = useSelector((state) => state.keypoint.readyToResume);
  const [countdown, setCountdown] = React.useState(4);
  let timerId = useRef();

  const getCountdown = () => {
    setCountdown((countdown) => {
      return countdown - 1;
    });
  };

  React.useEffect(() => {
    if (readyToResume) {
      timerId.current = setInterval(() => {
        getCountdown();
      }, 1000);
    }
  }, [readyToResume]);

  useEffect(() => {
    return () => clearInterval(timerId.current);
  }, []);

  if (readyToResume) {
    if (countdown === 4) {
      return (
        <>
        <div className="countdown">
          <h1>RESUMING IN</h1>
          </div>
        </>
      );
    } else if (countdown === 0) {
      clearInterval(timerId.current);
      dispatch(resumeGame());
      dispatch(startResumeCounter(false));
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

export default PauseAndResume;
