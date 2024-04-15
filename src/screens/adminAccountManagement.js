import React, { useEffect, useState } from "react";
import SidebarAdmin from "../components/sidebarAdmin";
import NavigationAdmin from "../components/navAdmin";
import "../css/Admin.css";
import Button from "@mui/material/Button";

export default function AdminAccountManagement() {
  const [customerList, setCustomerList] = useState();
  const [selectedCustomers, setSelectedCustomers] = useState([]);

  const handleClickSelectUser = (customerId) => {
    // Kiểm tra xem customerId đã tồn tại trong danh sách chưa
    const isAlreadySelected = selectedCustomers.includes(customerId);

    // Nếu customerId đã được chọn, loại bỏ nó khỏi danh sách đã chọn
    // Ngược lại, thêm nó vào danh sách đã chọn
    if (isAlreadySelected) {
      setSelectedCustomers(selectedCustomers.filter((id) => id !== customerId));
    } else {
      setSelectedCustomers([...selectedCustomers, customerId]);
    }
  };

  const handleClickOpenRemoveUser = () => {
    setOpen(true);
  };
  const [open, setOpen] = React.useState(false);

  const handleGetCustomer = async () => {
    const customerUrl = `http://127.0.0.1:5000/auth/get_all_profile`;
    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch(customerUrl, {
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
        const customerData = await response.json();
        setCustomerList(customerData);
      } else {
        console.log("Fail to get customer");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
    }
  };

  useEffect(() => {
    handleGetCustomer();
  }, []);

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

          {/*-------------- Account Table ---------------- */}

          <div className="bg-white mt-4 rounded-md px-8 pb-8 shadow-md">
            <table class="table-auto w-full ">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>USERNAME</th>
                  <th>FULLNAME</th>
                  <th>EMAIL</th>
                  <th>ACTION</th>
                  <th>STATUS</th>
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

                {customerList?.map((customer, index) => (
                  <tr key={customer.id}>
                    <td>{index + 1}</td>
                    <td>{customer.username}</td>
                    <td>{customer.full_name}</td>
                    <td>{customer.email}</td>
                    <td>
                      <Button
                        onClick={() => handleClickOpenRemoveUser()}
                        variant="contained"
                        sx={{
                          width: "100px",
                          height: "25px",
                          color: "white",
                          borderRadius: "100px",
                          bgcolor: "#F85F60",
                          "&:hover": { bgcolor: "#D45758" },
                          fontSize: "14px",
                          fontWeight: "normal",
                          textTransform: "none",
                        }}
                      >
                        Delete
                      </Button>
                    </td>
                    {customer.status == "ACTIVE" ? (
                      <td>
                        <div class="flex justify-center m-5">
                          <Button
                            variant="contained"
                            sx={{
                              width: "100px",
                              height: "25px",
                              color: "white",
                              borderRadius: "100px",
                              bgcolor: "#6EC882",
                              "&:hover": { bgcolor: "#63B976" },
                              fontSize: "14px",
                              fontWeight: "normal",
                              textTransform: "none",
                            }}
                          >
                            Active
                          </Button>
                        </div>
                      </td>
                    ) : (
                      <td>
                        <div class="flex justify-center m-5">
                          <Button
                            variant="contained"
                            sx={{
                              width: "100px",
                              height: "25px",
                              color: "white",
                              borderRadius: "100px",
                              bgcolor: "#8E8E8E",
                              "&:hover": { bgcolor: "#6C6C6C" },
                              fontSize: "14px",
                              fontWeight: "normal",
                              textTransform: "none",
                            }}
                          >
                            Inative
                          </Button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>

            {/*-------------- END OF Account Table ---------------- */}
          </div>
        </div>
      </div>

      {/*-------------- END OF LayoutBody ---------------- */}
    </div>
  );
}
