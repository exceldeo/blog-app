import React from "react";
import {
  Button,
  Grid,
  FormControl,
  InputLabel,
  FormHelperText,
  InputAdornment,
  IconButton,
  OutlinedInput,
} from "@mui/material";
import { changePassword } from "../../api/profile";
import { Formik } from "formik";
import * as Yup from "yup";
import MainLayout from "../Layout/MainLayout";
import MainCard from "../../ui-component/cards/MainCard";
import { Box } from "@mui/system";
import AnimateButton from "../../ui-component/extended/AnimateButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const ChangePassword = () => {
  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Old password is required"),
    newPassword: Yup.string().required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <MainLayout>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <MainCard>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={async (
                values,
                { setErrors, setStatus, setSubmitting }
              ) => {
                try {
                  changePassword(values);
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
                  <FormControl
                    fullWidth
                    error={Boolean(touched.oldPassword && errors.oldPassword)}
                    sx={{ mb: 2 }}>
                    <InputLabel htmlFor="outlined-adornment-oldPassword">
                      Old Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-oldPassword"
                      type="password"
                      value={values.oldPassword}
                      name="oldPassword"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Old Password"
                      inputProps={{}}
                    />
                    {touched.oldPassword && errors.oldPassword && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-oldPassword">
                        {errors.oldPassword}
                      </FormHelperText>
                    )}
                  </FormControl>

                  <FormControl
                    fullWidth
                    error={Boolean(touched.newPassword && errors.newPassword)}
                    sx={{ mb: 2 }}>
                    <InputLabel htmlFor="outlined-adornment-newPassword">
                      New Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-newPassword"
                      type={showPassword ? "text" : "password"}
                      value={values.newPassword}
                      name="newPassword"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            size="large">
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="New Password"
                      inputProps={{}}
                    />
                    {touched.newPassword && errors.newPassword && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-newPassword">
                        {errors.newPassword}
                      </FormHelperText>
                    )}
                  </FormControl>

                  <FormControl
                    fullWidth
                    error={Boolean(
                      touched.confirmPassword && errors.confirmPassword
                    )}
                    sx={{ mb: 2 }}>
                    <InputLabel htmlFor="outlined-adornment-confirmPassword">
                      Confirm Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-confirmPassword"
                      type="password"
                      value={values.confirmPassword}
                      name="confirmPassword"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Confirm Password"
                      inputProps={{}}
                    />
                    {touched.confirmPassword && errors.confirmPassword && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-confirmPassword">
                        {errors.confirmPassword}
                      </FormHelperText>
                    )}
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
                        Change Password
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

export default ChangePassword;
