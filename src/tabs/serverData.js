import React, { useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";

import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Button,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import UploadIcon from "@mui/icons-material/Upload";
import DownloadIcon from "@mui/icons-material/Download";

export default function ServerData() {
  const [selectedOptionFolder, setSelectedOptionFolder] = useState("default");
  const [selectedOptionFile, setSelectedOptionFile] = useState("default");

  const param = useParams();

  // FILE

  const [pathFile, setPathFile] = useState();

  const handleDefaultChangeFile = (event) => {
    setSelectedOptionFile(event.target.value);
    if (event.target.value === "default") {
      setPathFile("");
    }
  };

  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleSubmit = async (event) => {
    setStatus(""); // Reset status
    event.preventDefault();

    if (!file) {
      setStatus("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);

    const UPLOAD_ENDPOINT = `http://127.0.0.1:5000/server/upload_file/${param.server_id}`;
    console.log(formData);

    try {
      const response = await fetch(UPLOAD_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      const data = await response.json(); // Parse response as JSON

      if (response.status === 200) {
        setStatus("Thank you! File uploaded successfully.");
      } else {
        setStatus(`Error uploading file: ${data.message || "Unknown error"}`); // Handle potential error message from server
      }
    } catch (error) {
      setStatus(`Error: ${error.message}`); // Handle fetch errors
    } finally {
    }
  };

  // FOLDER
  const handleDefaultChangeFolder = (event) => {
    setSelectedOptionFolder(event.target.value);
    if (event.target.value === "default") {
      setPathFolder("");
    }
  };

  const [pathFolder, setPathFolder] = useState();

  const handlePathChangeFolder = (event) => {
    setPathFolder(event.target.value);
    console.log(event.target.value);
  };

  const CustomRadio = withStyles({
    root: {
      "&$checked": {
        color: "#3867A5",
      },
    },
    checked: {},
  })((props) => <Radio color="default" {...props} />);

  return (
    <div>
      <div className="info-title font-semibold">
        <p>Data</p>
      </div>
      {/* Browse File */}

      <div className="my-3">
        <div className="info-title font-semibold">
          <p style={{ fontSize: "18px" }}>Browse File</p>
        </div>
        <div className="">
          <FormControl>
            <RadioGroup
              value={selectedOptionFile}
              onChange={handleDefaultChangeFile}
              row
              aria-labelledby="demo-row-radio-buttons-group-label-file"
              name="row-radio-buttons-group-file"
            >
              <FormControlLabel
                className="custom-radio"
                value="default"
                control={<CustomRadio />}
                label="Default"
              />
              <FormControlLabel
                className="custom-radio"
                value="path"
                control={<CustomRadio />}
                label="Path"
              />
            </RadioGroup>
          </FormControl>
          {selectedOptionFile === "path" && (
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                {/* <TextField
                mt={1}
                id="outlined-basic-file"
                value={serverFilePath}
                onChange={handleInputFilePath}
                size="small"
                sx={{ width: "800px", backgroundColor: "white" }}
                disabled={selectedOptionFile === "default"}
              /> */}
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />

                <Button
                  startIcon={<UploadIcon />}
                  variant="contained"
                  style={{ marginLeft: "10px" }}
                  sx={{
                    width: "120px",
                    height: "auto",
                    color: "white",
                    bgcolor: "#3867A5",
                    "&:hover": { bgcolor: "#264B7B" },
                    fontSize: "14px",
                    fontWeight: "normal",
                    textTransform: "none",
                  }}
                >
                  Browse
                </Button>
                <Button
                  startIcon={<UploadIcon />}
                  variant="contained"
                  type="submit"
                  style={{ marginLeft: "10px" }}
                  sx={{
                    width: "120px",
                    height: "auto",
                    color: "white",
                    bgcolor: "#3867A5",
                    "&:hover": { bgcolor: "#264B7B" },
                    fontSize: "14px",
                    fontWeight: "normal",
                    textTransform: "none",
                  }}
                >
                  Submit
                </Button>
              </div>
            </form>
          )}
          {selectedOptionFile === "default" && (
            <div className="mb-2">
              <TextField
                mt={1}
                id="outlined-basic-file"
                value="C/root/folder/..."
                size="small"
                sx={{ width: "800px", backgroundColor: "white" }}
                disabled={true}
              />
            </div>
          )}
        </div>
      </div>

      {/* Browse Folder */}
      <div className="my-3">
        <div className="info-title font-semibold">
          <p style={{ fontSize: "18px" }}>Browse Folder</p>
        </div>
        <div className="">
          <FormControl>
            <RadioGroup
              value={selectedOptionFolder}
              onChange={handleDefaultChangeFolder}
              row
              aria-labelledby="demo-row-radio-buttons-group-label-folder"
              name="row-radio-buttons-group-folder"
            >
              <FormControlLabel
                className="custom-radio"
                value="default"
                control={<CustomRadio />}
                label="Default"
              />
              <FormControlLabel
                className="custom-radio"
                value="path"
                control={<CustomRadio />}
                label="Path"
              />
            </RadioGroup>
          </FormControl>
          {selectedOptionFolder === "path" && (
            <div className="mb-2">
              <TextField
                mt={1}
                id="outlined-basic-folder"
                value={pathFolder}
                onChange={handlePathChangeFolder}
                size="small"
                sx={{ width: "800px", backgroundColor: "white" }}
                disabled={selectedOptionFolder === "default"}
              />
              <Button
                startIcon={<UploadIcon />}
                variant="contained"
                style={{ marginLeft: "10px" }}
                sx={{
                  width: "120px",
                  height: "auto",
                  color: "white",
                  bgcolor: "#3867A5",
                  "&:hover": { bgcolor: "#264B7B" },
                  fontSize: "14px",
                  fontWeight: "normal",
                  textTransform: "none",
                }}
              >
                Browse
              </Button>
            </div>
          )}
          {selectedOptionFolder === "default" && (
            <div className="mb-2">
              <TextField
                mt={1}
                id="outlined-basic-folder"
                value={pathFolder}
                onChange={handlePathChangeFolder}
                size="small"
                sx={{ width: "800px", backgroundColor: "white" }}
                disabled={true}
              />
              {/* No Browse button for Default */}
            </div>
          )}
        </div>
      </div>

      {/* Download File */}

      <div className="my-3">
        <div className="info-title font-semibold">
          <p style={{ fontSize: "18px" }}>Download File</p>
        </div>
        <div className="mb-2">
          <TextField
            mt={1}
            id="outlined-basic-file"
            size="small"
            sx={{ width: "800px", backgroundColor: "white" }}
          />
          <Button
            startIcon={<DownloadIcon />}
            variant="contained"
            style={{ marginLeft: "10px" }}
            sx={{
              width: "120px",
              height: "auto",
              color: "white",
              bgcolor: "#3867A5",
              "&:hover": { bgcolor: "#264B7B" },
              fontSize: "14px",
              fontWeight: "normal",
              textTransform: "none",
            }}
          >
            Download
          </Button>
        </div>
      </div>

      {/* Download Folder */}
      <div className="my-3">
        <div className="info-title font-semibold">
          <p style={{ fontSize: "18px" }}>Download Folder</p>
        </div>
        <div className="mb-2">
          <TextField
            mt={1}
            id="outlined-basic-file"
            size="small"
            sx={{ width: "800px", backgroundColor: "white" }}
          />
          <Button
            startIcon={<DownloadIcon />}
            variant="contained"
            style={{ marginLeft: "10px" }}
            sx={{
              width: "120px",
              height: "auto",
              color: "white",
              bgcolor: "#3867A5",
              "&:hover": { bgcolor: "#264B7B" },
              fontSize: "14px",
              fontWeight: "normal",
              textTransform: "none",
            }}
          >
            Download
          </Button>
        </div>
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
