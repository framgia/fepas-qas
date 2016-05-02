import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import usersReducer from './users_reducer';
import question from './question';

const rootReducer = combineReducers({
  auth,
  usersReducer,
  question,
  routing: routerReducer
});

export default rootReducer;
