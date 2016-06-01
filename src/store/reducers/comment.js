import C from '../../constants';

const initialState = {
  status: false,
  data: {}
};

export default (state, action) => {
  switch (action.type) {
    case C.COMMENTS_GET:
      return Object.assign({}, state, {
        status: true,
        data: action.data,
      });
    default: return state || initialState;
  }
};
