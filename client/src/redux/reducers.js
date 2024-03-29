import { combineReducers } from "redux";
import blogReducer from "./reducers/blogReducer";
import profileReducer from "./reducers/profileReducer";
import authReducer from "./reducers/authReducer";
import commentReducer from "./reducers/commentReducer";

const rootReducer = combineReducers({
  blog: blogReducer,
  profile: profileReducer,
  auth: authReducer,
  comments: commentReducer,
});

export default rootReducer;
