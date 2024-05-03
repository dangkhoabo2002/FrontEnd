import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// MUI
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

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
  const { organization_id } = useParams();

  const orgName = localStorage.getItem("org_name");
  console.log("orgName", orgName);
  
  // Get Server Data - GENERAL
  const handleGetServerData = async () => {
    const getUrl = `http://127.0.0.1:5000/server/get_server_data/${server_id}`;
    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch(getUrl, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      if (response.status === 200) {
        const server = await response.json();
        setServerData(server);
      } else {
        alert("Update Fail");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
    }
  };
  useEffect(() => {
    handleGetServerData();
  }, []);


  // GET SERVER BY ID
  const [data, setData] = useState();
  const handleGetServer = async () => {
    const loginUrl = `http://127.0.0.1:5000/server/get_server_by_id/${server_id}`;
    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch(loginUrl, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true",
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        setData(data);
      } else {
        alert("Delete Fail");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
    }
  };

  useEffect(() => {
    handleGetServer();
  }, []);

  return (
    <div>
      <div className="containerOrg" style={{overflowX:"hidden",}}>
        <div className="sideMenu">
          <Sidebar />
        </div>
        <div
          className="Organization"
          style={{
            width: "100%",
            boxSizing: "border-box",
            backgroundColor: "#f3f3fb",
          }}
        >
            <div
              className="flex flex-row py-6 text-center gap-10"
              style={{
                
                backgroundColor: "white",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="">
              <div className="header flex flex-row items-center gap-x-3  pl-20">
                <Link
                  to={"/organizations"}
                  className="flex flex-row items-center gap-x-3"
                >
                  <ApartmentIcon
                    style={{ width: "32px", height: "32px", color: "#637381" }}
                  />
                  <p
                    className="font-semibold"
                    style={{ fontSize: "28px", color: "#637381" }}
                  >
                    Organizations <ArrowForwardIosIcon />
                  </p>
                </Link>
                <Link to={`/organizations/dashboard/${organization_id}`}>
                  <span
                    className="font-semibold"
                    style={{
                      fontSize: "28px",
                      color: "#637381",
                    }}
                  >
                    {orgName} <ArrowForwardIosIcon />
                  </span>
                </Link>
                <span
                  className="font-semibold"
                  style={{
                    fontSize: "28px",
                    color: "#637381",
                  }}
                >
                  {data?.server_name}
                </span>
              </div>
              </div>            
              
              
              {serverData && (
                <div
                  style={{
                    textAlign: "center",
                    alignContent: "center",
                    width: "10%",
                    color: "white",
                    borderRadius: "100px",
                    backgroundColor:
                    serverData.status === "ACTIVE"
                        ? "#6EC882"
                        : "#999999",
                    fontSize: "18px",
                    fontWeight: "bold",
                    textTransform: "none",
                  }}
                >
                  {serverData.status === "ACTIVE"
                    ? "Online"
                    : "Offline"}
                </div>
              )}
              
              </div>

              {/* Online status */}


              {/* Online status */}
              {/* <div
  style={{
    marginLeft: "583px",
    textAlign: "center",
    alignContent: "center",
    width: "10%",
    color: "white",
    borderRadius: "100px",
    backgroundColor: status === "ACTIVE" ? "#6EC882" : "#999999",
    fontSize: "18px",
    fontWeight: "bold",
    textTransform: "none",
  }}
>
  {status === "ACTIVE" ? "Online" : "Offline"}
</div> */}

          <div className="container px-16 py-3 mt-2">
            <div className=""></div>
            <TabContext value={value}>
              <Box
                sx={{
                  borderColor: "divider",
                  width: "72.1vw",
                  overflow: "hidden",
                  border: "2px solid #D9D9D9",
                  borderRadius: "5px",

                  backgroundColor: "white",
                }}
              >
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                  sx={{
                    "& .MuiTabs-flexContainer": {
                      // borderBottom: "1px solid #D9D9D9",
                      // borderTop: "1px solid #D9D9D9",
                    },
                    "& .MuiTab-root": {
                      minWidth: "auto",
                      textTransform: "capitalize",
                      width: "138px",
                      fontWeight: "bold",
                      color: "black",

                      // borderLeft: "1px solid #D9D9D9",
                      // borderRight: "1px solid #D9D9D9",
                      transition: "background-color 0.3s, color 0.3s",
                      "&.Mui-selected": {
                        color: "black",
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
              <TabPanel sx={{ pt: 3, px: 0}} value="1">
                <General serverId={server_id} />
              </TabPanel>
              <TabPanel sx={{ pt: 3, px: 0 }} value="2">
                <Proxy serverId={server_id} />
              </TabPanel>
              <TabPanel sx={{ pt: 3, px: 0 }} value="3">
                <Firewall serverId={server_id} />
              </TabPanel>
              <TabPanel sx={{ pt: 3, px: 0 }} value="4">
                <Docker serverId={server_id} />
              </TabPanel>
              <TabPanel sx={{ pt: 3, px: 0 }} value="5">
                <Library serverId={server_id} />
              </TabPanel>
              <TabPanel sx={{ pt: 3, px: 0 }} value="6">
                <Data serverId={server_id} />
              </TabPanel>
              <TabPanel sx={{ pt: 3, px: 0 }} value="7">
                <ServerReport serverId={server_id} />
              </TabPanel>
              <TabPanel sx={{ pt: 3, px: 0 }} value="8">
                <Execution serverId={server_id} />
              </TabPanel>
            </TabContext>
          </div>
        </div>
      </div>
    </div>
  );
}
