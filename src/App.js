import { Routes, Route, Navigate } from "react-router-dom";
import Admin from "./screens/adminAccountManagement";

import AdminBilling from "./screens/adminBilling";
import AdminSetting from "./screens/adminSetting";
import AdminGuide from "./screens/adminGuideManagement";
import AdminPackage from "./screens/adminPackageManagement";
import AdminRole from "./screens/adminRoleManagement";
import AdminLogin from "./screens/adminLogin";

import Error404 from "./screens/Error404";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/error404" element={<Error404 />}></Route>

        {/* ADMIN ROUTE*/}
        <Route path="/" element={<AdminLogin />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/admin/billing" element={<AdminBilling />}></Route>
        <Route path="/admin/setting" element={<AdminSetting />}></Route>
        <Route path="/admin/guide" element={<AdminGuide />}></Route>
        <Route path="/admin/package" element={<AdminPackage />}></Route>
        <Route path="/admin/role" element={<AdminRole />}></Route>

        {/* USER ROUTE*/}

        {/* USER ORG*/}

        {/* ERROR */}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}
