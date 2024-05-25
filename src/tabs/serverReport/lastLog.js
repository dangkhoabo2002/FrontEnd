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

export default function LastLog(rawLastLog) {
  const [page, setPage] = useState(0); // Page number (starts from 0)
  const rowsPerPage = 10; // Number of rows per page
  const newLog = rawLastLog.lastLog?.parsed_log;
  // HANDLE RAW DATA

  return (
    <div>
      <div
        style={{ height: "auto", borderRadius: "0 0 4px 4px" }}
        a
        className="bg-[white] shadow-lg"
      >
        {/* {newLog?.length > 0 && (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Conclusion</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {newLog
                    .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                    ?.map((row) => (
                      <TableRow key={row.timestamp}>
                        <TableCell>
                          <Accordion>
                            <AccordionSummary
                              id="panel-header"
                              aria-controls="panel-content"
                            >
                              {row.timestamp}
                            </AccordionSummary>
                            <AccordionDetails>{row}</AccordionDetails>
                          </Accordion>
                        </TableCell>
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
        {!newLog?.length && <LinearProgress />} */}
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
                      <p className="font-bold">From</p>
                    </TableCell>
                    <TableCell>
                      <p className="font-bold">User</p>
                    </TableCell>
                    <TableCell>
                      <p className="font-bold">Information</p>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {newLog
                    .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                    .map((row) => (
                      <TableRow key={row.timestamp}>
                        <TableCell sx={{ width: "400px" }}>
                          {row.timestamp}
                        </TableCell>
                        <TableCell>{row.from_ip}</TableCell>
                        <TableCell>{row.user}</TableCell>
                        <TableCell>{row.info}</TableCell>
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

// const Accordion = styled((props) => (
//   <MuiAccordion disableGutters elevation={0} square {...props} />
// ))(({ theme }) => ({
//   border: `1px solid ${theme.palette.divider}`,
//   "&:not(:last-child)": {
//     borderBottom: 0,
//   },
//   "&::before": {
//     display: "none",
//   },
// }));

// const AccordionSummary = styled((props) => (
//   <MuiAccordionSummary
//     expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
//     {...props}
//   />
// ))(({ theme }) => ({
//   backgroundColor:
//     theme.palette.mode === "dark"
//       ? "rgba(255, 255, 255, .05)"
//       : "rgba(0, 0, 0, .03)",
//   flexDirection: "row-reverse",
//   "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
//     transform: "rotate(90deg)",
//   },
//   "& .MuiAccordionSummary-content": {
//     marginLeft: theme.spacing(1),
//   },
// }));

// const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
//   padding: theme.spacing(2),
//   borderTop: "1px solid rgba(0, 0, 0, .125)",
// }));
