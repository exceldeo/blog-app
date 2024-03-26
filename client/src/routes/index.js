// routes/index.js
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import EditProfile from "../components/Profile/EditProfile";
import ViewProfile from "../components/Profile/ViewProfile";
import BlogList from "../components/Blog/BlogList";
import NotFound from "../components/404/404";
import { logout } from "../redux/actions/authActions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getProfile } from "../api/profile";
import { updateProfile } from "../redux/actions/profileActions";

function PrivateRoute({ children }) {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      dispatch(logout());
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (!user && token) {
      getProfile().then((data) => {
        dispatch(updateProfile(data));
      });
    }
  }, [user, dispatch, token]);

  return token ? children : <Navigate to="/login" />;
}

function PublicRoute({ children }) {
  const { token } = useSelector((state) => state.auth);
  return !token ? children : <Navigate to="/user/" />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <BlogList />
          </PublicRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      <Route path="/user">
        <Route
          path="blogs"
          element={
            <PrivateRoute>
              <BlogList />
            </PrivateRoute>
          }
        />
        <Route
          path=""
          element={
            <PrivateRoute>
              <ViewProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="edit"
          element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          }
        />
      </Route>
      {/* <Route
        path="/user"
        element={
          <PrivateRoute>
            <Routes>
            </Routes>
          </PrivateRoute>
        }
      /> */}
      <Route
        path="/blog/:id"
        element={
          <PrivateRoute>
            <BlogList />
          </PrivateRoute>
        }
      />
      <Route
        path="*"
        element={
          <PublicRoute>
            <NotFound />
          </PublicRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
