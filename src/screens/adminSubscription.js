import React, { useState, useEffect } from "react";
import SidebarAdmin from "../components/sidebarAdmin";
import "../css/adminGuide.css";
import { Button, Pagination } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import "../css/serverGeneral.css";

export default function AdminSubscription() {
  const [listSubscription, setListSubscription] = useState([]);
  const [filteredSubData, setFilteredSubData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleGetAllSubscription = async () => {
    toast.loading("Loading data...");
    const editUrl =
      "https://master-help-desk-back-end.vercel.app/subscription/get_all_subscriptions";
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
        setFilteredSubData(data);
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

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSubData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="admin-layout flex flex-col md:flex-row">
      <SidebarAdmin />
      <div className="content flex-1 p-4 md:p-10">
        <Toaster position="bottom-right" reverseOrder={false} />
        <div className="info-title font-semibold pb-5">
          <p className="text-3xl">Subscription Management</p>
        </div>
        <div className="button-container mb-6 p-4 bg-white rounded-lg shadow-md border border-gray-300 flex justify-between">
          <div className="relative w-full md:w-1/2 lg:w-1/3">
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
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
              className="search-input w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 pl-10 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search by subscription name..."
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <div className="content-container overflow-x-auto">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">NAME</th>
                <th className="p-4">TYPE</th>
                <th className="p-4">EXPIRATION DATE</th>
                <th className="p-4">RENEWABLE</th>
                <th className="p-4">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((sub, index) => (
                <tr key={sub.subscription_id} className="border-t">
                  <td className="p-4">{indexOfFirstItem + index + 1}</td>
                  <td className="p-4">{sub.subscription_name}</td>
                  <td className="p-4">{sub.subscription_type}</td>
                  <td className="p-4">{sub.expiration_date}</td>
                  <td className="p-4">{sub.renewable ? "true" : "false"}</td>
                  <td className="p-4">
                    <div
                      style={{
                        backgroundColor: sub.subscription_status
                          ? "#6EC882"
                          : "#8E8E8E",
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
          <div className="flex justify-center mt-4">
            <Pagination
              count={Math.ceil(filteredSubData.length / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
