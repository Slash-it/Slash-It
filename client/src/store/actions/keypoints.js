import {
  UPDATE_KEYPOINTS,
  CALIBRATE,
  GAMESTART,
  START_PAUSE_COUNTER,
  PAUSE_GAME,
  RESUME_GAME,
  START_RESUME_COUNTER,
} from './action-types'

export const updateKeypoints = (keypoints) => ({
  type: UPDATE_KEYPOINTS,
  keypoints
});

export const calibrate = (pose) => ({
  type: CALIBRATE,
  pose,
});

export const gameStart = (bool) => ({
  type: GAMESTART,
  bool,
});

export const startPauseCounter = (bool) => ({
  type: START_PAUSE_COUNTER,
  bool
});

export const startResumeCounter = (bool) => ({
  type: START_RESUME_COUNTER,
  bool
})

export const pauseGame = () => ({
  type: PAUSE_GAME,
  bool: true,
});

export const resumeGame = () => ({
  type: RESUME_GAME,
  bool: false,
});
