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

import AddIcon from "@mui/icons-material/Add";
import "../css/serverGeneral.css";
import ServerManager from "../database/listOfServerManager.json";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CircularProgress from "@mui/material/CircularProgress";

import handleCheckPass from "../functions/checkPass";

import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function ServerGeneral(serverId) {
  // LOADING
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    handleGetServerData1();
    handleGetServerData2();
  }, []);

  // REFRESH PAGE
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (isRefreshing) {
      window.location.reload();
      setIsRefreshing(false);
      handleGetServerData1();
      handleGetServerData2();
    }
  }, [isRefreshing]);
  // Data General
  const [generalData1, setGeneralData1] = useState();
  const [generalData2, setGeneralData2] = useState();

  const [data, setData] = useState({
    password: "",
  });

  const handleChange = (prop) => (event) => {
    setData({ ...data, [prop]: event.target.value });
  };
  // GET SERVER DATA

  const handleGetServerData1 = async () => {
    setIsLoading(true);
    const getUrl = `http://127.0.0.1:5000/server/get_server_data/${serverId.serverId}`;
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
      } else {
        console.log("Update Fail");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetServerData2 = async () => {
    setIsLoading(true);

    const getUrl = `http://127.0.0.1:5000/server/get_server_info/${serverId.serverId}`;
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
        setIsLoading(false);
        setGeneralData2(server);
      } else {
        console.log("Update Fail");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  //DELETE SERVER
  const { organization_id } = useParams();
  const navigate = useNavigate();
  const handleDeleteServer = async () => {
    const getUrl = `http://127.0.0.1:5000/server/delete/${serverId.serverId}`;
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
        toast.success("Successfully deleted!", {
          style: {
            backgroundColor: "black",
          },
        });
        handleCloseDeleteServer();
        setTimeout(() => {
          navigate(`/organizations/dashboard/${organization_id}`);
        }, 2000);
      } else {
        alert("Delete Fail!");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
    }
  };

  const handleDeleteServerConfirm = async () => {
    const checkPass = await handleCheckPass(data.password);
    if (checkPass === "Success") {
      handleDeleteServer();
    } else {
      alert("Wrong Password");
    }
  };
  // Check pass trước khi Delete
  const [openDeleteServer, setOpenDeleteServer] = React.useState(false);

  const handleOpenDeleteServer = () => {
    setOpenDeleteServer(true);
  };

  const handleCloseDeleteServer = () => {
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
  };
  // const handleTurnStatus = async () => {
  //   const url = `http://127.0.0.1:5000/server/get_server_data/${serverId.serverId}`;
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
  //     } else {
  //       alert("Update Fail");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   } finally {
  //   }
  // };

  // BTN

  // add member

  const [addMember, setAddMember] = React.useState(false);
  const handleAddMeber = () => setAddMember(!addMember);
  const handleClose = () => setAddMember(false);

  const [memberInput, setMemberInput] = useState("");
  const [members, setMembers] = useState([]);

  const handleMemberInputChange = (event) => {
    setMemberInput(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && memberInput.trim() !== "") {
      setMembers([...members, memberInput.trim()]);
      setMemberInput(""); // Reset memberInput after adding member
    }
  };

  const handleMemberDelete = (index) => {
    const updatedMembers = members.filter((_, i) => i !== index); // Filter out the deleted member
    setMembers(updatedMembers);
  };
  const [showConfirmation, setShowConfirmation] = React.useState(false);
  const handleDone = () => {
    setAddMember(false);
    setShowConfirmation(true);
  };

  // console.log(handleCheckPass("123456"));
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

  return (
    <>
      {/* Return Error */}
      <Toaster position="top-center" reverseOrder={false} />
      <div>
        {/* Information */}
        <div className="info-site mb-5">
          <div className="info-title font-semibold my-3">
            <p>Information</p>
          </div>
          <Paper elevation={3} sx={{ padding: 2 }}>
            {isLoading ? (
              <CircularProgress />
            ) : (
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
                    <p>
                      {isLoading && <CircularProgress />}
                      {generalData2?.Operating_System}
                    </p>
                  </div>
                  <div className="flex d-flex my-2">
                    <p className="blue-text font-semibold mr-2">Port: </p>
                    <p>
                      {isLoading && <CircularProgress />}
                      {generalData1?.port}
                    </p>
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
                    <p className="link-text">
                      {generalData2?.script_directory}{" "}
                    </p>
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
            )}

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

          <button
            onClick={handleAddMeber}
            className="bg-transparent hover:bg-[#3867A5] text-[#3867A5] font-semibold hover:text-white  border border-[#3867A5] hover:border-transparent rounded px-8 py-1"
          >
            Add member
          </button>

          <div className=" bg-white">
            {/*-------------- Account Table ---------------- */}
            <div className="bg-[#F3F8FF] mt-4 rounded-md px-8 pb-8 shadow-md">
              <table className="table-auto w-full ">
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
                        <DeleteOutlineOutlinedIcon
                          style={{ cursor: "pointer" }}
                        />
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
        <div className="setting-site mb-5">
          <div className="info-title font-semibold my-3">
            <p>Setting</p>
          </div>
          <div className="setting-btn">
            <Button
              onClick={handleOpenDeleteServer}
              variant="contained"
              color="error"
              sx={{ borderRadius: 1, marginRight: 2 }}
            >
              DELETE SERVER
            </Button>
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
                  onChange={handleChange("password")}
                  value={data.password}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDeleteServer}>Cancel</Button>
                <Button onClick={handleDeleteServerConfirm}>Confirm</Button>
              </DialogActions>
            </Dialog>
            <Button
              variant="contained"
              sx={{ borderRadius: 1, marginRight: 2 }}
              onClick={handleOpenChangeStatus}
            >
              {isServerOn ? "Turn off server" : "Turn on server"}
            </Button>
            <Dialog
              open={openChangeStatus}
              onClose={handleCloseChangeStatus}
              PaperProps={{
                component: "form",
                onSubmit: (event) => {
                  event.preventDefault();
                  const formData = new FormData(event.currentTarget);
                  const formJson = Object.fromEntries(formData.entries());
                  const email = formJson.email;
                  handleCloseChangeStatus();
                },
              }}
            >
              <DialogTitle>
                {isServerOn ? "Turn off server" : "Turn on server"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText className="pb-4">
                  Your action is critical impact of server!, please enter your
                  User's Password to continue.
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
                  onChange={handleChange("password")}
                  value={data.password}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseChangeStatus}>Cancel</Button>
                <Button type="submit">Confirm</Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
        {/* End Setting */}
      </div>

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
                  onKeyPress={handleKeyPress} // Added onKeyPress event handler here
                  inputProps={{
                    "aria-label": "Member",
                  }}
                  endAdornment={members.map((member, index) => (
                    <Chip
                      key={index}
                      label={member}
                      onDelete={() => handleMemberDelete(index)}
                      style={{ margin: "5px" }}
                    />
                  ))}
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
                  onClick={handleDone}
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
    </>
  );
}
