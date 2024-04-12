import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";

// MUI
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ApartmentIcon from "@mui/icons-material/Apartment";

// import Library from "../tabs/serverLibrary";
// import ServerReport from "../tabs/serverReport";
import General from "../tabs/serverGeneral";
import Proxy from "../tabs/serverProxy";
import Execution from "../tabs/serverExecution";
import Firewall from "../tabs/serverFirewall";
import Library from "../tabs/serverLibrary";
import ServerReport from "../tabs/serverReport";
import Docker from "../tabs/serverDocker";
import Sidebar from "../components/Sidebar";
import Data from "../tabs/serverData";

import "../css/userOrganization.css";

export default function UserServerConfig() {
  // Data from API
  const [serverData, setServerData] = useState("");
  //
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { server_id } = useParams();

  // Get Server Data - GENERAL
  // const handleGetServerData = async () => {
  //   const getUrl = `http://127.0.0.1:5000/server/get_server_data/${server_id}`;
  //   const token = localStorage.getItem("access_token");

  //   try {
  //     const response = await fetch(getUrl, {
  //       method: "GET",
  //       credentials: "include",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Origin": "*",
  //       },
  //     });
  //     if (response.status === 200) {
  //       const server = await response.json();
  //       setServerData(server);
  //     } else {
  //       alert("Update Fail");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   } finally {
  //   }
  // };
  // useEffect(() => {
  //   handleGetServerData();
  // }, []);

  return (
    <div>
      <div className="containerOrg">
        <div className="sideMenu">
          <Sidebar />
        </div>
        <div className="Organization">
          <div className="container px-20">
            <div className=" py-6 text-center border-b-2 border-stone-200 gap-10">
              <div className="header flex flex-row items-center gap-x-3">
                <ApartmentIcon
                  style={{ width: "32px", height: "32px", color: "#637381" }}
                />
                <p
                  className="font-semibold"
                  style={{ fontSize: "28px", color: "#637381" }}
                >
                  Server
                </p>
              </div>
            </div>

            <div className=""></div>
            <TabContext value={value}>
              <Box sx={{}}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                  sx={{
                    "& .MuiTabs-flexContainer": {
                      justifyContent: "space-around",
                      borderBottom: "1px solid #D9D9D9",
                    },
                    "& .MuiTab-root": {
                      minWidth: "auto",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                      textTransform: "capitalize",
                      width: "136px",
                      height: "26px",
                      fontWeight: "bold",
                      color: "black",
                      borderLeft: "1px solid #D9D9D9",
                      borderRight: "1px solid #D9D9D9",
                      transition: "background-color 0s, color 0s",
                      "&.Mui-selected": {
                        color: "black", // Giữ màu chữ đen khi tab được chọn
                      },
                    },
                    "& .Mui-selected": {
                      backgroundColor: "#D9D9D9",
                    },
                    "& .MuiTabs-indicator": {
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  <Tab disableRipple label="General" value="1" />
                  <Tab disableRipple label="Proxy" value="2" />
                  <Tab disableRipple label="Firewall" value="3" />
                  <Tab disableRipple label="Docker" value="4" />
                  <Tab disableRipple label="Library" value="5" />
                  <Tab disableRipple label="Data" value="6" />
                  <Tab disableRipple label="Report" value="7" />
                  <Tab disableRipple label="Execution" value="8" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <General serverId={server_id} />
              </TabPanel>
              <TabPanel value="2">
                <Proxy serverId={server_id} />
              </TabPanel>
              <TabPanel value="3">
                <Firewall serverId={server_id} />
              </TabPanel>
              <TabPanel value="4">
                <Docker serverId={server_id} />
              </TabPanel>
              <TabPanel value="5">
                <Library serverId={server_id} />
              </TabPanel>
              <TabPanel value="6">
                <Data serverId={server_id} />
              </TabPanel>
              <TabPanel value="7">
                <ServerReport serverId={server_id} />
              </TabPanel>
              <TabPanel value="8">
                <Execution serverId={server_id} />
              </TabPanel>
            </TabContext>
          </div>
        </div>
      </div>
    </div>
  );
}
