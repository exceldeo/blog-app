// BlogList.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../../redux/actions/blogActions";
import { List, Button } from "@mui/material";
import { Link } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import MainCard from "../../ui-component/cards/MainCard";
import { Typography } from "@mui/material";

const BlogList = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blog.blogs);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const handleLoadMore = () => {
    const nextPage = new URL(blogs.next).searchParams.get("page");
    dispatch(fetchBlogs(parseInt(nextPage)));
  };
  return (
    <MainLayout>
      <List>
        {blogs && blogs.results.length !== 0 ? (
          blogs.results.map((blog) => (
            <MainCard title={blog.title} key={blog.id} sx={{ mb: 3 }}>
              <Typography
                variant="body2"
                sx={{
                  whiteSpace: "pre-line",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                }}>
                {blog.content}
              </Typography>
              <Button component={Link} to={`/blog/${blog.id}`}>
                Read More
              </Button>
            </MainCard>
          ))
        ) : (
          <Typography variant="h6" sx={{ textAlign: "center", mt: 5, mb: 5 }}>
            No Data Blog
          </Typography>
        )}
      </List>
      {blogs && blogs.next && (
        <Button
          onClick={handleLoadMore}
          variant="outlined" // Changed variant to outlined
          color="primary"
          sx={{ margin: "auto", display: "block" }} // Centered the button
        >
          More
        </Button>
      )}
    </MainLayout>
  );
};

export default BlogList;
