// CardPost.js
import React from "react";
import { Box, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import MainCard from "./MainCard";
import { Typography } from "@mui/material";
import {
  IconHeart,
  IconHeartFilled,
  IconMessageCircle,
} from "@tabler/icons-react";
import { useSelector } from "react-redux";
import { motion, useAnimation } from "framer-motion";
import { createLike, deleteLike } from "../../api/like/index";
import { useDispatch } from "react-redux";
import { fetchBlogs } from "../../redux/actions/blogActions";

const CardPost = ({ blog }) => {
  const { user } = useSelector((state) => state.profile);
  const controls = useAnimation();
  const sequence = async () => {
    await controls.start({ scale: 1.3, transition: { duration: 0.2 } });
    await controls.start({ scale: 1, transition: { duration: 0.2 } });
  };
  const dispatch = useDispatch();

  const handleLike = async (post_id) => {
    await createLike(post_id).then(() => {
      dispatch(fetchBlogs({}));
    });
  };

  const handleUnlike = async (post_id) => {
    await deleteLike(post_id).then(() => {
      dispatch(fetchBlogs({}));
    });
  };

  const handleHeartClick = () => {
    sequence();
    const isLiked = blog.likes.some((like) => like.author === user.username);
    if (isLiked) {
      handleUnlike(blog.id);
    } else {
      handleLike(blog.id);
    }
  };

  return (
    <MainCard
      title={blog.title}
      key={blog.id}
      sx={{ mb: 3 }}
      secondary={new Date(blog.created_at).toLocaleDateString()}
      content={false}
      options={
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            px: 1,
            pb: 1,
          }}>
          <motion.div animate={controls} onClick={handleHeartClick}>
            {(blog?.likes.length > 0) &
            blog?.likes.some((like) => {
              return like?.author === user?.username;
            }) ? (
              <IconHeartFilled
                stroke={1.5}
                size="1.3rem"
                fill="red"
                color="red"
                style={
                  blog?.likes.length > 0 ? { color: "red" } : { color: "gray" }
                }
              />
            ) : (
              <IconHeart stroke={1.5} size="1.3rem" color="gray" />
            )}
          </motion.div>
          <Box sx={{ ml: 0.5 }} />
          <IconMessageCircle
            stroke={1.5}
            size="1.3rem"
            style={{ color: "#6b7280" }}
          />{" "}
          <Typography variant="body2" sx={{ ml: 0.5 }}>
            {blog.comments_count}
          </Typography>
        </Grid>
      }>
      <Typography
        variant="body2"
        sx={{
          whiteSpace: "pre-line",
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          py: 2,
          px: 1,
        }}>
        {blog.content}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", p: 1 }}>
        <Button component={Link} to={`/blog/${blog.id}`}>
          Read More
        </Button>
      </Box>
    </MainCard>
  );
};

export default CardPost;
