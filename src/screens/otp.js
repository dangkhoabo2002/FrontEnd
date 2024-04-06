import React, { useState } from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import { Box, Button, FormHelperText } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import Logo from "../images/MHDLogo.png";
import bgLogin from "../images/loginBackgr.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

export default function OTP() {
  const navigate = useNavigate();
  const [alert, setAlert] = useState(false);

  const [otp, setOtp] = React.useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const [data, setData] = useState({
    otp: otp,
    email: "",
  });

  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  // const handleChange = (prop) => (event) => {
  //   setData({ ...data, [prop]: event.target.value });
  // };

  const { control, handleSubmit } = useForm({
    defaultValues: {
      OTP: "",
    },
  });

  const onSubmit = (data) => {
    setShowSuccessAlert(true);
    setTimeout(() => {
      setShowSuccessAlert(false);
    }, 3000);
    // Additional action, like sending the data to the server
    // alert(JSON.stringify(data));
  };

  // Handle OTP API

  const handleOTP = async () => {
    const otpUrl = "http://127.0.0.1:5000/auth/verify_otp";
    try {
      const response = await fetch(otpUrl, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          otp: otp,
          email: data.email,
        }),
      });
      if (response.status === 200) {
        navigate("/resetPassword");
      } else {
        alert("Fail to verify");
        alert(otp);
      }
    } catch {
    } finally {
    }
  };

  const handleResendOtp = async () => {
    const otpUrl = "http://127.0.0.1:5000/auth/resend_otp";
    try {
      const response = await fetch(otpUrl, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          email: data.email,
        }),
      });
      if (response.status === 200) {
        alert("Resend success, please check out your Email!");
      } else {
        alert("Fail to resend password");
        setAlert(true);
      }
    } catch {
      setAlert(true);
    } finally {
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
        </Link>
        <div className="px-60 py-20">
          <div className="d-flex flex-row">
            <p
              className="lead mb-0"
              style={{ fontWeight: "900  ", fontSize: "24px" }}
            >
              Email confirmation
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <p className="mt-3" style={{ fontSize: "16px", fontWeight: "600" }}>
              Enter code
            </p>
            <MuiOtpInput length={6} value={otp} onChange={handleChange} />
            <Box>
              <div className="flex flex-row justify-between">
                <div className="">
                  <Button
                    type="cancel"
                    variant="contained"
                    sx={{ mt: 2, mr: 2 }}
                    style={{
                      backgroundColor: "#F85F60",
                      width: "200px",
                      height: "40px",
                    }}
                    onClick={handleResendOtp}
                  >
                    Resend
                  </Button>
                </div>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 2 }}
                  style={{
                    backgroundColor: "#3867A5",
                    width: "200px",
                    height: "40px",
                  }}
                  onClick={handleOTP}
                >
                  Submit
                </Button>
              </div>
            </Box>
            <Box
              className="mt-3 font-semibold pb-12"
              style={{ color: "#3867A5" }}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Link to={"/login"}>Cancel</Link>
              <Link to={"/login/forgotPassword"}>Change email</Link>
            </Box>
          </form>
          {alert && (
            <>
              <Alert severity="error">This is an error Alert.</Alert>
            </>
          )}
        </div>
      </div>
    </>
  );
}
