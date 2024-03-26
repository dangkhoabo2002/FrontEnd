import React from "react";
import { Link } from "react-router-dom";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import InventoryIcon from '@mui/icons-material/Inventory';
import SettingsIcon from '@mui/icons-material/Settings';


export default function sidebarUser() {
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
      <div className="font-black py-3 text-lg pl-12"></div> 
      <div className="flex flex-col">
      <div className="gap-3 py-2 px-11 items-center text-[#212B36]" style={{fontSize:"12px"}}><b>GENERAL</b></div>

        <div className="hoverSection ">
          <Link to={`/user`}>
            <section className="flex flex-row gap-3 py-4 pl-12 items-center justify-left text-[#637381]">
              <PermIdentityIcon/>
              <p className="text-xl font-semibold">Profile</p>
            </section>
          </Link>
        </div>
        <div className="hoverSection">
          <Link to={`/user/subscribe`}>
            <section className="flex flex-row gap-3 py-4 pl-12 items-center text-[#637381]">
              <InventoryIcon/>
              <p className="text-xl font-semibold">Subscribe</p>
            </section>
          </Link>
        </div>
        <div className="hoverSection">
          <Link to={`/organizations`}>
            <section className="flex flex-row gap-3 py-4 pl-12 items-center text-[#637381]">
             <SettingsIcon/>
              <p className="text-xl font-semibold">Organization</p>
            </section>
          </Link>
        </div>
      </div>
    </div>
  );
}
