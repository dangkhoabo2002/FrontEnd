import React, { useState, useEffect } from "react";
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
import LinearProgress from "@mui/material/LinearProgress";
import toast, { Toaster } from "react-hot-toast";

export default function ServerFirewall(serverId) {
  const [loading, setLoading] = useState(false);

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
  const [port, setPort] = useState("");
  const [isDisable, setIsDisable] = useState(false);

  const handleFireWallAction = async () => {
    if (firewallLevel === "") {
      toast.error("Choose security level before update!", {
        style: {
          border: "1px solid #FF5733",
          maxWidth: "900px",
          padding: "16px 24px",
          color: "red",
          fontWeight: "bolder",
        },
      });
    } else {
      setLoading(true);
      const url = `https://master-help-desk-back-end.vercel.app/server/firewall_action/${serverId.serverId}`;
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
            port: port,
            ip: "",
          }),
        });
        if (response.status === 200) {
          toast.success("Update successfully.", {
            style: {
              border: "1px solid #37E030",
              maxWidth: "900px",
              padding: "16px 24px",
              color: "green",
              fontWeight: "bolder",
            },
          });
          setPort("");
        } else if (response.status === 403) {
          toast.error("Permission denied!", {
            style: {
              border: "1px solid #F85F60",
              maxWidth: "900px",
              padding: "16px 24px",
              color: "red",
              fontWeight: "bolder",
            },
          });
        } else if (response.status === 500) {
          toast.error("No data for server!", {
            style: {
              border: "1px solid #F85F60",
              maxWidth: "900px",
              padding: "16px 24px",
              color: "red",
              fontWeight: "bolder",
            },
          });
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setFirewallLevel("");
        setLoading(false);
      }
    }
  };

  const handleChangePort = (event) => {
    setPort(event.target.value);
  };

  const handleChange = (event) => {
    setFirewallLevel(event.target.value);

    if (
      event.target.value === "enable_firewall" ||
      event.target.value === "disable_firewall" ||
      event.target.value === "reset_firewall" ||
      event.target.value === "allow_ssh" ||
      event.target.value === "allow_telnet"
    ) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  };

  // firewall table
  const [firewallData, setFirewallData] = useState();

  const handleGetFirewallAPI = async () => {
    setLoading(true);
    const editUrl = `https://master-help-desk-back-end.vercel.app/server/firewall_rules/${serverId.serverId}`;
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
      } else if (response.status === 400) {
        toast.error("Missing server information!", {
          style: {
            border: "1px solid #F85F60",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "red",
            fontWeight: "bolder",
          },
        });
      } else if (response.status === 403) {
        toast.error("Permission denied!", {
          style: {
            border: "1px solid #F85F60",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "red",
            fontWeight: "bolder",
          },
        });
      } else if (response.status === 500) {
        toast.error("No data for server!", {
          style: {
            border: "1px solid #F85F60",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "red",
            fontWeight: "bolder",
          },
        });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetFirewallAPI();
  }, []);
  return (
    <div>
      <Toaster position="bottom-right" reverseOrder={false} />

      <div className="info-title font-semibold">
        <p>Firewall Server Setting</p>
      </div>
      {loading && (
        <div className="py-8">
          <LinearProgress />{" "}
        </div>
      )}

      {/* SL */}

      <div
        className="bg-[white] mt-4 rounded-md px-8 py-6  shadow-lg"
        style={{ border: "1px solid #89A6CC" }}
      >
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
              defaultValue=""
              onChange={handleChange}
            >
              <MenuItem value={"enable_firewall"}>Enable Firewall</MenuItem>
              <MenuItem value={"disable_firewall"}>Disable firewall</MenuItem>
              <MenuItem value={"allow_port"}>Allow Port</MenuItem>
              <MenuItem value={"allow_ip"}>Allow IP</MenuItem>
              <MenuItem value={"deny_port"}>Deny Port</MenuItem>
              <MenuItem value={"deny_ip"}>Deny IP</MenuItem>
              <MenuItem value={"reset_firewall"}>Reset Firewall</MenuItem>
              <MenuItem value={"allow_ssh"}>Allow SSH</MenuItem>
              <MenuItem value={"allow_telnet"}>Allow Telnet</MenuItem>
            </Select>
          </div>
        </div>

        {!isDisable && (
          <div className="flex flex-row mt-3 gap-32">
            <div className="flex flex-col w-24">
              <p className="font-bold">Other information:</p>
              <p>1029:tcp </p>
            </div>
            <div className="flex flex-col ml-3">
              <TextField
                id="outlined-basic"
                placeholder="192.168.x.xx"
                value={port}
                onChange={handleChangePort}
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
      </div>
      <hr
        className="my-2"
        style={{
          color: "#637381",
          background: "#637381",
          border: "0",
          height: "1px",
          margin: "20px 0 20px",
        }}
      />
      <div
        className="bg-[white] rounded-md px-8 pb-8 shadow-lg"
        style={{ border: "1px solid #89A6CC" }}
      >
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
                  <td>{firewall?.to}</td>
                  <td>{firewall?.action}</td>
                  <td>{firewall?.from}</td>
                </tr>
              ))}
          </tbody>
        </table>{" "}
      </div>
      <div className="resultOutput mt-10">
        <h1 className="text-2xl my-3">Output result</h1>
        <textarea
          className="w-full resize-none rounded-md p-4"
          style={{
            border: "1px solid #89A6CC",
            maxHeight: "8em",
            overflow: "auto",
          }}
        >
          Build successfully
        </textarea>
      </div>
    </div>
  );
}
