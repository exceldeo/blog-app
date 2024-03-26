// blogReducer.js
import { FETCH_BLOGS, FETCH_BLOG } from "../types";

const initialState = {
  blogs: null,
  blog: null,
};

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BLOGS:
      return { ...state, blogs: action.payload };
    case FETCH_BLOG:
      return { ...state, blog: action.payload };
    default:
      return state;
  }
};

export default blogReducer;
