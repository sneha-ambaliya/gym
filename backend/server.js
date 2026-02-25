
import dotenv from "dotenv";
import path from "path";
dotenv.config();


import express from "express";

import cors from "cors";
import connectDB from "./config/db.js";
import adminRoutes from "./routes/admin.routes.js";

import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import orderRoutes from "./routes/order.routes.js";
import attendanceRoutes from "./routes/attendance.routes.js";
import userRoutes from "./routes/user.routes.js";
import seedAdmin from "./controllers/seedAdmin.js";
import cookieParser from "cookie-parser";
import notificationRoutes from "./routes/notification.routes.js";
import ChatRoutes from "./routes/chat.Routes.js";
import contactRoutes from "./routes/contact.routes.js";
import planRoutes from "./routes/planRoutes.js";
import dashboard from "./routes/dashboard.routes.js"



connectDB();

const app = express();

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());


app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/users", userRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/chat", ChatRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/dashboard",dashboard)

seedAdmin();



const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT} `)
);
