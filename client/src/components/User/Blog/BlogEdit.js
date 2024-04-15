import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBlog, fetchBlog } from "../../../redux/actions/blogActions";
import { useParams } from "react-router-dom";
import { Formik } from "formik";
import MainLayout from "../../Layout/MainLayout";
import MainCard from "../../../ui-component/cards/MainCard";
import {
  Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import AnimateButton from "../../../ui-component/extended/AnimateButton";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const UpdatePost = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { blog } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(fetchBlog(id));
  }, [dispatch, id]);

  const [initialValues, setInitialValues] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    if (blog) {
      setInitialValues({
        title: blog.title,
        content: blog.content,
      });
    }
  }, [blog]);

  const validationSchema = Yup.object().shape({
    title: Yup.string().max(255).required("Title is required"),
    content: Yup.string().required("Content is required"),
  });

  return (
    <MainLayout>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <MainCard
            title={
              <div
                style={{
                  display: "flex",
                }}>
                <Link to="/user/blogs" style={{ textDecoration: "none" }}>
                  {" "}
                  {/* Add Link */}
                  <IconButton>
                    {" "}
                    {/* Add IconButton */}
                    <ArrowBackIosIcon /> {/* Add ArrowBackIosIcon */}
                  </IconButton>
                </Link>
              </div>
            }>
            <Formik
              enableReinitialize
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={async (
                values,
                { setErrors, setStatus, setSubmitting }
              ) => {
                try {
                  dispatch(
                    updateBlog({
                      id,
                      title: values.title,
                      content: values.content,
                    })
                  );
                  setStatus({ success: true });
                  setSubmitting(false);
                } catch (err) {
                  console.error(err);
                  setStatus({ success: false });
                  setErrors({ submit: err.message });
                  setSubmitting(false);
                }
              }}>
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values,
              }) => (
                <form noValidate onSubmit={handleSubmit}>
                  <Typography variant="h2" sx={{ textAlign: "center", mb: 3 }}>
                    Update Post
                  </Typography>

                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel htmlFor="outlined-adornment-title">
                      Title
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-title"
                      type="text"
                      value={values.title}
                      name="title"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Title"
                      inputProps={{}}
                    />
                  </FormControl>

                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel htmlFor="outlined-adornment-content">
                      Content
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-content"
                      type="text"
                      value={values.content}
                      name="content"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Content"
                      inputProps={{}}
                      multiline
                      rows={4}
                    />
                  </FormControl>

                  <Box sx={{ mt: 2 }}>
                    <AnimateButton>
                      <Button
                        disableElevation
                        disabled={isSubmitting}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        color="primary">
                        Update Post
                      </Button>
                    </AnimateButton>
                  </Box>
                </form>
              )}
            </Formik>
          </MainCard>
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export default UpdatePost;
