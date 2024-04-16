import React, { useEffect } from "react";
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
  const [fullNameData, setData] = useState({
    full_name: "",
  });

  const [userProfile, setUserProfile] = useState();

  const handleChangeInput = (prop) => (event) => {
    setData({ ...fullNameData, [prop]: event.target.value });
  };

  // Đổi information của Profile
  const handleUpdate = async () => {
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
        alert("Update Success");
      } else {
        console.log("Update Fail");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
    }
  };
  console.log("hello", fullNameData.full_name);

  // Lấy information của user từ API
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
    } finally {
    }
  };

  console.log(userProfile);

  // Điền thông tin vào Input

  const handleEditClick = () => {
    setIsDisabled(!isDisabled);
    setShowResetButton(isDisabled);
  };

  const handleClickUpdate = () => {
    handleUpdate();
    handleEditClick();
  };

  const handleResetClick = () => {
    navigate(`/login/forgotPassword`);
  };

  useEffect(() => {
    handleGetUserProfile();
  }, []);

  return (
    <div className="">
      {/*-------------- Navigation + Backgroud---------------- */}

      <NavigationUser />

      {/*-------------- END OF Navigation + Backgroud---------------- */}

      {/*-------------- LayoutBody ---------------- */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "0fr 3fr",
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
                  value={fullNameData?.full_name || userProfile?.full_name}
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
                  // placeholder={userProfile.username}
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
                  // placeholder={userProfile.email}
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

      {/*-------------- END OF LayoutBody ---------------- */}
    </div>
  );
}
