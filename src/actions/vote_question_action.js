import C from '../constants';
import Firebase from 'firebase';

const voteRef = new Firebase(C.FIREBASE_URI).child('votes');
const qRef = new Firebase(C.FIREBASE_URI).child('questions');

const updateQuestionVoteCount = (qId, vote) => {
  qRef.orderByChild('id').equalTo(qId).once('child_added').then((snap) => {
    qRef.child(snap.key()).update({ vote_count: snap.val().vote_count + vote });
  });
};

export const upVoteQuestion = (questionId) => {
  return (dispatch, getState) => {
    const state = getState();
    const vote = { uid: state.auth.uid, flag: 'up', qid: questionId };
    dispatch({ type: C.QUESTION_VOTE_UP_SUBMITTING });
    updateQuestionVoteCount(questionId, 1);
    voteRef.push(vote).then((error) => {
      if (!error) {
        dispatch({ type: C.QUESTION_VOTE_UP_SUBMITED });
      }
    }, (error) => {
      return dispatch({
        type: C.QUESTION_VOTE_FAILURE,
        error,
      });
    });
  };
};

export const downVoteQuestion = (questionId) => {
  return (dispatch, getState) => {
    const state = getState();
    const vote = { uid: state.auth.uid, flag: 'down', qid: questionId };
    dispatch({ type: C.QUESTION_VOTE_DOWN_SUBMITTING });
    updateQuestionVoteCount(questionId, -1);
    voteRef.push(vote).then((error) => {
      if (!error) {
        dispatch({ type: C.QUESTION_VOTE_DOWN_SUBMITED });
      }
    }, (error) => {
      return dispatch({
        type: C.QUESTION_VOTE_FAILURE,
        error,
      });
    });
  };
};
