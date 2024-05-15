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
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

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
  const dataNew = rawLastLog.lastLog?.lines;
  const [openModal, setOpenModal] = useState(false);

  // const handleOpen = (value) => {
  //   setValue(newValue);
  // };

  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <div
        style={{ height: "auto", border: "1px solid #89A6CC" }}
        a
        className="bg-[white] rounded-md shadow-lg"
      >
        {dataNew?.length > 0 && (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Conclusion</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataNew
                    .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                    ?.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>
                          <Accordion>
                            <AccordionSummary
                              id="panel-header"
                              aria-controls="panel-content"
                            >
                              Log
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
              count={dataNew?.length} // Total number of rows
              page={page}
              onChange={(event, newPage) => setPage(newPage)}
              showFirstLast={true} // Display first and last page buttons
            />
          </>
        )}
        {!dataNew?.length && <p>Loading logs...</p>}
      </div>

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

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));
