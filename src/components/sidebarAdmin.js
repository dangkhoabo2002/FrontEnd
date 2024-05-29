import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SupervisorAccountOutlinedIcon from "@mui/icons-material/SupervisorAccountOutlined";
import ReceiptIcon from "@mui/icons-material/Receipt";
import BookIcon from "@mui/icons-material/Book";
import InventoryIcon from "@mui/icons-material/Inventory";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Logo from "../images/MHDLogo.png";
import "../css/Sidebar.css";
import EventNoteIcon from '@mui/icons-material/EventNote';

import '../css/sidebarAdmin.css';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import toast from "react-hot-toast";

export default function SidebarAdmin() {

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();
  const handleLogout = async () => {
    toast.loading("In processing..");
    const logoutUrl = "http://127.0.0.1:5000/manager/logout";
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(logoutUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      if (response.status === 200) {
        toast.dismiss();
        localStorage.clear();
        navigate("/");
        toast.success("Logout success.", {
          style: {
            border: "1px solid #37E030",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "green",
            fontWeight: "bolder",
          },
        });
      } else {
        toast.dismiss();
        toast.error("Can not logout, please try again later!", {
          style: {
            border: "1px solid #F85F60",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "red",
            fontWeight: "bolder",
          },
        });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      handleClose();
    }
  };

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
    } else if (path === "/admin/role") {
      setSelectedMenu("role");
    } else if (path === "/admin/package") {
      setSelectedMenu("package");
    } else if (path === "/admin/subscription"){
      setSelectedMenu("subscription");
    }
  }, [location]);

  return (
    <div className="sidebar-container2">
      <div className="logo-container">
        <img src={Logo} alt="Logo" className="logo-amazing" />
        <p className="logo-text">MASTER HELP DESK</p>
      </div>
      
      <div className="flex flex-col">
        <div className="flex flex-col">
          <div className={`hoverSection ${selectedMenu === "account" ? "selectedMenu" : ""}`}>
            <Link to={`/admin`} onClick={() => setSelectedMenu("account")}>
              <section className="flex flex-row gap-0 py-4 pl-12 items-center justify-left text-[#637381]">
                <SupervisorAccountOutlinedIcon style={{ fontSize: "28px" }} />
                <p className="text-xl font-semibold" style={{ fontSize: "18px" }}>
                  Account Management
                </p>
              </section>
            </Link>
          </div>
          <div className={`hoverSection ${selectedMenu === "billing" ? "selectedMenu" : ""}`}>
            <Link to={`/admin/billing`} onClick={() => setSelectedMenu("billing")}>
              <section className="flex flex-row gap-0 py-4 pl-12 items-center justify-left text-[#637381]">
                <ReceiptIcon style={{ fontSize: "28px" }} />
                <p className="text-xl font-semibold" style={{ fontSize: "18px" }}>
                  Billing Management
                </p>
              </section>
            </Link>
          </div>
          <div className={`hoverSection ${selectedMenu === "guide" ? "selectedMenu" : ""}`}>
            <Link to={`/admin/guide`} onClick={() => setSelectedMenu("guide")}>
              <section className="flex flex-row gap-0 py-4 pl-12 items-center justify-left text-[#637381]">
                <BookIcon style={{ fontSize: "28px" }} />
                <p className="text-xl font-semibold" style={{ fontSize: "18px" }}>
                  Guide Management
                </p>
              </section>
            </Link>
          </div>
          <div className={`hoverSection ${selectedMenu === "package" ? "selectedMenu" : ""}`}>
            <Link to={`/admin/package`} onClick={() => setSelectedMenu("package")}>
              <section className="flex flex-row gap-0 py-4 pl-12 items-center justify-left text-[#637381]">
                <InventoryIcon style={{ fontSize: "28px" }} />
                <p className="text-xl font-semibold" style={{ fontSize: "18px" }}>
                  Package Management
                </p>
              </section>
            </Link>
          </div>
          <div className={`hoverSection ${selectedMenu === "role" ? "selectedMenu" : ""}`}>
            <Link to={`/admin/role`} onClick={() => setSelectedMenu("role")}>
              <section className="flex flex-row gap-0 py-4 pl-12 items-center justify-left text-[#637381]">
                <ManageAccountsOutlinedIcon style={{ fontSize: "28px" }} />
                <p className="text-xl font-semibold" style={{ fontSize: "18px" }}>
                  Role Management
                </p>
              </section>
            </Link>
          </div>
          <div className={`hoverSection ${selectedMenu === "subscription" ? "selectedMenu" : ""}`}>
            <Link to={`/admin/subscription`} onClick={() => setSelectedMenu("subscription")}>
              <section className="flex flex-row gap-0 py-4 pl-12 items-center justify-left text-[#637381]">
                <EventNoteIcon style={{ fontSize: "28px" }} />
                <p className="text-xl font-semibold" style={{ fontSize: "18px" }}>
                Subscription
                </p>
              </section>
            </Link>
          </div>
        </div>

        <div className="" style={{cursor:"pointer"}}>
    <section
    style={{marginTop: "100px"}}
      className="flex flex-row gap-3 py-4 pl-12 items-center justify-left text-[#637381]"
      onClick={handleClickOpen}
    >
      <ExitToAppIcon style={{ fontSize: "28px" }} />
      <p className="text-xl font-semibold" style={{ fontSize: "18px" }}>
        Logout
      </p>
    </section>
  </div>

        <Dialog
          open={open}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Confirmation!"}</DialogTitle>
          <DialogContent>Are you sure you want to logout?</DialogContent>

          <DialogActions>
            <Button sx={{ color: "red" }} onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleLogout}>Confirm</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
