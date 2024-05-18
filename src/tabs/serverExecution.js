import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Checkbox,
  Box,
  FormControlLabel,
  FormControl,
  OutlinedInput,
} from "@mui/material";

import LinearProgress from "@mui/material/LinearProgress";
import toast, { Toaster } from "react-hot-toast";

export default function ServerExecution(serverId) {
  const [path, setPath] = useState();
  const [loading, setLoading] = useState();

  const handleChangeNewRsa = (event) => {
    setPath(event.target.value);
  };

  const handleExecuteCode = async (libName) => {
    if (path === "") {
      toast.error("Please fill the path first!", {
        style: {
          border: "1px solid #F85F60",
          maxWidth: "900px",
          padding: "16px 24px",
          color: "red",
          fontWeight: "bolder",
        },
      });
    } else {
      setLoading(true);
      const editUrl = `https://master-help-desk-back-end.vercel.app/server/execute_code/${serverId.serverId}`;
      const token = localStorage.getItem("access_token");
      try {
        const response = await fetch(editUrl, {
          method: "POST",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            library: libName,
          }),
        });
        if (response.status === 200) {
          toast.success("Run file successfully.", {
            style: {
              border: "1px solid #37E030",
              maxWidth: "900px",
              padding: "16px 24px",
              color: "green",
              fontWeight: "bolder",
            },
          });
        } else if (response.status === 400) {
          toast.error("Missing server information!", {
            style: {
              border: "1px solid #F85F60",
              maxWidth: "900px",
              padding: "16px 24px",
              color: "red",
              fontWeight: "bolder",
            },
          });
        } else if (response.status === 403) {
          toast.error("Permission denied!", {
            style: {
              border: "1px solid #F85F60",
              maxWidth: "900px",
              padding: "16px 24px",
              color: "red",
              fontWeight: "bolder",
            },
          });
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
          toast.error("Something wrong, please try again later!", {
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
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <Toaster position="bottom-right" reverseOrder={false} />

      <div className="info-title font-semibold">
        <p>Execute code</p>
        {loading && (
          <Box sx={{ width: "96%" }}>
            <LinearProgress />
          </Box>
        )}
      </div>
      <div className="default-url">
        <Typography variant="body1" style={{ marginTop: "10px" }}>
          Default
        </Typography>
        <div className="flex">
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            placeholder="C:\Users\root\..."
            sx={{ backgroundColor: "white", width: "70%" }}
            value={path}
            onChange={handleChangeNewRsa}
          />
          <div
            style={{
              display: "flex flex-row",
              justifyContent: "flex-end",
            }}
          >
            <div className="flex flex-row justify-between ">
              <div className="check-btn mx-3 flex flex-col">
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#3867A5",
                    width: "100px",
                    "&:hover": { bgcolor: "#264B7B" },
                  }}
                  onClick={handleExecuteCode}
                >
                  Check
                </Button>
              </div>
              <div className="check-btn mx-3 flex flex-col ">
                <Button disable sx={{ width: "100px " }} color="error">
                  Exists
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Box className="mt-3 d-flex" sx={{ marginLeft: "745px" }}>
          <div className="">
            <FormControlLabel
              sx={{ color: "#637381" }}
              control={
                <Checkbox className="font-light" sx={{ color: "#637381" }} />
              }
              label={<p className="font-light">Run as administrator</p>}
            />
          </div>
        </Box>
      </div>

      <div className="resultOutput mt-10">
        <h1 className="text-2xl my-3">Output result</h1>
        <textarea
          className="w-full resize-none rounded-md p-4"
          style={{
            border: "1px solid #89A6CC",
            maxHeight: "8em",
            overflow: "auto",
          }}
        >
          Build successfully
        </textarea>
      </div>
    </div>
  );
}
