import React from "react";
import bgLogin from "../../images/loginBackgr.png";
import Logo from "../../images/MHDLogo.png";
import loginLeft from "../../images/loginLeft.png";

export default function Login() {
  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          backgroundImage: `url(${bgLogin})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "100%",
          filter: "blur(2px)",
        }}
      ></div>

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "65vw",
          height: "70vh",
          backgroundColor: "white",
          zIndex: "0",

          borderRadius: "5px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          className="Logo"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={Logo}
            alt="Logo"
            style={{ width: "96px", height: "96px" }}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={loginLeft}
            alt="Login Left"
            style={{ width: "60px", height: "60px" }}
          />

          <div
            style={{
              height: "60px",
              width: "1px",
              background: "gray",
              marginRight: "10px",
              marginLeft: "10px",
            }}
          ></div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "10px",
            }}
          >
            <span style={{ fontWeight: "bold" }}>Sign in</span>
            <span>Enter your details below</span>
          </div>
        </div>
      </div>
    </div>
  );
}
