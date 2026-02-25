import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  planId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plan",
  },
  amount: Number,
  razorpay_order_id: String,
  razorpay_payment_id: String,
  status: {
    type: String,
    enum: ["success", "failed"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Payment", paymentSchema);
