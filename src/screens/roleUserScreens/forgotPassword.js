import React from "react";
import bgLogin from "../../images/loginBackgr.png";
import Logo from "../../images/MHDLogo.png";
import loginLeft from "../../images/loginLeft.png";
import {
  Grid,
  Checkbox,
  Button,
  TextField,
  FormControlLabel,
  Box,
  Item,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import Footer from "../../components/loginFooter";
import "./login.css";
import { Link } from "react-router-dom";

export default function forgotPassword() {
  return (
    <>
      <div
        className="Logo"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={Logo} alt="Logo" style={{ width: "96px", height: "96px" }} />
      </div>
      <div className="d-flex flex-row align-items-center justify-content-center">
        <p
          className="lead mb-0"
          style={{ fontWeight: "900  ", fontSize: "24px" }}
        >
          Reset Your Password
        </p>
      </div>
      <div className="emailAddress">
        <p className="mt-3" style={{ fontSize: "16px", fontWeight: "600" }}>
          Enter your email address
        </p>
        <p style={{ fontSize: "11px", fontWeight: "600" }}>
          Lost your password? Please enter your username or email address. You
          will receive a link to create a new password via email.
        </p>

        <div className="textField mt-3">
          <TextField
            label="Email address"
            fullWidth
            variant="outlined"
            className="mb-4"
          />
        </div>
      </div>

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
          Send code
        </Button>
      </div>

      <div>
        <Link to={"/login"}>
          <p>
            <buton>Return to login</buton>
          </p>
        </Link>
      </div>
    </>
  );
}
