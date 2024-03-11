import { Routes, Route } from "react-router-dom";
import Homepage from "./screens/Homepage";
import Contact from "./screens/Contact";
import Navigation from "./components/Navigation";
import ServerEmpty from "./screens/serverEmpty";
import Organization from "./screens/Organization";
import Test from "./screens/test";
import Login from "./screens/Login";
import ForgotPassword from "./screens/forgotPassword";
import SignUp from "./screens/signUp";
import OTP from "./screens/OTP";
import ResetPassword from "./screens/resetPassword";
export default function App() {
  return (
    <div>
      <Routes>  
        {/* User */}
        <Route path="/serverEmpty" element={<ServerEmpty/>}> </Route>
        <Route path="/organization" element={<Organization/>}> </Route>
        <Route path="/test" element={<Test/>}> </Route>
        <Route path="/login" element={<Login/>}> </Route>
        <Route path="/forgotPassword" element={<ForgotPassword/>}> </Route>
        <Route path="/ResetPassword" element={<ResetPassword/>}> </Route>
        <Route path="/signUp" element={<SignUp/>}> </Route>
        <Route path="/OTP" element={<OTP/>}> </Route>
        {/* Dashboard Unlogin */}
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
      </Routes>
    </div>
  );
}
