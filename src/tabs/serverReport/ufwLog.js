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

export default function UfwLog(rawUfwLog) {
  const [page, setPage] = useState(0); // Page number (starts from 0)
  const rowsPerPage = 10; // Number of rows per page

  // HANDLE RAW DATA
  const [ufwLog, setUfwLog] = useState([]);
  const dataNew = rawUfwLog.ufwLog?.lines;
  console.log(dataNew);
  const handleSysLog = () => {
    setUfwLog(
      dataNew?.map((line) => {
        const parts = line.split(" ");
        const date = parts[0] + " " + parts[1] + " - " + parts[2];
        const host = parts[3] + " " + parts[4];
        const message = parts.slice(5).join(" ");
        return { date, host, message };
      })
    );
  };

  useEffect(() => {
    if (rawUfwLog) {
      handleSysLog();
    }
  }, [dataNew]);
  return (
    <div>
      <div
        style={{ height: "auto", border: "1px solid #89A6CC" }}
        a
        className="bg-[white] rounded-md shadow-lg"
      >
        {ufwLog?.length > 0 && (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Time</TableCell>
                    <TableCell>Host</TableCell>
                    <TableCell>Message</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ufwLog
                    .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                    .map((row) => (
                      <TableRow key={row.date}>
                        <TableCell sx={{ width: "160px" }}>
                          {row.date}
                        </TableCell>
                        <TableCell>{row.host}</TableCell>
                        <TableCell>{row.message}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Pagination
              count={ufwLog?.length} // Total number of rows
              page={page}
              onChange={(event, newPage) => setPage(newPage)}
              showFirstLast={true} // Display first and last page buttons
            />
          </>
        )}
        {!ufwLog?.length && <LinearProgress />}
      </div>
    </div>
  );
}
