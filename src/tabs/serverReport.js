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

const ServerReport = () => {
  const [open, setOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState({});

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const param = useParams();

  // SYSTEM LOG

  const [sysLog, setSysLog] = useState();

  const handleGetSysLog = async () => {
    const url = `http://127.0.0.1:5000/server/report_log_syslog/${param.server_id}`;

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
      } else if (response.status === 400) {
        localStorage.setItem("sysLog", response.status);
      } else if (response.status === 403) {
        localStorage.setItem("sysLog", response.status);
      } else if (response.status === 500) {
        localStorage.setItem("sysLog", response.status);
      } else {
        localStorage.setItem("sysLog", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
    }
  };

  // LAST LOG
  const [lastLog, setLastLog] = useState();

  const handleGetLastLog = async () => {
    const url = `http://127.0.0.1:5000/server/report_log_last/${param.server_id}`;

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
      } else if (response.status === 400) {
        localStorage.setItem("lastLog", response.status);
      } else if (response.status === 403) {
        localStorage.setItem("lastLog", response.status);
      } else if (response.status === 500) {
        localStorage.setItem("lastLog", response.status);
      } else {
        localStorage.setItem("lastLog", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
    }
  };

  // UFW LOG
  const [ufwLog, setUfwLog] = useState();

  const handleGetUfwLog = async () => {
    const url = `http://127.0.0.1:5000/server/report_log_ufw/${param.server_id}`;

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
      } else if (response.status === 400) {
        localStorage.setItem("ufwLog", response.status);
      } else if (response.status === 403) {
        localStorage.setItem("ufwLog", response.status);
      } else if (response.status === 500) {
        localStorage.setItem("ufwLog", response.status);
      } else {
        localStorage.setItem("ufwLog", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
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
        <div className="flex flex-row justify-between">
          <div className="info-title font-semibold mb-3 ">
            <p>Access History</p>
          </div>

          <Button
            startIcon={<DownloadIcon />}
            variant="contained"
            // onClick={}
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
        </div>
        <h1 className="mb-3">
          Review your server history within the last 3 days.
        </h1>
      </div>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="SysLog" value="1" />
            <Tab label="Last Log" value="2" />
            <Tab label="UFW Log " value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <SystemLog sysLog={sysLog} />
        </TabPanel>
        <TabPanel value="2">
          <LastLog lastLog={lastLog} />
        </TabPanel>
        <TabPanel value="3">
          <UfwLog ufwLog={ufwLog} />
        </TabPanel>
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
