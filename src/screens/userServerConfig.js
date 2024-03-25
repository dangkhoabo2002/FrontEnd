import React from "react";

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
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
                  Organizations
                </p>
              </div>
            </div>

            <div className="mt-3 "></div>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="General" value="1" />
                  <Tab label="Proxy" value="2" />
                  <Tab label="Firewall" value="3" />
                  <Tab label="Docker" value="4" />
                  <Tab label="Library" value="5" />
                  <Tab label="Data" value="6" />
                  <Tab label="Report" value="7" />
                  <Tab label="Execution" value="8" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <General />
              </TabPanel>
              <TabPanel value="2">
                <Proxy />
              </TabPanel>
              <TabPanel value="3">
                <Firewall />
              </TabPanel>
              <TabPanel value="4">
                <Docker />
              </TabPanel>
              <TabPanel value="5">
                <Library />
              </TabPanel>
              <TabPanel value="6">
                <Data/>
              </TabPanel>
              <TabPanel value="7">
                <ServerReport />
              </TabPanel>
              <TabPanel value="8">
                <Execution />
              </TabPanel>
            </TabContext>
          </div>
        </div>
      </div>
    </div>
  );
}
