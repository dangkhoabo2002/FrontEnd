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
          handleGetGuide();
          setCurrentEditGuide({ title: "", content: "" });
          handleCloseEditGuide();
        } else {
          console.log("Update Fail");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
      }
    } else {
      console.log("No id catch");
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
          handleGetGuide();
          setCurrentGuide("");
          handleCloseDelete();
        } else {
          console.log("Delete Fail");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
      }
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
        alert("Add guide success");
        handleCloseAddGuide();
      } else {
        alert("Add guide fail");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
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
          height: "66vh",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <SidebarAdmin />
        </div>
        <div className="px-12 py-6 bg-[#F3F8FF]">
          <div className="flex flex-row gap-10">
            <button
              onClick={handleOpenAddGuide}
              class="bg-transparent hover:bg-[#3867A5] text-[#3867A5] font-semibold hover:text-white  border border-[#3867A5] hover:border-transparent rounded px-8 py-1"
            >
              Add Guide
            </button>
          </div>

          <div className="bg-white mt-4 rounded-md px-8 pb-8 shadow-md ">
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
                  <td>
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

          <Box>
            <Grid container spacing={2} mt={2}>
              <Grid
                item
                xs={12}
                md={3}
                className="d-flex justify-content-center align-items-center"
              >
                {" "}
                <Button
                  variant="contained"
                  onClick={handleClose}
                  sx={{
                    width: "100px",
                    color: "white",
                    bgcolor: "#6EC882",
                    "&:hover": { bgcolor: "darkgreen" },
                  }}
                >
                  Cancel
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
                  onClick={handleAddGuide}
                  sx={{
                    width: "100px",
                    color: "white",
                    bgcolor: "#6EC882",
                    "&:hover": { bgcolor: "darkgreen" },
                  }}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Box>
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
                <Button onClick={handleCloseEditGuide}>
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
                  onClick={handleEditGuide}
                  style={{ marginLeft: "10px" }}
                  sx={{
                    width: "120px",
                    height: "auto",
                    color: "white",
                    bgcolor: "#6EC882",
                    "&:hover": { bgcolor: "#5CA36C" },
                    fontSize: "14px",
                    fontWeight: "normal",
                    textTransform: "none",
                  }}
                >
                  Done
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
