// BlogList.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../../../redux/actions/blogActions";
import { List, Button } from "@mui/material";
import { Link } from "react-router-dom";
import MainLayout from "../../Layout/MainLayout";
import MainCard from "../../../ui-component/cards/MainCard";
import { Typography } from "@mui/material";
import SecondaryAction from "../../../ui-component/cards/CardSecondaryAction";
import {
  IconEye,
  IconLock,
  IconLockOpen,
  IconPencil,
} from "@tabler/icons-react";
import { changeStatusBlog } from "../../../redux/actions/blogActions";

const BlogList = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blog.blogs);
  const profile = useSelector((state) => state.profile);
  useEffect(() => {
    dispatch(fetchBlogs({}));
  }, [dispatch]);

  const handleLoadMore = () => {
    const nextPage = new URL(blogs.next).searchParams.get("page");
    dispatch(fetchBlogs({ page: parseInt(nextPage) }));
  };

  const handleStatusChange = (id) => {
    dispatch(changeStatusBlog(id)).then(() => {
      dispatch(fetchBlogs({}));
    });
  };

  return (
    <MainLayout>
      <Typography variant="h2" sx={{ textAlign: "center", mt: 5, mb: 5 }}>
        Welcome to Blog
      </Typography>
      <Button
        component={Link}
        to="/user/create-blog"
        variant="contained" // Changed variant to outlined
        color="primary"
        sx={{ margin: "auto" }} // Centered the button
      >
        Create Blog
      </Button>
      <List>
        {blogs && blogs.results.length !== 0 ? (
          blogs.results.map((blog) => (
            <MainCard
              title={
                blog.title + " (" + (blog.active ? "Active" : "Inactive") + ")"
              }
              key={blog.id}
              sx={{ mb: 3 }}
              secondary={
                <>
                  {blog.author === profile.username && (
                    <>
                      <SecondaryAction
                        icon={<IconEye fontSize="small" />}
                        link={"/user/blog/" + blog.id}
                        title={"Detail"}
                        contentSX={{
                          marginRight: 1,
                        }}
                      />
                      <SecondaryAction
                        icon={<IconPencil fontSize="small" />}
                        link={"/user/edit-blog/" + blog.id}
                        title={"Edit"}
                        contentSX={{
                          marginRight: 1,
                        }}
                      />
                    </>
                  )}
                  <SecondaryAction
                    icon={
                      blog.active ? (
                        <IconLock fontSize="small" />
                      ) : (
                        <IconLockOpen fontSize="small" />
                      )
                    }
                    title={"Change Status"}
                    onclick={() => {
                      handleStatusChange(blog.id);
                    }}
                  />
                </>
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
                }}>
                {blog.content}
              </Typography>
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
