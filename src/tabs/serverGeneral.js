import React, { useState } from "react";
import { Paper, p, Grid, Button } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import "../css/serverGeneral.css";
import ServerManager from "../database/listOfServerManager.json";

export default function ServerGeneral() {
  // BTN
  const [isServerOn, setIsServerOn] = useState(true);

  const handleButtonClick = () => {
    setIsServerOn((prevState) => !prevState);
  };

  return (
    <>
      <div>
        {/* Information */}
        <div className="info-site mb-5">
          <div className="info-title font-semibold mb-3">
            <p>Information</p>
          </div>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <div className="flex flex-row justify-between px-5">
              {/* left */}
              <div className="flex flex-col justify-start">
                <p className="gray-text font-semibold my-2">
                  hostamyproject.com
                </p>
                <div className="flex d-flex">
                  <p className="blue-text font-semibold mr-2">Host IP: </p>
                  <p> 177.0.74.189</p>
                </div>
                <div className="flex d-flex my-2">
                  <p className="blue-text font-semibold mr-2">
                    Operating System:{" "}
                  </p>
                  <p>Linux</p>
                </div>
                <div className="flex d-flex my-2">
                  <p className="blue-text font-semibold mr-2">Port: </p>
                  <p>3305</p>
                </div>
                <div className="flex d-flex my-2">
                  <p className="blue-text font-semibold mr-2">Version: </p>
                  <p> 8.0.4-rc-log</p>
                </div>
                <div className="flex d-flex my-2">
                  <p className="blue-text font-semibold mr-2">
                    Disk Space in Data Dir:{" "}
                  </p>
                  <p>99.61GB of 162GB</p>
                </div>
                <div className="flex d-flex my-2">
                  <p className="blue-text font-semibold mr-2">
                    Server Directory:{" "}
                  </p>
                  <p className="link-text">
                    C:\ProgramData\MySQL\MySQL Server 8.0
                  </p>
                </div>
              </div>

              {/* right */}
              <div className="flex flex-col  items-end">
                <div className="flex ">
                  <p className="blue-text font-semibold mr-2">
                    Configuration File:{" "}
                  </p>
                  <p className="link-text">
                    C:\ProgramData\MySQL\MySQL Server 8.0\my.ini
                  </p>
                </div>
                <div className="flex d-flex my-2">
                  <p className="blue-text font-semibold mr-2">RAM: </p>
                  <p>8GB</p>
                </div>
                <div className="flex d-flex my-2">
                  <p className="blue-text font-semibold mr-2">CPU: </p>
                  <p>46%</p>
                </div>
                <div className="flex d-flex my-2">
                  <p className="blue-text font-semibold mr-2">
                    Running Since:{" "}
                  </p>
                  <p>Thu Apr 5 14:13:18 2020</p>
                </div>
              </div>
            </div>
            <div className="px-5 mb-2 flex flex-col items-end">
              <Button
                startIcon={<RefreshIcon />}
                variant="contained"
                className="refreshBtn"
                sx={{ marginTop: 2 }}
              >
                REFRESH
              </Button>
            </div>
          </Paper>
        </div>
        {/* End Information */}

        {/* Member */}
        <div className="member-site mb-5">
          <div className="info-title font-semibold my-3">
            <p>Member</p>
          </div>

          <button class="bg-transparent hover:bg-[#3867A5] text-[#3867A5] font-semibold hover:text-white  border border-[#3867A5] hover:border-transparent rounded px-8 py-1">
            Add member
          </button>

          <div className=" bg-white">
            {/*-------------- Account Table ---------------- */}
            <div className="bg-[#F3F8FF] mt-4 rounded-md px-8 pb-8 shadow-md">
              <table class="table-auto w-full ">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Email</th>
                    <th>ROLE</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      style={{
                        color: "transparent",
                        padding: "0px",
                      }}
                    >
                      .
                    </td>
                  </tr>
                  {ServerManager.map((svmg) => (
                    <tr>
                      <td>{svmg.id}</td>
                      <td>{svmg.email}</td>
                      <td>{svmg.role}</td>
                      <td>Delete</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/*-------------- END OF Account Table ---------------- */}
            </div>
          </div>
        </div>
        {/* End Member */}

        {/* Setting */}
        <div className="setting-site mb-5">
          <div className="info-title font-semibold my-3">
            <p>Setting</p>
          </div>
          <div className="setting-btn">
            <Button
              variant="contained"
              color="error"
              sx={{ borderRadius: 1, marginRight: 2 }}
            >
              DELETE SERVER
            </Button>

            <Button
              variant="contained"
              sx={{ borderRadius: 1, marginRight: 2 }}
              onClick={handleButtonClick}
            >
              {isServerOn ? "Turn off server" : "Turn on server"}
            </Button>
          </div>
        </div>
        {/* End Setting */}
      </div>
    </>
  );
}
