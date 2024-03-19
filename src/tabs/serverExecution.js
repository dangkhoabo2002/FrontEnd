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

export default function ServerExecution() {
  return (
    <div>
      <div className="info-title font-semibold my-3">
        <p>Execute code</p>
      </div>{" "}
      <div className="default-url">
        <Typography variant="body1" style={{ marginTop: "10px" }}>
          Default
        </Typography>
        <div className="flex">
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            defaultValue="C:\\Users\\Nguyen Dang Khoa\\Desktop\\FPT-Journey\\CNS\\FER201\\REACT_APP..."
            sx={{ width: "50%" }}
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
                  sx={{ width: "150px", bgcolor: "#3867A5" }}
                >
                  Check
                </Button>
              </div>
              <div className="check-btn mx-3 flex flex-col">
                <Button disable sx={{ width: "150px" }} color="error">
                  Exists
                </Button>
              </div>
            </div>

            <Box className="mt-3 d-flex  mx-3">
              <div className="">
                <FormControlLabel
                  sx={{ color: "#637381" }}
                  control={
                    <Checkbox
                      className="font-light"
                      sx={{ color: "#637381" }}
                    />
                  }
                  label={<p className="font-light">Run as administrator</p>}
                />
              </div>
            </Box>
          </div>
        </div>
      </div>
      <div className="info-title font-semibold my-3">
        <p>Output</p>
      </div>{" "}
      <FormControl fullWidth variant="outlined">
        <OutlinedInput
          sx={{ width: "70%" }}
          className="mt-2"
          style={{}}
          multiline
          rows={7}
          defaultValue="printf(Hello world).printf(Hello world).printf(Hello world).printf(Hello world).printf(Hello world).printf(Hello world).printf(Hello world).printf(Hello world).printf(Hello world).printf(Hello world)."
          inputProps={{
            "aria-label": "url",
          }}
        />
      </FormControl>
    </div>
  );
}
