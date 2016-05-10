import C from '../../constants';

const initialState = {
  hasReceiveData: false,
  isSubmitting: false,
  isError: false,
  data: {},
  status: false
};

export default (state, action) => {
  switch (action.type) {
    case C.QUESTION_DETAIL_GET:
      return Object.assign({}, state, {
        status: true,
        data: action.data,
      });
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
    default: return state || initialState;
  }
};
