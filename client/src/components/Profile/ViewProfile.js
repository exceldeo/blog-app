// ViewProfile.js
import React from "react";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProfile } from "../../redux/actions/profileActions";
import MainLayout from "../Layout/MainLayout";

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
      <div>
        <Typography variant="h2">{profile.name}</Typography>
        <Typography variant="body1">{profile.email}</Typography>
      </div>
    </MainLayout>
  );
};

export default ViewProfile;
