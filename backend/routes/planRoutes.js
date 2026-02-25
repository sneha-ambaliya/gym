import express from "express";
import {
  createPlan,
  getPlans,
  updatePlan,
  deletePlan,
  createOrder,
  verifyAndSavePayment
} from "../controllers/planController.js";

import protect from "../middleware/auth.middleware.js";

const router = express.Router();

// Admin
router.post("/", createPlan);
router.put("/:id", updatePlan);
router.delete("/:id", deletePlan);

// User
router.get("/", getPlans);
router.post("/create-order/", createOrder);
router.post("/verify-payment/", protect ,verifyAndSavePayment);


export default router;
