// blogActions.js
import { FETCH_BLOGS, FETCH_BLOG } from "../types";
import { getBlogs } from "../../api/blog";

export const fetchBlogs = () => {
  return async (dispatch) => {
    try {
      const blogs = await getBlogs();
      dispatch({
        type: FETCH_BLOGS,
        payload: blogs,
      });
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };
};

export const fetchBlog = (id) => {
  // Here you would typically make a request to your backend API to fetch a single blog
  // For simplicity, we'll just return a dummy blog
  return {
    type: FETCH_BLOG,
    payload: { id, title: "Blog", content: "Content" },
  };
};
