// profileActions.js
import { UPDATE_PROFILE, FETCH_PROFILE } from "../types";
import { getProfile } from "../../api/profile";
import { useUpdateProfile } from "../../api/profile";

export const updateProfile = (profile) => {
  return async (dispatch) => {
    try {
      const response = await useUpdateProfile(profile);
      dispatch({
        type: UPDATE_PROFILE,
        payload: response,
      });
    } catch (error) {
      console.error(error);
      // Handle error
    }
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
