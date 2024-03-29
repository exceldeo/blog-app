import { CREATE_COMMENT, FETCH_COMMENTS } from "../types";

const initialState = {
  comments: null,
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMMENTS:
      return { ...state, comments: action.payload };
    case CREATE_COMMENT:
      return { ...state };
    default:
      return state;
  }
};

export default commentReducer;
