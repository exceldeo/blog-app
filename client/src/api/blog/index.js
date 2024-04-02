import { apiClient, apiUnauthenticated } from "../apiClient";
import { toast } from "react-toastify";

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
    const response = await apiUnauthenticated.get(`/postDetail/${id}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useCreateBlog = async (blog) => {
  try {
    const response = await apiClient.post("/postCreate/", blog);
    if (response.status === 201) {
      toast.success("Post created successfully");
    } else {
      toast.error("Failed to create post");
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useUpdateBlog = async (blog) => {
  try {
    const response = await apiClient.post(`/postUpdate/`, blog);
    if (response.status === 200) {
      toast.success("Post updated successfully");
    } else {
      toast.error("Failed to update post");
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useDeleteBlog = async (blog) => {
  try {
    const response = await apiClient.post(`/postDelete/`, blog);
    if (response.status === 204) {
      toast.success("Post deleted successfully");
    } else {
      toast.error("Failed to delete post");
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useChangeStatusBlog = async (id) => {
  try {
    const response = await apiClient.post(`/postChangeStatus/`, { id: id });
    if (response.status === 200) {
      toast.success("Post status changed successfully");
    } else {
      toast.error("Failed to change post status");
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};
