import React, { useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  TextField,
  Button,
} from "@mui/material";

export default function ServerFirewall() {
  const [serverLevel, setServerLevel] = useState("");
  const [trustedServices, setTrustedServices] = useState({
    http: false,
    ftp: false,
    ssh: false,
    telnet: false,
    smtp: false,
  });

  const handleLevelChange = (event) => {
    setServerLevel(event.target.value);
  };

  const handleServiceChange = (event) => {
    setTrustedServices({
      ...trustedServices,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <div>
      <div className="info-title font-semibold my-3">
        <p>Firewall Server Setting</p>
      </div>
      {/* SL */}
      <div className="flex flex-row mt-3">
        <div className="flex flex-col mr-5 pr-40">
          <p>
            <b>Security level:</b>
          </p>
        </div>
        <div className="flex flex-col">
          <Select
            sx={{ width: "800px" }}
            size="small"
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={serverLevel}
            label=""
            onChange={handleLevelChange}
          >
            <MenuItem value={"1"}>Enable Firwall</MenuItem>
            <MenuItem value={2}>Disable firewall</MenuItem>
            <MenuItem value={3}>Enable Port</MenuItem>
            <MenuItem value={4}>Enable IP</MenuItem>
            <MenuItem value={5}>Disable Port</MenuItem>
            <MenuItem value={6}>Disable IP</MenuItem>
          </Select>
        </div>
      </div>
      {/* End SL */}
      {/* TS */}
      <div className="flex flex-row mt-3">
        <div className="flex flex-col">
          <p>
            <b>Trusted services:</b>
          </p>
          <div
            className="flex flex-col"
            style={{ border: "1px solid", borderRadius: "5px" }}
          >
            <div className=" flex flex-row justify-start mx-2">
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
      </div>
      {/*End TS */}
      {/* OP */}
      <div className="flex flex-row mt-3">
        <div className="flex flex col  pr-40">
          <p className="mr-1">
            <b>Other ports: </b>
          </p>{" "}
          <p>1029:tcp </p>
        </div>
        <div className="flex flex col">
          <TextField
            id="outlined-basic"
            value={"192.168.x.xx"}
            onChange={""}
            disabled={"isDisabled"}
            size="small"
            sx={{ width: "800px" }}
          />
        </div>
      </div>
      {/* End OP */}
      <div className="my-3">
        <Button
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
    </div>
  );
}
