// BlogPost.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlog } from "../../../redux/actions/blogActions";
import { useParams, Link } from "react-router-dom"; // Import Link
import { Grid, Typography, IconButton } from "@mui/material"; // Import IconButton
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"; // Import ArrowBackIosIcon
import MainLayout from "../../Layout/MainLayout";
import MainCard from "../../../ui-component/cards/MainCard";

const BlogPost = () => {
  const dispatch = useDispatch();
  const blog = useSelector((state) => state.blog);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchBlog(id));
  }, [dispatch, id]);

  return (
    <MainLayout>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <MainCard>
            <Link to="/user/blogs" style={{ textDecoration: "none" }}>
              {" "}
              {/* Add Link */}
              <IconButton>
                {" "}
                {/* Add IconButton */}
                <ArrowBackIosIcon /> {/* Add ArrowBackIosIcon */}
              </IconButton>
            </Link>
            <Typography variant="h2" sx={{ textAlign: "center", mt: 5, mb: 5 }}>
              {blog.blog?.title}
            </Typography>
            <Typography variant="body1">{blog.blog?.content}</Typography>
          </MainCard>
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export default BlogPost;
