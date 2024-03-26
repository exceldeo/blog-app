// authReducer.js
import { LOGIN, LOGOUT, REGISTER } from "../types";

const initialState = {
  token: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        token: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        token: null,
      };
    case REGISTER:
      return action.payload;
    default:
      return state;
  }
};

export default authReducer;
