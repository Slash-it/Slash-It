import {
  UPDATE_KEYPOINTS,
} from '../actions/action-types';

const defaultState = {
  keypoints = []
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_KEYPOINTS:
      return { ...state, keypoints: action.keypoints };
  
    default:
      return state;
  }
};

export default reducer;