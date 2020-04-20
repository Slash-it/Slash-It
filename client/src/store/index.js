import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import {
  KeypointReducer,
  ItemReducer,
} from './reducers';

const reducers = combineReducers({
  keypoint: KeypointReducer,
  item: ItemReducer,
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;