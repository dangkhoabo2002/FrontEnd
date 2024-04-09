import React from "react";
import "../css/userOrganization.css";
import Sidebar from "../components/Sidebar";
import Guide from "./Guide";

export default function userGuide() {
  return (
    <>
      <div className="containerOrg">
        <div className="sideMenu">
          <Sidebar />
        </div>
        <div className="Organization">
          <Guide />
        </div>
      </div>
    </>
  );
}
