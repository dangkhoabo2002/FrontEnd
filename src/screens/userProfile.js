import React from "react";
import { useState } from "react";
import SidebarUser from "../components/sidebarUser";
import { useNavigate } from "react-router-dom";

import NavigationUser from "../components/navUserProfile";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import InputAdornment from "@mui/material/InputAdornment";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockResetIcon from "@mui/icons-material/LockReset";

import "../css/userProfile.css";

export default function UserProfile() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [showResetButton, setShowResetButton] = useState(false);

  const navigate = useNavigate();
  const [data, setData] = useState({
    full_name: "",
    username: "",
    email: "",
  });

  const [userProfile, setUserProfile] = useState();

  const handleChangeInput = (prop) => (event) => {
    setData({ ...data, [prop]: event.target.value });
  };

  // Đổi information của Profile

  // const handleUpdate = async () => {
  //   const updUrl = "http://127.0.0.1:5000/auth/update_information";
  //   const token = localStorage.getItem("access_token");

  //   try {
  //     const response = await fetch(updUrl, {
  //       method: "PUT",
  //       credentials: "include",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Origin": "*",
  //       },
  //       body: JSON.stringify({
  //         full_name: data.full_name,
  //       }),
  //     });
  //     if (response.status === 200) {
  //       handleGetOrgData();
  //       alert("Update Success");
  //     } else {
  //       alert("Update Fail");
  //       console.log("orgId", organization_id);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   } finally {
  //   }
  // };

  // Lấy information của user từ API
  // const handleGetUserProfile = async () => {
  //   const getUrl = `http://127.0.0.1:5000/auth/get`;
  //   const token = localStorage.getItem("access_token");
  //   try {
  //     const response = await fetch(getUrl, {
  //       method: "GET",
  //       credentials: "include",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Origin": "*",
  //       },
  //     });
  //     if (response.status === 200) {
  //       const userData = await response.json();
  //       setUserProfile(userData);
  //     } else {
  //       alert("Get Fail");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   } finally {
  //   }
  // };

  // Điền thông tin vào Input

  const handleEditClick = () => {
    setIsDisabled(!isDisabled);
    setShowResetButton(isDisabled);
  };

  const handleResetClick = () => {
    navigate(`/login/forgotPassword`);
  };

  return (
    <div className="">
      {/*-------------- Navigation + Backgroud---------------- */}

      <NavigationUser />

      {/*-------------- END OF Navigation + Backgroud---------------- */}

      {/*-------------- LayoutBody ---------------- */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 3fr",
          height: "52vh",
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
        <div className="profile">
          <div className="profileField px-20 pt-10 flex flex-col gap-10">
            <div className="profileField  flex flex-row justify-start gap-72">
              <div className="username">
                <h1>Full Name</h1>

                <TextField
                  disabled={isDisabled}
                  id="outlined-basic"
                  onChange={handleChangeInput("full_name")}
                  value={data.full_name}
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
                  disabled
                  id="outlined-basic"
                  onChange={handleChangeInput("username")}
                  value={data.username}
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
                  disabled
                  id="outlined-basic"
                  value={data.email}
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
                  <Button variant="outlined" onClick={handleEditClick}>
                    Save Changes
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={handleResetClick}
                  >
                    <LockResetIcon />
                    <span className="px-2">Reset Password</span>
                  </Button>
                  <Button
                    size="medium"
                    variant="text"
                    onClick={handleEditClick}
                  >
                    <span className="">Cancel</span>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/*-------------- END OF LayoutBody ---------------- */}
    </div>
  );
}
