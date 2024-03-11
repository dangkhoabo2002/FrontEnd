import React, { useState } from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import { Box, Button, FormHelperText } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import Logo from "../../images/MHDLogo.png";
import { Link } from "react-router-dom";
import forgotPassword from "./forgotPassword";
import CheckIcon from "@mui/icons-material/Check";

export default function OTPInput() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      otp: "",
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
          Email confirmation
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="mt-3" style={{ fontSize: "16px", fontWeight: "600" }}>
          Enter code
        </p>
        <Controller
          control={control}
          rules={{ validate: (value) => value.length === 6 }}
          render={({ field, fieldState }) => (
            <Box>
              <MuiOtpInput sx={{ gap: 1 }} {...field} length={6} />
              {fieldState.invalid ? (
                <FormHelperText error>OTP invalid</FormHelperText>
              ) : null}
            </Box>
          )}
          name="otp"
        />
        <Box>
          <Button
            type="cancel"
            variant="contained"
            sx={{ mt: 2, mr: 2 }}
            style={{ backgroundColor: "#F85F60" }}
          >
            Resend
          </Button>
          <Link to={"/resetPassword"}>
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 2 }}
              style={{ backgroundColor: "#3867A5" }}
            >
              Submit
            </Button>
          </Link>
        </Box>
        <Box>
          {" "}
          <Link to={"/login"}>Cancel</Link>{" "}
          <Link to={"/forgotPassword"}>Edit Email</Link>
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
          Here is a gentle confirmation that your action was successful.
        </div>
      )} */}
    </>
  );
}
