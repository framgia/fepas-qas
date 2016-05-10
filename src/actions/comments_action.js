import C from '../constants';
import Firebase from 'firebase';

const commentRef = new Firebase(C.FIREBASE_URI).child('comments');

export const submitComment = (answer) => {
  return (dispatch) => {
    dispatch({ type: C.COMMENT_DATA_SUBMITTING });
    commentRef.push(answer).then((error) => {
      if (!error.catch) {
        dispatch({ type: C.COMMENT_DATA_UPDATED });
        window.CKEDITOR.instances.new_answer.setData('');
      } else {
        dispatch({ type: C.COMMENT_RESPONSE_FAILURE });
      }
    });
  };
};
