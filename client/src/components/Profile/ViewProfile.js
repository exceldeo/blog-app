// ViewProfile.js
import React from "react";
import { useSelector } from "react-redux";
import { Typography, Grid, Avatar } from "@mui/material"; // Added Avatar component for user icon
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProfile } from "../../redux/actions/profileActions";
import MainLayout from "../Layout/MainLayout";
import MainCard from "../../ui-component/cards/MainCard";

const ViewProfile = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);

  useEffect(() => {
    if (!profile.user) {
      dispatch(fetchProfile());
    }
  }, [dispatch, profile.user]);

  return (
    <MainLayout>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <MainCard>
            <Grid container spacing={2} alignItems="center">
              {" "}
              {/* Centering the items vertically */}
              <Grid item>
                <Avatar sx={{ width: 56, height: 56 }}>ED</Avatar>{" "}
                {/* User icon */}
              </Grid>
              <Grid item xs>
                <Typography variant="body1">
                  Username: {profile.username}
                </Typography>
                <Typography variant="body1">Email: {profile.email}</Typography>
                <Typography variant="body1">
                  First Name: {profile.first_name}
                </Typography>
                <Typography variant="body1">
                  Last Name: {profile.last_name}
                </Typography>
                <Typography variant="body1">
                  Role: {profile.is_user_admin ? "Admin" : "User"}
                </Typography>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export default ViewProfile;
