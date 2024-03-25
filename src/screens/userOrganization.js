import React from "react";
import Sidebar from "../components/Sidebar";
import Organization from "./Organization";
import "../css/userOrganization.css";

export default function userOrganization() {
  return (
    <>
      <div className="containerOrg">
        <div className="sideMenu">
          <Sidebar />
        </div>
        <div className="Organization">
          <Organization />
        </div>
      </div>
    </>
  );
}
