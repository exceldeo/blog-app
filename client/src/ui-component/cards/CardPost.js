// CardPost.js
import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import MainCard from "./MainCard";
import { Typography } from "@mui/material";

const CardPost = ({ blog }) => (
  <MainCard
    title={blog.title}
    key={blog.id}
    sx={{ mb: 3 }}
    secondary={new Date(blog.created_at).toLocaleDateString()}
    content={false}>
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
);

export default CardPost;
