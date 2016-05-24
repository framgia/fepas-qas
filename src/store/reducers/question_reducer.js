import C from '../../constants';

const initialState = {
  hasReceiveData: false,
  isSubmitting: false,
  isError: false,
  status: false,
  data: {},
  question: {},
  questions: {}
};

export default (state, action) => {
  switch (action.type) {
    case C.QUESTION_DATA_SUBMITTING:
      return Object.assign({}, state, {
        hasReceiveData: false,
        isSubmitting: true
      });
    case C.QUESTION_DATA_UPDATED:
      return Object.assign({}, state, {
        hasReceiveData: true,
        isSubmitting: false
      });
    case C.REQUEST_QUESTION:
      return Object.assign({}, state, {
        hasReceiveData: false,
        isSubmitting: true
      });
    case C.RECEIVE_QUESTION:
      return Object.assign({}, state, {
        status: true,
        questions: action.questions
      });
    default: return state || initialState;
  }
};
