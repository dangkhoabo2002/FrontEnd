import React, { useEffect, useState } from "react";
import SidebarAdmin from "../components/sidebarAdmin";
import NavigationAdmin from "../components/navAdmin";
import "../css/Admin.css";
import Button from "@mui/material/Button";
import toast, { Toaster } from "react-hot-toast";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";


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
    } finally {
    }
  };

  useEffect(() => {
    handleGetCustomer();
  }, []);

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
  const [currentUser, setCurrentUser] = useState("");

  const handleClickOpenRemoveUser = (id) => {
    setCurrentUser(id);
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  const handleDeleteUser = async () => {
    handleCloseDelete();
  }

  return (
    <div className="">
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
        <Toaster position="bottom-right" reverseOrder={false} />

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
          {/*-------------- Account Table ---------------- */}

          <div
            className="bg-white mt-4 rounded-md px-8 pb-8 shadow-md"
            style={{ border: "1px solid #89A6CC" }}
          >
            <table class="table-auto w-full ">
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

                {customerList?.map((customer, index) => (
                  <tr key={customer.id}>
                    <td>{index + 1}</td>
                    <td>{customer.username}</td>
                    <td>{customer.full_name}</td>
                    <td>{customer.email}</td>
                    <td>
                      <Button
                        onClick={() => handleClickOpenRemoveUser(customer.id)}
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
                    {customer.status == "ACTIVE" ? (
                      <td>
                        <div class="flex justify-center m-5">
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
                        <div class="flex justify-center m-5">
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
                            Inative
                          </Button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
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
                  <Button
                    onClick={handleChangeStatus}
                    variant="contained"
                    autoFocus
                  >
                    Confirm
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
                  {"Do you want to remove this guide ?"}
                </DialogTitle>

                <DialogActions>
                  <Button onClick={handleCloseDelete}>No</Button>
                  <Button onClick={handleDeleteUser}>
                    <p className="text-red">Yes</p>
                  </Button>
                </DialogActions>
              </Dialog>
            </table>

            {/*-------------- END OF Account Table ---------------- */}
          </div>
        </div>
      </div>

      {/*-------------- END OF LayoutBody ---------------- */}
    </div>
  );
}
