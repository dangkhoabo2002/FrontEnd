import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  FormHelperText,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import UploadIcon from "@mui/icons-material/Upload";
import DownloadIcon from "@mui/icons-material/Download";
import toast, { Toaster } from "react-hot-toast";

const CustomRadio = styled(Radio)(({ theme }) => ({
  "&.Mui-checked": {
    color: "#3867A5",
  },
}));

export default function ServerData(serverId) {
  const [selectedOptionFolder, setSelectedOptionFolder] = useState("default");
  const [selectedOptionFile, setSelectedOptionFile] = useState("default");
  const param = useParams();
  const [pathFile, setPathFile] = useState("");
  const [file, setFile] = useState(null);
  const [pathFileDownload, setPathFileDownload] = useState("");
  const [loadingDownload, setLoadingDownload] = useState(false);
  const [pathFolder, setPathFolder] = useState("");
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [pathFolderDownload, setPathFolderDownload] = useState("");
  const [folderError, setFolderError] = useState(false);
  const [output, setOutput] = useState({
    status: "",
    messages: "",
    error: "",
  });

  // Handlers
  const handleDefaultChangeFile = (event) => {
    setSelectedOptionFile(event.target.value);
    if (event.target.value === "default") {
      setPathFile("");
      setFile(null);
    }
  };

  const handleInputFilePathChange = (event) => {
    setPathFile(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      toast.error("Please choose a file to upload!", {
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
      const dataOutput = await response.json();
      setOutput({
        status: dataOutput.status,
        messages: dataOutput.messages,
        error: dataOutput.stderr,
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
        setPathFile("");
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
        toast.error("Something went wrong, please try again later!", {
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
      console.log(`Error: ${error.message}`);
    }
  };

  const handleChangePathFileDownload = (event) => {
    setPathFileDownload(event.target.value);
  };

  const handleDownloadFile = async () => {
    if (pathFileDownload === "") {
      toast.error("Please input file's path to download!", {
        style: {
          border: "1px solid #FF5733",
          maxWidth: "900px",
          padding: "16px 24px",
          color: "#FF5733",
          fontWeight: "bolder",
        },
      });
    } else {
      setLoadingDownload(true);
      const file_path = pathFileDownload;
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
        const dataOutput = await response.json();
        setOutput({
          status: dataOutput.status,
          messages: dataOutput.messages,
          error: dataOutput.stderr,
        });
        if (!response.ok) {
          throw new Error(`HTTP error status: ${response.status}`);
        }

        const contentDisposition = response.headers.get("Content-Disposition");
        let fileName = "default_filename.txt";

        if (contentDisposition) {
          const matches = contentDisposition.match(/filename="(.+)"/i);
          if (matches && matches[1]) {
            fileName = decodeURIComponent(matches[1]);
          }
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        const data = await response.json();
        if (response.status === 200) {
          confirmDownload();
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
          toast.error("Something went wrong, please try again later!", {
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
        setLoadingDownload(false);
      }
    }
  };

  const handleDefaultChangeFolder = (event) => {
    setSelectedOptionFolder(event.target.value);
    if (event.target.value === "default") {
      setPathFolder("");
      setSelectedFolder(null);
      setFolderError(false);
    } else {
      setFolderError(true);
    }
  };

  const handleFolderPathChange = (event) => {
    setPathFolder(event.target.value);
  };

  const handleFolderChange = (event) => {
    const file = event.target.files[0];
    setSelectedFolder(file);
  };

  const handleUploadFolder = async () => {
    if (!selectedFolder || !selectedFolder.name.endsWith(".zip")) {
      toast.error("Please choose a ZIP folder to upload!", {
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
      const dataOutput = await response.json();
      setOutput({
        status: dataOutput.status,
        messages: dataOutput.messages,
        error: dataOutput.stderr,
      });
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
        setSelectedFolder(null);
        setPathFolder("");
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
        toast.error("Something went wrong, please try again later!", {
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

  const handleChangePathFolderDownload = (event) => {
    setPathFolderDownload(event.target.value);
  };

  const handleDownloadFolder = async () => {
    const encodedFolderPath = btoa(pathFolderDownload);
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
      const dataOutput = await response.json();
      setOutput({
        status: dataOutput.status,
        messages: dataOutput.messages,
        error: dataOutput.stderr,
      });
      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }

      const contentDisposition = response.headers.get("Content-Disposition");
      let fileName = "default_filename.txt";

      if (contentDisposition) {
        const matches = contentDisposition.match(/filename="(.+)"/i);
        if (matches && matches[1]) {
          fileName = decodeURIComponent(matches[1]);
        }
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      const data = await response.json();
      if (response.status === 200) {
        confirmDownload();
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
        toast.error("Something went wrong, please try again later!", {
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

  const confirmDownload = async () => {
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
      const dataOutput = await response.json();
      setOutput({
        status: dataOutput.status,
        messages: dataOutput.messages,
        error: dataOutput.stderr,
      });
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

      <div className="info-title font-semibold mb-3">
        <p>Data File</p>
      </div>

      <Paper elevation={3} sx={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h6">Browse File</Typography>
        <FormControl component="fieldset">
          <RadioGroup
            value={selectedOptionFile}
            onChange={handleDefaultChangeFile}
            row
            aria-labelledby="radio-buttons-group-file"
            name="radio-buttons-group-file"
          >
            <FormControlLabel
              value="default"
              control={<CustomRadio />}
              label="Default"
            />
            <FormControlLabel
              value="path"
              control={<CustomRadio />}
              label="Path"
            />
          </RadioGroup>
        </FormControl>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={8}>
            {selectedOptionFile === "default" ? (
              <TextField
                id="outlined-basic-file"
                value="/usr/bin/file_storage"
                size="small"
                fullWidth
                sx={{ backgroundColor: "white" }}
                disabled={true}
              />
            ) : (
              <TextField
                id="outlined-basic-file"
                value={pathFile}
                size="small"
                fullWidth
                sx={{ backgroundColor: "white" }}
                onChange={handleInputFilePathChange}
              />
            )}
          </Grid>
          <Grid item>
            <input
              type="file"
              onChange={handleFileChange}
              style={{ display: "none" }}
              id="file-upload"
            />
            <label htmlFor="file-upload">
              <Button
                variant="contained"
                component="span"
                sx={{
                  bgcolor: "#3867A5",
                  color: "white",
                  "&:hover": { bgcolor: "#264B7B" },
                }}
              >
                Choose File
              </Button>
            </label>
          </Grid>
          <Grid item>
            <Button
              startIcon={<UploadIcon />}
              variant="contained"
              onClick={handleSubmit}
              sx={{
                bgcolor: "#3867A5",
                color: "white",
                "&:hover": { bgcolor: "#264B7B" },
              }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h6">Browse Folder</Typography>
        <FormControl component="fieldset">
          <RadioGroup
            value={selectedOptionFolder}
            onChange={handleDefaultChangeFolder}
            row
            aria-labelledby="radio-buttons-group-folder"
            name="radio-buttons-group-folder"
          >
            <FormControlLabel
              value="default"
              control={<CustomRadio />}
              label="Default"
            />
            <FormControlLabel
              value="path"
              control={<CustomRadio />}
              label="Path"
            />
          </RadioGroup>
        </FormControl>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={8}>
            {selectedOptionFolder === "default" ? (
              <TextField
                id="outlined-basic-folder"
                value="usr/bin/file_storage"
                size="small"
                fullWidth
                sx={{ backgroundColor: "white" }}
                disabled={true}
              />
            ) : (
              <TextField
                id="outlined-basic-folder"
                value={pathFolder}
                size="small"
                fullWidth
                sx={{ backgroundColor: "white" }}
                onChange={handleFolderPathChange}
              />
            )}
          </Grid>
          <Grid item>
            <input
              type="file"
              onChange={handleFolderChange}
              style={{ display: "none" }}
              id="folder-upload"
            />
            <label htmlFor="folder-upload">
              <Button
                variant="contained"
                component="span"
                sx={{
                  bgcolor: "#3867A5",
                  color: "white",
                  "&:hover": { bgcolor: "#264B7B" },
                }}
              >
                Choose Folder
              </Button>
            </label>
          </Grid>
          <Grid item>
            <Button
              startIcon={<UploadIcon />}
              variant="contained"
              onClick={handleUploadFolder}
              sx={{
                bgcolor: "#3867A5",
                color: "white",
                "&:hover": { bgcolor: "#264B7B" },
              }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h6">Download File</Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={8}>
            <TextField
              id="outlined-basic-file"
              size="small"
              fullWidth
              sx={{ backgroundColor: "white" }}
              onChange={handleChangePathFileDownload}
              placeholder="Ex:/usr/bin/file/test.txt"
            />
          </Grid>
          <Grid item>
            <Button
              startIcon={<DownloadIcon />}
              variant="contained"
              onClick={handleDownloadFile}
              sx={{
                bgcolor: "#3867A5",
                color: "white",
                "&:hover": { bgcolor: "#264B7B" },
              }}
            >
              Download
            </Button>
          </Grid>
          {loadingDownload && (
            <Grid item>
              <CircularProgress />
            </Grid>
          )}
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h6">Download Folder</Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={8}>
            <TextField
              id="outlined-basic-folder"
              size="small"
              fullWidth
              sx={{ backgroundColor: "white" }}
              placeholder="Ex:/usr/bin/file/"
              value={pathFolderDownload}
              onChange={handleChangePathFolderDownload}
            />
          </Grid>
          <Grid item>
            <Button
              startIcon={<DownloadIcon />}
              variant="contained"
              onClick={handleDownloadFolder}
              sx={{
                bgcolor: "#3867A5",
                color: "white",
                "&:hover": { bgcolor: "#264B7B" },
              }}
            >
              Download
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <div className="resultOutput mt-10">
        <h1 className="text-2xl my-3">Output result</h1>
        <div
          style={{
            padding: "16px",
            border: "1px solid #89A6CC",
            borderRadius: "8px",
            backgroundColor: "#F7F9FC",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            margin: "0 auto",
            textAlign: "left",
          }}
        >
          <pre
            className="text-gray-700 dark:text-gray-400"
            style={{
              whiteSpace: "pre-wrap",
              marginBottom: "8px",
              fontWeight: "bold",
              color: "#3867A5",
            }}
          >
            Response status:
            {output.status === undefined ? " None" : ` ${output.status}`}
          </pre>
          <pre
            className="text-gray-700 dark:text-gray-400"
            style={{
              whiteSpace: "pre-wrap",
              marginBottom: "8px",
              fontWeight: "bold",
              color: "#3867A5",
            }}
          >
            Message:
            {output.messages === undefined ? " None" : ` ${output.messages}`}
          </pre>
          <pre
            className="text-gray-700 dark:text-gray-400"
            style={{
              whiteSpace: "pre-wrap",
              marginBottom: "8px",
              fontWeight: "bold",
              color: "#3867A5",
            }}
          >
            Error: {output.error === undefined ? " None" : ` ${output.error}`}
          </pre>
        </div>
      </div>
    </div>
  );
}
