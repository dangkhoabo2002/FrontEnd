import React from "react";
import SidebarAdmin from "../components/sidebarAdmin";
import NavigationAdmin from "../components/navAdmin";
import Users from "../data/listOfUserAccount.json";
import "../css/Admin.css";
import Button from "@mui/material/Button";

export default function adminAccountManagement() {
  return (
    <div className="">
      {/*-------------- Navigation + Backgroud---------------- */}

      <NavigationAdmin />

      {/*-------------- END OF Navigation + Backgroud---------------- */}

      {/*-------------- LayoutBody ---------------- */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 3fr",
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
                  <th>FULLNAME</th>
                  <th>ROLE</th>
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
                {Users.map((user) => (
                  <tr>
                    <td>{user.id}</td>
                    <td>{user.fullname}</td>
                    <td>{user.role}</td>
                    <td>{user.email}</td>
                    <td>
                      <Button variant="text">Delete</Button>
                    </td>
                    {user.status == "Active" ? (
                      <td>
                        <div class="flex justify-center m-5">
                          <button
                            id="deleteButton"
                            data-modal-target="deleteModal"
                            data-modal-toggle="deleteModal"
                            className="block text-white bg-[#6EC882] hover:bg-primary-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                            type="button"
                          >
                            Active
                          </button>
                        </div>
                      </td>
                    ) : (
                      <td>
                        <div class="flex justify-center m-5">
                          <button
                            id="deleteButton"
                            data-modal-target="deleteModal"
                            data-modal-toggle="deleteModal"
                            className="block text-white bg-[#8E8E8E] hover:bg-primary-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                            type="button"
                          >
                            Inactive
                          </button>
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
