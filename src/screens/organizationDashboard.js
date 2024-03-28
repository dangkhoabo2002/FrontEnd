import React from "react";
import { useState } from "react";
import { RiServerFill } from "react-icons/ri";
import { useParams } from "react-router-dom";
import organizations from "../database/organizationsData";
import serverIcon2 from "../images/serverIcon2.png";
import "../css/organizationDashboard.css";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import DnsIcon from "@mui/icons-material/Dns";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import ApartmentIcon from "@mui/icons-material/Apartment";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import KeyboardDoubleArrowUpOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowUpOutlined';

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "../css/userOrganization.css";

// import { Container } from 'tailwind-react-ui'
import Empty from "../images/empty.png";
import Footer from "../components/userFooter";
import ButtonAddServer from "./buttonAddServer";
import Sidebar from "../components/Sidebar";

export default function OrganizationDashboard() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [showResetButton, setShowResetButton] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState("+84 34523322");
  const [orgName, setOrgName] = useState("Organization name");
  const [Email, setEmail] = useState("abc@fpt.edu.vn");
  const [Description, setDescription] = useState(
    "Lorem ipsum dolor sit amet, consectetur adip"
  );

  // Điền thông tin vào Input

  const handlePhoneChange = (event) => {
    setPhoneNumber(event.target.value);
  };
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  // Toggle Disabled trong TextField và Editable
  const handleEditClick = () => {
    setIsDisabled(!isDisabled);
    setShowResetButton(isDisabled);
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
            <img loading="lazy"
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
      <div className="px-20" style={{ width: "100%" }}>
        {/* BodyContainer */}
        <div
          className=" py-6 text-center border-stone-200"
          style={{ borderBottom: "1px solid", color: "#D9D9D9", width: "100%" }}
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
                          servers.filter((server) => server.status === "Active")
                            .length
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
                              <img loading="lazy"
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
                          servers.filter((server) => server.status === "Inactive")
                            .length
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
                            <img loading="lazy"
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
                        <tr>
                          <td>{member.id}</td>
                          <td>{member.name}</td>
                          <td>{member.role}</td>
                          <td>
                          <DeleteOutlineOutlinedIcon style={{cursor:"pointer", marginRight:"20px"}}/>
                          <KeyboardDoubleArrowUpOutlinedIcon style={{cursor:"pointer"}}/>
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
            </Box>
          </div>
        </div>
      </div>
    </div>
    <Footer />

    </>
  );
}
