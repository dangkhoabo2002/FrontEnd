import React from "react";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import SidebarUser from "../components/sidebarUser";
import NavigationUser from "../components/navUserProfile";
import backgroundPackage from "../assets/backgroundUserPackage.png";
import chip from "../assets/chip.png";

import "../css/userSubscribe.css";

export default function userSubscribe() {
  return (
    <div className="">
      {/*-------------- Navigation + Backgroud---------------- */}

      <NavigationUser />

      {/*-------------- END OF Navigation + Backgroud---------------- */}

      {/*-------------- LayoutBody ---------------- */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 3fr",
          height: "52vh",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <SidebarUser />
        </div>
        <div className="flex flex-col px-20 py-10">
          <div className="purchasedPackage">
            <h1>YOUR SUBSCRIPTION</h1>
            <h2>
              These are your current subscriptions. They will be charged within
              the same billing cycle. You can update at any time.
            </h2>
            <div className="packageCard">
              <div className="imgCard">
                <img src={chip} />
              </div>
              <Divider orientation="vertical" variant="middle" />

              <div className="packageInfo px-20">
                <span className="flex flex-row justify-between items-center">
                  <p className="font-bold text-large text-[#3867A5]">
                    PACKAGE 2
                  </p>
                  <p>5 Organizations</p>
                </span>
                <span>
                  <h2>Organization:</h2>
                  <ul>
                    <li>2 Super Admin </li>
                    <li>10 Members </li>
                  </ul>
                </span>
              </div>
              <div className="packageSetting flex flex-col justify-around pl-10">
                <Button variant="text">Text</Button>{" "}
                <Button variant="contained">Contained</Button>
              </div>
            </div>
          </div>
          <div className="billingInfo flex flex-col">
            <h1>PAY</h1>
            <div className="billingInfoBox">
              <h1>BILLING INFORMATION</h1>
              <h2>BILLING INFORMATION</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
