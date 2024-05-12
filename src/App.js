import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./screens/Homepage";
import ServerEmpty from "./screens/serverEmpty";
import OrganizationDashboard from "./screens/organizationDashboard";
import Login from "./screens/login";
import ForgotPassword from "./screens/forgotPassword";
import SignUp from "./screens/signUp";
import OTPInput from "./screens/otp";
import ResetPassword from "./screens/resetPassword";
import Subscribe from "./screens/Subscribe";
import Payment from "./screens/Payment";
import Admin from "./screens/adminAccountManagement";
import ServerConfig from "./screens/userServerConfig";
import Guide from "./screens/userGuide";
import MaintenancePage from "./screens/maintenancePage";

import AdminBilling from "./screens/adminBilling";
import AdminSetting from "./screens/adminSetting";
import AdminGuide from "./screens/adminGuideManagement";
import AdminPackage from "./screens/adminPackageManagement";
import AdminRole from "./screens/adminRoleManagement";

import UserProfile from "./screens/userProfile";
import UserSubscribe from "./screens/userSubscribe";
import UserPayment from "./screens/userSubscribePayment";
import Organizations from "./screens/userOrganization";
import AdminLogin from "./screens/adminLogin";
// import AboutUs from "./screens/abouUs";
import TermOfService from "./screens/termOfService";
import SubscribeModal from "./components/nonSubModal";
import Error404 from "./screens/Error404";
import { useEffect } from "react";

export default function App() {
  const loginToken = localStorage.getItem("checkUser");

  const checkLoggedIn = () => {
    if (!loginToken) {
      return <Navigate to="/login" />;
    }
  };

  const userRole = localStorage.getItem("checkAdmin");

  const checkAdminRole = () => {
    if (!userRole) {
      return <Navigate to="/error404" />;
    }
  };

  useEffect(() => {
    checkAdminRole();
    checkLoggedIn();
  });
  return (
    <div>
      <Routes>
        {/* Dashboard Unlogin */}
        <Route path="/" element={<Homepage />}></Route>

        {/* <Route path="/aboutUs" element={<AboutUs />}></Route> */}
        <Route path="/guide" element={checkLoggedIn() || <Guide />}></Route>
        <Route path="/term" element={<TermOfService />}></Route>
        <Route path="/sub" element={<SubscribeModal />}></Route>
        <Route path="/error404" element={<Error404 />}></Route>
        <Route path="/maintaining" element={<MaintenancePage />}></Route>

        {/* ADMIN ROUTE*/}
        <Route path="/adminLogin" element={<AdminLogin />}></Route>
        <Route path="/admin" element={checkAdminRole() || <Admin />}></Route>
        <Route
          path="/admin/billing"
          element={checkAdminRole() || <AdminBilling />}
        ></Route>
        <Route
          path="/admin/setting"
          element={checkAdminRole() || <AdminSetting />}
        ></Route>
        <Route
          path="/admin/guide"
          element={checkAdminRole() || <AdminGuide />}
        ></Route>
        <Route
          path="/admin/package"
          element={checkAdminRole() || <AdminPackage />}
        ></Route>
        <Route
          path="/admin/role"
          element={checkAdminRole() || <AdminRole />}
        ></Route>

        {/* USER ROUTE*/}
        <Route path="/login" element={<Login />}></Route>

        {/* USER PROFILE*/}
        <Route
          path="/user"
          element={checkLoggedIn() || <UserProfile />}
        ></Route>
        <Route
          path="/user/subscribe"
          element={checkLoggedIn() || <UserSubscribe />}
        ></Route>
        <Route
          path="/user/subscribe/payment?"
          element={checkLoggedIn() || <UserPayment />}
        ></Route>
        <Route
          path="/login/forgotPassword"
          element={<ForgotPassword />}
        ></Route>

        <Route path="/resetPassword" element={<ResetPassword />}></Route>
        <Route path="/payment" element={<Payment />}></Route>
        <Route path="/signUp" element={<SignUp />}></Route>
        <Route path="/OTP" element={<OTPInput />}></Route>
        <Route
          path="/subscribe"
          element={checkLoggedIn() || <Subscribe />}
        ></Route>

        {/* USER ORG*/}
        <Route
          path="/organizations"
          element={checkLoggedIn() || <Organizations />}
        ></Route>
        <Route
          path="/organizations/dashboard/:organization_id"
          element={checkLoggedIn() || <OrganizationDashboard />}
        ></Route>

        {/* USER SEVER*/}
        <Route
          path="/organizations/dashboard/:organization_id/:server_id"
          element={checkLoggedIn() || <ServerConfig />}
        ></Route>
        <Route
          path="/serverEmpty"
          element={checkLoggedIn() || <ServerEmpty />}
        ></Route>

        <Route
          path="/server"
          element={checkLoggedIn() || <ServerConfig />}
        ></Route>

        {/* ERROR */}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}
