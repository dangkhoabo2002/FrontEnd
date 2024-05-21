import React, { useState } from "react";
import bgLogin from "../images/loginBackgr.png";
import Logo from "../images/MHDLogo.png";
import { Button, TextField, Alert } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const emailReset = localStorage.getItem("email");
  const [error, setError] = useState({
    password: null,
  });

  const handleConfirmClick = () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/;
    let newErrors = { password: null };

    if (!password) {
      toast.error("Please enter your new password!", {
        style: {
          border: "1px solid #FF5733",
          maxWidth: "900px",
          padding: "16px 24px",
          color: "red",
          fontWeight: "bolder",
        },
      });
    } else if (!confirmPassword) {
      toast.error("Confirm password can not be empty", {
        style: {
          border: "1px solid #FF5733",
          maxWidth: "900px",
          padding: "16px 24px",
          color: "red",
          fontWeight: "bolder",
        },
      });
    } else if (!passwordRegex.test(password)) {
      newErrors.password =
        "Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be 8-30 characters long.";

      if (newErrors.password) {
        setError(newErrors);
        return;
      }
    } else if (password === confirmPassword) {
      handleChangePassword();
    } else {
      toast.error("The password does not match!", {
        style: {
          border: "1px solid #FF5733",
          maxWidth: "900px",
          padding: "16px 24px",
          color: "red",
          fontWeight: "bolder",
        },
      });
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleChangePassword = async () => {
    toast.loading("In processing..");
    const url = "http://127.0.0.1:5000/auth/reset_password";
    const otpToken = localStorage.getItem("otp_verified");

    try {
      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${otpToken}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          email: emailReset,
          new_password: password,
        }),
      });
      if (response.status === 200) {
        toast.dismiss();
        toast.success("Your password is updated successfully.", {
          style: {
            border: "1px solid #37E030",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "green",
            fontWeight: "bolder",
          },
        });
        localStorage.removeItem("otp_verified");
        setTimeout(() => {
          navigate(`/login`);
        }, 2000);
      } else if (response.status === 403) {
        toast.dismiss();
        toast.error("Verify OTP first!", {
          style: {
            border: "1px solid #F85F60",
            maxWidth: "900px",
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
            maxWidth: "900px",
            padding: "16px 24px",
            color: "red",
            fontWeight: "bolder",
          },
        });
      }
    } catch {
    } finally {
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
                error={!!error.password}
                helperText={error.password}
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
