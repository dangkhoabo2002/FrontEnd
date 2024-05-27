import React, { useState, useEffect } from "react";
import SidebarAdmin from "../components/sidebarAdmin";
import NavigationAdmin from "../components/navAdmin";
import "../css/adminGuide.css";
import { Button } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../css/serverGeneral.css";

export default function AdminSubscription() {
    const [listSubscription, setListSubscription] = useState([]);
    const [subscriptionInfo, setSubscriptionInfo] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredSubData, setFilteredSubData] = useState([]);

    const handleGetAllSubscription = async () => {
        toast.loading("Loading data...");
        const editUrl = "http://127.0.0.1:5000/subscription/get_all_subscriptions";
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
                setListSubscription(data);
                setFilteredSubData(data); // Set initial filtered data
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
                toast.error("Subscription is not selected!", {
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
                toast.error("Failed to get subscriptions, please try again later!", {
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

    useEffect(() => {
        handleGetAllSubscription();
    }, []);

    const handleSearchChange = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
        setFilteredSubData(
            listSubscription.filter((sub) =>
                sub.subscription_name.toLowerCase().includes(query)
            )
        );
    };

    return (
        <div className="admin-layout">
            <Toaster position="bottom-right" reverseOrder={false} />
            <SidebarAdmin />

            <div className="content">
                <div className="info-title font-semibold pb-5">
                    <p style={{ fontSize: "36px" }}>Subscription Management</p>
                </div>
                <div className="button-container">
                    <div className="flex justify-start">
                        <label htmlFor="simple-search" className="sr-only">
                            Search
                        </label>
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg
                                    className="w-4 h-4 text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                    />
                                </svg>
                            </div>
                            <input
                                type="text"
                                id="simple-search"
                                style={{ width: "200%" }}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Search by subscription name..."
                                onChange={handleSearchChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="content-container">
                    <table className="table-auto w-full">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>TYPE</th>
                                <th>EXPIRATION DATE</th>
                                <th>RENEWABLE</th>
                                <th>STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSubData.map((sub) => (
                                <tr key={sub.subscription_id}>
                                    <td>{sub.subscription_id}</td>
                                    <td>{sub.subscription_name}</td>
                                    <td>{sub.subscription_type}</td>
                                    <td>{sub.expiration_date}</td>
                                    <td>{sub.renewable === true ? "true":"false"}</td>
                                    <td>
                      <div
                        style={{
                          backgroundColor: sub.subscription_status ? "#6EC882" : "#8E8E8E",
                          color: "white",
                          textAlign: "center",
                          borderRadius: "100px",
                          padding: "5px 15px",
                          fontSize: "14px",
                          fontWeight: "normal",
                          textTransform: "none",
                        }}
                      >
                        {sub.subscription_status ? "Active" : "Inactive"}
                      </div>
                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    );
}
