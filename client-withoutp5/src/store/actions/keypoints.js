import {
  UPDATE_KEYPOINTS,
  CALIBRATE,
} from './action-types'

export const updateKeypoints = (keypoints) => ({
  type: UPDATE_KEYPOINTS,
  keypoints
});

export const calibrate = (pose) => ({
  type: CALIBRATE,
  pose,
})
