import {
  UPDATE_KEYPOINTS,
} from './action-types'

export const update_keypoints = (keypoints) => ({
  type: UPDATE_KEYPOINTS,
  keypoints
});
