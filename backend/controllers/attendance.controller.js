import Attendance from "../models/Attendance.js";
import jwt from "jsonwebtoken";
import generateQrToken from "../utils/generateQrToken.js";
import User from "../models/User.js";
import { getLocalDate } from "../utils/date.js";
import { generateQRToken } from "../utils/qr.js";


const isPlanValid = (user) => {
  if (!user.activePlan || !user.planEnd) return false;
  return new Date() <= new Date(user.planEnd);
};

// ADMIN: generate QR
export const generateDailyQR = async (req, res) => {
  const today = getLocalDate();

  const qrToken = JSON.stringify({ date: today });
  res.json({ qrToken });
};



export const markAttendance = async (req, res) => {
  const { token } = req.body;

  try {
    jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(req.user._id);

    if (!isPlanValid(user)) {
      return res.status(403).json({
        message: "Plan expired. Renew to mark attendance.",
      });
    }

    const today = getLocalDate();

    const alreadyMarked = await Attendance.findOne({
      user: user._id,
      date: today,
    });

    if (alreadyMarked) {
      return res.status(400).json({ message: "Already marked today" });
    }

    await Attendance.create({
      user: user._id,
      date: today,
    });

    res.json({ success: true });
  } catch {
    res.status(401).json({ message: "Invalid or expired QR" });
  }
};




// ADMIN: get attendance analytics
export const getAttendanceStats = async (req, res) => {
  const data = await Attendance.find().populate("user", "name");
  res.json(data);
};




export const scanQR = async (req, res) => {
  try {
    const userId = req.user._id;
    const { qrToken } = req.body;

    if (!qrToken) {
      return res.status(400).json({ message: "QR data missing" });
    }

    const user = await User.findById(userId);

    // PLAN CHECK
    if (!isPlanValid(user)) {
      return res.status(403).json({
        message: "Plan expired. Renew to continue attendance.",
      });
    }

    let parsed;
    try {
      parsed = JSON.parse(qrToken);
    } catch {
      return res.status(400).json({ message: "Invalid QR format" });
    }

    const today = getLocalDate();

    if (parsed.date !== today) {
      return res.status(400).json({ message: "QR expired" });
    }

    const alreadyMarked = await Attendance.findOne({
      user: userId,
      date: today,
    });

    if (alreadyMarked) {
      return res.status(400).json({ message: "Already marked today" });
    }

    await Attendance.create({ user: userId, date: today });

    // Streak logic (unchanged)
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayDate = yesterday.toISOString().split("T")[0];

    user.streak =
      user.lastAttendanceDate === yesterdayDate ? user.streak + 1 : 1;

    user.lastAttendanceDate = today;
    await user.save();

    res.json({
      message: "Attendance marked",
      streak: user.streak,
    });
  } catch (err) {
    console.error("Scan QR error:", err);
    res.status(500).json({ message: "Server error" });
  }
};



export const getMyStreak = async (req, res) => {
  const user = await User.findById(req.user._id).select("streak lastAttendanceDate");

  res.json({
    streak: user.streak,
    lastAttendanceDate: user.lastAttendanceDate,
  });
};

// Get all attendance for the logged-in user
export const getMyAttendance = async (req, res) => {
  try {
    const userId = req.user._id;
    const attendance = await Attendance.find({ user: userId }).sort({ date: -1 });

    res.json(attendance);
  } catch (err) {
    console.error("Get my attendance error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserAttendanceSummary = async (req, res) => {
  try {
    const users = await User.find({
  activePlan: { $ne: null },
  planEnd: { $gte: new Date() }
}).select("name email planStart planEnd");

    const today = new Date();

    const summary = await Promise.all(
      users.map(async (user) => {
        const presentDays = await Attendance.countDocuments({
          user: user._id,
        });

        let totalDays = 0;

        if (user.planStart) {
          const diffTime = today - new Date(user.planStart);
          totalDays = Math.ceil(
            diffTime / (1000 * 60 * 60 * 24)
          );
        }

        return {
          id: user._id,
          name: user.name,
          email: user.email,
          totalDays,
          present: presentDays,
        };
      })
    );

    res.json(summary);
  } catch (err) {
    console.error("Admin attendance summary error:", err);
    res.status(500).json({ message: "Failed to fetch attendance" });
  }
};