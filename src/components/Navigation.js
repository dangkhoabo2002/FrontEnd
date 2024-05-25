import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";

export default function Navigation() {
  const checkUser = localStorage.getItem("checkUser");


  return (
    <div style={{ backgroundColor: "white" }}>
      <div className="flex flex-row justify-between items-center px-20 py-4">
        <Link to={`/`}>
          <div className=" flex flex-row items-center gap-x-4">
            <img
              loading="lazy"
              className="object-cover h-18 w-16"
              src={Logo}
              alt="logo"
            />
            <div
              className="text-3xl font-semibold tracking-wide"
              style={{ fontSize: "24px" }}
            >
              <p>MASTER HELP DESK</p>
            </div>
          </div>
        </Link>
        <div className="flex flex-row justify-between items-center gap-x-10 ">
          <a href="../#featureNew">
            <button className="font-semibold">Feature News</button>
          </a>
          <a href="../#aboutUs">
            <button className="font-semibold">About Us</button>
          </a>
          <a href="../#contact">
            <button className="font-semibold">Contact</button>
          </a>
          {!checkUser === "user" ? (
            <Link to={`/organizations`}>
              <button className="bg-[#3867A5] hover:bg-[#2B4B75] text-white py-2 px-6 rounded-full w-40 tracking-widest	">
                <b>Dashboard</b>
              </button>
            </Link>
          ) : (
            <Link to={`/login`}>
              <button className="bg-[#3867A5] hover:bg-[#2B4B75] text-white py-2 px-6 rounded-full w-40 tracking-widest	">
                <b>SIGN IN</b>
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
