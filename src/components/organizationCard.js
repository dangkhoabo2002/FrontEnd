import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Box, Typography, Paper, Grid, Avatar } from "@mui/material";
import ServerIcon from "../images/serverIcon2.png";
import toast, { Toaster } from "react-hot-toast";
import DnsIcon from "@mui/icons-material/Dns";
import OrgIcon from "../assets/orgIcon.png";
import "../css/orgCard.css";

export default function OrganizationCard({ id, name, description }) {
  const shortDescription = `${description.substring(0, 50)}...`;

  const [serverCount, setServerCount] = useState();
  const [memberCount, setMemberCount] = useState();

  const numberServer = serverCount?.number_server;

  const serverIcons = [];
  for (let i = 0; i < numberServer; i++) {
    serverIcons.push(
      <img
        src={ServerIcon}
        style={{
          border: "1px solid #3867A5",
          borderRadius: "5px",
          width: "auto",
          height: "50px",
          color: "#637381",
          padding: "9px",
        }}
      />
      // <DnsIcon key={i} style={{
      //   border: "1px solid #3867A5",
      //   borderRadius: "5px",
      //   color: "#637381", fontSize: "3rem" }} />
    );
  }
  const [organizations, setOrganizations] = useState();

  // GET information của Org từ API
  const handleGetOrgData = async () => {
<<<<<<< HEAD
<<<<<<< HEAD
    toast.loading("In processing..");
    const loginUrl = `https://master-help-desk-back-end.vercel.app/org/get_organization_data/${id}`;
=======
    const loginUrl = `http://127.0.0.1:5000/org/get_organization_data/${id}`;
>>>>>>> mergeBranch
=======
    const loginUrl = `https://master-help-desk-back-end.vercel.app/org/get_organization_data/${id}`;
>>>>>>> mergeBranch
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(loginUrl, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      if (response.status === 200) {
        toast.dismiss();
        const orgData = await response.json();
        setOrganizations(orgData);
      } else if (response.status === 400) {
        toast.error("Unindentified organization, please Login again!", {
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
      } else if (response.status === 404) {
        toast.error("Organization not found!", {
          style: {
            border: "1px solid #F85F60",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "red",
            fontWeight: "bolder",
          },
        });
      } else if (response.status === 500) {
        toast.error("Fail to get organization data!", {
          style: {
            border: "1px solid #F85F60",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "red",
            fontWeight: "bolder",
          },
        });
      } else {
        toast.error("Something wrong, please try again later!", {
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
    }
  };

  // GET NUMBER OF SERVER IN ORG
  const handleGetNumberServer = async () => {
<<<<<<< HEAD
<<<<<<< HEAD
    toast.loading("In processing..");

    const getUrl = `https://master-help-desk-back-end.vercel.app/server/get_number_server/${id}`;
=======
    const getUrl = `http://127.0.0.1:5000/server/get_number_server/${id}`;
>>>>>>> mergeBranch
=======
    const getUrl = `https://master-help-desk-back-end.vercel.app/server/get_number_server/${id}`;
>>>>>>> mergeBranch
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
<<<<<<< HEAD
<<<<<<< HEAD
    toast.loading("In processing..");

    const getUrl = `https://master-help-desk-back-end.vercel.app/org/get_number_of_users/${id}`;
=======
    const getUrl = `http://127.0.0.1:5000/org/get_number_of_users/${id}`;
>>>>>>> mergeBranch
=======
    const getUrl = `https://master-help-desk-back-end.vercel.app/org/get_number_of_users/${id}`;
>>>>>>> mergeBranch
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

  // console.log("Organizations", organizations.status);

  useEffect(() => {
    handleGetOrgData();
    handleGetNumberServer();
    handleGetNumberMember();
  }, []);

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
        position: "relative",
      }}
    >
      <Toaster position="bottom-right" reverseOrder={false} />
      {/* Online indicator */}
      {organizations && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            zIndex: 1,
            overflow: "hidden",
          }}
        >
          <i
            className={
              organizations[0].organization_status === "ACTIVE"
                ? "status-icon positive"
                : "status-icon2 negative"
            }
          ></i>
        </div>
      )}

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
              {memberCount?.number_users} member(s)
            </Typography>
          </div>
          <div
            style={{
              width: "auto",
              height: "65px",
              objectFit: "contain",
              overflow: "hidden",
              display: "flex",
              flexDirection: "row",
              justifyContent: "left",
              columnGap: "8px",
              alignItems: "center",
              paddingBottom: "12px",
            }}
          >
            {serverIcons}
          </div>

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
            src={OrgIcon}
            style={{
              filter:
                "brightness(0) saturate(100%) invert(11%) sepia(13%) saturate(7467%) hue-rotate(204deg) brightness(95%) contrast(96%)",
              width: "auto",
              height: "120px",
            }}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
