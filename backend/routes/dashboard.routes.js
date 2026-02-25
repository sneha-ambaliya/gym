import express from "express";
import {
  getAdminStats 
} from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/stats", getAdminStats);


export default router;
