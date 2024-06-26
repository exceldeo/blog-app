import { apiUnauthenticated, apiClient } from "../apiClient";
import { toast } from "react-toastify";

export const login = async (username, password) => {
  try {
    const response = await apiUnauthenticated.post("/login/", {
      username,
      password,
    });
    if (response.data.refresh && response.data.access) {
      localStorage.setItem("refreshToken", response.data.refresh);
      localStorage.setItem("accessToken", response.data.access);
    }

    if (response.status === 200) {
      toast.success("Login successful");
    } else {
      toast.error("Failed to login");
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const register = async ({
  username,
  password,
  confirmPassword,
  email,
  fname,
  lname,
}) => {
  const data = {
    username: username,
    password: password,
    password2: confirmPassword,
    email: email,
    first_name: fname,
    last_name: lname,
  };
  try {
    const response = await apiUnauthenticated.post("/register/", data);

    if (response.status === 201) {
      toast.success("User created successfully");
    } else {
      toast.error("Failed to create user");
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  const response = await apiClient
    .post("/logout/", {
      refresh_token: localStorage.getItem("refreshToken"),
    })
    .catch((error) => {
      return error.response;
    });
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("accessToken");
  if (response.status === 400 || response.status === 401) {
    return "success";
  }
  return response.data;
};

export const refreshToken = async () => {
  try {
    const response = await apiClient.post("/refresh/");
    if (response.data.access) {
      localStorage.setItem("accessToken", response.data.access);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};
