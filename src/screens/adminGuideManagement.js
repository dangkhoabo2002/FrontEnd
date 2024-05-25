import React, { useState, useEffect } from "react";
import SidebarAdmin from "../components/sidebarAdmin";
import NavigationAdmin from "../components/navAdmin";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import "../css/serverGeneral.css";

// ICONS MUI
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../css/adminGuide.css";

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
  const [currentGuide, setCurrentGuide] = useState();

  const handleClickOpenEditGuide = (id, old_title, old_content) => {
    setCurrentGuide(id);
    setCurrentEditGuide({ title: old_title, content: old_content });
    setOpenEdit(true);
  };

  const handleCloseEditGuide = () => {
    setCurrentEditGuide({ title: "", content: "" });
    setOpenEdit(false);
  };

  const handleChangeEditGuide = (prop) => (event) => {
    setCurrentEditGuide({ ...currentEditGuide, [prop]: event.target.value });
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredGuideData, setFilteredGuideData] = useState([]);

  const handleEditGuide = async () => {
    toast.loading("In processing..");
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
          toast.dismiss();
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
        } else if (response.status === 400) {
          toast.dismiss();
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
          toast.dismiss();
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

  const handleDeleteGuide = async () => {
    if (currentGuide) {
      const deleteUrl = `http://127.0.0.1:5000/guide/delete/`;
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
          toast.error("Failed to delete guide, please try again later!", {
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
        setFilteredGuideData(data);
      } else {
        console.error("Failed to fetch guide data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [token, setToken] = useState();
  const checkToken = () => {
    const isToken = localStorage.getItem("checkAdmin");
    setToken(isToken);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const loginToken = localStorage.getItem("checkUser");

    const checkLoggedIn = () => {
      if (loginToken) {
        navigate("/error404");
      }
    };

    checkLoggedIn();
    handleGetGuide();
    checkToken();
  }, []);

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
      }
    }
  };

  const handleChange = (prop) => (event) => {
    setGuideAdd({ ...guideAdd, [prop]: event.target.value });
  };

  // search bar
  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredGuideData(
      guideData.filter((guide) =>
        guide.title.toLowerCase().includes(query)
      )
    );
  };

  return (
    <div className="admin-layout">
      {/* <NavigationAdmin /> */}
      <SidebarAdmin />
      <div className="content">
        <Toaster position="bottom-right" reverseOrder={false} />{" "}
        <div className="info-title font-semibold pb-5">
          <p style={{ fontSize: "36px" }}>Guide Management</p>
        </div>
        
          <>
            <div className="button-container">
            <div className="flex justify-start">
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="simple-search"
                  style={{width:"200%"}}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search by title..."
                  onChange={handleSearchChange}
                />
              </div>
            </div>

              <Button
              className="flex justify-end max-w-sm"
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
            
            <div className="content-container">
              <table id="guide-table" className="table-auto w-full">
                <thead>
                  <tr>
                    <th id="id">#</th>
                    <th id="title">TITLE</th>
                    <th id="content">CONTENT</th>
                    <th id="action">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGuideData.map((guide, index) => (
                    <tr key={guide.guide_id}>
                      <td>{index + 1}</td>
                      <td>{guide.title}</td>
                      <td>{guide.content.slice(0, 50)}...</td>
                      <td style={{ padding: "6px 0px" }}>
                        <IconButton
                          aria-label="delete"
                          onClick={() =>
                            handleClickOpenRemoveGuide(guide.guide_id)
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                        <IconButton
                          aria-label="edit"
                          onClick={() =>
                            handleClickOpenEditGuide(
                              guide.guide_id,
                              guide.title,
                              guide.content
                            )
                          }
                        >
                          <EditIcon />
                        </IconButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
            </div>
          </>

      </div>

      <Dialog open={open} onClose={handleCloseAddGuide}>
        <DialogTitle>Add new guide</DialogTitle>
        <DialogContent>
          <DialogContentText>Add new guide into MHD system.</DialogContentText>
          <TextField
            fullWidth
            variant="outlined"
            value={guideAdd.title}
            onChange={handleChange("title")}
            required
            margin="dense"
            id="guide_title"
            name="guide_title"
            label="Title"
            type="text"
          />
          <TextField
            required
            margin="dense"
            id="guide_content"
            name="guide_content"
            label="Content"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={guideAdd.content}
            onChange={handleChange("content")}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddGuide}>Cancel</Button>
          <Button onClick={handleAddGuide}>Confirm</Button>
        </DialogActions>
      </Dialog>

      {/*-------------- EDIT ALERT ---------------- */}
      <Dialog open={openEdit} onClose={handleCloseEditGuide}>
        <DialogTitle>Update guide</DialogTitle>
        <DialogContent>
          <DialogContentText className="pb-4">
            Edit guide's information.
          </DialogContentText>
          <TextField
            required
            margin="dense"
            id="guide"
            name="guide"
            label="Guide name"
            type="text"
            fullWidth
            variant="outlined"
            onChange={handleChangeEditGuide("title")}
            value={currentEditGuide.title}
          />
          <TextField
            required
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={4}
            margin="dense"
            name="pkg"
            type="Description"
            fullWidth
            onChange={handleChangeEditGuide("content")}
            value={currentEditGuide.content}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditGuide}>Cancel</Button>
          <Button onClick={handleEditGuide}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
