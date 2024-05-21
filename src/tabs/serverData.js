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
import CircularProgress from "@mui/material/CircularProgress";
import toast, { Toaster } from "react-hot-toast";

export default function ServerData(serverId) {
  const [selectedOptionFolder, setSelectedOptionFolder] = useState("default");
  const [selectedOptionFile, setSelectedOptionFile] = useState("default");

  const param = useParams();

  // FILE UPLOAD

  const handleDefaultChangeFile = (event) => {
    setSelectedOptionFile(event.target.value);
    if (event.target.value === "default") {
    }
  };

  const [pathFile, setPathFile] = useState();

  const handleFilePathChange = (event) => {
    setPathFile(event.target.value);
  };
  const [file, setFile] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      toast.error("Please choose file to upload!", {
        style: {
          border: "1px solid #FF5733",
          maxWidth: "900px",
          padding: "16px 24px",
          color: "#FF5733",
          fontWeight: "bolder",
        },
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    if (selectedOptionFile === "path") {
      formData.append("dir", pathFile);
    }

    const UPLOAD_ENDPOINT = `http://127.0.0.1:5000/server/upload_file/${param.server_id}`;
    try {
      toast.loading("Uploading...");
      const response = await fetch(UPLOAD_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Access-Control-Allow-Origin": "*",
        },
      });

      const data = await response.json();
      if (response.status === 200) {
        toast.dismiss();
        toast.success("Upload success.", {
          style: {
            border: "1px solid #37E030",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "green",
            fontWeight: "bolder",
          },
        });
        setFile(null);
      } else if (response.status === 403) {
        toast.dismiss();
        toast.error(`Permission denied!`, {
          style: {
            border: "1px solid #F85F60",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "red",
            fontWeight: "bolder",
          },
        });
      } else if (response.status === 500) {
        toast.dismiss();
        const errMessage = await data.message;
        toast.error(`${errMessage}!`, {
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
      console.log(`Error: ${error.message}`); // Handle fetch errors
    } finally {
    }
  };

  // FILE DOWLOAD

  const [pathFileDowload, setPathFileDowload] = useState();
  const [loadingDowload, setLoadingDowload] = useState(false);

  const handleChangePathFileDowload = (event) => {
    setPathFileDowload(event.target.value);
  };

  const handleDownloadFile = async () => {
    if (pathFileDowload === "") {
      toast.error("Please input file's path to dowload!", {
        style: {
          border: "1px solid #FF5733",
          maxWidth: "900px",
          padding: "16px 24px",
          color: "#FF5733",
          fontWeight: "bolder",
        },
      });
    } else {
      setLoadingDowload(true);
      const file_path = pathFileDowload;
      const encodedFilePath = btoa(file_path);
      const token = localStorage.getItem("access_token");

      try {
        const response = await fetch(
          `http://localhost:5000/server/download_file/${serverId.serverId}?file=${encodedFilePath}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Access-Control-Expose-Headers": "Content-Disposition",
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error status: ${response.status}`);
        }

        // Extract the filename from the Content-Disposition header
        const contentDisposition = response.headers.get("Content-Disposition");
        let fileName = "default_filename.txt"; // Default filename in case Content-Disposition is not available

        if (contentDisposition) {
          // Parse the Content-Disposition header to get the filename
          const matches = contentDisposition.match(/filename="(.+)"/i);
          if (matches && matches[1]) {
            fileName = decodeURIComponent(matches[1]);
          }
        }

        // Create a blob from the response data
        const blob = await response.blob();

        // Generate a URL for the blob
        const url = window.URL.createObjectURL(blob);

        // Create a link element and simulate a click to start the download
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        const data = await response.json();
        if (response.status === 200) {
          confirmDowload();
        } else if (response.status === 403) {
          toast.dismiss();
          toast.error(`Permission denied!`, {
            style: {
              border: "1px solid #F85F60",
              maxWidth: "900px",
              padding: "16px 24px",
              color: "red",
              fontWeight: "bolder",
            },
          });
        } else if (response.status === 500) {
          toast.dismiss();
          const errMessage = await data.message;
          toast.error(`${errMessage}!`, {
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
        console.error(error);
      } finally {
        setLoadingDowload(false);
      }
    }
  };

  // FOLDER UPLOAD

  const handleDefaultChangeFolder = (event) => {
    setSelectedOptionFolder(event.target.value);
    if (event.target.value === "default") {
      setPathFolder("");
    }
  };

  const [pathFolder, setPathFolder] = useState();

  const CustomRadio = withStyles({
    root: {
      "&$checked": {
        color: "#3867A5",
      },
    },
    checked: {},
  })((props) => <Radio color="default" {...props} />);

  const handleFolderPathChange = (event) => {
    setPathFolder(event.target.value);
  };

  const [selectedFolder, setSelectedFolder] = useState();

  const handleFolderChange = (event) => {
    setSelectedFolder(event.target.files[0]);
  };

  const handleUploadFolder = async () => {
    const fileName = selectedFolder.name;
    const fileExtension = fileName.split(".").pop();

    if (!selectedFolder) {
      toast.error("Please choose folder to upload!", {
        style: {
          border: "1px solid #FF5733",
          maxWidth: "900px",
          padding: "16px 24px",
          color: "#FF5733",
          fontWeight: "bolder",
        },
      });
      return;
    }

    if (fileExtension === "zip") {
      const token = localStorage.getItem("access_token");

      const formData = new FormData();
      formData.append("zip_file", selectedFolder);

      if (selectedOptionFolder === "path") {
        formData.append("dir", pathFolder);
      }

      try {
        const response = await fetch(
          `http://localhost:5000/server/upload_folder/${param.server_id}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Access-Control-Allow-Origin": "*",
            },
            body: formData,
          }
        );
        const responseData = await response.json();
        if (response.status === 200) {
          toast.dismiss();
          toast.success("Upload success.", {
            style: {
              border: "1px solid #37E030",
              maxWidth: "900px",
              padding: "16px 24px",
              color: "green",
              fontWeight: "bolder",
            },
          });
          setFile(null);
        } else if (response.status === 403) {
          toast.dismiss();
          toast.error(`Permission denied!`, {
            style: {
              border: "1px solid #F85F60",
              maxWidth: "900px",
              padding: "16px 24px",
              color: "red",
              fontWeight: "bolder",
            },
          });
        } else if (response.status === 500) {
          toast.dismiss();
          const errMessage = await responseData.message;
          toast.error(`${errMessage}!`, {
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
        console.error(error);
      }
    } else {
      toast.error("Folder must be ZIP format compressed !", {
        style: {
          border: "1px solid #FF5733",
          maxWidth: "900px",
          padding: "16px 24px",
          color: "#FF5733",
          fontWeight: "bolder",
        },
      });
    }
  };

  // FOLDER UPLOAD

  const [pathFolderDowload, setPathFolderDowload] = useState();

  const handleChangePathFolderDowload = (event) => {
    setPathFolderDowload(event.target.value);
  };

  const handleDownloadFolder = async () => {
    const encodedFolderPath = btoa(pathFolderDowload);
    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch(
        `http://localhost:5000/server/download_folder/${serverId.serverId}?folder=${encodedFolderPath}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Expose-Headers": "Content-Disposition",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }

      const contentDisposition = response.headers.get("Content-Disposition");
      console.log(contentDisposition);
      let fileName = "default_filename.txt"; // Default filename in case Content-Disposition is not available

      if (contentDisposition) {
        // Parse the Content-Disposition header to get the filename
        const matches = contentDisposition.match(/filename="(.+)"/i);
        if (matches && matches[1]) {
          fileName = decodeURIComponent(matches[1]);
        }
      }

      // Create a blob from the response data
      const blob = await response.blob();

      // Generate a URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create a link element and simulate a click to start the download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName); // Dynamically set the filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      const data = await response.json();
      if (response.status === 200) {
        confirmDowload();
      } else if (response.status === 403) {
        toast.dismiss();
        toast.error(`Permission denied!`, {
          style: {
            border: "1px solid #F85F60",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "red",
            fontWeight: "bolder",
          },
        });
      } else if (response.status === 500) {
        toast.dismiss();
        const errMessage = await data.message;
        toast.error(`${errMessage}!`, {
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
      console.error(error);
    }
  };

  // CONFIRM DOWLOAD

  const confirmDowload = async () => {
    toast.loading("Closing download gate...");

    const formData = new FormData();
    formData.append("zip_file", selectedFolder);

    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch(
        `http://localhost:5000/server/confirm_download/${param.server_id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      const responseData = await response.json();

      if (response.status === 200) {
        toast.dismiss();
        toast.success("Upload file success.", {
          style: {
            border: "1px solid #37E030",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "green",
            fontWeight: "bolder",
          },
        });
      } else if (response.status === 400) {
        toast.dismiss();

        const errMessage = responseData.message;
        toast.error(`${errMessage}`, {
          style: {
            border: "1px solid #F85F60",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "red",
            fontWeight: "bolder",
          },
        });
      } else if (response.status === 500) {
        toast.dismiss();

        const errMessage = responseData.message;
        toast.error(`${errMessage}`, {
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
      console.error(error);
    }
  };

  return (
    <div>
      <Toaster position="bottom-right" reverseOrder={false} />

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
            <>
              <TextField
                mt={1}
                id="outlined-basic-file"
                value={pathFile}
                size="small"
                sx={{ width: "800px", backgroundColor: "white" }}
                onChange={handleFilePathChange}
              />
              <form onSubmit={handleSubmit}>
                <div className="mb-2">
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                  />

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
            </>
          )}
          {selectedOptionFile === "default" && (
            <div className="mb-2">
              <TextField
                mt={1}
                id="outlined-basic-file"
                value="usr/bin/file_storage"
                size="small"
                sx={{ width: "800px", backgroundColor: "white" }}
                disabled={true}
              />
              <form onSubmit={handleSubmit}>
                <div className="mb-2">
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                  />

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
                id="outlined-basic-file"
                value={pathFolder}
                size="small"
                sx={{ width: "800px", backgroundColor: "white" }}
                onChange={handleFolderPathChange}
              />
              <input type="file" onChange={handleFolderChange} />

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
                onClick={handleUploadFolder}
              >
                Submit
              </Button>
            </div>
          )}
          {selectedOptionFolder === "default" && (
            <div className="mb-2">
              <TextField
                mt={1}
                id="outlined-basic-folder"
                value="usr/bin/file_storage"
                size="small"
                sx={{ width: "800px", backgroundColor: "white" }}
                disabled={true}
              />
              <input type="file" onChange={handleFolderChange} />

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
                onClick={handleUploadFolder}
              >
                Submit
              </Button>
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
            onChange={handleChangePathFileDowload}
            placeholder="Ex:/usr/bin/file/test.txt"
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
            onClick={handleDownloadFile}
          >
            Download
          </Button>

          {loadingDowload && <CircularProgress />}
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
            placeholder="Ex:/usr/bin/file/"
            value={pathFolderDowload}
            onChange={handleChangePathFolderDowload}
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
            onClick={handleDownloadFolder}
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
