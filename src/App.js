import { Routes, Route } from "react-router-dom";
import Homepage from "./screens/Homepage";
import Contact from "./screens/Contact";
import Navigation from "./components/Navigation";
import Sidebar from "./components/Sidebar";
import Admin from "./screens/adminAccountManagement";
import AdminBilling from "./screens/adminBilling";
import AdminSetting from "./screens/adminSetting";
export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/sidebar" element={<Sidebar />}></Route>

        {/* ADMIN ROUTE*/}
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/admin/billing" element={<AdminBilling />}></Route>
        <Route path="/admin/setting" element={<AdminSetting />}></Route>
      </Routes>
    </div>
  );
}
