import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function SubscribeBtn() {
  return (
    <Link to={"../subscribe"}>
    <Button
      variant="contained"
      size="large"
      sx={{
        backgroundColor: "#DFEDFF",
        color:"black",
        borderRadius: "8px",
        width: "150px",
        height: "50px",
        fontWeight: "500",
        textTransform: "none",
        border: "2px solid #3867A5",
        "&:hover": {
          backgroundColor: "#3867A5",
          color:"white"
        },
      }}
    >
      Subscribe Us!
    </Button></Link>
  );
};

