import React, { useState, useEffect } from "react";
import SidebarAdmin from "../components/sidebarAdmin";
import NavigationAdmin from "../components/navAdmin";
import "../css/adminRole.css";
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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AdminRoleManagement() {
  const [roleData, setRoleData] = useState([]);
  const [token, setToken] = useState();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRoleData, setFilteredRoleData] = useState([]);

  useEffect(() => {
    const loginToken = localStorage.getItem("checkUser");
    if (loginToken) {
      navigate("/error404");
    }
    handleGetRole();
    checkToken();
  }, []);

  const checkToken = () => {
    const isToken = localStorage.getItem("checkAdmin");
    setToken(isToken);
  };

  const handleGetRole = async () => {
    const customerUrl = `https://master-help-desk-back-end.vercel.app/role/get`;
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(customerUrl, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        toast.dismiss();
        const roleData = await response.json();
        setRoleData(roleData);
        setFilteredRoleData(roleData);
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
  };

  const [openAddRole, setOpenAddRole] = useState(false);
  const [newRole, setNewRole] = useState({
    role_id: "",
    role_name: "",
    description: "",
  });

  const handleChange = (prop) => (event) => {
    setNewRole({ ...newRole, [prop]: event.target.value });
  };

  const clickOpenAddRole = () => {
    setOpenAddRole(true);
  };

  const clickCloseAddRole = () => {
    setOpenAddRole(false);
    setNewRole({ role_id: "", role_name: "", description: "" });
  };

  const handleAddRole = async () => {
    const customerUrl = `https://master-help-desk-back-end.vercel.app/role/add`;
    const token = localStorage.getItem("access_token");

    if (newRole.role_name === "" || newRole.description === "") {
      toast.error("Please enter all fields!", {
        style: {
          border: "1px solid #FF5733",
          maxWidth: "900px",
          padding: "16px 24px",
          color: "red",
          fontWeight: "bolder",
        },
      });
    } else {
      try {
        toast.loading("In processing...");
        const response = await fetch(customerUrl, {
          method: "POST",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            role_name: newRole.role_name,
            description: newRole.description,
          }),
        });
        if (response.status === 200) {
          toast.dismiss();
          toast.success("New role has been created.", {
            style: {
              border: "1px solid #37E030",
              maxWidth: "900px",
              padding: "16px 24px",
              color: "green",
              fontWeight: "bolder",
            },
          });
          handleGetRole();
          clickCloseAddRole();
        } else if (response.status === 500) {
          toast.dismiss();
          toast.error("Failed to add role!", {
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
          toast.error("Missing name or description!", {
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

  const [openDelete, setOpenDelete] = useState(false);
  const [roleId_del, setRoleId_del] = useState();

  const clickOpenDelete = (roleId) => {
    setOpenDelete(true);
    setRoleId_del(roleId);
  };

  const clickCloseDelete = () => {
    setOpenDelete(false);
    setRoleId_del("");
  };

  const handleDeleteRole = async () => {
    const customerUrl = `https://master-help-desk-back-end.vercel.app/role/delete/${roleId_del}`;
    const token = localStorage.getItem("access_token");
    try {
      toast.loading("Deleting...");
      const response = await fetch(customerUrl, {
        method: "DELETE",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        toast.dismiss();
        toast.success("Deleted successfully.", {
          style: {
            border: "1px solid #37E030",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "green",
            fontWeight: "bolder",
          },
        });
        clickCloseDelete();
        handleGetRole();
      } else if (response.status === 500) {
        toast.dismiss();
        toast.error("Failed to delete role!", {
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
        toast.error("Missing chosen role!", {
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
  };

  const [openEdit, setOpenEdit] = useState(false);
  const [selectedRole, setSelectedRole] = useState();
  const [editRole, setEditRole] = useState({
    role_name: "",
    description: "",
  });

  const handleChangeEdit = (prop) => (event) => {
    setEditRole({ ...editRole, [prop]: event.target.value });
  };

  const clickOpenEdit = (roleId) => {
    setOpenEdit(true);
    setSelectedRole(roleId);
  };

  const clickCloseEdit = () => {
    setOpenEdit(false);
    setEditRole({ role_name: "", description: "" });
    setSelectedRole("");
  };

  const handleEditRole = async () => {
    if (editRole.role_name === "" || editRole.description === "") {
      toast.error("Please enter all fields!", {
        style: {
          border: "1px solid #FF5733",
          maxWidth: "900px",
          padding: "16px 24px",
          color: "red",
          fontWeight: "bolder",
        },
      });
    } else if (!selectedRole) {
      toast.error("Role is not selected!", {
        style: {
          border: "1px solid #FF5733",
          maxWidth: "900px",
          padding: "16px 24px",
          color: "red",
          fontWeight: "bolder",
        },
      });
    } else {
      toast.loading("Updating...");
      const customerUrl = `https://master-help-desk-back-end.vercel.app/role/update/${selectedRole}`;
      const token = localStorage.getItem("access_token");
      try {
        const response = await fetch(customerUrl, {
          method: "PUT",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            role_name: editRole.role_name,
            description: editRole.description,
          }),
        });
        if (response.status === 200) {
          toast.dismiss();
          toast.success("Role has been updated.", {
            style: {
              border: "1px solid #37E030",
              maxWidth: "900px",
              padding: "16px 24px",
              color: "green",
              fontWeight: "bolder",
            },
          });
          handleGetRole();
          clickCloseEdit();
        } else if (response.status === 500) {
          toast.dismiss();
          toast.error("Failed to update role!", {
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
          toast.error("Missing name or description!", {
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

  // searchbar
  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredRoleData(
      roleData.filter((role) => role.role_name.toLowerCase().includes(query))
    );
  };

  return (
    <div className="admin-layout">
      <Toaster position="bottom-right" reverseOrder={false} />
      <SidebarAdmin />
      <div className="content">
        {" "}
        <div className="info-title font-semibold pb-5">
          <p style={{ fontSize: "36px" }}>Role Management</p>
        </div>
        {token ? (
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
                    style={{ width: "200%" }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search by role name..."
                    onChange={handleSearchChange}
                  />
                </div>
              </div>
              <Button
                className="flex justify-end max-w-sm"
                onClick={clickOpenAddRole}
                variant="outlined"
                sx={{
                  width: "120px",
                  color: "white",
                  bgcolor: "#3867A5",
                  "&:hover": { bgcolor: "#2A4D7B" },
                }}
              >
                Add Role
              </Button>
            </div>
            <div className="content-container">
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th>ROLE NAME</th>
                    <th>ROLE ID</th>
                    <th>DESCRIPTION</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ color: "transparent", padding: "0px" }}>.</td>
                  </tr>
                  {filteredRoleData?.map((role) => (
                    <tr key={role.role_id}>
                      <td>{role.role_name}</td>
                      <td>{role.role_id}</td>
                      <td>{role.description}</td>
                      <td>
                        <IconButton
                          aria-label="delete"
                          onClick={() => clickOpenDelete(role.role_id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                        <IconButton
                          aria-label="edit"
                          onClick={() => clickOpenEdit(role.role_id)}
                        >
                          <EditIcon />
                        </IconButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="flex flex-row justify-center py-40 gap-4 text-red-600 font-bold">
            <WarningAmberIcon />
            <p>UNKNOWN USER! PLEASE LOGIN FIRST</p>
            <WarningAmberIcon />
          </div>
        )}
      </div>

      <Dialog open={openAddRole} onClose={clickCloseAddRole}>
        <DialogTitle>Add new role</DialogTitle>
        <DialogContent>
          <DialogContentText className="pb-4">
            Add new role into MHD system.
          </DialogContentText>
          <TextField
            required
            margin="dense"
            id="role"
            name="role"
            label="Role name"
            type="text"
            fullWidth
            variant="outlined"
            onChange={handleChange("role_name")}
            value={newRole.role_name}
          />
          <TextField
            required
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={4}
            margin="dense"
            name="role"
            type="text"
            fullWidth
            onChange={handleChange("description")}
            value={newRole.description}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={clickCloseAddRole}>Cancel</Button>
          <Button onClick={handleAddRole}>Confirm</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDelete}
        onClose={clickCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want to remove this role?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            They will no longer have access to the server or configure its
            features.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={clickCloseDelete}>No</Button>
          <Button onClick={handleDeleteRole}>Yes</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEdit} onClose={clickCloseEdit}>
        <DialogTitle>Update role</DialogTitle>
        <DialogContent>
          <DialogContentText className="pb-4">
            Input new role's information.
          </DialogContentText>
          <TextField
            required
            margin="dense"
            id="role"
            name="role"
            label="Role name"
            type="text"
            fullWidth
            variant="outlined"
            onChange={handleChangeEdit("role_name")}
            value={editRole.role_name}
          />
          <TextField
            required
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={4}
            margin="dense"
            name="role"
            type="text"
            fullWidth
            onChange={handleChangeEdit("description")}
            value={editRole.description}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={clickCloseEdit}>Cancel</Button>
          <Button onClick={handleEditRole}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
