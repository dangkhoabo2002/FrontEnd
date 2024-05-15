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

export default function SysLog(rawSysLog) {
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  // HANDLE RAW DATA
  const [sysLog, setSysLog] = useState([]);
  const dataNew = rawSysLog.sysLog?.lines;
  const handleSysLog = () => {
    setSysLog(
      dataNew?.map((line) => {
        const parts = line.split(" ");
        const time = parts[0] + " " + parts[1];
        const log = parts.slice(3).join(" ");
        return { time, log };
      })
    );
  };

  useEffect(() => {
    handleSysLog();
  }, []);
  
  return (
    <div>
      <div
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
      </div>
    </div>
  );
}
