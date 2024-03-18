import React, { useState } from "react";
import { RiServerFill } from "react-icons/ri";
import Empty from "../images/empty.png";
import Footer from "../components/userFooter";
import ButtonAddServer from "./buttonAddServer";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { Cancel } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  Grid,
  Checkbox,
  Button,
  TextField,
  FormControlLabel,
  Box,
  Item,
  Typography,
  Modal,
  FormControl,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
  Chip,
  IconButton,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import { purple } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import OrganizationCard from "../components/organizationCard";
import organizationsData from "../database/organizationsData.json";
import "./Organization.css";

export default function LandingPage() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  const [addOrg, setAddOrg] = React.useState(false);
  const handleAdd = () => setAddOrg(!addOrg);
  const handleClose = () => setAddOrg(false);

  const [memberInput, setMemberInput] = useState("");
  const [members, setMembers] = useState([]);

  const handleMemberInputChange = (event) => {
    setMemberInput(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && memberInput.trim() !== "") {
      setMembers([...members, memberInput.trim()]);
      setMemberInput("");
    }
  };

  const handleMemberDelete = (index) => {
    const updatedMembers = [...members];
    updatedMembers.splice(index, 1);
    setMembers(updatedMembers);
  };

  const [showConfirmation, setShowConfirmation] = React.useState(false);
  const handleDone = () => {
    setAddOrg(false);
    setShowConfirmation(true);
  };

  // css

  const ColorButton = styled(Button)(({ theme }) => ({
    backgroundColor: "#E6E6E6",
    color: "#637381",
    fontSize: "24px",
    width: "100%",
    height: "200px",
    "&:hover": {
      backgroundColor: "#D2D2D2",
    },
  }));

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

  const OrgCard = {};

  return (
    <div>
      <div className="container px-20">
        <div className=" py-6 text-center border-b-2 border-stone-200 gap-10">
          <div className="header flex flex-row items-center gap-x-3">
            <ApartmentIcon
              style={{ width: "32px", height: "32px", color: "#637381" }}
            />
            <p
              className="font-semibold"
              style={{ fontSize: "28px", color: "#637381" }}
            >
              Organizations
            </p>
          </div>
        </div>

        <div className="mt-3 ">
          {organizationsData.map((organization) => (
            <Link to={`dashboard/${organization.id}`} key={organization.id}>
              <OrganizationCard
                className="org-card"
                sx={OrgCard}
                key={organization.id}
                name={organization.name}
                membersCount={organization.membersCount}
                description={organization.description}
                servers={organization.servers}
              />
            </Link>
          ))}
        </div>

        <div className="mt-3">
          <ColorButton onClick={handleAdd} variant="contained">
            +
          </ColorButton>

          <Modal
            keepMounted
            open={addOrg}
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
            </Box>
          </Modal>

          <Modal
            keepMounted
            open={showConfirmation}
            onClose={() => setShowConfirmation(false)}
            aria-labelledby="confirmation-modal-title"
            aria-describedby="confirmation-modal-description"
          >
            <Box sx={{ ...style, bgcolor: "white", borderRadius: "16px" }}>
              <Typography
                id="confirmation-modal-title"
                variant="h6"
                component="h2"
                sx={{ fontWeight: "bold", mb: 2 }}
              >
                Confirmation!
              </Typography>
              <Typography id="confirmation-modal-description" sx={{ mb: 2 }}>
                Are you sure you want to create organization?
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "10px",
                }}
              >
                <Button
                  onClick={() => setShowConfirmation(false)}
                  sx={{
                    width: "100px",
                    color: "white",
                    bgcolor: "#F85F60",
                    "&:hover": { bgcolor: "darkred" },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {}}
                  sx={{
                    width: "100px",
                    color: "white",
                    bgcolor: "#6EC882",
                    "&:hover": { bgcolor: "darkgreen" },
                  }}
                >
                  Confirm
                </Button>
              </Box>
            </Box>
          </Modal>
        </div>
      </div>
      <Footer />
    </div>
  );
}
