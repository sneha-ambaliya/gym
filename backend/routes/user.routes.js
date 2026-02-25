import express from "express";
import {
  getProfile,
  updateProfile,
  addNote,
  deleteNote,
  buyPlan,
} from "../controllers/user.controller.js";
import protect from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";
import { uploadProfilePic } from "../controllers/user.controller.js";


const router = express.Router();



router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.post("/notes", protect, addNote);
router.delete("/notes/:id", protect, deleteNote);
router.put(
  "/profile-pic",
  protect,
  upload.single("profilePic"), 
  uploadProfilePic
);
router.post("/buy-plan", protect, buyPlan);

export default router;
