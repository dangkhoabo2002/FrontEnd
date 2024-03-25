import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import TableOfImages from "../components/tableOfImages";
import TableOfContainers from "../components/tableOfContainers";
export default function serverDocker() {
  return (
    <div className="flex flex-col gap-12">
      <div className="projectSection">
        <h1 className="text-2xl pb-10 pt-2">Docker Project</h1>
        <div className="flex flex-col flex-wrap gap-2">
          <h2>Dockerfile</h2>
          <div className="flex flex-row gap-20">
            <TextField
              hiddenLabel
              id="filled-hidden-label-small"
              defaultValue="C:\Users\Nguyen Dang Khoa\Desktop\FPT-Journey\CN5\FER201\REACT_APP\..."
              variant="filled"
              size="small"
              sx={{
                width: "800px",
              }}
            />
            <Button variant="outlined" size="large">
              <a
                class="normal-case btn btn-sm btn-default disabled px-4 "
                href="#"
                role="button"
              >
                Build
              </a>
            </Button>
          </div>

          <h2 className="pt-4">docker-compose.yml</h2>
          <div className="flex flex-row gap-20">
            <TextField
              hiddenLabel
              id="filled-hidden-label-small"
              defaultValue="C:\Users\Nguyen Dang Khoa\Desktop\FPT-Journey\CN5\FER201\REACT_APP\..."
              variant="filled"
              size="small"
              sx={{
                width: "800px",
              }}
            />
            <Button variant="outlined" size="large">
              <a
                class="normal-case btn btn-sm btn-default disabled px-4 "
                href="#"
                role="button"
              >
                Build
              </a>
            </Button>
          </div>
        </div>
      </div>
      <div className="imagesSection">
        <h1 className="text-2xl pb-10 pt-2">All images</h1>
        <div className="flex flex-row gap-4 pb-4">
          <Button variant="outlined" size="small">
            <a
              class="normal-case btn btn-sm btn-default disabled px-4 "
              href="#"
              role="button"
            >
              Create
            </a>
          </Button>
          <Button variant="outlined" size="small">
            <a
              class="normal-case btn btn-sm btn-default disabled px-4 "
              href="#"
              role="button"
            >
              Images
            </a>
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
          <Button variant="outlined" size="small">
            <a
              class="normal-case btn btn-sm btn-default disabled px-4 "
              href="#"
              role="button"
            >
              PS
            </a>
          </Button>
          <Button variant="outlined" size="small">
            <a
              class="normal-case btn btn-sm btn-default disabled px-4 "
              href="#"
              role="button"
            >
              Start
            </a>
          </Button>
          <Button variant="outlined" size="small">
            <a
              class="normal-case btn btn-sm btn-default disabled px-4 "
              href="#"
              role="button"
            >
              Stop
            </a>
          </Button>
          <Button variant="outlined" size="small">
            <a
              class="normal-case btn btn-sm btn-default disabled px-4 "
              href="#"
              role="button"
            >
              Kill
            </a>
          </Button>
          <Button variant="outlined" size="small">
            <a
              class="normal-case btn btn-sm btn-default disabled px-4 "
              href="#"
              role="button"
            >
              Restart
            </a>
          </Button>
          <Button variant="outlined" size="small">
            <a
              class="normal-case btn btn-sm btn-default disabled px-4 "
              href="#"
              role="button"
            >
              Remove
            </a>
          </Button>
        </div>
        <TableOfContainers />
      </div>
    </div>
  );
}
