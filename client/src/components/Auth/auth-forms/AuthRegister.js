import { useState } from "react";

// material-ui
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";

// third party
import * as Yup from "yup";
import { Formik } from "formik";

import AnimateButton from "../../../ui-component/extended/AnimateButton";
// assets
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useDispatch } from "react-redux";
import { register } from "../../../redux/actions/authActions";
import { useNavigate } from "react-router-dom";

const FormRegister = ({ ...others }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const dispatch = useDispatch();

  return (
    <>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          fname: "", // Fixed input field for first name
          lname: "", // Fixed input field for last name
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().max(255).required("username is required"),
          email: Yup.string()
            .email("Invalid email")
            .required("Email is required"),
          password: Yup.string().max(255).required("Password is required"),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Confirm Password is required"),
          fname: Yup.string().max(255).required("First Name is required"), // Added validation for first name
          lname: Yup.string().max(255).required("Last Name is required"), // Added validation for last name
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            dispatch(register(values));
            setStatus({ success: true });
            setSubmitting(false);
            navigate("/login");
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
          <form noValidate onSubmit={handleSubmit} {...others}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  margin="normal"
                  name="fname"
                  type="text"
                  value={values.fname} // Updated value for first name
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {touched.fname && errors.fname && (
                  <FormHelperText error>{errors.fname}</FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  margin="normal"
                  name="lname"
                  type="text"
                  value={values.lname} // Updated value for last name
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {touched.lname && errors.lname && (
                  <FormHelperText error>{errors.lname}</FormHelperText>
                )}
              </Grid>
            </Grid>
            <FormControl
              style={{ marginTop: "16px" }}
              fullWidth
              error={Boolean(touched.username && errors.username)}>
              <InputLabel htmlFor="outlined-adornment-username-register">
                Username
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-username-register"
                type="text"
                value={values.username}
                name="username"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
              {touched.username && errors.username && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text--register">
                  {errors.username}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl
              style={{ marginTop: "16px" }}
              fullWidth
              error={Boolean(touched.email && errors.email)}>
              <InputLabel htmlFor="outlined-adornment-email-register">
                Email
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-register"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-email-register">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              style={{ marginTop: "16px" }}
              error={Boolean(touched.password && errors.password)}>
              <InputLabel htmlFor="outlined-adornment-password-register">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-register"
                type={showPassword ? "text" : "password"}
                value={values.password}
                name="password"
                label="Password"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                }}
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
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-password-register">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl
              style={{ marginTop: "16px" }}
              fullWidth
              error={Boolean(
                touched.confirmPassword && errors.confirmPassword
              )}>
              <InputLabel htmlFor="outlined-adornment-confirmPassword-register">
                Confirm Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-confirmPassword-register"
                type="password"
                value={values.confirmPassword}
                name="confirmPassword"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-confirmPassword-register">
                  {errors.confirmPassword}
                </FormHelperText>
              )}
            </FormControl>

            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

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
                  Sign up
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default FormRegister;
