import React, { useState } from "react";
import Logs from "../data/listOfLog.json";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import DownloadIcon from "@mui/icons-material/Download";

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

const ServerReport = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedLog, setSelectedLog] = useState({});

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleRowClick = (log) => {
    setSelectedLog(log);
    handleOpen();
  };

  return (
    <>
      <div className="">
        <div className="flex flex-row justify-between">
          <div className="info-title font-semibold mb-3">
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
      <div
        className="bg-[white] mt-4 rounded-md px-8 py-6  shadow-lg"
        style={{ border: "1px solid #89A6CC" }}
      >
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Host</th>
              <th>Logs</th>
              <th>Type</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {Logs.map((row) => (
              <tr key={row.date + row.time}>
                <td>{row.date}</td>
                <td>{row.time}</td>
                <td>{row.host}</td>
                <td>{row.log}</td>
                <td
                  className="text-[#637381]"
                  style={{
                    backgroundColor:
                      row.type === "Debug"
                        ? "#DDDDDD"
                        : row.type === "Info"
                        ? "#B7FFB9"
                        : row.type === "Warning"
                        ? "#FCFF53"
                        : row.type === "Error"
                        ? "#FFC266"
                        : row.type === "Critical"
                        ? "#FF6868"
                        : "",
                  }}
                >
                  {row.type}
                </td>
                <td>
                  <Button onClick={() => handleRowClick(row)}>More</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {selectedLog && (
            <Box sx={modalContentStyle}>
              <Typography id="modal-modal-title" variant="h4" component="h2" sx={{ marginBottom: 2 }}>
                Log Details
              </Typography>
              <Box sx={{ width: "100%", textAlign: "left" }}>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>Date: {selectedLog.date}</Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>Time: {selectedLog.time}</Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>Host: {selectedLog.host}</Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>Logs: {selectedLog.log}</Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>Type: {selectedLog.type}</Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default ServerReport;
