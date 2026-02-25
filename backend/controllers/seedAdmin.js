// seedAdmin.js
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";

const seedAdmin = async () => {
  const adminExists = await Admin.findOne({ email: "admin@gmail.com" });
  if (!adminExists) {
    await Admin.create({
      email: "admin@gmail.com",
      password: await bcrypt.hash("Admin@123", 10),
      role: "admin",
    });
    console.log("Admin created");
  }
};

export default seedAdmin;
