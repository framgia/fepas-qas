import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import userReducer from './user_reducer';
import questionReducer from './question_reducer';
import commentReducer from './comment_reducer';

const rootReducer = combineReducers({
  auth,
  userReducer,
  questionReducer,
  commentReducer,
  routing: routerReducer
});

export default rootReducer;
