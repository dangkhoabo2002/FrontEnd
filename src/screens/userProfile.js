import React from "react";

import "../css/userProfile.css";
import Sidebar from "../components/Sidebar";
import User from "./User";

export default function UserProfile() {
  return (
    <>
      <div className="containerOrg">
        <div className="sideMenu">
          <Sidebar />
        </div>
        <div className="Organization">
          <User />
        </div>
      </div>
    </>
  );
}
