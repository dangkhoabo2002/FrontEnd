import React from "react";

import Sidebar from "../components/Sidebar";

import "../css/userSubscribe.css";
import Subscription from "./Subscription";

export default function UserSubscribe() {

  return (
    <div className="">

<div className="containerOrg">
        <div className="sideMenu">
          <Sidebar />
        </div>
        <div className="Organization">
          <Subscription />
        </div>
      </div>

    </div>
  );
}
