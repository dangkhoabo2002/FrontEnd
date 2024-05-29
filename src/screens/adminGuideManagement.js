import React, { useState, useEffect } from "react";
import SidebarAdmin from "../components/sidebarAdmin";
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
  Pagination,
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleEditGuide = async () => {
    toast.loading("In processing..");
    if (currentGuide) {
      const editUrl = `https://master-help-desk-back-end.vercel.app/guide/update/${currentGuide}`;
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
      const deleteUrl = `https://master-help-desk-back-end.vercel.app/guide/delete/${currentGuide}`;
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
    const guideUrl = `https://master-help-desk-back-end.vercel.app/guide/get`;
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

  const navigate = useNavigate();

  useEffect(() => {
    handleGetGuide();
  }, []);

  const handleOpenAddGuide = () => {
    setOpen(true);
  };

  const handleCloseAddGuide = () => {
    setGuideAdd({
      title: "",
      content: "",
    });
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
      const addUrl = "https://master-help-desk-back-end.vercel.app/guide/add";
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
      guideData.filter((guide) => guide.title.toLowerCase().includes(query))
    );
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Calculate the data to be displayed on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredGuideData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <div className="admin-layout flex flex-col md:flex-row">
      <SidebarAdmin />
      <div className="content flex-1 p-4 md:p-10">
        <Toaster position="bottom-right" reverseOrder={false} />

        <div className="info-title font-semibold pb-5">
          <p className="text-3xl">Guide Management</p>
        </div>

        <div className="button-container mb-6 p-4 bg-white rounded-lg shadow-md border border-gray-300 flex justify-between">
          <div className="relative w-full md:w-1/2 lg:w-1/3">
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
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
              className="search-input w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 pl-10 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search by title..."
              onChange={handleSearchChange}
            />
          </div>

          <Button
            className="max-w-sm"
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

        <div className="content-container overflow-x-auto">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr>
                <th className="p-4">#</th>
                <th className="p-4">TITLE</th>
                <th className="p-4">CONTENT</th>
                <th className="p-4">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((guide, index) => (
                <tr key={guide.guide_id} className="border-t">
                  <td className="p-4">{indexOfFirstItem + index + 1}</td>
                  <td className="p-4">{guide.title}</td>
                  <td className="p-4">{guide.content.slice(0, 50)}...</td>
                  <td className="p-4 flex justify-center">
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleClickOpenRemoveGuide(guide.guide_id)}
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
          <div className="flex justify-center mt-4">
            <Pagination
              count={Math.ceil(filteredGuideData.length / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </div>
        </div>

        <Dialog
          open={openDelete}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Do you want to remove this guide?"}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleCloseDelete}>No</Button>
            <Button onClick={handleDeleteGuide}>
              <p className="text-red">Yes</p>
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={open} onClose={handleCloseAddGuide}>
          <DialogTitle>Add new guide</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Add new guide into MHD system.
            </DialogContentText>
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
    </div>
  );
}
