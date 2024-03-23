import React from "react";
import bgLogin from "../images/loginBackgr.png";
import Logo from "../images/MHDLogo.png";
import {
  Checkbox,
  Button,
  TextField,
  FormControlLabel,
  Box,
} from "@mui/material";

import { Link } from "react-router-dom";

export default function SignUp() {
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
        <div className="px-60 py-2">
          <div
            className="Logo pb-2"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={Logo}
              alt="Logo"
              style={{ width: "96px", height: "96px" }}
            />
          </div>
          <div className="d-flex flex-row align-items-center justify-content-center">
            <p
              className="lead mb-0"
              style={{ fontWeight: "900  ", fontSize: "24px" }}
            >
              Get started absolutely free.
            </p>
          </div>

          <div className="textField mt-3">
            <TextField
              label="Full Name"
              fullWidth
              variant="outlined"
              className="mb-4"
            />
          </div>

          <div className="textField mt-3">
            <TextField
              label="Email Address"
              fullWidth
              variant="outlined"
              className="mb-4"
            />
          </div>

          <div className="textField mt-3">
            <TextField
              label="Password"
              fullWidth
              type="password"
              variant="outlined"
              className="mb-4"
            />
          </div>

          <div className="textField mt-3">
            <TextField
              label="Confirm Password"
              fullWidth
              type="password"
              variant="outlined"
              className="mb-4"
            />
          </div>

          <Box className="mt-3 d-flex">
            <div>
              <FormControlLabel
                control={<Checkbox />}
                label={
                  <>
                    By signing up, I agree to Manimal{" "}
                    <Link style={{ color: "#5F94D9" }}>Terms of Service</Link>{" "}
                    and{" "}
                    <Link style={{ color: "#5F94D9" }}>Privacy Policy.</Link>
                  </>
                }
              />
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
            >
              Sign Up
            </Button>
          </div>

          <div className="text-center text-md-start pt-2 float-left">
            <div className="small fw-bold mt-2 pt-1 mb-2 flex">
              <div className="mr-1">Already have an account?</div>
              <Link to={"/login"} style={{ color: "#3867A5" }}>
                <b>Login</b>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
