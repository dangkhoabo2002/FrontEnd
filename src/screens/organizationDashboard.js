import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

// COMPONENTS

import ButtonAddServer from "./buttonAddServer";
import Footer from "../components/userFooter";
import Sidebar from "../components/Sidebar";

// ICONS MUI
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ClearIcon from "@mui/icons-material/Clear";
import serverIcon2 from "../images/serverIcon2.png";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import DnsIcon from "@mui/icons-material/Dns";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import AddModeratorIcon from "@mui/icons-material/AddModerator";
import TextField from "@mui/material/TextField";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Button from "@mui/material/Button";
import ApartmentIcon from "@mui/icons-material/Apartment";
import Dialog from "@mui/material/Dialog";
import Tooltip from "@mui/material/Tooltip";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// FUNCTION
import handleCheckPass from "../functions/checkPass";

// CSS
import "../css/organizationDashboard.css";
import AddIcon from "@mui/icons-material/Add";

import {
  Modal,
  Box,
  IconButton,
  Grid,
  Typography,
  FormControl,
  OutlinedInput,
  FormControlLabel,
  Checkbox,
  MenuItem,
} from "@mui/material";

export default function OrganizationDashboard() {
  // ADD ROLE DATA
  const [openAddRole, setOpenAddRole] = useState(false);
  const [addRoleData, setAddRoleData] = useState();
  const [numRoles, setNumRoles] = useState(1);
  const handleAddRole = () => {
    if (numRoles < 7) {
      setNumRoles(numRoles + 1);
    } else {
      alert("Maximum number of roles reached!");
    }
  };
  const handleCloseAddRole = () => {
    setOpenAddRole(false);
    // Reset số lượng dòng khi đóng modal
    setNumRoles(1);
  };
  const navigate = useNavigate();

  const { organization_id } = useParams();

  // DATA API
  const [organizations, setOrganizations] = useState();

  const [serverList, setServerList] = useState();

  const [memberList, setMemberList] = useState();

  // term of service
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleCheckboxChange = (event) => {
    setAcceptedTerms(event.target.checked);
    setShowTooltip(false);
  };

  // ---------------------- VIEW ------------------------

  // --------- FUNCTION ---------

  // GET SERVERS IN ORG

  const handleGetServers = async () => {
    const getsvUrl = `http://127.0.0.1:5000/server/get_server_in_organization/${organization_id}`;
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(getsvUrl, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true",
        },
      });
      if (response.status === 200) {
        const servers = await response.json();
        setServerList(servers);
      } else if (response.status === 404) {
        toast.error("Not found any server!", {
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
  };

  // GET MEMBER
  const handleGetMember = async () => {
    const memberUrl = `http://127.0.0.1:5000/org/get_user_in_organization/${organization_id}`;
    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch(memberUrl, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      if (response.status === 200) {
        const memberData = await response.json();
        setMemberList(memberData);
      } else if (response.status === 400) {
        toast.error(
          "Organization is not defined, please go back and try again!",
          {
            style: {
              border: "1px solid #F85F60",
              maxWidth: "900px",
              padding: "16px 24px",
              color: "red",
              fontWeight: "bolder",
            },
          }
        );
      } else if (response.status === 403) {
        toast.error("Permission denied!", {
          style: {
            border: "1px solid #F85F60",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "red",
            fontWeight: "bolder",
          },
        });
      } else if (response.status === 500) {
        toast.error("Failed to get Users & Roles, please try again!", {
          style: {
            border: "1px solid #F85F60",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "red",
            fontWeight: "bolder",
          },
        });
      } else {
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
  };

  const [numberMember, setNumberMember] = useState();
  const handleNumberMember = async () => {
    const memberUrl = `http://127.0.0.1:5000/org/get_number_of_users/${organization_id}`;
    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch(memberUrl, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      if (response.status === 200) {
        const memberCount = await response.json();
        setNumberMember(memberCount);
      } else {
        console.log("Fail to get member");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
    }
  };

  // GET information của Org từ API
  const handleGetOrgData = async () => {
    const loginUrl = `http://127.0.0.1:5000/org/get_organization_data/${organization_id}`;
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(loginUrl, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      if (response.status === 200) {
        const orgData = await response.json();
        setOrganizations(orgData);
      } else {
        alert("Get Fail");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
    }
  };

  // Auto load khi vào trang

  useEffect(() => {
    handleGetOrgData();
    handleGetServers();
    // handleNumberMember();
    handleGetMember();
  }, []);

  // ---------------------- ADD ------------------------

  // --------- DATA ----------

  // SEVER ADD  INFO
  const [addSeverData, setAddServerData] = useState({
    server_name: "",
    hostname: "",
    username: "",
    password: "",
    server_type: "",
    rsa_key: "",
    port: "",
  });

  // --------- TOGGLE ---------

  // Toggle mở đóng Dialog add member

  const handleOpenAddMember = () => {
    setOpenAddMember(true);
  };

  const handleCloseAddMember = () => {
    setOpenAddMember(false);
  };

  // Toggle mở đóng Dialog add server

  const [openAddServer, setOpenAddServer] = useState(false);

  const handleOpenAddServer = () => {
    setOpenAddServer(true);
  };

  const handleCloseAddServer = () => {
    setOpenAddServer(false);
    setAddServerData({
      server_name: "",
      hostname: "",
      username: "",
      password: "",
      server_type: "",
      rsa_key: "",
      port: "",
    });
  };

  const role = [
    {
      value: "1",
      label: "Proxy Manager",
      addData: "proxy",
    },
    {
      value: "2",
      label: "Firewall Manager",
      addData: "firewall",
    },
    {
      value: "3",
      label: "Docker Manager",
      addData: "docker",
    },
    {
      value: "4",
      label: "Library Manager",
      addData: "library",
    },
    {
      value: "5",
      label: "Data Manager",
      addData: "data",
    },
    {
      value: "6",
      label: "Report Manager",
      addData: "report",
    },
    {
      value: "7",
      label: "Execution Manager",
      addData: "execution",
    },
  ];
  // --------- FUNCTION ---------

  // ADD server
  const handleAddServer = () => {
    if (!acceptedTerms) {
      setShowTooltip(true);
      return;
    }
    handleAddServerAPI();
  };

  const handleAddServerAPI = async () => {
    if (
      addSeverData.server_name === "" ||
      addSeverData.hostname === "" ||
      addSeverData.username === ""
    ) {
      toast.error("Please fill all necessary fields!", {
        style: {
          border: "1px solid #F85F60",
          maxWidth: "900px",
          padding: "16px 24px",
          color: "red",
          fontWeight: "bolder",
        },
      });
    } else {
      if (addSeverData.password === "" && addSeverData.rsa_key === "") {
        toast.error("Please enter server password or private key!", {
          style: {
            border: "1px solid #F85F60",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "red",
            fontWeight: "bolder",
          },
        });
      } else if (addSeverData.server_name.length > 50) {
        toast.error("Server name must be maximum 50 characters long!", {
          style: {
            border: "1px solid #F85F60",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "red",
            fontWeight: "bolder",
          },
        });
      } else {
        const addUrl = `http://127.0.0.1:5000/server/add`;
        const token = localStorage.getItem("access_token");

        try {
          const response = await fetch(addUrl, {
            method: "POST",
            credentials: "include",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Credentials": "true",
            },
            body: JSON.stringify({
              server_name: addSeverData.server_name,
              hostname: addSeverData.hostname,
              organization_id: organization_id,
              username: addSeverData.username,
              password: addSeverData.password,
              port: addSeverData.port,
              rsa_key: addSeverData.rsa_key,
            }),
          });
          if (response.status === 201) {
            handleGetServers();
            handleCloseAddServer();
          } else if (response.status === 500) {
          }
        } catch (error) {
          console.error("Error:", error);
        } finally {
        }
      }
    }
  };

  const handleChangeAddInput = (prop) => (event) => {
    setAddServerData({ ...addSeverData, [prop]: event.target.value });
  };

  // ADD member into org

  const [openAddMember, setOpenAddMember] = React.useState(false);

  const handleAddNewUser = () => {
    if (data?.new_user === "") {
      toast.error("Please enter your password!", {
        style: {
          border: "1px solid #F85F60",
          maxWidth: "900px",
          padding: "16px 24px",
          color: "red",
          fontWeight: "bolder",
        },
      });
    } else {
      handleAddMember();
    }
  };
  const handleAddMember = async () => {
    const addmemberUrl = "http://127.0.0.1:5000/org/add_user";
    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch(addmemberUrl, {
        method: "PUT",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          organization_id: organization_id,
          new_user: data.new_user,
        }),
      });
      if (response.status === 200) {
        handleGetMember();
        toast.success("Add member success.", {
          style: {
            border: "1px solid #37E030",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "green",
            fontWeight: "bolder",
          },
        });
        handleCloseAddMember();
      } else if (response.status === 400) {
        toast.error("User is not exist!", {
          style: {
            border: "1px solid #F85F60",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "red",
            fontWeight: "bolder",
          },
        });
      } else if (response.status === 403) {
        toast.error("Permission denied!", {
          style: {
            border: "1px solid #F85F60",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "red",
            fontWeight: "bolder",
          },
        });
      } else {
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
  };

  // ---------------------- UPDATE / ADJUST ------------------------

  // --------- DATA ---------

  // ORG UPDATE INFO
  const [data, setData] = useState({
    name: "",
    contact_phone: "",
    contact_email: "",
    description: "",
    status: "",
    new_user: "",
  });

  // --------- TOGGLE ---------

  // Toggle mở đóng Dialog Change Status

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // --------- FUNCTION ---------

  // UPDATE org info

  const handleUpdate = async () => {
    if (
      data?.name === "" ||
      data?.contact_phone === "" ||
      data?.contact_email === ""
    ) {
      toast.error("The information can not be empty!", {
        style: {
          border: "1px solid #F85F60",
          maxWidth: "900px",
          padding: "16px 24px",
          color: "red",
          fontWeight: "bolder",
        },
      });
    } else {
      const loginUrl = "http://127.0.0.1:5000/org/update_information";
      const token = localStorage.getItem("access_token");

      try {
        const response = await fetch(loginUrl, {
          method: "PUT",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            organization_id: organization_id,
            name: data.name,
            contact_phone: data.contact_phone,
            contact_email: data.contact_email,
            description: data.description,
          }),
        });
        if (response.status === 200) {
          handleGetOrgData();
          toast.success("Update organization successfully.", {
            style: {
              border: "1px solid #37E030",
              maxWidth: "900px",
              padding: "16px 24px",
              color: "green",
              fontWeight: "bolder",
            },
          });
        } else if (response.status === 403) {
          toast.error("Permission denied!", {
            style: {
              border: "1px solid #F85F60",
              maxWidth: "900px",
              padding: "16px 24px",
              color: "red",
              fontWeight: "bolder",
            },
          });
        } else {
          toast.error("Something wrong, please try again later.", {
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

  const handleChangeInput = (prop) => (event) => {
    setData({ ...data, [prop]: event.target.value });
  };

  const handleSaveClick = () => {
    handleUpdate();
  };

  // Đổi status của Org - Deactivate
  const [currentStatus, setCurrentStatus] = useState();

  const handleChangeStatus = async () => {
    let newStatus = organizations[0].status;
    if (currentStatus === "ACTIVE") {
      newStatus = "INACTIVE";
    } else {
      newStatus = "ACTIVE";
    }
    const changeStatusUrl =
      "http://127.0.0.1:5000/org/change_organization_status";
    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch(changeStatusUrl, {
        method: "PUT",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          organization_id: organization_id,
          status: newStatus,
        }),
      });
      if (response.status === 200) {
        setCurrentStatus(newStatus);
        handleGetOrgData();
        toast.success(`Organization now is ${newStatus}.`, {
          style: {
            border: "1px solid #37E030",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "green",
            fontWeight: "bolder",
          },
        });
      } else {
        toast.error("Fail to change status!", {
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
  };

  const handleChangeStatusDone = () => {
    setData();
    handleChangeStatus();
    handleClose();
  };

  // CHANGE USER / SP USER in org
  const changeRoleToSuperuser = async (memberId) => {
    try {
      const response = await axios.post("/change_role_to_superuser", {
        memberId: memberId,
      });
    } catch (error) {
      console.error("Error changing role to superuser:", error);
    }
  };

  // Function to change member role to user
  const changeRoleToUser = async (memberId) => {
    try {
      const response = await axios.post("/change_role_to_user", {
        memberId: memberId,
      });
    } catch (error) {
      console.error("Error changing role to user:", error);
    }
  };

  // Inside OrganizationDashboard component
  const handleChangeRole = async (memberId, newRole) => {
    try {
      const response = await axios.post("/api/change_member_role", {
        memberId: memberId,
        newRole: newRole,
      });
    } catch (error) {
      console.error("Error changing role:", error);
    }
  };

  // modal
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    borderRadius: "20px",
    boxShadow: 24,
    p: 3,
  };

  // ---------------------- DELETE ------------------------

  // DELETE user in org

  const [removeUser, setRemoveUser] = useState();

  const handleRemoveUserAPI = async () => {
    const loginUrl = "http://127.0.0.1:5000/org/remove_user";
    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch(loginUrl, {
        method: "PUT",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          organization_id: organization_id,
          remove_username: removeUser,
        }),
      });
      if (response.status === 200) {
        handleGetMember();
        alert("Remove Success");
      } else {
        alert("Remove Fail");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
    }
  };

  const handleRemoveUser = (rmvUser) => {
    setRemoveUser(rmvUser);
    handleRemoveUserAPI();
  };

  // DELETE org

  const [openDeleteOrg, setOpenDelete] = React.useState(false);
  const handleDeleteOrg = async () => {
    const loginUrl = `http://127.0.0.1:5000/org/delete/${organization_id}`;
    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch(loginUrl, {
        method: "DELETE",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true",
        },
      });
      if (response.status === 200) {
        toast.success("Organization deleted successfully.", {
          style: {
            border: "1px solid #F85F60",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "green",
            fontWeight: "bolder",
          },
        });
        setTimeout(() => {
          navigate("/organizations");
        }, 2000);
      } else if (response.status === 403) {
        toast.error("Permission denied!", {
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
  };

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  // DELETE ORG - Check pass

  const [passDelete, setPassDelete] = useState();

  const handleChangeInputDelete = (event) => {
    setPassDelete(event.target.value);
  };

  const handleDeleteOrgConfirm = async () => {
    const checkPass = await handleCheckPass(passDelete);
    if (checkPass === "Success") {
      handleDeleteOrg();
      handleCloseDelete();
    } else if (checkPass === "") {
      toast.error("Incorrect password!", {
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

  // Toggle cho phép Edit
  const [isDisabled, setIsDisabled] = useState(true);
  const [showResetButton, setShowResetButton] = useState(false);

  const handleEditClick = () => {
    setIsDisabled(!isDisabled);
    setShowResetButton(isDisabled);
  };

  // Dialog của Remove User
  const handleClickOpenRemoveUser = () => {
    setOpen(true);
  };

  const handleClickOpenAddRole = () => {
    setOpen();
  };

  const [value, setValue] = useState("1");

  if (!organizations) {
    return <div></div>;
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { name } = organizations[0];
  localStorage.setItem("org_name", name);
  // ADD ROLE

  const handleOpenAddRole = () => {
    setOpenAddRole(true);
  };

  // const handleAddRoleAPI = async () => {
  //   const loginUrl = `http://127.0.0.1:5000/org/delete/${organization_id}`;
  //   const token = localStorage.getItem("access_token");

  //   try {
  //     const response = await fetch(loginUrl, {
  //       method: "DELETE",
  //       credentials: "include",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Origin": "*",
  //         "Access-Control-Allow-Credentials": "true",
  //       },
  //    body: JSON.stringify({
  //        addRole: addRoleData,
  //      });
  //     });
  //     if (response.status === 200) {
  //   alert("Add role Success"),
  //     //reload

  //     } else {
  //       alert("Delete Fail");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   } finally {
  //   }
  // };

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />

      <div className="containerOrg" style={{ height: "100vh" }}>
        <div className="sideMenu">
          <Sidebar />
        </div>
        <div
          className=""
          style={{
            width: "100%",
            boxSizing: "border-box",
            backgroundColor: "#f3f3fb",
          }}
        >
          <div
            className=" py-6 text-center gap-10"
            style={{
              backgroundColor: "white",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div className="header flex flex-row items-center gap-x-3  px-20">
              <Link
                to={"/organizations"}
                className="flex flex-row items-center gap-x-3"
              >
                <ApartmentIcon
                  style={{ width: "32px", height: "32px", color: "#637381" }}
                />
                <p
                  className="font-semibold"
                  style={{ fontSize: "28px", color: "#637381" }}
                >
                  Organizations <ArrowForwardIosIcon />
                </p>
              </Link>
              <span
                className="font-semibold"
                style={{
                  fontSize: "28px",
                  color: "#637381",
                }}
              >
                {name}
              </span>
            </div>
          </div>

          {/* BodyContainer */}

          <div className="container px-20 py-3 mt-2">
            <div>
              <Box>
                <TabContext value={value}>
                  <Box
                    sx={{
                      borderColor: "divider",
                      width: "26.78vw",
                      overflow: "hidden",
                      border: "2px solid #D9D9D9",
                      borderRadius: "5px",

                      backgroundColor: "white",
                    }}
                  >
                    <TabList
                      onChange={handleChange}
                      aria-label="lab API tabs example"
                      sx={{
                        "& .MuiTabs-flexContainer": {
                          // borderBottom: "1px solid #D9D9D9",
                          // borderTop: "1px solid #D9D9D9",
                        },
                        "& .MuiTab-root": {
                          minWidth: "auto",
                          textTransform: "capitalize",
                          width: "136px",
                          fontWeight: "bold",
                          color: "black",

                          // borderLeft: "1px solid #D9D9D9",
                          // borderRight: "1px solid #D9D9D9",
                          transition: "background-color 0.3s, color 0.3s",
                          "&.Mui-selected": {
                            color: "black",
                          },
                        },
                        "& .Mui-selected": {
                          backgroundColor: "#D9D9D9",
                        },
                        "& .MuiTabs-indicator": {
                          backgroundColor: "transparent",
                        },
                      }}
                    >
                      <Tab disableRipple label="Servers" value="1" />
                      <Tab disableRipple label="Members" value="2" />
                      <Tab disableRipple label="Settings" value="3" />
                    </TabList>
                  </Box>

                  {/* TAB 1 */}
                  <TabPanel sx={{ pt: 3, px: 0 }} value="1">
                    <div className="flex flex-col justify-start">
                      <div className="flex flex-row justify-left">
                        <h1
                          className="text-[#637381] font pr-10 "
                          style={{ fontSize: "24px" }}
                        >
                          Active server
                        </h1>
                        <p className="text-2xl font pr-10  text-[#637381]">
                          {
                            serverList?.filter(
                              (server) => server.status === "ACTIVE"
                            ).length
                          }
                        </p>
                      </div>
                      <div className="serverListRow">
                        {serverList
                          ?.filter((server) => server.status === "ACTIVE")
                          ?.map((server) => (
                            <Link
                              key={server.id}
                              to={`/organizations/dashboard/${organization_id}/${server.server_id}`}
                            >
                              <div
                                className="serverCard flex flex-col justify-between items-center"
                                style={{ backgroundColor: "white" }}
                              >
                                <span
                                  className={`text-white px-6 py-1 ${
                                    server.status === "INACTIVE"
                                      ? "bg-gray-400"
                                      : "bg-[#6EC882]"
                                  }`}
                                >
                                  {server.status}
                                </span>
                                <h2>{server.server_name}</h2>
                                <img
                                  alt="Server Icon"
                                  loading="lazy"
                                  src={serverIcon2}
                                  style={{
                                    width: "60px",
                                    objectFit: "contain",
                                  }}
                                />
                                <h2 className="text-[#5F94D9]">
                                  SHARED HOSTING
                                </h2>
                                <h2>{server.hostname}</h2>
                              </div>
                            </Link>
                          ))}
                      </div>
                      <div className="flex flex-row justify-left">
                        <h1 className="text-[#637381] text-2xl font pr-10 my-3">
                          Inactive server
                        </h1>
                        <p className="text-2xl font pr-10 my-3 text-[#637381]">
                          {
                            serverList?.filter(
                              (server) => server.status === "INACTIVE"
                            ).length
                          }
                        </p>
                      </div>
                      <div className="serverListRow">
                        {serverList
                          ?.filter((server) => server.status === "INACTIVE")
                          ?.map((server) => (
                            <Link
                              key={server.id}
                              to={`/organizations/dashboard/${organization_id}/${server.server_id}`}
                            >
                              <div className="serverCard flex flex-col justify-between items-center">
                                <span
                                  className={`text-white px-6 py-1 ${
                                    server.status === "INACTIVE"
                                      ? "bg-gray-400"
                                      : "bg-[#6EC882]"
                                  }`}
                                >
                                  {server.status}
                                </span>
                                <h2>{server.server_name}</h2>
                                <img
                                  alt="Server Icon"
                                  loading="lazy"
                                  src={serverIcon2}
                                  style={{
                                    width: "60px",
                                    objectFit: "contain",
                                  }}
                                />
                                <h2 className="text-[#5F94D9]">
                                  Shared Hosting
                                </h2>
                                <h2>{server.domain}</h2>
                                <h2>IP Address: {server.port}</h2>
                              </div>
                            </Link>
                          ))}
                      </div>
                      <button onClick={handleOpenAddServer}>
                        <ButtonAddServer />
                      </button>
                      <Modal
                        open={openAddServer}
                        onClose={handleCloseAddServer}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                      >
                        <Box sx={style}>
                          <div className="pb-2 text-center border-b-2 border-stone-500">
                            <div className="flex flex-row items-center justify-between">
                              <p
                                className="font-semibold"
                                style={{ fontSize: "28px", color: "#637381" }}
                              >
                                ADD SERVER
                              </p>
                              <IconButton onClick={handleCloseAddServer}>
                                <CloseIcon />
                              </IconButton>
                            </div>
                          </div>

                          <Grid
                            container
                            alignItems="center"
                            spacing={3}
                            mt={0}
                          >
                            <Grid item xs={12} md={3}>
                              <Typography
                                className="mt-3"
                                style={{
                                  fontSize: "16px",
                                  fontWeight: "400",
                                }}
                              >
                                Server Name:
                              </Typography>
                            </Grid>
                            <Grid item xs={12} md={8}>
                              <FormControl fullWidth variant="outlined">
                                <OutlinedInput
                                  inputProps={{
                                    "aria-label": "Server name",
                                  }}
                                  onChange={handleChangeAddInput("server_name")}
                                  value={addSeverData?.server_name}
                                />
                              </FormControl>
                            </Grid>
                            <Grid item xs={12} md={1}>
                              {/* <Tooltip
                                title="Please enter the correct Host name of the server, as incorrect input will result in connection failure."
                                placement="right"
                              >
                                <HelpOutlineIcon
                                  style={{
                                    fontSize: "20px",
                                    fontWeight: "400",
                                  }}
                                />
                              </Tooltip> */}
                            </Grid>
                          </Grid>

                          <Grid
                            container
                            alignItems="center"
                            spacing={3}
                            mt={0}
                          >
                            <Grid item xs={12} md={3}>
                              <Typography
                                className="mt-3"
                                style={{
                                  fontSize: "16px",
                                  fontWeight: "400",
                                }}
                              >
                                Host Name:
                              </Typography>
                            </Grid>
                            <Grid item xs={12} md={8}>
                              <FormControl fullWidth variant="outlined">
                                <OutlinedInput
                                  inputProps={{
                                    "aria-label": "Host name",
                                  }}
                                  onChange={handleChangeAddInput("hostname")}
                                  value={addSeverData.hostname}
                                />
                              </FormControl>
                            </Grid>
                            <Grid item xs={12} md={1}>
                              <Tooltip
                                title="Please enter the correct Host name of the server, as incorrect input will result in connection failure."
                                placement="right"
                              >
                                <HelpOutlineIcon
                                  style={{
                                    fontSize: "20px",
                                    fontWeight: "400",
                                  }}
                                />
                              </Tooltip>
                            </Grid>
                          </Grid>
                          <Grid
                            container
                            alignItems="center"
                            spacing={3}
                            mt={0}
                          >
                            <Grid item xs={12} md={3}>
                              <Typography
                                className="mt-3"
                                style={{
                                  fontSize: "16px",
                                  fontWeight: "400",
                                }}
                              >
                                Server Username:
                              </Typography>
                            </Grid>
                            <Grid item xs={12} md={8}>
                              <FormControl fullWidth variant="outlined">
                                <OutlinedInput
                                  inputProps={{
                                    "aria-label": "Domain",
                                  }}
                                  onChange={handleChangeAddInput("username")}
                                  value={addSeverData.username}
                                />
                              </FormControl>
                            </Grid>
                            <Grid item xs={12} md={1}>
                              <Tooltip
                                title="Please enter the correct Server Username of the server, as incorrect input will result in connection failure."
                                placement="right"
                              >
                                <HelpOutlineIcon
                                  style={{
                                    fontSize: "20px",
                                    fontWeight: "400",
                                  }}
                                />
                              </Tooltip>
                            </Grid>
                          </Grid>

                          <Grid
                            container
                            alignItems="center"
                            spacing={3}
                            mt={0}
                          >
                            <Grid item xs={12} md={3}>
                              <Typography
                                className="mt-3"
                                style={{
                                  fontSize: "16px",
                                  fontWeight: "400",
                                }}
                              >
                                Server Password:
                              </Typography>
                            </Grid>
                            <Grid item xs={12} md={8}>
                              <FormControl fullWidth variant="outlined">
                                <OutlinedInput
                                  type="password"
                                  inputProps={{
                                    "aria-label": "Password",
                                  }}
                                  onChange={handleChangeAddInput("password")}
                                  value={addSeverData.password}
                                />
                              </FormControl>
                            </Grid>
                            <Grid item xs={12} md={1}>
                              <Tooltip
                                title="Please enter the correct Server password of the server, as incorrect input will result in connection failure."
                                placement="right"
                              >
                                <HelpOutlineIcon
                                  style={{
                                    fontSize: "20px",
                                    fontWeight: "400",
                                  }}
                                />
                              </Tooltip>
                            </Grid>
                          </Grid>

                          <Grid
                            container
                            alignItems="center"
                            spacing={3}
                            mt={0}
                          >
                            <Grid item xs={12} md={3}>
                              <Typography
                                className="mt-3"
                                style={{
                                  fontSize: "16px",
                                  fontWeight: "400",
                                }}
                              >
                                Port (optional):
                              </Typography>
                            </Grid>
                            <Grid item xs={12} md={8}>
                              <FormControl fullWidth variant="outlined">
                                <OutlinedInput
                                  inputProps={{
                                    "aria-label": "Host name",
                                  }}
                                  onChange={handleChangeAddInput("port")}
                                  value={addSeverData.port}
                                />
                              </FormControl>
                            </Grid>
                            <Grid item xs={12} md={1}>
                              {/* <Tooltip
                                title="Please enter the correct Host name of the server, as incorrect input will result in connection failure."
                                placement="right"
                              >
                                <HelpOutlineIcon
                                  style={{
                                    fontSize: "20px",
                                    fontWeight: "400",
                                  }}
                                />
                              </Tooltip> */}
                            </Grid>
                          </Grid>

                          <Grid
                            container
                            alignItems="center"
                            spacing={3}
                            mt={0}
                          >
                            <Grid item xs={12} md={3}>
                              <Typography
                                className="mt-3"
                                style={{
                                  fontSize: "16px",
                                  fontWeight: "400",
                                }}
                              >
                                Private key:
                              </Typography>
                            </Grid>
                            <Grid item xs={12} md={8}>
                              <FormControl fullWidth variant="outlined">
                                <OutlinedInput
                                  inputProps={{
                                    "aria-label": "Private key",
                                  }}
                                  onChange={handleChangeAddInput("rsa_key")}
                                  value={addSeverData.rsa_key}
                                />
                              </FormControl>
                            </Grid>
                            <Grid item xs={12} md={1}>
                              <Tooltip
                                title="Please enter the correct Private key of the server, as incorrect input will result in connection failure."
                                placement="right"
                              >
                                <HelpOutlineIcon
                                  style={{
                                    fontSize: "20px",
                                    fontWeight: "400",
                                  }}
                                />
                              </Tooltip>
                            </Grid>
                          </Grid>
                          <Box className="mt-3 d-flex">
                            <div>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={acceptedTerms}
                                    onChange={handleCheckboxChange}
                                  />
                                }
                                label={
                                  <>
                                    I accept the
                                    <Tooltip
                                      title="Please accept the Terms of Service"
                                      open={showTooltip}
                                      placement="right"
                                    >
                                      <span
                                        style={{
                                          color: "#5F94D9",
                                          marginLeft: "4px",
                                        }}
                                      >
                                        Terms of Service
                                      </span>
                                    </Tooltip>
                                    .
                                  </>
                                }
                              />
                            </div>
                          </Box>

                          <DialogActions className="">
                            <Button
                              variant="contained"
                              onClick={handleCloseAddServer}
                              sx={{
                                width: "100px",
                                color: "white",
                                bgcolor: "#F85F60",
                                "&:hover": { bgcolor: "#D45758" },
                              }}
                            >
                              Cancel
                            </Button>
                            <Button
                              variant="contained"
                              onClick={handleAddServer}
                              sx={{
                                width: "100px",
                                color: "white",
                                bgcolor: "#6EC882",
                                "&:hover": { bgcolor: "#63B976" },
                              }}
                            >
                              Add
                            </Button>
                          </DialogActions>
                        </Box>
                      </Modal>
                    </div>
                  </TabPanel>

                  {/* TAB 2 */}
                  <TabPanel sx={{ pt: 3, px: 0 }} value="2">
                    <div className="memberTab">
                      <div className="flex flex-row justify-between">
                        <h1 className="text-[#637381] text-2xl font pr-16 mb-3">
                          Member
                        </h1>
                        {/* <h1 className="text-[#637381] text-2xl font mb-3">
                          {numberMember?.number_users}
                          {numberMember?.number_users === 1
                            ? " user"
                            : " users"}
                        </h1> */}
                      </div>
                      <div className="flex flex-row gap-">
                        <Button
                          variant="outlined"
                          onClick={handleOpenAddMember}
                          sx={{
                            color: "white",
                            bgcolor: "#3867A5",
                            "&:hover": { bgcolor: "#2A4D7B" },
                          }}
                        >
                          Add Member
                        </Button>
                      </div>

                      {/* modal add member */}
                      <Modal
                        open={openAddMember}
                        onClose={handleCloseAddMember}
                        PaperProps={{
                          component: "form",
                          onSubmit: (event) => {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            const formJson = Object.fromEntries(
                              formData.entries()
                            );
                            handleClose();
                          },
                        }}
                      >
                        <Box sx={style}>
                          <div className="pb-2 text-center border-b-2 border-stone-500">
                            <div className="flex flex-row items-center justify-between">
                              <p
                                className="font-semibold"
                                style={{ fontSize: "28px", color: "#637381" }}
                              >
                                ADD MEMBER
                              </p>
                              <IconButton onClick={handleCloseAddMember}>
                                <CloseIcon />
                              </IconButton>
                            </div>
                          </div>
                          <Grid
                            container
                            alignItems="center"
                            spacing={2}
                            mt={0}
                          >
                            <Grid item xs={12} md={12}>
                              To add member into this organization, please enter
                              their username here. We will send updates
                              occasionally.
                            </Grid>
                            <Grid item xs={12} md={12}>
                              <TextField
                                required
                                margin="dense"
                                id="name"
                                name="email"
                                label="Username"
                                type="username"
                                fullWidth
                                onChange={handleChangeInput("new_user")}
                                value={data?.new_user}
                              />
                            </Grid>
                          </Grid>

                          <DialogActions>
                            <Button
                              contained
                              sx={{
                                width: "100px",
                                color: "white",
                                bgcolor: "#F85F60",
                                "&:hover": { bgcolor: "#D45758" },
                              }}
                              onClick={handleCloseAddMember}
                            >
                              Cancel
                            </Button>
                            <Button
                              variant=""
                              onClick={handleAddNewUser}
                              sx={{
                                width: "100px",
                                color: "white",
                                bgcolor: "#3867A5",
                                "&:hover": { bgcolor: "#2A4D7B" },
                              }}
                            >
                              Done
                            </Button>
                          </DialogActions>
                        </Box>
                      </Modal>

                      {/* modal add role */}
                      <div
                        className="bg-white mt-4 rounded-md px-8 pb-8 shadow-md"
                        style={{ border: "1px solid #89A6CC" }}
                      >
                        <table className="memberInOrganizationTable">
                          <tr className="">
                            <th id="id">#</th>
                            <th id="name">NAME</th>
                            <th id="role">ROLE</th>
                            <th id="action">ACTIONS</th>
                          </tr>
                          {memberList?.map((member, index) => (
                            <tr key={member.id}>
                              <td>{index + 1}</td>
                              <td>{member.username}</td>
                              <td>{member.roles}</td>
                              <td>
                                <IconButton
                                  aria-label="delete"
                                  onClick={() =>
                                    handleRemoveUser(member.username)
                                  }
                                >
                                  <DeleteIcon />
                                </IconButton>

                                {/* DELETE USER DIALOG */}
                                <Dialog
                                  open={open}
                                  onClose={handleClose}
                                  aria-labelledby="alert-dialog-title"
                                  aria-describedby="alert-dialog-description"
                                >
                                  <DialogTitle id="alert-dialog-title">
                                    {"Do you want to remove this member ?"}
                                  </DialogTitle>

                                  <DialogActions>
                                    <Button onClick={handleClose}>No</Button>
                                    <Button
                                      onClick={() =>
                                        handleRemoveUser(member.username)
                                      }
                                    >
                                      <p className="text-red">Yes</p>
                                    </Button>
                                  </DialogActions>
                                </Dialog>
                                <IconButton
                                  aria-label="uprole"
                                  onClick={() => handleOpenAddRole()}
                                >
                                  <AddModeratorIcon />
                                </IconButton>
                              </td>
                            </tr>
                          ))}
                        </table>
                      </div>
                    </div>
                    <Modal open={openAddRole} onClose={handleCloseAddRole}>
                      <Box sx={style}>
                        <div className="pb-2 text-center border-b-2 border-stone-500">
                          <div className="flex flex-row items-center justify-between">
                            <p
                              className="font-semibold"
                              style={{ fontSize: "28px", color: "#637381" }}
                            >
                              ADD ROLE
                            </p>
                            <IconButton onClick={handleCloseAddRole}>
                              <CloseIcon />
                            </IconButton>
                          </div>
                        </div>
                        <Grid container alignItems="center" spacing={2} mt={0}>
                          {[...Array(numRoles)].map((_, index) => (
                            <React.Fragment key={index}>
                              <Grid item xs={12} md={2}>
                                <Typography
                                  className="mt-3"
                                  style={{
                                    fontSize: "16px",
                                    fontWeight: "400",
                                  }}
                                >
                                  Role:
                                </Typography>
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                md={8}
                                sx={{ position: "relative" }}
                              >
                                {/* Thêm CSS để chứa vị trí tương đối */}
                                <TextField
                                  fullWidth
                                  id={`outlined-select-currency-${index}`}
                                  select
                                  label=""
                                  defaultValue="1"
                                >
                                  {role.map((option) => (
                                    <MenuItem
                                      onChange={() =>
                                        setAddRoleData(option.addData)
                                      }
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </MenuItem>
                                  ))}
                                </TextField>
                              </Grid>
                              <Grid item xs={12} md={2}>
                                <IconButton
                                  size="small"
                                  sx={{
                                    fontSize: "16px",
                                    fontWeight: "400",
                                  }}
                                  onClick={() => {
                                    console.log("Clearing input");
                                  }}
                                >
                                  <ClearIcon />
                                </IconButton>
                              </Grid>
                            </React.Fragment>
                          ))}
                          <Grid item xs={12} md={12}>
                            <Button
                              startIcon={<AddIcon />}
                              variant="contained"
                              sx={{
                                width: "150px",
                                height: "30px",
                                color: "white",
                                bgcolor: "#3867A5",
                                "&:hover": { bgcolor: "#264B7B" },
                                fontSize: "14px",
                                fontWeight: "normal",
                                textTransform: "none",
                              }}
                              onClick={handleAddRole}
                            >
                              Add more role
                            </Button>
                          </Grid>
                        </Grid>
                        <DialogActions>
                          <Button onClick={handleCloseAddRole}>
                            <Typography
                              variant="button"
                              style={{ color: "red" }}
                            >
                              Cancel
                            </Typography>
                          </Button>
                          <Button
                            variant="contained"
                            onClick={handleAddRole}
                            sx={{
                              width: "100px",
                              color: "white",
                              bgcolor: "#3867A5",
                              "&:hover": { bgcolor: "#2A4D7B" },
                            }}
                          >
                            Done
                          </Button>
                        </DialogActions>
                      </Box>
                    </Modal>
                  </TabPanel>

                  {/* TAB 3 */}
                  <TabPanel sx={{ pt: 3, px: 0 }} value="3">
                    <h1 className="text-[#637381] text-2xl font pr-16 mb-3">
                      Slot(s) available: 1/5
                    </h1>
                    <div className="server">
                      <div className="profileField flex flex-col gap-5">
                        <div className="org_name">
                          <h1 className="mb-2">Organization name</h1>

                          <TextField
                            className="org-Dashboard-textField placeholder-gray-500 border"
                            mt={1}
                            disabled={isDisabled}
                            id="outlined-basic"
                            onChange={handleChangeInput("name")}
                            defaultValue={data?.name}
                            placeholder={organizations[0].name}
                            size="small"
                            sx={{ width: "auto", backgroundColor: "white" }}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment
                                  position="start"
                                  className="pr-2"
                                >
                                  <DnsIcon />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </div>

                        <div className="flex flex-row gap-40 ">
                          <div className="email">
                            <h1 className="mb-2">Email</h1>

                            <TextField
                              className="org-Dashboard-textField placeholder-gray-500 border"
                              mt={1}
                              disabled={isDisabled}
                              id="outlined-basic"
                              onChange={handleChangeInput("contact_email")}
                              placeholder={organizations[0].contact_email}
                              defaultValue={data?.contact_email}
                              size="small"
                              sx={{ width: "400px", backgroundColor: "white" }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment
                                    position="start"
                                    className="pr-2"
                                  >
                                    <EmailIcon />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </div>
                          <div className="">
                            <h1 className="mb-2">Phone Number</h1>
                            <TextField
                              className="org-Dashboard-textField placeholder-gray-500 border"
                              mt={1}
                              disabled={isDisabled}
                              id="outlined-basic"
                              onChange={handleChangeInput("contact_phone")}
                              placeholder={organizations[0].contact_phone}
                              defaultValue={data?.contact_phone}
                              size="small"
                              sx={{ width: "260px", backgroundColor: "white" }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment
                                    position="start"
                                    className="pr-2"
                                  >
                                    <PhoneIcon />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </div>
                        </div>
                        <div className="serverDes">
                          <h1 className="mb-2">Description</h1>
                          <TextField
                            className="org-Dashboard-textField"
                            mt={1}
                            rows={4}
                            multiline
                            disabled={isDisabled}
                            id="outlined-multiline-static"
                            onChange={handleChangeInput("description")}
                            placeholder={organizations[0].description}
                            defaultValue={data?.description}
                            size="medium"
                            sx={{
                              width: "100%",
                              maxWidth: "820px",
                              backgroundColor: "white",
                            }}
                          />
                        </div>
                        <div className="server_des mb-3">
                          {isDisabled && (
                            <Button
                              variant="outlined"
                              onClick={handleEditClick}
                            >
                              Update
                            </Button>
                          )}

                          {showResetButton && (
                            <>
                              <Button
                                variant="outlined"
                                onClick={handleSaveClick}
                                sx={{
                                  color: "white",
                                  bgcolor: "#3867A5",
                                  marginRight: "10px",
                                  "&:hover": { bgcolor: "#2A4D7B" },
                                }}
                              >
                                Save Change
                              </Button>
                              <Button
                                size="medium"
                                variant="text"
                                onClick={handleEditClick}
                              >
                                <span className="btn-cancel">Cancel</span>
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div>
                      <h1 className="text-[#637381] text-2xl font pr-16 my-3">
                        Demolish organization
                      </h1>
                      <Button
                        variant="contained"
                        color="error"
                        sx={{ borderRadius: 1, marginRight: 2 }}
                        onClick={handleClickOpen}
                      >
                        Change status
                      </Button>

                      {/* CHANGE STATUS ORG */}
                      <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">
                          {"Do you want to Deactivate this Organization?"}
                        </DialogTitle>
                        <DialogActions>
                          <Button onClick={handleClose}>No</Button>
                          <Button onClick={handleChangeStatusDone}>
                            <p className="text-red-600">Yes</p>
                          </Button>
                        </DialogActions>
                      </Dialog>

                      {/* DELETE ORG */}

                      <Button
                        variant="text"
                        color="error"
                        sx={{ borderRadius: 1, marginRight: 2 }}
                        onClick={handleOpenDelete}
                      >
                        DELETE ORGANIZATION
                      </Button>

                      <Dialog open={openDeleteOrg} onClose={handleCloseDelete}>
                        <DialogTitle>Delete Organization</DialogTitle>
                        <DialogContent>
                          <DialogContentText className="pb-4">
                            To delete this server, please enter your password.
                          </DialogContentText>
                          <TextField
                            required
                            margin="dense"
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            fullWidth
                            variant="standard"
                            onChange={handleChangeInputDelete}
                            value={passDelete}
                          />
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleCloseDelete}>Cancel</Button>
                          <Button onClick={handleDeleteOrgConfirm}>
                            Confirm
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </div>
                  </TabPanel>
                </TabContext>
              </Box>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}
