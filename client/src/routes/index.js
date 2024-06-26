// routes/index.js
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import EditProfile from "../components/User/Profile/EditProfile";
import ViewProfile from "../components/User/Profile/ViewProfile";
import BlogList from "../components/Blog/BlogList";
import BlogPost from "../components/Blog/BlogPost";
import UserBlogList from "../components/User/Blog/BlogList";
import UserBlogPost from "../components/User/Blog/BlogPost";
import UserBlogCreate from "../components/User/Blog/BlogCreate";
import UserBlogEdit from "../components/User/Blog/BlogEdit";
import NotFound from "../components/404/404";
import ChangePassword from "../components/User/Profile/ChangePassword";
import { logout } from "../redux/actions/authActions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProfile } from "../redux/actions/profileActions";
import SearchPost from "../components/Blog/SearchPost";
import UsersTable from "../components/User";

function PrivateRoute({ children }) {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token && user) {
      dispatch(logout());
    }
  }, [token, dispatch, user]);

  useEffect(() => {
    if (!user && token) {
      dispatch(fetchProfile());
    }
  }, [user, dispatch, token, navigate]);

  return token ? children : <Navigate to="/login" />;
}

function PublicRoute({ children }) {
  const { token } = useSelector((state) => state.auth);

  return token ? <Navigate to="/user" /> : children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<BlogList />} />
      <Route path="/blog/:id" element={<BlogPost />} />
      <Route path="/search" element={<SearchPost />} />
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
              <UserBlogList />
            </PrivateRoute>
          }
        />
        <Route
          path="blog/:id"
          element={
            <PrivateRoute>
              <UserBlogPost />
            </PrivateRoute>
          }
        />
        <Route
          path="create-blog"
          element={
            <PrivateRoute>
              <UserBlogCreate />
            </PrivateRoute>
          }
        />
        <Route
          path="edit-blog/:id"
          element={
            <PrivateRoute>
              <UserBlogEdit />
            </PrivateRoute>
          }
        />
        <Route
          path="all-user"
          element={
            <PrivateRoute>
              <UsersTable />
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
          path="edit-profile"
          element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="change-password"
          element={
            <PrivateRoute>
              <ChangePassword />
            </PrivateRoute>
          }
        />
      </Route>
      <Route path="404" element={<NotFound />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
