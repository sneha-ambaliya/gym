import mongoose from "mongoose";

const planSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, 
    },
    monthlyPrice: {
      type: Number,
      required: true,
    },
    yearlyPrice: {
      type: Number,
      required: true,
    },
    features: {
      type: [String],
      default: [],
    },
    disabledFeatures: {
      type: [String],
      default: [],
    },
    isPopular: {
      type: Boolean,
      default: false, 
    },
  },
  { timestamps: true }
);

export default mongoose.model("Plan", planSchema);
