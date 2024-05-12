import React, { useEffect, useState } from "react";
import SidebarAdmin from "../components/sidebarAdmin";
import NavigationAdmin from "../components/navAdmin";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import "../css/adminBilling.css";
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
import InputAdornment from "@mui/material/InputAdornment";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import toast from "react-hot-toast";

export default function AdminPackageManagement() {
  const [Package, setPackageData] = useState([]);

  const [openAddPackage, setOpenAddPackage] = useState(false);
  const [packageAdd, setPackageAdd] = useState({
    package_id: "",
    package_name: "",
    description: "",
    duration: "",
    price: "",
    slot_number: "",
    slot_server: "",
  });

  const clickOpenAddPackage = () => {
    setOpenAddPackage(true);
  };
  const clickCloseAddPackage = () => {
    setOpenAddPackage(false);
    setPackageAdd({
      package_id: "",
      package_name: "",
      description: "",
      duration: "",
      price: "",
      slot_number: "",
      slot_server: "",
    });
  };

  // GET PKG
  const handleGetPackage = async () => {
    const packageUrl = `http://127.0.0.1:5000/package/get`;
    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch(packageUrl, {
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
        setPackageData(data);
      } else {
        console.error("Failed to fetch package data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // ADD PKG
  const handleAddPackage = async () => {
    if (
      packageAdd.package_name === "" ||
      packageAdd.duration === "" ||
      packageAdd.price === "" ||
      packageAdd.slot_number === "" ||
      packageAdd.slot_server === ""
    ) {
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
      const positiveIntegerRegex = /^[1-9]\d*$/;
      const priceRegex = /^\d+(\.\d{1,2})?$/;

      // Check if slot number is a positive integer
      if (!positiveIntegerRegex.test(packageAdd.slot_number)) {
        toast.error("Slot number greater than 0 or at least 1.", {
          style: {
            border: "1px solid #F85F60",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "red",
            fontWeight: "bolder",
          },
        });
        return;
      }

      // Check if slot server is a positive integer
      if (!positiveIntegerRegex.test(packageAdd.slot_server)) {
        toast.error("Slot server greater than 0 or at least 1.", {
          style: {
            border: "1px solid #F85F60",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "red",
            fontWeight: "bolder",
          },
        });
        return;
      }

      // Check if duration is a positive integer
      if (!positiveIntegerRegex.test(packageAdd.duration)) {
        toast.error("Duration greater than 0 or at least 1.", {
          style: {
            border: "1px solid #F85F60",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "red",
            fontWeight: "bolder",
          },
        });
        return;
      }

      // Check if price is a positive decimal with two decimal places
      if (!priceRegex.test(packageAdd.price)) {
        toast.error(
          "Price must be a positive decimal with two decimal places!",
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
        return;
      }
      try {
        toast.loading("Adding new package...");
        const customerUrl = `http://127.0.0.1:5000/package/add`;
        const token = localStorage.getItem("access_token");
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
            package_name: packageAdd.package_name,
            description: packageAdd.description,
            duration: packageAdd.duration,
            price: packageAdd.price,
            slot_number: packageAdd.slot_number,
            slot_server: packageAdd.slot_server,
            status: true,
          }),
        });
        if (response.status === 201) {
          toast.dismiss();
          toast.success("New package create successfully.", {
            style: {
              border: "1px solid #37E030",
              maxWidth: "900px",
              padding: "16px 24px",
              color: "green",
              fontWeight: "bolder",
            },
          });
          handleGetPackage();
          clickCloseAddPackage();
        } else if (response.status === 500) {
          toast.dismiss();

          toast.error("Failed to add package!", {
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
        } else if (response.status === 401) {
          toast.dismiss();

          toast.error("401!", {
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

  // DELETE PKG

  const [openDelete, setOpenDelete] = useState(false);
  const [packageId_del, setPackageId_del] = useState();

  const clickOpenDelete = (package_id) => {
    setOpenDelete(true);
    setPackageId_del(package_id);
  };
  const clickCloseDelete = () => {
    setOpenDelete(false);
    setPackageId_del("");
  };

  const handleDeleteRole = async () => {
    const customerUrl = `http://127.0.0.1:5000/package/delete/${packageId_del}`;
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
        handleGetPackage();
      } else if (response.status === 500) {
        toast.dismiss();

        toast.error("Failed to delete package!", {
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

        toast.error("Error!", {
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

  // EDIT package

  const [openEdit, setOpenEdit] = useState(false);
  const [packageId_edit, setPackageId_edit] = useState();

  const [currentEditPackage, setCurrentEditPackage] = useState({
    package_name: "",
    description: "",
    duration: "",
    price: "",
    slot_number: "",
    slot_server: "",
  });

  const handleClickOpenEditPackage = (package_id) => {
    setPackageId_edit(package_id);
    handleGetPackageInfo(package_id);
    setOpenEdit(true);
  };
  const handleCloseEditPackage = () => {
    setCurrentEditPackage({
      package_name: "",
      description: "",
      duration: "",
      price: "",
      slot_number: "",
      slot_server: "",
    });
    setPackageId_edit("");
    setOpenEdit(false);
  };

  const handleChangeEditPackage = (prop) => (event) => {
    setCurrentEditPackage({
      ...currentEditPackage,
      [prop]: event.target.value,
    });
  };

  const handleEditPackage = async () => {
    if (packageId_edit) {
      const editUrl = `http://127.0.0.1:5000/package/update/${packageId_edit}`;
      const token = localStorage.getItem("access_token");

      if (
        currentEditPackage.package_name === "" ||
        currentEditPackage.price === "" ||
        currentEditPackage.description === "" ||
        currentEditPackage.duration === "" ||
        currentEditPackage.slot_number === "" ||
        currentEditPackage.slot_server === ""
      ) {
        toast.error("You need to input all fields to continue!", {
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
              package_name: currentEditPackage.package_name,
              description: currentEditPackage.description,
              duration: currentEditPackage.duration,
              price: currentEditPackage.price,
              slot_number: currentEditPackage.slot_number,
              slot_server: currentEditPackage.slot_server,
              status: true,
            }),
          });
          if (response.status === 200) {
            toast.dismiss();
            toast.success("Edit package sucessfully.", {
              style: {
                border: "1px solid #37E030",
                maxWidth: "900px",
                padding: "16px 24px",
                color: "green",
                fontWeight: "bolder",
              },
            });
            handleGetPackage();
            setCurrentEditPackage({
              package_name: "",
              description: "",
              duration: "",
              price: "",
              slot_number: "",
              slot_server: "",
              status: true,
            });
            handleCloseEditPackage();
          } else if (response.status === 400) {
            toast.dismiss();
            toast.error("Missing some fields, please try again!", {
              style: {
                border: "1px solid #F85F60",
                maxWidth: "900px",
                padding: "16px 24px",
                color: "red",
                fontWeight: "bolder",
              },
            });
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
          } else if (response.status === 500) {
            toast.dismiss();

            toast.error("Failed to update package!", {
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
        } finally {
        }
      }
    } else {
      toast.error("Please select a package!", {
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

  const handleGetPackageInfo = async (package_id) => {
    if (package_id) {
      toast.loading("In processing...");
      const editUrl = `http://127.0.0.1:5000/package/get/${package_id}`;
      const token = localStorage.getItem("access_token");

      try {
        const response = await fetch(editUrl, {
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
          setCurrentEditPackage({
            package_name: data.package_name,
            description: data.description,
            duration: data.duration,
            price: data.price,
            slot_number: data.slot_number,
            slot_server: data.slot_server,
          });
          toast.dismiss();
        } else if (response.status === 400) {
          toast.dismiss();
          toast.error("Missing some fields, please try again!", {
            style: {
              border: "1px solid #F85F60",
              maxWidth: "900px",
              padding: "16px 24px",
              color: "red",
              fontWeight: "bolder",
            },
          });
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
        } else if (response.status === 500) {
          toast.dismiss();

          toast.error("Failed to update package!", {
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
      } finally {
      }
    } else {
      toast.error("Please select a package!", {
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
  const [token, setToken] = useState();

  const checkToken = () => {
    const isToken = localStorage.getItem("checkAdmin");
    setToken(isToken);
  };

  useEffect(() => {
    handleGetPackage();
    checkToken();
  }, []);

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
                  width: "150px",
                  color: "white",
                  bgcolor: "#3867A5",
                  "&:hover": { bgcolor: "#2A4D7B" },
                }}
                onClick={clickOpenAddPackage}
              >
                Add Package
              </Button>

              {/*-------------- Billing Table ---------------- */}

              <div
                className="bg-white mt-4 rounded-md px-8 pb-8 shadow-md"
                style={{ border: "1px solid #89A6CC" }}
              >
                <table class="table-auto w-full ">
                  <thead>
                    <tr>
                      <th>NAME</th>
                      <th>PRICE</th>
                      <th>DESCRIPTION</th>
                      <th>DURATION</th>
                      <th>SLOT NUMBER</th>
                      <th>SLOT SERVER</th>
                      <th>Status</th>
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
                    {Package.map((pkg) => (
                      <tr key={pkg.package_id}>
                        <td>{pkg.package_name}</td>
                        <td>{pkg.price}đ</td>
                        <td>{pkg.description}</td>
                        <td>{pkg.duration}</td>
                        <td>{pkg.slot_number}</td>
                        <td>{pkg.slot_server}</td>
                        <td>
                          <td>
                            <td>
                              <div
                                style={{
                                  backgroundColor: pkg.status
                                    ? "#6EC882"
                                    : "#8E8E8E",
                                  color: "white",
                                  textAlign: "center",
                                  borderRadius: "100px",
                                  padding: "5px 15px",
                                  fontSize: "14px",
                                  fontWeight: "normal",
                                  textTransform: "none",
                                }}
                              >
                                {pkg.status ? "Active" : "Inactive"}
                              </div>
                            </td>
                          </td>
                        </td>

                        <td style={{ padding: "6px 0px" }}>
                          <IconButton
                            aria-label="delete"
                            onClick={() => clickOpenDelete(pkg?.package_id)}
                          >
                            <DeleteIcon />
                          </IconButton>

                          <IconButton
                            aria-label="edit"
                            onClick={() =>
                              handleClickOpenEditPackage(pkg?.package_id)
                            }
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

          {/*-------------- ADD NEW PACKAGE ---------------- */}
          <Dialog open={openAddPackage} onClose={clickCloseAddPackage}>
            <DialogTitle>Add new package</DialogTitle>
            <DialogContent>
              <DialogContentText className="pb-4">
                Add new package into MHD system.
              </DialogContentText>
              <TextField
                required
                margin="dense"
                id="package_name"
                name="package_name"
                label="Package name"
                type="text"
                fullWidth
                variant="outlined"
                value={packageAdd.package_name}
                onChange={(e) =>
                  setPackageAdd({ ...packageAdd, package_name: e.target.value })
                }
              />
              <TextField
                required
                margin="dense"
                id="price"
                name="price"
                label="Price"
                type="number"
                fullWidth
                variant="outlined"
                value={packageAdd.price}
                onChange={(e) =>
                  setPackageAdd({
                    ...packageAdd,
                    price: e.target.value.replace(/[^\d.]/g, ""),
                  })
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
              <TextField
                required
                margin="dense"
                id="duration"
                name="duration"
                label="Duration"
                type="number"
                fullWidth
                variant="outlined"
                value={packageAdd.duration}
                onChange={(e) =>
                  setPackageAdd({ ...packageAdd, duration: e.target.value })
                }
                inputProps={{
                  min: 1,
                  max: 4,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">Month</InputAdornment>
                  ),
                }}
              />
              <TextField
                required
                margin="dense"
                id="slot_number"
                name="slot_number"
                label="Slot number"
                type="number"
                fullWidth
                variant="outlined"
                value={packageAdd.slot_number}
                onChange={(e) =>
                  setPackageAdd({ ...packageAdd, slot_number: e.target.value })
                }
              />
              <TextField
                required
                margin="dense"
                id="slot_server"
                name="slot_server"
                label="Slot server"
                type="number"
                fullWidth
                variant="outlined"
                value={packageAdd.slot_server}
                onChange={(e) =>
                  setPackageAdd({ ...packageAdd, slot_server: e.target.value })
                }
              />
              <TextField
                required
                id="description"
                name="description"
                label="Description"
                multiline
                rows={4}
                defaultValue="Default Value"
                margin="dense"
                type="text"
                fullWidth
                variant="outlined"
                value={packageAdd.description}
                onChange={(e) =>
                  setPackageAdd({ ...packageAdd, description: e.target.value })
                }
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={clickCloseAddPackage}>Cancel</Button>
              <Button onClick={handleAddPackage}>Confirm</Button>
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
          <Dialog open={openEdit} onClose={handleCloseEditPackage}>
            <DialogTitle>Update package</DialogTitle>
            <DialogContent>
              <DialogContentText className="pb-4">
                Edit package's information.
              </DialogContentText>
              <TextField
                required
                margin="dense"
                id="pkg"
                name="pkg"
                label="Package name"
                type="text"
                fullWidth
                variant="outlined"
                onChange={handleChangeEditPackage("package_name")}
                value={currentEditPackage.package_name}
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
                onChange={handleChangeEditPackage("description")}
                value={currentEditPackage.description}
              />
              <TextField
                required
                margin="dense"
                id="pkg"
                name="pkg"
                label="Duration"
                type="text"
                fullWidth
                variant="outlined"
                onChange={handleChangeEditPackage("duration")}
                value={currentEditPackage.duration}
              />
              <TextField
                required
                margin="dense"
                id="pkg"
                name="pkg"
                label="Price"
                type="text"
                fullWidth
                variant="outlined"
                onChange={handleChangeEditPackage("price")}
                value={currentEditPackage.price}
              />
              <TextField
                required
                margin="dense"
                id="pkg"
                name="pkg"
                label="Slot number"
                type="text"
                fullWidth
                variant="outlined"
                onChange={handleChangeEditPackage("slot_number")}
                value={currentEditPackage.slot_number}
              />
              <TextField
                required
                margin="dense"
                id="pkg"
                name="pkg"
                label="Slot server"
                type="text"
                fullWidth
                variant="outlined"
                onChange={handleChangeEditPackage("slot_server")}
                value={currentEditPackage.slot_server}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseEditPackage}>Cancel</Button>
              <Button onClick={handleEditPackage}>Confirm</Button>
            </DialogActions>
          </Dialog>

          {/*-------------- END OF Billing Table ---------------- */}
        </div>
      </div>

      {/*-------------- END OF LayoutBody ---------------- */}
    </div>
  );
}
