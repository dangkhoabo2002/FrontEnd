import React, { useState } from "react";

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

export default function RawSysLog(rawSysLog) {
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const newLog = rawSysLog.sysLog?.parsed_log;
  return (
    <div>
      <div
        style={{ height: "auto", borderRadius: "0 0 4px 4px" }}
        a
        className="bg-[white] shadow-lg"
      >
        {newLog?.length > 0 && (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <p className="font-bold">Date</p>
                    </TableCell>
                    <TableCell>
                      <p className="font-bold">Host</p>
                    </TableCell>
                    <TableCell>
                      <p className="font-bold">Log</p>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {newLog
                    .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                    .map((row, index) => (
                      <TableRow key={index}>
                        <TableCell sx={{ width: "160px" }}>
                          {row.timestamp}
                        </TableCell>
                        <TableCell>{row.host}</TableCell>
                        <TableCell>{row.log}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Pagination
              count={newLog?.length} // Total number of rows
              page={page}
              onChange={(event, newPage) => setPage(newPage)}
              showFirstLast={true} // Display first and last page buttons
            />
          </>
        )}
        {!newLog?.length && <LinearProgress />}
      </div>
    </div>
  );
}
