import React, { useState, useEffect } from "react";
import SidebarAdmin from "../components/sidebarAdmin";
import NavigationAdmin from "../components/navAdmin";
import { Link } from "react-router-dom";

import {
  Grid,
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  DialogTitle,
  DialogActions,
  IconButton,
  FormControl,
  OutlinedInput,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

// ICONS MUI

import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import toast, { Toaster } from "react-hot-toast";

export default function AdminGuide() {
  const [guideData, setGuideData] = useState([]);
  const [open, setOpen] = useState(false);
  const [guideAdd, setGuideAdd] = useState({ title: "", content: "" });

  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [currentEditGuide, setCurrentEditGuide] = useState({
    title: "",
    content: "",
  });

  const [currentGuide, setCurrentGuide] = useState("");

  // EDIT GUIDE
  const handleClickOpenEditGuide = (id) => {
    setCurrentGuide(id);
    setOpenEdit(true);
  };
  const handleCloseEditGuide = () => {
    setCurrentEditGuide({ title: "", content: "" });
    setOpenEdit(false);
  };

  const handleChangeEditGuide = (prop) => (event) => {
    setCurrentEditGuide({ ...currentEditGuide, [prop]: event.target.value });
  };

  const handleEditGuide = async () => {
    if (currentGuide) {
      const editUrl = `http://127.0.0.1:5000/guide/update/${currentGuide}`;
      const token = localStorage.getItem("access_token");

      try {
        const response = await fetch(editUrl, {
          method: "PUT",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
          },
          body: JSON.stringify({
            title: currentEditGuide.title,
            content: currentEditGuide.content,
          }),
        });
        if (response.status === 200) {
          toast.success("Update guide successfully!", {
            style: {
              border: "1px solid #37E030",
              maxWidth: "900px",
              padding: "16px 24px",
              color: "green",
              fontWeight: "bolder",
            },
          });
          handleGetGuide();
          setCurrentEditGuide({ title: "", content: "" });
          handleCloseEditGuide();
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
        } else if (response.status === 400) {
          toast.error("Guide is not selected!", {
            style: {
              border: "1px solid #F85F60",
              maxWidth: "900px",
              padding: "16px 24px",
              color: "red",
              fontWeight: "bolder",
            },
          });
        } else if (response.status === 500) {
          toast.error("Failed to update, please try again later!", {
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
    } else {
      toast.error("Please select a guide!", {
        style: {
          border: "1px solid #F85F60",
          maxWidth: "900px",
          padding: "16px 24px",
          color: "red",
          fontWeight: "bolder",
        },
      });
    }
  };

  // DELETE GUIDE
  const handleDeleteGuide = async () => {
    if (currentGuide) {
      const deleteUrl = `http://127.0.0.1:5000/guide/delete/${currentGuide}`;
      const token = localStorage.getItem("access_token");

      try {
        const response = await fetch(deleteUrl, {
          method: "DELETE",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
          },
        });
        if (response.status === 200) {
          toast.success("Delete guide successfully.", {
            style: {
              border: "1px solid #37E030",
              maxWidth: "900px",
              padding: "16px 24px",
              color: "green",
              fontWeight: "bolder",
            },
          });
          handleGetGuide();
          setCurrentGuide("");
          handleCloseDelete();
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
        } else if (response.status === 400) {
          toast.error("Guide is not selected!", {
            style: {
              border: "1px solid #F85F60",
              maxWidth: "900px",
              padding: "16px 24px",
              color: "red",
              fontWeight: "bolder",
            },
          });
        } else if (response.status === 500) {
          toast.error("Failed to update, please try again later!", {
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
    } else {
      toast.error("Please select a guide!", {
        style: {
          border: "1px solid #F85F60",
          maxWidth: "900px",
          padding: "16px 24px",
          color: "red",
          fontWeight: "bolder",
        },
      });
    }
  };

  const handleClickOpenRemoveGuide = (id) => {
    setCurrentGuide(id);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  // GET GUIDE
  const handleGetGuide = async () => {
    const guideUrl = `http://127.0.0.1:5000/guide/get`;
    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch(guideUrl, {
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
        const data = await response.json();
        setGuideData(data);
      } else {
        console.error("Failed to fetch guide data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    handleGetGuide();
  }, []);

  // ADD GUIDE

  const handleOpenAddGuide = () => {
    setOpen(true);
  };

  const handleCloseAddGuide = () => {
    setOpen(false);
  };

  const handleClose = () => {
    setOpenDelete(false);
  };

  const handleAddGuide = async () => {
    if (guideAdd.title === "" || guideAdd.content === "") {
      toast.error("Please input both title & content!", {
        style: {
          border: "1px solid #F85F60",
          maxWidth: "900px",
          padding: "16px 24px",
          color: "red",
          fontWeight: "bolder",
        },
      });
    } else {
      const addUrl = "http://127.0.0.1:5000/guide/add";
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
            title: guideAdd.title,
            content: guideAdd.content,
          }),
        });
        if (response.status === 201) {
          handleGetGuide();
          toast.success("Add guide successfully.", {
            style: {
              border: "1px solid #37E030",
              maxWidth: "900px",
              padding: "16px 24px",
              color: "green",
              fontWeight: "bolder",
            },
          });
          handleCloseAddGuide();
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
        } else if (response.status === 400) {
          toast.error("Missing required field!", {
            style: {
              border: "1px solid #F85F60",
              maxWidth: "900px",
              padding: "16px 24px",
              color: "red",
              fontWeight: "bolder",
            },
          });
        } else if (response.status === 500) {
          toast.error("Fail to add guide!", {
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

  // EDIT GUIDE

  const handleChange = (prop) => (event) => {
    setGuideAdd({ ...guideAdd, [prop]: event.target.value });
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

  return (
    <div className="">
      <NavigationAdmin />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "0fr 3fr",
          height: "100%",
        }}
      >
        <Toaster position="bottom-right" reverseOrder={false} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "90vh",
          }}
        >
          <SidebarAdmin />
        </div>
        <div className="px-12 py-6 bg-[#F3F8FF]">
          <div className="flex flex-row gap-10">
            <Button
              onClick={handleOpenAddGuide}
              variant="outlined"
              sx={{
                width: "120px",
                color: "white",
                bgcolor: "#3867A5",
                "&:hover": { bgcolor: "#2A4D7B" },
              }}
            >
              Add Guide
            </Button>
          </div>

          <div
            className="bg-white mt-4 rounded-md px-8 pb-8 shadow-md"
            style={{ border: "1px solid #89A6CC" }}
          >
            <table className="">
              <tr>
                <th id="id">#</th>
                <th id="title">TITLE</th>
                <th id="content">CONTENT</th>
                <th id="action">ACTIONS</th>
              </tr>
              {guideData.map((guide, index) => (
                <tr key={guide.guide_id}>
                  <td>{index + 1}</td>
                  <td>{guide.title}</td>
                  <td>{guide.content}</td>
                  <td style={{ padding: "6px 0px" }}>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleClickOpenRemoveGuide(guide.guide_id)}
                    >
                      <DeleteIcon />
                    </IconButton>

                    <IconButton
                      aria-label="edit"
                      onClick={() => handleClickOpenEditGuide(guide.guide_id)}
                    >
                      <EditIcon />
                    </IconButton>
                  </td>
                </tr>
              ))}
              <Dialog
                open={openDelete}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Do you want to remove this guide ?"}
                </DialogTitle>

                <DialogActions>
                  <Button onClick={handleCloseDelete}>No</Button>
                  <Button onClick={handleDeleteGuide}>
                    <p className="text-red">Yes</p>
                  </Button>
                </DialogActions>
              </Dialog>
            </table>
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleCloseAddGuide}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "background.paper",
            borderRadius: "20px",
            boxShadow: 24,
            p: 3,
          }}
        >
          <div className="pb-2 text-center border-b-2 border-stone-500">
            <div className="flex flex-row items-center justify-between">
              <Typography
                className="font-semibold"
                style={{ fontSize: "28px", color: "#637381" }}
              >
                ADD GUIDE
              </Typography>
              <IconButton onClick={handleCloseAddGuide}>
                <CloseIcon />
              </IconButton>
            </div>
          </div>

          <Grid container alignItems="center" spacing={2} mt={2}>
            <Grid item xs={12} md={3}>
              <Typography
                className="mt-3"
                style={{
                  fontSize: "16px",
                  fontWeight: "400",
                }}
              >
                Title:
              </Typography>
            </Grid>
            <Grid item xs={12} md={9}>
              <TextField
                fullWidth
                variant="outlined"
                value={guideAdd.title}
                onChange={handleChange("title")}
              />
            </Grid>
          </Grid>

          <Grid container alignItems="center" spacing={2} mt={2}>
            <Grid item xs={12} md={3}>
              <Typography
                className="mt-3"
                style={{
                  fontSize: "16px",
                  fontWeight: "400",
                }}
              >
                Content:
              </Typography>
            </Grid>
            <Grid item xs={12} md={9}>
              <TextField
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                value={guideAdd.content}
                onChange={handleChange("content")}
              />
            </Grid>
          </Grid>

          <DialogActions className="mt-5">
            <Button
              variant="contained"
              onClick={handleCloseAddGuide}
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
              onClick={handleAddGuide}
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
        open={openEdit}
        onClose={handleCloseEditGuide}
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
                EDIT GUIDE
              </p>
              <IconButton onClick={handleCloseEditGuide}>
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
                Title:
              </Typography>
            </Grid>
            <Grid item xs={12} md={9}>
              <FormControl fullWidth variant="outlined">
                <OutlinedInput
                  inputProps={{
                    "aria-label": "Title",
                  }}
                  onChange={handleChangeEditGuide("title")}
                  value={currentEditGuide.title}
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
                Content:
              </Typography>
            </Grid>
            <Grid item xs={12} md={9}>
              <FormControl fullWidth variant="outlined">
                <OutlinedInput
                  inputProps={{
                    "aria-label": "Host",
                  }}
                  onChange={handleChangeEditGuide("content")}
                  value={currentEditGuide.content}
                />
              </FormControl>
            </Grid>
          </Grid>

          <DialogActions className="mt-5">
            <Button
              variant="contained"
              onClick={handleCloseEditGuide}
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
              onClick={handleEditGuide}
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
    </div>
  );
}
