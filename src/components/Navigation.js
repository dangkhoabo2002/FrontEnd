import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { Button } from "@mui/material";

export default function Navigation() {
  return (
    <div style={{ backgroundColor: "white" }}>
      <div className="flex flex-row justify-between items-center px-20 py-4">
        <Link to={`/`}>
          <div className=" flex flex-row items-center gap-x-4">
            <img className="object-cover h-18 w-16" src={Logo} alt="logo" />
            <div
              className="text-3xl font-semibold tracking-wide"
              style={{ fontSize: "24px" }}
            >
              <p>MASTER HELP DESK</p>
            </div>
          </div>
        </Link>
        <div className="flex flex-row justify-between items-center gap-x-10 ">
          <a href="#featureNew">
            <button className="font-semibold">Feature News</button>
          </a>
          <a href="#solution">
            <button className="font-semibold">Solution</button>
          </a>

          <a href="#contact">
            <button className="font-semibold">Contact</button>
          </a>
          <Link to={`/aboutUs`}>
            <p>
              <button className="font-semibold">About Us</button>
            </p>
          </Link>
          <Link to={`/admin`}>
            <p>
              <button className="font-semibold">Admin</button>
            </p>
          </Link>
          <Link to={`/organizations`}>
            <p>
              <button className="font-semibold">Organization</button>
            </p>
          </Link>
          <Link to={`/login`}>
            <button className="bg-[#3867A5] hover:bg-[#2B4B75] text-white py-2 px-6 rounded-full">
              Create MHD account
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
