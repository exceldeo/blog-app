import { apiClient, apiUnauthenticated } from "../apiClient";

export const getBlogs = async ({ page = 1, guest = false }) => {
  try {
    if (guest) {
      const response = await apiUnauthenticated.get(`/postList/?page=${page}`);
      return response.data;
    }

    const response = await apiClient.get(`/postList/?page=${page}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBlog = async (id) => {
  try {
    const response = await apiClient.get(`/postDetail/${id}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useCreateBlog = async (blog) => {
  try {
    const response = await apiClient.post("/postCreate/", blog);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useUpdateBlog = async (blog) => {
  try {
    const response = await apiClient.post(`/postUpdate/`, blog);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useDeleteBlog = async (blog) => {
  try {
    const response = await apiClient.post(`/postDelete/`, blog);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useChangeStatusBlog = async (id) => {
  try {
    const response = await apiClient.post(`/postChangeStatus/`, { id: id });
    return response.data;
  } catch (error) {
    throw error;
  }
};
