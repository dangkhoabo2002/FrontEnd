import React from "react";
import SidebarAdmin from "../components/sidebarAdmin";
import NavigationAdmin from "../components/navAdmin";

export default function adminSetting() {
  return (
    <div>
      <div className="bg-[#F3F8FF]">
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
          <div className="px-12 py-6"></div>
        </div>

        {/*-------------- END OF LayoutBody ---------------- */}
      </div>
    </div>
  );
}
