import React, { useState } from "react";
import {
  TextField,
  Checkbox,
  Button,
  FormControlLabel,
  Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import bgLogin from "../images/loginBackgr.png";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (prop) => (event) => {
    setData({ ...data, [prop]: event.target.value });
  };

  const handleCheckboxChange = (event) => {
    setData({ ...data, rememberMe: event.target.checked });
  };

  const handleLogin = async () => {
    // Implement your login logic here
    console.log("Logging in with:", data);
    navigate("/admin"); // Example redirection
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bgLogin})`,
        backgroundSize: "cover",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "70%",
          maxWidth: "400px",
          backgroundColor: "white",
          borderRadius: "20px",
          padding: "40px",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <LockOutlinedIcon style={{ fontSize: "48px", color: "#3867A5" }} />
          <h1 style={{ fontSize: "32px",margin: "10px 0", color: "#3867A5" }}>Admin Sign in</h1>
        </div>
        <form onSubmit={handleLogin}>
          <TextField
            label="Username"
            fullWidth
            variant="outlined"
            margin="normal"
            value={data.username}
            onChange={handleChange("username")}
          />
          <TextField
            label="Password"
            fullWidth
            variant="outlined"
            type="password"
            margin="normal"
            value={data.password}
            onChange={handleChange("password")}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={data.rememberMe}
                onChange={handleCheckboxChange}
              />
            }
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: "20px", backgroundColor: "#3867A5" }}
          >
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}
