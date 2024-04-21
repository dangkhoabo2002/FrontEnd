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

const ServerReport = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedLog, setSelectedLog] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleRowClick = (log) => {
    setSelectedLog(log); // Update selectedLog state on row click
    handleOpen(); // Open modal automatically on click
  };
  return (
    <>
      <div className="">
        <div className="flex flex-row justify-between">
          <div className="info-title font-semibold mb-3">
            <p>Access History</p>
          </div>{" "}
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
              <th>Username</th>
              <th>Action</th>
              <th>Level</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {Logs.map((row) => (
              <tr key={row.date + row.time}>
                <td>{row.date}</td>
                <td>{row.time}</td>
                <td>{row.username}</td>
                <td>{row.action}</td>
                <td
                  className="text-[#637381]"
                  style={{
                    backgroundColor:
                      row.level === "Debug"
                        ? "#DDDDDD"
                        : row.level === "Info"
                        ? "#B7FFB9"
                        : row.level === "Warning"
                        ? "#FCFF53"
                        : row.level === "Error"
                        ? "#FFC266"
                        : row.level === "Critical"
                        ? "#FF6868"
                        : "",
                  }}
                >
                  {row.level}
                </td>
                <td>
                  <Button onClick={handleRowClick}>More</Button>
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
            <>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Text in a modal
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography>
              <Typography variant="body1">Date: {selectedLog.date}</Typography>
              <Typography variant="body1">Time: {selectedLog.time}</Typography>
            </>
          )}
        </Box>
      </Modal>
      <div className="resultOutput mt-10">
        <h1 className="text-2xl my-3">Output result</h1>
        <textarea
          className="w-full resize-none rounded-md p-4"
          style={{
            border: "1px solid #89A6CC",
            maxHeight: "8em",
            overflow: "auto",
          }}
        >
          Build successfully
        </textarea>
      </div>
    </>
  );
};

export default ServerReport;
