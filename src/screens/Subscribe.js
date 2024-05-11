import React, { useEffect, useState } from "react";
import SubscriptionPackages from "../components/subPackage";
import "../css/Subscribe.css";
import Logo from "../images/MHDLogo.png";
import { Link } from "react-router-dom";

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
        <Link to={`/`}>
          <img
            loading="lazy"
            src={Logo}
            alt="Logo"
            style={{ width: "96px", height: "96px" }}
          />
        </Link>
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

      <div className="card">
        <SubscriptionPackages className="" />
      </div>
    </div>
  );
}
