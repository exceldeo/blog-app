import { apiClient, apiUnauthenticated } from "../apiClient";
import { toast } from "react-toastify";

export const getComments = async ({ page = 1, id }) => {
  try {
    const response = await apiUnauthenticated.get(
      `/commentList/?page=${page}&post=${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useCreateComment = async (comment) => {
  try {
    const response = await apiClient.post("/commentCreate/", comment);
    if (response.status === 201) {
      toast.success("Comment created successfully");
    } else {
      toast.error("Failed to create comment");
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};
