import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import usersReducer from './users_reducer';
import vote from './vote';
import question from './question';

const rootReducer = combineReducers({
  auth,
  usersReducer,
  question,
  vote,
  routing: routerReducer
});

export default rootReducer;
