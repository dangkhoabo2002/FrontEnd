import React, { useState } from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import { Box, Button, FormHelperText } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import Logo from "../images/MHDLogo.png";
import bgLogin from "../images/loginBackgr.png";
import { Link } from "react-router-dom";

export default function OTP() {
  const [otp, setOtp] = React.useState("");
  const [data, setData] = useState({
    otp: "",
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

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const onSubmit = (data) => {
    setShowSuccessAlert(true);
    setTimeout(() => {
      setShowSuccessAlert(false);
    }, 3000);
    // Additional action, like sending the data to the server
    // alert(JSON.stringify(data));
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
                  >
                    Resend
                  </Button>
                </div>
                <Link to={"/resetPassword"}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 2 }}
                    style={{
                      backgroundColor: "#3867A5",
                      width: "200px",
                      height: "40px",
                    }}
                  >
                    Submit
                  </Button>
                </Link>
              </div>
            </Box>
            <Box
              className="mt-3 font-semibold"
              style={{ color: "#3867A5" }}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Link to={"/login"}>Cancel</Link>
              <Link to={"/login/forgotPassword"}>Change email</Link>
            </Box>
          </form>
          {/* {showSuccessAlert && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            backgroundColor: "#dff0d8",
            border: "1px solid #c3e6cb",
            color: "#3c763d",
            borderRadius: "4px",
            padding: "15px",
          }}
        >
          <CheckIcon fontSize="inherit" style={{ marginRight: "10px" }} />
        </div>
      )} */}
        </div>
      </div>
    </>
  );
}
