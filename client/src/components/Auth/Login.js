// Login.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { TextField, Button } from "@mui/material";
import { login } from "../../redux/actions/authActions";

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState(""); // Changed 'email' to 'username'
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(username, password)); // Changed 'email' to 'username'
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Username" // Changed 'Email' to 'Username'
        value={username} // Changed 'email' to 'username'
        onChange={(e) => setUsername(e.target.value)} // Changed 'email' to 'username'
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit">Login</Button>
    </form>
  );
};

export default Login;
