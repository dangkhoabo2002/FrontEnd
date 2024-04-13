import React, { useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function ServerFirewall(serverId) {
  const [trustedServices, setTrustedServices] = useState({
    http: false,
    ftp: false,
    ssh: false,
    telnet: false,
    smtp: false,
  });

  const handleServiceChange = (event) => {
    setTrustedServices({
      ...trustedServices,
      [event.target.name]: event.target.checked,
    });
  };

  // FIRE WALL LEVEL
  const [firewallLevel, setFirewallLevel] = useState("");
  const [isDisable, setIsDisable] = useState(false);

  const handleLevelChange = (prop) => (event) => {
    setFirewallLevel({ ...firewallLevel, [prop]: event.target.value });
    checkDisable();
  };

  const handleFireWallAction = async () => {
    const url = `http://127.0.0.1:5000/server/firewall_action/${serverId.serverId}`;
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
          action: firewallLevel,
          port: "",
          ip: "",
        }),
      });
      if (response.status === 200) {
        const server = await response.json();
      } else {
        alert("Update Fail");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setFirewallLevel("");
    }
  };

  const handleChange = (event) => {
    setFirewallLevel(event.target.value);
  };

  const checkDisable = () => {
    console.log(firewallLevel);

    if (firewallLevel == "enable_firewall") {
      setIsDisable(true);
    } else if (firewallLevel == "disable_firewall") {
      setIsDisable(true);
    } else if (firewallLevel == "reset_firewall") {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  };
  console.log(isDisable);

  // firewall table
  const [firewallData, setFirewallData] = useState();

  const handleAddFirewallAPI = async () => {
    const editUrl = `http://127.0.0.1:5000/server/firewall_rules/${serverId.serverId}`;
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(editUrl, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      if (response.status === 200) {
        const firewallGet = await response.json();
        setFirewallData(firewallGet);
      } else {
        alert("Fail");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
    }
  };

  return (
    <div>
      <div className="info-title font-semibold my-3">
        <p>Firewall Server Setting</p>
      </div>
      {/* SL */}
      <div className="flex flex-row mt-3 gap-32">
        <div className="flex flex-col ">
          <p className="font-bold">Security level:</p>
        </div>
        <div className="flex flex-col">
          <Select
            sx={{ width: "800px", marginLeft: "4px" }}
            size="small"
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={firewallLevel}
            label=""
            onChange={handleChange}
          >
            <MenuItem value={"enable_firewall"}>Enable Firwall</MenuItem>
            <MenuItem value={"disable_firewall"}>Disable firewall</MenuItem>
            <MenuItem value={"allow_port"}>Allow Port</MenuItem>
            <MenuItem value={"allow_ip"}>Allow IP</MenuItem>
            <MenuItem value={"deny_port"}>Deny Port</MenuItem>
            <MenuItem value={"deny_ip"}>Deny IP</MenuItem>
            <MenuItem value={"reset_firewall"}>Reset Firewall</MenuItem>
          </Select>
        </div>
      </div>
      {/* End SL */}
      {/* Trusted Service */}
      {/* <div className="flex flex-row mt-3">
        <div className="flex flex-row gap-28">
          <p>
            <b>Trusted services:</b>
          </p>
          <div
            className="flex flex-col"
            style={{ border: "1px solid", borderRadius: "5px" }}
          >
            <div className=" flex flex-row mx-2">
              <div className="flex flex-col" style={{ marginRight: "200px" }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={trustedServices.http}
                      onChange={handleServiceChange}
                      name="http"
                    />
                  }
                  label="WWW (HTTP)"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={trustedServices.ftp}
                      onChange={handleServiceChange}
                      name="ftp"
                    />
                  }
                  label="FTP"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={trustedServices.ssh}
                      onChange={handleServiceChange}
                      name="ssh"
                    />
                  }
                  label="SSH"
                />
              </div>
              <div className="flex flex-col">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={trustedServices.telnet}
                      onChange={handleServiceChange}
                      name="telnet"
                    />
                  }
                  label="Telnet"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={trustedServices.smtp}
                      onChange={handleServiceChange}
                      name="smtp"
                    />
                  }
                  label="Mail (SMTP)"
                />
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/*End TS */}
      {/* OP */}
      {!isDisable && (
        <div className="flex flex-row mt-3 gap-32">
          <div className="flex flex-col w-24">
            <p className="font-bold">Other information:</p>
            <p>1029:tcp </p>
          </div>
          <div className="flex flex-col ml-3">
            <TextField
              id="outlined-basic"
              value={"192.168.x.xx"}
              onChange={""}
              size="small"
              sx={{ width: "800px" }}
            />
          </div>
        </div>
      )}

      {/* End OP */}
      <div className="my-3">
        <Button
          onClick={handleFireWallAction}
          variant="contained"
          sx={{
            width: "150px",
            bgcolor: "#3867A5",
            "&:hover": { bgcolor: "#264B7B" },
          }}
        >
          Update
        </Button>
      </div>
      <table className="w-full">
            <thead>
              <tr>
                <th>No.</th>
                <th>To</th>
                <th>Action</th>
                <th>From</th>
              </tr>
            </thead>
            <tbody>
              {firewallData &&
                firewallData?.map((firewall, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{firewall[index].to}</td>
                    <td>{firewall[index].action}</td>
                    <td>{firewall[index].from}</td>
                  </tr>
                ))}
            </tbody>
          </table>
    </div>
  );
}
