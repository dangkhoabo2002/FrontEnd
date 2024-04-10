import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import "../css/Sidebar.css";
import ApartmentIcon from "@mui/icons-material/Apartment";
import BookIcon from "@mui/icons-material/Book";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";

export default function Sidebar() {
  return (
    <div
      style={{
        borderRight: "1px solid #E5E8EB",
        width: "280px",
        height: "1000px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="py-10 px-8">
        <Link to={"/"}>
          <img alt="logo" loading="lazy" style={{ width: "70px" }} src={Logo} />
        </Link>
      </div>
      <div className="flex flex-col">
        <div
          className="gap-3 py-2 px-11 items-center text-[#212B36]"
          style={{
            fontSize: "16px",
          }}
        >
          <b>GENERAL</b>
        </div>
        <Link to={`/organizations`}>
          <div className="hoverSection">
            <section className="flex flex-row gap-3 py-4 px-11 items-center text-[#637381]">
              <ApartmentIcon />
              <p className="text-xl font-semibold">Organization</p>
            </section>
          </div>
        </Link>
        <Link to={`/guide`}>
          <div className="hoverSection">
            <section className="flex flex-row gap-3 py-4 px-11 items-center text-[#637381]">
              <BookIcon />
              <p className="text-xl font-semibold">Guide</p>
            </section>
          </div>
        </Link>
        <div
          className="gap-3 py-2 mt-4 px-11 items-center text-[#212B36]"
          style={{ fontSize: "16px" }}
        >
          <b>MANAGEMENT</b>
        </div>

        <Link to={`/user`}>
          <div className="hoverSection">
            <section className="flex flex-row gap-3 py-4 px-11 items-center text-[#637381]">
              <PermIdentityIcon />
              <p className="text-xl font-semibold">Profile</p>
            </section>
          </div>
        </Link>
        {/* <Link to={`/setting`}>
          <div className="hoverSection">
            <section className="flex flex-row gap-3 py-4 px-11 items-center text-[#637381]">
              <SettingsIcon />

              <p className="text-xl font-semibold">Settings</p>
            </section>
          </div>
        </Link> */}
      </div>
    </div>
  );
}
