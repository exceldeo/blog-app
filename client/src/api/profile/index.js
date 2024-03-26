import apiClient from "../apiClient";

export const getProfile = async () => {
  try {
    const response = await apiClient.get("/getProfile/");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async (profile) => {
  try {
    const response = await apiClient.put("/profile", profile);
    return response.data;
  } catch (error) {
    throw error;
  }
};
