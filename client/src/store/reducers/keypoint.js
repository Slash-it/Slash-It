import {
  UPDATE_KEYPOINTS,
  CALIBRATE,
  GAMESTART
} from '../actions/action-types';

const defaultState = {
  keypoints: [],
  calibrated: {},
  isGameStarted: false,
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_KEYPOINTS:
      return { ...state, keypoints: action.keypoints };

    case CALIBRATE:
      return { ...state, calibrated: action.pose };
    
    case GAMESTART:
      return {...state, isGameStarted: action.bool};
  
    default:
      return state;
  }
};

export default reducer;