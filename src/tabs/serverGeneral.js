import React, { useState, useEffect } from "react";
import {
  Paper,
  Grid,
  Button,
  Modal,
  Box,
  FormControl,
  OutlinedInput,
  IconButton,
  Typography,
  Chip,
  TextField,
  MenuItem,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import RefreshIcon from "@mui/icons-material/Refresh";
import LinearProgress from "@mui/material/LinearProgress";
import DeleteIcon from "@mui/icons-material/Delete";
import Fingerprint from "@mui/icons-material/Fingerprint";

import "../css/serverGeneral.css";
import ServerManager from "../database/listOfServerManager.json";
import CloseIcon from "@mui/icons-material/Close";

import handleCheckPass from "../functions/checkPass";

import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function ServerGeneral(serverId) {
  // LOADING

  useEffect(() => {
    handleGetServerData1();
    handleGetServerData2();
    handleGetMember();
  }, []);

  // REFRESH PAGE
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isRefreshing) {
      setLoading(true);
      handleGetServerData1();
      handleGetServerData2();
      setIsRefreshing(false);
    }
  }, [isRefreshing]);
  // Data General
  const [generalData1, setGeneralData1] = useState();
  const [generalData2, setGeneralData2] = useState();

  const [password, setPassword] = useState();

  const handleChange = (event) => {
    setPassword(event.target.value);
  };

  // GET SERVER DATA

  const handleGetServerData1 = async () => {
    const getUrl = `https://master-help-desk-back-end.vercel.app/server/get_server_data/${serverId.serverId}`;
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
        const server = await response.json();
        setGeneralData1(server);
      } else if (response.status === 400) {
        toast.error("Server is not defined!", {
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
      } else if (response.status === 404) {
        toast.error("Server not found!", {
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

  const handleGetServerData2 = async () => {
    const getUrl = `https://master-help-desk-back-end.vercel.app/server/get_server_info/${serverId.serverId}`;
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
        const server = await response.json();
        setGeneralData2(server);
      } else if (response.status === 400) {
        toast.error("Server is not defined!", {
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
      } else if (response.status === 500) {
        toast.error("No data for server!", {
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
      setLoading(false);
    }
  };

  //DELETE SERVER
  const { organization_id } = useParams();
  const navigate = useNavigate();
  const handleDeleteServer = async () => {
<<<<<<< HEAD
    const getUrl = `https://master-help-desk-back-end.vercel.app/server/delete/${serverId.serverId}`;
=======
    toast.loading("Deleting...");
    const getUrl = `http://127.0.0.1:5000/server/delete/${serverId.serverId}`;
>>>>>>> mergeBranch
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(getUrl, {
        method: "DELETE",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      if (response.status === 200) {
        toast.dismiss();
        toast.success("Server deleted successfully.", {
          style: {
            border: "1px solid #37E030",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "green",
            fontWeight: "bolder",
          },
        });
        handleCloseDeleteServer();
        setTimeout(() => {
          navigate(`/organizations/dashboard/${organization_id}`);
        }, 2000);
      } else if (response.status === 403) {
        toast.dismiss();
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
        toast.dismiss();

        toast.error("Failed to delete server!", {
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
      setLoading(false);
    }
  };

  const handleDeleteServerConfirm = async () => {
    const checkPass = await handleCheckPass(password);
    if (checkPass === "Success") {
      handleDeleteServer();
      setPassword("");
    }
  };
  // Check pass trước khi Delete
  const [openDeleteServer, setOpenDeleteServer] = useState(false);

  const handleOpenDeleteServer = () => {
    setOpenDeleteServer(true);
  };

  const handleCloseDeleteServer = () => {
    setPassword("");
    setOpenDeleteServer(false);
  };

  const [isServerOn, setIsServerOn] = useState(true);

  const handleButtonClick = () => {
    setIsServerOn((prevState) => !prevState);
  };

  const [openChangeStatus, setOpenChangeStatus] = React.useState(false);
  const handleOpenChangeStatus = () => {
    setOpenChangeStatus(true);
  };

  const handleCloseChangeStatus = () => {
    setOpenChangeStatus(false);
    setPassword("");
  };

  const handleChangeStatusConfirm = async () => {
    const check = await handleCheckPass(password);
    if (check === "Success") {
      // handleTurnStatus();
      // setPassword((password = ""));
    }
  };

  // const handleTurnStatus = async () => {
  //   const url = `https://master-help-desk-back-end.vercel.app/server/get_server_data/${serverId.serverId}`;
  //   const token = localStorage.getItem("access_token");
  //   try {
  //     const response = await fetch(url, {
  //       method: "PUT",
  //       credentials: "include",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Origin": "*",
  //       },
  //     });
  //     if (response.status === 200) {
  //       const server = await response.json();
  //       handleButtonClick();
  //       handleCloseChangeStatus();
  //     } else {
  //       alert("Update Fail");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   } finally {
  //   }
  // };

  // BTN

  // GET MEMBER IN SERVER

  const [memberList, setMemberList] = useState();
  const handleGetMember = async () => {
    const url = `https://master-help-desk-back-end.vercel.app/server/get_server_members/${serverId.serverId}`;
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      if (response.status === 200) {
        const memberServer = await response.json();
        setMemberList(memberServer);
      } else if (response.status === 400) {
        toast.error("Can not found server!", {
          style: {
            border: "1px solid #F85F60",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "red",
            fontWeight: "bolder",
          },
        });
      } else if (response.status === 403) {
        toast.error("Server not found or there is no member in server!", {
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

  // add member

  const [memberInput, setMemberInput] = useState("");
  const [members, setMembers] = useState([]);

  const handleMemberInputChange = (event) => {
    setMemberInput(event.target.value);
  };

  const [addMember, setAddMember] = React.useState(false);
  const handleAddMeber = () => setAddMember(!addMember);
  const handleClose = () => {
    setMemberInput("");
    setAddMember(false);
  };

  const handleAddMember = async () => {
    if (memberInput === "") {
      toast.error(
        "Please enter the username of the member you want to add first!",
        {
          style: {
            border: "1px solid #FF5733",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "red",
            fontWeight: "bolder",
          },
        }
      );
    } else {
<<<<<<< HEAD
      const url = `https://master-help-desk-back-end.vercel.app/server/add_member`;
=======
      toast.loading("Adding new member...");
      const url = `http://127.0.0.1:5000/server/add_member`;
>>>>>>> mergeBranch
      const token = localStorage.getItem("access_token");
      try {
        const response = await fetch(url, {
          method: "PUT",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            server_id: serverId.serverId,
            new_user: memberInput,
          }),
        });
        if (response.status === 200) {
          toast.dismiss();
          toast.success("New member successfully joined.", {
            style: {
              border: "1px solid #37E030",
              maxWidth: "900px",
              padding: "16px 24px",
              color: "green",
              fontWeight: "bolder",
            },
          });
          handleGetMember();
          setMemberInput("");
          setAddMember(false);
        } else if (response.status === 400) {
          toast.dismiss();

          toast.error("This user does not exist!", {
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
          toast.dismiss();

          toast.error("This user is already a member of server!", {
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

  const handleMemberDelete = (index) => {
    const updatedMembers = members.filter((_, i) => i !== index); // Filter out the deleted member
    setMembers(updatedMembers);
  };

  // REMOVE MEMBER IN SERVER

  const [removeMem, setRemoveMem] = useState();

  const [openRemove, setOpenRemove] = useState();

  const handleOpenRemove = () => {
    setOpenRemove(true);
  };

  const handleCloseRemove = () => {
    setRemoveMem("");
    setOpenRemove(false);
  };

  const handleRemoveMember = async () => {
    if (removeMem === "") {
      toast.error("Please choose the member to delete!", {
        style: {
          border: "1px solid #FF5733",
          maxWidth: "900px",
          padding: "16px 24px",
          color: "red",
          fontWeight: "bolder",
        },
      });
    } else {
<<<<<<< HEAD
      const url = `https://master-help-desk-back-end.vercel.app/server/remove_member`;
=======
      toast.loading("Removing member...");
      const url = `http://127.0.0.1:5000/server/remove_member`;
>>>>>>> mergeBranch
      const token = localStorage.getItem("access_token");
      try {
        const response = await fetch(url, {
          method: "PUT",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            server_id: serverId.serverId,
            remove_username: removeMem,
          }),
        });
        if (response.status === 200) {
          toast.dismiss();

          toast.success("Member removed sucessfully.", {
            style: {
              border: "1px solid #37E030",
              maxWidth: "900px",
              padding: "16px 24px",
              color: "green",
              fontWeight: "bolder",
            },
          });
          handleGetMember();
          setRemoveMem("");
        } else if (response.status === 400) {
          toast.dismiss();

          toast.error("This user does not exist!", {
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
          toast.dismiss();

          toast.error("This user is already a member of server!", {
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
              border: "1px solid #FF5733",
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
  // CSS
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

  // POP UP DELETE DIALOG

  const [openCheckPassRsa, setOpenCheckPassRsa] = useState(false);
  const [openNewRsa, setOpenNewRsa] = useState(false);
  const [newRsa, setNewRsa] = useState();

  const handleChangeNewRsa = (event) => {
    setNewRsa(event.target.value);
  };

  const handleCloseCheckPassRsa = () => {
    setPassword("");
    setNewRsa("");
    setOpenCheckPassRsa(false);
  };

  const handleOpenUpdateRsa = async () => {
    const checkPass = await handleCheckPass(password);
    if (checkPass === "Success") {
      setOpenCheckPassRsa(false);
      setOpenNewRsa(true);
      setPassword("");
    }
  };

  const handleCloseUpdateRsa = async () => {
    setPassword("");
    setNewRsa("");
    setOpenNewRsa(false);
  };

  const handleUpdateRsa = async () => {
    handleUpdateRsaAPI();
    setOpenNewRsa(false);
  };

  const handleUpdateRsaAPI = async () => {
<<<<<<< HEAD
    const getUrl = `https://master-help-desk-back-end.vercel.app/server/update_rsa_key/${serverId.serverId}`;
=======
    toast.loading("Updating...");
    const getUrl = `http://127.0.0.1:5000/server/update_rsa_key/${serverId.serverId}`;
>>>>>>> mergeBranch
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(getUrl, {
        method: "PUT",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          rsa_key: newRsa,
        }),
      });
      if (response.status === 200) {
        toast.dismiss();

        toast.success("Server's RSA Key is updated successfully.", {
          style: {
            border: "1px solid #37E030",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "green",
            fontWeight: "bolder",
          },
        });
        handleCloseCheckPassRsa();
      } else if (response.status === 400) {
        toast.dismiss();

        const error = await response.json();
        if (error.message === "Server is not indentified yet!") {
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
          toast.error("Missing new RSA key!", {
            style: {
              border: "1px solid #F85F60",
              maxWidth: "900px",
              padding: "16px 24px",
              color: "red",
              fontWeight: "bolder",
            },
          });
        }
      } else if (response.status === 403) {
        toast.dismiss();

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
        toast.dismiss();

        toast.error("Failed to update RSA Key!", {
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
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Return Error */}
      <Toaster position="bottom-right" reverseOrder={false} />
      <div>
        {/* Information */}
        <div className="info-site mb-3">
          <div className="info-title font-semibold pb-3">
            <p>Information</p>
          </div>
          {loading && (
            <Box sx={{ width: "100%", paddingBottom: "22px" }}>
              <LinearProgress />
            </Box>
          )}
          <Paper elevation={3} sx={{ padding: 2 }}>
            <div className="flex flex-row justify-between px-5">
              {/* left */}
              <div className="flex flex-col justify-start">
                <div className="flex d-flex">
                  <p className="blue-text font-semibold mr-2">Host IP: </p>
                  <p>{generalData1?.hostname}</p>
                </div>
                <div className="flex d-flex my-2">
                  <p className="blue-text font-semibold mr-2">
                    Operating System:
                  </p>
                  <p>{generalData2?.Operating_System}</p>
                </div>
                <div className="flex d-flex my-2">
                  <p className="blue-text font-semibold mr-2">Port: </p>
                  <p>{generalData1?.port}</p>
                </div>
                <div className="flex d-flex my-2">
                  <p className="blue-text font-semibold mr-2">Version: </p>
                  <p>{generalData2?.Version}</p>
                </div>
                <div className="flex d-flex my-2">
                  <p className="blue-text font-semibold mr-2">
                    Disk Space in Data Dir:
                  </p>
                  <p>{generalData2?.Disk_Space}</p>
                </div>
                <div className="flex d-flex my-2">
                  <p className="blue-text font-semibold mr-2">
                    Server Directory:
                  </p>
                  <p className="link-text">{generalData2?.script_directory} </p>
                </div>
              </div>

              {/* right */}
              <div className="flex flex-col  items-end">
                <div className="flex d-flex my-2">
                  <p className="blue-text font-semibold mr-2">RAM: </p>
                  <p>{generalData2?.RAM}</p>
                </div>
                <div className="flex d-flex my-2">
                  <p className="blue-text font-semibold mr-2">CPU: </p>
                  <p>{generalData2?.CPU}</p>
                </div>
                <div className="flex d-flex my-2">
                  <p className="blue-text font-semibold mr-2">
                    Authen key time:
                  </p>
                  <p>{generalData1?.authen_key_time}</p>
                </div>
                <div className="flex d-flex my-2">
                  <p className="blue-text font-semibold mr-2">Last Seen:</p>
                  <p>{generalData2?.last_seen}</p>
                </div>
              </div>
            </div>
            <div className="px-5 mb-2 flex flex-col items-end">
              <Button
                onClick={() => setIsRefreshing(true)}
                startIcon={<RefreshIcon />}
                variant="contained"
                className="refreshBtn"
                sx={{ marginTop: 2 }}
              >
                REFRESH
              </Button>
            </div>
          </Paper>
        </div>
        {/* End Information */}

        {/* Member */}
        <div className="member-site mb-5">
          <div className="info-title font-semibold my-3">
            <p>Member</p>
          </div>

          <Button
            variant="outlined"
            onClick={handleAddMeber}
            className="bg-transparent hover:bg-[#3867A5] text-[#3867A5] font-semibold hover:text-white  border border-[#3867A5] hover:border-transparent rounded px-8 py-1"
            sx={{
              color: "white",
              bgcolor: "#3867A5",
              "&:hover": { bgcolor: "#2A4D7B" },
            }}
          >
            Add member
          </Button>

          <div className=" bg-white">
            {/*-------------- Account Table ---------------- */}
            <div
              className="bg-[white] mt-4 rounded-md px-8 pb-8 shadow-lg"
              style={{ border: "1px solid #89A6CC" }}
            >
              <table class="table-auto w-full ">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Email</th>
                    <th>ROLE</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      style={{
                        color: "transparent",
                        padding: "0px",
                      }}
                    >
                      .
                    </td>
                  </tr>
                  {ServerManager.map((svmg) => (
                    <tr key={svmg.id}>
                      <td>{svmg.id}</td>
                      <td>{svmg.email}</td>
                      <td>{svmg.role}</td>
                      <td>
                        <IconButton
                          aria-label="delete"
                          onClick={handleOpenRemove}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/*-------------- END OF Account Table ---------------- */}
            </div>
          </div>
        </div>
        {/* End Member */}

        {/* Setting */}
        <div className="info-title font-semibold my-3">
          <p>Setting</p>
        </div>
        <div className="setting-site mb-5 flex flex-row justify-between">
          <div>
            <Button
              variant="outlined"
              startIcon={<Fingerprint />}
              onClick={() => setOpenCheckPassRsa(true)}
            >
              RSA KEY
            </Button>
          </div>
          <div>
            <div className="setting-btn">
              <Button
                onClick={handleOpenDeleteServer}
                variant="contained"
                color="error"
                sx={{ borderRadius: 1, marginRight: 2 }}
              >
                DELETE SERVER
              </Button>

              <Button
                variant="contained"
                sx={{
                  borderRadius: 1,
                  marginRight: 2,
                  bgcolor: isServerOn ? "#6EC882" : "#8E8E8E",
                  "&:hover": {
                    bgcolor: isServerOn ? "#60A670" : "#646464",
                  },
                }}
                onClick={handleOpenChangeStatus}
              >
                {isServerOn ? "Turn off server" : "Turn on server"}
              </Button>
              <Dialog open={openChangeStatus} onClose={handleCloseChangeStatus}>
                <DialogTitle>
                  {isServerOn ? "Turn off server" : "Turn on server"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText className="pb-4">
                    Your action is critical impact! Please enter your password
                    to continue.
                  </DialogContentText>
                  <TextField
                    required
                    margin="dense"
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    onChange={handleChange}
                    value={password}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseChangeStatus}>Cancel</Button>
                  <Button onClick={handleChangeStatusConfirm}>Confirm</Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        </div>
        {/* End Setting */}
      </div>

      {/* DELETE CONFIRMATION */}
      <Dialog
        open={openDeleteServer}
        onClose={handleCloseDeleteServer}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            handleClose();
          },
        }}
      >
        <DialogTitle>Delete Server</DialogTitle>
        <DialogContent>
          <DialogContentText className="pb-4">
            Your action is critical impact! Please enter your password to
            continue.
          </DialogContentText>
          <TextField
            required
            margin="dense"
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            onChange={handleChange}
            value={password}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteServer}>Cancel</Button>
          <Button onClick={handleDeleteServerConfirm}>Confirm</Button>
        </DialogActions>
      </Dialog>

      {/* Modal add member */}
      <Modal
        open={addMember}
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
                ADD MEMBER
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
                Add member:
              </Typography>
            </Grid>
            <Grid item xs={12} md={9}>
              <FormControl fullWidth variant="outlined">
                <OutlinedInput
                  value={memberInput}
                  onChange={handleMemberInputChange}
                  inputProps={{
                    "aria-label": "Member",
                  }}
                />
              </FormControl>
            </Grid>
          </Grid>

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
                <Button onClick={handleClose}>
                  <Typography variant="button" style={{ color: "red" }}>
                    Cancel
                  </Typography>
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
                  onClick={handleAddMember}
                  sx={{
                    width: "100px",
                    color: "white",
                    bgcolor: "#6EC882",
                    "&:hover": { bgcolor: "darkgreen" },
                  }}
                >
                  Done
                </Button>
              </Grid>
            </Grid>
          </Box>
          {/* End modal */}
        </Box>
      </Modal>

      {/* Dialog remove member alert */}

      <Dialog
        open={openRemove}
        onClose={handleCloseRemove}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want to remove this member?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            They will no longer have access to the server or configure its
            features.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRemove}>Disagree</Button>
          <Button onClick={handleRemoveMember}>Agree</Button>
        </DialogActions>
      </Dialog>

      {/* RSA CONFIRM */}
      <Dialog open={openCheckPassRsa} onClose={handleCloseCheckPassRsa}>
        <DialogTitle>Update RSA key</DialogTitle>
        <DialogContent>
          <DialogContentText className="pb-4">
            Your action is critical impact! Please enter your password to
            continue.
          </DialogContentText>
          <TextField
            required
            margin="dense"
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            onChange={handleChange}
            value={password}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCheckPassRsa}>Cancel</Button>
          <Button onClick={handleOpenUpdateRsa}>Confirm</Button>
        </DialogActions>
      </Dialog>

      {/* RSA UPDATE INPUT */}
      <Dialog open={openNewRsa} onClose={handleCloseUpdateRsa}>
        <DialogTitle>Set new RSA key!</DialogTitle>
        <DialogContent>
          <DialogContentText className="pb-4">
            Your action is critical impact! Input new rsa key here.
          </DialogContentText>
          <TextField
            required
            margin="dense"
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            onChange={handleChangeNewRsa}
            value={newRsa}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdateRsa}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
