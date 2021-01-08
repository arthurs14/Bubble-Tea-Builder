import * as actionTypes from './actions';

const initialState = {
  ingredients: null,
  price: 4,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENTS:
      return state;
    case actionTypes.REMOVE_INGREDIENTS:
      return state;
    default:
      return state;
  }
};

export default reducer;