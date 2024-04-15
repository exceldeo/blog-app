// BlogPost.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlog } from "../../redux/actions/blogActions";
import { useParams } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";
import MainLayout from "../Layout/MainLayout";
import MainCard from "../../ui-component/cards/MainCard";
import CommentList from "./comment/CommentList";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link } from "react-router-dom";

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
            <Grid item xs={12}>
              <Button
                component={Link}
                to="/"
                sx={{
                  mt: 2,
                  textDecoration: "none",
                }}>
                <IconArrowLeft />
              </Button>
            </Grid>
            <Typography variant="h2" sx={{ textAlign: "center", mt: 5, mb: 5 }}>
              {blog.blog?.title}
              <span
                style={{
                  fontSize: ".8rem",
                  display: "block",
                  color: "#6b7280",
                  fontWeight: "400",
                }}>
                {new Date(blog.blog?.created_at).toLocaleDateString()}
              </span>
            </Typography>
            <Typography variant="body1">{blog.blog?.content}</Typography>
          </MainCard>
          <CommentList idPost={id} />
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export default BlogPost;
