// blogReducer.js
import {
  FETCH_BLOGS,
  FETCH_BLOG,
  CREATE_BLOG,
  DELETE_BLOG,
  UPDATE_BLOG,
} from "../types";

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
    case "CLEAR_BLOG":
      return { ...state, blog: null };
    case CREATE_BLOG:
      return { ...state };
    case DELETE_BLOG:
      return { ...state };
    case UPDATE_BLOG:
      return { ...state };
    default:
      return state;
  }
};

export default blogReducer;
