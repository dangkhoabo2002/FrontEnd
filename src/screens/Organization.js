import React, { useEffect, useState } from "react";
import Footer from "../components/userFooter";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import {
  Grid,
  Checkbox,
  Button,
  FormControlLabel,
  Box,
  Typography,
  Modal,
  FormControl,
  OutlinedInput,
  IconButton,
  DialogActions,
  Tooltip,
} from "@mui/material";

import toast, { Toaster } from "react-hot-toast";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

import { styled } from "@mui/material/styles";
import OrganizationCard from "../components/organizationCard";
import "../css/Organization.css";
import axios from "axios";

export default function LandingPage() {
  const [addOrg, setAddOrg] = React.useState(false);
  const handleAdd = () => setAddOrg(!addOrg);
  const handleClose = () => setAddOrg(false);

  const [orgList, setOrgList] = useState();

  const handleShowOrganization = async () => {
    const getUrl = "http://127.0.0.1:5000/org/get";
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(getUrl, {
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
        const orgData = await response.json();
        setOrgList(orgData);
      }
    } catch {
    } finally {
    }
  };

  useEffect(() => {
    handleShowOrganization();
  }, []);

  const [showConfirmation, setShowConfirmation] = React.useState(false);
  const handleDone = () => {
    if (
      data.name === "" ||
      !isValidEmail(data.contact_email) ||
      !isValidPhoneNumber(data.contact_phone)
    ) {
      if (data.name === "") {
        toast.error("Please fill necessary information!", {
          style: {
            border: "1px solid #F85F60",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "red",
            fontWeight: "bolder",
          },
        });
      } else if (data.name.length < 3 || data.name.length > 50) {
        toast.error(
          "Organization name must be between 3 and 50 characters long!",
          {
            style: {
              border: "1px solid #F85F60",
              maxWidth: "900px",
              padding: "16px 24px",
              color: "red",
              fontWeight: "bolder",
            },
          }
        );
      } else if (!isValidPhoneNumber(data.contact_phone)) {
        toast.error("Please enter a valid phone number!", {
          style: {
            border: "1px solid #F85F60",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "red",
            fontWeight: "bolder",
          },
        });
      } else if (!isValidEmail(data.contact_email)) {
        toast.error("Please enter a valid email address!", {
          style: {
            border: "1px solid #F85F60",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "red",
            fontWeight: "bolder",
          },
        });
      }
    } else {
      setAddOrg(false);
      setShowConfirmation(true);
    }
  };

  // ... (other functions remain the same)

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const isValidPhoneNumber = (phoneNumber) => {
    const phoneNumberPattern = /^\d+$/;
    return phoneNumberPattern.test(phoneNumber);
  };

  // change role super user / user
  const handleChangeRoleToSuperuser = async (memberId) => {
    try {
      const response = await axios.post("/change_role_to_superuser", {
        memberId,
      });
    } catch (error) {
      console.error(error);
    }
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

  // Khoa code
  const handleChange = (prop) => (event) => {
    setData({ ...data, [prop]: event.target.value });
  };
  const OrgCard = {};
  const [data, setData] = useState({
    name: "",
    contact_phone: "",
    contact_email: "",
    description: "",
  });
  // const navigate = useNavigate();

  const handleAddOrg = async () => {
    const addUrl = "http://127.0.0.1:5000/org/add";
    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch(addUrl, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true",
        },
        body: JSON.stringify({
          name: data.name,
          contact_phone: data.contact_phone,
          contact_email: data.contact_email,
          description: data.description,
        }),
      });
      if (response.status === 200) {
        handleShowOrganization();
        setData({
          name: "",
          contact_phone: "",
          contact_email: "",
          description: "",
        });
        setShowConfirmation(false);
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
        toast.error("You have used up all the slots!", {
          style: {
            border: "1px solid #F85F60",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "red",
            fontWeight: "bolder",
          },
        });
      } else {
        toast.error("Fail to add organization, please try again later!", {
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

  // GET MEMBER IN ORG
  const handleGetMemberInOrg = async () => {
    const getMemberUrl =
      "http://127.0.0.1:5000/org/get_server_in_organization/${organization_id}";
    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch(getMemberUrl, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true",
        },
        body: JSON.stringify({
          name: data.name,
          contact_phone: data.contact_phone,
          contact_email: data.contact_email,
          description: data.description,
        }),
      });
      if (response.status === 200) {
        alert("Add server success");
        handleShowOrganization();
      } else {
        alert("Add server fail");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
    }
  };

  return (
    <div className="" style={{ backgroundColor: "#f3f3fb", height: "100vh" }}>
      <Toaster position="bottom-right" reverseOrder={false} />

      <div
        className=" py-6 text-center gap-10"
        style={{
          backgroundColor: "white",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="header flex flex-row items-center gap-x-3  px-20">
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
      <div className="container px-20 py-3">
        <div>
          {orgList &&
            orgList.map((organization) => (
              <Link
                to={`dashboard/${organization.organization_id}`}
                key={organization.organization_id}
              >
                <OrganizationCard
                  className="org-card"
                  sx={OrgCard}
                  key={organization.organization_id}
                  id={organization.organization_id}
                  name={organization.name}
                  description={organization.description}
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

              <Grid container alignItems="center" spacing={3} mt={0}>
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
                <Grid item xs={12} md={8}>
                  <FormControl fullWidth variant="outlined">
                    <OutlinedInput
                      inputProps={{
                        "aria-label": "Organization name",
                      }}
                      onChange={handleChange("name")}
                      value={data.name}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={1}>
                  <Tooltip
                    title="Organization name must be between 3 and 50 characters long!"
                    placement="right"
                  >
                    <HelpOutlineIcon
                      style={{
                        fontSize: "20px",
                        fontWeight: "400",
                      }}
                    />
                  </Tooltip>
                </Grid>
              </Grid>

              <Grid container alignItems="center" spacing={3} mt={0}>
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
                <Grid item xs={12} md={8}>
                  <FormControl fullWidth variant="outlined">
                    <OutlinedInput
                      inputProps={{
                        "aria-label": "Phone number",
                      }}
                      onChange={handleChange("contact_phone")}
                      value={data.contact_phone}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={1}>
                  <Tooltip
                    title="Enter the correct phone number."
                    placement="right"
                  >
                    <HelpOutlineIcon
                      style={{
                        fontSize: "20px",
                        fontWeight: "400",
                      }}
                    />
                  </Tooltip>
                </Grid>
              </Grid>

              <Grid container alignItems="center" spacing={3} mt={0}>
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
                <Grid item xs={12} md={8}>
                  <FormControl fullWidth variant="outlined">
                    <OutlinedInput
                      inputProps={{
                        "aria-label": "Email",
                      }}
                      onChange={handleChange("contact_email")}
                      value={data.contact_email}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={1}>
                  <Tooltip
                    title="Enter the correct email, If entered incorrectly, access will not be possible.."
                    placement="right"
                  >
                    <HelpOutlineIcon
                      style={{
                        fontSize: "20px",
                        fontWeight: "400",
                      }}
                    />
                  </Tooltip>
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
                      onChange={handleChange("description")}
                      value={data.description}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Box className="mt-3 d-flex">
                <div className="text-yellow-600">
                  Non-binding information can be changed and you will be
                  responsible for the operations within the organization.
                </div>
              </Box>

              <DialogActions className="mt-5">
                <Button
                  variant="contained"
                  onClick={handleClose}
                  sx={{
                    width: "100px",
                    color: "white",
                    bgcolor: "#F85F60",
                    "&:hover": { bgcolor: "#D45758" },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={handleDone}
                  sx={{
                    width: "100px",
                    color: "white",
                    bgcolor: "#6EC882",
                    "&:hover": { bgcolor: "#63B976" },
                  }}
                >
                  Add
                </Button>
              </DialogActions>
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
                  onClick={handleAddOrg}
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

    </div>
  );
}
