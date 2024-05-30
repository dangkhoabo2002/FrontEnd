import React, { useState, useEffect } from "react";
import SidebarAdmin from "../components/sidebarAdmin";
import NavigationAdmin from "../components/navAdmin";
import "../css/adminBilling.css";
import { Box, Button, Divider, Typography } from "@mui/material";
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
  console.log(billingInfo);
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
                  <td className="p-4">{bill.amount} VNĐ</td>
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
            <Box
              className="popup"
              sx={{ width: { xs: "90%", md: "40%" }, padding: 4 }}
            >
              <Box className="popup_content">
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{
                    fontWeight: "bold",
                    color: "#637381",
                    borderBottom: "2px solid #637381",
                    paddingBottom: 2,
                    marginBottom: 4,
                  }}
                >
                  Billing Information
                </Typography>
                <Box className="billingInfo">
                  <Box className="leftInfo">
                    <Typography variant="h6">Transaction fee:</Typography>
                    <Typography variant="h6">Billing Id:</Typography>
                    <Typography variant="h6">Status:</Typography>
                    <Typography variant="h6">Customer Id:</Typography>
                    <Typography variant="h6">Date:</Typography>
                    <Typography variant="h6">Time Zone:</Typography>
                    <Typography variant="h6">Subscription Id:</Typography>
                  </Box>
                  <Box className="rightInfo ">
                    <Typography variant="h6">
                      {billingInfo?.amount} VNĐ
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        width: "220px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {billingInfo?.billing_id}
                    </Typography>
                    <Typography
                      variant="h6"
                      className={
                        billingInfo?.billing_status === "paid"
                          ? "text-green-500 font-bold"
                          : billingInfo?.billing_status === "pending"
                          ? "text-yellow-500 font-bold"
                          : "text-red-500 font-bold"
                      }
                    >
                      {billingInfo?.billing_status}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        width: "220px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {billingInfo?.customer_id}
                    </Typography>
                    <Typography variant="h6">
                      {billingInfo?.timestamp}
                    </Typography>
                    <Typography variant="h6">
                      {billingInfo?.subscription_id}
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ marginY: 4 }} />
                <Box
                  className="popup_btn"
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    className="close"
                    sx={{ borderRadius: 2, paddingX: 4 }}
                    href="#"
                  >
                    Close
                  </Button>
                </Box>
              </Box>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
}
