import {
  UPDATE_KEYPOINTS,
  CALIBRATE,
  GAMESTART,
} from './action-types'

export const updateKeypoints = (keypoints) => ({
  type: UPDATE_KEYPOINTS,
  keypoints
});

export const calibrate = (pose) => ({
  type: CALIBRATE,
  pose,
})

export const gameStart = () => ({
  type: GAMESTART,
  bool: true,
});
