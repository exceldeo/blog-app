// profileReducer.js
import { UPDATE_PROFILE, FETCH_PROFILE } from "../types";

const initialState = {
  user: null,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PROFILE:
      return {
        ...state,
        user: action.payload,
      };
    case FETCH_PROFILE:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default profileReducer;
