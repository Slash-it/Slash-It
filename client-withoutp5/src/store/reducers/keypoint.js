import {
  UPDATE_KEYPOINTS,
  CALIBRATE
} from '../actions/action-types';

const defaultState = {
  keypoints: [],
  calibrated: {}
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_KEYPOINTS:
      return { ...state, keypoints: action.keypoints };

    case CALIBRATE:
      return { ...state, calibrated: action.pose };
  
    default:
      return state;
  }
};

export default reducer;