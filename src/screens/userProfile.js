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
import { Alert, IconButton, Paper } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

import "../css/userProfile.css";
import { set } from "react-hook-form";

export default function UserProfile() {
  const navigate = useNavigate();
  const [fullNameData, setFullNameData] = useState({ full_name: "" });
  const [userProfile, setUserProfile] = useState();
  const [isDisabled, setIsDisabled] = useState(true);
  const [showResetButton, setShowResetButton] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [error, setError] = useState({
    password: null,
  });

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
          border: "1px solid #FF5733",
          maxWidth: "900px",
          padding: "16px 24px",
          color: "red",
          fontWeight: "bolder",
        },
      });
    } else {
      toast.loading("In processing..");
      const updUrl =
        "https://master-help-desk-back-end.vercel.app/auth/update_information";
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
          toast.dismiss();
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
          toast.dismiss();
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
          toast.dismiss();
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
    toast.loading("In processing..");
    const getUrl = `https://master-help-desk-back-end.vercel.app/auth/get_profile`;
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
        toast.dismiss();
        const userData = await response.json();
        setUserProfile(userData);
      } else if (response.status === 403) {
        toast.dismiss();
        const error = await response.json();
        toast.error(`${error.message}!`, {
          style: {
            border: "1px solid #F85F60",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "red",
            fontWeight: "bolder",
          },
        });
      } else if (response.status === 401) {
        toast.dismiss();
        toast.error("Please login first!", {
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
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClickUpdate = () => {
    handleUpdate();
  };

  const handleResetClick = () => {
    handleSendOtp();
    setShowOtpDialog(true);
  };

  const handleCloseOtpDialog = () => {
    setOtp("");
    setOldPassword("");
    setPassword("");
    setConfirmPassword("");
    setShowOtpDialog(false);
  };

  const handleCloseChangePassword = () => {
    setOtp("");
    setOldPassword("");
    setPassword("");
    setConfirmPassword("");
    setShowPasswordDialog(false);
  };

  // SEND OTP
  const handleSendOtp = async () => {
    if (
      userProfile?.email === "" ||
      userProfile?.email === null ||
      userProfile?.email === undefined
    ) {
      toast.error("Not found account's email!", {
        style: {
          border: "1px solid #FF5733",
          maxWidth: "900px",
          padding: "16px 24px",
          color: "red",
          fontWeight: "bolder",
        },
      });
    } else {
      toast.loading(" OTP is being sent to your email...");
      const sendUrl =
        "https://master-help-desk-back-end.vercel.app/auth/forgot_password";
      try {
        const response = await fetch(sendUrl, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            email: userProfile.email,
          }),
        });
        if (response.status === 200) {
          toast.dismiss();
          toast.success("OTP sent successfully.", {
            style: {
              border: "1px solid #37E030",
              maxWidth: "900px",
              padding: "16px 24px",
              color: "green",
              fontWeight: "bolder",
            },
          });
        } else if (response.status === 500) {
          toast.dismiss();
          toast.error("Fail to sent OTP!", {
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
      } catch (error) {
        console.error("Error:", error);
      } finally {
      }
    }
  };
  // VERIFY OTP
  const [otp, setOtp] = useState();
  const handleChangeOtp = (newOtp) => {
    setOtp(newOtp);
  };

  const handleCheckOtp = async () => {
    if (otp === "") {
      toast.error("Please input the OTP!", {
        style: {
          border: "1px solid #FF5733",
          maxWidth: "900px",
          padding: "16px 24px",
          color: "red",
          fontWeight: "bolder",
        },
      });
    } else {
      toast.loading("In processing..");
      const checkOtpUrl = `https://master-help-desk-back-end.vercel.app/auth/verify_otp`;
      try {
        const response = await fetch(checkOtpUrl, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            email: userProfile.email,
            otp: otp,
          }),
        });
        if (response.status === 200) {
          toast.dismiss();
          const data = await response.json();
          localStorage.setItem("otp_verified_profile", data.otp_verified);
          toast.success("OTP Verified.", {
            style: {
              border: "1px solid #37E030",
              maxWidth: "900px",
              padding: "16px 24px",
              color: "green",
              fontWeight: "bolder",
            },
          });
          setShowOtpDialog(false);
          setShowPasswordDialog(true);
        } else if (response.status === 500) {
          toast.dismiss();
          toast.error("OTP verification failed!", {
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
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  // RESEND OTP
  const handleResendOtp = async () => {
    if (userProfile?.email) {
      toast.loading(" OTP is being sent to your email...");
      const changeUrl =
        "https://master-help-desk-back-end.vercel.app/auth/resend_otp";
      try {
        const response = await fetch(changeUrl, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            email: userProfile.email,
          }),
        });
        if (response.status === 200) {
          toast.dismiss();
          toast.success("OTP sent successfully.", {
            style: {
              border: "1px solid #37E030",
              maxWidth: "900px",
              padding: "16px 24px",
              color: "green",
              fontWeight: "bolder",
            },
          });
        } else if (response.status === 500) {
          toast.dismiss();
          toast.error("Fail to sent OTP!", {
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
          toast.error("Can not resend, please try again later!", {
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
    } else if (
      userProfile?.email === "" ||
      userProfile?.email === null ||
      userProfile?.email === undefined
    ) {
      toast.error("Email is not collected!", {
        style: {
          border: "1px solid #F85F60",
          maxWidth: "900px",
          padding: "16px 24px",
          color: "red",
          fontWeight: "bolder",
        },
      });
    }
  };

  // CHANGE NEW PASSWORD
  const handleNewPassword = async () => {
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
      const token = localStorage.getItem("access_token");
      const rsToken = localStorage.getItem("otp_verified_profile");
      toast.loading("In processing..");
      const changeUrl =
        "https://master-help-desk-back-end.vercel.app/auth/change_password";
      try {
        const response = await fetch(changeUrl, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${rsToken}, Bearer ${token}`,
          },
          body: JSON.stringify({
            username: userProfile.username,
            old_password: oldPassword,
            new_password: password,
          }),
        });
        if (response.status === 200) {
          toast.dismiss();
          toast.success("Change password successfully.", {
            style: {
              border: "1px solid #37E030",
              maxWidth: "900px",
              padding: "16px 24px",
              color: "green",
              fontWeight: "bolder",
            },
          });
          setShowPasswordDialog(false);
        } else if (response.status === 500) {
          toast.dismiss();
          toast.error("Fail to change password!", {
            style: {
              border: "1px solid #F85F60",
              maxWidth: "900px",
              padding: "16px 24px",
              color: "red",
              fontWeight: "bolder",
            },
          });
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
      } catch (error) {
        console.error("Error:", error);
      } finally {
      }
    } else {
      toast.dismiss();
      toast.error("Confirm password does not match!", {
        style: {
          border: "1px solid #F85F60",
          maxWidth: "900px",
          padding: "16px 24px",
          color: "red",
          fontWeight: "bolder",
        },
      });
    }
  };

  return (
    <div style={{ height: "100vh" }}>
      <Toaster position="bottom-right" reverseOrder={false} />
      <NavigationUser />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "0fr 3fr",
          height: "59vh",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <SidebarUser />
        </div>
        <div className="profileField flex flex-col gap-10 px-20 py-10 bg-[#F3F8FF]">
          <Paper
            elevation={3}
            style={{ padding: "20px", border: "1px solid #89A6CC" }}
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-row items-center">
                <h1 style={{ width: "120px" }}>Full Name</h1>
                <TextField
                  className="bg-[white]"
                  disabled={isDisabled}
                  id="outlined-basic"
                  onChange={handleChangeInput("full_name")}
                  placeholder={userProfile?.full_name}
                  value={fullNameData?.full_name}
                  size="small"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" className="pr-2">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>

              <div className="flex flex-row items-center">
                <h1 style={{ width: "120px" }}>Username</h1>
                <TextField
                  className="bg-[white]"
                  disabled
                  id="outlined-basic"
                  value={userProfile?.username}
                  size="small"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" className="pr-2">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>

              <div className="flex flex-row items-center">
                <h1 style={{ width: "120px" }}>Email</h1>
                <TextField
                  className="bg-[white]"
                  disabled
                  id="outlined-basic"
                  value={userProfile?.email}
                  size="small"
                  fullWidth
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
          </Paper>

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
          <MuiOtpInput onChange={handleChangeOtp} value={otp} length={6} />
          <Box>
            <div className="flex flex-row justify-between">
              <div className="">
                <Button
                  type="cancel"
                  variant="contained"
                  sx={{ mt: 2, mr: 2 }}
                  style={{
                    backgroundColor: "#FF5733",
                    width: "100px",
                    height: "40px",
                  }}
                  onClick={handleResendOtp}
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
              color: "#FF5733",
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
            onClick={handleCheckOtp}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog nhập mật khẩu mới */}
      <Dialog
        open={showPasswordDialog}
        onClose={handleCloseChangePassword}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Change Password</DialogTitle>
        <DialogContent>
          <TextField
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            label="Old Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="New Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!error.password}
            helperText={error.password}
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
            onClick={handleCloseChangePassword}
            style={{
              color: "#FF5733",
              width: "100px",
              height: "40px",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleNewPassword}
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
