import { combineReducers } from 'redux';
import userReducer from './users';
import entryReducer from './entries';
import timeReducer from './times';

const rootReducer = combineReducers({
  userReducer,
  entryReducer,
  timeReducer
});

export default rootReducer

