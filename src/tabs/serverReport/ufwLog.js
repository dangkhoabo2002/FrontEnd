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

export default function UfwLog(ufwLog) {
  const [page, setPage] = useState(0); // Page number (starts from 0)
  const rowsPerPage = 10; // Number of rows per page
  const newLog = ufwLog.ufwLog?.parsed_log;

  return (
    <div>
      <div
        style={{ height: "auto", borderRadius: "0 0 4px 4px" }}
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
                      <p className="font-bold">Message</p>
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
