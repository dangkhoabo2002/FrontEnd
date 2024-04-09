import React, { useEffect } from "react";
import { useState } from "react";
import { RiServerFill } from "react-icons/ri";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

import ButtonAddServer from "./buttonAddServer";
import Footer from "../components/userFooter";
import Sidebar from "../components/Sidebar";

import Empty from "../assets/userBackground.png";
import serverIcon2 from "../images/serverIcon2.png";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import DnsIcon from "@mui/icons-material/Dns";

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
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "../css/organizationDashboard.css";

import {
  Select,
  MenuItem,
  Modal,
  Box,
  IconButton,
  Grid,
  Typography,
  FormControl,
  OutlinedInput,
  FormControlLabel,
  Checkbox,
  Chip,
} from "@mui/material";

export default function OrganizationDashboard() {
  // DATA API
  const [organizations, setOrganizations] = useState();

  const [serverList, setServerList] = useState();

  const [memberList, setMemberList] = useState();
  //

  const [isDisabled, setIsDisabled] = useState(true);
  const [showResetButton, setShowResetButton] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openAddMember, setOpenAddMember] = React.useState(false);

  const [currentStatus, setCurrentStatus] = useState();

  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    contact_phone: "",
    contact_email: "",
    description: "",
    status: "",
    new_user: "",
  });

  const [removeUser, setRemoveUser] = useState();

  const { organization_id } = useParams();

  const handleChangeInput = (prop) => (event) => {
    setData({ ...data, [prop]: event.target.value });
  };

  // Đổi information của Org trong Setting

  const handleUpdate = async () => {
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
        alert("Update Success");
      } else {
        alert("Update Fail");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
    }
  };

  const handleSaveClick = () => {
    handleUpdate();
    handleEditClick();
  };

  // Lấy information của Org từ API
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

  // Đổi status của Org - Deactivate
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
        alert("Inactive Success");
      } else {
        console.log("Inactive Fail");
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

  // Xóa user ra khỏi Org

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

    handleClose();
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
      } else {
        console.log("Fail to get member");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
    }
  };

  // DELETE ORG

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
        alert("Delete Success");
        navigate("/organizations");
      } else {
        console.log("Delete Fail");
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

  const handleConfirmDelete = () => {
    handleDeleteOrg();
    handleCloseDelete();
  };

  // Toggle cho phép Edit
  const handleEditClick = () => {
    setIsDisabled(!isDisabled);
    setShowResetButton(isDisabled);
  };

  // Toggle mở đóng Dialog xóa

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
        console.log("Not Found Any Server");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
    }
  };

  // Add member in ORG

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
        alert("Add Success");
      } else if (response.status === 400) {
        alert("User is not exist!");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
    }
  };

  const handleAddNewUser = () => {
    handleAddMember();
    handleCloseAddMember();
  };
  // Toggle mở đóng Dialog add member

  const handleOpenAddMember = () => {
    setOpenAddMember(true);
  };

  const handleCloseAddMember = () => {
    setOpenAddMember(false);
  };
  // Dialog của Remove User
  const handleClickOpenRemoveUser = () => {
    setOpen(true);
  };

  const [value, setValue] = useState("1");

  // Auto load khi vào trang

  useEffect(() => {
    handleGetOrgData();
    handleGetServers();
    handleGetMember();
  }, []);

  if (!organizations) {
    return (
      <div>
        <div className="px-20">
          {/* BodyContainer */}
          <div
            className="py-6 text-center border-stone-200"
            style={{ borderBottom: "1px solid", color: "#D9D9D9" }}
          >
            <div className="header flex flex-row items-center gap-x-3">
              <RiServerFill
                style={{ width: "32px", height: "32px", color: "#637381" }}
              />
              <p
                className="font-semibold"
                style={{ fontSize: "28px", color: "#637381" }}
              >
                Organization is not found
              </p>
            </div>
          </div>
          <div
            className=""
            style={{ display: "flex", justifyContent: "center" }}
          >
            <img
              loading="lazy"
              src={Empty}
              className="img items-center justify-center"
              alt="empty"
              style={{
                width: "652px",
                height: "652px",
                opacity: "50%",
                objectFit: "center",
              }}
            />
          </div>
          <ButtonAddServer />
        </div>
        <Footer />
      </div>
    );
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { name } = organizations[0];

  // CHANGE USER / SP USER
  const changeRoleToSuperuser = async (memberId) => {
    try {
      const response = await axios.post("/change_role_to_superuser", {
        memberId: memberId,
      });
      console.log(response.data.message);
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
      console.log(response.data.message);
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
      console.log(response.data.message);
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

  return (
    <>
      <div className="containerOrg">
        <div className="sideMenu">
          <Sidebar />
        </div>
        <div
          className="pl-14"
          style={{ width: "100%", boxSizing: "border-box" }}
        >
          {/* BodyContainer */}
          <div
            className=" py-6 text-center border-stone-200"
            style={{
              borderBottom: "1px solid",
              color: "#D9D9D9",
              width: "80%",
            }}
          >
            <div className="header flex flex-row items-center gap-x-3">
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
                  textTransform: "uppercase",
                }}
              >
                {name}
              </span>
            </div>
          </div>
          <div
            className=""
            style={{ display: "flex", justifyContent: "left", width: "100%" }}
          >
            <div>
              <Box
                sx={{
                  width: "100%",
                  typography: "body1",
                }}
              >
                <TabContext value={value}>
                  <Box
                    sx={{
                      borderColor: "divider",
                      width: "88vw",
                    }}
                  >
                    <TabList
                      onChange={handleChange}
                      aria-label="lab API tabs example"
                    >
                      <Tab label="Servers" value="1" />

                      <Tab label="Members" value="2" />
                      <Tab label="Settings" value="3" />
                    </TabList>
                  </Box>

                  {/* TAB 1 */}
                  <TabPanel value="1">
                    <div className="flex flex-col justify-start">
                      <div className="flex flex-row justify-left">
                        <h1 className="text-[#637381] text-2xl font pr-10 my-3">
                          Active server
                        </h1>
                        <p className="text-2xl font pr-10 my-3 text-[#637381]">
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
                    </div>
                  </TabPanel>

                  {/* TAB 2 */}
                  <TabPanel value="2">
                    <div className="memberTab">
                      <h1 className="text-[#637381] text-2xl font pr-16 my-3">
                        Member
                      </h1>
                      <div className="flex flex-row gap-">
                        <Button
                          variant="outlined"
                          onClick={handleOpenAddMember}
                        >
                          Add Member
                        </Button>
                      </div>
                      <Dialog
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
                        <DialogTitle>Add new member</DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            To add member into this organization, please enter
                            their username here. We will send updates
                            occasionally.
                          </DialogContentText>
                          <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="email"
                            label="Username"
                            type="username"
                            fullWidth
                            variant="standard"
                            onChange={handleChangeInput("new_user")}
                            value={data.new_user}
                          />
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleCloseAddMember}>Cancel</Button>
                          <Button
                            type="submit"
                            variant="outlined"
                            onClick={handleAddNewUser}
                          >
                            Add
                          </Button>
                        </DialogActions>
                      </Dialog>
                      <table className="memberInOrganizationTable">
                        <tr>
                          <th id="id">#</th>
                          <th id="name">NAME</th>
                          <th id="role">ROLE</th>
                          <th id="action">ACTIONS</th>
                        </tr>
                        {memberList?.map((member, index) => (
                          <tr>
                            <td>{index + 1}</td>
                            <td>{member.username}</td>
                            <td>{member.roles}</td>
                            <td>
                              <IconButton
                                aria-label="delete"
                                onClick={() => handleClickOpenRemoveUser()}
                              >
                                <DeleteIcon />
                              </IconButton>
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
                              <IconButton aria-label="remote">
                                <AddModeratorIcon />
                              </IconButton>
                            </td>
                          </tr>
                        ))}
                      </table>
                    </div>
                  </TabPanel>

                  {/* TAB 3 */}
                  <TabPanel value="3">
                    <h1 className="text-[#637381] text-2xl font pr-16 my-3">
                      Slot(s) available: 1/5
                    </h1>
                    <div className="server">
                      <div className="profileField flex flex-col gap-10">
                        <div className="org_name">
                          <h1 className="mb-2">Organization name</h1>

                          <TextField
                            className="org-Dashboard-textField placeholder-gray-500 border"
                            mt={1}
                            disabled={isDisabled}
                            id="outlined-basic"
                            onChange={handleChangeInput("name")}
                            defaultValue={data.name}
                            placeholder={organizations[0].name}
                            size="small"
                            sx={{ width: "auto" }}
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
                              defaultValue={data.contact_email}
                              size="small"
                              sx={{ width: "400px" }}
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
                              defaultValue={data.contact_phone}
                              size="small"
                              sx={{ width: "260px" }}
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
                            defaultValue={data.description}
                            size="medium"
                            sx={{ width: "100%", maxWidth: "820px" }}
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
                      <Button
                        variant="text"
                        color="error"
                        sx={{ borderRadius: 1, marginRight: 2 }}
                        onClick={handleOpenDelete}
                      >
                        DELETE ORGANIZATION
                      </Button>
                      <Dialog
                        open={openDelete}
                        onClose={handleCloseDelete}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">
                          {"Do you want to Delete this Organization?"}
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            Your action will not be recovery.
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleCloseDelete}>No</Button>
                          <Button onClick={handleConfirmDelete}>
                            <p className="text-red-600">Yes</p>
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
      <Footer />
    </>
  );
}
