import {
  UPDATE_KEYPOINTS,
  CALIBRATE,
  GAMESTART,
  START_PAUSE_COUNTER,
  PAUSE_GAME,
  RESUME_GAME,
  START_RESUME_COUNTER,
} from '../actions/action-types';

const defaultState = {
  keypoints: [],
  calibrated: {},
  isGameStarted: false,
  readyToPause: false,
  readyToResume: false,
  gamePaused: false,
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_KEYPOINTS:
      return { ...state, keypoints: action.keypoints };

    case CALIBRATE:
      return { ...state, calibrated: action.pose };
    
    case GAMESTART:
      return {...state, isGameStarted: action.bool};

    case START_PAUSE_COUNTER:
      return { ...state, readyToPause: action.bool };
    
    case START_RESUME_COUNTER:
      return { ...state, readyToResume: action.bool };

    case PAUSE_GAME:
      return { ...state, gamePaused: action.bool };
  
    case RESUME_GAME:
      return { ...state, gamePaused: action.bool };

    default:
      return state;
  }
};

export default reducer;