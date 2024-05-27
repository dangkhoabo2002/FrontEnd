import React from "react";
import Logo from "../assets/logo.png";
import LogoutConfirm from "../components/confirmLogoutManagerModal";
import { Link } from "react-router-dom";

export default function NavAdmin() {
  return (
    <div>
      <nav className="px-4 py-2 bg-white">
        <div className="flex justify-between items-center flex-wrap">
          <Link to={`/`}>
            <div className="flex items-center">
              <img
                loading="lazy"
                className="h-18 w-16 object-cover"
                src={Logo}
                alt="Logo"
              />
              <p className="font-black text-xl pl-10">MASTER HELP DESK</p>
            </div>
          </Link>
          <div className="flex items-center pr-6">
            <LogoutConfirm />
          </div>
        </div>
      </nav>
    </div>
  );
}
