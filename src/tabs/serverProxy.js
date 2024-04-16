import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Box,
  IconButton,
  Grid,
  Typography,
  FormControl,
  OutlinedInput,
} from "@mui/material";
import "../css/serverProxy.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

// ICONS MUI

import CloseIcon from "@mui/icons-material/Close";
export default function ServerProxy(serverId) {
  // ADD PROXY
  const [isOpenAddProxy, setIsOpenAddProxy] = useState(false);
  const [addProxyData, setAddProxyData] = useState({
    protocol: "",
    detail: "",
  });

  const handleOpenAddProxy = () => {
    setIsOpenAddProxy(true);
  };

  const handleCloseAddProxy = () => {
    setIsOpenAddProxy(false);
  };

  const handleChangeAddInput = (prop) => (event) => {
    setAddProxyData({ ...addProxyData, [prop]: event.target.value });
  };

  const handleAddProxyAPI = async () => {
    const editUrl = `http://127.0.0.1:5000/server/add_proxy/${serverId.serverId}`;
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(editUrl, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          protocol: addProxyData.protocol,
          detail: addProxyData.detail,
        }),
      });
      if (response.status === 200) {
        handleGetProxy();
        handleCloseAddProxy();
      } else {
        alert("Add Fail");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
    }
  };

  // DELETE PROXY
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [currentDeleteProxy, setcurrentDeleteProxy] = useState();
  const [deleteProxyData, setDeleteProxyData] = useState({
    protocol: "",
    detail: "",
  });

  const handleOpenDeleteProxy = (data) => {
    setcurrentDeleteProxy(data);
    setIsOpenDelete(true);
    console.log("data", currentDeleteProxy);
  };

  const handleCloseDeleteProxy = () => {
    setIsOpenDelete(false);
  };

  const handleDeleteProxy = () => {
    handleDeleteProxyAPI();
    setIsOpenDelete(false);
  };

  const handleDeleteProxyAPI = async () => {
    const editUrl = `http://127.0.0.1:5000/server/delete_proxy/${serverId.serverId}`;
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(editUrl, {
        method: "DELETE",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          protocol: currentDeleteProxy.protocol,
          detail: currentDeleteProxy.details,
        }),
      });
      if (response.status === 200) {
        handleGetProxy();
      } else {
        alert("Delete Fail");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
    }
  };

  // EDIT PROXY POP UP
  const [openEditProxy, setOpenEditProxy] = useState(false);
  const [editProxyData, setEditProxyData] = useState({
    new_domain: "",
    new_port: "",
  });

  const [currentProxy, setCurrentProxy] = useState();

  const handleEditProxy = () => {
    handleEditProxyAPI();
    handleCloseEditProxy();
    setCurrentProxy("");
  };

  const handleOpenEditProxy = (selectedProxy) => {
    setCurrentProxy(selectedProxy);
    setOpenEditProxy(true);
  };

  const handleCloseEditProxy = () => {
    setOpenEditProxy(false);
  };

  const handleChangeEditInput = (prop) => (event) => {
    setEditProxyData({ ...editProxyData, [prop]: event.target.value });
  };

  const handleEditProxyAPI = async () => {
    const editUrl = `http://127.0.0.1:5000/server/update_proxy/${serverId.serverId}`;
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(editUrl, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          protocol: currentProxy.protocol,
          detail: currentProxy.details,
          new_domain: editProxyData.new_domain,
          new_port: editProxyData.new_port,
        }),
      });
      if (response.status === 200) {
        handleGetProxy();
      } else {
        console.log("Update Fail");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
    }
  };

  // GET Proxy
  const [proxyData, setProxyData] = useState("");

  const handleGetProxy = async () => {
    const getUrl = `http://127.0.0.1:5000/server/get_all_proxy/${serverId.serverId}`;
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(getUrl, {
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
        const proxyGet = await response.json();
        setProxyData(proxyGet);
      } else {
        console.log("Update Fail");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
    }
  };
  useEffect(() => {
    handleGetProxy();
  }, []);

  // CSS
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
    <div>
      <div className="mb-3">
        <div className="info-title font-semibold my-3">
          <p>Proxy Server Setting</p>
        </div>
        <Button
          variant="contained"
          onClick={handleOpenAddProxy}
          sx={{
            color: "white",
            bgcolor: "#3867A5",
            "&:hover": { bgcolor: "#2A4D7B" },
          }}
        >
          Add Proxy
        </Button>
      </div>
      <div className="server_des mb-3">
        <div>
          {/* Replace with your actual table implementation */}
          <div
            className="bg-[white] mt-4 rounded-md px-8 pb-8 shadow-lg"
            style={{ border: "1px solid #89A6CC" }}
          >
            <table className="w-full">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Protocol</th>
                  <th>Detail</th>
                  <th colSpan={2}>Action</th>
                </tr>
              </thead>
              <tbody>
                {proxyData &&
                  proxyData?.map((proxy, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{proxyData[index].protocol}</td>
                      <td>{proxyData[index].details}</td>
                      <td>
                        <IconButton
                          aria-label="edit"
                          onClick={() => handleOpenEditProxy(proxyData[index])}
                        >
                          <EditIcon />
                        </IconButton>
                      </td>
                      <td>
                        <IconButton
                          aria-label="delete"
                          onClick={() =>
                            handleOpenDeleteProxy(proxyData[index])
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/*Modal of Update Proxy */}
          <Modal
            keepMounted
            open={openEditProxy}
            onClose={handleCloseEditProxy}
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
                    UPDATE PROXY
                  </p>
                  <IconButton onClick={handleCloseEditProxy}>
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
                    New domain:
                  </Typography>
                </Grid>
                <Grid item xs={12} md={9}>
                  <FormControl fullWidth variant="outlined">
                    <OutlinedInput
                      inputProps={{
                        "aria-label": "New domain",
                      }}
                      onChange={handleChangeEditInput("new_domain")}
                      value={editProxyData.new_domain}
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
                    New port:
                  </Typography>
                </Grid>
                <Grid item xs={12} md={9}>
                  <FormControl fullWidth variant="outlined">
                    <OutlinedInput
                      inputProps={{
                        "aria-label": "New port",
                      }}
                      onChange={handleChangeEditInput("new_port")}
                      value={editProxyData.new_port}
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
                    <Button onClick={handleCloseEditProxy}>
                      <Typography variant="button" style={{ color: "red" }}>
                        Cancel
                      </Typography>
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
                      onClick={handleEditProxy}
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

          {/*Modal of Delete Proxy */}
          <Dialog
            open={isOpenDelete}
            onClose={handleCloseDeleteProxy}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">DELETE PROXY</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure to delete this proxy?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDeleteProxy}>Disagree</Button>
              <Button onClick={handleDeleteProxy}>Agree</Button>
            </DialogActions>
          </Dialog>

          {/*Modal of Add Proxy */}
          <Modal
            keepMounted
            open={isOpenAddProxy}
            onClose={handleCloseAddProxy}
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
                    UPDATE PROXY
                  </p>
                  <IconButton onClick={handleCloseAddProxy}>
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
                    Protocol:
                  </Typography>
                </Grid>
                <Grid item xs={12} md={9}>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={addProxyData.protocol}
                      onChange={handleChangeAddInput("protocol")}
                    >
                      <MenuItem value={"ftp_proxy"}>ftp_proxy</MenuItem>
                      <MenuItem value={"http_proxy"}>http_proxy</MenuItem>
                      <MenuItem value={"https_proxy"}>https_proxy</MenuItem>
                    </Select>
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
                    Detail:
                  </Typography>
                </Grid>
                <Grid item xs={12} md={9}>
                  <FormControl fullWidth variant="outlined">
                    <OutlinedInput
                      inputProps={{
                        "aria-label": "Detail",
                      }}
                      onChange={handleChangeAddInput("detail")}
                      value={addProxyData.detail}
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
                    <Button onClick={handleCloseAddProxy}>
                      <Typography variant="button" style={{ color: "red" }}>
                        Cancel
                      </Typography>
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
                      onClick={handleAddProxyAPI}
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
      </div>
    </div>
  );
}
