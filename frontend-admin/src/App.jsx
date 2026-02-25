import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "./layout/AdminLayout";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminHome";
import GenerateQR from "./pages/GenerateQR";
import UserAttendance from "./pages/UserAttendance";
import ManageUser from "./pages/ManageUser";
import ListProduct from "./pages/ListProduct";
import AllProduct from "./pages/AllProduct";
import Orders from "./pages/Order";
import Announcement from "./pages/Announcement";
import AdminContacts from "./pages/AdminContacts";
import AddPlan from "./pages/AddPlan";
import ManagePlans from "./pages/ManagePlans";




const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* ===== AUTH ===== */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ===== ADMIN PANEL ===== */}
        <Route
          path="/admin"
          element={
           
              <AdminLayout />
            
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="generate-qr" element={<GenerateQR />} />
          <Route path="attendance" element={<UserAttendance/>} />
          <Route path="users" element={<ManageUser/>} />
          <Route path="products" element={<ListProduct/>} />
          <Route path="product" element={<AllProduct/>} />
          <Route path="order" element={<Orders/>} />
          <Route path="announcement" element={<Announcement/>} />
          <Route path="contacts" element={<AdminContacts/>}
         
          />
           <Route path="addplan" element={<AddPlan/>} />
           <Route path="manageplan" element={<ManagePlans/>} />
        </Route>

        {/* ===== FALLBACK ===== */}
        <Route path="*" element={<Navigate to="/admin/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
