import React, { useState } from "react";
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
  const [selectedOptionFile, setSelectedOptionFile] = useState("default");
  const [pathFile, setPathFile] = useState(
    "C:\\Users\\Nguyen Dang Khoa\\Desktop\\FPT-Journey\\CN5\\FER201\\REACT_APP\\..."
  );

  const [selectedOptionFolder, setSelectedOptionFolder] = useState("default");
  const [pathFolder, setPathFolder] = useState(
    "C:\\Users\\Nguyen Dang Khoa\\Desktop\\FPT-Journey\\CN5\\FER201\\REACT_APP\\..."
  );

  const handleDefaultChangeFile = (event) => {
    setSelectedOptionFile(event.target.value);
    // Reset path when changing options to default
    if (event.target.value === "default") {
      setPathFile("");
    }
  };

  const handlePathChangeFile = (event) => {
    setPathFile(event.target.value);
  };

  const handleDefaultChangeFolder = (event) => {
    setSelectedOptionFolder(event.target.value);
    // Reset path when changing options to default
    if (event.target.value === "default") {
      setPathFolder("");
    }
  };

  const handlePathChangeFolder = (event) => {
    setPathFolder(event.target.value);
  };

  const CustomRadio = withStyles({
    root: {
      "&$checked": {
        color: "#3867A5",
      },
    },
    checked: {},
  })((props) => <Radio color="default" {...props} />);

  const handleBrowseClick = async () => {
    try {
      const fileHandle = await window.showOpenFilePicker();
      const file = await fileHandle[0].getFile();
      setPathFile(file.name);
      setPathFolder(file.name);
    } catch (error) {
      console.error("Error accessing file:", error);
    }
  };

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
              <div className="mb-2">
                <TextField
                  mt={1}
                  id="outlined-basic-file"
                  value={pathFile}
                  onChange={handlePathChangeFile}
                  size="small"
                  sx={{ width: "800px", backgroundColor: "white" }}
                  disabled={selectedOptionFile === "default"}
                />
                <Button
                  startIcon={<UploadIcon />}
                  variant="contained"
                  onClick={handleBrowseClick}
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
            {selectedOptionFile === "default" && (
              <div className="mb-2">
                <TextField
                  mt={1}
                  id="outlined-basic-file"
                  value={pathFile}
                  onChange={handlePathChangeFile}
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
                onClick={handleBrowseClick}
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
            onClick={handleBrowseClick}
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
            onClick={handleBrowseClick}
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
