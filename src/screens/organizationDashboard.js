import React, { useState } from "react";
import { RiServerFill } from "react-icons/ri";
import { useParams, Link } from "react-router-dom";
import organizations from "../database/organizationsData";
import serverIcon2 from "../images/serverIcon2.png";
import Empty from "../images/empty.png";
import ButtonAddServer from "./buttonAddServer";
import Sidebar from "../components/Sidebar";
import Footer from "../components/userFooter";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import DnsIcon from "@mui/icons-material/Dns";
import ApartmentIcon from "@mui/icons-material/Apartment";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import KeyboardDoubleArrowUpOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowUpOutlined";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "../css/organizationDashboard.css";
import "../css/userOrganization.css";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";

import { Select, MenuItem, Modal, Box, IconButton, Grid, Typography, FormControl, OutlinedInput, FormControlLabel, Checkbox, Chip, Dialog, DialogTitle, DialogContentText, DialogContent, DialogActions } from "@mui/material";

export default function OrganizationDashboard() {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(!open);

  // const [addServer, setAddServer] = React.useState(false);
  // const handleAdd = () => setAddServer(true);
  // const handleClose = () => setAddServer(false);

  // const handleDone = () => {
  //   setAddServer(false);
  // };

  const [isDisabled, setIsDisabled] = useState(true);
  const [showResetButton, setShowResetButton] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("+84 34523322");
  const [orgName, setOrgName] = useState("Organization name");
  const [Email, setEmail] = useState("abc@fpt.edu.vn");
  const [Description, setDescription] = useState(
    "Lorem ipsum dolor sit amet, consectetur adip"
  );
  const [value, setValue] = useState("1");
  const { organizationId } = useParams();

  const selectedOrganization = organizations.find(
    (org) => org.id === Number(organizationId)
  );

  if (!selectedOrganization) {
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

  const handleEditClick = () => {
    setIsDisabled(!isDisabled);
    setShowResetButton(isDisabled);
  };

  const { name, membersCount, description, servers, members } =
    selectedOrganization;

  const handlePhoneChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

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
        <div className="px-20" style={{ width: "100%" }}>
          {/* BodyContainer */}
          <div
            className="py-6 text-center border-stone-200"
            style={{
              borderBottom: "1px solid",
              color: "#D9D9D9",
              width: "100%",
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
                style={{ fontSize: "28px", color: "#637381" }}
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
              <TabContext value={value}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Servers" value="1" />
                  <Tab label="Members" value="2" />
                  <Tab label="Settings" value="3" />
                </TabList>
                <TabPanel value="1">
                  <div className="flex flex-col justify-start">
                    <div className="flex flex-row justify-left">
                      <h1 className="text-[#637381] text-2xl font pr-10 my-3">
                        Active server
                      </h1>
                      <p className="text-2xl font pr-10 my-3 text-[#637381]">
                        {
                          servers.filter((server) => server.status === "Active")
                            .length
                        }
                      </p>
                    </div>
                    <Link to={"/server"}>
                      <div className="serverListRow">
                        {servers
                          .filter((server) => server.status === "Active")
                          .map((server) => (
                            <div className="serverCard flex flex-col justify-between items-center">
                              <span
                                className={`text-white px-6 py-1 ${
                                  server.status === "Inactive"
                                    ? "bg-gray-400"
                                    : "bg-[#6EC882]"
                                }`}
                              >
                                {server.status}
                              </span>
                              <h2>Server Name</h2>
                              <img
                                loading="lazy"
                                src={serverIcon2}
                                style={{ width: "60px", objectFit: "contain" }}
                              />
                              <h2 className="text-[#5F94D9]">Shared Hosting</h2>
                              <h2>{server.hostname}</h2>
                              <h2>IP Address: {server.port}</h2>
                            </div>
                          ))}
                      </div>
                    </Link>
                    <div className="flex flex-row justify-left">
                      <h1 className="text-[#637381] text-2xl font pr-10 my-3">
                        Inactive server
                      </h1>
                      <p className="text-2xl font pr-10 my-3 text-[#637381]">
                        {
                          servers.filter(
                            (server) => server.status === "Inactive"
                          ).length
                        }
                      </p>
                    </div>
                    <div className="serverListRow">
                      {servers
                        .filter((server) => server.status === "Inactive")
                        .map((server) => (
                          <div className="serverCard flex flex-col justify-between items-center">
                            <span
                              className={`text-white px-6 py-1 ${
                                server.status === "Inactive"
                                  ? "bg-gray-400"
                                  : "bg-[#6EC882]"
                              }`}
                            >
                              {server.status}
                            </span>
                            <h2>Server Name</h2>
                            <img
                              loading="lazy"
                              src={serverIcon2}
                              style={{ width: "60px", objectFit: "contain" }}
                            />
                            <h2 className="text-[#5F94D9]">Shared Hosting</h2>
                            <h2>{server.hostname}</h2>
                            <h2>IP Address: {server.port}</h2>
                          </div>
                        ))}
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value="2">
                  <div className="memberTab">
                    <h1 className="text-[#637381] text-2xl font pr-16 my-3">
                      Member
                    </h1>
                    <div className="flex flex-row gap-">
                      <Button variant="outlined">Select</Button>
                      <Button variant="outlined">Add Member</Button>
                    </div>
                    <table className="memberInOrganizationTable">
                      <tr>
                        <th id="id">#</th>
                        <th id="name">NAME</th>
                        <th id="role">ROLE</th>
                        <th id="action">ACTIONS</th>
                      </tr>
                      {members.map((member) => (
                        <tr key={member.id}>
                          <td>{member.id}</td>
                          <td>{member.name}</td>
                          <td>
                            {" "}
                            <Select
                              className="CustomDropdown"
                              value={member.role}
                              onChange={(event) =>
                                handleChangeRole(member.id, event.target.value)
                              }
                              displayEmpty
                              MenuProps={{
                                classes: {
                                  paper: "CustomDropdownMenu",
                                },
                              }}
                            >
                              <MenuItem value="user">User</MenuItem>
                              <MenuItem value="superuser">Superuser</MenuItem>
                            </Select>
                          </td>
                          <td>
                            <DeleteOutlineOutlinedIcon
                              style={{ cursor: "pointer", marginRight: "20px" }}
                            />
                            <KeyboardDoubleArrowUpOutlinedIcon
                              style={{ cursor: "pointer" }}
                            />
                          </td>
                        </tr>
                      ))}
                    </table>
                  </div>
                </TabPanel>
                <TabPanel value="3">
                  <h1 className="text-[#637381] text-2xl font pr-16 my-3">
                    Slot(s) available: 1/5
                  </h1>
                  <div className="server">
                    <div className="profileField flex flex-col gap-10">
                      <div className="org_name">
                        <h1 className="mb-2">Organization name</h1>
                        <TextField
                          className="org-Dashboard-textField"
                          mt={1}
                          disabled
                          id="outlined-basic"
                          value={orgName}
                          size="small"
                          sx={{ width: "auto" }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start" className="pr-2">
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
                            className="org-Dashboard-textField"
                            mt={1}
                            disabled={isDisabled}
                            id="outlined-basic"
                            value={Email}
                            onChange={handleChangeEmail}
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
                            className="org-Dashboard-textField"
                            mt={1}
                            disabled={isDisabled}
                            id="outlined-basic"
                            value={phoneNumber}
                            onChange={handlePhoneChange}
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
                          value={Description}
                          onChange={handleChangeDescription}
                          size="medium"
                          sx={{ width: "100%", maxWidth: "820px" }}
                        />
                      </div>
                      <div className="server_des mb-3">
                        <Button variant="outlined" onClick={handleEditClick}>
                          {isDisabled ? "Update" : "Save Changes"}
                        </Button>
                        {showResetButton && (
                          <Button
                            size="medium"
                            variant="text"
                            onClick={handleEditClick}
                          >
                            <span className="btn-cancel">Cancel</span>
                          </Button>
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
                    >
                      DELETE ORGANIZATION
                    </Button>
                  </div>
                </TabPanel>
              </TabContext>
            </div>
          </div>
        </div>
      </div>
      <ButtonAddServer onClick={handleClickOpen}/>

{/* MODAL ADD SV */}

<Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      {/* <Modal
            keepMounted
            open={addServer}
            onClose={handleClose}
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
                    ADD ORGANIZATION
                  </p>
                  <IconButton onClick={handleClose}>
                    <CloseIcon />
                  </IconButton>
                </div>
              </div>

              <Grid container alignItems="center" spacing={2} mt={0}>
                <Grid item xs={12} md={3}>
                  <Typography
                    className="mt-3"
                    style={{
                      fontSize: "16px",
                      fontWeight: "400",
                    }}
                  >
                    Organization name:
                  </Typography>
                </Grid>
                <Grid item xs={12} md={9}>
                  <FormControl fullWidth variant="outlined">
                    <OutlinedInput
                      inputProps={{
                        "aria-label": "Organization name",
                      }}
                    />
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container alignItems="center" spacing={2} mt={0}>
                <Grid item xs={12} md={3}>
                  <Typography
                    className="mt-3"
                    style={{
                      fontSize: "16px",
                      fontWeight: "400",
                    }}
                  >
                    Phone number:
                  </Typography>
                </Grid>
                <Grid item xs={12} md={9}>
                  <FormControl fullWidth variant="outlined">
                    <OutlinedInput
                      inputProps={{
                        "aria-label": "Phone number",
                      }}
                    />
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container alignItems="center" spacing={2} mt={0}>
                <Grid item xs={12} md={3}>
                  <Typography
                    className="mt-3"
                    style={{
                      fontSize: "16px",
                      fontWeight: "400",
                    }}
                  >
                    Email:
                  </Typography>
                </Grid>
                <Grid item xs={12} md={9}>
                  <FormControl fullWidth variant="outlined">
                    <OutlinedInput
                      inputProps={{
                        "aria-label": "Email",
                      }}
                    />
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container alignItems="center" spacing={2} mt={0}>
                <Grid item xs={12} md={3}>
                  <Typography
                    className="mt-3"
                    style={{
                      fontSize: "16px",
                      fontWeight: "400",
                    }}
                  >
                    Add member:
                  </Typography>
                </Grid>
              </Grid>
              <Grid className="mt-3">
                <Grid item>
                  <Typography
                    className="mt-3"
                    style={{
                      fontSize: "16px",
                      fontWeight: "400",
                    }}
                  >
                    Description:
                  </Typography>
                </Grid>
                <Grid item xs>
                  <FormControl fullWidth variant="outlined">
                    <OutlinedInput
                      className="mt-2"
                      style={{}}
                      multiline
                      rows={4}
                      inputProps={{
                        "aria-label": "Description",
                      }}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Box className="mt-3 d-flex">
                <div>
                  <FormControlLabel
                    control={<Checkbox />}
                    label={
                      <>
                        I accept the{" "}
                        <Link style={{ color: "#5F94D9" }}>
                          Term of Service.
                        </Link>
                      </>
                    }
                  />
                </div>
              </Box>

              <Box>
                <Grid container spacing={2} mt={0}>
                  <Grid item xs={12} md={3}></Grid>
                  <Grid item xs={12} md={3}></Grid>
                  <Grid
                    item
                    xs={12}
                    md={3}
                    className="d-flex justify-content-center align-items-center"
                  >
                    {" "}
                    <Button onClick={handleClose}>
                      <Typography variant="button" style={{ color: "red" }}>
                        Cancel
                      </Typography>{" "}
                    </Button>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={3}
                    className="d-flex justify-content-center align-items-center"
                  >
                    <Button
                      variant="contained"
                      onClick={handleDone}
                      style={{ marginLeft: "10px" }}
                      sx={{
                        width: "120px",
                        height: "auto",
                        color: "white",
                        bgcolor: "#6EC882",
                        "&:hover": { bgcolor: "#5CA36C" },
                        fontSize: "14px",
                        fontWeight: "normal",
                        textTransform: "none",
                      }}
                    >
                      Done
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Modal> */}

      <Footer />
    </>
  );
}
