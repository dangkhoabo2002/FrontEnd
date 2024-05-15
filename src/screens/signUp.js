import React, { useEffect, useState } from "react";
import bgLogin from "../images/loginBackgr.png";
import Logo from "../images/MHDLogo.png";
import {
  Checkbox,
  Button,
  TextField,
  FormControlLabel,
  Box,
} from "@mui/material";
import "../css/signUp.css";
import toast, { Toaster } from "react-hot-toast";

import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  useEffect(() => {
    const loginToken = localStorage.getItem("access_token");
    if (loginToken) {
      navigate("/organizations");
    }
  });

  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
    full_name: "",
    email: "",
  });
  const [isChecked, setIsChecked] = useState(false);
  const [showTickMessage, setShowTickMessage] = useState(false);
  const [error, setError] = useState({
    full_name: null,
    username: null,
    password: null,
    email: null,
    confirm_password: null,
  });

  const handleChange = (prop) => (event) => {
    setData({ ...data, [prop]: event.target.value });
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    setShowTickMessage(false);
  };

  const handleSignup = async () => {
    if (!isChecked) {
      setShowTickMessage(true);
      return;
    }

    const usernameRegex = /^[a-zA-Z0-9_]{1,12}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let newErrors = {
      full_name: null,
      username: null,
      password: null,
      email: null,
    };
    if (
      !data.full_name ||
      !data.username ||
      !data.password ||
      !data.email ||
      !data.confirm_password
    ) {
      toast.error("Please fill in all the fields.", {
        style: {
          border: "1px solid #F85F60",
          maxWidth: "900px",
          padding: "16px 24px",
          color: "red",
          fontWeight: "bolder",
        },
      });
      return;
    }
    if (!data.full_name) {
      newErrors.full_name = "Full Name is required.";
    }
    if (!usernameRegex.test(data.username)) {
      newErrors.username =
        "Username must be 1-12 characters long and contain only letters, numbers, or underscores.";
    }

    if (!passwordRegex.test(data.password)) {
      newErrors.password =
        "Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be 8-30 characters long.";
    }

    if (!emailRegex.test(data.email)) {
      newErrors.email = "Invalid email address.";
    }

    // Kiểm tra xác nhận mật khẩu
    if (data.password !== data.confirm_password) {
      newErrors.confirm_password = "Passwords do not match";
    }

    if (
      newErrors.username ||
      newErrors.password ||
      newErrors.email ||
      newErrors.confirm_password
    ) {
      setError(newErrors);
      return;
    }
    const signupUrl = "http://127.0.0.1:5000/auth/signup";
    try {
      const response = await fetch(signupUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
          full_name: data.full_name,
          email: data.email,
        }),
      });
      if (response.status === 201) {
        toast.success("Successfully, welcome to MHD system.", {
          style: {
            border: "1px solid #37E030",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "green",
            fontWeight: "bolder",
          },
        });
        setTimeout(() => {
          navigate("/login");
        }, 1400);
      } else if (response.status === 400) {
        toast.dismiss();
        toast.error("Email already in used, please choose another email!", {
          style: {
            border: "1px solid #F85F60",
            padding: "16px 24px",
            color: "red",
            fontWeight: "bolder",
            maxWidth: "2000px",
          },
        });
      } else {
        toast.error("Something wrong, please try again later!", {
          style: {
            border: "1px solid #F85F60",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "red",
            fontWeight: "bolder",
          },
        });
      }
    } catch (error) {
      console.error("Error:", error);
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
          height: "92%",
          backgroundColor: "white",
          borderRadius: "20px",
        }}
      >
        <div className="px-40 py-10">
          <Link to={`/`}>
            <div
              className="Logo pb-0"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
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
          <div className="">
            <p
              className="lead mb-0 pb-2"
              style={{ fontWeight: "900  ", fontSize: "24px" }}
            >
              Get started absolutely free.
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <div className="gridCust">
              <div className="flex flex-col">
                <div className="textField mt-3">
                  <TextField
                    onChange={handleChange("full_name")}
                    label="Full Name"
                    fullWidth
                    variant="outlined"
                    className="mb-4"
                    required
                    error={!!error.full_name}
                    helperText={error.full_name}
                  />
                </div>
                <div className="textField mt-3">
                  <TextField
                    onChange={handleChange("username")}
                    label="Username"
                    fullWidth
                    variant="outlined"
                    className="mb-4"
                    required
                    error={!!error.username}
                    helperText={error.username}
                  />
                </div>
                <div className="textField mt-3">
                  <TextField
                    onChange={handleChange("email")}
                    label="Email Address"
                    fullWidth
                    variant="outlined"
                    className=""
                    required
                    error={!!error.email}
                    helperText={error.email}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="textField mt-3">
                  <TextField
                    onChange={handleChange("password")}
                    label="Password"
                    fullWidth
                    type="password"
                    variant="outlined"
                    className="mb-4"
                    required
                    error={!!error.password}
                    helperText={error.password}
                  />
                </div>
                <div className="textField mt-3">
                  <TextField
                    onChange={handleChange("confirm_password")}
                    label="Confirm Password"
                    fullWidth
                    type="password"
                    variant="outlined"
                    className="mb-2"
                    required
                    error={!!error.confirm_password}
                    helperText={error.confirm_password}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <Box className=" d-flex">
                <div>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                      />
                    }
                    label={
                      <>
                        By signing up, I agree to
                        <Link
                          to={`/term`}
                          style={{
                            color: "#5F94D9",
                            paddingLeft: "4px",
                            paddingRight: "4px",
                          }}
                        >
                          Terms of Service
                        </Link>
                      </>
                    }
                  />
                </div>
              </Box>

              {showTickMessage && (
                <div className={`error-popup ${showTickMessage ? "show" : ""}`}>
                  <p className="text-red">
                    Please tick the agreement checkbox.
                  </p>
                </div>
              )}

              <div className="loginBtn text-center mt-3">
                <Button
                  type="button"
                  id="signup-button"
                  onClick={handleSignup}
                  style={{
                    width: "100%",
                    height: "45px",
                    backgroundColor: "#3867A5",
                  }}
                  variant="contained"
                  color="primary"
                  className="mb-0"
                >
                  Sign Up
                </Button>
              </div>

              <div className="text-center text-md-start pt-2 float-left">
                <div className="small fw-bold pt-1 mb-2 flex">
                  <div className="mr-1">Already have an account?</div>
                  <Link to={"/login"} style={{ color: "#3867A5" }}>
                    <b>Login</b>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
