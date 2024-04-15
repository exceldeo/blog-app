import { apiClient } from "../apiClient";

export const getAllUsers = async () => {
  try {
    const response = await apiClient.get("/getAllUsers/");
    return response.data;
  } catch (error) {
    throw error;
  }
};
