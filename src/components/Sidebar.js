import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/logo.png";
import "../css/Sidebar.css";
import ApartmentIcon from "@mui/icons-material/Apartment";
import BookIcon from "@mui/icons-material/Book";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import SubscribeBtn from "./subscribeBtn";
import Skeleton from "@mui/material/Skeleton";

export default function Sidebar() {
  const [selectedMenu, setSelectedMenu] = useState("organizations");
  const location = useLocation();

  useEffect(() => {
    handleGetSub();
  }, []);

  useEffect(() => {
    const path = location.pathname;
    if (path === "/organizations") {
      setSelectedMenu("organizations");
    } else if (path === "/guide") {
      setSelectedMenu("guide");
    } else if (path === "/user") {
      setSelectedMenu("user");
    }
  }, [location]);

  const [isSub, setIsSub] = useState();

  const handleGetSub = async () => {
    const editUrl = `https://master-help-desk-back-end.vercel.app/subscription/check_subscription_by_username`;
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(editUrl, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      if (response.status === 200) {
        setIsSub(false);
      } else {
        setIsSub(true);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
    }
  };

  return (
    <div
      style={{
        borderRight: "1px solid #E5E8EB",
        width: "300px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="py-10 px-8">
        <Link
          to={"/"}
          style={{ border: "none", background: "none", cursor: "pointer" }}
        >
          <img alt="logo" loading="lazy" style={{ width: "70px" }} src={Logo} />
        </Link>
      </div>
      <div className="flex flex-col">
        <div
          className="gap-3 py-2 font-bold px-11 items-center text-[#212B36]"
          style={{
            fontSize: "14px",
          }}
        >
          <b>GENERAL</b>
        </div>
        <Link
          to="/organizations"
          onClick={() => setSelectedMenu("organizations")}
          className={`hoverSection ${
            selectedMenu === "organizations" ? "selectedMenu" : ""
          }`}
        >
          <section className="flex flex-row gap-3 py-4 px-11 items-center">
            <ApartmentIcon style={{ fontSize: "28px" }} />
            <p style={{ fontSize: "18px" }} className="text-xl font-semibold">
              Organization
            </p>
          </section>
        </Link>
        <Link
          to="/guide"
          onClick={() => setSelectedMenu("guide")}
          className={`hoverSection ${
            selectedMenu === "guide" ? "selectedMenu" : ""
          }`}
        >
          <section className="flex flex-row gap-3 py-4 px-11 items-center">
            <BookIcon style={{ fontSize: "28px" }} />
            <p style={{ fontSize: "18px" }} className="text-xl font-semibold">
              Guide
            </p>
          </section>
        </Link>
        <div
          className="gap-3 py-2 mt-4 px-11 items-center text-[#212B36]"
          style={{ fontSize: "14px" }}
        >
          <b>MANAGEMENT</b>
        </div>
        <Link to={`/user`}>
          <div className="hoverSection">
            <section className="flex flex-row gap-3 py-4 px-11 items-center">
              <PermIdentityIcon style={{ fontSize: "28px" }} />
              <p
                style={{ fontSize: "18px", color: "#637381" }}
                className="text-xl font-semibold "
              >
                Profile
              </p>
            </section>
          </div>
        </Link>

        {isSub === "" ? (
          <div className="flex flex-row justify-center align-middle mt-40">
            <Skeleton variant="rounded" width={210} height={60} />
          </div>
        ) : (
          <>
            {isSub && (
              <div className="flex flex-row justify-center align-middle mt-40">
                <SubscribeBtn />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
