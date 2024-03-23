import React from "react";
import "../css/userSubscribePayment.css";
import Logo from "../assets/logo.png";
import QR from "../assets/QRcode.png";
import Button from "@mui/material/Button";

import { useState } from "react";

export default function UserSubscribePayment() {
  const [isPaid, setIsPaid] = useState(true);

  const handleStatusPayment = () => {
    setIsPaid(!isPaid);
  };

  return (
    <div className="backgroundContainer">
      <div className="bodyContainer flex flex-col justify-center items-center py-12">
        <div className="flex flex-row items-center gap-2 pb-2 ">
          <img className="w-36" src={Logo} alt="Logo" />
          <h1 className="text-[40px] text-[#3867A5]">Proceed to payment</h1>
        </div>
        <h2 className="text-lg font-bold pb-4">
          Transaction code: 2625348113652523008
        </h2>
        {isPaid && (
          <>
            <img className="w-60" src={QR} alt="QRcode" />
            <h2 className="font-bold py-6">
              Scan the QR code with the MOMO app to pay
            </h2>
          </>
        )}
        {!isPaid && (
          <>
            <h2 className="font-bold py-6 text-[#37E030] text-2xl uppercase">
              Successful transaction
            </h2>
            <h3 className="font-bold">
              You are using Package 1, your privileges when using this package
              are:
            </h3>
            <div>Package</div>
          </>
        )}

        <Button
          sx={{ padding: "8px 42px", color: "white" }}
          variant="contained"
          onClick={handleStatusPayment}
        >
          Check transaction results
        </Button>
      </div>
    </div>
  );
}
