import React, { useState, useEffect } from "react";
import SidebarAdmin from "../components/sidebarAdmin";
import NavigationAdmin from "../components/navAdmin";
import "../css/adminBilling.css";
import { Button } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AdminBillings() {
  const [listBilling, setListBilling] = useState();
  const [billingInfo, setBillingInfo] = useState();

  const handleViewBilling = (id) => {
    handleGetBilling(id);
  };

  const handleGetAllBilling = async () => {
    toast.loading("Loading data...");
    const editUrl = "http://127.0.0.1:5000/billing/get_all_billing";
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
    } finally {
    }
  };

  const handleGetBilling = async (idBill) => {
    toast.loading("Loading data...");
    const editUrl = `http://127.0.0.1:5000/billing/get_billing_by_id/${idBill}`;

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
    } finally {
    }
  };

  const [token, setToken] = useState();
  const checkToken = () => {
    const isToken = localStorage.getItem("checkAdmin");
    setToken(isToken);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const loginToken = localStorage.getItem("checkUser");

    const checkLoggedIn = () => {
      if (loginToken) {
        navigate("/error404");
      }
    };
    checkLoggedIn();
    checkToken();
    handleGetAllBilling();
  }, []);

  return (
    <div className="admin-layout">
      <Toaster position="bottom-right" reverseOrder={false} />
      <SidebarAdmin />

      <div className="content">
        {/* <NavigationAdmin /> */}{" "}
        <div className="info-title font-semibold py-3">
          <p>Billing Management</p>
        </div>
        {token !== null ? (
          <div className="content-container">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th>DATE</th>
                  <th>TRANSACTION FEE</th>
                  <th>STATUS</th>
                  <th>DETAIL</th>
                </tr>
              </thead>
              <tbody>
                {listBilling?.map((bill) => (
                  <tr key={bill.billing_id}>
                    <td>{bill.timestamp}</td>
                    <td>{bill.amount}đ</td>
                    <td>{bill.billing_status}</td>
                    <td>
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
            <div id="popup1" className="overlay">
              <div className="popup">
                <div className="popup_content">
                  <h1>Billing Information</h1>
                  <div className="billingInfo">
                    <div className="leftInfo">
                      <h2>Transaction fee:</h2>
                      <h2>Billing Id:</h2>
                      <h2>Status</h2>
                      <h2>Customer Id:</h2>
                      <h2>Date:</h2>
                      <h2>Subscription Id:</h2>
                    </div>
                    <div className="rightInfo">
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
        ) : (
          <div className="flex flex-row justify-center py-40 gap-4 text-red-600 font-bold">
            <WarningAmberIcon />
            <p>UNKNOWN USER! PLEASE LOGIN FIRST </p>
            <WarningAmberIcon />
          </div>
        )}
      </div>
    </div>
  );
}
