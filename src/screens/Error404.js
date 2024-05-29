import React from "react";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Error404() {
  return (
    <div
      id="oopss"
      style={{
        background: "linear-gradient(-45deg, #F3F8FF, #DFEDFF)",
        position: "fixed",
        left: "0px",
        top: "0",
        width: "100%",
        height: "100%",
        lineHeight: "1em",
        zIndex: "9999",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        id="error-text"
        style={{
          fontSize: "40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontFamily: "Shabnam, Tahoma, sans-serif",
          color: "black",
          textAlign: "center",
        }}
      >
        <img
          src="https://cdn.rawgit.com/ahmedhosna95/upload/1731955f/sad404.svg"
          alt="404"
          style={{
            margin: "30px auto 10px",
            height: "30vh",
            maxHeight: "342px",
            width: "auto",
          }}
        />
        <span
          style={{
            position: "relative",
            fontSize: "3.3em",
            fontWeight: "900",
            marginBottom: "20px",
          }}
        >
          404
        </span>
        <Typography
          variant="body1"
          component="p"
          className="p-a"
          style={{
            fontSize: "1.2em",
            margin: "20px 0 15px 0",
            color: "black",
          }}
        >
          The page you were looking for could not be found
        </Typography>
        <Typography
          variant="body1"
          component="p"
          className="p-b"
          style={{
            fontSize: "1em",
            margin: "10px 0",
          }}
        >
          <Link to={"/"}>
            <Button
              variant="outlined"
              sx={{
                color: "white",
                marginTop: "10px",
                bgcolor: "#3867A5",
                "&:hover": { bgcolor: "#2A4D7B" },
              }}
            >
              Back to the home page
            </Button>
          </Link>
        </Typography>
      </div>
    </div>
  );
}
