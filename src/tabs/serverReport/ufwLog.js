import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

import {
  Grid,
  Button,
  Modal,
  Box,
  FormControl,
  OutlinedInput,
  IconButton,
  Typography,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LinearProgress from "@mui/material/LinearProgress";

import toast, { Toaster } from "react-hot-toast";

export default function UfwLog() {
  const [selectContainer, setSelectContainer] = useState();

  const columns = [
    {
      field: "container_id",
      headerName: "ID",
      width: 200,
    },
    { field: "names", headerName: "Name", width: 200, flex: 1 },
    { field: "command", headerName: "Command", width: 200, flex: 1 },
    { field: "created", headerName: "Created", width: 200, flex: 1 },
    { field: "status", headerName: "Status", width: 200, flex: 1 },
    { field: "image", headerName: "Image Id", width: 200, flex: 1 },
    { field: "ports", headerName: "Port", width: 200, flex: 1 },
  ];

  const handleRowClick = (row) => {
    setSelectContainer(row.row);
  };

  const [containerList, setContainerList] = useState([]);

  const handleGetContainersAPI = async () => {
    const url = `http://127.0.0.1:5000/server/docker_list_containers`;
    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      if (response.status === 200) {
        const containers = await response.json();
        setContainerList(containers);
      } else if (response.status === 500) {
        toast.error("No data for server!", {
          style: {
            border: "1px solid #F85F60",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "red",
            fontWeight: "bolder",
          },
        });
      } else {
        toast.error("Fail to list containers data!", {
          style: {
            border: "1px solid #F85F60",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "red",
            fontWeight: "bolder",
          },
        });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
    }
  };
  return (
    <div>
      <div
        style={{ height: 400, border: "1px solid #89A6CC" }}
        a
        className="bg-[white] rounded-md shadow-lg"
      >
        <DataGrid
          rows={containerList}
          getRowId={(row) => row.container_id}
          columns={columns}
          onRowClick={handleRowClick}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10, 25]}
        />
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
