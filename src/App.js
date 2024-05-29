import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Admin from "./screens/adminAccountManagement";
import AdminBilling from "./screens/adminBilling";
import AdminSetting from "./screens/adminSetting";
import AdminGuide from "./screens/adminGuideManagement";
import AdminPackage from "./screens/adminPackageManagement";
import AdminRole from "./screens/adminRoleManagement";
import AdminLogin from "./screens/adminLogin";
import AdminSubscription from "./screens/adminSubscription";
import Error404 from "./screens/Error404";
import "./App.css";

export default function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      alert(
        "This website does not support mobile devices. Please access it using a tablet, desktop, or laptop for the best experience."
      );
      navigate("/error404");
    }
  }, [navigate]);

  return (
    <div>
      <div id="mobile-warning">
        This website does not support mobile devices. Please access it using a
        tablet, desktop, or laptop for the best experience.
      </div>
      <div id="app-content">
        <Routes>
          <Route path="/error404" element={<Error404 />} />

          {/* ADMIN ROUTE */}
          <Route path="/" element={<AdminLogin />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/billing" element={<AdminBilling />} />
          <Route path="/admin/setting" element={<AdminSetting />} />
          <Route path="/admin/guide" element={<AdminGuide />} />
          <Route path="/admin/package" element={<AdminPackage />} />
          <Route path="/admin/role" element={<AdminRole />} />
          <Route path="/admin/subscription" element={<AdminSubscription />} />

          {/* USER ROUTE */}

          {/* USER ORG */}

          {/* ERROR */}
        </Routes>
      </div>
    </div>
  );
}
