import React, { useEffect } from "react";
import { useState } from "react";

import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import SidebarUser from "../components/sidebarUser";
import NavigationUser from "../components/navUserProfile";

import chip from "../assets/chip.png";

import "../css/userSubscribe.css";
import { Link } from "react-router-dom";

export default function UserSubscribe() {
  // package
  const [packageData, setPackageData] = useState([]);

  const handlePackage = async () => {
    const packageUrl = "http://127.0.0.1:5000/package/get";

    try {
      const response = await fetch(packageUrl, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        setPackageData(data);
      } else {
        console.error("Failed to fetch package data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    handlePackage();
  }, []);

  const [showPackageCard, setShowPackageCard] = useState(true);
  const handleHidePackageCard = () => {
    setShowPackageCard(!showPackageCard);
  };

  return (
    <div className="">
      {/*-------------- Navigation + Backgroud---------------- */}

      <NavigationUser />

      {/*-------------- END OF Navigation + Backgroud---------------- */}

      {/*-------------- LayoutBody ---------------- */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "0fr 3fr",
          height: "52vh",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <SidebarUser />
        </div>
        <div className="flex flex-col px-20 py-10 bg-[#F3F8FF]">
          <div className="purchasedPackage flex flex-col gap-y-4">
            <span>
              <h1>YOUR SUBSCRIPTION</h1>
              <h2>
                These are your current subscriptions. They will be charged
                within the same billing cycle. You can update at any time.
              </h2>
            </span>
            {showPackageCard && (
              <div className="packageCard">
                <div className="imgCard">
                  <img loading="lazy" src={chip} />
                </div>
                <Divider orientation="vertical" variant="middle" />

                <div className="packageInfo px-20">
                  <span className="flex flex-row items-center">
                    <p className="font-bold text-large text-[#3867A5]">
                      PACKAGE 2
                    </p>
                    <p className="text-slate-400 pl-16">5 Organizations</p>
                  </span>
                  <span>
                    <h2>Organization:</h2>
                    <ul>
                      <li>2 Super Admin </li>
                      <li>10 Members </li>
                    </ul>
                  </span>
                </div>
                <div className="packageSetting flex flex-col justify-around pl-1">
                  <Button variant="text">Cancel package</Button>
                  <Button variant="contained">Change package</Button>
                </div>
              </div>
            )}
            {!showPackageCard && (
              <div className="packageBundle ">
                {packageData.map((pkg) => (
                  <div className="package">
                    <h1 className="text-center font-bold text-2xl">
                      {pkg.package_name}
                    </h1>
                    <Divider orientation="horizontal" variant="middle" />
                    <span className="flex flex-col items-left pl-10 py-4">
                      <p>{pkg.description} Organizations</p>
                      <p className="py-2">Organization:</p>
                      <ul className="pl-12">
                        <li>{pkg.slot_number} Admins</li>
                        <li>{pkg.slot_server} Members</li>
                      </ul>
                      <p className="font-bold text-2xl italic	pt-8">
                        ${pkg.price}/ month
                      </p>
                    </span>
                    <div className="flex justify-center">
                      <Link to={`/user/subscribe/payment`}>
                        <button class="bg-transparent hover:bg-[#3867A5] text-[#3867A5] font-semibold hover:text-white py-2 px-4 border border-[#3867A5] hover:border-transparent rounded shadow-md w-40">
                          Buy Now
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="billingInfo ">
            <h1>PAY</h1>
            <div className="billingInfoBox rounded-lg bg-[#DFEDFF] px-8 py-4">
              <h1>BILLING INFORMATION</h1>
              {showPackageCard && (
                <h2>
                  The package will automatically renew on February 13, 2024 and
                  you will be charged $4.
                </h2>
              )}

              {!showPackageCard && (
                <h2 className="text-[red]">
                  You don't have any packages yet, please Subscribe to continue
                  experiencing.
                </h2>
              )}
            </div>
            <Button onClick={handleHidePackageCard} variant="contained">
              {showPackageCard ? "Đã mua gói" : "Chưa mua gói"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
