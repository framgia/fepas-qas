import C from '../constants';
import Firebase from 'firebase';
import { browserHistory } from 'react-router';

const questionRef = new Firebase(C.FIREBASE_URI).child('questions');
const tagRef = new Firebase(C.FIREBASE_URI).child('tags');

function createTag(key, question) {
  question.tag.forEach((t) => {
    tagRef.orderByKey().equalTo(t).limitToFirst(1).once('value', (snapshot) => {
      const tag = snapshot.val();
      if (tag) {
        tagRef.child(t).update({ questions: [...tag[t].questions, { [key]: question }] });
      } else {
        tagRef.child(t).update({ questions: [{ [key]: question }] });
      }
    });
  });
}

function submitQuestion(question) {
  return (dispatch) => {
    dispatch({ type: C.QUESTION_DATA_SUBMITTING });
    const newQuestion = questionRef.push(question, (error) => {
      if (!error) {
        return dispatch({
          type: C.QUESTION_DATA_UPDATED
        });
      }
      return dispatch({
        type: C.QUESTION_RESPONSE_FAILURE,
        error
      });
    });
    createTag(newQuestion.key(), question);
    browserHistory.push(`/question/${newQuestion.key()}`);
  };
}

function updateQuestion(questionId, question) {
  return (dispatch) => {
    dispatch({ type: C.QUESTION_DATA_SUBMITTING });
    questionRef.child(questionId).set(question, (error) => {
      if (!error) {
        return dispatch({
          type: C.QUESTION_DATA_UPDATED
        });
      }
      return dispatch({
        type: C.QUESTION_RESPONSE_FAILURE,
        error
      });
    });

    // TODO: Update tag references when update new tags of existing question.
    createTag(questionId, question);
    browserHistory.push(`/question/${questionId}`);
  };
}

function requestQuestion(data) {
  return {
    type: C.REQUEST_QUESTION,
    data
  };
}

function receiveQuestion(data) {
  return {
    type: C.RECEIVE_QUESTION,
    data
  };
}

function getQuestionById(question, id) {
  return (dispatch) => {
    dispatch(requestQuestion(question));
    questionRef.orderByKey().startAt(id).endAt(id).on('child_added', (snapshot) => {
      dispatch(receiveQuestion(Object.assign(snapshot.val(), { key: id })));
    });
  };
}

function fetchQuestion(questions, tag = '') {
  return (dispatch) => {
    dispatch(requestQuestion(questions));
    if (tag) {
      tagRef.orderByKey().equalTo(tag).limitToFirst(1).once('child_added', (snapshot) => {
        const res = snapshot.val();
        if (res) {
          const qs = {};
          res.questions.forEach((q) => {
            Object.assign(qs, q);
          });
          dispatch(receiveQuestion(qs));
        } else {
          dispatch(receiveQuestion({}));
        }
      });
    } else {
      questionRef.once('value', (snapshot) => {
        dispatch(receiveQuestion(snapshot.val()));
      }, (error) => {
        console.log(error);
      });
    }
  };
}

export {
  submitQuestion,
  fetchQuestion,
  getQuestionById,
  updateQuestion
};
