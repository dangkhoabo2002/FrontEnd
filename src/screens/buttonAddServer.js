import React from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import bgLogin from "../images/loginBackgr.png";
import "../css/login.css"


export default function ButtonAddServer() {
  return (
    <>
    <div
        className="login-background"
        style={{ backgroundImage: `url(${bgLogin})` }}
      ></div>
      <Fab
      className="buttonAddServer"
        color="primary"
        aria-label="add"
        style={{
          width: "80px",
          height: "80px",
          backgroundColor: "#6EC882",
          position: "fixed",
          bottom: 50,
          right: 32,
        }}
      >
        <AddIcon />
        {/* <span className="buttonAddServerHover">Learn More</span> */}
      </Fab>
    </>
  );
}
