import C from '../constants';
import Firebase from 'firebase';

const questionRef = new Firebase(C.FIREBASE_URI).child('questions');

export const submitQuestion = (question) => {
  return (dispatch) => {
    dispatch({ type: C.QUESTION_DATA_SUBMITTING });
    questionRef.push(question).then((error) => {
      if (!error) {
        dispatch({ type: C.QUESTION_DATA_UPDATED });
      }
    }, (error) => {
      return dispatch({
        type: C.QUESTION_RESPONSE_FAILURE,
        error,
      });
    });
  };
};
