import apiClient from "../apiClient";

export const login = async (username, password) => {
  try {
    const response = await apiClient.post("/login/", { username, password });
    if (response.data.refresh && response.data.access) {
      localStorage.setItem("refreshToken", response.data.refresh);
      localStorage.setItem("accessToken", response.data.access);
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
    console.log("register : ", data);
    const response = await apiClient.post("/register/", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    console.log("refresh : ", localStorage.getItem("refreshToken"));
    const response = await apiClient.post("/logout/", {
      refresh_token: localStorage.getItem("refreshToken"),
    });
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
    if (response.status === 400) {
      return "success";
    }
    return response.data;
  } catch (error) {
    throw error;
  }
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
