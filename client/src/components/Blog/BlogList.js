// BlogList.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../../redux/actions/blogActions";
import { List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";

const BlogList = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blog.blogs);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  return (
    <MainLayout>
      <List>
        {blogs &&
          blogs.results.map((blog) => (
            <ListItem key={blog.id}>
              <ListItemText
                primary={blog.title}
                secondary={<Link to={`/blog/${blog.id}`}>Read More</Link>}
              />
            </ListItem>
          ))}
      </List>
    </MainLayout>
  );
};

export default BlogList;
