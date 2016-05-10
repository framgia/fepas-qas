import C from '../../constants';

const initialState = {
  status: false,
  date: {}
};

export default (state, action) => {
  switch (action.type) {
    case C.VOTES_GET:
      return Object.assign({}, state, {
        status: true,
        data: action.data,
      });
    default: return state || initialState;
  }
};
