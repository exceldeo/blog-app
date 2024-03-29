import React from "react";
import PropTypes from "prop-types";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileSection from "./ProfileSection";

const Header = ({ handleLeftDrawerToggle }) => {
  const { token } = useSelector((state) => state.auth);

  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            Blog
          </Link>
        </Typography>

        {token ? (
          <>
            <ProfileSection />
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  handleLeftDrawerToggle: PropTypes.func,
};

export default Header;
