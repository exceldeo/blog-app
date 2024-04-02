// blogActions.js
import { FETCH_BLOGS, FETCH_BLOG } from "../types";
import {
  useCreateBlog,
  useChangeStatusBlog,
  useUpdateBlog,
  getBlog,
  getBlogs,
} from "../../api/blog";

export const fetchBlogs = ({ page = 1, guest = false }) => {
  return async (dispatch) => {
    try {
      const blogs = await getBlogs({ page: page, guest: guest });
      if (page > 1) {
        const additionalBlogs = await getBlogs({ page: page - 1 });
        blogs.results = [...additionalBlogs.results, ...blogs.results];
      }
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
  return async (dispatch) => {
    try {
      const blog = await getBlog(id);
      dispatch({
        type: FETCH_BLOG,
        payload: blog,
      });
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      // Create blog
      await useCreateBlog(blog);
      fetchBlogs();
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };
};

export const updateBlog = (blog) => {
  return async (dispatch) => {
    try {
      await useUpdateBlog(blog);
      fetchBlogs();
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };
};

export const changeStatusBlog = (id) => {
  return async (dispatch) => {
    try {
      await useChangeStatusBlog(id);
      fetchBlogs();
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };
};
