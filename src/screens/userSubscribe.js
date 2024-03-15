import React from "react";
import { useState } from "react";

import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import SidebarUser from "../components/sidebarUser";
import NavigationUser from "../components/navUserProfile";
import backgroundPackage from "../assets/backgroundUserPackage.png";
import chip from "../assets/chip.png";

import "../css/userSubscribe.css";

export default function UserSubscribe() {
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
          gridTemplateColumns: "1fr 3fr",
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
                  <img src={chip} />
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
                <div className="package">
                  <h1 className="text-center font-bold text-3xl">Package 1</h1>
                  <Divider orientation="horizontal" variant="middle" />
                  <span className="flex flex-col items-left pl-10 py-4">
                    <p>2 Organizations</p>
                    <p className="py-2">Organization:</p>
                    <ul className="pl-12">
                      <li>2 Admins</li>
                      <li>5 Members</li>
                    </ul>
                    <p className="font-bold text-2xl italic	pt-8">$4 / month</p>
                  </span>
                  <div className="flex justify-center">
                    <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded shadow-md w-40">
                      Buy Now
                    </button>
                  </div>
                </div>
                <div className="package">
                  <h1 className="text-center font-bold text-3xl">Package 2</h1>
                  <Divider orientation="horizontal" variant="middle" />
                  <span className="flex flex-col items-left pl-10 py-4">
                    <p>5 Organizations</p>
                    <p className="py-2">Organization:</p>
                    <ul className="pl-12">
                      <li>2 Admins</li>
                      <li>10 Members</li>
                    </ul>
                    <p className="font-bold text-2xl italic	pt-8">$9 / month</p>
                  </span>
                  <div className="flex justify-center">
                    <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded shadow-md w-40">
                      Buy Now
                    </button>
                  </div>
                </div>
                <div className="package">
                  <h1 className="text-center font-bold text-3xl">Package 3</h1>
                  <Divider orientation="horizontal" variant="middle" />
                  <span className="flex flex-col items-left pl-10 py-4">
                    <p>5 Organizations</p>
                    <p className="py-2">Organization:</p>
                    <ul className="pl-12">
                      <li>5 Admins</li>
                      <li>20 Members</li>
                    </ul>
                    <p className="font-bold text-2xl italic	pt-8">$19 / month</p>
                  </span>
                  <div className="flex justify-center">
                    <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded shadow-md w-40">
                      Buy Now
                    </button>
                  </div>
                </div>
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
