import React from "react";
import { RiServerFill } from "react-icons/ri";
import Empty from "../../images/empty.png";
import Footer from "../../components/userFooter";
import ButtonAddServer from "../buttonAddServer";
import ApartmentIcon from "@mui/icons-material/Apartment";
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
} from "@mui/material";
import Stack from "@mui/material/Stack";
import { purple } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

export default function LandingPage() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  const [addOrg, setAddOrg] = React.useState(false);
  const handleAdd = () => setAddOrg(!addOrg); // Toggle addOrg state
  const handleClose = () => setAddOrg(false); // Close modal

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
        {/* 
        <div class="mb-3">
          <div class="relative mb-4 flex w-full flex-wrap items-stretch">
            <input
              type="search"
              class="relative m-0 block min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-addon2"
            />

            <span
              class="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
              id="basic-addon2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="h-5 w-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </div>
        </div> */}
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
                <Grid item>
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
                <Grid item xs>
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
                <Grid item>
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
                <Grid item xs>
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
                <Grid item>
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
                <Grid item xs>
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
                <Grid item>
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
                <Grid item xs>
                  <FormControl fullWidth variant="outlined">
                    <OutlinedInput
                      inputProps={{
                        "aria-label": "Member",
                      }}
                    />
                  </FormControl>
                </Grid>
              </Grid>

            </Box>
          </Modal>
        </div>

        {/* <div className="flex flex-row">
          <p>Active Servers</p>
          <div>
            <p>3</p>
          </div>
        </div>

        <div className="flex flex-row">
          <p>Inactive Servers</p>
          <div>
            <p>3</p>
          </div>
        </div> */}
      </div>
      {/* <ButtonAddServer onClick={handleOpen} /> */}
      <Footer />
    </div>
  );
}
