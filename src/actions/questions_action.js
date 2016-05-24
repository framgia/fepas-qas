import C from '../constants';
import Firebase from 'firebase';

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
        error,
      });
    });
    createTag(newQuestion.key(), question);
  };
}

function requestQuestion(questions) {
  return {
    type: C.REQUEST_QUESTION,
    questions
  };
}

function receiveQuestion(questions) {
  return {
    type: C.RECEIVE_QUESTION,
    questions,
  };
}

function fetchQuestion(questions, key = '', tag = '') {
  return (dispatch) => {
    dispatch(requestQuestion(questions));
    if (key) {
      questionRef.orderByKey().startAt(key).endAt(key).on('child_added', (snapshot) => {
        const question = snapshot.val();
        dispatch(receiveQuestion({ [key]: question }));
      });
    } else {
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
    }
  };
}

export { submitQuestion, fetchQuestion };
