import React, { useEffect, useState } from "react";
import SidebarUser from "../components/sidebarUser";
import { useNavigate } from "react-router-dom";
import NavigationUser from "../components/navUserProfile";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockResetIcon from "@mui/icons-material/LockReset";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { MuiOtpInput } from "mui-one-time-password-input";
import Box from "@mui/material/Box";
import { Alert, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

import "../css/userProfile.css";

export default function UserProfile() {
  const navigate = useNavigate();
  const [fullNameData, setFullNameData] = useState({ full_name: "" });
  const [userProfile, setUserProfile] = useState();
  const [isDisabled, setIsDisabled] = useState(true);
  const [showResetButton, setShowResetButton] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [showResetPasswordAlert, setShowResetPasswordAlert] = useState(false);
  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  useEffect(() => {
    handleGetUserProfile();
  }, []);

  const handleChangeInput = (prop) => (event) => {
    setFullNameData({ ...fullNameData, [prop]: event.target.value });
  };

  const handleEditClick = () => {
    setIsDisabled(!isDisabled);
    setShowResetButton(isDisabled);
  };

  const handleUpdate = async () => {
    if (fullNameData.full_name === "") {
      toast.error("Fullname can not be empty!", {
        style: {
          border: "1px solid #F85F60",
          maxWidth: "900px",
          padding: "16px 24px",
          color: "red",
          fontWeight: "bolder",
        },
      });
    } else {
      const updUrl = "http://127.0.0.1:5000/auth/update_information";
      const token = localStorage.getItem("access_token");

      try {
        const response = await fetch(updUrl, {
          method: "PUT",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            full_name: fullNameData.full_name,
            username: userProfile.username,
            email: userProfile.email,
          }),
        });
        if (response.status === 200) {
          handleGetUserProfile();
          toast.success("Update successfully.", {
            style: {
              border: "1px solid #37E030",
              maxWidth: "900px",
              padding: "16px 24px",
              color: "green",
              fontWeight: "bolder",
            },
          });
        } else if (response.status === 403) {
          toast.error("Unauthorized, please login again!", {
            style: {
              border: "1px solid #F85F60",
              maxWidth: "900px",
              padding: "16px 24px",
              color: "red",
              fontWeight: "bolder",
            },
          });
        } else {
          toast.error("Fail to update, please try again later!", {
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
        handleEditClick();
      }
    }
  };

  const handleGetUserProfile = async () => {
    const getUrl = `http://127.0.0.1:5000/auth/get_profile`;
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(getUrl, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      if (response.status === 200) {
        const userData = await response.json();
        setUserProfile(userData);
      } else {
        alert("Get Fail");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClickUpdate = () => {
    handleUpdate();
  };

  const handleResetClick = () => {
    setShowResetPasswordAlert(true);
    setShowOtpDialog(true);
  };

  const handleCloseResetPasswordAlert = () => {
    setShowResetPasswordAlert(false);
  };

  const handleCloseOtpDialog = () => {
    setShowOtpDialog(false);
  };

  const handleOtpVerification = () => {
    setIsOtpVerified(true);
    setShowOtpDialog(false);
    setShowPasswordDialog(true);
  };

  const handleChangePassword = (newPassword) => {
    setShowPasswordDialog(false);
  };

  const handleChangePasswordFormSubmit = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    handleChangePassword(password);
    setShowSuccessAlert(true);
  };

  return (
    <div className="" style={{ height: "100vh" }}>
      <Toaster position="bottom-right" reverseOrder={false} />
      <NavigationUser />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "0fr 3fr",
          height: "59vh",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <SidebarUser />
        </div>
        <div className="profileField  flex flex-col gap-10 px-20 py-10 bg-[#F3F8FF]">
          <div className="profileField  flex flex-row justify-start gap-72">
            <div className="username">
              <h1>Full Name</h1>
              <TextField
                className="bg-[white]"
                disabled={isDisabled}
                id="outlined-basic"
                onChange={handleChangeInput("full_name")}
                placeholder={userProfile?.full_name}
                value={fullNameData?.full_name}
                size="small"
                sx={{ width: "auto" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" className="pr-2">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="username">
              <h1>Username</h1>
              <TextField
                className="bg-[white]"
                disabled
                id="outlined-basic"
                value={userProfile?.username}
                size="small"
                sx={{ width: "auto" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" className="pr-2">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </div>
          <div className="flex flex-row gap-40 ">
            <div className="email">
              <h1>Email</h1>
              <TextField
                className="bg-[white]"
                disabled
                id="outlined-basic"
                value={userProfile?.email}
                size="small"
                sx={{ width: "400px" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" className="pr-2">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </div>
          <div className="flex gap-10">
            {!showResetButton && (
              <Button variant="outlined" onClick={handleEditClick}>
                Edit Profile
              </Button>
            )}
            {showResetButton && (
              <>
                <Button variant="outlined" onClick={handleClickUpdate}>
                  Save Changes
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  onClick={handleResetClick}
                >
                  <LockResetIcon />
                  <span className="px-2">Change Password</span>
                </Button>
                <Button size="medium" variant="text" onClick={handleEditClick}>
                  <span className="">Cancel</span>
                </Button>
              </>
            )}
          </div>

          {showSuccessAlert && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
              style={{
                position: "fixed",
                bottom: "20px",
                right: "20px",
                zIndex: 9999,
              }}
            >
              <Alert
                open={true}
                onClose={() => setShowSuccessAlert(false)}
                severity="success"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => setShowSuccessAlert(false)}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                Password changed successfully.
              </Alert>
            </motion.div>
          )}
        </div>
      </div>

      {/* Thông báo gửi OTP */}
      {showResetPasswordAlert && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 9999,
          }}
        >
          <Alert
            open={true}
            onClose={handleCloseResetPasswordAlert}
            severity="info"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={handleCloseResetPasswordAlert}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            An email with the OTP has been sent to your registered email
            address. Please check your email to continue.
          </Alert>
        </motion.div>
      )}

      {/* Dialog nhập OTP */}
      <Dialog
        open={showOtpDialog}
        onClose={handleCloseOtpDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Email confirmation</DialogTitle>
        <DialogContent>
          <p className="mt-3" style={{ fontSize: "16px", fontWeight: "600" }}>
            Enter code
          </p>
          <MuiOtpInput length={6} value={""} onChange={""} />
          <Box>
            <div className="flex flex-row justify-between">
              <div className="">
                <Button
                  type="cancel"
                  variant="contained"
                  sx={{ mt: 2, mr: 2 }}
                  style={{
                    backgroundColor: "#F85F60",
                    width: "100px",
                    height: "40px",
                  }}
                  onClick={"handleResendOtp"}
                >
                  Resend
                </Button>
              </div>
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseOtpDialog}
            style={{
              color: "#F85F60",
              width: "100px",
              height: "40px",
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            style={{
              marginRight: "16px",
              backgroundColor: "#3867A5",
              width: "100px",
              height: "40px",
            }}
            onClick={handleOtpVerification}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog nhập mật khẩu mới */}
      <Dialog
        open={showPasswordDialog}
        onClose={() => setShowPasswordDialog(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Change Password</DialogTitle>
        <DialogContent>
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="New Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setShowPasswordDialog(false)}
            style={{
              color: "#F85F60",
              width: "100px",
              height: "40px",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleChangePasswordFormSubmit}
            variant="contained"
            style={{
              marginRight: "16px",
              backgroundColor: "#3867A5",
              width: "100px",
              height: "40px",
            }}
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
