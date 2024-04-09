import React from "react";
import Logo from "../assets/logo.png";
import LogoutConfirm from "../components/confirmLogoutManagerModal";

import BackgroundAdmin from "../assets/adminBackground.jpeg";
import { Link } from "react-router-dom";
export default function navAdmin() {
  return (
    <div>
      <nav className="px-4 pl-10">
        <div className="flex justify-between bg-white">
          <Link to={`/`}>
            <div className="flex justify-center items-center">
              <img
                loading="lazy"
                className="object-cover h-18 w-16 	"
                src={Logo}
                alt="Logo"
              />
              <p className="font-black text-xl pl-10">MASTER HELP DESK</p>
            </div>
          </Link>
          <div className="flex justify-center items-center pr-6 ">
            <LogoutConfirm />
          </div>
        </div>
      </nav>
      <img
        loading="lazy"
        style={{ width: "100%", height: "180px", objectFit: "cover" }}
        src={BackgroundAdmin}
        alt="Background"
      />
    </div>
  );
}
