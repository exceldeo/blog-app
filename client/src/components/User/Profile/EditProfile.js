// EditProfile.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../../redux/actions/profileActions";
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
  Typography,
} from "@mui/material";
import AnimateButton from "../../../ui-component/extended/AnimateButton";

const EditProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);
  const initialValues = {
    username: user.username,
    email: user.email,
    fname: user.first_name,
    lname: user.last_name,
    photo: "",
  };

  return (
    <MainLayout>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <MainCard>
            <Formik
              initialValues={initialValues}
              onSubmit={async (
                values,
                { setErrors, setStatus, setSubmitting }
              ) => {
                try {
                  dispatch(updateProfile(values));
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
                handleSubmit, // Added handleSubmit here
                isSubmitting,
                touched,
                values,
              }) => (
                <form noValidate onSubmit={handleSubmit}>
                  <Typography variant="h2" sx={{ textAlign: "center", mb: 3 }}>
                    Edit Profile
                  </Typography>
                  <FormControl fullWidth disabled sx={{ mb: 2 }}>
                    <InputLabel htmlFor="outlined-adornment-username">
                      Username
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-username"
                      type="text"
                      value={values.username}
                      name="username"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Username"
                      inputProps={{}}
                      disabled
                    />
                  </FormControl>

                  <FormControl fullWidth disabled sx={{ mb: 2 }}>
                    <InputLabel htmlFor="outlined-adornment-email">
                      Email
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-email"
                      type="email"
                      value={values.email}
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Email"
                      inputProps={{}}
                      disabled
                    />
                  </FormControl>

                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel htmlFor="outlined-adornment-fname">
                      First Name
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-fname"
                      type="text"
                      value={values.fname}
                      name="fname"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="First Name"
                      inputProps={{}}
                    />
                  </FormControl>

                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel htmlFor="outlined-adornment-lname">
                      Last Name
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-lname"
                      type="text"
                      value={values.lname}
                      name="lname"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Last Name"
                      inputProps={{}}
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
                        Update Profile
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

export default EditProfile;
