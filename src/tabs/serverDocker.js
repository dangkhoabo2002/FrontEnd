import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import TableOfImages from "../components/tableOfImages";
import TableOfContainers from "../components/tableOfContainers";
export default function serverDocker() {
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
              id="filled-hidden-label-small"
              defaultValue="C:\Users\Nguyen Dang Khoa\Desktop\FPT-Journey\CN5\FER201\REACT_APP\..."
              variant="filled"
              size="small"
              sx={{
                width: "600px",
              }}
            />
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
              Build
            </Button>
          </div>

          <h2 className="pt-4">docker-compose.yml</h2>
          <div className="flex flex-row gap-5">
            <TextField
              hiddenLabel
              id="filled-hidden-label-small"
              defaultValue="C:\Users\Nguyen Dang Khoa\Desktop\FPT-Journey\CN5\FER201\REACT_APP\..."
              variant="filled"
              size="small"
              sx={{
                width: "600px",
              }}
            />
            <div>
              <Button
                variant="contained"
                // onClick={}
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
                // onClick={}
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
