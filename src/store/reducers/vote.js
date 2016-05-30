import C from '../../constants' const initialState = {
  hasReceiveData: false,
  isSubmitting: false,
  isError: false,
  data: {},
  status: false
};

export default (state, action) => {
  switch (action.type) {
    case C.QUESTION_VOTE_UP_SUBMITTING || C.QUESTION_VOTE_DOWN_SUBMITTING
      return Object.assign({}, state, {
        hasReceiveData: false,
        isSubmitting: true
      });
    case C.QUESTION_VOTE_DOWN_SUBMITTED || C.QUESTION_VOTE_UP_SUBMITTED
      return Object.assign({}, state, {
        hasReceiveData: true,
        isSubmitting: false
      });
    case C.QUESTION_VOTE_FAILURE
      return Object.assign({}, state, {
        isError: true,
        error: action.error
      });
  default:
    return state || initialState;
  }
};
