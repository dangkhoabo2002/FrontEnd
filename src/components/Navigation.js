import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";

export default function Navigation() {
  return (
    <div>
      <div className="flex flex-row justify-between items-center px-20 py-4">
        <Link to={`/`}>
          <div className=" flex flex-row items-center gap-x-4">
            <img className="object-cover h-18 w-16" src={Logo} alt="logo" />
            <div className="text-3xl font-semibold tracking-wide">
              Master Help Desk
            </div>
          </div>
        </Link>
        <div className="flex flex-row justify-between items-center gap-x-10 ">
          <Link to={`/contact`}>
            <p>
              <button className="font-semibold">About Us</button>
            </p>
          </Link>
          <Link to={`/admin`}>
            <p>
              <button className="font-semibold">Admin</button>
            </p>
          </Link>
          <Link to={`/user`}>
            <p>
              <button className="font-semibold">User</button>
            </p>
          </Link>
          <Link to={`/sidebar`}>
            <p>
              <button className="font-semibold">Sidebar</button>
            </p>
          </Link>
          <Link to={`/`}>
            <p>
              <button className="font-semibold">Solutions</button>
            </p>
          </Link>
          <button class="bg-[#3867A5] hover:bg-blue-700 text-white  py-2 px-6 rounded-full">
            Create MHD account
          </button>
        </div>
      </div>
    </div>
  );
}
