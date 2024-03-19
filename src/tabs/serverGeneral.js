import React, { useState } from "react";
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
  FormControlLabel,
  Checkbox,
  TextField,
  MenuItem,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import "../css/serverGeneral.css";
import ServerManager from "../database/listOfServerManager.json";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

export default function ServerGeneral() {
  // BTN
  const [isServerOn, setIsServerOn] = useState(true);

  const handleButtonClick = () => {
    setIsServerOn((prevState) => !prevState);
  };

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

  const role = [
    {
      value: "1",
      label: "Proxy Manager",
    },
    {
      value: "2",
      label: "Firewall Manager",
    },
    {
      value: "3",
      label: "Docker Manager",
    },
    {
      value: "4",
      label: "Library Manager",
    },
    {
      value: "5",
      label: "Data Manager",
    },
    {
      value: "6",
      label: "Report Manager",
    },
    {
      value: "7",
      label: "Execution Manager",
    },
  ];

  return (
    <>
      <div>
        {/* Information */}
        <div className="info-site mb-5">
          <div className="info-title font-semibold my-3">
            <p>Information</p>
          </div>{" "}
          <Paper elevation={3} sx={{ padding: 2 }}>
            <div className="flex flex-row justify-between px-5">
              {/* left */}
              <div className="flex flex-col justify-start">
                <p className="gray-text font-semibold my-2">
                  hostamyproject.com
                </p>
                <div className="flex d-flex">
                  <p className="blue-text font-semibold mr-2">Host IP: </p>
                  <p> 177.0.74.189</p>
                </div>
                <div className="flex d-flex my-2">
                  <p className="blue-text font-semibold mr-2">
                    Operating System:{" "}
                  </p>
                  <p>Linux</p>
                </div>
                <div className="flex d-flex my-2">
                  <p className="blue-text font-semibold mr-2">Port: </p>
                  <p>3305</p>
                </div>
                <div className="flex d-flex my-2">
                  <p className="blue-text font-semibold mr-2">Version: </p>
                  <p> 8.0.4-rc-log</p>
                </div>
                <div className="flex d-flex my-2">
                  <p className="blue-text font-semibold mr-2">
                    Disk Space in Data Dir:{" "}
                  </p>
                  <p>99.61GB of 162GB</p>
                </div>
                <div className="flex d-flex my-2">
                  <p className="blue-text font-semibold mr-2">
                    Server Directory:{" "}
                  </p>
                  <p className="link-text">
                    C:\ProgramData\MySQL\MySQL Server 8.0
                  </p>
                </div>
              </div>

              {/* right */}
              <div className="flex flex-col  items-end">
                <div className="flex ">
                  <p className="blue-text font-semibold mr-2">
                    Configuration File:{" "}
                  </p>
                  <p className="link-text">
                    C:\ProgramData\MySQL\MySQL Server 8.0\my.ini
                  </p>
                </div>
                <div className="flex d-flex my-2">
                  <p className="blue-text font-semibold mr-2">RAM: </p>
                  <p>8GB</p>
                </div>
                <div className="flex d-flex my-2">
                  <p className="blue-text font-semibold mr-2">CPU: </p>
                  <p>46%</p>
                </div>
                <div className="flex d-flex my-2">
                  <p className="blue-text font-semibold mr-2">
                    Running Since:{" "}
                  </p>
                  <p>Thu Apr 5 14:13:18 2020</p>
                </div>
              </div>
            </div>
            <div className="px-5 mb-2 flex flex-col items-end">
              <Button
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
            class="bg-transparent hover:bg-[#3867A5] text-[#3867A5] font-semibold hover:text-white  border border-[#3867A5] hover:border-transparent rounded px-8 py-1"
          >
            Add member
          </button>

          <div className=" bg-white">
            {/*-------------- Account Table ---------------- */}
            <div className="bg-[#F3F8FF] mt-4 rounded-md px-8 pb-8 shadow-md">
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
                    <tr>
                      <td>{svmg.id}</td>
                      <td>{svmg.email}</td>
                      <td>{svmg.role}</td>
                      <td>Delete</td>
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
              variant="contained"
              color="error"
              sx={{ borderRadius: 1, marginRight: 2 }}
            >
              DELETE SERVER
            </Button>

            <Button
              variant="contained"
              sx={{ borderRadius: 1, marginRight: 2 }}
              onClick={handleButtonClick}
            >
              {isServerOn ? "Turn off server" : "Turn on server"}
            </Button>
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

          <div
            className="mt-3"
            style={{ fontSize: "18px", fontWeight: "bold" }}
          >
            <p>Add role</p>
          </div>

          <Grid container alignItems="center" spacing={2} mb={3}>
            <Grid item xs={12} md={3}>
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
            <Grid item xs={12} md={9}>
              <TextField
                fullWidth
                id="outlined-select-currency"
                select
                label=""
                defaultValue="1"
              >
                {role.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
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
          >
            Add more role
          </Button>

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
