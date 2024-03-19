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
  Item,
  Alert,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import Footer from "../components/loginFooter";
import { Link } from "react-router-dom";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleConfirmClick = () => {
    if (!password || !confirmPassword) {
      setAlertMessage("Please enter both passwords.");
      setShowAlert(true);
    } else if (password === confirmPassword) {
      setAlertMessage("Reset password successfully");
      setShowAlert(true);
    } else {
      setAlertMessage("The password doesn't match");
      setShowAlert(true);
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setErrorMessage("");
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setErrorMessage("");
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
        <div
          className="Logo"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px 400px",
          }}
        >
          <img
            src={Logo}
            alt="Logo"
            style={{ width: "96px", height: "96px" }}
          />
        </div>
        <div className="px-60">
          <div className="d-flex flex-col ">
            <p
              className="lead mb-0"
              style={{ fontWeight: "900  ", fontSize: "24px" }}
            >
              Reset Your Password
            </p>
          </div>

          <div className="password">
            <p className="mt-3" style={{ fontSize: "16px", fontWeight: "600" }}>
              Enter new password
            </p>
            <div className="textField mt-3">
              <TextField
                label="Password"
                fullWidth
                variant="outlined"
                type="password"
                className="mb-4"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
          </div>

          <div className="password">
            <p className="mt-3" style={{ fontSize: "16px", fontWeight: "600" }}>
              Confirm new password
            </p>
            <div className="textField mt-3">
              <TextField
                label="Confirm Password"
                fullWidth
                variant="outlined"
                type="password"
                className="mb-4"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
            </div>
          </div>

          <div className="loginBtn text-center mt-5">
            <Button
              onClick={handleConfirmClick}
              style={{
                width: "100%",
                height: "45px",
                backgroundColor: "#3867A5",
              }}
              variant="contained"
              color="primary"
              className="mb-0"
            >
              Confirm
            </Button>
          </div>

          {showAlert && (
            <Alert
              severity={
                alertMessage === "Reset password successfully"
                  ? "success"
                  : "error"
              }
              onClose={() => setShowAlert(false)}
              style={{
                position: "fixed",
                bottom: "20px",
                right: "20px",
                backgroundColor:
                  alertMessage === "Reset password successfully"
                    ? "#dff0d8"
                    : "#f2dede",
                border:
                  alertMessage === "Reset password successfully"
                    ? "1px solid #c3e6cb"
                    : "1px solid #ebccd1",
                color:
                  alertMessage === "Reset password successfully"
                    ? "#3c763d"
                    : "#a94442",
                borderRadius: "4px",
                padding: "15px",
              }}
            >
              {alertMessage}
            </Alert>
          )}
        </div>
      </div>
    </>
  );
}
