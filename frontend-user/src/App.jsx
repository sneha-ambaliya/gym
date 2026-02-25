import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Shop from "./pages/Shop";
import Chatbot from "./pages/Chatbot";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import OrderDetails from "./pages/OrderDetails";


import ProtectedRoute from "./components/ProtectedRoute";

// USER DASHBOARD
import UserDashboard from "./pages/UserDashboard";
import Profile from "./pages/Profile";
import Attendance from "./pages/Attendance";
import Notes from "./pages/Notes";
import Massage from "./pages/Massage";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import MyOrders from "./pages/MyOrders";


const App = () => (
  <BrowserRouter>
    <Navbar />

    <Routes>
      {/* 🌐 Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/chatbot" element={<Chatbot />} />
      <Route path="/product/:id" element={<ProductDetails/>} />
      <Route path="/checkout" element={<Checkout/>}/>
      <Route path="/order-success/:id" element={<OrderSuccess />} />
      <Route path="/orders/:id" element={<OrderDetails />} />

      

      {/* 🔐 User Dashboard Routes */}
      <Route
        path="/user"
        element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        }
      >
        <Route path="profile" element={<Profile />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="notes" element={<Notes />} />
        <Route path="massage" element={<Massage/>} />
        <Route path="cart" element={<Cart/>} />
        <Route path="orders/:id" element={<Order />} />      {/* relative now */}
    <Route path="my-orders" element={<MyOrders />} />
        
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
