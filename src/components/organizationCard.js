import React from "react";
import { Box, Typography, Paper, Grid, Avatar } from "@mui/material";
import OrganizationIcon from "@mui/icons-material/Apartment";
import ServerIcon from "../images/serverIcon2.png";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
export default function OrganizationCard({ id, name, description }) {
  const shortDescription = `${description.substring(0, 50)}...`;

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
              <i style={{ color: "#637381" }}> members</i>
            </Typography>
          </div>
          <div
            style={{
              width: "auto",
              height: "56px",
              objectFit: "contain",
              overflow: "hidden",
              display: "flex",
              justifyContent: "left",
              columnGap: "40px",
              alignItems: "center",
            }}
          >
            {/* {servers.map((server) => (
              <img loading="lazy" src={ServerIcon} style={{ width: "50px" }} />
            ))} */}
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
          <AccountTreeOutlinedIcon
            style={{ width: "auto", height: "80px", color: "#637381" }}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
