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
  TextField,
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
import LinearProgress from "@mui/material/LinearProgress";

import toast, { Toaster } from "react-hot-toast";

// ICONS MUI

import CloseIcon from "@mui/icons-material/Close";
import { DataGrid } from "@mui/x-data-grid";

export default function ServerProxy(serverId) {
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  // OUTPUT

  const [output, setOutput] = useState({
    status: "",
    messages: "",
    error: "",
  });

  console.log(output);
  // ADD PROXY
  const [isOpenAddProxy, setIsOpenAddProxy] = useState(false);
  const [addProxyData, setAddProxyData] = useState({
    protocol: "",
    domain: "",
    port: "",
  });

  const handleOpenAddProxy = () => {
    setIsOpenAddProxy(true);
  };

  const handleCloseAddProxy = () => {
    setIsOpenAddProxy(false);
    setAddProxyData({ protocol: "", domain: "", port: "" });
  };

  const handleAddProxy = () => {
    if (addProxyData.detail === "" || addProxyData.protocol === "") {
      toast.error("Please enter proxy information first!", {
        style: {
          border: "1px solid #FF5733",
          maxWidth: "900px",
          padding: "16px 24px",
          color: "red",
          fontWeight: "bolder",
        },
      });
    } else {
      handleAddProxyAPI();
    }
  };

  const handleChangeAddInput = (prop) => (event) => {
    setAddProxyData({ ...addProxyData, [prop]: event.target.value });
  };

  const handleAddProxyAPI = async () => {
    if (
      addProxyData.protocol === "" ||
      addProxyData.domain === "" ||
      addProxyData.port === ""
    ) {
      toast.error("Please input your data!", {
        style: {
          border: "1px solid #FF5733",
          maxWidth: "900px",
          padding: "16px 24px",
          color: "#FF5733",
          fontWeight: "bolder",
        },
      });
    } else {
      setLoading2(true);
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
            domain: addProxyData.domain,
            port: addProxyData.port,
          }),
        });
        if (response.status === 200) {
          handleCloseAddProxy();
          handleGetProxy();
          setAddProxyData({ protocol: "", domain: "", port: "" });
          toast.success("Proxy added.", {
            style: {
              border: "1px solid #37E030",
              maxWidth: "900px",
              padding: "16px 24px",
              color: "green",
              fontWeight: "bolder",
            },
          });
        } else if (response.status === 403) {
          toast.error("Please enter proxy information first!", {
            style: {
              border: "1px solid #F85F60",
              maxWidth: "900px",
              padding: "16px 24px",
              color: "red",
              fontWeight: "bolder",
            },
          });
        } else if (response.status === 500) {
          toast.error(`Detail must be formated: "http(s)://domain:port"`, {
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
      } finally {
        setLoading2(false);
      }
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
  };

  const handleCloseDeleteProxy = () => {
    setIsOpenDelete(false);
  };

  const handleDeleteProxy = () => {
    handleDeleteProxyAPI();
    setIsOpenDelete(false);
  };

  const handleDeleteProxyAPI = async () => {
    setLoading2(true);
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
      const proxyOutput = await response.json();
      setOutput({
        status: proxyOutput.status,
        messages: proxyOutput.messages,
        error: proxyOutput.stderr,
      });
      if (response.status === 200) {
        toast.success("Delete successfully.", {
          style: {
            border: "1px solid #37E030",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "green",
            fontWeight: "bolder",
          },
        });
        handleGetProxy();
      } else {
        toast.error("Fail to delete Proxy!", {
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
      setLoading2(false);
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
    if (editProxyData.new_port === "" || editProxyData.new_domain === "") {
      toast.error("The field can not be empty!", {
        style: {
          border: "1px solid #FF5733",
          maxWidth: "900px",
          padding: "16px 24px",
          color: "red",
          fontWeight: "bolder",
        },
      });
    } else {
      handleEditProxyAPI();
      handleCloseEditProxy();
      setCurrentProxy("");
    }
  };

  const handleOpenEditProxy = (selectedProxy) => {
    setCurrentProxy(selectedProxy);
    setOpenEditProxy(true);
  };

  const handleCloseEditProxy = () => {
    setOpenEditProxy(false);
    setEditProxyData({
      new_domain: "",
      new_port: "",
    });
  };

  const handleChangeEditInput = (prop) => (event) => {
    setEditProxyData({ ...editProxyData, [prop]: event.target.value });
  };

  const handleEditProxyAPI = async () => {
    setLoading2(true);
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
      const proxyOutput = await response.json();
      setOutput({
        status: proxyOutput.status,
        messages: proxyOutput.messages,
        error: proxyOutput.stderr,
      });
      if (response.status === 200) {
        toast.success("Proxy updated.", {
          style: {
            border: "1px solid #37E030",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "green",
            fontWeight: "bolder",
          },
        });
        handleGetProxy();
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
      } else if (response.status === 500) {
        toast.error("No data for server!", {
          style: {
            border: "1px solid #F85F60",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "red",
            fontWeight: "bolder",
          },
        });
      } else {
        toast.error("Something wrong, please try again!", {
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
      setLoading2(false);
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

      const proxyGet = await response.json();
      setOutput({
        status: proxyGet.status,
        messages: proxyGet.messages,
        error: proxyGet.stderr,
      });

      if (response.status === 200) {
        setProxyData(proxyGet);
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
      } else if (response.status === 500) {
        toast.error("No data for server!", {
          style: {
            border: "1px solid #F85F60",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "red",
            fontWeight: "bolder",
          },
        });
      } else {
        toast.error("Something wrong, please try again!", {
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
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
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
      <Toaster position="bottom-right" reverseOrder={false} />
      <div className="mb-3">
        <div className="info-title font-semibold pb-3 flex flex-row justify-between">
          <p>Proxy Server Setting</p>
        </div>
        {loading && (
          <Box
            sx={{ width: "100%", paddingBottom: "22px", paddingTop: "22px" }}
          >
            <LinearProgress />
          </Box>
        )}
        {loading2 && (
          <Box
            sx={{
              width: "100%",
              paddingBottom: "22px",
              paddingTop: "22px",
            }}
          >
            <LinearProgress />
          </Box>
        )}
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
      <div className="server_des mb-3 ">
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
                    <tr key={proxy.protocol}>
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
                    ADD PROXY
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
                    Domain:
                  </Typography>
                </Grid>
                <Grid item xs={12} md={9}>
                  <FormControl fullWidth variant="outlined">
                    <OutlinedInput
                      placeholder="yourdomain.enw"
                      onChange={handleChangeAddInput("domain")}
                      value={addProxyData.detail}
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
                    Port:
                  </Typography>
                </Grid>
                <Grid item xs={12} md={9}>
                  <FormControl fullWidth variant="outlined">
                    <OutlinedInput
                      placeholder="3022"
                      onChange={handleChangeAddInput("port")}
                      value={addProxyData.port}
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
                      onClick={handleAddProxy}
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

      <div className="resultOutput mt-10">
        <h1 className="text-2xl my-3">Output result</h1>
        <div
          style={{
            padding: "16px",
            border: "1px solid #89A6CC",
            borderRadius: "8px",
            backgroundColor: "#F7F9FC",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            margin: "0 auto",
            textAlign: "left",
          }}
        >
          <pre
            className="text-gray-700 dark:text-gray-400"
            style={{
              whiteSpace: "pre-wrap",
              marginBottom: "8px",
              fontWeight: "bold",
              color: "#3867A5",
            }}
          >
            Response status:
            {output.status === undefined ? " None" : ` ${output.status}`}
          </pre>
          <pre
            className="text-gray-700 dark:text-gray-400"
            style={{
              whiteSpace: "pre-wrap",
              marginBottom: "8px",
              fontWeight: "bold",
              color: "#3867A5",
            }}
          >
            Message:
            {output.messages === undefined ? " None" : ` ${output.messages}`}
          </pre>
          <pre
            className="text-gray-700 dark:text-gray-400"
            style={{
              whiteSpace: "pre-wrap",
              marginBottom: "8px",
              fontWeight: "bold",
              color: "#3867A5",
            }}
          >
            Error: {output.error === undefined ? " None" : ` ${output.error}`}
          </pre>
        </div>
      </div>
    </div>
  );
}
