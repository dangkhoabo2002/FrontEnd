import React, { useEffect, useState } from "react";
import bgLogin from "../images/loginBackgr.png";
import Logo from "../images/MHDLogo.png";
import loginLeft from "../images/loginLeft.png";
import nonIcon from "../assets/non-icon.png";

import {
  Grid,
  Button,
  TextField,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import "../css/login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [loginType, setLoginType] = useState("");
  const loginUser = localStorage.getItem("checkUser");

  useEffect(() => {
    if (loginUser) {
      setLoginType("user");
      navigate(`/organizations`);
    }
  }, [loginUser, navigate]);

  const handleChange = (prop) => (event) => {
    setData({ ...data, [prop]: event.target.value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    if (data.username === "" || data.password === "") {
      toast.error("Please input your Username & Password!", {
        style: {
          border: "1px solid #FF5733",
          maxWidth: "900px",
          padding: "16px 24px",
          color: "red",
          fontWeight: "bolder",
        },
      });
    } else {
      toast.loading("In processing...");
      const loginUrl =
        "https://master-help-desk-back-end.vercel.app/auth/login";
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
          toast.dismiss();
          const responseData = await response.json();
          localStorage.setItem("access_token", responseData.access_token);
          localStorage.setItem("checkUser", "user");
          navigate(`/organizations`);
        } else if (response.status === 401) {
          toast.dismiss();
          toast.error("Invalid Username or Password!", {
            style: {
              border: "1px solid #F85F60",
              padding: "16px 24px",
              color: "red",
              fontWeight: "bolder",
            },
          });
        } else {
          toast.dismiss();
          toast.error("Something wrong, please try again later!", {
            style: {
              border: "1px solid #F85F60",
              padding: "16px 24px",
              color: "red",
              fontWeight: "bolder",
            },
          });
        }
      } catch (error) {
        console.error("Error:", error);
        toast.dismiss();
        toast.error("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
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
            <form onSubmit={handleLogin}>
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
                  Username
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
                  Your password must be kept secure.{" "}
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

              <div className="mt-2 font-semibold" style={{ color: "#3867A5" }}>
                <Link to={`/login/forgotPassword`}>Forgot password?</Link>
              </div>
              <div className="loginBtn text-center mt-3">
                <Button
                  type="submit"
                  style={{
                    width: "100%",
                    height: "45px",
                    backgroundColor: "#3867A5",
                  }}
                  variant="contained"
                  color="primary"
                  className="mb-0"
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
                  <Link
                    to={"/signUp"}
                    style={{ color: "#3867A5", marginLeft: "5px" }}
                  >
                    Get started
                  </Link>
                </p>
              </div>
            </form>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
