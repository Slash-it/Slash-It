import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import {
  KeypointReducer
} from './reducers';

const reducers = combineReducers({
  keypoint: KeypointReducer
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;