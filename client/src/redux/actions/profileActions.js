// profileActions.js
import { UPDATE_PROFILE, FETCH_PROFILE } from "../types";
import { getProfile } from "../../api/profile";

export const updateProfile = (profile) => {
  // Here you would typically make a request to your backend API to update the user's profile
  // For simplicity, we'll just return the updated profile
  return {
    type: UPDATE_PROFILE,
    payload: profile,
  };
};

export const fetchProfile = () => {
  return async (dispatch) => {
    try {
      const response = await getProfile();
      dispatch({
        type: FETCH_PROFILE,
        payload: response,
      });
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };
};
