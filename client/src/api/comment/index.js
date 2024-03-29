import { apiClient, apiUnauthenticated } from "../apiClient";

export const getComments = async ({ page = 1, id }) => {
  try {
    const response = await apiUnauthenticated.get(
      `/commentList/?page=${page}&post=${id}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useCreateComment = async (comment) => {
  try {
    const response = await apiClient.post("/commentCreate/", comment);
    return response.data;
  } catch (error) {
    throw error;
  }
};
