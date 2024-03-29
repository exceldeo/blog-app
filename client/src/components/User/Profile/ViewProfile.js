import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Grid, Avatar, Button } from "@mui/material";
import { useEffect } from "react";
import {
  fetchProfile,
  changeProfilePicture,
} from "../../../redux/actions/profileActions";
import MainLayout from "../../Layout/MainLayout";
import MainCard from "../../../ui-component/cards/MainCard";

const ViewProfile = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);

  useEffect(() => {
    if (!profile) {
      dispatch(fetchProfile());
    }
  }, [dispatch, profile]);

  const [editProfilePicture, setEditProfilePicture] = React.useState(true);

  return (
    <MainLayout>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <MainCard>
            <Grid container spacing={2} alignItems="center">
              <Grid alignItems={"center"} justifyContent={"center"}>
                <Grid
                  item
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  {profile && profile?.profile_picture ? (
                    <Avatar
                      sx={{ width: 96, height: 96 }}
                      src={profile?.profile_picture}
                    />
                  ) : (
                    <Avatar sx={{ width: 96, height: 96 }}>
                      {profile.usename && profile.username[0]}
                    </Avatar>
                  )}
                </Grid>
                <div
                  style={{
                    marginTop: "10px",
                  }}>
                  {editProfilePicture ? (
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setEditProfilePicture(!editProfilePicture);
                      }}>
                      Edit Picture
                    </Button>
                  ) : (
                    <>
                      <input
                        type="file"
                        id="fileInput"
                        accept="image/*"
                        style={{ display: "none" }} // Hide the default file input
                        onChange={(e) => {
                          const formData = new FormData();
                          formData.append("profile_picture", e.target.files[0]);
                          dispatch(changeProfilePicture(formData)).then(() => {
                            dispatch(fetchProfile());
                          });
                          setEditProfilePicture(!editProfilePicture);
                        }}
                      />
                      <label htmlFor="fileInput">
                        <Button variant="contained" component="span">
                          Upload
                        </Button>
                      </label>
                      <Button
                        sx={{ marginLeft: "10px" }}
                        variant="outlined"
                        onClick={() => {
                          setEditProfilePicture(!editProfilePicture);
                        }}>
                        Cancel
                      </Button>
                    </>
                  )}
                </div>
              </Grid>
              <Grid item xs>
                <Typography variant="h2">
                  Username: {profile.username}
                </Typography>
                <Typography variant="h2">Email: {profile.email}</Typography>
                <Typography variant="h2">
                  First Name: {profile.first_name}
                </Typography>
                <Typography variant="h2">
                  Last Name: {profile.last_name}
                </Typography>
                <Typography variant="h2">
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
