import React, { useState, useEffect } from "react";
import SidebarAdmin from "../components/sidebarAdmin";
import NavigationAdmin from "../components/navAdmin";
import "../css/adminBilling.css";
import { Button } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";

import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AdminRoleManagement() {
  const [roleData, setRoleData] = useState();

  const handleGetRole = async () => {
    const customerUrl = `http://127.0.0.1:5000/role/get`;
    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch(customerUrl, {
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
        const roleData = await response.json();
        setRoleData(roleData);
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
  };

  const [token, setToken] = useState();
  const checkToken = () => {
    const isToken = localStorage.getItem("checkAdmin");
    setToken(isToken);
  };

  useEffect(() => {
    handleGetRole();
    checkToken();
  }, []);

  // ADD ROLE
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
    const customerUrl = `http://127.0.0.1:5000/role/add`;
    const token = localStorage.getItem("access_token");

    if (newRole.role_name === "" || newRole.description === "") {
      toast.error("Please enter all fields!", {
        style: {
          border: "1px solid #F85F60",
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
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
          },
          body: JSON.stringify({
            role_name: newRole.role_name,
            description: newRole.description,
          }),
        });
        if (response.status === 201) {
          toast.dismiss();
          toast.success("New role has created.", {
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
      } finally {
      }
    }
  };

  // DELETE ROLE

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
    const customerUrl = `http://127.0.0.1:5000/role/delete/${roleId_del}`;
    const token = localStorage.getItem("access_token");

    try {
      toast.loading("Deleting...");
      const response = await fetch(customerUrl, {
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
        toast.dismiss();
        toast.success("Deleted success.", {
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

        toast.error("Missing choosen role!", {
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

  // EDIT ROLE

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
    if (editRole.role_name === "" || editRole.role_name === "") {
      toast.error("Please enter all fields!", {
        style: {
          border: "1px solid #F85F60",
          maxWidth: "900px",
          padding: "16px 24px",
          color: "red",
          fontWeight: "bolder",
        },
      });
    } else if (selectedRole === "") {
      toast.error("Role is not selected!", {
        style: {
          border: "1px solid #F85F60",
          maxWidth: "900px",
          padding: "16px 24px",
          color: "red",
          fontWeight: "bolder",
        },
      });
    } else {
      toast.loading("Updating...");
      const customerUrl = `http://127.0.0.1:5000/role/update/${selectedRole}`;
      const token = localStorage.getItem("access_token");

      try {
        const response = await fetch(customerUrl, {
          method: "PUT",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
          },
          body: JSON.stringify({
            role_name: editRole.role_name,
            description: editRole.description,
          }),
        });
        if (response.status === 200) {
          toast.dismiss();
          toast.success("New role has changed.", {
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
      } finally {
      }
    }
  };

  return (
    <div className="">
      <Toaster position="bottom-right" reverseOrder={false} />

      {/*-------------- Navigation + Backgroud---------------- */}

      <NavigationAdmin />

      {/*-------------- END OF Navigation + Backgroud---------------- */}

      {/*-------------- LayoutBody ---------------- */}

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
            height: "70vh",
          }}
        >
          <SidebarAdmin />
        </div>
        <div className="px-12 py-6 bg-[#F3F8FF]">
          {token !== null ? (
            <>
              <Button
                variant="outlined"
                sx={{
                  width: "120px",
                  color: "white",
                  bgcolor: "#3867A5",
                  "&:hover": { bgcolor: "#2A4D7B" },
                }}
                onClick={clickOpenAddRole}
              >
                Add Role
              </Button>

              {/*-------------- Billing Table ---------------- */}

              <div
                className="bg-white mt-4 rounded-md px-8 pb-8 shadow-md"
                style={{ border: "1px solid #89A6CC" }}
              >
                <table class="table-auto w-full ">
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
                      <td
                        style={{
                          color: "transparent",
                          padding: "0px",
                        }}
                      >
                        .
                      </td>
                    </tr>
                    {roleData?.map((role) => (
                      <tr key={role.role_id}>
                        <td>{role?.role_name}</td>
                        <td>{role?.role_id}</td>
                        <td>{role?.description}</td>
                        <td>
                          <IconButton
                            aria-label="delete"
                            onClick={() => clickOpenDelete(role?.role_id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                          <IconButton
                            aria-label="edit"
                            onClick={() => clickOpenEdit(role?.role_id)}
                          >
                            <EditIcon />
                          </IconButton>
                        </td>
                      </tr>
                    ))}
                    <tr></tr>
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="flex flex-row justify-center py-40 gap-4 text-red-600 font-bold">
              <WarningAmberIcon />
              <p>UKNOWN USER! PLEASE LOGIN FIRST </p>
              <WarningAmberIcon />
            </div>
          )}

          {/*-------------- END OF Billing Table ---------------- */}
        </div>
      </div>

      {/*-------------- END OF LayoutBody ---------------- */}

      {/*-------------- ADD NEW ROLE ---------------- */}
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
            defaultValue="Default Value"
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

      {/*-------------- DELETE ALERT ---------------- */}
      <Dialog
        open={openDelete}
        onClose={clickCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want to remove this member?"}
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

      {/*-------------- EDIT ALERT ---------------- */}
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
