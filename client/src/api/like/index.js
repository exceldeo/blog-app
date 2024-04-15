import { apiClient } from "../apiClient";
import { toast } from "react-toastify";

export const createLike = async (post) => {
  try {
    const response = await apiClient.post("/likeCreate/", {
      post: post,
    });

    if (response.status === 200 || response.status === 201) {
      toast.success("Post liked successfully");
      return response.data;
    } else {
      toast.error("Failed to like post");
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      toast.error("Authentication failed. Please login to like a post.");
    } else {
      toast.error("An unexpected error occurred.");
    }
  }
};

export const deleteLike = async (post) => {
  try {
    const response = await apiClient.post("/likeDelete/", {
      post: post,
    });
    if (response.status === 204 || response.status === 200) {
      toast.success("Post unliked successfully");
      return response.data;
    } else {
      toast.error("Failed to unlike post");
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      toast.error("Authentication failed. Please login to unlike a post.");
    } else {
      toast.error("An unexpected error occurred.");
    }
  }
};
