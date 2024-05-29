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
import ServerConfig from "./screens/userServerConfig";
import Guide from "./screens/userGuide";
import MaintenancePage from "./screens/maintenancePage";

import Test from "./screens/test";
import UserProfile from "./screens/userProfile";
import UserSubscribe from "./screens/userSubscribe";
import UserPayment from "./screens/userSubscribePayment";
import Organizations from "./screens/userOrganization";
// import AboutUs from "./screens/abouUs";
import TermOfService from "./screens/termOfService";
import SubscribeModal from "./components/nonSubModal";
import EmailSending from "./screens/emailSending";
import VerifySuccess from "./screens/verifySuccess";
import Error404 from "./screens/Error404";
import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const loginToken = localStorage.getItem("checkUser");

  const checkLoggedIn = () => {
    if (!loginToken) {
      return <Navigate to="/login" />;
    }
  };

  const [redirected, setRedirected] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && !redirected && !["/", "/term"].includes(window.location.pathname)) {
        setRedirected(true);
        alert("This website does not support mobile devices. Please access it using a tablet, desktop, or laptop for the best experience.");
        window.location.href = "/error404";
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [redirected]);

  return (
    <div>
      <div id="mobile-warning">
        This website does not support mobile devices. Please access it using a tablet, desktop, or laptop for the best experience.
      </div>
      <div id="app-content">
        {/* Your existing content */}
      </div>
      <Routes>
        {/* Dashboard Unlogin */}
        <Route path="/signup/emailsending" element={<EmailSending/>}></Route>
        <Route path="/signup/emailsending/verify" element={<VerifySuccess/>}></Route>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/test" element={<Test />}></Route>

        {/* <Route path="/aboutUs" element={<AboutUs />}></Route> */}
        <Route path="/guide" element={checkLoggedIn() || <Guide />}></Route>
        <Route path="/term" element={<TermOfService />}></Route>
        <Route path="/sub" element={<SubscribeModal />}></Route>
        <Route path="/error404" element={<Error404 />}></Route>
        <Route path="/maintaining" element={<MaintenancePage />}></Route>

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
