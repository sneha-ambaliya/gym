import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  text: String,
  createdAt: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,

    profilePic: String,
    height: Number,
    weight: Number,
    streak: {
      type: Number,
      default: 0,
    },
    lastAttendanceDate: {
      type: String,
    },
    goal: { type: String, enum: ["bulk", "cut", "maintain"] },

    notes: [noteSchema],

    membershipExpiry: Date,
    isActive: { type: Boolean, default: true },

    workoutStreak: { type: Number, default: 0 },

   
    activePlan: { type: mongoose.Schema.Types.ObjectId, ref: "Plan" },
    planType: { type: String, enum: ["monthly", "yearly"] },
    planStart: { type: Date },
    planEnd: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
