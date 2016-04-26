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
      console.log(C.PROFILE_UPDATE, state, action);
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
      console.log(C.PROFILE_RESPONSE_SUCCESS, state, action);
      return Object.assign({}, state, {
        data: action.data,
        hasReceiveData: true
      });
    case C.PROFILE_RESPONSE_FAILURE:
      console.log(C.PROFILE_RESPONSE_FAILURE, state, action);
      return Object.assign({}, state, {
        isError: true,
        error: action.error
      });
    default:
      console.log('USER DEFAULT', state, initialState);
      return state || initialState;
  }
};
