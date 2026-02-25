import jwt from "jsonwebtoken";

export const generateQRToken = () => {
  return jwt.sign(
    { type: "ATTENDANCE_QR" },
    process.env.JWT_SECRET,
    { expiresIn: "60s" } 
  );
};
