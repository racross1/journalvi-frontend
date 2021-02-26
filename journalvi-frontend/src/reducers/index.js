import { combineReducers } from 'redux';
import userReducer from './users';
import entryReducer from './entries';

const rootReducer = combineReducers({
  userReducer,
  entryReducer
});

export default rootReducer

