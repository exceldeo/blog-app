import apiClient from "../apiClient";

export const getBlogs = async () => {
  try {
    const response = await apiClient.get("/postList/");
    console.log(response.data);
    console.log("fetching blogs");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBlog = async (id) => {
  try {
    const response = await apiClient.get(`/postDetail/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createBlog = async (blog) => {
  try {
    const response = await apiClient.post("/postCreate/", blog);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateBlog = async (blog) => {
  try {
    const response = await apiClient.post(`/postUpdate/`, blog);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteBlog = async (blog) => {
  try {
    const response = await apiClient.post(`/postDelete/`, blog);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const changeStatusBlog = async (blog) => {
  try {
    const response = await apiClient.post(`/postChangeStatus/`, blog);
    return response.data;
  } catch (error) {
    throw error;
  }
};
