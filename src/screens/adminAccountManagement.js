import React, { useState, useEffect } from "react";
import SidebarAdmin from "../components/sidebarAdmin";
import "../css/Admin.css";
import "../css/serverGeneral.css";
import { Button } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { useNavigate } from "react-router-dom";

export default function AdminAccountManagement() {
  const [customerList, setCustomerList] = useState([]);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [open, setOpen] = useState(false);
  const [openChangeStatus, setOpenChangeStatus] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [username, setUsername] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCustomerList, setFilteredCustomerList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const navigate = useNavigate();

  const handleClickSelectUser = (customerId) => {
    const isAlreadySelected = selectedCustomers.includes(customerId);
    if (isAlreadySelected) {
      setSelectedCustomers(selectedCustomers.filter((id) => id !== customerId));
    } else {
      setSelectedCustomers([...selectedCustomers, customerId]);
    }
  };

  const handleGetCustomer = async () => {
    const customerUrl = `https://master-help-desk-back-end.vercel.app/auth/get_all_profile`;
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

  useEffect(() => {
    handleGetCustomer();
  }, [navigate]);

  const handleOpenChangeStatus = (username, status) => {
    setUsername(username);
    setNewStatus(status === "ACTIVE" ? "inactive" : "active");
    setOpenChangeStatus(true);
  };

  const handleChangeStatusClose = () => {
    setOpenChangeStatus(false);
    setUsername("");
    setNewStatus("");
  };

  const handleChangeStatus = () => {
    handleChangeStatusAPI();
    handleChangeStatusClose();
  };

  const handleChangeStatusAPI = async () => {
    if (username) {
      const deleteUrl = `https://master-help-desk-back-end.vercel.app/manager/change_user_status`;
      const token = localStorage.getItem("access_token");

      try {
        const response = await fetch(deleteUrl, {
          method: "PUT",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
          },
          body: JSON.stringify({
            username: username,
            new_status: newStatus,
          }),
        });
        if (response.status === 200) {
          handleGetCustomer();
          toast.success("Change status successfully.", {
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
          toast.error("User is not selected!", {
            style: {
              border: "1px solid #F85F60",
              maxWidth: "900px",
              padding: "16px 24px",
              color: "red",
              fontWeight: "bolder",
            },
          });
        } else if (response.status === 500) {
          toast.error(
            "Failed to change status of user, please try again later!",
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

  // const handleClickOpenRemoveUser = (username) => {
  //   setUsername(username);
  //   setOpenDelete(true);
  // };

  // const handleCloseDelete = () => {
  //   setOpenDelete(false);
  //   setUsername("");
  // };

  // const handleDeleteUser = async () => {
  //   if (username) {
  //     const deleteUrl = `https://master-help-desk-back-end.vercel.app/manager/delete_user`;
  //     const token = localStorage.getItem("access_token");

  //     try {
  //       const response = await fetch(deleteUrl, {
  //         method: "DELETE",
  //         credentials: "include",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //           "Access-Control-Allow-Origin": "*",
  //           "Access-Control-Allow-Credentials": "true",
  //         },
  //         body: JSON.stringify({
  //           username: username,
  //         }),
  //       });
  //       if (response.status === 200) {
  //         handleGetCustomer();
  //         toast.success("Delete user successfully.", {
  //           style: {
  //             border: "1px solid #37E030",
  //             maxWidth: "900px",
  //             padding: "16px 24px",
  //             color: "green",
  //             fontWeight: "bolder",
  //           },
  //         });
  //       } else if (response.status === 403) {
  //         toast.error("Permission denied!", {
  //           style: {
  //             border: "1px solid #F85F60",
  //             maxWidth: "900px",
  //             padding: "16px 24px",
  //             color: "red",
  //             fontWeight: "bolder",
  //           },
  //         });
  //       } else if (response.status === 400) {
  //         toast.error("User is not selected!", {
  //           style: {
  //             border: "1px solid #F85F60",
  //             maxWidth: "900px",
  //             padding: "16px 24px",
  //             color: "red",
  //             fontWeight: "bolder",
  //           },
  //         });
  //       } else if (response.status === 500) {
  //         toast.error("Failed to delete user, please try again later!", {
  //           style: {
  //             border: "1px solid #F85F60",
  //             maxWidth: "900px",
  //             padding: "16px 24px",
  //             color: "red",
  //             fontWeight: "bolder",
  //           },
  //         });
  //       } else {
  //         toast.error("Something wrong, please try again later!", {
  //           style: {
  //             border: "1px solid #F85F60",
  //             maxWidth: "900px",
  //             padding: "16px 24px",
  //             color: "red",
  //             fontWeight: "bolder",
  //           },
  //         });
  //       }
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   } else {
  //     toast.error("Please select a user!", {
  //       style: {
  //         border: "1px solid #F85F60",
  //         maxWidth: "900px",
  //         padding: "16px 24px",
  //         color: "red",
  //         fontWeight: "bolder",
  //       },
  //     });
  //   }
  // };

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredCustomerList(
      customerList.filter((customer) =>
        customer.username.toLowerCase().includes(query)
      )
    );
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCustomerList.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <div className="admin-layout flex flex-col md:flex-row">
      <SidebarAdmin />
      <div className="content flex-1 p-4 md:p-10">
        <Toaster position="bottom-right" reverseOrder={false} />

        <div className="info-title font-semibold pb-5">
          <p className="text-3xl">Account Management</p>
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
              placeholder="Search by username..."
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <div className="content-container overflow-x-auto">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">USERNAME</th>
                <th className="p-4">FULLNAME</th>
                <th className="p-4">EMAIL</th>
                {/* <th className="p-4">ACTION</th> */}
                <th className="p-4">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((customer, index) => (
                <tr key={customer.id} className="border-t">
                  <td className="p-4">{indexOfFirstItem + index + 1}</td>
                  <td className="p-4">{customer.username}</td>
                  <td className="p-4">{customer.full_name}</td>
                  <td className="p-4">{customer.email}</td>
                  {/* <td className="p-4">
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
                  </td> */}
                  <td className="p-4">
                    <div className="flex justify-center m-5">
                      <Button
                        variant="contained"
                        sx={{
                          width: "100px",
                          height: "25px",
                          color: "white",
                          borderRadius: "100px",
                          bgcolor:
                            customer.status === "ACTIVE"
                              ? "#6EC882"
                              : "#8E8E8E",
                          "&:hover": {
                            bgcolor:
                              customer.status === "ACTIVE"
                                ? "#63B976"
                                : "#717171",
                          },
                          fontSize: "14px",
                          fontWeight: "normal",
                          textTransform: "none",
                        }}
                        onClick={() =>
                          handleOpenChangeStatus(
                            customer.username,
                            customer.status
                          )
                        }
                      >
                        {customer.status === "ACTIVE" ? "Active" : "Inactive"}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-4">
            <Pagination
              count={Math.ceil(filteredCustomerList.length / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </div>
        </div>

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

        {/* <Dialog
          open={openDelete}
          onClose={handleCloseDelete}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Do you want to remove this user?"}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleCloseDelete}>No</Button>
            <Button onClick={handleDeleteUser}>
              <p className="text-red">Yes</p>
            </Button>
          </DialogActions>
        </Dialog> */}
      </div>
    </div>
  );
}
