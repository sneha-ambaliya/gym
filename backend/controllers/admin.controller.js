import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import jwt from "jsonwebtoken";

export const registerAdmin = async (req, res) => {
  const { name, email, password, isSuperAdmin } = req.body;

  const exists = await Admin.findOne({ email });
  if (exists)
    return res.status(400).json({ message: "Admin already exists" });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const admin = await Admin.create({
    name,
    email,
    password: hashedPassword,
    isSuperAdmin,
  });

  res.status(201).json({
    _id: admin._id,
    name: admin.name,
    token: generateToken(admin._id),
  });
};

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: admin._id, role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.cookie("adminToken", token, {
    httpOnly: true,
    sameSite: "lax",
  });

  res.json({
    _id: admin._id,
    email: admin.email,
    token, 
  });
};