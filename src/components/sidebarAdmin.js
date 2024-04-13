import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ReceiptIcon from "@mui/icons-material/Receipt";
import InventoryIcon from "@mui/icons-material/Inventory";

export default function SidebarAdmin() {

  const [selectedMenu, setSelectedMenu] = useState("account");
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path === "/admin") {
      setSelectedMenu("account");
    } else if (path === "/admin/billing") {
      setSelectedMenu("billing");
    } else if (path === "/admin/guide") {
      setSelectedMenu("guide");
    }
  }, [location]);
  return (
    <div className="sidebar-container">
      <div className="font-black py-3 text-lg pl-12"></div>
      <div className="flex flex-col">
        <div className="gap-3 py-2 px-11 items-center" style={{ fontSize: "16px" }}>
          <b>GENERAL</b>
        </div>
        <div className="flex flex-col">
          <div className={`hoverSection ${selectedMenu === "account" ? "selectedMenu" : ""}`}>
            <Link to={`/admin`} onClick={() => setSelectedMenu("account")}>
              <section className="flex flex-row gap-3 py-4 pl-12 items-center justify-left text-[#637381]">
                <ManageAccountsIcon style={{ fontSize: "28px" }} />
                <p className="text-xl font-semibold" style={{ fontSize: "18px" }}>Account Management</p>
              </section>
            </Link>
          </div>
          <div className={`hoverSection ${selectedMenu === "billing" ? "selectedMenu" : ""}`}>
            <Link to={`/admin/billing`} onClick={() => setSelectedMenu("billing")}>
              <section className="flex flex-row gap-3 py-4 pl-12 items-center justify-left text-[#637381]">
                <ReceiptIcon style={{ fontSize: "28px" }} />
                <p className="text-xl font-semibold" style={{ fontSize: "18px" }}>Billings</p>
              </section>
            </Link>
          </div>
          <div className={`hoverSection ${selectedMenu === "guide" ? "selectedMenu" : ""}`}>
            <Link to={`/admin/guide`} onClick={() => setSelectedMenu("guide")}>
              <section className="flex flex-row gap-3 py-4 pl-12 items-center justify-left text-[#637381]">
                <InventoryIcon style={{ fontSize: "28px" }} />
                <p className="text-xl font-semibold" style={{ fontSize: "18px" }}>Guide Management</p>
              </section>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
