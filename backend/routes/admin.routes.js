import express from "express";
import { registerAdmin, adminLogin } from "../controllers/admin.controller.js";
import protect from "../middleware/auth.middleware.js";
import { superAdminOnly } from "../middleware/role.middleware.js";

const router = express.Router();

router.post("/login", adminLogin);
router.post("/register", protect, superAdminOnly, registerAdmin);

export default router;
