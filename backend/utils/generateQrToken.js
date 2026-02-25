import jwt from "jsonwebtoken";

const generateQrToken = () => {
  const today = new Date().toISOString().split("T")[0];

  return jwt.sign(
    { date: today },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
};

export default generateQrToken;
