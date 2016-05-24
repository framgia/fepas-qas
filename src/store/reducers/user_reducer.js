import C from '../../constants/users_constant';

const initialState = {
  hasReceiveData: false,
  isSubmitting: false,
  isError: false,
  data: {},
  status: {}
};

export default (state, action) => {
  let newState;
  switch (action.type) {
    case C.PROFILE_UPDATE:
      newState = Object.assign({}, state);
      newState.status[action.data.uid] = C.PROFILE_EDITTING;
      return newState;
    case C.PROFILE_DATA_SUBMITTING:
      return Object.assign({}, state, {
        hasReceiveData: false,
        isSubmitting: true
      });
    case C.PROFILE_DATA_UPDATED:
      return Object.assign({}, state, {
        hasReceiveData: true,
        isSubmitting: false
      });
    case C.PROFILE_RESPONSE_SUCCESS:
      return Object.assign({}, state, {
        data: action.data,
        hasReceiveData: true
      });
    case C.PROFILE_RESPONSE_FAILURE:
      return Object.assign({}, state, {
        isError: true,
        error: action.error
      });
    default:
      return state || initialState;
  }
};
