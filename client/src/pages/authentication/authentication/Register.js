import { Link } from "react-router-dom";

// material-ui
import { Divider, Grid, Stack, Typography } from "@mui/material";

// project imports
import AuthWrapper1 from "../AuthWrapper1";
import AuthCardWrapper from "../AuthCardWrapper";
import AuthRegister from "../auth-forms/AuthRegister";

// assets

// ===============================|| AUTH3 - REGISTER ||=============================== //

const Register = () => {
  return (
    <AuthWrapper1>
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
                            Sign up
                          </Typography>
                          <Typography
                            variant="caption"
                            fontSize="16px"
                            color="textSecondary">
                            Enter your credentials to continue
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <AuthRegister />
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
                        to="/login"
                        variant="subtitle1"
                        sx={{ textDecoration: "none" }}>
                        Already have an account?
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </AuthWrapper1>
  );
};

export default Register;