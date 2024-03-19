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
import ServerConfig from "./screens/userServerConfig";

export default function App() {
  return (
    <div>
      <Routes>
        {/* User */}
        <Route path="/serverEmpty" element={<ServerEmpty />}></Route>
        <Route path="/Organization" element={<Organization />}></Route>
        <Route
          path="/Organization/dashboard/:organizationId"
          element={<OrganizationDashboard />}
        ></Route>
        <Route path="/server" element={<ServerConfig />}></Route>
        <Route path="/test" element={<Test />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
        <Route path="/ResetPassword" element={<ResetPassword />}></Route>
        <Route path="/payment" element={<Payment />}></Route>
        <Route path="/signUp" element={<SignUp />}></Route>
        <Route path="/OTP" element={<OTPInput />}></Route>
        <Route path="/subscribe" element={<Subscribe />}></Route>

        {/* Dashboard Unlogin */}
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
      </Routes>
    </div>
  );
}
