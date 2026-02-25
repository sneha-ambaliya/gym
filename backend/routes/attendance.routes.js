import express from "express";
import {
  generateDailyQR,
  markAttendance,
  getAttendanceStats,
  getMyStreak,
  getMyAttendance,
  scanQR,
  getUserAttendanceSummary,
} from "../controllers/attendance.controller.js";

import protect from "../middleware/auth.middleware.js";
import protectAdmin from "../middleware/protectAdmin.js";

const router = express.Router();


router.get("/generate-qr", protectAdmin, generateDailyQR);
router.get("/stats", protectAdmin, getAttendanceStats);

// ----- USER ROUTES -----
router.post("/mark", protect, markAttendance);
router.post("/scan", protect, scanQR);

// Get user's current streak + last attendance date
router.get("/my-streak", protect, getMyStreak);

// Get full attendance history for logged-in user
router.get("/my-attendance", protect, getMyAttendance);
router.get("/admin/user-attendance", protectAdmin, getUserAttendanceSummary);

export default router;
