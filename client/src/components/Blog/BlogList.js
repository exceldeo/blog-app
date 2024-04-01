// BlogList.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../../redux/actions/blogActions";
import { List, Button } from "@mui/material";
import MainLayout from "../Layout/MainLayout";
import { Typography } from "@mui/material";
import CardPost from "../../ui-component/cards/CardPost";

const BlogList = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blog.blogs);

  useEffect(() => {
    dispatch(fetchBlogs({ guest: true }));
  }, [dispatch]);

  const handleLoadMore = () => {
    const nextPage = new URL(blogs.next).searchParams.get("page");
    dispatch(fetchBlogs({ page: parseInt(nextPage), guest: true }));
  };
  return (
    <MainLayout>
      <List>
        {blogs && blogs.results.length !== 0 ? (
          blogs.results.map((blog, idx) => <CardPost blog={blog} key={idx} />)
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
