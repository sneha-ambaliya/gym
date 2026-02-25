import express from "express";
import {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  updatePaymentStatus,
  createRazorpayOrder,
  verifyRazorpayPayment,
} from "../controllers/order.controller.js";

import protect from "../middleware/auth.middleware.js";


import protectAdmin from "../middleware/protectAdmin.js";


const router = express.Router();

/* ================= USER ROUTES ================= */

// Create order
router.post("/", protect, createOrder);

// Get logged-in user orders
router.get("/my-orders", protect, getMyOrders);

// Get single order
router.get("/:id", protect, getOrderById);

/* ================= ADMIN ROUTES ================= */

// Get all orders
router.get("/", protect,protectAdmin, getAllOrders);

// Update order status (processing → shipped → delivered)
router.put("/:id/status", protectAdmin,  updateOrderStatus);

// Update payment status (pending → paid / failed)
router.put("/:id/payment",protectAdmin, updatePaymentStatus);
router.post("/create-razorpay-order",protect,createRazorpayOrder);
router.post("/verify-payment",protect,verifyRazorpayPayment);


export default router;
