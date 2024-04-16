import React, { useState } from "react";
import bgLogin from "../images/loginBackgr.png";
import Logo from "../images/MHDLogo.png";
import { Button, TextField, Alert } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";

export default function ResetPassword() {
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [submitPassword, setsubmitPassword] = useState();

  const [showAlert, setShowAlert] = useState(false);

  const handleConfirmClick = () => {
    if (!password || !confirmPassword) {
      toast.error("Please enter your new password!", {
        style: {
          border: "1px solid #F85F60",
          maxWidth: "900px",
          padding: "16px 24px",
          color: "red",
          fontWeight: "bolder",
        },
      });
    } else if (password === confirmPassword) {
      setsubmitPassword(password);
      toast.success("Reset successfully!", {
        style: {
          border: "1px solid #F85F60",
          maxWidth: "900px",
          padding: "16px 24px",
          color: "red",
          fontWeight: "bolder",
        },
      });
    } else {
      toast.error("The password does not match!", {
        style: {
          border: "1px solid #F85F60",
          maxWidth: "900px",
          padding: "16px 24px",
          color: "red",
          fontWeight: "bolder",
        },
      });
    }
    handleChangePassword();
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleChangePassword = async () => {
    if (password === confirmPassword) {
      const url = "http://127.0.0.1:5000/auth/change_password";
      try {
        const response = await fetch(url, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            new_password: submitPassword,
          }),
        });
        if (response.status === 200) {
          alert("Resend success, please check out your Email!");
        } else {
          alert("Fail to resend password");
        }
      } catch {
      } finally {
      }
    } else {
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
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
            loading="lazy"
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
        </div>
      </div>
    </>
  );
}
