import React, { useState, useEffect } from "react";
import SidebarAdmin from "../components/sidebarAdmin";
import NavigationAdmin from "../components/navAdmin";
import "../css/adminBilling.css";
import { Button } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import "../css/serverGeneral.css";

export default function AdminBillings() {
  const [listBilling, setListBilling] = useState([]);
  const [billingInfo, setBillingInfo] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleViewBilling = (id) => {
    handleGetBilling(id);
  };

  const handleGetAllBilling = async () => {
    toast.loading("Loading data...");
    const editUrl =
      "https://master-help-desk-back-end.vercel.app/billing/get_all_billing";
    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch(editUrl, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true",
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        setListBilling(data);
        toast.dismiss();
      } else if (response.status === 403) {
        toast.dismiss();
        toast.error("Permission denied!", {
          style: {
            border: "1px solid #F85F60",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "red",
            fontWeight: "bolder",
          },
        });
      } else if (response.status === 400) {
        toast.dismiss();
        toast.error("Billing is not selected!", {
          style: {
            border: "1px solid #F85F60",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "red",
            fontWeight: "bolder",
          },
        });
      } else if (response.status === 500) {
        toast.dismiss();
        toast.error("Failed to get billings, please try again later!", {
          style: {
            border: "1px solid #F85F60",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "red",
            fontWeight: "bolder",
          },
        });
      } else {
        toast.dismiss();
        toast.error("Something wrong, please try again later!", {
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
    }
  };

  const handleGetBilling = async (idBill) => {
    toast.loading("Loading data...");
    const editUrl = `https://master-help-desk-back-end.vercel.app/billing/get_billing_by_id/${idBill}`;

    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch(editUrl, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true",
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        setBillingInfo(data);
        toast.dismiss();
      } else if (response.status === 403) {
        toast.dismiss();
        toast.error("Permission denied!", {
          style: {
            border: "1px solid #F85F60",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "red",
            fontWeight: "bolder",
          },
        });
      } else if (response.status === 404) {
        toast.dismiss();
        toast.error("Billing record not found!", {
          style: {
            border: "1px solid #F85F60",
            maxWidth: "900px",
            padding: "16px 24px",
            color: "red",
            fontWeight: "bolder",
          },
        });
      } else {
        toast.dismiss();
        toast.error("Something wrong, please try again later!", {
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
    }
  };

  useEffect(() => {
    handleGetAllBilling();
  }, []);

  //status
  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "#DCD421";
      case "FAIL":
        return "#F85F60";
      case "SUCCESS":
        return "#6EC882";
      default:
        return "#8E8E8E";
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = listBilling.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="admin-layout flex flex-col md:flex-row">
      <SidebarAdmin />
      <div className="content flex-1 p-4 md:p-10">
        <Toaster position="bottom-right" reverseOrder={false} />

        <div className="info-title font-semibold pb-5">
          <p className="text-3xl">Billing Management</p>
        </div>

        <div className="content-container overflow-x-auto">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr>
                <th className="p-4">DATE</th>
                <th className="p-4">TRANSACTION FEE</th>
                <th className="p-4">STATUS</th>
                <th className="p-4">DETAIL</th>
              </tr>
            </thead>
            <tbody>
              {currentItems?.map((bill) => (
                <tr key={bill.billing_id} className="border-t">
                  <td className="p-4">{bill.timestamp}</td>
                  <td className="p-4">{bill.amount} VND</td>
                  <td className="p-4">
                    <div
                      className="text-white text-center rounded-full px-3 py-1 text-sm"
                      style={{
                        backgroundColor: getStatusColor(bill.billing_status),
                      }}
                    >
                      {bill.billing_status}
                    </div>
                  </td>
                  <td className="p-4">
                    <a href="#popup1" id="openPopUp">
                      <Button
                        onClick={() => handleViewBilling(bill.billing_id)}
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
            </tbody>
          </table>
          <div className="flex justify-center mt-4">
            <Pagination
              count={Math.ceil(listBilling.length / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </div>
          <div id="popup1" className="overlay">
            <div className="popup">
              <div className="popup_content">
                <h1>Billing Information</h1>
                <div className="flex flex-row justify-start">
                  <div className="flex flex-col ">
                    <h2>Transaction fee:</h2>
                    <h2>Billing Id:</h2>
                    <h2>Status</h2>
                    <h2>Customer Id:</h2>
                    <h2>Date:</h2>
                    <h2>Subscription Id:</h2>
                  </div>
                  <div className="flex flex-col">
                    <h2>{billingInfo?.amount}đ</h2>
                    <h2>{billingInfo?.billing_id}</h2>
                    <h2>{billingInfo?.billing_status}</h2>
                    <h2>{billingInfo?.customer_id}</h2>
                    <h2>{billingInfo?.timestamp}</h2>
                    <h2>{billingInfo?.subscription_id}</h2>
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
      </div>
    </div>
  );
}
