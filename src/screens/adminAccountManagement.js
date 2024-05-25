import React, { useEffect, useState } from "react";
import SidebarAdmin from "../components/sidebarAdmin";
import "../css/Admin.css";
import Button from "@mui/material/Button";
import toast, { Toaster } from "react-hot-toast";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { Navigate, json, useNavigate } from "react-router-dom";

export default function AdminAccountManagement() {
  const [customerList, setCustomerList] = useState();
  const [selectedCustomers, setSelectedCustomers] = useState([]);

  const handleClickSelectUser = (customerId) => {
    const isAlreadySelected = selectedCustomers.includes(customerId);
    if (isAlreadySelected) {
      setSelectedCustomers(selectedCustomers.filter((id) => id !== customerId));
    } else {
      setSelectedCustomers([...selectedCustomers, customerId]);
    }
  };

  const [open, setOpen] = React.useState(false);

  const handleGetCustomer = async () => {
    const customerUrl = `http://127.0.0.1:5000/auth/get_all_profile`;
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
        const customerData = await response.json();
        setCustomerList(customerData);
        setFilteredCustomerList(customerData);
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
    handleGetCustomer();
  }, [navigate]);

  // CHANGE STATUS USER
  const [openChangeStatus, setOpenChangeStatus] = useState(false);

  const handleOpenChangeStatus = () => {
    setOpenChangeStatus(true);
  };

  const handleChangeStatusClose = () => {
    setOpenChangeStatus(false);
  };
  const handleChangeStatus = () => {
    // API HERE
    handleChangeStatusClose();
  };

  // DELETE USER ACCOUNT
  const [openDelete, setOpenDelete] = useState(false);
  const [username, setUsername] = useState("");

  const handleClickOpenRemoveUser = (username) => {
    setUsername(username);
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
    
  };
  const handleDeleteUser = async () => {
    handleDeleteCustomer();

    handleCloseDelete();
  };

  const handleDeleteCustomer = async () => {
    if (username) {
      const deleteUrl = `http://127.0.0.1:5000/manager/delete_user`;
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
          body: JSON.stringify({
            username: username,
          })
        });
        if (response.status === 200) {
          
          handleGetCustomer();
          // setCurrentGuide("");
          handleCloseDelete();
          toast.success("Delete guide successfully.", {
            style: {
              border: "1px solid #37E030",
              maxWidth: "900px",
              padding: "16px 24px",
              color: "green",
              fontWeight: "bolder",
            },
          });
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
          toast.error("Failed to delete user, please try again later!", {
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
      toast.error("Please select a user!", {
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

  // searchbar
  const [filteredCustomerList, setFilteredCustomerList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredCustomerList(
      customerList.filter((customer) =>
        customer.username.toLowerCase().includes(query)
      )
    );
  };

  return (
    <div className="admin-layout">
      <SidebarAdmin />
      <div className="content">
      <Toaster position="bottom-right" reverseOrder={false} />

        <div className="info-title font-semibold pb-5">
          <p style={{ fontSize: "36px" }}>Account Management</p>
        </div>

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
                placeholder="Search by username..."
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>

        {token !== null ? (
          <div className="content-container">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>USERNAME</th>
                  <th>FULLNAME</th>
                  <th>EMAIL</th>
                  <th>ACTION</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomerList.length > 0 ? (
                  filteredCustomerList.map((customer, index) => (
                    <tr key={customer.id}>
                      <td>{index + 1}</td>
                      <td>{customer.username}</td>
                      <td>{customer.full_name}</td>
                      <td>{customer.email}</td>
                      <td>
                        <Button
                          onClick={() =>
                            handleClickOpenRemoveUser(customer.username)
                          }
                          variant="contained"
                          sx={{
                            width: "100px",
                            height: "25px",
                            color: "white",
                            borderRadius: "100px",
                            bgcolor: "#F85F60",
                            "&:hover": { bgcolor: "#D45758" },
                            fontSize: "14px",
                            fontWeight: "normal",
                            textTransform: "none",
                          }}
                        >
                          Delete
                        </Button>
                      </td>
                      {customer.status === "ACTIVE" ? (
                        <td>
                          <div className="flex justify-center m-5">
                            <Button
                              variant="contained"
                              sx={{
                                width: "100px",
                                height: "25px",
                                color: "white",
                                borderRadius: "100px",
                                bgcolor: "#6EC882",
                                "&:hover": { bgcolor: "#63B976" },
                                fontSize: "14px",
                                fontWeight: "normal",
                                textTransform: "none",
                              }}
                              onClick={handleOpenChangeStatus}
                            >
                              Active
                            </Button>
                          </div>
                        </td>
                      ) : (
                        <td>
                          <div className="flex justify-center m-5">
                            <Button
                              variant="contained"
                              sx={{
                                width: "100px",
                                height: "25px",
                                color: "white",
                                borderRadius: "100px",
                                bgcolor: "#8E8E8E",
                                "&:hover": { bgcolor: "#6C6C6C" },
                                fontSize: "14px",
                                fontWeight: "normal",
                                textTransform: "none",
                              }}
                              onClick={handleOpenChangeStatus}
                            >
                              Inactive
                            </Button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      No customers found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* DIALOG CONFIRM CHANGE STATUS */}
            <Dialog open={openChangeStatus} onClose={handleChangeStatusClose}>
              <DialogTitle>Confirmation</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to change the status?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleChangeStatusClose}>Cancel</Button>
                <Button onClick={handleChangeStatus}>
                  <p className="text-red">Confirm</p>
                </Button>
              </DialogActions>
            </Dialog>

            {/* DIALOG DELETE USER */}
            <Dialog
              open={openDelete}
              onClose={handleCloseDelete}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Do you want to remove this guide?"}
              </DialogTitle>

              <DialogActions>
                <Button onClick={handleCloseDelete}>No</Button>
                <Button onClick={handleDeleteUser}>
                  <p className="text-red">Yes</p>
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        ) : (
          <div className="flex flex-row justify-center py-40 text-red-600 font-bold gap-4">
            <WarningAmberIcon />
            <p>UNKNOWN USER! PLEASE LOGIN FIRST </p>
            <WarningAmberIcon />
          </div>
        )}
      </div>
    </div>
  );
}
