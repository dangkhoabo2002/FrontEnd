import { Routes, Route } from "react-router-dom";
import Homepage from "./screens/Homepage";
import Contact from "./screens/Contact";
import Navigation from "./components/Navigation";
import ServerEmpty from "./screens/serverEmpty";
import Organization from "./screens/Organization";
import OrganizationDashboard from "./screens/organizationDashboard";
import Test from "./screens/test";
import Login from "./screens/login";
import ForgotPassword from "./screens/forgotPassword";
import SignUp from "./screens/signUp";
import OTPInput from "./screens/otp";
import ResetPassword from "./screens/resetPassword";
import Subscribe from "./screens/Subscribe";
import Payment from "./screens/Payment";
import Sidebar from "./components/Sidebar";
import Admin from "./screens/adminAccountManagement";
import ServerConfig from "./screens/userServerConfig";
import Guide from "./screens/userGuide";

import AdminBilling from "./screens/adminBilling";
import AdminSetting from "./screens/adminSetting";

import UserProfile from "./screens/userProfile";
import UserSubscribe from "./screens/userSubscribe";
import UserPayment from "./screens/userSubscribePayment";
import Organizations from "./screens/userOrganization";
export default function App() {
  return (
    <div>
      <Routes>
        {/* Dashboard Unlogin */}
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/guide" element={<Guide />}></Route>

        {/* ADMIN ROUTE*/}
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/admin/billing" element={<AdminBilling />}></Route>
        <Route path="/admin/setting" element={<AdminSetting />}></Route>

        {/* USER ROUTE*/}
        <Route path="/login" element={<Login />}></Route>

        {/* USER PROFILE*/}
        <Route path="/user" element={<UserProfile />}></Route>
        <Route path="/user/subscribe" element={<UserSubscribe />}></Route>
        <Route path="/user/subscribe/payment" element={<UserPayment />}></Route>
        <Route
          path="/login/forgotPassword"
          element={<ForgotPassword />}
        ></Route>
        <Route path="/ResetPassword" element={<ResetPassword />}></Route>
        <Route path="/payment" element={<Payment />}></Route>
        <Route path="/signUp" element={<SignUp />}></Route>
        <Route path="/OTP" element={<OTPInput />}></Route>
        <Route path="/subscribe" element={<Subscribe />}></Route>

        {/* USER ORG*/}
        <Route path="/organizations" element={<Organizations />}></Route>
        <Route
          path="/organizations/dashboard/:organizationId"
          element={<OrganizationDashboard />}
        ></Route>

        {/* USER SEVER*/}
        <Route path="/server" element={<ServerConfig />}></Route>
        <Route path="/serverEmpty" element={<ServerEmpty />}></Route>

        <Route path="/server" element={<ServerConfig />}></Route>

        {/* DRAFT TEST ROUTE*/}
        <Route path="/test" element={<Test />}></Route>
      </Routes>
    </div>
  );
}
