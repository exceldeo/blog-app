import { combineReducers } from "redux";
import blogReducer from "./reducers/blogReducer";
import profileReducer from "./reducers/profileReducer";
import authReducer from "./reducers/authReducer";

const rootReducer = combineReducers({
  blog: blogReducer,
  profile: profileReducer,
  auth: authReducer,
});

export default rootReducer;
