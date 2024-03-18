import React, { useState } from "react";
import Logs from "../data/listOfLog.json";
import Button from "@mui/material/Button";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

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
          <h1 className="text-2xl">Access history</h1>
          <Button variant="contained">Dowload raw file</Button>
        </div>
        <h1>Review your server history within the last 3 days.</h1>
      </div>
      <table className="table border-2">
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
              <td>{row.level}</td>
              <td>
                <Button onClick={handleRowClick}>More</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
    </>
  );
};

export default ServerReport;
