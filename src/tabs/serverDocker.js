import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import TableOfImages from "../components/tableOfImages";
import TableOfContainers from "../components/tableOfContainers";
import handleCheckPass from "../functions/checkPass";
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
  // ALL IMAGES

  return (
    <div className="flex flex-col gap-12">
      <div className="projectSection">
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
      <div className="imagesSection">
        <h1 className="text-2xl pb-10 pt-2">All images</h1>
        <div className="flex flex-row gap-4 pb-4">
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
            PS
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
            Start
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
            Stop
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
            Kill
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
            Restart
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
            Remove
          </Button>
        </div>
        <TableOfContainers />
      </div>
    </div>
  );
}
