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
import TableOfImages from "../components/tableOfImages";
export default function ServerDocker(serverId) {
  // DOCKER PROJECT
  const [dockerProject, setDockerProject] = useState({
    docker_file: "",
    image_tag: "",
    docker_compose: "",
  });

  const handleChangeInput = (prop) => (event) => {
    setDockerProject({ ...dockerProject, [prop]: event.target.value });
  };

  const handlebuildeDockerFile = async () => {
    const url = `http://127.0.0.1:5000/server/docker_build/${serverId.serverId}`;
    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          dockerfile: dockerProject.docker_compose,
          image_tag: dockerProject.image_tag,
        }),
      });
      if (response.status === 200) {
        alert("Build Success");
      } else {
        alert("Build Fail");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
    }
  };

  const handleComposeUp = async () => {
    const url = `http://127.0.0.1:5000/server/docker_build/${serverId.serverId}`;
    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          compose_yaml: dockerProject.compose_yaml,
          action: "compose-up",
        }),
      });
      if (response.status === 200) {
        alert("Compose Up Success");
      } else {
        alert("Compose Up Fail");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
    }
  };

  const handleComposeDown = async () => {
    const url = `http://127.0.0.1:5000/server/docker_build/${serverId.serverId}`;
    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          compose_yaml: dockerProject.compose_yaml,
          action: "compose-down",
        }),
      });
      if (response.status === 200) {
        alert("Compose Down Success");
      } else {
        alert("Compose Down Fail");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
    }
  };
  // GET ALL IMAGES

  const [imageList, setImageList] = useState();

  const handleGetImagesAPI = async () => {
    const url = `http://127.0.0.1:5000/server/docker_list_containers/${serverId.serverId}`;
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
        const images = await response.json();
        setImageList(images);
      } else {
        alert("Fail to get images");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
    }
  };

  // ACTION IN IMAGES

  // GET ALL CONTAINERS

  const [containerList, setContainerList] = useState();

  const handleGetContainersAPI = async () => {
    const url = `http://127.0.0.1:5000/server/docker_list_containers/${serverId.serverId}`;
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
      } else {
        alert("Fail to get containers");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
    }
  };

  // ACTION IN CONTAINER

  const [action, setAction] = useState();

  const actions = ["ps", "start", "stop", "remove", "build", "restart", "kill"];

  const handleClickChooseAction = (actionName) => () => {
    setAction(actionName);
    handleContainerActionAPI();
  };

  // --------------------

  const [rows, setRows] = useState([
    {
      id: 1,
      repository: "Repository A",
      tag: "Tag",
      imageId: "Image Id",
      price: 10.5,
      size: "170MB",
    },
    {
      id: 2,
      repository: "Repository A",
      tag: "Tag",
      imageId: "Image Id",
      price: 10.5,
      size: "170MB",
    },
  ]);

  const handleRowClick = (row) => {
    console.log("Container:", row.row);
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
    },
    { field: "repository", headerName: "Repository", width: 200, flex: 1 },
    { field: "tag", headerName: "Tag", width: 200, flex: 1 },
    { field: "imageId", headerName: "Image Id", width: 200, flex: 1 },
    { field: "size", headerName: "Size", width: 200, flex: 1 },
  ];

  const handleContainerActionAPI = async () => {
    const url = `http://127.0.0.1:5000/server/docker_containers/${serverId.serverId}`;
    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          container: "",
          action: action,
        }),
      });
      if (response.status === 200) {
        const containers = await response.json();
        setContainerList(containers);
      } else if (response.status === 403) {
        alert("Permission denied!");
      } else if (response.status === 500) {
        alert("No data for server!");
      } else {
        alert("Unknown Error!");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
    }
  };

  // CREATE CONTAINERS

  const [openAddContainer, setOpenAddContainer] = useState(false);

  const handleCreateContainer = () => {
    handleCreateContainerAPI();
    setOpenAddContainer(false);
  };

  const handleOpenCreateContainer = () => {
    setOpenAddContainer(true);
  };
  const handleCloseCreateContainer = () => {
    setOpenAddContainer(false);
  };

  const [addContainer, setAddContainer] = useState({
    image: "",
    container_name: "",
  });

  const handleChangeInputAddContainer = (prop) => (event) => {
    setAddContainer({ ...addContainer, [prop]: event.target.value });
  };

  const handleCreateContainerAPI = async () => {
    const url = `http://127.0.0.1:5000/server/docker_create_containers/${serverId.serverId}`;
    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          image: addContainer.image,
          container_name: addContainer.container_name,
        }),
      });
      if (response.status === 200) {
        alert("Add Container Success!");
      } else if (response.status === 403) {
        alert("Permission denied!");
      } else if (response.status === 500) {
        alert("No data for container!");
      } else {
        alert("Something is wrong!");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
    }
  };

  useEffect(() => {
    handleGetContainersAPI();
  }, []);

  // CSS POP UP
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    borderRadius: "20px",
    boxShadow: 24,
    p: 3,
  };

  return (
    <div className="flex flex-col gap-12">
      <div className="projectSection">
        {/* DOCKER PROJECT */}

        <div className="info-title font-semibold my-3">
          <p>Docker Project</p>
        </div>

        <div className="flex flex-col flex-wrap gap-2">
          <h2>Dockerfile</h2>
          <div className="flex flex-row gap-5">
            <TextField
              hiddenLabel
              onChange={handleChangeInput("docker_file")}
              id="filled-hidden-label-small"
              placeholder="C:\...\Dockerfile"
              variant="filled"
              size="small"
              sx={{
                width: "600px",
              }}
            />
          </div>
          <h2>Image tag</h2>

          <div className="flex flex-row gap-5">
            <TextField
              onChange={handleChangeInput("image_tag")}
              hiddenLabel
              id="filled-hidden-label-small"
              placeholder=""
              variant="filled"
              size="small"
              sx={{
                width: "600px",
              }}
            />
            <Button
              variant="contained"
              onClick={handlebuildeDockerFile}
              style={{ marginLeft: "" }}
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
              Build
            </Button>
          </div>

          <h2 className="pt-4">docker-compose.yml</h2>
          <div className="flex flex-row gap-5">
            <TextField
              hiddenLabel
              onChange={handleChangeInput("docker_compose")}
              id="filled-hidden-label-small"
              placeholder="C:\...\docker-compose.yml"
              variant="filled"
              size="small"
              sx={{
                width: "600px",
              }}
            />
            <div>
              <Button
                variant="contained"
                onClick={handleComposeUp}
                style={{ marginLeft: "" }}
                sx={{
                  width: "150px",
                  height: "auto",
                  color: "white",
                  bgcolor: "#3867A5",
                  "&:hover": { bgcolor: "#264B7B" },
                  fontSize: "14px",
                  fontWeight: "normal",
                  textTransform: "none",
                }}
              >
                Compose up
              </Button>

              <Button
                variant="contained"
                onClick={handleComposeDown}
                style={{ marginLeft: "20px" }}
                sx={{
                  width: "150px",
                  height: "auto",
                  color: "white",
                  bgcolor: "#3867A5",
                  "&:hover": { bgcolor: "#264B7B" },
                  fontSize: "14px",
                  fontWeight: "normal",
                  textTransform: "none",
                }}
              >
                Compose down
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ALL IMAGES */}

      <div className="imagesSection">
        <h1 className="text-2xl pb-10 pt-2">All images</h1>
        <div className="flex flex-row gap-4 pb-4">
          <Button
            variant="contained"
            onClick={handleOpenCreateContainer}
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
            Create
          </Button>
          <Button
            variant="contained"
            // onClick={}
            style={{ marginLeft: "" }}
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
            Images
          </Button>
        </div>
        <TableOfImages />
      </div>
      <div className="resultOutput">
        <h1 className="text-2xl pb-10 pt-2">Output result</h1>
        <textarea class="w-full resize-none rounded-md border-4 p-4">
          Build successfully
        </textarea>
      </div>
      <div className="containersSection">
        <h1 className="text-2xl pb-10 pt-2">All containers</h1>
        <div className="flex flex-row gap-4 pb-4">
          {actions.map((action) => (
            <Button
              key={action}
              variant="contained"
              onClick={handleClickChooseAction(action)}
              style={{ marginLeft: "" }}
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
              {action}
            </Button>
          ))}
        </div>

        {/* Table of containers */}
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            onRowClick={handleRowClick}
            initialState={{
              pagination: { paginationModel: { pageSize: 5 } },
            }}
            pageSizeOptions={[5, 10, 25]}
          />
        </div>
      </div>

      {/* Modal Add Container */}
      <Modal
        open={openAddContainer}
        onClose={handleCloseCreateContainer}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <div className="pb-2 text-center border-b-2 border-stone-500">
            <div className="flex flex-row items-center justify-between">
              <p
                className="font-semibold"
                style={{ fontSize: "28px", color: "#637381" }}
              >
                ADD MEMBER
              </p>
              <IconButton onClick={handleCloseCreateContainer}>
                <CloseIcon />
              </IconButton>
            </div>
          </div>

          <Grid container alignItems="center" spacing={2} mt={0}>
            <Grid item xs={12} md={3}>
              <Typography
                className="mt-3"
                style={{
                  fontSize: "16px",
                  fontWeight: "400",
                }}
              >
                Container name:
              </Typography>
            </Grid>
            <Grid item xs={12} md={9}>
              <FormControl fullWidth variant="outlined">
                <OutlinedInput
                  value={addContainer.container_name}
                  onChange={handleChangeInputAddContainer("container_name")}
                  inputProps={{
                    "aria-label": "Container name",
                  }}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container alignItems="center" spacing={2} mt={0}>
            <Grid item xs={12} md={3}>
              <Typography
                className="mt-3"
                style={{
                  fontSize: "16px",
                  fontWeight: "400",
                }}
              >
                Image:
              </Typography>
            </Grid>
            <Grid item xs={12} md={9}>
              <FormControl fullWidth variant="outlined">
                <OutlinedInput
                  value={addContainer.image}
                  onChange={handleChangeInputAddContainer("image")}
                  inputProps={{
                    "aria-label": "mage",
                  }}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Box>
            <Grid container spacing={2} mt={0}>
              <Grid item xs={12} md={3}></Grid>
              <Grid item xs={12} md={3}></Grid>
              <Grid
                item
                xs={12}
                md={3}
                className="d-flex justify-content-center align-items-center"
              >
                <Button onClick={handleCloseCreateContainer}>
                  <Typography variant="button" style={{ color: "red" }}>
                    Cancel
                  </Typography>{" "}
                </Button>
              </Grid>
              <Grid
                item
                xs={12}
                md={3}
                className="d-flex justify-content-center align-items-center"
              >
                <Button
                  variant="contained"
                  onClick={handleCreateContainer}
                  sx={{
                    width: "100px",
                    color: "white",
                    bgcolor: "#6EC882",
                    "&:hover": { bgcolor: "darkgreen" },
                  }}
                >
                  Done
                </Button>
              </Grid>
            </Grid>
          </Box>
          {/* End modal */}
        </Box>
      </Modal>
    </div>
  );
}
