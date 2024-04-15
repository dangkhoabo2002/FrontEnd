import React, { useState } from "react";
import SidebarAdmin from "../components/sidebarAdmin";
import NavigationAdmin from "../components/navAdmin";
import { Billings } from "../data/listOfBilling";
import "../css/adminBilling.css";
import { Button } from "@mui/material";

export default function AdminBillings() {
  const [Billing, setBilling] = useState({});

  console.log(Billing);

  return (
    <div className="">
      {/*-------------- Navigation + Backgroud---------------- */}

      <NavigationAdmin />

      {/*-------------- END OF Navigation + Backgroud---------------- */}

      {/*-------------- LayoutBody ---------------- */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "0fr 3fr",
          height: "66vh",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <SidebarAdmin />
        </div>
        <div className="px-12 py-6 bg-[#F3F8FF]">
          <button class="bg-transparent hover:bg-[#3867A5] text-[#3867A5] font-semibold hover:text-white  border border-[#3867A5] hover:border-transparent rounded px-8 py-1">
            Select
          </button>

          {/*-------------- Billing Table ---------------- */}

          <div className="bg-white mt-4 rounded-md px-8 pb-8 shadow-md">
            <table class="table-auto w-full ">
              <thead>
                <tr>
                  <th>DATE</th>
                  <th>TYPE OF PACKAGE</th>
                  <th>TRANSACTION FEE</th>
                  <th>STATUS</th>
                  <th>DETAIL</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    style={{
                      color: "transparent",
                      padding: "0px",
                    }}
                  >
                    .
                  </td>
                </tr>
                {Billings.map((bill) => (
                  <tr key={bill.id}>
                    <td>{bill.date}</td>
                    <td>{bill.type_of_package}</td>
                    <td>{bill.transaction_fee}$</td>
                    {bill.status == "Pending" ? (
                      <td id="pending">{bill.status}</td>
                    ) : (
                      <td id="paid">{bill.status}</td>
                    )}
                    <td>
                      <a href="#popup1" id="openPopUp">
                        {/* <button
                          onClick={() => setBilling(bill)}
                          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                        >
                          View
                        </button> */}
                        <Button
                          onClick={() => setBilling(bill)}
                          variant="contained"
                          sx={{
                            width: "100px",
                            height: "25px",
                            color: "white",
                            borderRadius: "100px",
                            bgcolor: "#5F94D9",
                            "&:hover": { bgcolor: "#4D7AB5" },
                            fontSize: "14px",
                            fontWeight: "normal",
                            textTransform: "none",
                          }}
                        >
                          View
                        </Button>
                      </a>
                    </td>
                  </tr>
                ))}
                <tr></tr>
              </tbody>
            </table>
            <div id="popup1" className="overlay">
              <div className="popup">
                <div className="popup_content">
                  <h1>Billing Information</h1>
                  <div className="billingInfo">
                    <div className="leftInfo">
                      <h2>Id:</h2>
                      <h2>Date:</h2>
                      <h2>Username:</h2>
                      <h2>Package type:</h2>
                      <h2>Transaction fee:</h2>
                      <h2>Status</h2>
                      <h2>Total</h2>
                    </div>
                    <div className="rightInfo">
                      <h2>{Billing.id}</h2>
                      <h2>{Billing.date}</h2>
                      <h2>{Billing.username}</h2>
                      <h2>{Billing.type_of_package}</h2>
                      <h2>{Billing.transaction_fee}$</h2>
                      <h2>{Billing.status}</h2>
                      <h2>{Billing.total}$</h2>
                    </div>
                  </div>
                  <div className="popup_btn">
                    <a id="popup_btn" href="#" className="close">
                      <div
                        style={{
                          fontSize: "16px",
                          fontWeight: "Bold",
                          letterSpacing: "0.09rem",
                        }}
                      >
                        Close
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*-------------- END OF Billing Table ---------------- */}
        </div>
      </div>

      {/*-------------- END OF LayoutBody ---------------- */}
    </div>
  );
}
