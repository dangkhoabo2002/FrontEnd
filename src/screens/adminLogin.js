import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import bgLogin from "../images/loginBackgr.png";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    manager_username: "",
    manager_password: "",
  });



  const handleChange = (prop) => (event) => {
    setData({ ...data, [prop]: event.target.value });
  };

  console.log("Logging in with:", data);
  const handleManagerLogin = async () => {
    const { manager_username, manager_password } = data;
  
// dont let usname pw null
    if (!manager_username || !manager_password) {
      alert("Please enter both username and password.");
      return;
    }
  
    const loginUrl = "http://127.0.0.1:5000/manager/login";
    
    try {
      const response = await fetch(loginUrl, {
        method: "POST",
        credentials: "include",
  
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true",
        },
        body: JSON.stringify({
          manager_username,
          manager_password,
        }),
      });
      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem("access_token", data.access_token);
        navigate("/admin");
      } else if (response.status === 401) {
        alert("Invalid Username & Password");
      } else {
        alert("Something wrong");
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
          <h1 style={{ fontSize: "32px", margin: "10px 0", color: "#3867A5" }}>
            Admin Sign in
          </h1>
        </div>
        <div>
          <TextField
            label="Username"
            fullWidth
            variant="outlined"
            margin="normal"
            value={data.manager_username}
            onChange={handleChange("manager_username")}
          />
          <TextField
            label="Password"
            fullWidth
            variant="outlined"
            type="password"
            margin="normal"
            value={data.manager_password}
            onChange={handleChange("manager_password")}
          />

          <Button
            onClick={handleManagerLogin}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: "20px", backgroundColor: "#3867A5" }}
          >
            Sign in
          </Button>
        </div>
      </div>
    </div>
  );
}
