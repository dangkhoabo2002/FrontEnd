import React from "react";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import BackgroundUserProfile from "../assets/userBackground.png";
import LogoutConfirm from "../components/confirmLogoutModal";
export default function NavUserProfile() {
  return (
    <div>
      <nav className="px-4 pl-10">
        <div className="flex justify-between bg-white">
          <Link to={`/`}>
            <div className="flex justify-center items-center">
              <img className="object-cover h-18 w-16 	" src={Logo} alt="Logo" />
              <p className="font-black text-xl pl-10">MASTER HELP DESK</p>
            </div>
          </Link>
          <div className="flex justify-center items-center pr-6 ">
            <LogoutConfirm />
          </div>
        </div>
      </nav>
      <img
        style={{
          width: "100%",
          height: "240px",
          objectFit: "cover",
        }}
        src={BackgroundUserProfile}
        alt="Background"
      />
    </div>
  );
}
