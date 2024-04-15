import React, { useEffect } from "react";
import MainLayout from "../Layout/MainLayout";
import { List, Button } from "@mui/material";
import { Typography } from "@mui/material";
import CardPost from "../../ui-component/cards/CardPost";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../../redux/actions/blogActions";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

const SearchPost = () => {
  const location = useLocation();
  const { start_date, end_date } = queryString.parse(location.search);
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blog.blogs);

  useEffect(() => {
    dispatch(fetchBlogs({ guest: true, start_date, end_date }));
  }, [dispatch, start_date, end_date]);

  const handleLoadMore = () => {
    const nextPage = new URL(blogs.next).searchParams.get("page");
    dispatch(
      fetchBlogs({
        page: parseInt(nextPage),
        guest: true,
        start_date,
        end_date,
      })
    );
  };

  return (
    <MainLayout>
      <Typography variant="h4" sx={{ textAlign: "center", mt: 5 }}>
        Search Result For Date
      </Typography>
      <Typography variant="h6" sx={{ textAlign: "center", mb: 5 }}>
        {start_date} s/d {end_date}
      </Typography>
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

export default SearchPost;
