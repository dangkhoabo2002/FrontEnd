import React, { useState } from "react";
import bgLogin from "../images/loginBackgr.png";
import Logo from "../images/MHDLogo.png";
import loginLeft from "../images/loginLeft.png";
import {
  Grid,
  Checkbox,
  Button,
  TextField,
  FormControlLabel,
  Box,
} from "@mui/material";
import "../css/login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (prop) => (event) => {
    setData({ ...data, [prop]: event.target.value });
  };

  const handleLogin = async () => {
    const loginUrl = "http://127.0.0.1:5000/auth/login";
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
          username: data.username,
          password: data.password,
        }),
      });
      if (response.status === 200) {
        console.log("Fail", response.status);
        const data = await response.json();
        localStorage.setItem("access_token", data.access_token);
        navigate(`/organizations`);
      } else if (response.status === 401) {
        alert("Invalid Username & Password");
      } else {
        alert("Unknown Error");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <div
        className="login-background"
        style={{ backgroundImage: `url(${bgLogin})` }}
      ></div>

      <div
        className="white-box"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "70%",
          height: "85%",
          backgroundColor: "white",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Link to={`/`}>
          <div
            className="Logo"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "12px ",
            }}
          >
            <img
              loading="lazy"
              src={Logo}
              alt="Logo"
              style={{ width: "96px", height: "96px" }}
            />
          </div>
        </Link>

        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12} md={6}>
            <img loading="lazy" src={loginLeft} alt="Login Left" />
          </Grid>

          <Grid item xs={12} md={6} className="pr-8">
            <div className="d-flex flex-row align-items-center justify-content-center">
              <p
                className="lead mb-0"
                style={{ fontWeight: "900  ", fontSize: "24px" }}
              >
                Sign in
              </p>
            </div>
            <div className="d-flex flex-row align-items-center justify-content-center">
              <p
                className="lead mb-0"
                style={{ fontSize: "16px", color: "#637381" }}
              >
                Enter your details below
              </p>
            </div>

            <div className="emailAddress">
              <p
                className="mt-3"
                style={{ fontSize: "16px", fontWeight: "600" }}
              >
                Root username
              </p>
              <p style={{ fontSize: "11px", fontWeight: "600" }}>
                Used for account recovery and some administrative functions
              </p>
              <div className="textField mt-3">
                <TextField
                  label="Username"
                  fullWidth
                  variant="outlined"
                  className="mb-4"
                  onChange={handleChange("username")}
                  value={data.username}
                />
              </div>
            </div>

            <div className="password">
              <p
                className="mt-3"
                style={{ fontSize: "16px", fontWeight: "600" }}
              >
                Password
              </p>
              <p style={{ fontSize: "11px", fontWeight: "600" }}>
                Your password just only you know
              </p>
              <div className="textField mt-3">
                <TextField
                  label="Password"
                  fullWidth
                  variant="outlined"
                  type="password"
                  className="mb-4"
                  onChange={handleChange("password")}
                  value={data.password}
                />
              </div>
            </div>

            <Box
              className="mt-3"
              sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}
            >
              <div>
                <FormControlLabel control={<Checkbox />} label="Remember me" />
              </div>

              <div
                className="mt-2 font-semibold"
                style={{ textAlign: "right" }}
              >
                <Link to={`/login/forgotPassword`}>
                  <p style={{ color: "#3867A5" }}>
                    <button>Forgot password?</button>
                  </p>
                </Link>
              </div>
            </Box>
            <div className="loginBtn text-center mt-3">
              <Button
                style={{
                  width: "100%",
                  height: "45px",
                  backgroundColor: "#3867A5",
                }}
                variant="contained"
                color="primary"
                className="mb-0"
                onClick={handleLogin}
              >
                Login
              </Button>
            </div>
            <div
              className="text-center pt-2 float-left"
              style={{ marginBottom: "50px" }}
            >
              <p className="small fw-bold mt-2 pt-1 flex ">
                Don't have an account?{" "}
                <Link to={"/signUp"}>
                  <p style={{ color: "#3867A5" }}>
                    <button>Get started</button>
                  </p>
                </Link>
              </p>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
