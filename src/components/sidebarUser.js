import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import InventoryIcon from "@mui/icons-material/Inventory";
import ApartmentIcon from "@mui/icons-material/Apartment";
import "../css/SidebarUser.css";

export default function SidebarUser() {
  const [selectedMenu, setSelectedMenu] = useState("profile"); 
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path === "/user") {
      setSelectedMenu("profile");
    } else if (path === "/user/subscribe") {
      setSelectedMenu("subscribe");
    } else if (path === "/organizations") {
      setSelectedMenu("organizations");
    }
  }, [location]);
  return (
    <div
      className="sidebar-container"
      style={{
        borderRight: "1px solid #E5E8EB",
        width: "300px",
        height: "1000px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="font-black text-lg pl-12"></div>
      <div className="flex flex-col">
        <div
          className="gap-3 py-6 px-11 items-center text-[#212B36]"
          style={{ fontSize: "16px" }}
        >
          <b>GENERAL</b>
        </div>
        <div className="">
          <div
            className={`hoverSection ${
              selectedMenu === "profile" ? "selectedMenu" : ""
            }`}
          >
            <Link to={`/user`} onClick={() => setSelectedMenu("profile")}>
              <section className="flex flex-row gap-3 py-4 pl-10 items-center justify-left text-[#637381]">
                <PermIdentityIcon style={{ fontSize: "28px" }} />
                <p className="text-xl font-semibold" style={{ fontSize: "18px" }}>Profile</p>
              </section>
            </Link>
          </div>
          <div
            className={`hoverSection ${
              selectedMenu === "subscribe" ? "selectedMenu" : ""
            }`}
          >
            <Link to={`/user/subscribe`} onClick={() => setSelectedMenu("subscribe")}>
              <section className="flex flex-row gap-3 py-4 pl-10  items-center text-[#637381]">
                <InventoryIcon style={{ fontSize: "28px" }}/>
                <p className="text-xl font-semibold" style={{ fontSize: "18px" }}>Subscribe</p>
              </section>
            </Link>
          </div>
          <div
            className={`hoverSection ${
              selectedMenu === "organizations" ? "selectedMenu" : ""
            }`}
          >
            <Link to={`/organizations`} onClick={() => setSelectedMenu("organizations")}>
              <section className="flex flex-row gap-3 py-4 pl-10  items-center text-[#637381]">
                <ApartmentIcon style={{ fontSize: "28px" }}/>
                <p className="text-xl font-semibold" style={{ fontSize: "18px" }}>Organization</p>
              </section>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
