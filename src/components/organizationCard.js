import React from "react";
import { Box, Typography, Paper, Grid, Avatar } from "@mui/material";
import OrganizationIcon from "@mui/icons-material/Apartment";
import ServerIcon from "../images/serIcon.png";

export default function OrganizationCard({ name, membersCount, description }) {
  const shortDescription = `${description.substring(0, 50)}...`;

  return (
    <Paper
      className="mt-3"
      elevation={3}
      sx={{
        padding: 2,
        width: "100%",
        height: "200px",
        flexGrow: 1,
        alignItems:"center",
      }}
    >
      <Grid  container spacing={2} alignItems="center">
        <Grid item xs={12} sm={8} container direction="column">
            <Box className="">
          <Typography gutterBottom variant="subtitle1">
            <p
              style={{
                fontWeight: "700  ",
                fontSize: "20px",
                color: "#3867A5",
              }}
            >
              {name}
            </p>
          </Typography>
          </Box>
          <Typography variant="body2" gutterBottom>
            <i style={{ color: "#637381" }}>{membersCount} members</i>
          </Typography>

          <Avatar sx={{ bgcolor: "grey.200", width: 56, height: 56 }} />
          <Typography variant="body2" color="text.secondary">
            Note: {shortDescription}
          </Typography>
        </Grid>

        <Grid item>
          <img src={ServerIcon} style={{ fontSize: 40 }} />
        </Grid>

      </Grid>
    </Paper>
  );
}
