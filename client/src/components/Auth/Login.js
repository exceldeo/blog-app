import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home"; // Changed ArrowBackIcon to HomeIcon

// material-ui
import { Divider, Grid, Typography, Stack, Button } from "@mui/material"; // Added Button import

// project imports
import AuthWrapper from "./AuthWrapper";
import AuthCardWrapper from "./AuthCardWrapper";
import AuthLogin from "./auth-forms/AuthLogin";
// assets

// ================================|| AUTH3 - LOGIN ||================================ //

const Login = () => {
  return (
    <AuthWrapper>
      <Grid
        container
        direction="column"
        justifyContent="flex-end"
        sx={{ minHeight: "100vh" }}>
        <Grid item xs={12}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ minHeight: "calc(100vh - 68px)" }}>
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper>
                <Grid item xs={12}>
                  <Button component={Link} to="/" sx={{ mt: 2 }}>
                    <HomeIcon /> {/* Changed ArrowBackIcon to HomeIcon */}
                  </Button>
                </Grid>
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  justifyContent="center">
                  <Grid item xs={12}>
                    <Grid
                      container
                      direction="column"
                      alignItems="center"
                      justifyContent="center">
                      <Grid item>
                        <Stack
                          alignItems="center"
                          justifyContent="center"
                          spacing={1}>
                          <Typography
                            color="textPrimary"
                            gutterBottom
                            variant="h4">
                            Sign in
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <AuthLogin />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid
                      item
                      container
                      direction="column"
                      alignItems="center"
                      xs={12}>
                      <Typography
                        component={Link}
                        to="/register"
                        variant="subtitle1"
                        sx={{ textDecoration: "none" }}>
                        Don&apos;t have an account?
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default Login;
