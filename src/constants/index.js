import auth from './auth';
import firebase from './firebase';
import usersConstant from './users_constant';
import question from './question';
import comment from './comment';

export default Object.assign({},
  auth,
  firebase,
  question,
  usersConstant,
  comment,
  usersConstant
);
