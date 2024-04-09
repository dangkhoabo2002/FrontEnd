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
import PhoneIcon from "@mui/icons-material/Phone";
import LockResetIcon from "@mui/icons-material/LockReset";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

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
  const { customer_id } = useParams();

  const [fullname, setFullName] = useState();
  const [userName, setUserName] = useState();
  const [email, setUserEmail] = useState();

  const handleChangeInput = (prop) => (event) => {
    setData({ ...data, [prop]: event.target.value });
  };

  // Đổi information của Profile

  // const handleUpdate = async () => {
  //   const loginUrl = "http://127.0.0.1:5000/org/update_information";
  //   const token = localStorage.getItem("access_token");

  //   try {
  //     const response = await fetch(loginUrl, {
  //       method: "PUT",
  //       credentials: "include",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Origin": "*",
  //       },
  //       body: JSON.stringify({
  //         organization_id: organization_id,
  //         name: data.name,
  //         contact_phone: data.contact_phone,
  //         contact_email: data.contact_email,
  //         description: data.description,
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
  // const handleGetCustomerData = async () => {
  //   const loginUrl = `http://127.0.0.1:5000/auth/get_organization_data/${organization_id}`;
  //   const token = localStorage.getItem("access_token");
  //   try {
  //     const response = await fetch(loginUrl, {
  //       method: "GET",
  //       credentials: "include",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Origin": "*",
  //       },
  //     });
  //     if (response.status === 200) {
  //       const orgData = await response.json();
  //       setOrganizations(orgData);
  //     } else {
  //       alert("Get Fail");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   } finally {
  //   }
  // };

  // Điền thông tin vào Input
  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  // Toggle Disabled trong TextField và Editable
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
            <div className="username">
              <h1>Full Name</h1>

              <TextField
                disabled={isDisabled}
                id="outlined-basic"
                value={userName}
                onChange={handleUserNameChange}
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
                disabled={isDisabled}
                id="outlined-basic"
                value={userName}
                onChange={handleUserNameChange}
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
            <div className="flex flex-row gap-40 ">
              <div className="email">
                <h1>Email</h1>

                <TextField
                  disabled
                  id="outlined-basic"
                  value="khangdcse161156@fpt.edu.vn"
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
              <div className="">
                <h1>Phone Number</h1>
                <TextField
                  disabled={isDisabled}
                  id="outlined-basic"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  size="small"
                  sx={{ width: "260px" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" className="pr-1">
                        <PhoneIcon /> <p className="pl-4">+84</p>
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
