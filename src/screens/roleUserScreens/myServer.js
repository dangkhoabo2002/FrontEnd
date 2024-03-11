import React, { useState } from "react";
import { RiServerFill } from "react-icons/ri";
import Empty from "../../images/empty.png";
import Footer from "../../components/userFooter";
import ButtonAddServer from "../buttonAddServer";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { Cancel } from "@mui/icons-material";
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
} from "@mui/material";
import Stack from "@mui/material/Stack";
import { purple } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

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

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
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
    width: 900,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <div className="container px-20">
        <div className=" py-6 text-center border-b-2 border-stone-200">
          <div className="header flex flex-row items-center gap-x-3">
            <ApartmentIcon
              style={{ width: "32px", height: "32px", color: "#637381" }}
            />
            <p
              className="font-semibold"
              style={{ fontSize: "28px", color: "#637381" }}
            >
              ORGANIZATONS
            </p>
          </div>
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
              <div className=" pb-2  text-center border-b-2 border-stone-200">
                <div className="header flex flex-row items-center gap-x-3">
                  <p
                    className="font-semibold"
                    style={{ fontSize: "28px", color: "#637381" }}
                  >
                    ADD ORGANIZATON
                  </p>
                </div>
              </div>

              <Grid container alignItems="center" spacing={2} mt={1}>
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

              <Grid container alignItems="center" spacing={2} mt={1}>
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

              <Grid container alignItems="center" spacing={2} mt={1}>
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

              <Grid container alignItems="center" spacing={2} mt={1}>
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
            </Box>
          </Modal>
        </div>
      </div>
      <Footer />
    </div>
  );
}
