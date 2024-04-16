import React, { useState } from "react";
import bgLogin from "../images/loginBackgr.png";
import Logo from "../images/MHDLogo.png";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import "../css/login.css";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
  });

  const handleChange = (prop) => (event) => {
    setData({ ...data, [prop]: event.target.value });
  };

  const handleSubmit = async () => {
    if (data.email === "") {
      toast.error("Please input your Email first!", {
        style: {
          border: "1px solid #F85F60",
          maxWidth: "900px",
          padding: "16px 24px",
          color: "red",
          fontWeight: "bolder",
        },
      });
    } else {
      const loginUrl = "http://127.0.0.1:5000/auth/forgot_password";
      try {
        const response = await fetch(loginUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            email: data.email,
          }),
        });
        if (response.status === 200) {
          localStorage.setItem("email", data.email);
          toast.error("OTP sent successfully, Please check your Email!", {
            style: {
              border: "1px solid #F85F60",
              maxWidth: "900px",
              padding: "16px 24px",
              color: "red",
              fontWeight: "bolder",
            },
          });
          setTimeout(() => {
            navigate("/otp");
          }, 2000);
        } else if (response.status === 500) {
          toast.error("Failed to send OTP, Please try again!", {
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
              className="mb-10"
              src={Logo}
              alt="Logo"
              style={{ width: "96px", height: "96px" }}
            />
          </div>
        </Link>
        <div className="px-60 py-15">
          <div className="d-flex flex-col ">
            <p
              className="lead mb-0"
              style={{ fontWeight: "900  ", fontSize: "24px" }}
            >
              Reset Your Password
            </p>
          </div>
          <div className="emailAddress my-5 mb-10">
            <p className="mt-3" style={{ fontSize: "16px", fontWeight: "600" }}>
              Enter your email address
            </p>
            <p style={{ fontSize: "11px", fontWeight: "600" }}>
              Lost your password? Please enter your username or email address.
              You will receive a link to create a new password via email.
            </p>

            <div className="textField mt-3">
              <TextField
                label="Email address"
                fullWidth
                variant="outlined"
                className="mb-4"
                onChange={handleChange("email")}
                value={data.email}
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
              onClick={handleSubmit}
            >
              Send code
            </Button>
          </div>
          <div>
            <Link to={"/login"}>
              <p
                className=" mt-3 font-semibold"
                style={{ color: "#3867A5", textAlign: "right" }}
              >
                <buton>Return to login</buton>
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
