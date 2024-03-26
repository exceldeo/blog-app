// BlogPost.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlog } from "../../redux/actions/blogActions";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";

const BlogPost = () => {
  const dispatch = useDispatch();
  const blog = useSelector((state) => state.blog);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchBlog(id));
  }, [dispatch, id]);

  return (
    <div>
      <Typography variant="h2">{blog.title}</Typography>
      <Typography variant="body1">{blog.content}</Typography>
    </div>
  );
};

export default BlogPost;
