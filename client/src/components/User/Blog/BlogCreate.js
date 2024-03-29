// CreatePost.js
import React from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../../../redux/actions/blogActions"; // Import the correct action
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

const CreatePost = () => {
  const dispatch = useDispatch();
  const initialValues = {
    title: "",
    content: "",
  };

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
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={async (
                values,
                { setErrors, setStatus, setSubmitting }
              ) => {
                try {
                  dispatch(createBlog(values)); // Dispatch the correct action
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
                    Create Post
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
                        Create Post
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

export default CreatePost;
