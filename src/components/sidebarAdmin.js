import React from "react";
import { Link } from "react-router-dom";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SettingsIcon from '@mui/icons-material/Settings';


export default function sidebarAdmin() {
  return (
    <div
      style={{
        borderRight: "1px solid #E5E8EB",
        width: "100%",
        height: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="font-black py-3 text-lg pl-12"></div>
      <div className="gap-3 py-2 px-11 items-center text-[#212B36]" style={{fontSize:"12px"}}><b>GENERAL</b></div>

      <div className="flex flex-col">
        <div className="hoverSection ">
          <Link to={`/admin`}>
          <section className="flex flex-row gap-3 py-4 pl-12 items-center justify-left text-[#637381]">
              <ManageAccountsIcon/>
              <p className="text-xl font-semibold">Account Management</p>
            </section>
          </Link>
        </div>
        <div className="hoverSection">
          <Link to={`/admin/billing`}>
          <section className="flex flex-row gap-3 py-4 pl-12 items-center justify-left text-[#637381]">
              <ReceiptIcon/>
              <p className="text-xl font-semibold">Billings</p>
            </section>
          </Link>
        </div>

        <div className="hoverSection">
          <Link to={`/admin/setting`}>
          <section className="flex flex-row gap-3 py-4 pl-12 items-center justify-left text-[#637381]">
              <SettingsIcon/>

              <p className="text-xl font-semibold">Settings</p>
            </section>
          </Link>
        </div>
      </div>
    </div>
  );
}
