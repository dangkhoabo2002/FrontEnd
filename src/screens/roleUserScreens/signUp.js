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

export default function SignUp() {
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
                By signing up, I agree to Manimal <Link>Terms of Service</Link>{" "}
                and <Link>Privacy Policy.</Link>
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
          Already have an account?{" "}
          <Link to={"/login"} style={{ color: "#3867A5" }}>
            <b>Login</b>
          </Link>
        </div>
      </div>
    </>
  );
}
