import Plan from "../models/Plan.js";
import Payment from "../models/Payment.js";
import razorpay from "../utils/razorpay.js";
import crypto from "crypto";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

// CREATE PLAN
export const createPlan = async (req, res) => {
  try {
    const plan = await Plan.create(req.body);
    res.status(201).json(plan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET ALL PLANS (Admin + User)
export const getPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE PLAN
export const updatePlan = async (req, res) => {
  try {
    const plan = await Plan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(plan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE PLAN
export const deletePlan = async (req, res) => {
  try {
    await Plan.findByIdAndDelete(req.params.id);
    res.json({ message: "Plan deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const createOrder = async (req, res) => {
  try {
    const { planId, planType } = req.body;

    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    const amount =
      planType === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;

    const order = await razorpay.orders.create({
      amount: amount * 100, 
      currency: "INR",
      receipt: `plan_${plan._id}`,
    });

    res.json({
      orderId: order.id,
      amount: order.amount,
      plan,
    });
  } catch (error) {
    console.error("Razorpay error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const verifyAndSavePayment = async (req, res) => {
  try {
    const {
      planId,
      planType,   
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid signature" });
    }

    
    await Payment.create({
      userId: req.user._id,
      planId,
      amount,
      razorpay_order_id,
      razorpay_payment_id,
      status: "success",
    });

    
    const now = new Date();
    let planEnd;

    if (planType === "monthly") {
      planEnd = new Date(now.setMonth(now.getMonth() + 1));
    } else {
      planEnd = new Date(now.setFullYear(now.getFullYear() + 1));
    }

    
    await User.findByIdAndUpdate(req.user._id, {
      activePlan: planId,
      planType,
      planEnd
    });

    res.json({ message: "Payment verified & plan activated " });

  } catch (err) {
    console.error("VERIFY ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};