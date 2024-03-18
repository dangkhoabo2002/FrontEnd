import React from "react";
import SubscriptionPackages from "../components/subPackage";
import "./Subscribe.css";
import Logo from "../images/MHDLogo.png";

export default function Subscribe() {
  return (
    <div className="">
      <div class="bg-overlay"></div>
      <div
        className="Logo"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "20px",
        }}
      >
        <img src={Logo} alt="Logo" style={{ width: "96px", height: "96px" }} />
      </div>
      <p
        className="font-semibold text-center"
        style={{
          fontSize: "26px",
          color: "#3867A5",
          fontWeight: "700",
        }}
      >
        Package of MHD
      </p>

      <div className="card mt-3">
        <SubscriptionPackages className="" />
      </div>
    </div>
  );
}
