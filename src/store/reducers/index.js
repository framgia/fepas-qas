import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import usersReducer from './users_reducer';
import question from './question';
import comment from './comment';

const rootReducer = combineReducers({
  auth,
  usersReducer,
  question,
  comment,
  routing: routerReducer
});

export default rootReducer;
