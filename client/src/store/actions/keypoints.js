import {
  UPDATE_KEYPOINTS,
  CALIBRATE,
  GAMESTART,
  START_PAUSE_COUNTER,
  PAUSE_GAME,
} from './action-types'

export const updateKeypoints = (keypoints) => ({
  type: UPDATE_KEYPOINTS,
  keypoints
});

export const calibrate = (pose) => ({
  type: CALIBRATE,
  pose,
});

export const gameStart = () => ({
  type: GAMESTART,
  bool: true,
});

export const startPauseCounter = () => ({
  type: START_PAUSE_COUNTER,
  bool: true
});

export const pauseGame = () => ({
  type: PAUSE_GAME,
  bool: true,
});
