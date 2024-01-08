import { Routes, Route } from "react-router-dom";
import Homepage from "./screens/Homepage";
import Contact from "./screens/Contact";
import Navigation from "./components/Navigation";
import ServerEmpty from "./screens/roleUserScreens/serverEmpty";
import MyServer from "./screens/roleUserScreens/myServer";
export default function App() {
  return (
    <div>
      <Routes>  
        {/* User */}
        <Route path="/serverEmpty" element={<ServerEmpty/>}> </Route>
        <Route path="/myServer" element={<MyServer/>}> </Route>

        {/* Dashboard Unlogin */}
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
      </Routes>
    </div>
  );
}
