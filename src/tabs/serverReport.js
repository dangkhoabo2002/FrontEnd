import React, { useState, useEffect } from "react";
import Logs from "../data/listOfLog.json";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import DownloadIcon from "@mui/icons-material/Download";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import LastLog from "./serverReport/lastLog";
import SystemLog from "./serverReport/sysLog";
import UfwLog from "./serverReport/ufwLog";
import { useParams } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import toast, { Toaster } from "react-hot-toast";

const ServerReport = () => {
  const [open, setOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const [newUrl, setNewUrl] = useState("");

  const handleChooseDowloadLog = (option) => {
    if (option === "ufwLog") {
      setNewUrl("report_raw_log_ufw");
    } else if (option === "lastLog") {
      setNewUrl("report_raw_log_last");
    } else if (option === "sysLog") {
      setNewUrl("report_raw_syslog");
    }
    handleDowloadLog(newUrl);
  };

  const handleDowloadLog = async (url) => {
    toast.loading("Preparing data to dowload...");
    const token = localStorage.getItem("access_token");
    const urlac = `https://master-help-desk-back-end.vercel.app/server/${url}/${param.server_id}`;
    try {
      const response = await fetch(urlac, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Expose-Headers": "Content-Disposition",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }

      const contentDisposition = response.headers.get("Content-Disposition");
      let fileName = "default_filename.txt";

      if (contentDisposition) {
        const matches = contentDisposition.match(/filename="(.+)"/i);
        if (matches && matches[1]) {
          fileName = decodeURIComponent(matches[1]);
        }
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      const data = await response.json();
      if (response.status === 200) {
        toast.dismiss();
      } else if (response.status === 403) {
        toast.dismiss();
        toast.error(`Permission denied!`, {
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
        const errMessage = await data.message;
        toast.error(`${errMessage}!`, {
          style: {
            border: "1px solid #F85F60",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "red",
            fontWeight: "bolder",
          },
        });
      } else {
        toast.error("Something went wrong, please try again later!", {
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
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const param = useParams();

  // SYSTEM LOG
  const [sysLog, setSysLog] = useState();

  const handleGetSysLog = async () => {
    const url = `https://master-help-desk-back-end.vercel.app/server/report_log_syslog/${param.server_id}`;

    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        setSysLog(data);
        localStorage.setItem("sysLog", response.status);
      } else {
        localStorage.setItem("sysLog", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // LAST LOG
  const [lastLog, setLastLog] = useState();

  const handleGetLastLog = async () => {
    const url = `https://master-help-desk-back-end.vercel.app/server/report_log_last/${param.server_id}`;

    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        setLastLog(data);
        localStorage.setItem("lastLog", response.status);
      } else {
        localStorage.setItem("lastLog", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // UFW LOG
  const [ufwLog, setUfwLog] = useState();
  const handleGetUfwLog = async () => {
    const url = `https://master-help-desk-back-end.vercel.app/server/report_log_ufw/${param.server_id}`;

    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        setUfwLog(data);
        localStorage.setItem("ufwLog", response.status);
      } else {
        localStorage.setItem("ufwLog", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    handleGetSysLog();
    handleGetLastLog();
    handleGetUfwLog();
  }, []);

  return (
    <>
      <div className="">
        <Toaster position="bottom-right" reverseOrder={false} />

        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <div className="info-title font-semibold mb-3 ">
              <p>Access History</p>
            </div>
            <h1 className="mb-3">
              Review your server history within the last 3 days.
            </h1>
          </div>

          <div className="flex" style={{ alignItems: "center" }}>
            <Button
              startIcon={<DownloadIcon />}
              variant="contained"
              onClick={handleMenuClick}
              style={{ marginLeft: "10px" }}
              sx={{
                width: "120px",
                height: "30px",
                color: "white",
                bgcolor: "#3867A5",
                "&:hover": { bgcolor: "#264B7B" },
                fontSize: "14px",
                fontWeight: "normal",
                textTransform: "none",
              }}
            >
              Raw log
            </Button>
            <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleMenuClose}>
              <MenuItem
                sx={{
                  width: "120px",
                }}
                onClick={() => {
                  handleChooseDowloadLog("sysLog");
                }}
              >
                SysLog
              </MenuItem>
              <MenuItem
                sx={{
                  width: "120px",
                }}
                onClick={() => {
                  handleChooseDowloadLog("lastLog");
                }}
              >
                Last Log
              </MenuItem>
              <MenuItem
                sx={{
                  width: "120px",
                }}
                onClick={() => {
                  handleChooseDowloadLog("ufwLog");
                }}
              >
                UFW Log
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>
      <TabContext value={value}>
        <Box>
          <Box
            sx={{
              display: "flex",
              borderBottom: "1px solid #ccc",
              overflow: "hidden",
            }}
          >
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              sx={{
                border: "1px solid #ccc",
                borderBottom: "none",
                borderRadius: "4px 4px 0 0",
                ".MuiTabs-indicator": {
                  display: "none",
                },
                ".MuiTab-root": {
                  paddingRight: "30px",
                  paddingLeft: "30px",
                  zIndex: 1,
                  textTransform: "none",
                },
                ".Mui-selected": {
                  backgroundColor: "white",
                  boxShadow: "inset 0 -1px 0 white",
                  fontWeight: "bold",
                  transition: "background-color 0.3s ease",
                },
              }}
            >
              <Tab label="SysLog" value="1" disableRipple />
              <Tab label="Last Log" value="2" disableRipple />
              <Tab label="UFW Log" value="3" disableRipple />
            </TabList>
          </Box>
          <Box
            sx={{
              border: "1px solid #ccc",
              borderRadius: "0 0 4px 4px",
              marginTop: "-1px",
              position: "relative",
              top: "-1px",
            }}
          >
            <TabPanel sx={{ p: 0 }} value="1">
              <SystemLog sysLog={sysLog} />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value="2">
              <LastLog lastLog={lastLog} />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value="3">
              <UfwLog ufwLog={ufwLog} />
            </TabPanel>
          </Box>
        </Box>
      </TabContext>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {selectedLog && (
            <Box sx={modalContentStyle}>
              <Typography
                id="modal-modal-title"
                variant="h4"
                component="h2"
                sx={{ marginBottom: 2 }}
              >
                Log Details
              </Typography>
              <Box sx={{ width: "100%", textAlign: "left" }}>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                  Date: {selectedLog.date}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                  Time: {selectedLog.time}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                  Host: {selectedLog.host}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                  Log: {selectedLog.log}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                  Type: {selectedLog.type}
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default ServerReport;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const modalContentStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};
