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
import LinearProgress from "@mui/material/LinearProgress";

export default function SysLog(rawSysLog) {
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  // HANDLE RAW DATA
  const [sysLog, setSysLog] = useState([]);

  useEffect(() => {
    if (rawSysLog?.sysLog?.lines) {
      const dataNew = rawSysLog.sysLog.lines;
      setSysLog(
        dataNew.map((line) => {
          const parts = line.split(" ");
          const time = parts[0] + " " + parts[1] + " - " + parts[2];
          const log = parts.slice(3).join(" ");
          return { time, log };
        })
      );
    }
  }, [rawSysLog]);

  return (
    <div>
      <div
        style={{ height: "auto", borderRadius: "0 0 4px 4px", }}
        a
        className="bg-[white] shadow-lg"
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
        {!sysLog?.length && <LinearProgress />}
      </div>
    </div>
  );
}
