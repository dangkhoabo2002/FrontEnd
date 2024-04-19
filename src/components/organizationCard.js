import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, Grid, Avatar } from "@mui/material";
import OrganizationIcon from "@mui/icons-material/Apartment";
import ServerIcon from "../images/serverIcon2.png";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import toast, { Toaster } from "react-hot-toast";

export default function OrganizationCard({ id, name, description }) {
  const shortDescription = `${description.substring(0, 50)}...`;

  const [serverCount, setServerCount] = useState();
  const [memberCount, setMemberCount] = useState();

  // GET NUMBER OF SERVER IN ORG
  const handleGetNumberServer = async () => {
    const getUrl = `http://127.0.0.1:5000/server/get_number_server/${id}`;
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(getUrl, {
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
        const numServer = await response.json();
        setServerCount(numServer);
      }
    } catch {
    } finally {
    }
  };

  // GET NUMBER OF MEMBER IN ORG
  const handleGetNumberMember = async () => {
    const getUrl = `http://127.0.0.1:5000/org/get_number_of_users/${id}`;
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(getUrl, {
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
        const numMember = await response.json();
        setMemberCount(numMember);
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
      }
    } catch {
    } finally {
    }
  };

  useEffect(() => {
    handleGetNumberServer();
    handleGetNumberMember();
  }, []);

  console.log(serverCount);
  console.log(memberCount.number_users);
  return (
    <Paper
      className="mt-3 mb-8"
      elevation={3}
      sx={{
        padding: 2,
        width: "100%",
        height: "200px",
        flexGrow: 1,
        alignItems: "center",
      }}
    >
      <Toaster position="top-center" reverseOrder={false} />

      <Grid
        container
        spacing={2}
        alignItems="center"
        sx={{ padding: "10px 80px 10px 40px" }}
      >
        <Grid item xs={8} container direction="column">
          <div className="flex flex-row justify-start items-center gap-20">
            <Typography
              gutterBottom
              variant="subtitle1"
              sx={{ paddingBottom: "12px" }}
            >
              <p
                style={{
                  fontWeight: "700  ",
                  fontSize: "20px",
                  color: "#3867A5",
                  textTransform: "uppercase",
                }}
              >
                {name}
              </p>
            </Typography>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ marginBottom: "18px" }}
            >
              {memberCount.number_users} member(s)
            </Typography>
          </div>
          <div
            style={{
              width: "auto",
              height: "56px",
              objectFit: "contain",
              overflow: "hidden",
              display: "flex",
              flexDirection: "row",
              justifyContent: "left",
              columnGap: "40px",
              alignItems: "center",
            }}
          ></div>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ paddingTop: "16px" }}
          >
            Note: {shortDescription}
          </Typography>
        </Grid>

        <Grid item xs={4} sx={{ display: "flex", justifyContent: "end" }}>
          <img
            src={ServerIcon}
            style={{ width: "auto", height: "100px", color: "#637381" }}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
