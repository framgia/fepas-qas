import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authReducer from './auth_reducer';
import userReducer from './user_reducer';
import questionReducer from './question_reducer';
import commentReducer from './comment_reducer';

const rootReducer = combineReducers({
  authReducer,
  userReducer,
  questionReducer,
  commentReducer,
  routing: routerReducer
});

export default rootReducer;
