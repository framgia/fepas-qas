import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import usersReducer from './users_reducer';

const rootReducer = combineReducers({
  auth,
  usersReducer,
  routing: routerReducer
});

export default rootReducer;
