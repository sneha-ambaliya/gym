// routes/contact.routes.js
import express from "express";
import {
  createContact,
  getAllContacts,
  markAsReplied,
} from "../controllers/contact.controller.js";
import protectAdmin from "../middleware/protectAdmin.js";

const router = express.Router();

// user contact form
router.post("/", createContact);

// admin routes
router.get("/", protectAdmin, getAllContacts);
router.put("/:id/replied", protectAdmin, markAsReplied);

export default router;
