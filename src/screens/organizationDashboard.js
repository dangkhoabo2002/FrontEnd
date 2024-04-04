import React from "react";
import { useState } from "react";
import { RiServerFill } from "react-icons/ri";
import { useParams } from "react-router-dom";

import organizations from "../database/organizationsData";
import serverIcon2 from "../images/serverIcon2.png";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import DnsIcon from "@mui/icons-material/Dns";

import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import AddModeratorIcon from "@mui/icons-material/AddModerator";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import ApartmentIcon from "@mui/icons-material/Apartment";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "../css/organizationDashboard.css";

// import { Container } from 'tailwind-react-ui'
import Empty from "../images/empty.png";
import Footer from "../components/userFooter";
import ButtonAddServer from "./buttonAddServer";
import Sidebar from "../components/Sidebar";

export default function OrganizationDashboard() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [showResetButton, setShowResetButton] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [openAddMember, setOpenAddMember] = React.useState(false);

  const [currentStatus, setCurrentStatus] = useState("");

  const [orgData, setOrgData] = useState();

  const navigate = useNavigate();
  const [data, setData] = useState({
    organization_id: "",
    name: "",
    contact_phone: "",
    contact_email: "",
    description: "",
    status: "",
    remove_username: "",
  });

  const handleChangeInput = (prop) => (event) => {
    setData({ ...data, [prop]: event.target.value });
  };

  // Đổi information của Org trong Setting

  const handleUpdate = async () => {
    const loginUrl = "http://127.0.0.1:5000/org/update_information";
    try {
      const response = await fetch(loginUrl, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          organization_id: data.organization_id,
          name: data.name,
          contact_phone: data.contact_phone,
          contact_email: data.contact_email,
          description: data.description,
        }),
      });
      if (response.status === 200) {
        alert("Update Success");
        // getAll để upd lại data
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
    const loginUrl =
      "http://127.0.0.1:5000/org/get_organization_data/${organization_id}";
    try {
      const response = await fetch(loginUrl, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      if (response.status === 200) {
        alert("Success");
        const orgData = await response.json();
        console.log(orgData);
        setOrgData(orgData);
      } else {
        alert("Update Fail");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
    }
  };

  // Đổi status của Org - Deactivate
  const handleChangeStatus = async () => {
    const newStatus = "";
    if (currentStatus === "ACTIVE") {
      newStatus = "INACTIVE";
    } else {
      newStatus = "ACTIVE";
    }
    const loginUrl = "http://127.0.0.1:5000/org/change_organization_status";
    try {
      const response = await fetch(loginUrl, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          organization_id: data.organization_id,
          status: newStatus,
        }),
      });
      if (response.status === 200) {
        alert("Inactive Success");
        // getAll để upd lại data
      } else {
        alert("Inactive Fail");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
    }
  };

  // Xóa user ra khỏi Org

  const handleRemoveUserAPI = async () => {
    const loginUrl = "http://127.0.0.1:5000/org/remove_user";
    try {
      const response = await fetch(loginUrl, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          organization_id: data.organization_id,
          remove_username: data.remove_username,
        }),
      });
      if (response.status === 200) {
        alert("Remove Success");
        // getAll để upd lại data
      } else {
        alert("Remove Fail");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
    }
  };

  const handleRemoveUser = () => {
    handleRemoveUserAPI();
    handleClose();
  };
  // DELETE ORG - Chưa có API

  const handleDeleteOrg = async () => {
    const loginUrl = "http://127.0.0.1:5000/auth/login";
    try {
      const response = await fetch(loginUrl, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true",
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      });
      if (response.status === 200) {
        navigate("/organizations");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
    }
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
            className=" py-6 text-center border-stone-200"
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

  const { name, membersCount, description, servers, members } =
    selectedOrganization;

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
                            servers.filter(
                              (server) => server.status === "Active"
                            ).length
                          }
                        </p>
                      </div>
                      <Link to={"/server"}>
                        <div className="serverListRow">
                          {servers
                            .filter((server) => server.status == "Active")
                            .map((server) => (
                              <div className="serverCard flex flex-col justify-between items-center">
                                <span
                                  className={`text-white px-6 py-1 ${
                                    server.status == "Inactive"
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
                                  style={{
                                    width: "60px",
                                    objectFit: "contain",
                                  }}
                                />
                                <h2 className="text-[#5F94D9]">
                                  Shared Hosting
                                </h2>
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
                          .filter((server) => server.status == "Inactive")
                          .map((server) => (
                            <div className="serverCard flex flex-col justify-between items-center">
                              <span
                                className={`text-white px-6 py-1 ${
                                  server.status == "Inactive"
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
                            const email = formJson.email;
                            console.log(email);
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
                          />
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleCloseAddMember}>Cancel</Button>
                          <Button type="submit" variant="outlined">
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
                        {members.map((member) => (
                          <tr>
                            <td>{member.id}</td>
                            <td>{member.name}</td>
                            <td>{member.role}</td>
                            <td>
                              <IconButton
                                aria-label="delete"
                                onClick={handleClickOpenRemoveUser}
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
                                  {"Do you want to remove this member?"}
                                </DialogTitle>

                                <DialogActions>
                                  <Button onClick={handleClose}>No</Button>
                                  <Button onClick={handleRemoveUser} autoFocus>
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
                            className="org-Dashboard-textField"
                            mt={1}
                            disabled={isDisabled}
                            id="outlined-basic"
                            onChange={handleChangeInput("name")}
                            value={data.name}
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
                              className="org-Dashboard-textField"
                              mt={1}
                              disabled={isDisabled}
                              id="outlined-basic"
                              onChange={handleChangeInput("contact_email")}
                              value={data.contact_email}
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
                              onChange={handleChangeInput("contact_phone")}
                              value={data.contact_phone}
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
                            value={data.description}
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
                                Save Change{" "}
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
                        DEACTIVE ORGANIZATION
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
                          <Button
                            onClick={handleChangeStatus(currentStatus)}
                            autoFocus
                          >
                            <p className="text-red-600">Yes</p>
                          </Button>
                        </DialogActions>
                      </Dialog>
                      <Button
                        variant="text"
                        color="error"
                        sx={{ borderRadius: 1, marginRight: 2 }}
                      >
                        DELETE ORGANIZATION
                      </Button>
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
