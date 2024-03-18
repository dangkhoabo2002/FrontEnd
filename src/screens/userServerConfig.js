import React from "react";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import Library from "../tabs/serverLibrary";
import ServerReport from "../tabs/serverReport";

export default function UserServerConfig() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
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
        <TabPanel value="1">Item One</TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
        <TabPanel value="4">Item Three</TabPanel>
        <TabPanel value="5">
          <Library />
        </TabPanel>
        <TabPanel value="6">Item Three</TabPanel>
        <TabPanel value="7">
          <ServerReport />
        </TabPanel>
        <TabPanel value="8">Item Three</TabPanel>
      </TabContext>
    </div>
  );
}
