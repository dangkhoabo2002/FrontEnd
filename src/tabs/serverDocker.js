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

export default function ServerDocker(serverId) {
  const [loading, setLoading] = useState(false);
  const [loadingContainer, setLoadingContainer] = useState(false);

  const [resultOutput, setResultOutput] = useState();

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
    if (dockerProject.docker_file === "" || dockerProject.image_tag === "") {
      toast.error("Please fill all necessary fields to build!", {
        style: {
          border: "1px solid #FF5733",
          maxWidth: "900px",
          padding: "16px 24px",
          color: "red",
          fontWeight: "bolder",
        },
      });
    } else {
      setLoading(true);

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
          toast.dismiss();

          toast.success("Build dockerfile successfully.", {
            style: {
              border: "1px solid #37E030",
              maxWidth: "900px",
              padding: "16px 24px",
              color: "green",
              fontWeight: "bolder",
            },
          });
        } else if (response.status === 403) {
          toast.dismiss();
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
          toast.dismiss();
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
          toast.dismiss();
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

  const handleComposeUp = async () => {
    if (dockerProject.compose_yaml === "") {
      toast.error("Please enter url of docker-compose.yml !", {
        style: {
          border: "1px solid #FF5733",
          maxWidth: "900px",
          padding: "16px 24px",
          color: "red",
          fontWeight: "bolder",
        },
      });
    } else {
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
          toast.success("Compose up successfull.", {
            style: {
              border: "1px solid #37E030",
              maxWidth: "900px",
              padding: "16px 24px",
              color: "green",
              fontWeight: "bolder",
            },
          });
          setDockerProject({ compose_yaml: "" });
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
      }
    }
  };

  const handleComposeDown = async () => {
    if (dockerProject.compose_yaml === "") {
      toast.error("Please enter url of docker-compose.yml !", {
        style: {
          border: "1px solid #FF5733",
          maxWidth: "900px",
          padding: "16px 24px",
          color: "red",
          fontWeight: "bolder",
        },
      });
    } else {
      setLoading(true);
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
          toast.success("Compose down successfull.", {
            style: {
              border: "1px solid #37E030",
              maxWidth: "900px",
              padding: "16px 24px",
              color: "green",
              fontWeight: "bolder",
            },
          });
          setDockerProject({ compose_yaml: "" });
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

  // GET ALL IMAGES

  const [imageList, setImageList] = useState([]);

  const handleGetImagesAPI = async () => {
    setLoading(true);

    const url = `http://127.0.0.1:5000/server/docker_list_images/${serverId.serverId}`;
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
        toast.error("Something is wrong, try again later!", {
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
  };

  // ACTION IN IMAGES

  // GET ALL CONTAINERS

  const [containerList, setContainerList] = useState([]);

  const handleGetContainersAPI = async () => {
    setLoadingContainer(true);
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
      setLoadingContainer(false);
    }
  };

  // ACTION IN CONTAINER

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

  const columnsImg = [
    {
      field: "repository",
      headerName: "Repository",
      width: 300,
    },
    { field: "tag", headerName: "Tag", width: 200, flex: 1 },
    { field: "image_id", headerName: "Image Id", width: 200, flex: 1 },
    { field: "created", headerName: "Created", width: 300, flex: 1 },
    { field: "size", headerName: "Size", width: 200, flex: 1 },
  ];

  const [selectContainer, setSelectContainer] = useState();
  const [selectImage, setSelectImage] = useState();

  let actions = ["start", "stop", "remove", "restart", "kill"];

  const handleClickChooseAction = (actionName) => () => {
    handleContainerActionAPI(actionName);
  };

  const handleRowClick = (row) => {
    setSelectContainer(row.row);
  };

  const handleRowClickImage = (row) => {
    setSelectImage(row.row);
    console.log(row);
  };

  const handleContainerActionAPI = async (actionName) => {
    if (
      selectContainer?.container_id === "" ||
      selectContainer?.container_id === undefined ||
      selectContainer?.container_id === null
    ) {
      toast.error("Please choose your container first!", {
        style: {
          border: "1px solid #FF5733",
          maxWidth: "900px",
          padding: "16px 24px",
          color: "red",
          fontWeight: "bolder",
        },
      });
    } else if (
      actionName === "" ||
      actionName === null ||
      actionName === undefined
    ) {
      toast.error("Missing action!", {
        style: {
          border: "1px solid #FF5733",
          maxWidth: "900px",
          padding: "16px 24px",
          color: "red",
          fontWeight: "bolder",
        },
      });
    } else {
      toast.loading(`Your action is under process, please wait...`);
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
            container: selectContainer?.container_id,
            action: actionName,
          }),
        });
        if (response.status === 200) {
          toast.dismiss();
          toast.success(`${actionName} successfully.`, {
            style: {
              border: "1px solid #37E030",
              maxWidth: "900px",
              padding: "16px 24px",
              color: "green",
              fontWeight: "bolder",
              textTransform: "capitalize",
            },
          });
          handleGetContainersAPI();
        } else if (response.status === 403) {
          toast.dismiss();
          toast.error("Permission denied, please try again!", {
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
          toast.error("No data for server, please try again!", {
            style: {
              border: "1px solid #F85F60",
              maxWidth: "900px",
              padding: "16px 24px",
              color: "red",
              fontWeight: "bolder",
            },
          });
        } else {
          toast.dismiss();
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
      }
    }
  };

  // CREATE CONTAINERS

  const [openAddContainer, setOpenAddContainer] = useState(false);
  const [addContainer, setAddContainer] = useState({
    image: "",
    container_name: "",
  });

  const handleCreateContainer = () => {
    if (addContainer.image === "") {
      toast.error("Image's field can not be empty!", {
        style: {
          border: "1px solid #FF5733",
          maxWidth: "900px",
          padding: "16px 24px",
          color: "red",
          fontWeight: "bolder",
        },
      });
    } else if (addContainer.container_name === "") {
      toast.error("Container name can not be empty!", {
        style: {
          border: "1px solid #FF5733",
          maxWidth: "900px",
          padding: "16px 24px",
          color: "red",
          fontWeight: "bolder",
        },
      });
    } else {
      handleCreateContainerAPI();
      setOpenAddContainer(false);
    }
  };

  const handleOpenCreateContainer = () => {
    setOpenAddContainer(true);
  };
  const handleCloseCreateContainer = () => {
    setOpenAddContainer(false);
    setAddContainer({ image: "", container_name: "" });
  };

  const handleChangeInputAddContainer = (prop) => (event) => {
    setAddContainer({ ...addContainer, [prop]: event.target.value });
  };

  const handleCreateContainerAPI = async () => {
    toast.loading("Adding new container, please wait...");
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
        toast.dismiss();
        toast.success("Add Container Successfully.", {
          style: {
            border: "1px solid #37E030",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "green",
            fontWeight: "bolder",
          },
        });
        handleGetContainersAPI();
        handleCloseCreateContainer();
      } else if (response.status === 403) {
        toast.dismiss();

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
        toast.dismiss();

        toast.error("No data for container, please try again!", {
          style: {
            border: "1px solid #F85F60",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "red",
            fontWeight: "bolder",
          },
        });
      } else {
        toast.dismiss();

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
    }
  };

  useEffect(() => {
    handleGetContainersAPI();
    handleGetImagesAPI();
  }, []);

  // CSS POP UP

  return (
    <div className="flex flex-col gap-12">
      <Toaster position="bottom-right" reverseOrder={false} />
      <div className="projectSection">
        {/* DOCKER PROJECT */}

        <div className="info-title font-semibold">
          <p>Docker Project</p>
        </div>
        <div
          className="flex flex-col flex-wrap gap-2 bg-[white] mt-4 rounded-md px-8 py-6   shadow-lg"
          style={{ border: "1px solid #89A6CC" }}
        >
          <h2 className="font-bold">Dockerfile</h2>
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
          <h2 className="font-bold">Image tag</h2>

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

          <h2 className="pt-4 font-bold">docker-compose.yml</h2>
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
        <h1 className="text-2xl my-3">All images</h1>
        {loading && (
          <div className="pb-8 pt-4">
            <LinearProgress />
          </div>
        )}
        <div className="flex flex-row pb-4 justify-between">
          <div className="flex flex-row gap-4">
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
              onClick={handleGetImagesAPI}
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

          <div className="flex flex-row pb-4 items-center">
            {selectImage && (
              <>
                <p className="text-center px-2">Selected Images:</p>
                <p className="font-bold text-center px-2">
                  {selectImage?.repository}
                </p>
              </>
            )}
          </div>
        </div>
        <div
          style={{ height: 400, border: "1px solid #89A6CC" }}
          className="bg-[white] rounded-md shadow-lg"
        >
          <DataGrid
            rows={imageList}
            getRowId={(row) => row.image_id}
            columns={columnsImg}
            onRowClick={handleRowClickImage}
            initialState={{
              pagination: { paginationModel: { pageSize: 5 } },
            }}
            pageSizeOptions={[5, 10, 25]}
          />
        </div>
      </div>

      <div className="containersSection">
        <h1 className="text-2xl  my-3">All containers</h1>
        {loadingContainer && (
          <div className="pt-4 pb-8">
            <LinearProgress />
          </div>
        )}
        <div className="flex flex-row justify-between ">
          <div className="flex flex-row gap-4 pb-4">
            <Button
              variant="contained"
              onClick={handleGetContainersAPI}
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
              ps
            </Button>
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
          <div className="flex flex-row pb-4 items-center">
            {selectContainer && (
              <>
                <p className="text-center px-2">Selected Container:</p>
                <p className="font-bold text-center px-4">
                  {selectContainer?.names}
                </p>
              </>
            )}
          </div>
        </div>

        {/* Table of containers */}
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
      </div>
      <div className="resultOutput">
        <h1 className="text-2xl my-3">Output result</h1>
        <textarea
          class="w-full resize-none rounded-md p-4"
          style={{ border: "1px solid #89A6CC" }}
        >
          {resultOutput}
        </textarea>
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
                Add Image
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
                <OutlinedInput value={selectImage} />
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
                  </Typography>
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
