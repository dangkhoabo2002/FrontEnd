import React, { useState } from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import { Box, Button } from "@mui/material";
import Logo from "../images/MHDLogo.png";
import bgLogin from "../images/loginBackgr.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function OTP() {
  const navigate = useNavigate();
  // const [alert, setAlert] = useState(false);

  const emailReset = localStorage.getItem("email");
  const [otp, setOtp] = useState();

  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  const handleVerifyOtp = async () => {
    if (otp === "") {
      toast.error("Please input OTP!", {
        style: {
          border: "1px solid #37E030",
          maxWidth: "900px",
          padding: "16px 24px",
          color: "red",
          fontWeight: "bolder",
        },
      });
    } else {
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
            email: emailReset,
          }),
        });
        if (response.status === 200) {
          toast.success("Verify successfull!", {
            style: {
              border: "1px solid #37E030",
              maxWidth: "900px",
              padding: "16px 24px",
              color: "green",
              fontWeight: "bolder",
            },
          });
          setTimeout(() => {
            navigate("/resetPassword");
          }, 2000);
        } else if (response.status === 500) {
          toast.error("Wrong OTP, please try again!", {
            style: {
              border: "1px solid #F85F60",
              maxWidth: "900px",
              padding: "16px 24px",
              color: "red",
              fontWeight: "bolder",
            },
          });
        } else {
          toast.error("Unknown Error, please try again later!", {
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
      } finally {
      }
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
          email: emailReset,
        }),
      });
      if (response.status === 200) {
        toast.success("Resend OTP success, please check out your Email!", {
          style: {
            border: "1px solid #37E030",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "green",
            fontWeight: "bolder",
          },
        });
      } else if (response.status === 500) {
        toast.error("Failed to send OTP!", {
          style: {
            border: "1px solid #F85F60",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "red",
            fontWeight: "bolder",
          },
        });
      } else {
        toast.error("Something went wrong!", {
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
      // setAlert(true);
    } finally {
    }
  };

  console.log("otp", otp);
  console.log("email", emailReset);

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
                onClick={handleVerifyOtp}
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
          {alert && (
            <>{/* <Alert severity="error">This is an error Alert.</Alert> */}</>
          )}
        </div>
      </div>
    </>
  );
}
