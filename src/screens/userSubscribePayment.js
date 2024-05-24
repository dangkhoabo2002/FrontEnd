import React from "react";
import "../css/userSubscribePayment.css";
import Logo from "../assets/logo.png";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function UserSubscribePayment() {
  const [isPaid, setIsPaid] = useState(true);
  const [billInfo, setBillInfo] = useState();

  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

  const handleAfterPayment = async () => {
    toast.loading("In processing..");
    const url = `http://127.0.0.1:5000/after_transaction/${orderId}`;
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });

      if (response.status === 200) {
        toast.dismiss();
        const data = await response.json();
        setBillInfo(data);
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
    } finally {
    }
  };

  const handleSendMail = async () => {
    const url = `http://127.0.0.1:5000/after_transaction/${orderId}`;
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });

      if (response.status === 200) {
        toast.success("Receipt has been sent to your email. ", {
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
    } finally {
    }
  };

  useEffect(() => {
    handleAfterPayment();
    handleSendMail();
  });

  return (
    <div className="backgroundContainer">
      <Toaster position="bottom-right" reverseOrder={false} />

      <div className="bodyContainer flex flex-col justify-center items-center py-12">
        <div className="flex flex-row items-center gap-2 pb-2 ">
          <img loading="lazy" className="w-36" src={Logo} alt="Logo" />
          <h1 className="text-[40px] text-[#3867A5]">Proceed to payment</h1>
        </div>
        <h2 className="text-lg font-bold pb-4">
          Transaction code: 2625348113652523008
        </h2>
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
        <Link to={`/organizations`}>
          <Button
            sx={{ padding: "8px 42px", color: "white" }}
            variant="contained"
          >
            Back to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
