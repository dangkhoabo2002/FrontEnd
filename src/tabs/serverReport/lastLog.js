import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Pagination } from "@mui/material";

export default function LastLog(rawLastLog) {
  const [page, setPage] = useState(0); // Page number (starts from 0)
  const rowsPerPage = 10; // Number of rows per page

  const columns = [
    {
      field: "time",
      headerName: "Date",
      width: 200,
    },
    { field: "log", headerName: "Log", width: 2000, flex: 1 },
  ];

  // HANDLE RAW DATA
  const [lastLog, setLastLog] = useState([]);
  const dataNew = rawLastLog.sysLog?.lines;

  console.log(rawLastLog);

  useEffect(() => {}, []);
  return (
    <div>
      {/* <div
        style={{ height: "auto", border: "1px solid #89A6CC" }}
        a
        className="bg-[white] rounded-md shadow-lg"
      >
        {sysLog?.length > 0 && (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Time</TableCell>
                    <TableCell>Log</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sysLog
                    .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                    .map((row) => (
                      <TableRow key={row.time}>
                        <TableCell>{row.time}</TableCell>
                        <TableCell>{row.log}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Pagination
              count={sysLog?.length} // Total number of rows
              page={page}
              onChange={(event, newPage) => setPage(newPage)}
              showFirstLast={true} // Display first and last page buttons
            />
          </>
        )}
        {!sysLog?.length && <p>Loading logs...</p>}
      </div> */}

      {/* <Modal
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
      </Modal> */}
    </div>
  );
}
