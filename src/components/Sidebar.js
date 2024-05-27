import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/logo.png";
import "../css/Sidebar.css";
import ApartmentIcon from "@mui/icons-material/Apartment";
import BookIcon from "@mui/icons-material/Book";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import SubscribeBtn from "./subscribeBtn";
import Skeleton from "@mui/material/Skeleton";
import DnsIcon from "@mui/icons-material/Dns";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import InventoryIcon from "@mui/icons-material/Inventory";
import OrgIcon from "../assets/orgIcon.png";


export default function Sidebar() {
  const [selectedMenu, setSelectedMenu] = useState("organizations");
  const [organizations, setOrganizations] = useState([]);
  const [servers, setServers] = useState({});
  const [expanded, setExpanded] = useState(false);
  const [expandedOrg, setExpandedOrg] = useState(null);
  const location = useLocation();

  useEffect(() => {
    handleGetSub();
    fetchOrganizations();
  }, []);

  useEffect(() => {
    const path = location.pathname;
    if (path === "/organizations") {
      setSelectedMenu("organizations");
    } else if (path === "/guide") {
      setSelectedMenu("guide");
    } else if (path === "/user") {
      setSelectedMenu("user");
    } else if (path === "/user/subscribe") {
      setSelectedMenu("subscribe");
    }
  }, [location]);

  const [isSub, setIsSub] = useState();

  const handleGetSub = async () => {
    const editUrl = `http://127.0.0.1:5000/subscription/check_subscription_by_username`;
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

  const fetchOrganizations = async () => {
    const orgUrl = `http://127.0.0.1:5000/org/get`;
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(orgUrl, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      if (response.status === 200) {
        const orgData = await response.json();
        setOrganizations(orgData);
      } else {
        console.error("Failed to fetch organizations");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchServers = async (organizationId) => {
    const serverUrl = `http://127.0.0.1:5000/server/get_server_in_organization/${organizationId}`;
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(serverUrl, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      if (response.status === 200) {
        const serverData = await response.json();
        setServers((prevServers) => ({
          ...prevServers,
          [organizationId]: serverData,
        }));
      } else {
        console.error("Failed to fetch servers");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const handleOrganizationClick = () => {
    setSelectedMenu("organizations");
    setExpanded(!expanded);
  };

  const toggleOrganization = (organizationId) => {
    if (expandedOrg === organizationId) {
      setExpandedOrg(null);
    } else {
      setExpandedOrg(organizationId);
      fetchServers(organizationId);
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
        <div
          className={`hoverSection ${selectedMenu === "organizations" ? "selectedMenu" : ""}`}
          onClick={handleOrganizationClick}
        >
          <div className="flex flex-row justify-between items-center">
            <Link to="/organizations" style={{ flexGrow: 1, textDecoration: 'none' }}>
              <section className="flex flex-row gap-3 py-4 px-11 items-center">
                <ApartmentIcon style={{ fontSize: "28px" }} />
                <p style={{ fontSize: "18px" }} className="text-xl font-semibold">
                Dashboard
                </p>
              </section>
            </Link>
            <div className="dropdownIcon" onClick={(e) => { e.stopPropagation(); toggleExpanded(); }}>
              {expanded ? (
                <ArrowDropDownIcon />
              ) : (
                <ArrowRightIcon />
              )}
            </div>
          </div>
        </div>
        {expanded &&
          organizations.map((org) => (
            <div key={org.organization_id}>
              <div
                className="flex flex-row justify-end items-center gap-20 py-4 cursor-pointer"
                onClick={() => toggleOrganization(org.organization_id)}
              >
                <div className="flex flex-row gap-3 items-center  px-6">
                <img
            src={OrgIcon}
            style={{
              width: "auto",
              height: "20px",
            }}
          />
                  <p style={{ fontSize: "16px" }}>{org.name}</p>
                </div>
                <div className="dropdownIcon">
                  {expandedOrg === org.organization_id ? (
                    <ArrowDropDownIcon />
                  ) : (
                    <ArrowRightIcon />
                  )}
                </div>
              </div>
              {expandedOrg === org.organization_id && (
                <div className="ml-8">
                  {servers[org.organization_id] ? (
                    servers[org.organization_id].map((server) => (
                      <Link
                        to={`/organizations/dashboard/${org.organization_id}/${server.server_id}`}
                        key={server.server_id}
                        className="flex flex-row gap-3 py-2 px-11 items-center"
                      >
                        <DnsIcon style={{ fontSize: "20px" }} />
                        <p style={{ fontSize: "14px" }}>{server.server_name}</p>
                      </Link>
                    ))
                  ) : (
                    <Skeleton variant="text" />
                  )}
                </div>
              )}
            </div>
          ))}
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

        <Link
          to="/user"
          onClick={() => setSelectedMenu("user")}
          className={`hoverSection ${
            selectedMenu === "user" ? "selectedMenu" : ""
          }`}
        >
          <section className="flex flex-row gap-3 py-4 px-11 items-center">
            <PermIdentityIcon style={{ fontSize: "28px" }} />
            <p style={{ fontSize: "18px" }} className="text-xl font-semibold">
            Profile
            </p>
          </section>
        </Link>

        <Link
          to="/user/subscribe"
          onClick={() => setSelectedMenu("subscribe")}
          className={`hoverSection ${
            selectedMenu === "subscribe" ? "selectedMenu" : ""
          }`}
        >
          <section className="flex flex-row gap-3 py-4 px-11 items-center">
            <InventoryIcon style={{ fontSize: "28px" }} />
            <p style={{ fontSize: "18px" }} className="text-xl font-semibold">
            Subscribe
            </p>
          </section>
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