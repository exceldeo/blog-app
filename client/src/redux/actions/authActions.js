// authActions.js
import { LOGIN, LOGOUT, REGISTER, UPDATE_PROFILE } from "../types";
import {
  login as loginApi,
  logout as logoutApi,
  register as registerApi,
} from "../../api/auth";

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const response = await loginApi(username, password);
      dispatch({
        type: LOGIN,
        payload: response,
      });
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      await logoutApi();
      dispatch({
        type: UPDATE_PROFILE,
        payload: null,
      });
      dispatch({
        type: LOGOUT,
      });
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };
};

export const register = ({
  username,
  password,
  confirmPassword,
  email,
  fname,
  lname,
}) => {
  return async (dispatch) => {
    try {
      await registerApi({
        username,
        password,
        confirmPassword,
        email,
        fname,
        lname,
      });
      dispatch({
        type: REGISTER,
      });
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };
};
